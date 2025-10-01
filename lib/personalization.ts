import { UserPreferences } from '@/types';

/**
 * Get user preferences from localStorage
 */
export function getUserPreferences(): UserPreferences | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('user_preferences');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing user preferences:', e);
    return null;
  }
}

/**
 * Save user preferences to localStorage
 */
export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user_preferences', JSON.stringify(preferences));
}

/**
 * Clear user preferences
 */
export function clearUserPreferences(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user_preferences');
}

/**
 * Build Algolia filters based on user preferences
 */
export function buildPersonalizedFilters(preferences: UserPreferences | null): string {
  if (!preferences) return '';
  
  const filters: string[] = [];
  
  // Price range filter
  if (preferences.priceRange && preferences.priceRange.length > 0) {
    const priceFilters = preferences.priceRange.map(p => `price_range:"${p}"`).join(' OR ');
    filters.push(`(${priceFilters})`);
  }
  
  return filters.join(' AND ');
}

/**
 * Calculate boost score for a place based on user interests
 * Returns a score between 0 and 1
 */
export function calculateInterestBoost(
  placeTags: string[],
  userInterests: string[]
): number {
  if (!userInterests || userInterests.length === 0) return 0;
  if (!placeTags || placeTags.length === 0) return 0;
  
  const matchingTags = placeTags.filter(tag => 
    userInterests.includes(tag.toLowerCase())
  );
  
  // Return ratio of matching tags
  return matchingTags.length / userInterests.length;
}

/**
 * Re-rank search results based on user preferences
 * This is a client-side boost on top of Algolia's ranking
 */
export function reRankByPreferences<T extends { tags?: string[]; popularity_score?: number }>(
  results: T[],
  preferences: UserPreferences | null
): T[] {
  if (!preferences || !preferences.interests || preferences.interests.length === 0) {
    return results;
  }
  
  return [...results].sort((a, b) => {
    const boostA = calculateInterestBoost(a.tags || [], preferences.interests);
    const boostB = calculateInterestBoost(b.tags || [], preferences.interests);
    
    // If boosts are different, sort by boost
    if (boostA !== boostB) {
      return boostB - boostA;
    }
    
    // Otherwise, sort by popularity
    const popA = a.popularity_score || 0;
    const popB = b.popularity_score || 0;
    return popB - popA;
  });
}

/**
 * Get optional filters for Algolia based on preferences
 * These boost results but don't exclude non-matching items
 */
export function getOptionalFilters(preferences: UserPreferences | null): string[] {
  if (!preferences || !preferences.interests || preferences.interests.length === 0) {
    return [];
  }
  
  // Create optional filters for each interest tag
  // Format: "tags:food<score=2>" means boost items with "food" tag by 2x
  return preferences.interests.map(interest => `tags:${interest}<score=2>`);
}
