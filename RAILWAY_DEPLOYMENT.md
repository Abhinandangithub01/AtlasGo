# 🚂 Railway Deployment Guide

## ✅ **Optimizations Applied**

### **1. Next.js Configuration**
- ✅ `output: 'standalone'` - Optimized for containerized deployment
- ✅ `compress: true` - Enable gzip compression
- ✅ `swcMinify: true` - Faster minification
- ✅ `optimizeCss: true` - CSS optimization
- ✅ Image optimization with AVIF/WebP

### **2. Railway Configuration**
- ✅ `railway.json` - Railway-specific settings
- ✅ `nixpacks.toml` - Build configuration
- ✅ Node.js 18 specified

### **3. Build Optimizations**
- ✅ TypeScript strict mode
- ✅ Scripts excluded from build
- ✅ Optimized dependencies
- ✅ Production-ready settings

---

## 🚀 **Deploy to Railway**

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "chore: Optimize for Railway deployment"
git push origin main
```

### **Step 2: Connect to Railway**

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `AtlasGo` repository
5. Railway will auto-detect Next.js

### **Step 3: Add Environment Variables**

In Railway dashboard, add these variables:

```env
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_storyblok_api_token_here
STORYBLOK_MANAGEMENT_TOKEN=your_storyblok_management_token_here
STORYBLOK_SPACE_ID=your_space_id_here
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key_here
ALGOLIA_ADMIN_KEY=your_algolia_admin_key_here
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=production
```

### **Step 4: Deploy**

Railway will automatically:
1. ✅ Install dependencies (`npm ci`)
2. ✅ Build the project (`npm run build`)
3. ✅ Start the server (`npm start`)
4. ✅ Assign a public URL

---

## ⚙️ **Build Settings**

### **Automatic (Railway detects):**
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x
- **Install Command:** `npm ci`

### **Manual Override (if needed):**
Go to Settings → Deploy and set:
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

---

## 🔧 **Performance Optimizations**

### **1. Standalone Output**
```javascript
output: 'standalone'
```
- Reduces deployment size by 50%+
- Only includes necessary files
- Faster cold starts

### **2. Image Optimization**
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60
}
```
- Modern image formats
- Better compression
- Faster loading

### **3. CSS Optimization**
```javascript
experimental: {
  optimizeCss: true
}
```
- Smaller CSS bundles
- Faster page loads

### **4. Compression**
```javascript
compress: true
```
- Gzip compression enabled
- Reduced bandwidth usage

---

## 📊 **Expected Build Time**

- **First Build:** 3-5 minutes
- **Subsequent Builds:** 2-3 minutes
- **Deploy Time:** 30-60 seconds

---

## 🐛 **Troubleshooting**

### **Build Fails:**

**Error: "Module not found"**
```bash
# Solution: Clear cache and rebuild
railway run npm ci
railway run npm run build
```

**Error: "Out of memory"**
```bash
# Solution: Increase memory in Railway settings
# Settings → Resources → Memory: 2GB
```

**Error: "TypeScript errors"**
```bash
# Solution: Check tsconfig.json excludes scripts
# Already configured in project
```

### **Runtime Errors:**

**Error: "Environment variables not found"**
- Check all 7 env vars are set in Railway
- Restart deployment after adding vars

**Error: "API rate limits"**
- Storyblok: 1000 requests/hour (free tier)
- Algolia: 10,000 requests/month (free tier)
- GROQ: Check your plan limits

---

## 🔄 **Auto-Deploy**

Railway automatically deploys when you push to `main`:

```bash
git add .
git commit -m "Update content"
git push origin main
# Railway auto-deploys in 2-3 minutes
```

---

## 📈 **Monitoring**

### **Railway Dashboard:**
- **Deployments** - View build logs
- **Metrics** - CPU, Memory, Network usage
- **Logs** - Real-time application logs

### **Health Check:**
```bash
# Check if app is running
curl https://your-app.railway.app

# Check specific endpoints
curl https://your-app.railway.app/api/health
```

---

## 💰 **Cost Optimization**

### **Free Tier:**
- **$5 credit/month** (500 hours)
- **1 GB RAM**
- **1 GB Disk**
- **100 GB Bandwidth**

### **Tips to Stay Free:**
1. ✅ Use standalone output (smaller size)
2. ✅ Enable compression (less bandwidth)
3. ✅ Optimize images (faster loads)
4. ✅ Cache API responses
5. ✅ Use CDN for static assets

---

## 🌐 **Custom Domain**

### **Add Custom Domain:**
1. Go to Settings → Domains
2. Click "Add Domain"
3. Enter your domain: `atlasgo.com`
4. Add DNS records:
   ```
   Type: CNAME
   Name: @
   Value: your-app.railway.app
   ```

---

## 🔐 **Security**

### **Environment Variables:**
- ✅ Never commit `.env.local`
- ✅ Use Railway's secure storage
- ✅ Rotate API keys regularly

### **HTTPS:**
- ✅ Automatic SSL certificate
- ✅ Force HTTPS redirect
- ✅ Secure by default

---

## 📝 **Deployment Checklist**

- [ ] All environment variables added
- [ ] GitHub repo connected
- [ ] Build successful
- [ ] App accessible via URL
- [ ] Search working (Algolia)
- [ ] Content loading (Storyblok)
- [ ] AI itinerary working (GROQ)
- [ ] Images loading
- [ ] Blog posts visible
- [ ] Achievements tracking
- [ ] Maps displaying

---

## 🎯 **Post-Deployment**

### **1. Test All Features:**
```bash
# Homepage
https://your-app.railway.app

# Search
https://your-app.railway.app/search

# Blog
https://your-app.railway.app/blog

# Achievements
https://your-app.railway.app/achievements

# Place Detail
https://your-app.railway.app/place/taj-mahal
```

### **2. Monitor Performance:**
- Check Railway metrics
- Monitor API usage
- Watch error logs

### **3. Share Your App:**
- Update README with live URL
- Share on social media
- Submit to hackathon

---

## 🚀 **Quick Deploy Command**

```bash
# One-command deploy
git add . && git commit -m "Deploy to Railway" && git push origin main
```

---

## 📚 **Resources**

- [Railway Docs](https://docs.railway.app)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Discord](https://discord.gg/railway)

---

**Status:** ✅ Optimized and ready for Railway deployment!

**Estimated Deploy Time:** 3-5 minutes

**Your AtlasGo app will be live at:** `https://atlasgo-production.up.railway.app` 🚀
