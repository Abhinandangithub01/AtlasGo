'use client';

import { useRefinementList } from 'react-instantsearch';

function RefinementList({ attribute, title }: { attribute: string; title: string }) {
  const { items, refine } = useRefinementList({ attribute, limit: 10 });

  if (items.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.value}>
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="mr-3 h-4 w-4 text-blue-600 rounded"
              />
              <span className="flex-1 text-gray-700">{item.label}</span>
              <span className="text-gray-500 text-sm">({item.count})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchFilters() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Filters</h2>
      
      <RefinementList attribute="city" title="City" />
      <RefinementList attribute="type" title="Type" />
      <RefinementList attribute="district" title="District" />
      <RefinementList attribute="price_range" title="Price Range" />
      <RefinementList attribute="tags" title="Tags" />
    </div>
  );
}
