import algoliasearch from 'algoliasearch/lite';

// Client-side Algolia client (search-only key)
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
);

export const PLACES_INDEX_NAME = 'places';
