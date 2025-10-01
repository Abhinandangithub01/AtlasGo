/**
 * Quick script to configure facets only
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import algoliasearch from 'algoliasearch';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function configureFacets() {
  console.log('🔧 Configuring Algolia facets...\n');

  try {
    const algolia = algoliasearch(
      process.env.ALGOLIA_APP_ID || '',
      process.env.ALGOLIA_ADMIN_KEY || ''
    );
    
    const index = algolia.initIndex('places');
    
    // Just set the faceting attributes
    await index.setSettings({
      attributesForFaceting: [
        'searchable(country)',
        'searchable(city)',
        'searchable(district)',
        'filterOnly(type)',
        'filterOnly(price_range)',
        'searchable(tags)',
      ],
    });

    console.log('✅ Facets configured successfully!');
    console.log('   - country (searchable)');
    console.log('   - city (searchable)');
    console.log('   - district (searchable)');
    console.log('   - type (filter only)');
    console.log('   - price_range (filter only)');
    console.log('   - tags (searchable)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

configureFacets();
