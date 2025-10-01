import StoryblokClient from 'storyblok-js-client';
import { Place, District, CityGuide } from '@/types';

// Lazy initialization to ensure env vars are loaded
let _storyblok: StoryblokClient | null = null;
let _storyblokManagement: StoryblokClient | null = null;

function getStoryblokClient() {
  if (!_storyblok) {
    _storyblok = new StoryblokClient({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN || '',
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    });
  }
  return _storyblok;
}

function getStoryblokManagementClient() {
  if (!_storyblokManagement) {
    _storyblokManagement = new StoryblokClient({
      accessToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
    });
  }
  return _storyblokManagement;
}

/**
 * Fetch all places from Storyblok
 */
export async function getAllPlaces(): Promise<Place[]> {
  try {
    const client = getStoryblokClient();
    const response = await client.get('cdn/stories', {
      version: 'draft', // Use draft to get all content including published
      starts_with: 'places/',
      per_page: 100,
    });

    const places = response.data.stories
      .filter((story: any) => story.content.component === 'place')
      .map((story: any) => transformStoryToPlace(story));
    
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error; // Re-throw to see the actual error
  }
}

/**
 * Fetch a single place by slug
 */
export async function getPlace(slug: string): Promise<Place | null> {
  try {
    const client = getStoryblokClient();
    
    // Try places/ folder first (for old places)
    try {
      const response = await client.get(`cdn/stories/places/${slug}`, {
        version: 'published',
      });
      return transformStoryToPlace(response.data.story);
    } catch (folderError) {
      // If not found in places/ folder, search by slug at root level
      const searchResponse = await client.get('cdn/stories', {
        version: 'published',
        filter_query: {
          component: {
            in: 'place'
          }
        },
        by_slugs: slug,
      });
      
      if (searchResponse.data.stories && searchResponse.data.stories.length > 0) {
        return transformStoryToPlace(searchResponse.data.stories[0]);
      }
      
      return null;
    }
  } catch (error) {
    console.error(`Error fetching place ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a single district by slug
 */
export async function getDistrict(slug: string): Promise<District | null> {
  try {
    const client = getStoryblokClient();
    const response = await client.get(`cdn/stories/districts/${slug}`, {
      version: 'published',
      resolve_relations: 'district.places',
    });

    return transformStoryToDistrict(response.data.story);
  } catch (error) {
    console.error(`Error fetching district ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all districts
 */
export async function getAllDistricts(): Promise<District[]> {
  try {
    const client = getStoryblokClient();
    const response = await client.get('cdn/stories', {
      version: 'published',
      starts_with: 'districts/',
      per_page: 100,
    });

    return response.data.stories.map((story: any) => transformStoryToDistrict(story));
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
}

/**
 * Fetch city guide
 */
export async function getCityGuide(slug: string): Promise<CityGuide | null> {
  try {
    const client = getStoryblokClient();
    const response = await client.get(`cdn/stories/cities/${slug}`, {
      version: 'published',
      resolve_relations: 'city_guide.districts',
    });

    return transformStoryToCityGuide(response.data.story);
  } catch (error) {
    console.error(`Error fetching city guide ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a single story by ID (for webhooks)
 */
export async function getStoryById(storyId: number): Promise<any> {
  try {
    const client = getStoryblokClient();
    const response = await client.get(`cdn/stories/${storyId}`, {
      version: 'published',
    });

    return response.data.story;
  } catch (error) {
    console.error(`Error fetching story ${storyId}:`, error);
    return null;
  }
}

// Transform functions
function transformStoryToPlace(story: any): Place {
  const content = story.content;
  
  return {
    id: story.id,
    uuid: story.uuid,
    title: content.title || story.name,
    slug: story.slug,
    type: content.type || 'attraction',
    district: content.district || '',
    city: content.city || '',
    country: content.country || 'Portugal',
    location: {
      lat: parseFloat(content.location?.lat || content.latitude || 0),
      lng: parseFloat(content.location?.lng || content.longitude || 0),
    },
    address: content.address || '',
    description: content.description || '',
    short_excerpt: content.short_excerpt || '',
    tags: content.tags || [],
    price_range: content.price_range || 'free',
    rating: parseFloat(content.rating || 0),
    popularity_score: parseInt(content.popularity_score || 0),
    opening_hours: content.opening_hours || '',
    contact: content.contact || '',
    website: content.website || '',
    images: content.images || [],
    next_event_date: content.next_event_date || undefined,
    estimated_visit_time: parseInt(content.estimated_visit_time || 60),
    languages: content.languages || [],
    accessibility_features: content.accessibility_features || [],
  };
}

function transformStoryToDistrict(story: any): District {
  const content = story.content;
  
  return {
    id: story.id,
    uuid: story.uuid,
    name: content.name || story.name,
    slug: story.slug,
    city: content.city || '',
    description: content.description || '',
    short_excerpt: content.short_excerpt || '',
    banner_image: content.banner_image || null,
    location: {
      lat: parseFloat(content.location?.lat || content.latitude || 0),
      lng: parseFloat(content.location?.lng || content.longitude || 0),
    },
    tags: content.tags || [],
    places: content.places?.map((p: any) => transformStoryToPlace(p)) || [],
  };
}

function transformStoryToCityGuide(story: any): CityGuide {
  const content = story.content;
  
  return {
    id: story.id,
    uuid: story.uuid,
    name: content.name || story.name,
    slug: story.slug,
    description: content.description || '',
    banner_image: content.banner_image || null,
    districts: content.districts?.map((d: any) => transformStoryToDistrict(d)) || [],
  };
}

export default getStoryblokClient();
