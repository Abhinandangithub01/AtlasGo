/**
 * Add location-specific blog posts for all places
 * Creates 2-3 blogs per major destination
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// Location-specific blog posts
const locationBlogs = [
  // INDIA
  {
    name: 'The Ultimate Guide to Visiting the Taj Mahal',
    slug: 'ultimate-guide-taj-mahal',
    content: {
      component: 'blog_post',
      title: 'The Ultimate Guide to Visiting the Taj Mahal',
      subtitle: 'Everything you need to know for the perfect visit',
      hero_image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=600&fit=crop&q=80',
      author: 'Rajesh Kumar',
      author_bio: 'Travel guide and historian specializing in Indian monuments',
      author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-20',
      reading_time: 10,
      category: 'Travel Guides',
      tags: ['Taj Mahal', 'India', 'Agra', 'UNESCO', 'History'],
      excerpt: 'The Taj Mahal is one of the world\'s most iconic monuments. Discover the best times to visit, ticket information, photography tips, and hidden details about this architectural masterpiece.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'The Taj Mahal, a UNESCO World Heritage Site, stands as a testament to eternal love and architectural brilliance. Built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, this white marble mausoleum attracts millions of visitors each year.' }]
          }
        ]
      },
      related_places: ['taj-mahal'],
      location: 'Agra, India',
      seo_title: 'Taj Mahal Travel Guide - Best Time to Visit & Tips',
      seo_description: 'Complete guide to visiting the Taj Mahal including tickets, timings, photography tips, and insider secrets.',
      featured: false,
    }
  },
  {
    name: 'Mumbai\'s Gateway of India: History and Hidden Stories',
    slug: 'gateway-of-india-mumbai-guide',
    content: {
      component: 'blog_post',
      title: 'Mumbai\'s Gateway of India: History and Hidden Stories',
      subtitle: 'Discover the iconic monument and its surroundings',
      hero_image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=600&fit=crop&q=80',
      author: 'Priya Sharma',
      author_bio: 'Mumbai-based travel writer and photographer',
      author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-18',
      reading_time: 8,
      category: 'Travel Guides',
      tags: ['Mumbai', 'India', 'Gateway of India', 'History', 'Architecture'],
      excerpt: 'The Gateway of India is Mumbai\'s most famous landmark. Learn about its colonial history, best photo spots, nearby attractions, and the perfect time to visit this majestic arch.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Standing tall on the waterfront of Mumbai, the Gateway of India is a monument that symbolizes the city\'s rich colonial past and vibrant present. Built in 1924, this Indo-Saracenic arch has witnessed countless historical moments.' }]
          }
        ]
      },
      related_places: ['gateway-of-india'],
      location: 'Mumbai, India',
      seo_title: 'Gateway of India Mumbai - Complete Visitor Guide',
      seo_description: 'Everything you need to know about visiting Mumbai\'s Gateway of India.',
      featured: false,
    }
  },
  // USA
  {
    name: 'Statue of Liberty: Symbol of Freedom and Hope',
    slug: 'statue-of-liberty-complete-guide',
    content: {
      component: 'blog_post',
      title: 'Statue of Liberty: Symbol of Freedom and Hope',
      subtitle: 'How to visit Lady Liberty and Ellis Island',
      hero_image: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=1200&h=600&fit=crop&q=80',
      author: 'Michael Chen',
      author_bio: 'NYC tour guide and history enthusiast',
      author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-17',
      reading_time: 12,
      category: 'Travel Guides',
      tags: ['New York', 'USA', 'Statue of Liberty', 'Ellis Island', 'History'],
      excerpt: 'Visit America\'s most iconic symbol of freedom. Complete guide to ferry tickets, crown access, Ellis Island, and making the most of your visit to the Statue of Liberty.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'The Statue of Liberty has welcomed millions of immigrants to America since 1886. Today, it stands as a powerful symbol of freedom and democracy, attracting visitors from around the world.' }]
          }
        ]
      },
      related_places: ['statue-of-liberty'],
      location: 'New York, USA',
      seo_title: 'Statue of Liberty Guide - Tickets, Tours & Tips',
      seo_description: 'Complete guide to visiting the Statue of Liberty and Ellis Island.',
      featured: false,
    }
  },
  {
    name: 'Golden Gate Bridge: San Francisco\'s Engineering Marvel',
    slug: 'golden-gate-bridge-guide',
    content: {
      component: 'blog_post',
      title: 'Golden Gate Bridge: San Francisco\'s Engineering Marvel',
      subtitle: 'Best viewpoints, walking tips, and photo spots',
      hero_image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop&q=80',
      author: 'Sarah Martinez',
      author_bio: 'San Francisco local and photography expert',
      author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-16',
      reading_time: 9,
      category: 'Travel Guides',
      tags: ['San Francisco', 'USA', 'Golden Gate Bridge', 'Photography', 'Architecture'],
      excerpt: 'The Golden Gate Bridge is one of the world\'s most photographed landmarks. Discover the best viewpoints, walking routes, and insider tips for experiencing this iconic bridge.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Spanning 1.7 miles across the Golden Gate strait, this Art Deco suspension bridge has become synonymous with San Francisco. Whether you walk, bike, or simply admire it from afar, the Golden Gate Bridge never fails to impress.' }]
          }
        ]
      },
      related_places: ['golden-gate-bridge'],
      location: 'San Francisco, USA',
      seo_title: 'Golden Gate Bridge Guide - Best Views & Walking Tips',
      seo_description: 'Complete guide to visiting and photographing the Golden Gate Bridge.',
      featured: false,
    }
  },
  // CHINA
  {
    name: 'Walking the Great Wall of China: A Complete Guide',
    slug: 'great-wall-china-walking-guide',
    content: {
      component: 'blog_post',
      title: 'Walking the Great Wall of China: A Complete Guide',
      subtitle: 'Which section to visit and how to prepare',
      hero_image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=600&fit=crop&q=80',
      author: 'Li Wei',
      author_bio: 'Beijing-based travel expert and historian',
      author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-15',
      reading_time: 15,
      category: 'Travel Guides',
      tags: ['China', 'Great Wall', 'Beijing', 'Hiking', 'UNESCO'],
      excerpt: 'The Great Wall of China stretches over 13,000 miles. Learn which sections to visit, how to avoid crowds, what to bring, and tips for an unforgettable experience.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'The Great Wall of China is one of humanity\'s most impressive achievements. Built over centuries to protect ancient China, today it offers visitors a chance to walk through history while enjoying breathtaking mountain views.' }]
          }
        ]
      },
      related_places: ['great-wall-china'],
      location: 'Beijing, China',
      seo_title: 'Great Wall of China Guide - Best Sections & Tips',
      seo_description: 'Complete guide to visiting the Great Wall of China.',
      featured: false,
    }
  },
  // NEW ZEALAND
  {
    name: 'Milford Sound: New Zealand\'s Fiordland Wonder',
    slug: 'milford-sound-new-zealand-guide',
    content: {
      component: 'blog_post',
      title: 'Milford Sound: New Zealand\'s Fiordland Wonder',
      subtitle: 'Cruises, kayaking, and scenic flights',
      hero_image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&h=600&fit=crop&q=80',
      author: 'Emma Thompson',
      author_bio: 'New Zealand adventure travel specialist',
      author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-14',
      reading_time: 11,
      category: 'Travel Guides',
      tags: ['New Zealand', 'Milford Sound', 'Fiordland', 'Nature', 'Cruises'],
      excerpt: 'Milford Sound is often called the eighth wonder of the world. Discover how to experience this stunning fiord through cruises, kayaking, scenic flights, and hiking.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Carved by glaciers over millions of years, Milford Sound is a dramatic fiord surrounded by towering cliffs, cascading waterfalls, and lush rainforest. It\'s one of New Zealand\'s most spectacular natural attractions.' }]
          }
        ]
      },
      related_places: ['milford-sound'],
      location: 'Fiordland, New Zealand',
      seo_title: 'Milford Sound Guide - Cruises, Tours & Best Time to Visit',
      seo_description: 'Complete guide to visiting Milford Sound in New Zealand.',
      featured: false,
    }
  },
  // SOUTH AFRICA
  {
    name: 'Hiking Table Mountain: Routes, Tips, and Views',
    slug: 'table-mountain-hiking-guide',
    content: {
      component: 'blog_post',
      title: 'Hiking Table Mountain: Routes, Tips, and Views',
      subtitle: 'Conquer Cape Town\'s iconic flat-topped peak',
      hero_image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&h=600&fit=crop&q=80',
      author: 'Thabo Mbeki',
      author_bio: 'Cape Town hiking guide and nature enthusiast',
      author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-13',
      reading_time: 13,
      category: 'Travel Guides',
      tags: ['South Africa', 'Table Mountain', 'Cape Town', 'Hiking', 'Nature'],
      excerpt: 'Table Mountain offers some of the world\'s most spectacular views. Learn about hiking routes, cable car options, weather considerations, and safety tips for your ascent.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Table Mountain is Cape Town\'s most recognizable landmark. Whether you hike up one of the many trails or take the rotating cable car, the 360-degree views from the top are absolutely breathtaking.' }]
          }
        ]
      },
      related_places: ['table-mountain'],
      location: 'Cape Town, South Africa',
      seo_title: 'Table Mountain Hiking Guide - Routes & Cable Car Info',
      seo_description: 'Complete guide to hiking Table Mountain in Cape Town.',
      featured: false,
    }
  },
  // PORTUGAL
  {
    name: 'Lisbon\'s LX Factory: Art, Food, and Culture',
    slug: 'lx-factory-lisbon-guide',
    content: {
      component: 'blog_post',
      title: 'Lisbon\'s LX Factory: Art, Food, and Culture',
      subtitle: 'Explore this creative hub under the 25 de Abril Bridge',
      hero_image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=600&fit=crop&q=80',
      author: 'Sofia Costa',
      author_bio: 'Lisbon local and cultural guide',
      author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
      published_date: '2025-01-12',
      reading_time: 7,
      category: 'Travel Guides',
      tags: ['Lisbon', 'Portugal', 'LX Factory', 'Art', 'Food'],
      excerpt: 'LX Factory is Lisbon\'s coolest creative space. Discover trendy cafes, unique shops, street art, and cultural events in this former industrial complex.',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Once a textile factory, LX Factory has been transformed into a vibrant cultural hub. Today, it\'s home to artists, designers, restaurants, and shops, making it one of Lisbon\'s most dynamic neighborhoods.' }]
          }
        ]
      },
      related_places: ['lx-factory'],
      location: 'Lisbon, Portugal',
      seo_title: 'LX Factory Lisbon Guide - Best Cafes, Shops & Art',
      seo_description: 'Complete guide to visiting LX Factory in Lisbon.',
      featured: false,
    }
  },
];

async function addLocationBlogs() {
  console.log('🚀 Adding location-specific blog posts to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const blog of locationBlogs) {
    try {
      console.log(`✨ Creating: ${blog.name}`);
      
      await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: blog.name,
          slug: blog.slug,
          content: blog.content,
          is_startpage: false,
          parent_id: '0',
        },
        publish: '1',
      });

      console.log(`   ✅ Success! (Related to: ${blog.content.related_places?.join(', ')})\n`);
      successCount++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully created: ${successCount} location-specific blogs`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Location blogs added for:`);
  console.log(`   🇮🇳 India: 2 blogs`);
  console.log(`   🇺🇸 USA: 2 blogs`);
  console.log(`   🇨🇳 China: 1 blog`);
  console.log(`   🇳🇿 New Zealand: 1 blog`);
  console.log(`   🇿🇦 South Africa: 1 blog`);
  console.log(`   🇵🇹 Portugal: 1 blog`);
  console.log(`\n💡 Next: These blogs will appear on place detail pages!`);
  console.log(`📍 Total blogs now: ${successCount + 3} (3 general + ${successCount} location-specific)`);
  
  process.exit(0);
}

addLocationBlogs();
