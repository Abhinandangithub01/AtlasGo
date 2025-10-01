'use client';

import { usePagination } from 'react-instantsearch';

export default function Pagination() {
  const { currentRefinement, nbPages, refine, canRefine } = usePagination();

  if (!canRefine || nbPages <= 1) return null;

  const pages = Array.from({ length: Math.min(nbPages, 10) }, (_, i) => i);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => refine(currentRefinement - 1)}
        disabled={currentRefinement === 0}
        className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => refine(page)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentRefinement === page
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-900'
          }`}
          aria-label={`Page ${page + 1}`}
          aria-current={currentRefinement === page ? 'page' : undefined}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => refine(currentRefinement + 1)}
        disabled={currentRefinement >= nbPages - 1}
        className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
