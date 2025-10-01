/**
 * Setup script to create Storyblok content models via Management API
 * Run with: npx tsx scripts/setup-storyblok.ts
 */

import StoryblokClient from 'storyblok-js-client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ STORYBLOK_MANAGEMENT_TOKEN not set in .env.local');
  process.exit(1);
}

if (!SPACE_ID) {
  console.error('❌ STORYBLOK_SPACE_ID not set in .env.local');
  console.log('💡 Get your Space ID from Storyblok → Settings → General');
  process.exit(1);
}

const client = new StoryblokClient({
  oauthToken: MANAGEMENT_TOKEN,
});

async function createComponent(schema: any) {
  try {
    console.log(`📦 Creating component: ${schema.name}...`);
    
    const response = await client.post(`spaces/${SPACE_ID}/components`, {
      component: schema,
    });
    
    console.log(`✅ Created: ${schema.name}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error?.includes('already exists')) {
      console.log(`⚠️  Component ${schema.name} already exists, skipping...`);
    } else {
      console.error(`❌ Error creating ${schema.name}:`, error.response?.data || error.message);
    }
  }
}

async function main() {
  console.log('🚀 Setting up Storyblok content models...\n');
  
  // Load schemas
  const schemasDir = path.join(__dirname, '../storyblok/schemas');
  const placeSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'place.json'), 'utf-8'));
  const districtSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'district.json'), 'utf-8'));
  
  // Create components
  await createComponent(placeSchema);
  await createComponent(districtSchema);
  
  console.log('\n✨ Setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Go to Storyblok → Content');
  console.log('2. Create folders: places/ and districts/');
  console.log('3. Add sample content (5-10 places minimum)');
  console.log('4. Run: npm run reindex');
}

main().catch(console.error);
