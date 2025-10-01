/**
 * Test Storyblok connection
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const token = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

console.log('🔍 Testing Storyblok connection...\n');
console.log(`Space ID: ${spaceId}`);
console.log(`Token: ${token?.substring(0, 10)}...${token?.substring(token.length - 4)}\n`);

const client = new StoryblokClient({
  accessToken: token || '',
});

async function test() {
  try {
    console.log('📡 Fetching stories...');
    const response = await client.get('cdn/stories', {
      version: 'draft',
      per_page: 10,
    });
    
    console.log(`✅ Success! Found ${response.data.stories.length} stories`);
    console.log('\n📚 Stories:');
    response.data.stories.forEach((story: any) => {
      console.log(`   - ${story.name} (${story.full_slug})`);
    });
  } catch (error: any) {
    console.error('❌ Error:', error.message || error);
    console.error('Response:', error.response);
  }
}

test();
