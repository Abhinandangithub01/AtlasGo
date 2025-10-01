/**
 * Add quick-win features to Storyblok
 * Hero Banners, Featured Collections, FAQs, Testimonials
 * Run with: npm run add:features
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import StoryblokClient from 'storyblok-js-client';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '';

// Hero Banners for Homepage
const heroBanners = [
  {
    name: 'Explore the World Banner',
    slug: 'hero-explore-world',
    content: {
      component: 'hero_banner',
      title: 'Discover Your Next Adventure',
      subtitle: 'Explore 48+ amazing destinations across 6 countries with AI-powered trip planning',
      background_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop&q=80',
      cta_text: 'Start Exploring',
      cta_link: '/search',
      cta_secondary_text: 'Plan a Trip',
      cta_secondary_link: '/itinerary',
      overlay_opacity: 0.4,
      text_color: 'white',
      active: true,
    },
  },
  {
    name: 'AI Trip Planning Banner',
    slug: 'hero-ai-planning',
    content: {
      component: 'hero_banner',
      title: 'AI-Powered Trip Planning',
      subtitle: 'Let our AI create the perfect itinerary based on your preferences and interests',
      background_image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop&q=80',
      cta_text: 'Plan My Trip',
      cta_link: '/itinerary',
      cta_secondary_text: 'Browse Places',
      cta_secondary_link: '/search',
      overlay_opacity: 0.5,
      text_color: 'white',
      active: true,
    },
  },
];

// Featured Collections
const featuredCollections = [
  {
    name: 'Top Museums Worldwide',
    slug: 'collection-top-museums',
    content: {
      component: 'featured_collection',
      title: 'World-Class Museums',
      description: 'Explore the finest museums and cultural institutions across the globe',
      icon: '🏛️',
      places: ['taj-mahal', 'forbidden-city', 'maat-museum', 'apartheid-museum'],
      featured: true,
      color: 'blue',
    },
  },
  {
    name: 'Best Parks & Nature',
    slug: 'collection-parks-nature',
    content: {
      component: 'featured_collection',
      title: 'Natural Wonders',
      description: 'Breathtaking parks and natural landscapes for outdoor enthusiasts',
      icon: '🌳',
      places: ['central-park-nyc', 'milford-sound', 'kruger-national-park', 'west-lake-hangzhou'],
      featured: true,
      color: 'green',
    },
  },
  {
    name: 'Iconic Landmarks',
    slug: 'collection-iconic-landmarks',
    content: {
      component: 'featured_collection',
      title: 'Must-See Landmarks',
      description: 'World-famous attractions that define their destinations',
      icon: '🗼',
      places: ['statue-of-liberty', 'golden-gate-bridge', 'great-wall-china', 'table-mountain'],
      featured: true,
      color: 'purple',
    },
  },
  {
    name: 'Hidden Gems',
    slug: 'collection-hidden-gems',
    content: {
      component: 'featured_collection',
      title: 'Hidden Gems',
      description: 'Off-the-beaten-path treasures waiting to be discovered',
      icon: '💎',
      places: ['waitomo-caves', 'hobbiton-movie-set', 'hawa-mahal', 'lotus-temple'],
      featured: true,
      color: 'pink',
    },
  },
];

// FAQs
const faqs = [
  {
    name: 'General FAQs',
    slug: 'faqs-general',
    content: {
      component: 'faq_section',
      title: 'Frequently Asked Questions',
      category: 'General',
      questions: [
        {
          question: 'How does AtlasGo work?',
          answer: 'AtlasGo uses Storyblok CMS for content management and Algolia for lightning-fast search. Our AI-powered itinerary generator helps you plan perfect trips based on your preferences.',
        },
        {
          question: 'Is AtlasGo free to use?',
          answer: 'Yes! AtlasGo is completely free to use. Browse destinations, search places, and generate AI-powered itineraries at no cost.',
        },
        {
          question: 'How many destinations are available?',
          answer: 'We currently feature 48+ amazing places across 6 countries: Portugal, India, United States, China, New Zealand, and South Africa. We\'re constantly adding more!',
        },
        {
          question: 'Can I save my favorite places?',
          answer: 'Yes! You can add places to your itinerary and save them for later. Your itinerary is stored locally in your browser.',
        },
        {
          question: 'How does the AI itinerary generator work?',
          answer: 'Our AI analyzes your preferences (interests, travel pace, dates) and creates a personalized day-by-day itinerary using real places from our database.',
        },
      ],
    },
  },
  {
    name: 'Travel Planning FAQs',
    slug: 'faqs-travel-planning',
    content: {
      component: 'faq_section',
      title: 'Trip Planning Help',
      category: 'Planning',
      questions: [
        {
          question: 'How do I plan a multi-city trip?',
          answer: 'Use our search filters to select multiple cities, add places to your itinerary, and our AI will optimize the route for you.',
        },
        {
          question: 'Can I customize the AI-generated itinerary?',
          answer: 'Absolutely! The AI provides a starting point, but you can modify it based on your preferences and schedule.',
        },
        {
          question: 'What information do I need to provide?',
          answer: 'Just tell us your destination, travel dates, interests, and preferred pace (relaxed, moderate, or fast-paced).',
        },
      ],
    },
  },
];

// Testimonials
const testimonials = [
  {
    name: 'Sarah Johnson Testimonial',
    slug: 'testimonial-sarah',
    content: {
      component: 'testimonial',
      name: 'Sarah Johnson',
      location: 'New York, USA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
      rating: 5,
      text: 'AtlasGo made planning my Portugal trip so easy! The AI itinerary was spot-on and saved me hours of research.',
      trip: 'Lisbon & Porto Adventure',
      date: '2024-03',
    },
  },
  {
    name: 'Michael Chen Testimonial',
    slug: 'testimonial-michael',
    content: {
      component: 'testimonial',
      name: 'Michael Chen',
      location: 'Singapore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
      rating: 5,
      text: 'The search is incredibly fast and the place recommendations are excellent. Found hidden gems I wouldn\'t have discovered otherwise!',
      trip: 'New Zealand Explorer',
      date: '2024-02',
    },
  },
  {
    name: 'Priya Sharma Testimonial',
    slug: 'testimonial-priya',
    content: {
      component: 'testimonial',
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
      rating: 5,
      text: 'Love how AtlasGo combines beautiful design with powerful features. The local tips are incredibly helpful!',
      trip: 'South Africa Safari',
      date: '2024-01',
    },
  },
  {
    name: 'David Martinez Testimonial',
    slug: 'testimonial-david',
    content: {
      component: 'testimonial',
      name: 'David Martinez',
      location: 'Barcelona, Spain',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
      rating: 5,
      text: 'Best travel planning tool I\'ve used. The integration with Storyblok and Algolia makes everything seamless.',
      trip: 'China Cultural Tour',
      date: '2024-02',
    },
  },
];

async function addQuickFeatures() {
  console.log('🚀 Adding quick-win features to Storyblok...\n');

  let successCount = 0;
  let errorCount = 0;

  const allContent = [
    ...heroBanners.map(item => ({ ...item, type: 'Hero Banner' })),
    ...featuredCollections.map(item => ({ ...item, type: 'Featured Collection' })),
    ...faqs.map(item => ({ ...item, type: 'FAQ Section' })),
    ...testimonials.map(item => ({ ...item, type: 'Testimonial' })),
  ];

  for (const item of allContent) {
    try {
      console.log(`✨ Creating: ${item.name} (${item.type})`);
      
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
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully created: ${successCount} items`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n🎉 Content breakdown:`);
  console.log(`   🎨 Hero Banners: ${heroBanners.length}`);
  console.log(`   ⭐ Featured Collections: ${featuredCollections.length}`);
  console.log(`   ❓ FAQ Sections: ${faqs.length}`);
  console.log(`   💬 Testimonials: ${testimonials.length}`);
  console.log(`\n💡 Next: Update homepage to display these features!`);
  
  process.exit(0);
}

addQuickFeatures();
