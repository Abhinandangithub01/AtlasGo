'use client';

import { useHits } from 'react-instantsearch';
import Link from 'next/link';
import Image from 'next/image';
import { AlgoliaPlaceRecord } from '@/types';
import { useState } from 'react';

type HitProps = {
  hit: AlgoliaPlaceRecord & {
    _highlightResult?: any;
    _rankingInfo?: any;
  };
  userLocation?: { lat: number; lng: number };
};

function Hit({ hit, userLocation }: HitProps) {
  const [imageError, setImageError] = useState(false);
  
  // Calculate distance if user location is available
  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        hit._geoloc.lat,
        hit._geoloc.lng
      )
    : null;

  // Get image URL - use Storyblok image or fallback to location-specific images
  const getImageUrl = () => {
    if (hit.images?.[0] && !imageError) {
      return hit.images[0];
    }
    
    // Specific images for known places - using verified Unsplash photos
    const locationImages: Record<string, string> = {
      // India
      'taj-mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80', // Taj Mahal
      'gateway-of-india': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop&q=80', // Gateway of India Mumbai
      'india-gate-delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop&q=80', // India Gate Delhi
      'hawa-mahal': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80', // Hawa Mahal Jaipur
      'lotus-temple': 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&h=600&fit=crop&q=80', // Lotus Temple Delhi
      
      // United States
      'statue-of-liberty': 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop&q=80', // Statue of Liberty
      'golden-gate-bridge': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80', // Golden Gate Bridge
      'times-square': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=600&fit=crop&q=80', // Times Square NYC
      'central-park-nyc': 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&h=600&fit=crop&q=80', // Central Park
      'hollywood-sign': 'https://images.unsplash.com/photo-1598415443240-d3c9e1a4c78b?w=800&h=600&fit=crop&q=80', // Hollywood Sign
      
      // China
      'great-wall-china': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop&q=80', // Great Wall
      'forbidden-city': 'https://images.unsplash.com/photo-1529415537892-b71e3e3ce5a6?w=800&h=600&fit=crop&q=80', // Forbidden City
      'the-bund-shanghai': 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&h=600&fit=crop&q=80', // The Bund Shanghai
      'terracotta-army': 'https://images.unsplash.com/photo-1583407723467-b0b9c82f0592?w=800&h=600&fit=crop&q=80', // Terracotta Warriors
      'west-lake-hangzhou': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&q=80', // West Lake
      
      // New Zealand
      'milford-sound': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop&q=80', // Milford Sound
      'sky-tower-auckland': 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&h=600&fit=crop&q=80', // Sky Tower Auckland
      'hobbiton-movie-set': 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&h=600&fit=crop&q=80', // Hobbiton
      'queenstown-gardens': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Queenstown
      'waitomo-caves': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Waitomo Caves
      
      // South Africa
      'table-mountain': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop&q=80', // Table Mountain
      'robben-island': 'https://images.unsplash.com/photo-1563656353898-febc9270a0f5?w=800&h=600&fit=crop&q=80', // Robben Island
      'kruger-national-park': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop&q=80', // Kruger Safari
      'va-waterfront': 'https://images.unsplash.com/photo-1591825944920-9a8f1d9d51b0?w=800&h=600&fit=crop&q=80', // V&A Waterfront
      'apartheid-museum': 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=600&fit=crop&q=80', // Johannesburg
      
      // Portugal - Lisbon
      'maat-museum': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&q=80', // MAAT Lisbon
      'parque-eduardo-vii': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Lisbon Park
      'pasteis-de-belem': 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&h=600&fit=crop&q=80', // Pasteis de Belem
      'bairro-alto': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop&q=80', // Bairro Alto nightlife
      'oceanario-lisboa': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80', // Oceanarium
      'miradouro-santa-luzia': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Lisbon viewpoint
      'jeronimos-monastery': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Jeronimos
      'lx-factory': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&q=80', // LX Factory
      'belem-tower': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Belem Tower
      'time-out-market': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop&q=80', // Food market
      'castelo-de-sao-jorge': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Castle
      'sintra-palace': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop&q=80', // Sintra
      'porto-wine-cellars': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&q=80', // Porto wine
    };
    
    // Try to match by slug
    const slug = hit.slug.toLowerCase();
    if (locationImages[slug]) {
      return locationImages[slug];
    }
    
    // Fallback to type-based images
    const typeImages: Record<string, string> = {
      'museum': 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3a6?w=800&h=600&fit=crop&q=80',
      'restaurant': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80',
      'park': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80',
      'nightlife': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop&q=80',
      'shopping': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80',
      'hotel': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
      'attraction': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80',
    };
    
    return typeImages[hit.type] || typeImages['attraction'];
  };

  const imageUrl = getImageUrl();
  const priceDisplay = hit.price_range || 'Free';
  
  // Get icon based on place type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'museum':
        return '🏛️';
      case 'restaurant':
        return '🍽️';
      case 'park':
        return '🌳';
      case 'nightlife':
        return '🎉';
      case 'shopping':
        return '🛍️';
      case 'hotel':
        return '🏨';
      case 'attraction':
        return '🎭';
      default:
        return '📍';
    }
  };

  return (
    <Link
      href={`/place/${hit.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={hit.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
          onError={() => setImageError(true)}
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold shadow-md">
          {priceDisplay}
        </div>
        
        {/* Type badge on image */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
          <span className="text-sm">{getTypeIcon(hit.type)}</span>
          <span className="text-xs font-semibold text-gray-900">{hit.type}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {hit.title}
          </h3>
          {hit.rating && (
            <div className="flex items-center ml-2 bg-yellow-50 px-2 py-1 rounded-lg">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-gray-900">{hit.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-sm mb-3 flex-wrap gap-2">
          <span className="bg-blue-100 text-gray-900 px-3 py-1 rounded-full font-semibold text-xs">
            {hit.type}
          </span>
          {hit.country && (
            <span className="flex items-center gap-1 text-gray-900 font-medium">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {hit.country}
            </span>
          )}
          {hit.city && (
            <span className="flex items-center gap-1 text-gray-900 font-medium">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {hit.city}
            </span>
          )}
          {hit.district && (
            <span className="text-gray-700 text-xs font-medium">• {hit.district}</span>
          )}
        </div>

        <p className="text-gray-900 text-sm mb-3 line-clamp-2 leading-relaxed">
          {hit.short_excerpt}
        </p>

        {hit.tags && hit.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hit.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-900 px-2 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {distance !== null && (
          <div className="flex items-center gap-1 text-sm text-blue-600 font-semibold mt-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {distance.toFixed(1)} km away
          </div>
        )}
      </div>
    </Link>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default function SearchHits() {
  const { hits } = useHits<AlgoliaPlaceRecord>();

  if (hits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No places found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hits.map((hit) => (
        <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
}
