import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPlaces } from '@/lib/storyblok';
import { indexAllPlaces } from '@/lib/algolia';

type ResponseData = {
  success: boolean;
  message: string;
  count?: number;
  objectIDs?: string[];
  error?: string;
  timestamp?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  // Optional: Add authentication
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.REINDEX_AUTH_TOKEN;
  
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    console.log('[Reindex] Starting full reindex...');
    
    // Fetch all places from Storyblok
    const places = await getAllPlaces();
    
    if (places.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No places found in Storyblok',
        count: 0,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`[Reindex] Found ${places.length} places in Storyblok`);

    // Index all places to Algolia
    const result = await indexAllPlaces(places);

    console.log(`[Reindex] Successfully indexed ${result.count} places`);

    return res.status(200).json({
      success: true,
      message: `Successfully indexed ${result.count} places`,
      count: result.count,
      objectIDs: result.objectIDs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Reindex] Error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to reindex places',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
