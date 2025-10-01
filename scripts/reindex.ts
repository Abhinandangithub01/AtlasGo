/**
 * Manual reindex script
 * Run with: npm run reindex
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';
import algoliasearch from 'algoliasearch';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function reindex() {
  console.log('🚀 Starting manual reindex...\n');
  
  // Debug: Check if env vars are loaded
  console.log('🔍 Debug - Environment variables:');
  const token = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;
  console.log(`   STORYBLOK_API_TOKEN: ${token ? `✅ ${token.substring(0, 10)}...${token.substring(token.length - 4)}` : '❌ Missing'}`);
  console.log(`   ALGOLIA_APP_ID: ${process.env.ALGOLIA_APP_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`   ALGOLIA_ADMIN_KEY: ${process.env.ALGOLIA_ADMIN_KEY ? '✅ Set' : '❌ Missing'}\n`);

  try {
    // Initialize Storyblok client
    const storyblok = new StoryblokClient({
      accessToken: token || '',
    });

    // Fetch all places from Storyblok
    console.log('📚 Fetching places from Storyblok...');
    const response = await storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'places/',
      per_page: 100,
    });

    const stories = response.data.stories;
    console.log(`✅ Found ${stories.length} stories in places/ folder\n`);

    if (stories.length === 0) {
      console.log('⚠️  No places found in Storyblok');
      console.log('💡 Make sure you have created places in the places/ folder');
      process.exit(0);
    }

    // Transform to Algolia records
    const records = stories.map((story: any) => {
      const content = story.content;
      return {
        objectID: `place_${story.id}`,
        title: content.title || story.name,
        slug: story.slug,
        type: content.type || 'attraction',
        district: content.district || '',
        city: content.city || 'Lisbon',
        short_excerpt: content.short_excerpt || '',
        _geoloc: {
          lat: parseFloat(content.latitude || 0),
          lng: parseFloat(content.longitude || 0),
        },
      };
    });

    console.log(`📍 First place: ${records[0].title} (${records[0]._geoloc.lat}, ${records[0]._geoloc.lng})\n`);

    // Index to Algolia
    console.log('🔍 Indexing to Algolia...');
    const algolia = algoliasearch(
      process.env.ALGOLIA_APP_ID || '',
      process.env.ALGOLIA_ADMIN_KEY || ''
    );
    const index = algolia.initIndex('places');
    
    const result = await index.saveObjects(records);

    console.log(`\n✅ Successfully indexed ${records.length} places`);
    console.log(`📊 Object IDs: ${result.objectIDs.slice(0, 5).join(', ')}${result.objectIDs.length > 5 ? '...' : ''}`);
    console.log('\n🎉 Reindex complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Reindex failed:', error);
    process.exit(1);
  }
}

reindex();
