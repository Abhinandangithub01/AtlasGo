/**
 * Add Blog/Travel Stories content type to Storyblok
 * Demonstrates rich text, nested components, and content relationships
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// Sample blog posts
const blogPosts = [
  {
    name: '10 Hidden Gems in Lisbon You Must Visit',
    slug: 'hidden-gems-lisbon',
    content: {
      component: 'blog_post',
      title: '10 Hidden Gems in Lisbon You Must Visit',
      subtitle: 'Discover the secret spots that locals love',
      hero_image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=600&fit=crop&q=80',
      author: 'Sarah Martinez',
      author_bio: 'Travel writer and Lisbon enthusiast with 10+ years exploring Portugal',
      author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-15',
      reading_time: 8,
      category: 'Travel Guides',
      tags: ['Lisbon', 'Portugal', 'Hidden Gems', 'Local Tips'],
      excerpt: 'Beyond the famous tram rides and pastéis de nata, Lisbon hides countless treasures waiting to be discovered. Join us as we explore the city\'s best-kept secrets.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Lisbon is a city of contrasts, where ancient history meets modern innovation. While most tourists flock to the same handful of attractions, the real magic of this Portuguese capital lies in its hidden corners and secret spots that locals cherish.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: '1. Miradouro da Senhora do Monte' }]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This viewpoint offers the most spectacular panoramic views of Lisbon, yet it remains relatively unknown to tourists. Visit at sunset for an unforgettable experience.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: '2. LX Factory' }]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'A creative hub housed in a former industrial complex under the 25 de Abril Bridge. Explore art galleries, trendy cafes, and unique shops in this bohemian neighborhood.'
              }
            ]
          }
        ]
      },
      related_places: ['lx-factory', 'miradouro-santa-luzia', 'bairro-alto'],
      seo_title: '10 Hidden Gems in Lisbon - Secret Spots Locals Love',
      seo_description: 'Discover Lisbon\'s best-kept secrets with our guide to 10 hidden gems that most tourists miss.',
      featured: true,
    }
  },
  {
    name: 'A Foodie\'s Guide to New York City',
    slug: 'foodie-guide-nyc',
    content: {
      component: 'blog_post',
      title: 'A Foodie\'s Guide to New York City',
      subtitle: 'From street food to Michelin stars',
      hero_image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=600&fit=crop&q=80',
      author: 'Michael Chen',
      author_bio: 'Food critic and NYC native passionate about culinary adventures',
      author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-10',
      reading_time: 12,
      category: 'Food & Dining',
      tags: ['New York', 'Food', 'Restaurants', 'Street Food'],
      excerpt: 'New York City is a melting pot of culinary excellence. From iconic pizza slices to world-class fine dining, discover the best places to eat in the Big Apple.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'New York City\'s food scene is legendary, offering everything from $1 pizza slices to multi-course tasting menus at Michelin-starred restaurants. Here\'s your ultimate guide to eating your way through NYC.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Classic NYC Pizza' }]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'No trip to NYC is complete without trying authentic New York-style pizza. The thin, foldable slices are a city institution.'
              }
            ]
          }
        ]
      },
      related_places: ['times-square', 'central-park-nyc'],
      seo_title: 'NYC Food Guide - Best Restaurants & Street Food in New York',
      seo_description: 'Discover the best places to eat in New York City with our comprehensive foodie guide.',
      featured: true,
    }
  },
  {
    name: 'Sustainable Travel: Exploring Cape Town Responsibly',
    slug: 'sustainable-travel-cape-town',
    content: {
      component: 'blog_post',
      title: 'Sustainable Travel: Exploring Cape Town Responsibly',
      subtitle: 'How to minimize your impact while maximizing your experience',
      hero_image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&h=600&fit=crop&q=80',
      author: 'Priya Sharma',
      author_bio: 'Eco-tourism advocate and sustainable travel consultant',
      author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-05',
      reading_time: 10,
      category: 'Sustainable Travel',
      tags: ['Cape Town', 'South Africa', 'Eco-Tourism', 'Sustainability'],
      excerpt: 'Cape Town is one of the world\'s most beautiful cities, and it\'s possible to explore it while being mindful of your environmental impact. Here\'s how.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Cape Town offers incredible natural beauty, from Table Mountain to pristine beaches. Learn how to explore this stunning city while supporting local communities and protecting the environment.'
              }
            ]
          },
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Choose Eco-Friendly Accommodations' }]
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Look for hotels and guesthouses with green certifications that prioritize water conservation and renewable energy.'
              }
            ]
          }
        ]
      },
      related_places: ['table-mountain', 'va-waterfront'],
      seo_title: 'Sustainable Travel Guide to Cape Town - Eco-Friendly Tourism',
      seo_description: 'Explore Cape Town responsibly with our sustainable travel guide.',
      featured: false,
    }
  }
];

async function addBlogStories() {
  console.log('🚀 Adding Blog/Travel Stories to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const post of blogPosts) {
    try {
      console.log(`✨ Creating: ${post.name}`);
      
      await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: post.name,
          slug: post.slug,
          content: post.content,
          is_startpage: false,
          parent_id: '0',
        },
        publish: '1',
      });

      console.log(`   ✅ Success!\n`);
      successCount++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully created: ${successCount} blog posts`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Blog posts added with:`);
  console.log(`   📝 Rich text content`);
  console.log(`   👤 Author profiles`);
  console.log(`   🏷️ Categories & tags`);
  console.log(`   🔗 Related places`);
  console.log(`   📸 Hero images`);
  console.log(`\n💡 Next: Create a /blog page to display these stories!`);
  
  process.exit(0);
}

addBlogStories();
