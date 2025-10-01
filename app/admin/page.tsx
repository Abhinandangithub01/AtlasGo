'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReindex = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/reindex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Reindex failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage Algolia index and monitor reindex operations</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reindex Control */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Manual Reindex</h2>
            <p className="text-gray-600 mb-6">
              Manually trigger a full reindex of all places from Storyblok to Algolia.
              This will update all records in the search index.
            </p>

            <button
              onClick={handleReindex}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Reindexing...' : '🔄 Reindex All Places'}
            </button>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">✓ Success</p>
                <p className="text-green-700 text-sm">{result.message}</p>
                <div className="mt-2 text-xs text-green-600">
                  <p>Count: {result.count}</p>
                  <p>Timestamp: {new Date(result.timestamp).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Webhook Status</h3>
              <p className="text-gray-600 text-sm mb-4">
                Webhooks are configured to automatically reindex places when they are published or updated in Storyblok.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm text-blue-900">
                  <strong>Endpoint:</strong> /api/webhook/storyblok
                </p>
                <p className="text-sm text-blue-900 mt-1">
                  <strong>Events:</strong> Story published, unpublished, deleted
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="https://app.storyblok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  → Storyblok Dashboard
                </a>
                <a
                  href="https://www.algolia.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  → Algolia Dashboard
                </a>
                <Link href="/search" className="block text-blue-600 hover:underline">
                  → Search Page
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-3">Setup Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Configure Storyblok content models</li>
                <li>Add places and districts in Storyblok</li>
                <li>Run initial reindex (use button above)</li>
                <li>Configure Algolia index settings</li>
                <li>Set up Storyblok webhook</li>
                <li>Test real-time updates</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Commands */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">CLI Commands</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
              <p className="text-gray-600 mb-1"># Run manual reindex script</p>
              <p className="text-gray-900">npm run reindex</p>
            </div>
            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
              <p className="text-gray-600 mb-1"># Configure Algolia index settings</p>
              <p className="text-gray-900">npm run algolia:settings</p>
            </div>
            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
              <p className="text-gray-600 mb-1"># Start development server</p>
              <p className="text-gray-900">npm run dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
