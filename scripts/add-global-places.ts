/**
 * Add sample places for multiple countries
 * Run with: npx tsx scripts/add-global-places.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// Sample places for different countries
const globalPlaces = [
  // INDIA
  {
    name: 'Taj Mahal',
    slug: 'taj-mahal',
    content: {
      component: 'place',
      title: 'Taj Mahal',
      type: 'attraction',
      country: 'India',
      city: 'Agra',
      district: 'Taj Ganj',
      address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
      latitude: 27.1751,
      longitude: 78.0421,
      short_excerpt: 'Iconic white marble mausoleum, one of the Seven Wonders of the World',
      description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna. Built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
      tags: ['history', 'culture', 'art', 'outdoor'],
      price_range: '$',
      rating: 4.9,
      popularity_score: 98,
      opening_hours: '6:00 AM - 7:00 PM (Closed on Fridays)',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'Gateway of India',
    slug: 'gateway-of-india',
    content: {
      component: 'place',
      title: 'Gateway of India',
      type: 'attraction',
      country: 'India',
      city: 'Mumbai',
      district: 'Colaba',
      address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
      latitude: 18.9220,
      longitude: 72.8347,
      short_excerpt: 'Historic arch monument overlooking the Arabian Sea',
      description: 'The Gateway of India is an arch-monument built in the 20th century in Mumbai. It was erected to commemorate the landing of King George V and Queen Mary.',
      tags: ['history', 'culture', 'outdoor'],
      price_range: 'free',
      rating: 4.6,
      popularity_score: 92,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 60,
    },
  },
  {
    name: 'India Gate',
    slug: 'india-gate-delhi',
    content: {
      component: 'place',
      title: 'India Gate',
      type: 'attraction',
      country: 'India',
      city: 'New Delhi',
      district: 'Rajpath',
      address: 'Rajpath, India Gate, New Delhi, Delhi 110001',
      latitude: 28.6129,
      longitude: 77.2295,
      short_excerpt: 'War memorial and iconic landmark in the heart of New Delhi',
      description: 'India Gate is a war memorial located in New Delhi. It commemorates the 70,000 Indian soldiers who lost their lives fighting for the British Army during World War I.',
      tags: ['history', 'culture', 'outdoor'],
      price_range: 'free',
      rating: 4.7,
      popularity_score: 90,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 45,
    },
  },

  // UNITED STATES
  {
    name: 'Statue of Liberty',
    slug: 'statue-of-liberty',
    content: {
      component: 'place',
      title: 'Statue of Liberty',
      type: 'attraction',
      country: 'United States',
      city: 'New York',
      district: 'Liberty Island',
      address: 'Liberty Island, New York, NY 10004',
      latitude: 40.6892,
      longitude: -74.0445,
      short_excerpt: 'Iconic copper statue symbolizing freedom and democracy',
      description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island. A gift from France, it has become one of the most recognizable symbols of the United States.',
      tags: ['history', 'culture', 'outdoor'],
      price_range: '$$',
      rating: 4.8,
      popularity_score: 96,
      opening_hours: '9:00 AM - 5:00 PM',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'Golden Gate Bridge',
    slug: 'golden-gate-bridge',
    content: {
      component: 'place',
      title: 'Golden Gate Bridge',
      type: 'attraction',
      country: 'United States',
      city: 'San Francisco',
      district: 'Golden Gate',
      address: 'Golden Gate Bridge, San Francisco, CA 94129',
      latitude: 37.8199,
      longitude: -122.4783,
      short_excerpt: 'Iconic suspension bridge spanning the Golden Gate strait',
      description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.',
      tags: ['outdoor', 'nature', 'art'],
      price_range: 'free',
      rating: 4.9,
      popularity_score: 95,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 90,
    },
  },
  {
    name: 'Times Square',
    slug: 'times-square',
    content: {
      component: 'place',
      title: 'Times Square',
      type: 'attraction',
      country: 'United States',
      city: 'New York',
      district: 'Manhattan',
      address: 'Manhattan, NY 10036',
      latitude: 40.7580,
      longitude: -73.9855,
      short_excerpt: 'Bustling entertainment and commercial hub with bright lights',
      description: 'Times Square is a major commercial intersection, tourist destination, and entertainment center in Midtown Manhattan. Known for its bright lights and Broadway theaters.',
      tags: ['nightlife', 'shopping', 'culture'],
      price_range: 'free',
      rating: 4.5,
      popularity_score: 94,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 120,
    },
  },

  // CHINA
  {
    name: 'Great Wall of China',
    slug: 'great-wall-china',
    content: {
      component: 'place',
      title: 'Great Wall of China',
      type: 'attraction',
      country: 'China',
      city: 'Beijing',
      district: 'Huairou',
      address: 'Huairou District, Beijing, China',
      latitude: 40.4319,
      longitude: 116.5704,
      short_excerpt: 'Ancient fortification and UNESCO World Heritage Site',
      description: 'The Great Wall of China is a series of fortifications built across historical northern borders of China. It is one of the most impressive architectural feats in history.',
      tags: ['history', 'culture', 'outdoor'],
      price_range: '$$',
      rating: 4.9,
      popularity_score: 99,
      opening_hours: '7:30 AM - 5:30 PM',
      estimated_visit_time: 240,
    },
  },
  {
    name: 'Forbidden City',
    slug: 'forbidden-city',
    content: {
      component: 'place',
      title: 'Forbidden City',
      type: 'museum',
      country: 'China',
      city: 'Beijing',
      district: 'Dongcheng',
      address: '4 Jingshan Front St, Dongcheng, Beijing, China',
      latitude: 39.9163,
      longitude: 116.3972,
      short_excerpt: 'Imperial palace complex and UNESCO World Heritage Site',
      description: 'The Forbidden City is a palace complex that served as the home of emperors for nearly 500 years. It now houses the Palace Museum with extensive art collections.',
      tags: ['history', 'culture', 'art', 'indoor'],
      price_range: '$$',
      rating: 4.8,
      popularity_score: 97,
      opening_hours: '8:30 AM - 5:00 PM (Closed Mondays)',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'The Bund',
    slug: 'the-bund-shanghai',
    content: {
      component: 'place',
      title: 'The Bund',
      type: 'attraction',
      country: 'China',
      city: 'Shanghai',
      district: 'Huangpu',
      address: 'Zhongshan East 1st Rd, Huangpu, Shanghai, China',
      latitude: 31.2397,
      longitude: 121.4900,
      short_excerpt: 'Historic waterfront area with colonial architecture',
      description: 'The Bund is a waterfront area in central Shanghai featuring colonial-era buildings. It offers stunning views of the modern Pudong skyline across the river.',
      tags: ['outdoor', 'culture', 'nightlife'],
      price_range: 'free',
      rating: 4.7,
      popularity_score: 93,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 90,
    },
  },

  // NEW ZEALAND
  {
    name: 'Milford Sound',
    slug: 'milford-sound',
    content: {
      component: 'place',
      title: 'Milford Sound',
      type: 'park',
      country: 'New Zealand',
      city: 'Fiordland',
      district: 'Southland',
      address: 'Milford Sound, Fiordland National Park, New Zealand',
      latitude: -44.6719,
      longitude: 167.9258,
      short_excerpt: 'Stunning fjord with dramatic cliffs and waterfalls',
      description: 'Milford Sound is a fjord in the southwest of New Zealand\'s South Island. It is known for its towering peaks, rainforests, and waterfalls including the famous Stirling Falls.',
      tags: ['nature', 'outdoor', 'family'],
      price_range: '$$$',
      rating: 4.9,
      popularity_score: 96,
      opening_hours: 'Open 24 hours',
      estimated_visit_time: 300,
    },
  },
  {
    name: 'Sky Tower',
    slug: 'sky-tower-auckland',
    content: {
      component: 'place',
      title: 'Sky Tower',
      type: 'attraction',
      country: 'New Zealand',
      city: 'Auckland',
      district: 'Auckland CBD',
      address: 'Victoria St W, Auckland CBD, Auckland 1010, New Zealand',
      latitude: -36.8485,
      longitude: 174.7633,
      short_excerpt: 'Iconic observation tower with panoramic city views',
      description: 'The Sky Tower is an observation and telecommunications tower. At 328 meters, it is the tallest freestanding structure in the Southern Hemisphere.',
      tags: ['attraction', 'indoor', 'family'],
      price_range: '$$',
      rating: 4.6,
      popularity_score: 88,
      opening_hours: '9:00 AM - 10:00 PM',
      estimated_visit_time: 90,
    },
  },
  {
    name: 'Hobbiton Movie Set',
    slug: 'hobbiton-movie-set',
    content: {
      component: 'place',
      title: 'Hobbiton Movie Set',
      type: 'attraction',
      country: 'New Zealand',
      city: 'Matamata',
      district: 'Waikato',
      address: '501 Buckland Rd, Hinuera, Matamata 3472, New Zealand',
      latitude: -37.8722,
      longitude: 175.6831,
      short_excerpt: 'Famous movie set from The Lord of the Rings and The Hobbit',
      description: 'Hobbiton Movie Set is a significant location used for The Lord of the Rings and The Hobbit film trilogies. Visitors can explore the Shire with its hobbit holes and gardens.',
      tags: ['culture', 'outdoor', 'family'],
      price_range: '$$$',
      rating: 4.8,
      popularity_score: 91,
      opening_hours: '9:00 AM - 5:00 PM',
      estimated_visit_time: 150,
    },
  },

  // SOUTH AFRICA
  {
    name: 'Table Mountain',
    slug: 'table-mountain',
    content: {
      component: 'place',
      title: 'Table Mountain',
      type: 'park',
      country: 'South Africa',
      city: 'Cape Town',
      district: 'Table Mountain National Park',
      address: 'Table Mountain, Cape Town, South Africa',
      latitude: -33.9628,
      longitude: 18.4098,
      short_excerpt: 'Iconic flat-topped mountain overlooking Cape Town',
      description: 'Table Mountain is a flat-topped mountain forming a prominent landmark overlooking Cape Town. It is a significant tourist attraction with a cableway to the summit.',
      tags: ['nature', 'outdoor', 'family'],
      price_range: '$$',
      rating: 4.8,
      popularity_score: 94,
      opening_hours: '8:00 AM - 6:00 PM (weather dependent)',
      estimated_visit_time: 180,
    },
  },
  {
    name: 'Robben Island',
    slug: 'robben-island',
    content: {
      component: 'place',
      title: 'Robben Island',
      type: 'museum',
      country: 'South Africa',
      city: 'Cape Town',
      district: 'Table Bay',
      address: 'Robben Island, Cape Town, South Africa',
      latitude: -33.8070,
      longitude: 18.3700,
      short_excerpt: 'Historic island prison where Nelson Mandela was held',
      description: 'Robben Island is a UNESCO World Heritage Site. It was used as a prison where Nelson Mandela was incarcerated for 18 years. Now a museum and memorial.',
      tags: ['history', 'culture', 'outdoor'],
      price_range: '$$',
      rating: 4.7,
      popularity_score: 89,
      opening_hours: '9:00 AM - 3:00 PM',
      estimated_visit_time: 240,
    },
  },
  {
    name: 'Kruger National Park',
    slug: 'kruger-national-park',
    content: {
      component: 'place',
      title: 'Kruger National Park',
      type: 'park',
      country: 'South Africa',
      city: 'Mpumalanga',
      district: 'Lowveld',
      address: 'Kruger National Park, South Africa',
      latitude: -23.9884,
      longitude: 31.5547,
      short_excerpt: 'World-renowned wildlife reserve with Big Five safaris',
      description: 'Kruger National Park is one of Africa\'s largest game reserves. It is home to the Big Five: lions, leopards, rhinos, elephants, and buffalos, along with diverse wildlife.',
      tags: ['nature', 'outdoor', 'family'],
      price_range: '$$$',
      rating: 4.9,
      popularity_score: 95,
      opening_hours: '5:30 AM - 6:30 PM',
      estimated_visit_time: 480,
    },
  },
];

async function addGlobalPlaces() {
  console.log('🌍 Adding global places to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const place of globalPlaces) {
    try {
      console.log(`📍 Creating: ${place.name} (${place.content.city}, ${place.content.country})`);
      
      await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: place.name,
          slug: place.slug,
          content: place.content,
          is_startpage: false,
          parent_id: '0',
          path: `places/${place.slug}`,
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
  console.log('\n🎉 Done! Now run: npm run reindex');
  
  process.exit(0);
}

addGlobalPlaces();
