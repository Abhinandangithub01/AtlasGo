'use client';

import { useStats } from 'react-instantsearch';

export default function SearchStats() {
  const { nbHits, processingTimeMS } = useStats();

  return (
    <div className="text-gray-600 text-sm mb-4">
      <strong>{nbHits.toLocaleString()}</strong> results found in{' '}
      <strong>{processingTimeMS}ms</strong>
    </div>
  );
}
