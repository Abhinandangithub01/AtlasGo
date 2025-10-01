'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getUserProgress,
  getUnlockedAchievements,
  getLockedAchievements,
  getAchievementProgress,
  getRarityColor,
  getRarityBg,
  Achievement,
} from '@/lib/gamification';

export default function AchievementsPage() {
  const [progress, setProgress] = useState(getUserProgress());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [lockedAchievements, setLockedAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setProgress(getUserProgress());
    setUnlockedAchievements(getUnlockedAchievements());
    setLockedAchievements(getLockedAchievements());
  }, []);

  const categories = ['all', 'explorer', 'collector', 'social', 'expert'];
  
  const filteredUnlocked = selectedCategory === 'all'
    ? unlockedAchievements
    : unlockedAchievements.filter(a => a.category === selectedCategory);
    
  const filteredLocked = selectedCategory === 'all'
    ? lockedAchievements
    : lockedAchievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <span>🏆</span>
              <span>AtlasGo</span>
            </Link>
            <nav className="flex gap-6 text-white">
              <Link href="/search" className="hover:text-purple-300 transition">Search</Link>
              <Link href="/blog" className="hover:text-purple-300 transition">Blog</Link>
              <Link href="/achievements" className="font-semibold text-purple-300">Achievements</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* User Stats Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{progress.level}</div>
              <div className="text-sm opacity-80">Level</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{progress.totalPoints}</div>
              <div className="text-sm opacity-80">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{unlockedAchievements.length}</div>
              <div className="text-sm opacity-80">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{progress.visitedPlaces.length}</div>
              <div className="text-sm opacity-80">Places Visited</div>
            </div>
          </div>
          
          {/* Progress to Next Level */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {progress.level + 1}</span>
              <span>{progress.totalPoints % 100}/100 points</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${(progress.totalPoints % 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Your Achievements</h1>
          <p className="text-xl text-gray-300">
            Unlock badges by exploring places, reading stories, and planning trips
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-white text-purple-900'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              }`}
            >
              {cat === 'all' ? '🌟 All' : cat}
            </button>
          ))}
        </div>

        {/* Unlocked Achievements */}
        {filteredUnlocked.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>✨</span>
              Unlocked ({filteredUnlocked.length})
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredUnlocked.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gradient-to-br ${getRarityBg(achievement.rarity)} rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-all border-2 border-white border-opacity-20`}
                >
                  <div className="text-6xl mb-4 text-center">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 text-center">{achievement.title}</h3>
                  <p className="text-sm text-white opacity-80 mb-4 text-center">{achievement.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${getRarityColor(achievement.rarity)} uppercase`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-white font-bold">+{achievement.points} pts</span>
                  </div>
                  {achievement.reward && (
                    <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3 text-center">
                      <p className="text-xs text-white font-semibold">🎁 Reward: {achievement.reward.value}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {filteredLocked.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>🔒</span>
              Locked ({filteredLocked.length})
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredLocked.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gray-800 bg-opacity-50 rounded-xl p-6 shadow-xl border-2 border-gray-700 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-80" />
                  <div className="relative">
                    <div className="text-6xl mb-4 text-center opacity-30">{achievement.icon}</div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2 text-center">{achievement.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 text-center">{achievement.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(getAchievementProgress(achievement.id))}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${getAchievementProgress(achievement.id)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-semibold ${getRarityColor(achievement.rarity)} uppercase`}>
                        {achievement.rarity}
                      </span>
                      <span className="text-gray-400 font-bold">+{achievement.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey!</h3>
            <p className="text-gray-300 mb-6">
              Explore places, read stories, and plan trips to unlock achievements and climb the leaderboard.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/search"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Explore Places
              </Link>
              <Link
                href="/blog"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Read Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
