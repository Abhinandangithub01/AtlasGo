import { getDistrict } from '@/lib/storyblok';
import { searchClient, PLACES_INDEX_NAME } from '@/lib/algolia-client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPlace } from '@/components/Map';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default async function DistrictPage({ params }: { params: { slug: string } }) {
  const district = await getDistrict(params.slug);

  if (!district) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">District Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Search for places in this district using Algolia
  const index = searchClient.initIndex(PLACES_INDEX_NAME);
  const searchResults = await index.search('', {
    filters: `district:"${district.name}"`,
    hitsPerPage: 100,
  });

  const places: MapPlace[] = searchResults.hits.map((hit: any) => ({
    id: parseInt(hit.objectID.replace('place_', '')),
    title: hit.title,
    slug: hit.slug,
    lat: hit._geoloc.lat,
    lng: hit._geoloc.lng,
    short_excerpt: hit.short_excerpt,
    image: hit.images?.[0],
    type: hit.type,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Banner */}
      {district.banner_image && (
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${district.banner_image.filename})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white">{district.name}</h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* District Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg text-gray-700 mb-4">{district.short_excerpt}</p>
          {district.tags && district.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {district.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Map and Places */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Places in {district.name}</h2>
            {places.length > 0 ? (
              <Map
                places={places}
                center={[district.location.lat, district.location.lng]}
                zoom={14}
                height="600px"
                enableClustering={true}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No places found in this district yet.</p>
              </div>
            )}
          </div>

          {/* Places List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {places.length} Place{places.length !== 1 ? 's' : ''}
            </h2>
            <div className="space-y-4">
              {places.map((place) => (
                <Link
                  key={place.id}
                  href={`/place/${place.slug}`}
                  className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg mb-1">{place.title}</h3>
                  {place.type && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {place.type}
                    </span>
                  )}
                  {place.short_excerpt && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {place.short_excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
