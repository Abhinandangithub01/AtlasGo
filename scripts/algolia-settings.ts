/**
 * Configure Algolia index settings
 * Run with: npm run algolia:settings
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import { getPlacesIndex } from '../lib/algolia';

async function configureSettings() {
  console.log('🔧 Configuring Algolia index settings...\n');

  try {
    const index = getPlacesIndex();

    // Configure index settings
    const settings = {
      // Searchable attributes (ordered by importance)
      searchableAttributes: [
        'title',
        'tags',
        'short_excerpt',
        'description',
        'district',
        'city',
        'country',
      ],

      // Attributes for faceting (filtering)
      attributesForFaceting: [
        'searchable(country)',
        'searchable(city)',
        'filterOnly(type)',
        'filterOnly(district)',
        'filterOnly(price_range)',
        'searchable(tags)',
      ],

      // Custom ranking (tie-breaker after textual relevance)
      customRanking: [
        'desc(popularity_score)',
        'desc(rating)',
      ],

      // Ranking formula
      ranking: [
        'typo',
        'geo',
        'words',
        'filters',
        'proximity',
        'attribute',
        'exact',
        'custom',
      ],

      // Attributes to retrieve
      attributesToRetrieve: [
        'objectID',
        'title',
        'slug',
        'type',
        'district',
        'city',
        'country',
        'short_excerpt',
        'tags',
        'price_range',
        'rating',
        'popularity_score',
        'images',
        'estimated_visit_time',
        '_geoloc',
      ],

      // Highlighting
      attributesToHighlight: [
        'title',
        'short_excerpt',
        'tags',
      ],

      // Snippeting
      attributesToSnippet: [
        'description:30',
        'short_excerpt:50',
      ],

      // Pagination
      hitsPerPage: 20,
      maxValuesPerFacet: 100,

      // Typo tolerance
      typoTolerance: true,
      minWordSizefor1Typo: 4,
      minWordSizefor2Typos: 8,

      // Geo search settings
      // Algolia automatically handles _geoloc for geo search
      // No additional configuration needed

      // Advanced settings
      removeWordsIfNoResults: 'lastWords' as const,
      disableTypoToleranceOnAttributes: [],
      separatorsToIndex: '',
      
      // Query rules (can be set via dashboard)
      // Synonyms (set below)
    };

    console.log('📝 Applying settings...');
    await index.setSettings(settings);
    console.log('✅ Settings applied successfully\n');

    // Configure synonyms
    console.log('🔤 Configuring synonyms...');
    const synonyms = [
      {
        objectID: 'museum-synonyms',
        type: 'synonym' as const,
        synonyms: ['museum', 'museu', 'museo', 'gallery'],
      },
      {
        objectID: 'restaurant-synonyms',
        type: 'synonym' as const,
        synonyms: ['restaurant', 'restaurante', 'dining', 'eatery', 'cafe', 'bistro'],
      },
      {
        objectID: 'park-synonyms',
        type: 'synonym' as const,
        synonyms: ['park', 'parque', 'garden', 'jardim', 'green space'],
      },
      {
        objectID: 'nightlife-synonyms',
        type: 'synonym' as const,
        synonyms: ['nightlife', 'bar', 'club', 'disco', 'pub', 'lounge'],
      },
      {
        objectID: 'shopping-synonyms',
        type: 'synonym' as const,
        synonyms: ['shopping', 'store', 'shop', 'loja', 'market', 'mall'],
      },
      {
        objectID: 'castle-synonyms',
        type: 'synonym' as const,
        synonyms: ['castle', 'castelo', 'fort', 'fortress', 'palace', 'palacio'],
      },
      {
        objectID: 'beach-synonyms',
        type: 'synonym' as const,
        synonyms: ['beach', 'praia', 'shore', 'coast', 'waterfront'],
      },
      {
        objectID: 'church-synonyms',
        type: 'synonym' as const,
        synonyms: ['church', 'igreja', 'cathedral', 'chapel', 'basilica'],
      },
    ];

    await index.saveSynonyms(synonyms, {
      replaceExistingSynonyms: true,
    });
    console.log(`✅ Configured ${synonyms.length} synonym groups\n`);

    // Optional: Configure query rules
    console.log('📋 Configuring query rules...');
    const rules = [
      {
        objectID: 'boost-popular-places',
        description: 'Boost popular places in general searches',
        conditions: [
          {
            pattern: '{facet:type}',
            anchoring: 'contains' as const,
          },
        ],
        consequence: {
          params: {
            optionalFilters: ['popularity_score>70'],
          },
        },
      },
    ];

    await index.saveRules(rules, {
      replaceExistingRules: false,
    });
    console.log(`✅ Configured ${rules.length} query rule(s)\n`);

    console.log('🎉 Algolia configuration complete!');
    console.log('\n📊 Index settings summary:');
    console.log('   - Searchable attributes: title, tags, short_excerpt, description');
    console.log('   - Facets: type, district, city, price_range, tags');
    console.log('   - Custom ranking: popularity_score (desc), rating (desc)');
    console.log('   - Geo search: enabled via _geoloc');
    console.log(`   - Synonyms: ${synonyms.length} groups`);
    console.log(`   - Query rules: ${rules.length} rule(s)`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Configuration failed:', error);
    process.exit(1);
  }
}

configureSettings();
