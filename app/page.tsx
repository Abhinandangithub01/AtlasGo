'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN}&version=published&per_page=100`);
        const result = await response.json();
        
        console.log('Fetched stories:', result.stories?.length);
        
        const testimonialItems = result.stories?.filter((s: any) => s.content.component === 'testimonial') || [];
        const collectionItems = result.stories?.filter((s: any) => s.content.component === 'featured_collection' && s.content.featured) || [];
        
        console.log('Testimonials found:', testimonialItems.length);
        console.log('Collections found:', collectionItems.length);
        
        setTestimonials(testimonialItems.slice(0, 3));
        setCollections(collectionItems.slice(0, 4));
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Storyblok & Algolia Hackathon 2025
            </span>
          </div>
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 tracking-tight">
            AtlasGo
          </h1>
          <p className="text-3xl text-gray-700 mb-4 font-normal">
            Explore the world, <span className="font-semibold text-blue-600">your way</span>
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your intelligent travel companion with lightning-fast search, smart recommendations, and AI-powered trip planning across the globe
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/search"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Places
            </Link>
            <Link
              href="/itinerary"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Plan My Trip
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Lightning-Fast Search</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Powered by <span className="font-semibold text-blue-600">Algolia</span>'s blazing-fast search engine with geo-enabled queries, typo-tolerance, and instant results
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Geo-Search</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Faceted Filters</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">Typo-Tolerant</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Content Management</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Built on <span className="font-semibold text-purple-600">Storyblok</span>'s headless CMS with structured content, real-time webhooks, and seamless editing experience
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Headless CMS</span>
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Real-time Sync</span>
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Visual Editor</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">AI-Powered Itineraries</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Generate personalized day-by-day travel plans using <span className="font-semibold text-green-600">GROQ AI</span> with real places from your search results
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Llama 3.3</span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Personalized</span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Context-Aware</span>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Built with Industry-Leading Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Algolia Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Powered by Algolia</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The world's most advanced search and discovery platform
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Sub-50ms search:</strong> Lightning-fast results across millions of records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Geo-search:</strong> Find places near you with precise location-based ranking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Smart filtering:</strong> Faceted search with type, district, price, and tags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Typo-tolerance:</strong> Get results even with spelling mistakes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Custom ranking:</strong> Boost popular and highly-rated places</span>
                </li>
              </ul>
            </div>

            {/* Storyblok Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
                  S
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Powered by Storyblok</h3>
              </div>
              <p className="text-gray-700 mb-4">
                The headless CMS that empowers developers and content teams
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>Structured content:</strong> Rich content models for places, districts, and guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>Real-time webhooks:</strong> Auto-sync content changes to Algolia instantly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>Visual editor:</strong> Edit content with live preview and intuitive UI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>API-first:</strong> Flexible content delivery via REST and GraphQL APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>Multi-language:</strong> Built-in support for internationalization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-bold text-lg mb-2">Create Content</h4>
              <p className="text-gray-600 text-sm">Manage places and districts in Storyblok's visual editor</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-bold text-lg mb-2">Auto-Sync</h4>
              <p className="text-gray-600 text-sm">Webhooks automatically index content to Algolia in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-bold text-lg mb-2">Search & Discover</h4>
              <p className="text-gray-600 text-sm">Users find places instantly with geo-search and smart filters</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-bold text-lg mb-2">Plan with AI</h4>
              <p className="text-gray-600 text-sm">Generate personalized itineraries using AI and real data</p>
            </div>
          </div>
        </div>

        {/* Featured Collections */}
        {collections.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Curated Collections</h2>
            <p className="text-center text-gray-600 mb-10 text-lg">Discover handpicked destinations for every traveler</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href="/search"
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-300"
                >
                  <div className="text-5xl mb-4">{collection.content.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{collection.content.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{collection.content.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    Explore Collection
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">What Travelers Say</h2>
            <p className="text-center text-gray-600 mb-10 text-lg">Real experiences from our community</p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.content.avatar}
                      alt={testimonial.content.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.content.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.content.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.content.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.content.text}</p>
                  <p className="text-sm text-blue-600 font-semibold">{testimonial.content.trip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl shadow-2xl text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the power of Algolia Search + Storyblok CMS + AI
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
            >
              Start Searching
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/itinerary"
              className="bg-blue-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center gap-2"
            >
              Generate Itinerary
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-600">
          <p className="text-sm">
            Built for the <strong>Storyblok & Algolia Code & Coffee Hackathon 2025</strong>
          </p>
          <p className="text-xs mt-2">
            Combining the best of headless CMS, search technology, and AI
          </p>
        </div>
      </div>
    </main>
  );
}
