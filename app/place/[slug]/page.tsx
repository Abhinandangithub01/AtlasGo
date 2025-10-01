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
  const [cityGuides, setCityGuides] = useState<any[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlace() {
      const data = await getPlace(params.slug);
      setPlace(data);
      setLoading(false);
      
      // Fetch related city content
      if (data?.city) {
        try {
          const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN}&filter_query[city][in]=${data.city}&version=published`);
          const result = await response.json();
          setCityGuides(result.stories || []);
        } catch (error) {
          console.error('Error fetching city guides:', error);
        }
      }
      
      // Fetch related blog posts
      try {
        const blogResponse = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN}&version=published&filter_query[component][in]=blog_post&per_page=100`);
        const blogResult = await blogResponse.json();
        
        // Filter blogs that have this place in related_places
        const filtered = (blogResult.stories || []).filter((blog: any) => 
          blog.content.related_places?.includes(params.slug)
        );
        setRelatedBlogs(filtered);
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
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
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/search" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-gray-900 font-semibold group">
              <svg className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Search
            </Link>
            <button
              onClick={handleAddToItinerary}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
            >
              {addedToItinerary ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Itinerary
                </>
              )}
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
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About</h2>
              <p className="text-gray-900 text-lg mb-4 leading-relaxed">{place.short_excerpt}</p>
              {place.description && (
                <div className="text-gray-900 prose max-w-none leading-relaxed">
                  {place.description}
                </div>
              )}
              
              {/* Additional Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {place.rating && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-700 mb-1">Rating</div>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-xl mr-1">★</span>
                      <span className="text-2xl font-bold text-gray-900">{place.rating.toFixed(1)}</span>
                      <span className="text-gray-600 ml-1">/5</span>
                    </div>
                  </div>
                )}
                {place.popularity_score && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-700 mb-1">Popularity</div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{place.popularity_score}</span>
                      <span className="text-gray-600 ml-1">/100</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {place.tags && place.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-gray-900 px-4 py-2 rounded-full font-semibold"
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
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Gallery</h2>
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
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Location</h2>
              {place.location && place.location.lat && place.location.lng ? (
                <Map
                  places={mapPlaces}
                  center={[place.location.lat, place.location.lng]}
                  zoom={15}
                  height="400px"
                  enableClustering={false}
                />
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600">📍 Location information not available</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Information</h2>
              <dl className="space-y-4">
                {place.district && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">District</dt>
                    <dd className="font-semibold text-gray-900">
                      <Link
                        href={`/district/${place.district.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:underline"
                      >
                        {place.district}
                      </Link>
                    </dd>
                  </div>
                )}
                {place.city && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">City</dt>
                    <dd className="font-semibold text-gray-900">{place.city}</dd>
                  </div>
                )}
                {place.country && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Country</dt>
                    <dd className="font-semibold text-gray-900">🌍 {place.country}</dd>
                  </div>
                )}
                {place.address && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Address</dt>
                    <dd className="font-semibold text-gray-900">{place.address}</dd>
                  </div>
                )}
                {place.opening_hours && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Opening Hours</dt>
                    <dd className="font-semibold text-gray-900 whitespace-pre-line">{place.opening_hours}</dd>
                  </div>
                )}
                {place.contact && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Contact</dt>
                    <dd className="font-semibold text-gray-900">{place.contact}</dd>
                  </div>
                )}
                {place.website && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Website</dt>
                    <dd>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Visit Website →
                      </a>
                    </dd>
                  </div>
                )}
                {place.estimated_visit_time && (
                  <div className="border-b border-gray-100 pb-3">
                    <dt className="text-sm text-gray-700 mb-1">Estimated Visit Time</dt>
                    <dd className="font-semibold text-gray-900">⏱️ {place.estimated_visit_time} minutes</dd>
                  </div>
                )}
                {place.price_range && (
                  <div>
                    <dt className="text-sm text-gray-700 mb-1">Price Range</dt>
                    <dd className="font-semibold text-gray-900">💰 {place.price_range}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Accessibility */}
            {place.accessibility_features && place.accessibility_features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">♿ Accessibility</h2>
                <ul className="space-y-2">
                  {place.accessibility_features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-900">
                      <span className="text-green-600 mr-2 text-lg">✓</span>
                      <span className="font-medium">{feature.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {place.languages && place.languages.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">🗣️ Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {place.languages.map((lang) => (
                    <span key={lang} className="bg-blue-100 text-gray-900 px-3 py-2 rounded font-semibold text-sm">
                      {lang.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tips & Recommendations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border-2 border-green-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">💡 Visitor Tips</h2>
              <ul className="space-y-3 text-sm text-gray-900">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  <span><strong>Best time to visit:</strong> Early morning or late afternoon to avoid crowds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  <span><strong>Photography:</strong> Allowed in most areas, check for restrictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  <span><strong>Nearby:</strong> Explore other attractions in {place.district || place.city}</span>
                </li>
                {place.estimated_visit_time && place.estimated_visit_time > 120 && (
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">•</span>
                    <span><strong>Plan ahead:</strong> This is a longer visit, bring water and snacks</span>
                  </li>
                )}
              </ul>
            </div>
            
            {/* City Resources */}
            {cityGuides.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border-2 border-blue-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">📚 Explore {place.city}</h2>
                <div className="space-y-3">
                  {cityGuides.map((guide) => {
                    const component = guide.content.component;
                    let icon, color, title, description;
                    
                    if (component === 'travel_guide') {
                      icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
                      color = 'blue';
                      title = guide.content.title || 'City Guide';
                      description = guide.content.introduction?.substring(0, 80) + '...' || 'Complete travel guide';
                    } else if (component === 'local_tips') {
                      icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />;
                      color = 'purple';
                      title = guide.content.title || 'Local Tips';
                      description = `${guide.content.tips?.length || 0} insider tips from locals`;
                    } else if (component === 'food_guide') {
                      icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />;
                      color = 'orange';
                      title = guide.content.title || 'Food Guide';
                      description = guide.content.introduction?.substring(0, 80) + '...' || 'Where to eat';
                    } else {
                      return null;
                    }
                    
                    return (
                      <div key={guide.id} className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition cursor-pointer">
                        <div className={`w-10 h-10 bg-${color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {icon}
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                          {component === 'travel_guide' && guide.content.estimated_days && (
                            <p className="text-xs text-gray-500 mt-1">📅 Recommended: {guide.content.estimated_days} days</p>
                          )}
                          {component === 'local_tips' && guide.content.tips && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {guide.content.tips.slice(0, 3).map((tip: any, idx: number) => (
                                <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                  {tip.icon} {tip.category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <svg className={`w-5 h-5 text-${color}-600 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Blog Posts */}
            {relatedBlogs.length > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-md p-6 border-2 border-orange-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Travel Stories About {place.title}
                </h2>
                <div className="space-y-4">
                  {relatedBlogs.map((blog) => (
                    <Link key={blog.id} href={`/blog/${blog.slug}`}>
                      <div className="flex gap-4 p-4 bg-white rounded-lg hover:shadow-lg transition-all cursor-pointer">
                        <img
                          src={blog.content.hero_image}
                          alt={blog.content.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-orange-600 uppercase">{blog.content.category}</span>
                          <h3 className="font-bold text-gray-900 mt-1 mb-1 line-clamp-2">{blog.content.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{blog.content.excerpt}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {blog.content.author}
                            </span>
                            <span>•</span>
                            <span>{blog.content.reading_time} min read</span>
                            <span>•</span>
                            <span>{new Date(blog.content.published_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
                  View all travel stories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
