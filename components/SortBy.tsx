'use client';

import { useSortBy } from 'react-instantsearch';

export default function SortBy() {
  const { currentRefinement, options, refine } = useSortBy({
    items: [
      { label: 'Most Relevant', value: 'places' },
      { label: 'Highest Rated', value: 'places_rating_desc' },
      { label: 'Most Popular', value: 'places_popularity_desc' },
    ],
  });

  return (
    <div className="mb-6">
      <label htmlFor="sort-by" className="block text-sm font-semibold text-gray-700 mb-2">
        Sort By
      </label>
      <select
        id="sort-by"
        value={currentRefinement}
        onChange={(e) => refine(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
