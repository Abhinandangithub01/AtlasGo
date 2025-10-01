'use client';

import { useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch';
import { searchClient, PLACES_INDEX_NAME } from '@/lib/algolia-client';
import SearchBox from '@/components/SearchBox';
import SearchHits from '@/components/SearchHits';
import SearchFilters from '@/components/SearchFilters';
import SearchStats from '@/components/SearchStats';
import GeoSearchButton from '@/components/GeoSearchButton';
import Pagination from '@/components/Pagination';
import PreferencesModal from '@/components/PreferencesModal';
import SortBy from '@/components/SortBy';
import Link from 'next/link';
import { getUserPreferences, getOptionalFilters } from '@/lib/personalization';

export default function SearchPage() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState(getUserPreferences());

  const handlePreferencesSaved = () => {
    setPreferences(getUserPreferences());
  };

  const optionalFilters = getOptionalFilters(preferences);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AtlasGo
              </span>
            </Link>
            <div className="flex gap-3">
              <Link
                href="/blog"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Blog
              </Link>
              <button
                onClick={() => setIsPreferencesOpen(true)}
                className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferences
                {preferences && preferences.interests.length > 0 && (
                  <span className="bg-purple-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {preferences.interests.length}
                  </span>
                )}
              </button>
              <Link
                href="/itinerary"
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Plan Trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onSave={handlePreferencesSaved}
      />

      <InstantSearch searchClient={searchClient} indexName={PLACES_INDEX_NAME}>
        <Configure 
          hitsPerPage={12} 
          optionalFilters={optionalFilters}
          attributesToRetrieve={['*']}
          getRankingInfo={true}
        />
        
        <div className="container mx-auto px-4 py-12">
          {/* Search Header */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Discover Amazing Places
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Content managed by <span className="font-semibold text-purple-600">Storyblok</span> CMS, powered by <span className="font-semibold text-blue-600">Algolia</span>'s lightning-fast search
            </p>
            
            {/* Search Bar */}
            <div className="max-w-6xl mx-auto mb-6">
              <SearchBox />
            </div>
            
            {/* Filters */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SearchFilters />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {/* Results */}
            <main>
              {/* Trip Planning Tip */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">💡 Trip Planning Tip</h3>
                  <p className="text-sm text-gray-900">
                    Filter by <strong className="text-gray-900">Country</strong> and <strong className="text-gray-900">City</strong> to organize your destinations. 
                    Use <strong className="text-gray-900">Preferences</strong> to personalize results, then click <strong className="text-gray-900">Plan Trip</strong> to generate an AI-powered itinerary!
                  </p>
                </div>
              </div>

              {/* Search Results */}
              <SearchHits />
              
              {/* Pagination */}
              <div className="mt-8">
                <Pagination />
              </div>
            </main>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
