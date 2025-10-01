'use client';

import { useState, useEffect } from 'react';
import { UserPreferences } from '@/types';

const AVAILABLE_INTERESTS = [
  { value: 'food', label: 'Food & Dining', icon: '🍽️' },
  { value: 'culture', label: 'Culture & Arts', icon: '🎭' },
  { value: 'nature', label: 'Nature & Parks', icon: '🌳' },
  { value: 'nightlife', label: 'Nightlife', icon: '🎉' },
  { value: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'history', label: 'History', icon: '🏛️' },
  { value: 'art', label: 'Art & Museums', icon: '🎨' },
  { value: 'music', label: 'Music & Events', icon: '🎵' },
  { value: 'sports', label: 'Sports & Fitness', icon: '⚽' },
  { value: 'outdoor', label: 'Outdoor Activities', icon: '🏔️' },
  { value: 'indoor', label: 'Indoor Activities', icon: '🏢' },
];

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (preferences: UserPreferences) => void;
}

export default function PreferencesModal({ isOpen, onClose, onSave }: PreferencesModalProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'fast'>('moderate');
  const [priceRange, setPriceRange] = useState<string[]>([]);

  useEffect(() => {
    // Load preferences from localStorage
    const stored = localStorage.getItem('user_preferences');
    if (stored) {
      try {
        const prefs: UserPreferences = JSON.parse(stored);
        setSelectedInterests(prefs.interests || []);
        setPace(prefs.pace || 'moderate');
        setPriceRange(prefs.priceRange || []);
      } catch (e) {
        console.error('Error loading preferences:', e);
      }
    }
  }, [isOpen]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const togglePriceRange = (price: string) => {
    setPriceRange((prev) =>
      prev.includes(price)
        ? prev.filter((p) => p !== price)
        : [...prev, price]
    );
  };

  const handleSave = () => {
    const preferences: UserPreferences = {
      interests: selectedInterests,
      pace,
      priceRange: priceRange.length > 0 ? priceRange : undefined,
    };

    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    
    if (onSave) {
      onSave(preferences);
    }
    
    onClose();
  };

  const handleClear = () => {
    setSelectedInterests([]);
    setPace('moderate');
    setPriceRange([]);
    localStorage.removeItem('user_preferences');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Interests */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              What interests you? <span className="text-sm text-gray-500">(Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_INTERESTS.map((interest) => (
                <button
                  key={interest.value}
                  onClick={() => toggleInterest(interest.value)}
                  className={`p-3 rounded-lg border-2 transition text-left ${
                    selectedInterests.includes(interest.value)
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{interest.icon}</div>
                  <div className="text-sm font-semibold">{interest.label}</div>
                </button>
              ))}
            </div>
            {selectedInterests.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Travel Pace */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Travel Pace</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'relaxed', label: 'Relaxed', desc: 'Take it easy' },
                { value: 'moderate', label: 'Moderate', desc: 'Balanced' },
                { value: 'fast', label: 'Fast-paced', desc: 'See it all' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPace(option.value as any)}
                  className={`p-4 rounded-lg border-2 transition ${
                    pace === option.value
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Price Range <span className="text-sm text-gray-500">(Optional)</span>
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {['free', '$', '$$', '$$$', '$$$$'].map((price) => (
                <button
                  key={price}
                  onClick={() => togglePriceRange(price)}
                  className={`p-3 rounded-lg border-2 transition font-semibold ${
                    priceRange.includes(price)
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {price === 'free' ? 'Free' : price}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 How it works:</strong> Your preferences will boost matching places in search results
              and help generate personalized itineraries.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-gray-600 hover:text-gray-800 font-semibold"
          >
            Clear All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
