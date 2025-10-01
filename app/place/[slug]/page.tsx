'use client';

import { useEffect, useState } from 'react';
import { getPlace } from '@/lib/storyblok';
import { Place } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MapPlace } from '@/components/Map';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function PlacePage({ params }: { params: { slug: string } }) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToItinerary, setAddedToItinerary] = useState(false);

  useEffect(() => {
    async function fetchPlace() {
      const data = await getPlace(params.slug);
      setPlace(data);
      setLoading(false);
    }
    fetchPlace();
  }, [params.slug]);

  const handleAddToItinerary = () => {
    if (!place) return;

    // Get existing itinerary from localStorage
    const existingItinerary = localStorage.getItem('itinerary_draft');
    const itinerary = existingItinerary ? JSON.parse(existingItinerary) : [];

    // Check if already added
    const alreadyAdded = itinerary.some((p: any) => p.slug === place.slug);
    if (alreadyAdded) {
      alert('This place is already in your itinerary!');
      return;
    }

    // Add place to itinerary
    itinerary.push({
      slug: place.slug,
      title: place.title,
      type: place.type,
      district: place.district,
      estimated_visit_time: place.estimated_visit_time,
    });

    localStorage.setItem('itinerary_draft', JSON.stringify(itinerary));
    setAddedToItinerary(true);
    setTimeout(() => setAddedToItinerary(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⟳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Place Not Found</h1>
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const mapPlaces: MapPlace[] = [
    {
      id: place.id,
      title: place.title,
      slug: place.slug,
      lat: place.location.lat,
      lng: place.location.lng,
      short_excerpt: place.short_excerpt,
      image: place.images?.[0]?.filename,
      type: place.type,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/search" className="text-blue-600 hover:underline">
              ← Back to Search
            </Link>
            <button
              onClick={handleAddToItinerary}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {addedToItinerary ? '✓ Added!' : '+ Add to Itinerary'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {place.images && place.images.length > 0 && (
        <div className="relative h-96 w-full">
          <Image
            src={place.images[0].filename}
            alt={place.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-5xl font-bold text-white mb-2">{place.title}</h1>
              <div className="flex items-center gap-4 text-white">
                <span className="bg-blue-600 px-3 py-1 rounded">{place.type}</span>
                {place.rating && (
                  <span className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    {place.rating.toFixed(1)}
                  </span>
                )}
                {place.price_range && (
                  <span>{place.price_range}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 text-lg mb-4">{place.short_excerpt}</p>
              {place.description && (
                <div className="text-gray-600 prose max-w-none">
                  {place.description}
                </div>
              )}
            </div>

            {/* Tags */}
            {place.tags && place.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {place.images && place.images.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {place.images.slice(1).map((image, idx) => (
                    <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image.filename}
                        alt={image.alt || place.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <Map
                places={mapPlaces}
                center={[place.location.lat, place.location.lng]}
                zoom={15}
                height="400px"
                enableClustering={false}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Information</h2>
              <dl className="space-y-3">
                {place.district && (
                  <div>
                    <dt className="text-sm text-gray-600">District</dt>
                    <dd className="font-semibold">
                      <Link
                        href={`/district/${place.district.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:underline"
                      >
                        {place.district}
                      </Link>
                    </dd>
                  </div>
                )}
                {place.address && (
                  <div>
                    <dt className="text-sm text-gray-600">Address</dt>
                    <dd className="font-semibold">{place.address}</dd>
                  </div>
                )}
                {place.opening_hours && (
                  <div>
                    <dt className="text-sm text-gray-600">Opening Hours</dt>
                    <dd className="font-semibold whitespace-pre-line">{place.opening_hours}</dd>
                  </div>
                )}
                {place.contact && (
                  <div>
                    <dt className="text-sm text-gray-600">Contact</dt>
                    <dd className="font-semibold">{place.contact}</dd>
                  </div>
                )}
                {place.website && (
                  <div>
                    <dt className="text-sm text-gray-600">Website</dt>
                    <dd>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website →
                      </a>
                    </dd>
                  </div>
                )}
                {place.estimated_visit_time && (
                  <div>
                    <dt className="text-sm text-gray-600">Estimated Visit Time</dt>
                    <dd className="font-semibold">{place.estimated_visit_time} minutes</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Accessibility */}
            {place.accessibility_features && place.accessibility_features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Accessibility</h2>
                <ul className="space-y-2">
                  {place.accessibility_features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {place.languages && place.languages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {place.languages.map((lang) => (
                    <span key={lang} className="bg-gray-100 px-3 py-1 rounded text-sm">
                      {lang.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
