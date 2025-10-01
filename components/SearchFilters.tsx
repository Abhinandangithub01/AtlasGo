'use client';

import { useState, useRef, useEffect } from 'react';
import { useRefinementList, useClearRefinements, useStats } from 'react-instantsearch';
import SortBy from './SortBy';

function RefinementList({ 
  attribute, 
  title, 
  icon,
  limit = 10,
  showSearch = false,
  prominent = false 
}: { 
  attribute: string; 
  title: string;
  icon: React.ReactNode;
  limit?: number;
  showSearch?: boolean;
  prominent?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { items, refine, searchForItems } = useRefinementList({ 
    attribute, 
    limit,
    showMore: true,
    showMoreLimit: 50,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (items.length === 0) return null;

  const activeCount = items.filter(item => item.isRefined).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all flex items-center justify-between ${
          prominent 
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 hover:border-blue-400' 
            : 'bg-white border-gray-300 hover:border-gray-400'
        } ${activeCount > 0 ? 'ring-2 ring-blue-400' : ''}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-600">{icon}</span>
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
          {activeCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </div>
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border-2 border-gray-200 max-h-80 overflow-hidden">
          {showSearch && (
            <div className="p-3 border-b border-gray-200">
              <input
                type="search"
                placeholder={`Search ${title.toLowerCase()}...`}
                onChange={(e) => searchForItems(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          )}
          <ul className="max-h-64 overflow-y-auto p-2">
            {items.map((item) => (
              <li key={item.value}>
                <label className="flex items-center cursor-pointer p-2 rounded-lg transition hover:bg-blue-50">
                  <input
                    type="checkbox"
                    checked={item.isRefined}
                    onChange={() => refine(item.value)}
                    className="mr-3 h-4 w-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SearchFilters() {
  const { refine: clearRefinements, canRefine } = useClearRefinements();
  const { nbHits, processingTimeMS } = useStats();

  return (
    <div>
      {/* Header with Stats and Clear */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <span className="text-sm text-gray-600">
            <strong className="text-gray-900">{nbHits}</strong> results found in <strong className="text-gray-900">{processingTimeMS}ms</strong>
          </span>
        </div>
        {canRefine && (
          <button
            onClick={() => clearRefinements()}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Filters Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Country Filter */}
        <RefinementList 
          attribute="country" 
          title="Country" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          prominent={true}
          showSearch={true}
          limit={20}
        />
        
        {/* State/District Filter */}
        <RefinementList 
          attribute="district" 
          title="State/District" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          prominent={true}
          showSearch={true}
          limit={20}
        />
        
        {/* City Filter */}
        <RefinementList 
          attribute="city" 
          title="City" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          showSearch={true}
          limit={20}
        />
        
        {/* Type Filter */}
        <RefinementList 
          attribute="type" 
          title="Type" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          }
          limit={15}
        />
        
        {/* Price Range Filter */}
        <RefinementList 
          attribute="price_range" 
          title="Price" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          limit={10}
        />
        
        {/* Tags Filter */}
        <RefinementList 
          attribute="tags" 
          title="Interests" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
          limit={15}
        />
        
        {/* Sort By */}
        <div>
          <SortBy />
        </div>
      </div>
    </div>
  );
}
