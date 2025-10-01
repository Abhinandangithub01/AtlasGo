import algoliasearch from 'algoliasearch';
import { Place, AlgoliaPlaceRecord } from '@/types';

// Initialize Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_ADMIN_KEY || ''
);

const PLACES_INDEX = 'places';

/**
 * Get Algolia index
 */
export function getPlacesIndex() {
  return client.initIndex(PLACES_INDEX);
}

/**
 * Transform Place to Algolia record
 */
export function transformPlaceToRecord(place: Place): AlgoliaPlaceRecord {
  return {
    objectID: `place_${place.id}`,
    title: place.title,
    slug: place.slug,
    type: place.type,
    district: place.district || null,
    city: place.city || null,
    short_excerpt: place.short_excerpt,
    description: place.description,
    tags: place.tags || [],
    price_range: place.price_range || null,
    rating: place.rating || null,
    popularity_score: place.popularity_score || 0,
    next_event_date: place.next_event_date || null,
    estimated_visit_time: place.estimated_visit_time || null,
    _geoloc: {
      lat: place.location.lat,
      lng: place.location.lng,
    },
    images: place.images?.map(img => img.filename) || [],
  };
}

/**
 * Index all places to Algolia
 */
export async function indexAllPlaces(places: Place[]) {
  const index = getPlacesIndex();
  const records = places.map(transformPlaceToRecord);
  
  try {
    const result = await index.saveObjects(records);
    return {
      success: true,
      objectIDs: result.objectIDs,
      count: records.length,
    };
  } catch (error) {
    console.error('Error indexing places:', error);
    throw error;
  }
}

/**
 * Index a single place to Algolia
 */
export async function indexPlace(place: Place) {
  const index = getPlacesIndex();
  const record = transformPlaceToRecord(place);
  
  try {
    const result = await index.saveObject(record);
    return {
      success: true,
      objectID: result.objectID,
    };
  } catch (error) {
    console.error('Error indexing place:', error);
    throw error;
  }
}

/**
 * Delete a place from Algolia
 */
export async function deletePlaceFromIndex(placeId: number) {
  const index = getPlacesIndex();
  const objectID = `place_${placeId}`;
  
  try {
    await index.deleteObject(objectID);
    return {
      success: true,
      objectID,
    };
  } catch (error) {
    console.error('Error deleting place:', error);
    throw error;
  }
}

/**
 * Clear all records from index
 */
export async function clearIndex() {
  const index = getPlacesIndex();
  
  try {
    await index.clearObjects();
    return { success: true };
  } catch (error) {
    console.error('Error clearing index:', error);
    throw error;
  }
}

export default client;
