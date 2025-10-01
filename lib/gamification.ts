/**
 * Gamification System
 * Handles achievements, badges, points, and leaderboards
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'explorer' | 'collector' | 'social' | 'expert';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'visit_places' | 'read_blogs' | 'create_itinerary' | 'share_content' | 'complete_profile';
    count?: number;
    places?: string[];
    tags?: string[];
  };
  reward?: {
    type: 'discount' | 'badge' | 'feature_unlock';
    value: string;
  };
}

export interface UserProgress {
  userId: string;
  level: number;
  totalPoints: number;
  achievements: string[];
  visitedPlaces: string[];
  createdItineraries: number;
  sharedContent: number;
  readBlogs: string[];
  streak: number;
  lastActive: string;
}

// Predefined achievements
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    title: 'First Steps',
    description: 'Visit your first place',
    icon: '🎯',
    points: 10,
    category: 'explorer',
    rarity: 'common',
    requirements: {
      type: 'visit_places',
      count: 1,
    },
  },
  {
    id: 'unesco_explorer',
    title: 'UNESCO Explorer',
    description: 'Visit 5 UNESCO World Heritage Sites',
    icon: '🏛️',
    points: 100,
    category: 'explorer',
    rarity: 'epic',
    requirements: {
      type: 'visit_places',
      count: 5,
      tags: ['UNESCO'],
    },
  },
  {
    id: 'globe_trotter',
    title: 'Globe Trotter',
    description: 'Visit places in 3 different countries',
    icon: '🌍',
    points: 150,
    category: 'explorer',
    rarity: 'epic',
    requirements: {
      type: 'visit_places',
      count: 3,
    },
  },
  {
    id: 'museum_lover',
    title: 'Museum Lover',
    description: 'Visit 10 museums',
    icon: '🎨',
    points: 75,
    category: 'collector',
    rarity: 'rare',
    requirements: {
      type: 'visit_places',
      count: 10,
      tags: ['museum'],
    },
  },
  {
    id: 'nature_enthusiast',
    title: 'Nature Enthusiast',
    description: 'Visit 5 natural wonders',
    icon: '🏞️',
    points: 80,
    category: 'collector',
    rarity: 'rare',
    requirements: {
      type: 'visit_places',
      count: 5,
      tags: ['nature', 'park'],
    },
  },
  {
    id: 'bookworm',
    title: 'Travel Bookworm',
    description: 'Read 10 travel stories',
    icon: '📚',
    points: 50,
    category: 'expert',
    rarity: 'rare',
    requirements: {
      type: 'read_blogs',
      count: 10,
    },
  },
  {
    id: 'planner',
    title: 'Master Planner',
    description: 'Create 5 itineraries',
    icon: '📝',
    points: 100,
    category: 'expert',
    rarity: 'epic',
    requirements: {
      type: 'create_itinerary',
      count: 5,
    },
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Share 10 pieces of content',
    icon: '🦋',
    points: 60,
    category: 'social',
    rarity: 'rare',
    requirements: {
      type: 'share_content',
      count: 10,
    },
  },
  {
    id: 'seven_wonders',
    title: 'Seven Wonders',
    description: 'Visit all 7 wonders in the app',
    icon: '⭐',
    points: 500,
    category: 'explorer',
    rarity: 'legendary',
    requirements: {
      type: 'visit_places',
      places: ['taj-mahal', 'great-wall-china', 'colosseum', 'christ-redeemer', 'machu-picchu', 'petra', 'chichen-itza'],
    },
  },
  {
    id: 'week_streak',
    title: '7-Day Streak',
    description: 'Use the app for 7 consecutive days',
    icon: '🔥',
    points: 70,
    category: 'expert',
    rarity: 'rare',
    requirements: {
      type: 'visit_places',
      count: 1,
    },
  },
];

// Get user progress from localStorage
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  const stored = localStorage.getItem('user_progress');
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultProgress();
}

function getDefaultProgress(): UserProgress {
  return {
    userId: 'user_' + Date.now(),
    level: 1,
    totalPoints: 0,
    achievements: [],
    visitedPlaces: [],
    createdItineraries: 0,
    sharedContent: 0,
    readBlogs: [],
    streak: 0,
    lastActive: new Date().toISOString(),
  };
}

// Save user progress
export function saveUserProgress(progress: UserProgress) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_progress', JSON.stringify(progress));
  }
}

// Track place visit
export function trackPlaceVisit(placeSlug: string) {
  const progress = getUserProgress();
  
  if (!progress.visitedPlaces.includes(placeSlug)) {
    progress.visitedPlaces.push(placeSlug);
    checkAchievements(progress);
    saveUserProgress(progress);
  }
  
  return progress;
}

// Track blog read
export function trackBlogRead(blogSlug: string) {
  const progress = getUserProgress();
  
  if (!progress.readBlogs.includes(blogSlug)) {
    progress.readBlogs.push(blogSlug);
    checkAchievements(progress);
    saveUserProgress(progress);
  }
  
  return progress;
}

// Track itinerary creation
export function trackItineraryCreation() {
  const progress = getUserProgress();
  progress.createdItineraries++;
  checkAchievements(progress);
  saveUserProgress(progress);
  return progress;
}

// Track content share
export function trackContentShare() {
  const progress = getUserProgress();
  progress.sharedContent++;
  checkAchievements(progress);
  saveUserProgress(progress);
  return progress;
}

// Check and unlock achievements
function checkAchievements(progress: UserProgress) {
  const newAchievements: string[] = [];

  ACHIEVEMENTS.forEach((achievement) => {
    // Skip if already unlocked
    if (progress.achievements.includes(achievement.id)) {
      return;
    }

    let unlocked = false;

    switch (achievement.requirements.type) {
      case 'visit_places':
        if (achievement.requirements.places) {
          // Check specific places
          unlocked = achievement.requirements.places.every((place) =>
            progress.visitedPlaces.includes(place)
          );
        } else if (achievement.requirements.count) {
          unlocked = progress.visitedPlaces.length >= achievement.requirements.count;
        }
        break;

      case 'read_blogs':
        if (achievement.requirements.count) {
          unlocked = progress.readBlogs.length >= achievement.requirements.count;
        }
        break;

      case 'create_itinerary':
        if (achievement.requirements.count) {
          unlocked = progress.createdItineraries >= achievement.requirements.count;
        }
        break;

      case 'share_content':
        if (achievement.requirements.count) {
          unlocked = progress.sharedContent >= achievement.requirements.count;
        }
        break;
    }

    if (unlocked) {
      progress.achievements.push(achievement.id);
      progress.totalPoints += achievement.points;
      newAchievements.push(achievement.id);
      
      // Calculate level (100 points per level)
      progress.level = Math.floor(progress.totalPoints / 100) + 1;
    }
  });

  return newAchievements;
}

// Get unlocked achievements
export function getUnlockedAchievements(): Achievement[] {
  const progress = getUserProgress();
  return ACHIEVEMENTS.filter((a) => progress.achievements.includes(a.id));
}

// Get locked achievements
export function getLockedAchievements(): Achievement[] {
  const progress = getUserProgress();
  return ACHIEVEMENTS.filter((a) => !progress.achievements.includes(a.id));
}

// Get achievement progress
export function getAchievementProgress(achievementId: string): number {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievement) return 0;

  const progress = getUserProgress();

  switch (achievement.requirements.type) {
    case 'visit_places':
      if (achievement.requirements.count) {
        return Math.min(100, (progress.visitedPlaces.length / achievement.requirements.count) * 100);
      }
      break;
    case 'read_blogs':
      if (achievement.requirements.count) {
        return Math.min(100, (progress.readBlogs.length / achievement.requirements.count) * 100);
      }
      break;
    case 'create_itinerary':
      if (achievement.requirements.count) {
        return Math.min(100, (progress.createdItineraries / achievement.requirements.count) * 100);
      }
      break;
    case 'share_content':
      if (achievement.requirements.count) {
        return Math.min(100, (progress.sharedContent / achievement.requirements.count) * 100);
      }
      break;
  }

  return 0;
}

// Get rarity color
export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-400';
    case 'rare':
      return 'text-blue-400';
    case 'epic':
      return 'text-purple-400';
    case 'legendary':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

// Get rarity background
export function getRarityBg(rarity: string): string {
  switch (rarity) {
    case 'common':
      return 'from-gray-600 to-gray-700';
    case 'rare':
      return 'from-blue-600 to-blue-700';
    case 'epic':
      return 'from-purple-600 to-purple-700';
    case 'legendary':
      return 'from-yellow-600 to-orange-600';
    default:
      return 'from-gray-600 to-gray-700';
  }
}
