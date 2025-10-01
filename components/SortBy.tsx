'use client';

import { useState, useRef, useEffect } from 'react';
import { useSortBy } from 'react-instantsearch';

export default function SortBy() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: 'Most Relevant', value: 'places' },
      { label: 'Highest Rated', value: 'places_rating_desc' },
      { label: 'Most Popular', value: 'places_popularity_desc' },
      { label: 'Nearest First', value: 'places' },
    ],
  });

  // Custom icons for each sort option
  const sortIcons: Record<string, string> = {
    'places': '🎯',
    'places_rating_desc': '⭐',
    'places_popularity_desc': '🔥',
  };

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

  const currentOption = options.find(opt => opt.value === currentRefinement) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all flex items-center justify-between bg-white"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="font-semibold text-gray-900 text-sm">Sort By</span>
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
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => {
                    refine(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition ${
                    currentRefinement === option.value
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <span className="text-lg">{sortIcons[option.value] || '🎯'}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                  {currentRefinement === option.value && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
