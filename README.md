# 🌍 AtlasGo - Intelligent Travel Discovery Platform

> **Powered by Storyblok CMS & Algolia Search**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Storyblok](https://img.shields.io/badge/Storyblok-CMS-purple)](https://www.storyblok.com/)
[![Algolia](https://img.shields.io/badge/Algolia-Search-blue)](https://www.algolia.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

**Built for Storyblok & Algolia Hackathon 2025**

## 🎯 Overview

AtlasGo is a next-generation travel discovery platform that revolutionizes how people explore and plan trips worldwide. By combining **Storyblok's flexible headless CMS**, **Algolia's lightning-fast search**, and **AI-powered personalization**, we've created an intelligent travel companion that makes trip planning effortless and enjoyable.

### 🏗️ **Tech Stack**
- **Frontend:** Next.js 14 with App Router, TypeScript, TailwindCSS
- **CMS:** Storyblok (84+ content items across 10 content types)
- **Search:** Algolia (sub-50ms response, geo-search, faceted filters)
- **AI:** GROQ (Llama 3.3 70B) for itinerary generation
- **Maps:** Leaflet with OpenStreetMap
- **Gamification:** Achievement system with points & levels
- **Deployment:** Railway / Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Storyblok account and space
- Algolia account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd atlasgo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `NEXT_PUBLIC_STORYBLOK_API_TOKEN`
- `STORYBLOK_MANAGEMENT_TOKEN`
- `ALGOLIA_APP_ID`
- `ALGOLIA_SEARCH_KEY`
- `ALGOLIA_ADMIN_KEY`
- `OPENAI_API_KEY`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run reindex` - Manually reindex all places to Algolia
- `npm run algolia:settings` - Configure Algolia index settings

## Project Structure

```
atlasgo/
├── app/                    # Next.js 14 app directory
│   ├── page.tsx           # Home page
│   ├── search/            # Search page
│   ├── district/[slug]/   # District detail pages
│   ├── place/[slug]/      # Place detail pages
│   ├── itinerary/         # AI itinerary generator
│   └── admin/             # Admin dashboard
├── components/            # React components
├── lib/                   # Utility functions and clients
├── types/                 # TypeScript type definitions
├── scripts/               # Utility scripts
└── pages/api/            # API routes (serverless functions)
```

## ✨ Key Features

### 🔍 **Lightning-Fast Search (Powered by Algolia)**
- **Sub-50ms response time** - Instant search results as you type
- **Geo-location search** - Find places near you with coordinates
- **7 Faceted filters** - Country, City, District, Type, Price, Interests, Sort
- **Typo-tolerance** - Smart search that understands mistakes
- **Custom ranking** - Relevance, rating, popularity, distance
- **48+ places** across 6 countries indexed and searchable

**How Algolia is Used:**
- Content from Storyblok is automatically indexed to Algolia
- Real-time synchronization via custom reindex pipeline
- Geo-search with latitude/longitude coordinates
- Advanced filtering with multiple refinement options
- Optimized index settings for travel search

### 📝 **Smart Content Management (Powered by Storyblok)**
- **84+ content items** managed through Storyblok CMS
- **10 content types**: Places, Blog Posts, Travel Guides, Local Tips, Food Guides, Events, Neighborhoods, Collections, Testimonials, Interactive Stories
- **Structured content** with custom schemas and relationships
- **Rich media management** with CDN-optimized images
- **API-first architecture** for flexible content delivery
- **Visual Editor** integration for live preview and editing

**How Storyblok is Used:**
- All travel content stored in Storyblok with structured schemas
- Content Delivery API for real-time frontend fetching
- Management API for automated content creation via scripts
- Relationships between content types (collections → places → blogs)
- Visual Editor for click-to-edit functionality
- Easy updates without code deployment

### 🤖 **AI-Powered Trip Planning**
- **GROQ AI (Llama 3.3 70B)** generates personalized itineraries
- **Context-aware** - Uses real place data from Storyblok
- **Day-by-day planning** based on preferences and dates
- **Smart suggestions** with optimized routes and timing

### 🗺️ **Interactive Maps**
- **Leaflet maps** with marker clustering
- **Visual discovery** - See all places on the map
- **Click for details** - Popups with place information
- **Geo-location** - Distance-based results

### 🌍 **Global Coverage**
- **48+ Places** across 6 countries
- 🇮🇳 India • 🇺🇸 USA • 🇨🇳 China • 🇳🇿 New Zealand • 🇿🇦 South Africa • 🇵🇹 Portugal
- **Curated collections** - Museums, Parks, Landmarks, Hidden Gems
- **Travel guides** with local tips and recommendations
- **11 Blog posts** - 3 general + 8 location-specific

### 📰 **Blog & Content Discovery**
- **Dynamic blog system** with rich text content
- **Location-specific blogs** linked to places
- **Search functionality** - Find stories by title, location, or topic
- **AI recommendations** - Personalized content suggestions
- **Author profiles** with avatars and bios
- **Category filtering** - Travel Guides, Food & Dining, Sustainable Travel
- **Related content** - Blogs appear on place detail pages

### 🎮 **Gamification System**
- **10 Achievements** across 4 categories (Explorer, Collector, Expert, Social)
- **Point system** - Earn 10-500 points per achievement
- **Level progression** - 100 points per level
- **Rarity tiers** - Common, Rare, Epic, Legendary
- **Auto-tracking** - Place visits, blog reads, itinerary creation
- **Progress dashboard** - View stats, unlocked achievements, and progress
- **Rewards** - Unlock badges and special features

### 🎬 **Interactive Storytelling**
- **Parallax scrolling** - Cinematic travel stories
- **Multiple section types** - Hero, Timeline, Gallery, Quote, CTA
- **Progress tracking** - Visual scroll progress indicator
- **Smooth animations** - Engaging user experience
- **Navigation dots** - Jump to any section
- **Responsive design** - Perfect on all devices

## Development Progress

- [x] Step 1: Project scaffold
- [x] Step 2: Storyblok client and types
- [x] Step 3: Content model schemas
- [x] Step 4: Algolia reindex API
- [x] Step 5: Webhook setup
- [x] Step 6: Algolia settings
- [x] Step 7: Search UI
- [x] Step 8: Map integration
- [x] Step 9: Place pages
- [x] Step 10: Personalization
- [x] Step 11: AI itinerary
- [x] Step 12: Real-time reindex
- [x] Step 13: Polish & deployment
- [x] Step 14: Demo script

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Setup Storyblok:**
   - Follow `storyblok/SETUP_INSTRUCTIONS.md`
   - Import content models
   - Add sample content

4. **Configure Algolia:**
   ```bash
   npm run algolia:settings
   ```

5. **Initial reindex:**
   ```bash
   npm run reindex
   ```

6. **Start development:**
   ```bash
   npm run dev
   ```

7. **Open browser:**
   - Homepage: http://localhost:3000
   - Search: http://localhost:3000/search
   - Blog: http://localhost:3000/blog
   - Achievements: http://localhost:3000/achievements
   - Place Detail: http://localhost:3000/place/taj-mahal

## 🏗️ **How It's Built**

### **Architecture Overview**

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  Storyblok  │─────▶│   Next.js    │◀─────│   Algolia   │
│     CMS     │      │   Frontend   │      │   Search    │
└─────────────┘      └──────────────┘      └─────────────┘
      │                      │                      │
      │                      │                      │
      ▼                      ▼                      ▼
  Content API          User Interface         Search API
  Management API       Components             Geo-Search
  Webhooks            AI Integration          Facets
```

### **Content Flow**

1. **Content Creation** → Content editors create/update places in Storyblok
2. **API Delivery** → Next.js fetches content via Storyblok API
3. **Search Indexing** → Custom pipeline syncs Storyblok → Algolia
4. **User Search** → Algolia returns instant, relevant results
5. **Display** → Next.js renders content with maps and AI features

### **Key Integrations**

**Storyblok + Next.js:**
- Content Delivery API for SSR/SSG
- Dynamic routing for place pages
- Real-time content updates
- Image optimization via Storyblok CDN

**Algolia + Next.js:**
- React InstantSearch components
- Custom search UI with filters
- Geo-search with coordinates
- Real-time search as you type

**Storyblok + Algolia:**
- Automated sync pipeline
- Reindex on content changes
- Structured data transformation
- Webhook integration (future)

## 📊 **Content Statistics**

- **48 Places** across 6 countries
- **11 Blog Posts** (3 general + 8 location-specific)
- **10 Achievements** for gamification
- **2 Travel Guides** (Lisbon, NYC)
- **2 Local Tips** sections
- **4 Featured Collections**
- **4 Testimonials** with 5-star ratings
- **2 FAQ Sections** (8 questions)
- **Total: 84+ content items**

## 🚀 **Scripts & Commands**

```bash
npm run dev                 # Start development server
npm run build               # Build for production
npm run start               # Start production server
npm run reindex             # Reindex all content to Algolia
npm run add:places          # Add sample Lisbon places
npm run add:global          # Add global places (6 countries)
npm run add:sections        # Add travel guides & tips
npm run add:features        # Add collections & testimonials
npm run add:blog            # Add general blog posts
npm run add:location-blogs  # Add location-specific blogs
```

## 📝 **Documentation**

- **Setup Guide:** `SETUP_GUIDE.md`
- **Deployment:** `DEPLOYMENT_SUMMARY.md`
- **Contributing:** `CONTRIBUTING.md`
- **Storyblok Setup:** `storyblok/SETUP_INSTRUCTIONS.md`
- **Blog Features:** `BLOG_ENHANCEMENTS.md`
- **Location Blogs:** `LOCATION_BLOGS_SUMMARY.md`
- **Storyblok Features:** `STORYBLOK_FEATURES.md`
- **Advanced Features:** `ADVANCED_FEATURES.md`

## 🏆 **Built For**

**Storyblok & Algolia Hackathon 2025**

This project demonstrates the power of combining:
- **Storyblok's flexible, headless CMS** - 84+ content items, 10 content types, Visual Editor
- **Algolia's lightning-fast search** - Sub-50ms, geo-search, 7 faceted filters
- **AI for personalization** - GROQ AI for itineraries, AI recommendations
- **Modern web technologies** - Next.js 14, TypeScript, TailwindCSS
- **Innovative features** - Gamification, Interactive Storytelling, Blog System

### **Key Highlights:**
- ✅ **10 Content Types** in Storyblok
- ✅ **84+ Content Items** managed via CMS
- ✅ **11 Blog Posts** with location integration
- ✅ **10 Achievements** for gamification
- ✅ **48+ Places** across 6 countries
- ✅ **Sub-50ms Search** with Algolia
- ✅ **AI-Powered** itinerary generation
- ✅ **Interactive Storytelling** with parallax effects
- ✅ **Visual Editor** integration
- ✅ **Content Relationships** (places ↔ blogs ↔ collections)

## 📧 **Contact**

For questions or feedback about this project, please open an issue on GitHub.

## 📄 **License**

MIT License - see LICENSE file for details

---

**Powered by Storyblok CMS & Algolia Search** 🚀
