# CitySense Demo Script

## 🎯 Contest Submission: Storyblok Code & Coffee

**Project:** CitySense - Personalized Travel Guide  
**Tracks:** AI + Storyblok Integration, Open Innovation  
**Demo Duration:** 3-5 minutes

---

## 📋 Pre-Demo Checklist

Before starting the demo, ensure:

- [ ] App is deployed and accessible
- [ ] Storyblok has 10+ places with images
- [ ] Algolia index is populated
- [ ] Webhook is configured and tested
- [ ] Browser is ready (clear cache/cookies)
- [ ] Screen recording software ready (if needed)

---

## 🎬 Demo Flow (5 Minutes)

### **Part 1: Smart Search with Personalization** (90 seconds)

**Script:**
> "CitySense is a personalized travel guide that combines Storyblok's CMS with AI-powered recommendations. Let me show you how it works."

**Actions:**
1. **Open Homepage** (`/`)
   - Show clean, modern UI
   - Click "Explore Places"

2. **Search Page** (`/search`)
   - Point out: "All content comes from Storyblok"
   - Type: `"museum"` in search box
   - Show instant results with images, ratings, tags

3. **Use Geolocation**
   - Click "📍 Use My Location" button
   - Show results re-rank by distance
   - Point out: "Algolia's geo-search in action"

4. **Open Preferences**
   - Click "⚙️ Preferences" button
   - Select interests: Food, Culture, Nightlife
   - Click "Save Preferences"
   - Show badge with "3" interests

5. **Search Again**
   - Type: `"best"` or `"top"`
   - Point out: "Results now boosted by my interests"
   - Show food/culture places ranked higher

**Key Points:**
- ✅ Real-time search powered by Algolia
- ✅ Personalization based on user interests
- ✅ Geo-location ranking
- ✅ Content from Storyblok CMS

---

### **Part 2: Interactive Maps & Districts** (60 seconds)

**Script:**
> "Each district has an interactive map with clustered markers showing all places."

**Actions:**
1. **Click a Place Card**
   - Go to place detail page
   - Show rich content: images, description, tags
   - Point out: "All from Storyblok's structured content"

2. **Click District Link**
   - Navigate to district page
   - Show map with clustered markers
   - Click a marker → popup with place info
   - Click "View Details" in popup

**Key Points:**
- ✅ Leaflet maps with clustering
- ✅ Rich content from Storyblok
- ✅ Seamless navigation

---

### **Part 3: AI-Powered Itinerary Generator** (90 seconds)

**Script:**
> "The most exciting feature: AI-powered itinerary generation using OpenAI and Algolia's search."

**Actions:**
1. **Navigate to Itinerary** (`/itinerary`)
   - Show form with preferences pre-filled

2. **Fill Form**
   - City: Lisbon
   - Dates: Tomorrow → 3 days from now
   - Districts: Select 2-3
   - Interests: Already selected (Food, Culture)
   - Pace: Moderate

3. **Generate Itinerary**
   - Click "✨ Generate Itinerary"
   - Show loading state (10-15 seconds)
   - **While waiting, explain:**
     > "Behind the scenes: Algolia searches Storyblok content, filters by interests and districts, then OpenAI creates a personalized day-by-day plan using only real places from our database."

4. **Show Results**
   - Point out day-by-day structure
   - Show Morning/Afternoon/Evening blocks
   - Click a place link → goes to detail page
   - Show estimated visit times and notes

**Key Points:**
- ✅ RAG (Retrieval-Augmented Generation)
- ✅ AI uses only real Storyblok content
- ✅ Personalized by interests and pace
- ✅ Actionable itinerary with links

---

### **Part 4: Real-Time Content Updates** (60 seconds)

**Script:**
> "The magic of Storyblok webhooks: content updates appear in search within seconds."

**Actions:**
1. **Open Storyblok** (in another tab)
   - Show a place in the editor
   - Make a visible change (e.g., update title or add tag)
   - Click "Publish"

2. **Back to CitySense**
   - Go to `/admin` dashboard
   - Show webhook status
   - (Optional) Click "Reindex All Places" to demonstrate

3. **Search for Updated Place**
   - Go back to `/search`
   - Search for the updated place
   - Show the change is live

**Key Points:**
- ✅ Webhook-driven reindexing
- ✅ Near real-time updates (5-10 seconds)
- ✅ Seamless content management

---

### **Part 5: Wrap-Up** (30 seconds)

**Script:**
> "CitySense demonstrates how Storyblok's headless CMS becomes exponentially more powerful when combined with AI, search, and geolocation. Content creators manage everything in Storyblok, while travelers get personalized, AI-powered recommendations."

**Highlight:**
- **Storyblok:** Structured content, easy management
- **Algolia:** Instant search, geo-ranking, facets
- **OpenAI:** Intelligent itinerary generation
- **Result:** Smarter content experiences

---

## 🎥 Video Recording Tips

### Setup
- **Resolution:** 1080p minimum
- **Duration:** 3-5 minutes (judges prefer concise)
- **Audio:** Clear voiceover or captions
- **Screen:** Close unnecessary tabs/apps

### Structure
1. **Intro (10s):** Project name + tagline
2. **Problem (15s):** Why this matters
3. **Demo (3-4min):** Follow script above
4. **Outro (15s):** Tech stack + thank you

### Tools
- **Screen Recording:** OBS Studio, Loom, or QuickTime
- **Editing:** DaVinci Resolve (free), iMovie, or Camtasia
- **Hosting:** YouTube (unlisted), Vimeo, or Loom

---

## 📝 Talking Points

### Why CitySense?

> "Travel planning is overwhelming. CitySense solves this by combining:
> - **Structured content** from Storyblok
> - **Instant search** with Algolia
> - **AI intelligence** from OpenAI
> 
> The result: personalized travel guides that adapt to each user's interests."

### Technical Innovation

> "This isn't just a CMS with a frontend. It's a complete content-to-intelligence pipeline:
> 1. Content creators manage places in Storyblok
> 2. Webhooks auto-sync to Algolia for instant search
> 3. Users personalize their experience
> 4. AI generates custom itineraries using real content
> 
> It's RAG (Retrieval-Augmented Generation) meets headless CMS."

### Business Value

> "For cities and tourism boards:
> - Easy content management (no code)
> - Personalized visitor experiences
> - Real-time updates
> - AI-powered recommendations
> - Scalable architecture"

---

## 🏆 Judge Evaluation Criteria

### Innovation (30%)
- ✅ Unique combination of Storyblok + AI + Search
- ✅ RAG implementation with real CMS content
- ✅ Personalization engine

### Technical Implementation (30%)
- ✅ Clean, production-ready code
- ✅ Proper use of Storyblok APIs
- ✅ Webhook integration
- ✅ TypeScript + Next.js 14

### User Experience (20%)
- ✅ Intuitive UI/UX
- ✅ Fast, responsive
- ✅ Accessible design
- ✅ Mobile-friendly

### Practical Application (20%)
- ✅ Real-world use case
- ✅ Scalable solution
- ✅ Clear value proposition

---

## 🐛 Demo Troubleshooting

### If Search Doesn't Work
- Check Algolia index has records
- Run `/admin` → "Reindex All Places"
- Verify environment variables

### If AI Generation Fails
- Check OpenAI API key
- Verify account has credits
- Check browser console for errors
- Fallback: Show pre-generated itinerary

### If Webhook Demo Fails
- Skip it and explain the concept
- Show webhook logs in Storyblok
- Show admin dashboard instead

### If Map Doesn't Load
- Check internet connection
- Verify Leaflet CDN is accessible
- Fallback: Show list view

---

## 📊 Metrics to Highlight

- **Search Speed:** < 50ms (Algolia)
- **Itinerary Generation:** 10-20 seconds
- **Webhook Latency:** 5-10 seconds
- **Content Types:** 4 (Place, District, City Guide, Itinerary Template)
- **Features:** Search, Maps, Personalization, AI Itineraries

---

## 🎁 Bonus Points

### Show Code Quality
- Open GitHub repo
- Show TypeScript types
- Highlight clean architecture

### Show Storyblok Integration
- Demonstrate content model
- Show visual editor
- Explain component structure

### Show Scalability
- Mention Algolia can handle millions of records
- Explain caching strategy
- Discuss performance optimizations

---

## ✅ Post-Demo Checklist

After recording:
- [ ] Video is 3-5 minutes
- [ ] Audio is clear
- [ ] All features demonstrated
- [ ] No sensitive data visible (API keys)
- [ ] Uploaded to hosting platform
- [ ] Link added to Devpost submission

---

## 📎 Submission Checklist

- [ ] Devpost submission complete
- [ ] Demo video uploaded and linked
- [ ] GitHub repo public and linked
- [ ] README has setup instructions
- [ ] Screenshots added
- [ ] Tech stack listed
- [ ] Team members added
- [ ] Submission tracks selected

---

## 🎤 Sample Script (Full)

```
[0:00-0:10] INTRO
"Hi! I'm excited to show you CitySense - a personalized travel guide that combines Storyblok's CMS with AI-powered recommendations."

[0:10-0:20] PROBLEM
"Planning travel is overwhelming. You need local insights, personalized recommendations, and up-to-date information. CitySense solves this."

[0:20-1:50] SEARCH & PERSONALIZATION
"All content is managed in Storyblok. Let me search for museums... instant results with Algolia. Now I'll use my location... results re-rank by distance. Let me set my preferences: Food, Culture, Nightlife. Now when I search, results are boosted by my interests."

[1:50-2:50] MAPS & CONTENT
"Each district has an interactive map. Markers cluster automatically. Click one... rich content from Storyblok. Everything is structured and easy to manage."

[2:50-4:20] AI ITINERARY
"The most exciting feature: AI-powered itineraries. I'll enter my dates, select districts, and my interests are already set. Generate... Behind the scenes, Algolia searches Storyblok content, filters by my preferences, then OpenAI creates a personalized plan using only real places. Here's my 3-day itinerary, organized by time of day, with links to each place."

[4:20-4:50] REAL-TIME UPDATES
"Content updates are instant. When I publish a change in Storyblok, webhooks trigger reindexing, and it appears in search within seconds. Here's the admin dashboard showing webhook status."

[4:50-5:00] WRAP-UP
"CitySense shows how Storyblok becomes exponentially more powerful with AI and search. Content creators use Storyblok, travelers get personalized AI recommendations. Thank you!"
```

---

## 🚀 Good Luck!

Remember:
- **Be enthusiastic** - Show your passion
- **Be concise** - Respect judges' time
- **Be clear** - Explain technical concepts simply
- **Be prepared** - Have backup plans

**You've built something amazing. Now show it off!** 🎉
