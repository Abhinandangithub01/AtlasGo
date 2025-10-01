/**
 * Check what's in Storyblok
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN || '',
});

async function checkStoryblok() {
  console.log('🔍 Checking Storyblok content...\n');

  try {
    // Get all stories
    const response = await Storyblok.get('cdn/stories', {
      version: 'published',
      per_page: 100,
    });

    console.log(`📚 Total stories: ${response.data.stories.length}\n`);
    
    response.data.stories.forEach((story: any) => {
      console.log(`- ${story.name}`);
      console.log(`  Slug: ${story.slug}`);
      console.log(`  Full slug: ${story.full_slug}`);
      console.log(`  Component: ${story.content.component}`);
      if (story.content.country) {
        console.log(`  Country: ${story.content.country}`);
      }
      console.log('');
    });

    // Check places folder specifically
    const placesResponse = await Storyblok.get('cdn/stories', {
      version: 'published',
      starts_with: 'places/',
      per_page: 100,
    });

    console.log(`\n📍 Stories in places/ folder: ${placesResponse.data.stories.length}`);
    placesResponse.data.stories.forEach((story: any) => {
      console.log(`- ${story.name} (${story.content.country || 'No country'})`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkStoryblok();
