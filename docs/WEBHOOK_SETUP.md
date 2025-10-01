# Storyblok Webhook Setup Guide

This guide explains how to configure Storyblok webhooks to automatically reindex content in Algolia when stories are published, unpublished, or deleted.

## Overview

When you publish, unpublish, or delete a place in Storyblok, the webhook will:
1. Trigger the `/api/webhook/storyblok` endpoint
2. Call `/api/reindex-single` with the story ID
3. Update or remove the place from Algolia index
4. Make the change searchable within 5-10 seconds

## Prerequisites

1. ✅ Deployed CitySense app (Vercel, Netlify, or other hosting)
2. ✅ Public URL for your app (e.g., `https://citysense.vercel.app`)
3. ✅ Storyblok space with admin access

## Step-by-Step Setup

### Step 1: Deploy Your App

Before setting up webhooks, deploy your app to get a public URL:

```bash
# Using Vercel
vercel deploy

# Or using Netlify
netlify deploy --prod
```

Copy your deployment URL (e.g., `https://citysense.vercel.app`)

### Step 2: Add Environment Variable

Add your site URL to `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://citysense.vercel.app
```

Redeploy after adding this variable.

### Step 3: Create Webhook in Storyblok

1. **Log in to Storyblok**
   - Go to your CitySense space

2. **Navigate to Settings → Webhooks**
   - Click on **Settings** in the left sidebar
   - Select **Webhooks** from the menu

3. **Click "Add a webhook"**

4. **Configure Webhook:**

   **Name:** `CitySense Algolia Reindex`
   
   **Story published & unpublished:**
   - ✅ Check this option
   
   **Story deleted:**
   - ✅ Check this option
   
   **Endpoint URL:**
   ```
   https://citysense.vercel.app/api/webhook/storyblok
   ```
   (Replace with your actual deployment URL)
   
   **Trigger events:**
   - ✅ Story published
   - ✅ Story unpublished
   - ✅ Story deleted
   
   **Content type filter (optional):**
   - Select `place` to only trigger for place stories
   - Leave empty to trigger for all content types
   
   **Secret (optional but recommended):**
   - Generate a random secret: `openssl rand -hex 32`
   - Add it here and to your `.env` as `STORYBLOK_WEBHOOK_SECRET`

5. **Click "Save"**

### Step 4: Test the Webhook

1. **Go to Content → places/**

2. **Edit any place story**

3. **Click "Publish"**

4. **Check webhook logs:**
   - In Storyblok: Settings → Webhooks → Click on your webhook → View logs
   - In your app: Check server logs (Vercel/Netlify dashboard)

5. **Verify in Algolia:**
   - Go to Algolia dashboard
   - Check the `places` index
   - The updated place should appear within 5-10 seconds

## Webhook Payload Structure

Storyblok sends the following payload:

```json
{
  "text": "Story 'Castelo de São Jorge' has been published",
  "action": "published",
  "space_id": 123456,
  "story_id": 789012,
  "full_slug": "places/castelo-de-sao-jorge"
}
```

**Actions:**
- `published` - Story was published or updated
- `unpublished` - Story was unpublished
- `deleted` - Story was deleted

## Security: Webhook Signature Verification (Recommended)

### Step 1: Generate a Secret

```bash
openssl rand -hex 32
```

### Step 2: Add to Storyblok Webhook

In the webhook configuration, add the secret to the **Secret** field.

### Step 3: Add to Environment Variables

```env
STORYBLOK_WEBHOOK_SECRET=your_generated_secret_here
```

### Step 4: Redeploy

The webhook handler will now verify signatures automatically.

## Troubleshooting

### Webhook Not Triggering

**Check:**
1. ✅ Webhook URL is correct and publicly accessible
2. ✅ Story type matches the content type filter
3. ✅ Webhook is enabled in Storyblok
4. ✅ Check Storyblok webhook logs for errors

**Test webhook manually:**
```bash
curl -X POST https://citysense.vercel.app/api/webhook/storyblok \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test",
    "action": "published",
    "space_id": 123456,
    "story_id": 789012,
    "full_slug": "places/test"
  }'
```

### Webhook Returns 401 Unauthorized

**Issue:** Signature verification failed

**Solution:**
1. Check that `STORYBLOK_WEBHOOK_SECRET` matches in both Storyblok and your `.env`
2. Ensure the secret is deployed to your hosting platform
3. Temporarily disable signature verification for testing

### Webhook Returns 500 Error

**Check:**
1. ✅ All environment variables are set correctly
2. ✅ Storyblok API token is valid
3. ✅ Algolia credentials are correct
4. ✅ Check server logs for detailed error messages

### Place Not Appearing in Search

**Check:**
1. ✅ Place has valid latitude/longitude
2. ✅ Place is published (not draft)
3. ✅ Check Algolia dashboard to verify record exists
4. ✅ Run manual reindex: `npm run reindex`

## Manual Reindex

If webhooks fail or you need to reindex all content:

### Option 1: API Endpoint

```bash
curl -X POST https://citysense.vercel.app/api/reindex \
  -H "Content-Type: application/json"
```

### Option 2: Local Script

```bash
npm run reindex
```

### Option 3: Admin Dashboard

Visit `/admin` in your app and click "Reindex All Places"

## Monitoring

### View Webhook Activity

**Storyblok:**
- Settings → Webhooks → Click webhook → Logs tab

**Your App:**
- Check deployment logs in Vercel/Netlify dashboard
- Look for `[Webhook]` prefixed log messages

### Expected Log Output

```
[Webhook] Received: { action: 'published', story_id: 789012, full_slug: 'places/castelo' }
[Reindex Single] Processing story 789012, action: publish
[Reindex Single] Successfully indexed place 789012
[Webhook] Successfully processed: Webhook processed: published story 789012
```

## Advanced: Batch Webhooks

For high-volume updates, consider implementing a queue:

1. **Add Redis or similar queue**
2. **Webhook pushes to queue**
3. **Background worker processes queue in batches**
4. **Reduces API calls and improves performance**

Example with Vercel + Upstash Redis:

```typescript
// pages/api/webhook/storyblok.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Push to queue
await redis.lpush('reindex_queue', JSON.stringify({
  storyId: payload.story_id,
  action: payload.action,
}));
```

## Testing Checklist

- [ ] Webhook created in Storyblok
- [ ] Webhook URL is correct
- [ ] Secret is configured (if using)
- [ ] Environment variables deployed
- [ ] Test publish triggers reindex
- [ ] Test unpublish removes from index
- [ ] Check Algolia dashboard for updates
- [ ] Verify search results update
- [ ] Check webhook logs in Storyblok
- [ ] Monitor server logs for errors

## Next Steps

After webhook setup:
1. ✅ Test with multiple places
2. ✅ Verify real-time search updates
3. ✅ Set up monitoring/alerting
4. ✅ Document for your team
5. ✅ Create demo video showing real-time updates

## Resources

- [Storyblok Webhooks Documentation](https://www.storyblok.com/docs/guide/in-depth/webhooks)
- [Algolia Indexing Best Practices](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
