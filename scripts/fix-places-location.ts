/**
 * Move places to the correct folder and clean up duplicates
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;

if (!MANAGEMENT_TOKEN || !SPACE_ID) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const client = new StoryblokClient({
  oauthToken: MANAGEMENT_TOKEN,
});

async function fixPlaces() {
  console.log('🔧 Fixing places location...\n');

  try {
    // Get all stories
    const allStories = await client.get(`spaces/${SPACE_ID}/stories`);
    
    // Find places folder
    const placesFolder = allStories.data.stories.find((s: any) => 
      s.slug === 'places' && s.is_folder
    );
    
    if (!placesFolder) {
      console.log('📁 Creating places folder...');
      const newFolder = await client.post(`spaces/${SPACE_ID}/stories`, {
        story: {
          name: 'places',
          slug: 'places',
          is_folder: true,
        },
      });
      console.log(`✅ Created folder (ID: ${newFolder.data.story.id})\n`);
    }
    
    // Get all non-folder stories at root
    const rootPlaces = allStories.data.stories.filter((s: any) => 
      !s.is_folder && 
      !s.slug.startsWith('places/') &&
      s.slug !== 'home' &&
      s.content?.component === 'place'
    );
    
    console.log(`Found ${rootPlaces.length} places at root level\n`);
    
    // Delete them (they're duplicates, we'll re-add them properly)
    for (const place of rootPlaces) {
      console.log(`🗑️  Deleting: ${place.name} (${place.slug})`);
      await client.delete(`spaces/${SPACE_ID}/stories/${place.id}`);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log('\n✅ Cleanup complete!');
    console.log('\n📝 Next: Run npm run add:places to add them in the correct location');
    
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

fixPlaces();
