'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Itinerary, ItineraryRequest } from '@/types';
import { getUserPreferences } from '@/lib/personalization';

export default function ItineraryPage() {
  const [formData, setFormData] = useState<Partial<ItineraryRequest>>({
    city: 'Lisbon',
    districts: [],
    dates: {
      start: '',
      end: '',
    },
    interests: getUserPreferences()?.interests || [],
    pace: getUserPreferences()?.pace || 'moderate',
  });

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to generate itinerary');
      }

      setItinerary(data.itinerary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleDistrict = (district: string) => {
    setFormData(prev => ({
      ...prev,
      districts: prev.districts?.includes(district)
        ? prev.districts.filter(d => d !== district)
        : [...(prev.districts || []), district],
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Plan Your Perfect Trip</h1>
        <p className="text-gray-600 mb-8">
          AI-powered itinerary generator using real places from our database
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Dates */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.dates?.start}
                  onChange={(e) => setFormData({
                    ...formData,
                    dates: { ...formData.dates!, start: e.target.value },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.dates?.end}
                  onChange={(e) => setFormData({
                    ...formData,
                    dates: { ...formData.dates!, end: e.target.value },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Districts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Districts (Optional)
                </label>
                <div className="space-y-2">
                  {['Alfama', 'Baixa', 'Chiado', 'Bairro Alto', 'Belém'].map((district) => (
                    <label key={district} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.districts?.includes(district)}
                        onChange={() => toggleDistrict(district)}
                        className="mr-2"
                      />
                      <span className="text-sm">{district}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interests
                </label>
                <div className="space-y-2">
                  {['food', 'culture', 'nature', 'nightlife', 'history', 'art'].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests?.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pace */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Travel Pace
                </label>
                <select
                  value={formData.pace}
                  onChange={(e) => setFormData({ ...formData, pace: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="relaxed">Relaxed</option>
                  <option value="moderate">Moderate</option>
                  <option value="fast">Fast-paced</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : '✨ Generate Itinerary'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="animate-spin text-6xl mb-4">⟳</div>
                <p className="text-xl text-gray-600">Creating your perfect itinerary...</p>
                <p className="text-sm text-gray-500 mt-2">This may take 10-20 seconds</p>
              </div>
            )}

            {itinerary && (
              <div className="space-y-6">
                {/* Summary */}
                {itinerary.summary && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">Your Itinerary</h2>
                    <p className="text-blue-800">{itinerary.summary}</p>
                  </div>
                )}

                {/* Days */}
                {itinerary.days.map((day) => (
                  <div key={day.day} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Day {day.day}
                      {day.date && <span className="text-lg text-gray-600 ml-2">({day.date})</span>}
                    </h3>

                    {day.blocks.map((block) => (
                      <div key={block.period} className="mb-6 last:mb-0">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                          {block.period === 'Morning' && '🌅'}
                          {block.period === 'Afternoon' && '☀️'}
                          {block.period === 'Evening' && '🌆'}
                          <span className="ml-2">{block.period}</span>
                        </h4>

                        {block.visits.length === 0 ? (
                          <p className="text-gray-500 text-sm ml-8">Free time / Rest</p>
                        ) : (
                          <div className="space-y-3 ml-8">
                            {block.visits.map((visit, idx) => (
                              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                                <Link
                                  href={`/place/${visit.slug}`}
                                  className="text-lg font-semibold text-blue-600 hover:underline"
                                >
                                  {visit.name}
                                </Link>
                                <p className="text-sm text-gray-600 mt-1">{visit.note}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  ⏱️ {visit.duration_min} minutes
                                  {visit.start_time && ` • 🕐 ${visit.start_time}`}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">What's next?</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      🖨️ Print Itinerary
                    </button>
                    <button
                      onClick={() => {
                        const text = JSON.stringify(itinerary, null, 2);
                        navigator.clipboard.writeText(text);
                        alert('Copied to clipboard!');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      📋 Copy JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && !itinerary && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to plan your trip?
                </h3>
                <p className="text-gray-600">
                  Fill in the form and click "Generate Itinerary" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
