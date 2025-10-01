/**
 * Add more diverse places to Storyblok
 * Run with: npm run add:more
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// More diverse places across existing countries
const morePlaces = [
  // PORTUGAL - More places
  {
    name: 'Sintra Palace',
    slug: 'sintra-palace',
    content: {
      component: 'place',
      title: 'Sintra Palace',
      type: 'museum',
      country: 'Portugal',
      city: 'Sintra',
      district: 'Sintra',
      address: 'Largo Rainha Dona Amélia, 2710-616 Sintra, Portugal',
      latitude: 38.7979,
      longitude: -9.3906,
      short_excerpt: 'Colorful palace with stunning architecture and beautiful gardens',
      description: 'The National Palace of Sintra is a medieval royal palace with distinctive conical chimneys. It features beautiful azulejo tiles and stunning rooms.',
      tags: ['history', 'culture', 'art', 'outdoor'],
      price_range: '$$',
      rating: 4.7,
      popularity_score: 88,
      opening_hours: '9:30 AM - 7:00 PM',
      estimated_visit_time: 120,
    },
  },
  {
    name: 'Porto Wine Cellars',
    slug: 'porto-wine-cellars',
    content: {
      component: 'place',
      title: 'Porto Wine Cellars',
      type: 'attraction',
      country: 'Portugal',
      city: 'Porto',
      district: 'Vila Nova de Gaia',
      address: 'Av. de Diogo Leite, Vila Nova de Gaia, Portugal',
      latitude: 41.1368,
      longitude: -8.6127,
      short_excerpt: 'Historic wine cellars offering tastings and tours',
      description: 'Visit the famous port wine cellars across the Douro River. Learn about wine production and enjoy tastings with stunning river views.',
      tags: ['food', 'culture', 'indoor'],
      price_range: '$$',
      rating: 4.6,
      popularity_score: 85,
      opening_hours: '10:00 AM - 6:00 PM',
      estimated_visit_time: 90,
    },
  },

  // INDIA - More places
  {
    name: 'Hawa Mahal',
    slug: 'hawa-mahal',
    content: {
      component: 'place',
      title: 'Hawa Mahal',
      type: 'attraction',
      country: 'India',
      city: 'Jaipur',
      district: 'Pink City',
      address: 'Hawa Mahal Rd, Badi Choupad, Jaipur, Rajasthan 302002',
      latitude: 26.9239,
      longitude: 75.8267,
      short_excerpt: 'Palace of Winds with intricate pink sandstone facade',
      description: 'The Hawa Mahal is a palace with 953 small windows called jharokhas. Built in 1799, it allowed royal ladies to observe street festivals while unseen.',
      tags: ['history', 'culture', 'art', 'outdoor'],
      price_range: '$',
      rating: 4.5,
      popularity_score: 87,
      opening_hours: '9:00 AM - 5:00 PM',
      estimated_visit_time: 60,
    },
  },
  {
    name: 'Lotus Temple',
    slug: 'lotus-temple',
    content: {
      component: 'place',
      title: 'Lotus Temple',
      type: 'attraction',
      country: 'India',
      city: 'New Delhi',
      district: 'Kalkaji',
      address: 'Lotus Temple Rd, Bahapur, New Delhi, Delhi 110019',
      latitude: 28.5535,
      longitude: 77.2588,
      short_excerpt: 'Stunning lotus-shaped temple and meditation center',
      description: 'The Lotus Temple is a Baháí House of Worship notable for its flowerlike shape. It has won numerous architectural awards and welcomes all faiths.',
      tags: ['culture', 'art', 'outdoor'],
      price_range: 'free',
      rating: 4.7,
      popularity_score: 90,
      opening_hours: '9:00 AM - 7:00 PM (Closed Mondays)',
      estimated_visit_time: 90,
    },
  },

  // UNITED STATES - More places
  {
    name: 'Central Park',
    slug: 'central-park-nyc',
    content: {
      component: 'place',
      title: 'Central Park',
      type: 'park',
      country: 'United States',
      city: 'New York',
      district: 'Manhattan',
      address: 'New York, NY 10024',
      latitude: 40.7829,
      longitude: -73.9654,
      short_excerpt: 'Iconic urban park in the heart of Manhattan',
      description: 'Central Park is an urban park between the Upper West and Upper East Sides of Manhattan. It is the most visited urban park in the United States.',
      tags: ['nature', 'outdoor', 'family'],
      price_range: 'free',
      rating: 4.8,
      popularity_score: 96,
      opening_hours: '6:00 AM - 1:00 AM',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'Hollywood Sign',
    slug: 'hollywood-sign',
    content: {
      component: 'place',
      title: 'Hollywood Sign',
      type: 'attraction',
      country: 'United States',
      city: 'Los Angeles',
      district: 'Hollywood Hills',
      address: 'Los Angeles, CA 90068',
      latitude: 34.1341,
      longitude: -118.3215,
      short_excerpt: 'Iconic landmark and symbol of the entertainment industry',
      description: 'The Hollywood Sign is an American landmark and cultural icon. Built in 1923, it has become a symbol of the entertainment industry.',
      tags: ['outdoor', 'culture'],
      price_range: 'free',
      rating: 4.5,
      popularity_score: 92,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 120,
    },
  },

  // CHINA - More places
  {
    name: 'Terracotta Army',
    slug: 'terracotta-army',
    content: {
      component: 'place',
      title: 'Terracotta Army',
      type: 'museum',
      country: 'China',
      city: 'Xi\'an',
      district: 'Lintong',
      address: 'Qin Shi Huang Mausoleum, Lintong, Xi\'an, Shaanxi, China',
      latitude: 34.3848,
      longitude: 109.2734,
      short_excerpt: 'Ancient army of terracotta sculptures depicting Qin Shi Huang\'s forces',
      description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. A UNESCO World Heritage Site.',
      tags: ['history', 'culture', 'art', 'indoor'],
      price_range: '$$',
      rating: 4.9,
      popularity_score: 96,
      opening_hours: '8:30 AM - 5:30 PM',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'West Lake',
    slug: 'west-lake-hangzhou',
    content: {
      component: 'place',
      title: 'West Lake',
      type: 'park',
      country: 'China',
      city: 'Hangzhou',
      district: 'West Lake District',
      address: 'West Lake, Hangzhou, Zhejiang, China',
      latitude: 30.2489,
      longitude: 120.1472,
      short_excerpt: 'Scenic freshwater lake with temples and pagodas',
      description: 'West Lake is a UNESCO World Heritage Site famous for its scenic beauty. It has influenced Chinese garden design for centuries.',
      tags: ['nature', 'outdoor', 'culture'],
      price_range: 'free',
      rating: 4.8,
      popularity_score: 91,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 180,
    },
  },

  // NEW ZEALAND - More places
  {
    name: 'Queenstown Gardens',
    slug: 'queenstown-gardens',
    content: {
      component: 'place',
      title: 'Queenstown Gardens',
      type: 'park',
      country: 'New Zealand',
      city: 'Queenstown',
      district: 'Queenstown',
      address: 'Park St, Queenstown 9300, New Zealand',
      latitude: -45.0347,
      longitude: 168.6562,
      short_excerpt: 'Beautiful botanical gardens on Lake Wakatipu peninsula',
      description: 'Queenstown Gardens is a peaceful botanical garden on a peninsula jutting into Lake Wakatipu. Perfect for walks with stunning mountain views.',
      tags: ['nature', 'outdoor', 'family'],
      price_range: 'free',
      rating: 4.6,
      popularity_score: 82,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 90,
    },
  },
  {
    name: 'Waitomo Glowworm Caves',
    slug: 'waitomo-caves',
    content: {
      component: 'place',
      title: 'Waitomo Glowworm Caves',
      type: 'attraction',
      country: 'New Zealand',
      city: 'Waitomo',
      district: 'Waikato',
      address: '39 Waitomo Village Rd, Waitomo Caves 3977, New Zealand',
      latitude: -38.2611,
      longitude: 175.1031,
      short_excerpt: 'Magical caves illuminated by thousands of glowworms',
      description: 'The Waitomo Glowworm Caves are famous for their population of Arachnocampa luminosa, a glowworm species found exclusively in New Zealand.',
      tags: ['nature', 'indoor', 'family'],
      price_range: '$$$',
      rating: 4.8,
      popularity_score: 89,
      opening_hours: '9:00 AM - 5:00 PM',
      estimated_visit_time: 120,
    },
  },

  // SOUTH AFRICA - More places
  {
    name: 'Victoria & Alfred Waterfront',
    slug: 'va-waterfront',
    content: {
      component: 'place',
      title: 'Victoria & Alfred Waterfront',
      type: 'shopping',
      country: 'South Africa',
      city: 'Cape Town',
      district: 'Waterfront',
      address: 'Victoria & Alfred Waterfront, Cape Town, 8001',
      latitude: -33.9025,
      longitude: 18.4187,
      short_excerpt: 'Vibrant harbor with shopping, dining, and entertainment',
      description: 'The V&A Waterfront is a mixed-use destination featuring shopping, dining, entertainment, and hotels in a historic harbor setting.',
      tags: ['shopping', 'food', 'nightlife'],
      price_range: '$$',
      rating: 4.6,
      popularity_score: 88,
      opening_hours: '9:00 AM - 9:00 PM',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'Apartheid Museum',
    slug: 'apartheid-museum',
    content: {
      component: 'place',
      title: 'Apartheid Museum',
      type: 'museum',
      country: 'South Africa',
      city: 'Johannesburg',
      district: 'Ormonde',
      address: 'Northern Park Way and Gold Reef Rd, Johannesburg, 2159',
      latitude: -26.2353,
      longitude: 27.9869,
      short_excerpt: 'Powerful museum documenting South Africa\'s apartheid history',
      description: 'The Apartheid Museum illustrates the rise and fall of apartheid through film, photographs, text, and artifacts. A moving and educational experience.',
      tags: ['history', 'culture', 'indoor'],
      price_range: '$$',
      rating: 4.8,
      popularity_score: 86,
      opening_hours: '9:00 AM - 5:00 PM',
      estimated_visit_time: 150,
    },
  },
];

async function addMorePlaces() {
  console.log('🌍 Adding more diverse places to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const place of morePlaces) {
    try {
      console.log(`📍 Creating: ${place.name} (${place.content.city}, ${place.content.country})`);
      
      await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: place.name,
          slug: place.slug,
          content: place.content,
          is_startpage: false,
          parent_id: '0',
        },
        publish: '1',
      });

      console.log(`   ✅ Success!\n`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully created: ${successCount} places`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Done! Total places added: ${successCount}`);
  console.log('   Now run: npm run reindex');
  
  process.exit(0);
}

addMorePlaces();
