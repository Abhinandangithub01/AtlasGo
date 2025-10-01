import type { NextApiRequest, NextApiResponse } from 'next';
import { getStoryById } from '@/lib/storyblok';
import { indexPlace, deletePlaceFromIndex } from '@/lib/algolia';
import { Place } from '@/types';

type ResponseData = {
  success: boolean;
  message: string;
  objectID?: string;
  error?: string;
  timestamp?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { storyId, action } = req.body;

  if (!storyId) {
    return res.status(400).json({
      success: false,
      message: 'Missing storyId in request body',
    });
  }

  try {
    console.log(`[Reindex Single] Processing story ${storyId}, action: ${action || 'publish'}`);

    // If action is unpublish/delete, remove from index
    if (action === 'unpublish' || action === 'delete') {
      const result = await deletePlaceFromIndex(storyId);
      
      return res.status(200).json({
        success: true,
        message: `Successfully removed place ${storyId} from index`,
        objectID: result.objectID,
        timestamp: new Date().toISOString(),
      });
    }

    // Fetch the story from Storyblok
    const story = await getStoryById(storyId);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: `Story ${storyId} not found`,
        timestamp: new Date().toISOString(),
      });
    }

    // Only index if it's a place story
    if (!story.content || story.content.component !== 'place') {
      return res.status(200).json({
        success: true,
        message: `Story ${storyId} is not a place, skipping index`,
        timestamp: new Date().toISOString(),
      });
    }

    // Transform story to Place type
    const place: Place = {
      id: story.id,
      uuid: story.uuid,
      title: story.content.title || story.name,
      slug: story.slug,
      type: story.content.type || 'attraction',
      district: story.content.district || '',
      city: story.content.city || '',
      location: {
        lat: parseFloat(story.content.latitude || 0),
        lng: parseFloat(story.content.longitude || 0),
      },
      address: story.content.address || '',
      description: story.content.description || '',
      short_excerpt: story.content.short_excerpt || '',
      tags: story.content.tags || [],
      price_range: story.content.price_range || 'free',
      rating: parseFloat(story.content.rating || 0),
      popularity_score: parseInt(story.content.popularity_score || 0),
      opening_hours: story.content.opening_hours || '',
      contact: story.content.contact || '',
      website: story.content.website || '',
      images: story.content.images || [],
      next_event_date: story.content.next_event_date || undefined,
      estimated_visit_time: parseInt(story.content.estimated_visit_time || 60),
      languages: story.content.languages || [],
      accessibility_features: story.content.accessibility_features || [],
    };

    // Index the place
    const result = await indexPlace(place);

    console.log(`[Reindex Single] Successfully indexed place ${storyId}`);

    return res.status(200).json({
      success: true,
      message: `Successfully indexed place ${storyId}`,
      objectID: result.objectID,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Reindex Single] Error:', error);
    
    return res.status(500).json({
      success: false,
      message: `Failed to reindex story ${storyId}`,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
