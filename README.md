# AtlasGo - Explore the World, Your Way

**Tagline:** Your intelligent travel companion

## Overview

AtlasGo is an intelligent travel platform that combines the power of Storyblok's headless CMS, Algolia's lightning-fast search, and AI to create personalized global travel experiences. Discover amazing places worldwide with smart recommendations, real-time content, and AI-powered trip planning.

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **CMS:** Storyblok
- **Search:** Algolia (geo-enabled, faceted search)
- **Map:** Leaflet (open-source)
- **AI:** GROQ (Llama 3.3) - AI-powered itinerary generation
- **Deployment:** Vercel

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

## Features

### 🔍 Smart Search & Discovery
- **Lightning-fast search** - Algolia-powered instant results
- **Geo-location ranking** - Find places near you
- **Country/City/District hierarchy** - Organized global exploration
- **Advanced filtering** - Type, price, tags, accessibility
- **Multiple sort options** - Relevance, rating, popularity, distance

### 🗺️ Interactive Maps
- **Leaflet-based maps** with clustered markers
- **District exploration** - Browse by neighborhood
- **Real-time location** - Distance-based results
- **Visual discovery** - See places on the map

### 🎯 Personalization
- **User preferences** - Save your interests
- **Smart recommendations** - AI-powered suggestions
- **Customized rankings** - Results tailored to you
- **Trip planning tips** - Contextual guidance

### 🤖 AI-Powered Features
- **Itinerary generation** - GROQ AI creates day-by-day plans
- **Context-aware** - Considers your pace and interests
- **Smart suggestions** - Optimized routes and timing
- **Personalized experiences** - Unique to your preferences

### ⚡ Real-time Content
- **Storyblok webhooks** - Instant content updates
- **Auto-indexing** - Changes appear immediately
- **Live events** - Always up-to-date information
- **Dynamic content** - Fresh recommendations

### 🌍 Global & Accessible
- **Multi-country support** - Explore the world
- **Searchable filters** - Find any destination
- **Accessibility features** - Inclusive design
- **Mobile-optimized** - Perfect for travelers

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
   - Admin: http://localhost:3000/admin

## Documentation

- **Setup:** `storyblok/SETUP_INSTRUCTIONS.md`
- **Webhooks:** `docs/WEBHOOK_SETUP.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **Demo Script:** `docs/DEMO_SCRIPT.md`
- **Checklist:** `docs/ACCEPTANCE_CHECKLIST.md`

## 🚀 New Features for Competition

See `COMPETITION_FEATURES.md` for detailed feature proposals including:
- Visual search & image recognition
- Weather-aware recommendations
- Collaborative trip planning
- AR place preview
- Offline PWA mode
- And 10+ more innovative features!

## Contributing

This project was built for the **Storyblok & Algolia Code & Coffee Hackathon 2025**.

## License

MIT
