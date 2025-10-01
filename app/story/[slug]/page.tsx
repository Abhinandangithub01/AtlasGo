'use client';

import { useEffect, useState } from 'react';
import InteractiveStory from '@/components/InteractiveStory';
import Link from 'next/link';

export default function StoryPage({ params }: { params: { slug: string } }) {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch(
          `https://api.storyblok.com/v2/cdn/stories/${params.slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN}&version=published`
        );
        const result = await response.json();
        setStory(result.story);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-white text-xl">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
          <Link href="/stories" className="text-purple-400 hover:text-purple-300">
            ← Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <InteractiveStory
      title={story.content.title || story.name}
      subtitle={story.content.subtitle || ''}
      sections={story.content.sections || []}
      placeSlug={story.content.related_place}
    />
  );
}
