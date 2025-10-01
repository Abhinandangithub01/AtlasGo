import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

type WebhookPayload = {
  text: string;
  action: 'published' | 'unpublished' | 'deleted';
  space_id: number;
  story_id: number;
  full_slug: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
};

/**
 * Verify Storyblok webhook signature
 */
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(body);
  const digest = hmac.digest('hex');
  return signature === digest;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Optional: Verify webhook signature
    const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers['webhook-signature'] as string;
      const body = JSON.stringify(req.body);
      
      if (!signature || !verifyWebhookSignature(body, signature, webhookSecret)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid webhook signature',
        });
      }
    }

    const payload = req.body as WebhookPayload;
    
    console.log('[Webhook] Received:', {
      action: payload.action,
      story_id: payload.story_id,
      full_slug: payload.full_slug,
    });

    // Determine action
    let reindexAction: 'publish' | 'unpublish' | 'delete' = 'publish';
    if (payload.action === 'unpublished') {
      reindexAction = 'unpublish';
    } else if (payload.action === 'deleted') {
      reindexAction = 'delete';
    }

    // Call reindex-single API
    const reindexUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/reindex-single`;
    
    const reindexResponse = await fetch(reindexUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storyId: payload.story_id,
        action: reindexAction,
      }),
    });

    const reindexResult = await reindexResponse.json();

    if (!reindexResult.success) {
      console.error('[Webhook] Reindex failed:', reindexResult);
      return res.status(500).json({
        success: false,
        message: 'Reindex failed',
        error: reindexResult.error,
      });
    }

    console.log('[Webhook] Successfully processed:', reindexResult.message);

    return res.status(200).json({
      success: true,
      message: `Webhook processed: ${payload.action} story ${payload.story_id}`,
    });
  } catch (error) {
    console.error('[Webhook] Error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Disable body parsing to allow raw body for signature verification
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
