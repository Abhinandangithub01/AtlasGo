# CitySense Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. ✅ **Storyblok Account**
   - Space created
   - Content models configured
   - Sample content added
   - API tokens generated

2. ✅ **Algolia Account**
   - Application created
   - Index created (`places`)
   - API keys generated (Search & Admin)

3. ✅ **OpenAI Account**
   - API key generated
   - Credits available

4. ✅ **Vercel Account** (recommended) or Netlify

## Deployment Steps

### 1. Prepare Environment Variables

Create a `.env.local` file with all required variables:

```bash
# Storyblok
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_preview_token
STORYBLOK_MANAGEMENT_TOKEN=your_management_token

# Algolia
ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
ALGOLIA_SEARCH_KEY=your_search_key
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key

# OpenAI
OPENAI_API_KEY=sk-your_key

# Site URL (update after deployment)
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Add all environment variables from `.env.local`
6. Click "Deploy"

### 3. Post-Deployment Configuration

#### A. Update Site URL

1. Copy your deployment URL (e.g., `https://citysense.vercel.app`)
2. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://citysense.vercel.app
   ```
3. Redeploy

#### B. Configure Algolia Index

```bash
# Run locally or via Vercel CLI
npm run algolia:settings
```

Or use the API endpoint:
```bash
curl -X POST https://citysense.vercel.app/api/algolia-settings
```

#### C. Initial Reindex

```bash
# Via admin dashboard
# Visit: https://citysense.vercel.app/admin
# Click "Reindex All Places"

# Or via API
curl -X POST https://citysense.vercel.app/api/reindex
```

#### D. Setup Storyblok Webhook

1. Go to Storyblok → Settings → Webhooks
2. Create new webhook:
   - **Name:** CitySense Reindex
   - **URL:** `https://citysense.vercel.app/api/webhook/storyblok`
   - **Events:** Story published, unpublished, deleted
   - **Content type:** place (optional filter)
3. Save and test

### 4. Verify Deployment

Check these endpoints:

- ✅ Homepage: `https://citysense.vercel.app/`
- ✅ Search: `https://citysense.vercel.app/search`
- ✅ Itinerary: `https://citysense.vercel.app/itinerary`
- ✅ Admin: `https://citysense.vercel.app/admin`
- ✅ API Health: `https://citysense.vercel.app/api/reindex` (POST)

### 5. Performance Optimization

#### Enable Caching

Add to `next.config.mjs`:

```javascript
const nextConfig = {
  images: {
    domains: ['a.storyblok.com', 'img2.storyblok.com'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
};
```

#### Add ISR (Incremental Static Regeneration)

For district and place pages, add:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

### 6. Monitoring

#### Vercel Analytics

Enable in Vercel dashboard:
- Go to your project
- Navigate to "Analytics"
- Enable Web Analytics

#### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors during build

**Solution:**
```bash
# Check locally first
npm run build

# Fix any type errors
# Consider adding to tsconfig.json:
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### API Routes Return 500

**Issue:** Missing environment variables

**Solution:**
1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure all variables are set
3. Redeploy

### Algolia Search Not Working

**Issue:** Index not configured or empty

**Solution:**
1. Run `npm run algolia:settings`
2. Run reindex via `/admin`
3. Check Algolia dashboard for records

### Webhook Not Triggering

**Issue:** Webhook URL incorrect or not accessible

**Solution:**
1. Verify URL is publicly accessible
2. Check Storyblok webhook logs
3. Test manually with curl
4. Ensure CORS is not blocking

### OpenAI API Errors

**Issue:** Rate limits or invalid API key

**Solution:**
1. Check API key is valid
2. Verify OpenAI account has credits
3. Check rate limits in OpenAI dashboard
4. Consider adding retry logic

## Alternative Deployment: Netlify

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Add environment variables via dashboard
```

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

## Security Checklist

- [ ] API keys stored as environment variables (not in code)
- [ ] Admin routes protected (consider adding auth)
- [ ] Webhook signature verification enabled
- [ ] CORS configured properly
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms

## Performance Checklist

- [ ] Images optimized (Next.js Image component)
- [ ] Code splitting enabled
- [ ] CSS minified
- [ ] Fonts optimized
- [ ] API responses cached where appropriate
- [ ] Database queries optimized (Algolia)

## SEO Checklist

- [ ] Meta tags on all pages
- [ ] Open Graph tags
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Structured data added
- [ ] Page titles unique and descriptive

## Accessibility Checklist

- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Focus indicators visible

## Post-Launch

1. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor API response times
   - Track error rates

2. **Gather Feedback**
   - Test with real users
   - Collect bug reports
   - Iterate on UX

3. **Scale**
   - Monitor Algolia usage
   - Optimize OpenAI costs
   - Consider caching strategies

## Support

For issues:
- Check Vercel logs
- Review Storyblok webhook logs
- Check Algolia dashboard
- Review OpenAI usage

## Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Storyblok Webhooks](https://www.storyblok.com/docs/guide/in-depth/webhooks)
- [Algolia Documentation](https://www.algolia.com/doc/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
