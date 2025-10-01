'use client';

import { useHits } from 'react-instantsearch';
import Link from 'next/link';
import Image from 'next/image';
import { AlgoliaPlaceRecord } from '@/types';

type HitProps = {
  hit: AlgoliaPlaceRecord & {
    _highlightResult?: any;
    _rankingInfo?: any;
  };
  userLocation?: { lat: number; lng: number };
};

function Hit({ hit, userLocation }: HitProps) {
  // Calculate distance if user location is available
  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        hit._geoloc.lat,
        hit._geoloc.lng
      )
    : null;

  const imageUrl = hit.images?.[0] || '/placeholder-place.jpg';
  const priceDisplay = hit.price_range || 'Free';

  return (
    <Link
      href={`/place/${hit.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={hit.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold">
          {priceDisplay}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {hit.title}
          </h3>
          {hit.rating && (
            <div className="flex items-center ml-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm font-semibold">{hit.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
            {hit.type}
          </span>
          {hit.district && (
            <span className="text-gray-500">📍 {hit.district}</span>
          )}
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {hit.short_excerpt}
        </p>

        {hit.tags && hit.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {hit.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {distance !== null && (
          <div className="text-sm text-blue-600 font-semibold">
            📍 {distance.toFixed(1)} km away
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
