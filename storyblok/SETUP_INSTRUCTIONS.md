# Storyblok Content Model Setup Instructions

This guide will help you set up the content model in your Storyblok space.

## Method 1: Manual Setup via Storyblok UI (Recommended for beginners)

### Step 1: Create Components

1. Log in to your Storyblok space
2. Go to **Block Library** in the left sidebar
3. Click **+ New** to create a new component

#### Create "Place" Component

1. Name: `place`
2. Display Name: `Place`
3. Component Type: **Nestable**
4. Add all fields from `schemas/place.json` following the schema structure:
   - Click **+ Add field** for each field
   - Set the field type, name, and options as specified in the JSON
   - Use the `pos` value to order fields correctly

#### Create "District" Component

1. Name: `district`
2. Display Name: `District`
3. Component Type: **Content type** (is_root: true)
4. Add all fields from `schemas/district.json`

#### Create "City Guide" Component

1. Name: `city_guide`
2. Display Name: `City Guide`
3. Component Type: **Content type** (is_root: true)
4. Add all fields from `schemas/city_guide.json`

#### Create "Itinerary Template" Component

1. Name: `itinerary_template`
2. Display Name: `Itinerary Template`
3. Component Type: **Content type** (is_root: true)
4. Add all fields from `schemas/itinerary_template.json`

### Step 2: Create Folder Structure

1. Go to **Content** in the left sidebar
2. Create the following folders:
   - `places/` - for all place stories
   - `districts/` - for all district stories
   - `cities/` - for city guide stories
   - `itineraries/` - for itinerary templates

### Step 3: Create Sample Content

#### Sample District: "Alfama"

1. Go to `districts/` folder
2. Click **+ Entry** → Select **District**
3. Fill in:
   - Name: `Alfama`
   - City: `Lisbon`
   - Short Excerpt: `Historic hillside neighborhood with narrow streets and Fado music`
   - Description: Add rich text content
   - Banner Image: Upload an image
   - Latitude: `38.7131`
   - Longitude: `-9.1289`
   - Tags: `historic`, `traditional`, `hillside`
4. Click **Publish**

#### Sample Place: "Castelo de São Jorge"

1. Go to `places/` folder
2. Click **+ Entry** → Select **Place**
3. Fill in:
   - Title: `Castelo de São Jorge`
   - Type: `attraction`
   - Short Excerpt: `Medieval castle with panoramic views of Lisbon`
   - Description: Add rich text content
   - District: `Alfama`
   - City: `Lisbon`
   - Address: `R. de Santa Cruz do Castelo, 1100-129 Lisboa`
   - Latitude: `38.7139`
   - Longitude: `-9.1334`
   - Tags: `culture`, `history`, `outdoor`
   - Price Range: `$$`
   - Rating: `4.5`
   - Popularity Score: `85`
   - Opening Hours: `9:00 AM - 9:00 PM`
   - Estimated Visit Time: `90` (minutes)
   - Images: Upload images
4. Click **Publish**

#### Create More Sample Places

Create at least 10-15 places across different districts with varied:
- Types (restaurant, museum, park, nightlife, etc.)
- Price ranges
- Tags (to test personalization)
- Locations (to test geo-search)

## Method 2: Using Storyblok CLI v4 (Advanced)

### Prerequisites

```bash
npm install -g @storyblok/cli
```

### Step 1: Login to Storyblok CLI

```bash
storyblok login
```

### Step 2: Select Your Space

```bash
storyblok select-space
```

### Step 3: Push Components

```bash
# Push all components at once
storyblok push-components storyblok/schemas/place.json --space YOUR_SPACE_ID
storyblok push-components storyblok/schemas/district.json --space YOUR_SPACE_ID
storyblok push-components storyblok/schemas/city_guide.json --space YOUR_SPACE_ID
storyblok push-components storyblok/schemas/itinerary_template.json --space YOUR_SPACE_ID
```

**Note:** You may need to adjust the JSON schema format to match Storyblok CLI v4 requirements. Check the [official CLI documentation](https://www.storyblok.com/mp/introducing-storyblok-cli-v4) for the latest format.

## Method 3: Using Management API (Programmatic)

Create a script to push components via the Management API:

```typescript
// scripts/setup-storyblok.ts
import StoryblokClient from 'storyblok-js-client';
import placeSchema from '../storyblok/schemas/place.json';
import districtSchema from '../storyblok/schemas/district.json';
// ... import other schemas

const client = new StoryblokClient({
  accessToken: process.env.STORYBLOK_MANAGEMENT_TOKEN,
});

async function createComponents() {
  const spaceId = YOUR_SPACE_ID;
  
  // Create place component
  await client.post(`spaces/${spaceId}/components`, {
    component: placeSchema
  });
  
  // Create other components...
}

createComponents();
```

## Verification

After setup, verify:

1. ✅ All 4 components are visible in Block Library
2. ✅ Folder structure exists in Content
3. ✅ At least 1 district and 5 places are published
4. ✅ Places have valid coordinates (lat/lng)
5. ✅ Images are uploaded and accessible

## Next Steps

Once content is created:

1. Copy your **Preview Token** from Settings → Access Tokens
2. Add it to `.env` as `NEXT_PUBLIC_STORYBLOK_API_TOKEN`
3. Run the reindex script to push content to Algolia:
   ```bash
   npm run reindex
   ```

## Sample Data Template

For quick testing, here's a CSV template for bulk import:

```csv
title,type,district,city,latitude,longitude,short_excerpt,tags,price_range,rating,popularity_score
"Castelo de São Jorge","attraction","Alfama","Lisbon",38.7139,-9.1334,"Medieval castle with views","culture,history","$$",4.5,85
"Time Out Market","restaurant","Cais do Sodré","Lisbon",38.7071,-9.1458,"Food hall with local vendors","food,indoor","$$",4.3,90
"LX Factory","shopping","Alcântara","Lisbon",38.7065,-9.1766,"Creative hub with shops and cafes","shopping,art,trendy","$$",4.4,75
```

Import via Storyblok's CSV import feature or create stories programmatically.

## Troubleshooting

**Issue:** Components not showing in Block Library
- **Solution:** Check component type (nestable vs content type)

**Issue:** Relations not working
- **Solution:** Ensure folder slugs match in the schema (e.g., `places/`, `districts/`)

**Issue:** Images not loading
- **Solution:** Check image domains in `next.config.mjs`

## Support

- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Storyblok CLI v4 Guide](https://www.storyblok.com/mp/introducing-storyblok-cli-v4)
- [Management API Reference](https://www.storyblok.com/docs/api/management)
