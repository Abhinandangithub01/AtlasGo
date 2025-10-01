/**
 * Add multiple sample places to Storyblok quickly
 * Run with: npm run add:places
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;

if (!MANAGEMENT_TOKEN || !SPACE_ID) {
  console.error('❌ Missing STORYBLOK_MANAGEMENT_TOKEN or STORYBLOK_SPACE_ID');
  process.exit(1);
}

const client = new StoryblokClient({
  oauthToken: MANAGEMENT_TOKEN,
});

// Sample places data for Lisbon
const samplePlaces = [
  {
    name: 'Time Out Market',
    slug: 'time-out-market',
    content: {
      component: 'place',
      title: 'Time Out Market',
      type: 'restaurant',
      district: 'Cais do Sodré',
      city: 'Lisbon',
      latitude: 38.7071,
      longitude: -9.1458,
      short_excerpt: 'Food hall featuring Lisbon\'s best chefs and restaurants',
      description: 'A vibrant food market showcasing the best of Lisbon\'s culinary scene with over 40 restaurants, bars, and shops.',
      tags: ['food', 'indoor', 'culture'],
      price_range: '$$',
      rating: 4.3,
      popularity_score: 90,
      estimated_visit_time: 60,
      opening_hours: '10:00 AM - 12:00 AM daily',
      address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
      website: 'https://www.timeoutmarket.com/lisbon/',
    },
  },
  {
    name: 'Belém Tower',
    slug: 'belem-tower',
    content: {
      component: 'place',
      title: 'Belém Tower',
      type: 'attraction',
      district: 'Belém',
      city: 'Lisbon',
      latitude: 38.6916,
      longitude: -9.2160,
      short_excerpt: 'Iconic 16th-century fortified tower and UNESCO World Heritage Site',
      description: 'A magnificent example of Manueline architecture, this fortress was built to defend Lisbon\'s harbor and commemorate Vasco da Gama\'s expedition.',
      tags: ['culture', 'history', 'outdoor', 'art'],
      price_range: '$',
      rating: 4.6,
      popularity_score: 95,
      estimated_visit_time: 45,
      opening_hours: '10:00 AM - 6:30 PM (Closed Mondays)',
      address: 'Av. Brasília, 1400-038 Lisboa',
      website: 'https://www.torrebelem.gov.pt/',
    },
  },
  {
    name: 'LX Factory',
    slug: 'lx-factory',
    content: {
      component: 'place',
      title: 'LX Factory',
      type: 'shopping',
      district: 'Alcântara',
      city: 'Lisbon',
      latitude: 38.7064,
      longitude: -9.1773,
      short_excerpt: 'Creative hub with shops, restaurants, and street art',
      description: 'A trendy cultural and creative space housed in a former industrial complex, featuring unique shops, restaurants, bars, and galleries.',
      tags: ['shopping', 'food', 'art', 'nightlife', 'indoor'],
      price_range: '$$',
      rating: 4.5,
      popularity_score: 85,
      estimated_visit_time: 120,
      opening_hours: '10:00 AM - 11:00 PM daily',
      address: 'R. Rodrigues de Faria 103, 1300-501 Lisboa',
      website: 'https://lxfactory.com/',
    },
  },
  {
    name: 'Jerónimos Monastery',
    slug: 'jeronimos-monastery',
    content: {
      component: 'place',
      title: 'Jerónimos Monastery',
      type: 'museum',
      district: 'Belém',
      city: 'Lisbon',
      latitude: 38.6979,
      longitude: -9.2061,
      short_excerpt: 'Stunning monastery and UNESCO World Heritage masterpiece',
      description: 'A breathtaking example of Manueline architecture, this 16th-century monastery is one of Portugal\'s most important cultural landmarks.',
      tags: ['culture', 'history', 'art', 'outdoor'],
      price_range: '$',
      rating: 4.7,
      popularity_score: 92,
      estimated_visit_time: 90,
      opening_hours: '10:00 AM - 6:30 PM (Closed Mondays)',
      address: 'Praça do Império 1400-206 Lisboa',
      website: 'https://www.mosteirojeronimos.gov.pt/',
    },
  },
  {
    name: 'Miradouro de Santa Luzia',
    slug: 'miradouro-santa-luzia',
    content: {
      component: 'place',
      title: 'Miradouro de Santa Luzia',
      type: 'attraction',
      district: 'Alfama',
      city: 'Lisbon',
      latitude: 38.7115,
      longitude: -9.1289,
      short_excerpt: 'Scenic viewpoint with panoramic views of Alfama',
      description: 'A beautiful terrace offering stunning views over the Alfama district and the Tagus River, decorated with traditional azulejo tiles.',
      tags: ['outdoor', 'nature', 'culture'],
      price_range: 'free',
      rating: 4.6,
      popularity_score: 80,
      estimated_visit_time: 20,
      opening_hours: 'Open 24 hours',
      address: 'Largo Santa Luzia, 1100-487 Lisboa',
    },
  },
  {
    name: 'Oceanário de Lisboa',
    slug: 'oceanario-lisboa',
    content: {
      component: 'place',
      title: 'Oceanário de Lisboa',
      type: 'attraction',
      district: 'Parque das Nações',
      city: 'Lisbon',
      latitude: 38.7633,
      longitude: -9.0935,
      short_excerpt: 'One of Europe\'s largest aquariums with diverse marine life',
      description: 'A world-class aquarium featuring over 8,000 marine animals and plants from around the globe, perfect for families.',
      tags: ['family', 'indoor', 'nature'],
      price_range: '$$',
      rating: 4.7,
      popularity_score: 88,
      estimated_visit_time: 120,
      opening_hours: '10:00 AM - 8:00 PM daily',
      address: 'Esplanada Dom Carlos I s/nº, 1990-005 Lisboa',
      website: 'https://www.oceanario.pt/',
    },
  },
  {
    name: 'Bairro Alto',
    slug: 'bairro-alto',
    content: {
      component: 'place',
      title: 'Bairro Alto',
      type: 'nightlife',
      district: 'Bairro Alto',
      city: 'Lisbon',
      latitude: 38.7142,
      longitude: -9.1459,
      short_excerpt: 'Historic neighborhood famous for nightlife and bars',
      description: 'A vibrant district known for its lively nightlife, traditional Fado houses, trendy bars, and bohemian atmosphere.',
      tags: ['nightlife', 'food', 'music', 'culture'],
      price_range: '$$',
      rating: 4.4,
      popularity_score: 87,
      estimated_visit_time: 180,
      opening_hours: '6:00 PM - 3:00 AM',
      address: 'Bairro Alto, Lisboa',
    },
  },
  {
    name: 'Pastéis de Belém',
    slug: 'pasteis-de-belem',
    content: {
      component: 'place',
      title: 'Pastéis de Belém',
      type: 'restaurant',
      district: 'Belém',
      city: 'Lisbon',
      latitude: 38.6976,
      longitude: -9.2033,
      short_excerpt: 'Famous bakery serving the original Portuguese custard tarts',
      description: 'Since 1837, this iconic bakery has been serving the authentic Pastéis de Nata using a secret recipe, a must-visit for any food lover.',
      tags: ['food', 'culture', 'history'],
      price_range: '$',
      rating: 4.5,
      popularity_score: 93,
      estimated_visit_time: 30,
      opening_hours: '8:00 AM - 11:00 PM daily',
      address: 'R. de Belém 84-92, 1300-085 Lisboa',
      website: 'https://pasteisdebelem.pt/',
    },
  },
  {
    name: 'Parque Eduardo VII',
    slug: 'parque-eduardo-vii',
    content: {
      component: 'place',
      title: 'Parque Eduardo VII',
      type: 'park',
      district: 'Avenidas Novas',
      city: 'Lisbon',
      latitude: 38.7297,
      longitude: -9.1517,
      short_excerpt: 'Lisbon\'s largest park with stunning city views',
      description: 'A beautiful formal garden offering panoramic views over the city center, perfect for a relaxing stroll or picnic.',
      tags: ['outdoor', 'nature', 'family'],
      price_range: 'free',
      rating: 4.4,
      popularity_score: 75,
      estimated_visit_time: 60,
      opening_hours: 'Open 24 hours',
      address: 'Parque Eduardo VII, Lisboa',
    },
  },
  {
    name: 'MAAT Museum',
    slug: 'maat-museum',
    content: {
      component: 'place',
      title: 'MAAT - Museum of Art, Architecture and Technology',
      type: 'museum',
      district: 'Belém',
      city: 'Lisbon',
      latitude: 38.6937,
      longitude: -9.2063,
      short_excerpt: 'Contemporary art museum with striking architecture',
      description: 'A stunning contemporary museum showcasing art, architecture, and technology exhibitions in a beautiful riverside setting.',
      tags: ['art', 'culture', 'indoor'],
      price_range: '$',
      rating: 4.5,
      popularity_score: 82,
      estimated_visit_time: 90,
      opening_hours: '11:00 AM - 7:00 PM (Closed Tuesdays)',
      address: 'Av. Brasília, 1300-598 Lisboa',
      website: 'https://www.maat.pt/',
    },
  },
];

async function addPlaces() {
  console.log('🚀 Adding sample places to Storyblok...\n');

  // First, find or create the places folder
  let placesFolderId: number | null = null;
  
  try {
    console.log('📁 Looking for places folder...');
    const folders = await client.get(`spaces/${SPACE_ID}/stories`, {
      is_folder: true,
    });
    
    const placesFolder = folders.data.stories.find((s: any) => s.slug === 'places');
    
    if (placesFolder) {
      placesFolderId = placesFolder.id;
      console.log(`   ✅ Found places folder (ID: ${placesFolderId})\n`);
    } else {
      console.log('   📁 Creating places folder...');
      const newFolder = await client.post(`spaces/${SPACE_ID}/stories`, {
        story: {
          name: 'places',
          slug: 'places',
          is_folder: true,
        },
      });
      placesFolderId = newFolder.data.story.id;
      console.log(`   ✅ Created places folder (ID: ${placesFolderId})\n`);
    }
  } catch (error: any) {
    console.error('❌ Error with places folder:', error.response?.data || error.message);
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const place of samplePlaces) {
    try {
      console.log(`📍 Creating: ${place.name}...`);
      
      await client.post(`spaces/${SPACE_ID}/stories`, {
        story: {
          name: place.name,
          slug: `places/${place.slug}`,
          content: place.content,
          parent_id: placesFolderId,
          is_folder: false,
          published: true,
        },
        publish: 1,
      });

      console.log(`   ✅ Created successfully`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: any) {
      if (error.response?.data?.error?.includes('already exists')) {
        console.log(`   ⚠️  Already exists, skipping...`);
      } else {
        console.error(`   ❌ Error:`, error.response?.data?.error || error.message);
        errorCount++;
      }
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   ✅ Created: ${successCount} places`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Run: npm run reindex`);
  console.log(`   2. Refresh your search page to see all places!`);
}

addPlaces().catch(console.error);
