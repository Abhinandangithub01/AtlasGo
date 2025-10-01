// Storyblok Story Types
export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Place {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  type: 'restaurant' | 'museum' | 'park' | 'nightlife' | 'shopping' | 'attraction' | 'event' | 'hotel';
  district: string;
  city: string;
  location: GeoLocation;
  address: string;
  description: string;
  short_excerpt: string;
  tags: string[];
  price_range: 'free' | '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  popularity_score: number;
  opening_hours: string;
  contact: string;
  website: string;
  images: StoryblokAsset[];
  next_event_date?: string;
  estimated_visit_time?: number; // in minutes
  languages?: string[];
  accessibility_features?: string[];
}

export interface District {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  city: string;
  description: string;
  short_excerpt: string;
  banner_image: StoryblokAsset;
  location: GeoLocation;
  tags: string[];
  places?: Place[];
}

export interface CityGuide {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  banner_image: StoryblokAsset;
  districts: District[];
}

export interface ItineraryTemplate {
  id: number;
  uuid: string;
  name: string;
  duration_days: number;
  pace: 'relaxed' | 'moderate' | 'fast';
  interests: string[];
  suggested_places: Place[];
}

// Algolia Record Types
export interface AlgoliaPlaceRecord {
  objectID: string;
  title: string;
  slug: string;
  type: string;
  district: string | null;
  city: string | null;
  short_excerpt: string;
  description: string;
  tags: string[];
  price_range: string | null;
  rating: number | null;
  popularity_score: number;
  next_event_date: string | null;
  estimated_visit_time: number | null;
  _geoloc: {
    lat: number;
    lng: number;
  };
  images?: string[];
}

// User Preferences
export interface UserPreferences {
  interests: string[];
  pace?: 'relaxed' | 'moderate' | 'fast';
  priceRange?: string[];
}

// Itinerary Types
export interface ItineraryVisit {
  name: string;
  slug: string;
  duration_min: number;
  note: string;
  start_time?: string;
}

export interface ItineraryBlock {
  period: 'Morning' | 'Afternoon' | 'Evening';
  visits: ItineraryVisit[];
}

export interface ItineraryDay {
  day: number;
  date?: string;
  blocks: ItineraryBlock[];
}

export interface Itinerary {
  days: ItineraryDay[];
  summary?: string;
}

export interface ItineraryRequest {
  city: string;
  districts: string[];
  dates: {
    start: string;
    end: string;
  };
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'fast';
}
