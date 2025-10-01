/**
 * Add diverse content sections to Storyblok
 * Travel Guides, Local Tips, Food Guides, Events, Neighborhoods
 * Run with: npm run add:sections
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// Travel Guides
const travelGuides = [
  {
    name: 'Lisbon Travel Guide',
    slug: 'lisbon-travel-guide',
    content: {
      component: 'travel_guide',
      title: 'Complete Guide to Lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      hero_image: '',
      introduction: 'Discover the charm of Lisbon, Portugal\'s hilly coastal capital. From historic trams to delicious pastéis de nata, this guide covers everything you need to know.',
      best_time_to_visit: 'March to May and September to October offer pleasant weather and fewer crowds.',
      getting_around: 'Use the iconic yellow trams, metro system, or walk through the historic neighborhoods. The 28 tram is a must-do experience.',
      budget_tips: 'Eat at local tascas, buy a Lisboa Card for free transport and museum entry, and enjoy free viewpoints (miradouros) for stunning city views.',
      must_see: ['Belém Tower', 'Jerónimos Monastery', 'Alfama District', 'São Jorge Castle', 'LX Factory'],
      hidden_gems: ['Miradouro de Santa Luzia', 'Time Out Market', 'Pink Street nightlife'],
      local_cuisine: ['Pastéis de Nata', 'Bacalhau', 'Bifana', 'Ginjinha', 'Seafood'],
      estimated_days: 3,
      tags: ['culture', 'food', 'history', 'nightlife'],
    },
  },
  {
    name: 'New York City Guide',
    slug: 'new-york-city-guide',
    content: {
      component: 'travel_guide',
      title: 'The Ultimate NYC Experience',
      city: 'New York',
      country: 'United States',
      hero_image: '',
      introduction: 'The city that never sleeps offers endless possibilities. From world-class museums to diverse neighborhoods, NYC is a melting pot of culture and excitement.',
      best_time_to_visit: 'April-June and September-November for mild weather. December is magical with holiday decorations.',
      getting_around: 'Subway is the fastest way. Get a MetroCard for unlimited rides. Walking is great for exploring neighborhoods.',
      budget_tips: 'Many museums have pay-what-you-wish hours. Eat at food trucks and ethnic restaurants. Free ferry to Staten Island offers great Statue of Liberty views.',
      must_see: ['Statue of Liberty', 'Central Park', 'Times Square', 'Brooklyn Bridge', 'Empire State Building'],
      hidden_gems: ['High Line Park', 'Roosevelt Island Tramway', 'Greenwich Village', 'Smorgasburg'],
      local_cuisine: ['New York Pizza', 'Bagels', 'Hot Dogs', 'Cheesecake', 'Pastrami Sandwich'],
      estimated_days: 5,
      tags: ['culture', 'food', 'shopping', 'nightlife', 'art'],
    },
  },
];

// Local Tips
const localTips = [
  {
    name: 'Lisbon Local Tips',
    slug: 'lisbon-local-tips',
    content: {
      component: 'local_tips',
      title: 'Insider Tips for Lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      tips: [
        {
          category: 'Transportation',
          tip: 'Buy a rechargeable Viva Viagem card for all public transport. Much cheaper than single tickets.',
          icon: '🚊',
        },
        {
          category: 'Food',
          tip: 'Avoid tourist traps near Rossio. Head to Mouraria or Graça for authentic Portuguese food at local prices.',
          icon: '🍽️',
        },
        {
          category: 'Timing',
          tip: 'Visit popular sites early morning (8-9 AM) to avoid crowds and heat. Many places open at 9 AM.',
          icon: '⏰',
        },
        {
          category: 'Money',
          tip: 'Many small shops and restaurants are cash-only. Always carry some euros.',
          icon: '💰',
        },
        {
          category: 'Language',
          tip: 'Learn basic Portuguese phrases. Locals appreciate the effort, though many speak English.',
          icon: '🗣️',
        },
      ],
      safety_notes: 'Lisbon is generally safe, but watch for pickpockets in tourist areas and on tram 28.',
      local_customs: 'Portuguese people are friendly but reserved. Greet shopkeepers when entering. Tipping 5-10% is appreciated but not mandatory.',
    },
  },
  {
    name: 'Cape Town Local Tips',
    slug: 'cape-town-local-tips',
    content: {
      component: 'local_tips',
      title: 'Insider Tips for Cape Town',
      city: 'Cape Town',
      country: 'South Africa',
      tips: [
        {
          category: 'Weather',
          tip: 'Cape Town weather changes quickly. Always bring layers and check Table Mountain webcam before visiting.',
          icon: '🌤️',
        },
        {
          category: 'Safety',
          tip: 'Use Uber or metered taxis at night. Avoid displaying expensive items. Stay in well-lit tourist areas after dark.',
          icon: '🔒',
        },
        {
          category: 'Wine',
          tip: 'Book wine tours in Stellenbosch and Franschhoek in advance. Many estates offer free tastings.',
          icon: '🍷',
        },
        {
          category: 'Beaches',
          tip: 'Camps Bay for sunset, Boulders Beach for penguins, Muizenberg for surfing. Water is cold year-round!',
          icon: '🏖️',
        },
        {
          category: 'Food',
          tip: 'Try braai (BBQ), bobotie, and bunny chow. V&A Waterfront has great restaurants but explore local townships for authentic food.',
          icon: '🍖',
        },
      ],
      safety_notes: 'Be aware of your surroundings. Don\'t walk alone at night. Keep car doors locked when driving.',
      local_customs: 'South Africans are warm and friendly. Tipping 10-15% is expected. Learn a few words in Afrikaans or Xhosa.',
    },
  },
];

// Food & Dining Guides
const foodGuides = [
  {
    name: 'Best Restaurants in Lisbon',
    slug: 'lisbon-food-guide',
    content: {
      component: 'food_guide',
      title: 'Where to Eat in Lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      introduction: 'From traditional tascas to Michelin-starred restaurants, Lisbon\'s food scene is diverse and delicious.',
      categories: [
        {
          name: 'Traditional Portuguese',
          restaurants: ['Ramiro (seafood)', 'Cervejaria Trindade', 'Tasca da Esquina'],
          price_range: '$$',
        },
        {
          name: 'Pastéis de Nata',
          restaurants: ['Pastéis de Belém (original)', 'Manteigaria', 'Fábrica da Nata'],
          price_range: '$',
        },
        {
          name: 'Fine Dining',
          restaurants: ['Belcanto (2 Michelin stars)', 'Alma', 'Eleven'],
          price_range: '$$$$',
        },
        {
          name: 'Street Food',
          restaurants: ['Time Out Market', 'Mercado da Ribeira', 'Food trucks in LX Factory'],
          price_range: '$',
        },
      ],
      must_try_dishes: ['Bacalhau à Brás', 'Sardinhas Assadas', 'Caldo Verde', 'Arroz de Marisco', 'Francesinha'],
      vegetarian_options: 'PSI (vegetarian restaurant), The Food Temple, Ao 26 Vegan Food Project',
      food_tours: 'Taste of Lisboa, Eating Europe, Culinary Backstreets',
    },
  },
];

// Events
const events = [
  {
    name: 'Lisbon Events Calendar',
    slug: 'lisbon-events',
    content: {
      component: 'events',
      title: 'Upcoming Events in Lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      featured_events: [
        {
          name: 'Santo António Festival',
          date: 'June 12-13',
          description: 'Lisbon\'s biggest festival celebrating the city\'s patron saint with street parties, grilled sardines, and parades.',
          location: 'Alfama District',
          type: 'Cultural Festival',
          free: true,
        },
        {
          name: 'Rock in Rio Lisboa',
          date: 'June (biennial)',
          description: 'Major music festival featuring international rock and pop artists.',
          location: 'Parque da Bela Vista',
          type: 'Music Festival',
          free: false,
        },
        {
          name: 'Lisbon Book Fair',
          date: 'May-June',
          description: 'Annual book fair with author signings, readings, and cultural events.',
          location: 'Parque Eduardo VII',
          type: 'Cultural Event',
          free: true,
        },
      ],
      recurring_events: 'LX Market (Sundays), Flea Market at Feira da Ladra (Tuesdays and Saturdays)',
      seasonal_highlights: 'Christmas markets (December), New Year\'s Eve at Terreiro do Paço, Summer music festivals',
    },
  },
];

// Neighborhoods
const neighborhoods = [
  {
    name: 'Alfama District Guide',
    slug: 'alfama-neighborhood',
    content: {
      component: 'neighborhood',
      title: 'Alfama: Lisbon\'s Historic Heart',
      city: 'Lisbon',
      country: 'Portugal',
      district: 'Alfama',
      description: 'Alfama is Lisbon\'s oldest neighborhood, a maze of narrow streets, traditional fado houses, and stunning viewpoints.',
      character: 'Historic, authentic, charming with a village-like atmosphere',
      best_for: ['History lovers', 'Photography', 'Fado music', 'Walking tours'],
      highlights: [
        'São Jorge Castle',
        'Lisbon Cathedral (Sé)',
        'Miradouro de Santa Luzia',
        'Fado houses',
        'Feira da Ladra flea market',
      ],
      where_to_eat: ['Páteo 13 (traditional)', 'Cruzes Credo (tapas)', 'Santa Clara dos Cogumelos (vegetarian)'],
      where_to_stay: 'Boutique hotels and guesthouses in historic buildings',
      getting_there: 'Tram 28, Tram 12, or walk from downtown',
      local_vibe: 'Authentic Lisbon with laundry hanging from windows, locals chatting on doorsteps, and the sound of fado drifting through the streets.',
      tips: 'Wear comfortable shoes for cobblestone streets. Visit in the morning for fewer crowds. Listen to live fado at night.',
    },
  },
  {
    name: 'Brooklyn Neighborhood Guide',
    slug: 'brooklyn-neighborhood',
    content: {
      component: 'neighborhood',
      title: 'Brooklyn: NYC\'s Creative Borough',
      city: 'New York',
      country: 'United States',
      district: 'Brooklyn',
      description: 'Brooklyn has evolved from working-class borough to hipster haven, offering diverse neighborhoods, amazing food, and vibrant arts scene.',
      character: 'Trendy, diverse, artistic with a laid-back vibe',
      best_for: ['Foodies', 'Art lovers', 'Nightlife', 'Shopping'],
      highlights: [
        'Brooklyn Bridge',
        'DUMBO waterfront',
        'Williamsburg',
        'Brooklyn Museum',
        'Prospect Park',
        'Coney Island',
      ],
      where_to_eat: ['Smorgasburg (food market)', 'Peter Luger Steakhouse', 'Juliana\'s Pizza', 'Roberta\'s'],
      where_to_stay: 'Williamsburg for nightlife, DUMBO for views, Park Slope for family-friendly',
      getting_there: 'Multiple subway lines, walk across Brooklyn Bridge from Manhattan',
      local_vibe: 'Creative energy with street art, indie boutiques, craft breweries, and a strong sense of community.',
      tips: 'Explore different neighborhoods - each has its own character. Visit Brooklyn Flea for vintage finds. Sunset at Brooklyn Bridge Park is magical.',
    },
  },
];

async function addContentSections() {
  console.log('📚 Adding diverse content sections to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  const allContent = [
    ...travelGuides.map(item => ({ ...item, type: 'Travel Guide' })),
    ...localTips.map(item => ({ ...item, type: 'Local Tips' })),
    ...foodGuides.map(item => ({ ...item, type: 'Food Guide' })),
    ...events.map(item => ({ ...item, type: 'Events' })),
    ...neighborhoods.map(item => ({ ...item, type: 'Neighborhood' })),
  ];

  for (const item of allContent) {
    try {
      console.log(`📝 Creating: ${item.name} (${item.type})`);
      
      await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: item.name,
          slug: item.slug,
          content: item.content,
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
  console.log(`   ✅ Successfully created: ${successCount} content sections`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Done! Content breakdown:`);
  console.log(`   📖 Travel Guides: ${travelGuides.length}`);
  console.log(`   💡 Local Tips: ${localTips.length}`);
  console.log(`   🍽️ Food Guides: ${foodGuides.length}`);
  console.log(`   🎭 Events: ${events.length}`);
  console.log(`   🏘️ Neighborhoods: ${neighborhoods.length}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Create components in Storyblok for: travel_guide, local_tips, food_guide, events, neighborhood`);
  console.log(`   2. Create pages in Next.js to display this content`);
  console.log(`   3. Link from place pages to related guides`);
  
  process.exit(0);
}

addContentSections();
