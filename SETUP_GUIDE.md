# 🚀 CitySense Setup Guide - Step by Step

Follow these steps in order to get CitySense running.

---

## ✅ Step 1: Install Dependencies (IN PROGRESS)

```bash
npm install
```

**Status:** Running in background...

**What it does:** Installs all required packages (Next.js, React, Storyblok, Algolia, OpenAI, Leaflet, etc.)

---

## 📝 Step 2: Get API Keys (NEXT)

You need API keys from 3 services. Let's get them one by one:

### **A. Storyblok API Keys**

1. **Go to:** https://app.storyblok.com/
2. **Sign up/Login** (free account)
3. **Create a new Space:**
   - Click "Create Space"
   - Name: "CitySense"
   - Region: Choose closest to you
   - Plan: Free (Community)

4. **Get Preview Token:**
   - Go to Settings → Access Tokens
   - Copy the "Preview" token
   - Paste in `.env.local` as `NEXT_PUBLIC_STORYBLOK_API_TOKEN`

5. **Get Management Token:**
   - Same page (Settings → Access Tokens)
   - Click "Personal Access Tokens" tab
   - Create new token with name "CitySense Management"
   - Copy token
   - Paste in `.env.local` as `STORYBLOK_MANAGEMENT_TOKEN`

### **B. Algolia API Keys**

1. **Go to:** https://www.algolia.com/
2. **Sign up** (free tier: 10K searches/month)
3. **Create Application:**
   - Name: "CitySense"
   - Region: Choose closest

4. **Get App ID:**
   - Dashboard → Settings → API Keys
   - Copy "Application ID"
   - Paste in `.env.local` as both:
     - `ALGOLIA_APP_ID`
     - `NEXT_PUBLIC_ALGOLIA_APP_ID`

5. **Get Search Key:**
   - Same page, copy "Search-Only API Key"
   - Paste in `.env.local` as both:
     - `ALGOLIA_SEARCH_KEY`
     - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY`

6. **Get Admin Key:**
   - Same page, copy "Admin API Key"
   - ⚠️ Keep this secret!
   - Paste in `.env.local` as `ALGOLIA_ADMIN_KEY`

### **C. OpenAI API Key**

1. **Go to:** https://platform.openai.com/
2. **Sign up/Login**
3. **Add credits:** (minimum $5 for testing)
   - Go to Billing → Add payment method
   - Add $5-10 credits

4. **Create API Key:**
   - Go to API Keys
   - Click "Create new secret key"
   - Name: "CitySense"
   - Copy the key (starts with `sk-`)
   - Paste in `.env.local` as `OPENAI_API_KEY`

---

## 🗂️ Step 3: Setup Storyblok Content Models

Once you have Storyblok keys, create the content structure:

### **Option 1: Manual (Recommended for learning)**

1. **Go to Storyblok → Block Library**
2. **Create "Place" Component:**
   - Click "+ New"
   - Name: `place`
   - Type: Nestable
   - Add fields from: `storyblok/schemas/place.json`
   - Follow the schema exactly

3. **Create "District" Component:**
   - Name: `district`
   - Type: Content type
   - Add fields from: `storyblok/schemas/district.json`

4. **Create folders in Content:**
   - `places/`
   - `districts/`

### **Option 2: Using Storyblok CLI (Faster)**

```bash
npm install -g @storyblok/cli
storyblok login
storyblok push-components storyblok/schemas/place.json --space YOUR_SPACE_ID
storyblok push-components storyblok/schemas/district.json --space YOUR_SPACE_ID
```

**Full instructions:** See `storyblok/SETUP_INSTRUCTIONS.md`

---

## 📍 Step 4: Add Sample Content to Storyblok

Create at least **5-10 places** for testing:

### **Sample Place 1: Castelo de São Jorge**
- Title: `Castelo de São Jorge`
- Type: `attraction`
- District: `Alfama`
- City: `Lisbon`
- Latitude: `38.7139`
- Longitude: `-9.1334`
- Short Excerpt: `Medieval castle with panoramic views of Lisbon`
- Tags: `culture`, `history`, `outdoor`
- Price Range: `$$`
- Rating: `4.5`
- Popularity Score: `85`
- Estimated Visit Time: `90`
- Upload 1-2 images

### **Sample Place 2: Time Out Market**
- Title: `Time Out Market`
- Type: `restaurant`
- District: `Cais do Sodré`
- City: `Lisbon`
- Latitude: `38.7071`
- Longitude: `-9.1458`
- Short Excerpt: `Food hall featuring Lisbon's best chefs and restaurants`
- Tags: `food`, `indoor`
- Price Range: `$$`
- Rating: `4.3`
- Popularity Score: `90`

**Create 3-8 more places** with different:
- Types (museum, park, nightlife, shopping)
- Districts
- Tags (to test personalization)
- Coordinates (to test geo-search)

---

## 🔍 Step 5: Configure Algolia Index

After adding content to Storyblok, configure Algolia:

```bash
npm run algolia:settings
```

**What it does:**
- Creates searchable attributes
- Sets up facets (filters)
- Configures geo-search
- Adds synonyms
- Sets custom ranking

---

## 🔄 Step 6: Initial Reindex

Push your Storyblok content to Algolia:

```bash
npm run reindex
```

**Expected output:**
```
🚀 Starting manual reindex...
📚 Fetching places from Storyblok...
✅ Found 10 places
🔍 Indexing to Algolia...
✅ Successfully indexed 10 places
🎉 Reindex complete!
```

---

## 🎨 Step 7: Start Development Server

```bash
npm run dev
```

**Open in browser:**
- Homepage: http://localhost:3000
- Search: http://localhost:3000/search
- Itinerary: http://localhost:3000/itinerary
- Admin: http://localhost:3000/admin

---

## ✅ Step 8: Test Features

### **Test 1: Search**
1. Go to `/search`
2. Type "museum" or "food"
3. Should see instant results
4. Try filters (Type, District, Price)

### **Test 2: Geolocation**
1. On search page, click "📍 Use My Location"
2. Allow browser location access
3. Results should re-rank by distance

### **Test 3: Personalization**
1. Click "⚙️ Preferences"
2. Select interests: Food, Culture, Nightlife
3. Save preferences
4. Search again - results should boost matching tags

### **Test 4: Maps**
1. Click on a place card
2. Should see place detail page with map
3. Click district link
4. Should see district page with clustered markers

### **Test 5: AI Itinerary**
1. Go to `/itinerary`
2. Fill form:
   - City: Lisbon
   - Dates: Tomorrow → 3 days from now
   - Select 2-3 districts
   - Select interests
   - Pace: Moderate
3. Click "Generate Itinerary"
4. Wait 10-20 seconds
5. Should see day-by-day plan

### **Test 6: Admin Dashboard**
1. Go to `/admin`
2. Click "Reindex All Places"
3. Should see success message

---

## 🔗 Step 9: Setup Webhook (Optional for now)

**Do this after deployment to Vercel**

See: `docs/WEBHOOK_SETUP.md`

---

## 🚀 Step 10: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

**Or use Vercel Dashboard:**
1. Go to https://vercel.com
2. Import GitHub repo
3. Add environment variables
4. Deploy

**Full instructions:** See `docs/DEPLOYMENT.md`

---

## 🎬 Step 11: Create Demo Video

Follow: `docs/DEMO_SCRIPT.md`

---

## 🏆 Step 12: Submit to Devpost

1. Go to: https://storyblok-code-coffee.devpost.com/
2. Click "Submit Project"
3. Fill in:
   - Title: CitySense - Personalized Travel Guide
   - Tagline: Your city, your way — instantly searchable
   - Description: (from README)
   - Demo video link
   - GitHub repo link
   - Screenshots
4. Select tracks:
   - ✅ Combine AI with Storyblok
   - ✅ Open Innovation
5. Submit!

---

## 🐛 Troubleshooting

### **npm install fails**
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### **TypeScript errors**
- These will resolve after `npm install` completes
- If persists, check `tsconfig.json`

### **Search returns no results**
```bash
# Reindex from scratch
npm run reindex
```

### **AI generation fails**
- Check OpenAI API key is valid
- Verify account has credits
- Check browser console for errors

### **Map doesn't load**
- Check internet connection
- Verify Leaflet CDN is accessible
- Check browser console

---

## 📞 Need Help?

Check these resources:
- **Storyblok Docs:** https://www.storyblok.com/docs
- **Algolia Docs:** https://www.algolia.com/doc/
- **OpenAI Docs:** https://platform.openai.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## ✨ You're Ready!

Once you complete these steps, you'll have a fully functional AI-powered travel guide!

**Current Status:**
- [x] Step 1: npm install (running)
- [ ] Step 2: Get API keys
- [ ] Step 3: Setup Storyblok
- [ ] Step 4: Add content
- [ ] Step 5: Configure Algolia
- [ ] Step 6: Reindex
- [ ] Step 7: Start dev server
- [ ] Step 8: Test features
- [ ] Step 9: Setup webhook
- [ ] Step 10: Deploy
- [ ] Step 11: Demo video
- [ ] Step 12: Submit

**Next:** Wait for npm install to complete, then get your API keys!
