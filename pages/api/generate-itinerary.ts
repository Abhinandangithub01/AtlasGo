import type { NextApiRequest, NextApiResponse } from 'next';
import { searchClient } from '@/lib/algolia-client';
import { ItineraryRequest, Itinerary } from '@/types';

// Using GROQ instead of OpenAI for faster, cheaper inference
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type ResponseData = {
  success: boolean;
  itinerary?: Itinerary;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const request: ItineraryRequest = req.body;
    const { city, districts, dates, interests, pace } = request;

    // Validate input
    if (!city || !dates || !dates.start || !dates.end) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: city, dates',
      });
    }

    // Calculate number of days
    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (daysDiff < 1 || daysDiff > 14) {
      return res.status(400).json({
        success: false,
        message: 'Trip duration must be between 1 and 14 days',
      });
    }

    console.log(`[Itinerary] Generating ${daysDiff}-day itinerary for ${city}`);

    // Query Algolia for relevant places
    const index = searchClient.initIndex('places');
    
    // Build filters
    const filters: string[] = [`city:"${city}"`];
    if (districts && districts.length > 0) {
      const districtFilters = districts.map(d => `district:"${d}"`).join(' OR ');
      filters.push(`(${districtFilters})`);
    }

    // Build optional filters for interests (boosts results)
    const optionalFilters = interests && interests.length > 0
      ? interests.map(interest => `tags:${interest}`)
      : [];

    const searchResults = await index.search('', {
      filters: filters.join(' AND '),
      optionalFilters: optionalFilters.length > 0 ? [optionalFilters] : undefined,
      hitsPerPage: 30,
      attributesToRetrieve: [
        'title',
        'slug',
        'type',
        'district',
        'short_excerpt',
        'tags',
        'estimated_visit_time',
        'rating',
        'popularity_score',
        '_geoloc',
      ],
    });

    if (searchResults.hits.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No places found matching your criteria',
      });
    }

    console.log(`[Itinerary] Found ${searchResults.hits.length} places`);

    // Select top places (limit based on trip duration)
    const maxPlaces = Math.min(daysDiff * 4, searchResults.hits.length);
    const topPlaces = searchResults.hits.slice(0, maxPlaces);

    // Build context for LLM
    const placesContext = topPlaces.map((hit: any, idx) => {
      return `${idx + 1}. ${hit.title}
   - Type: ${hit.type}
   - District: ${hit.district || 'N/A'}
   - Description: ${hit.short_excerpt || 'N/A'}
   - Tags: ${hit.tags?.join(', ') || 'N/A'}
   - Estimated visit time: ${hit.estimated_visit_time || 60} minutes
   - Rating: ${hit.rating || 'N/A'}
   - Slug: ${hit.slug}`;
    }).join('\n\n');

    // Build LLM prompt
    const systemPrompt = `You are an expert travel planner specializing in creating personalized, actionable itineraries. Your itineraries are:
- Realistic and account for travel time between locations
- Balanced with meals, breaks, and downtime
- Tailored to the user's interests and pace
- Organized by time of day (Morning, Afternoon, Evening)

Always return valid JSON matching the exact schema provided.`;

    const userPrompt = `Create a ${daysDiff}-day itinerary for ${city}.

User Preferences:
- Dates: ${dates.start} to ${dates.end}
- Interests: ${interests?.join(', ') || 'General sightseeing'}
- Pace: ${pace || 'moderate'}
- Districts: ${districts?.join(', ') || 'All'}

Available Places (use ONLY these places):
${placesContext}

Requirements:
1. Create exactly ${daysDiff} day(s)
2. Each day should have Morning, Afternoon, and Evening blocks
3. ${pace === 'relaxed' ? 'Include 2-3 places per day with plenty of downtime' : pace === 'fast' ? 'Include 4-6 places per day, maximizing experiences' : 'Include 3-4 places per day with balanced pacing'}
4. Group places by proximity (same district when possible)
5. Include realistic visit durations and brief travel time notes
6. Add a one-line note explaining why each place fits the user's interests
7. Use the exact slug provided for each place

Return ONLY valid JSON in this exact format:
{
  "days": [
    {
      "day": 1,
      "date": "${dates.start}",
      "blocks": [
        {
          "period": "Morning",
          "visits": [
            {
              "name": "Place Name",
              "slug": "place-slug",
              "duration_min": 90,
              "note": "Perfect for history lovers, iconic landmark"
            }
          ]
        },
        {
          "period": "Afternoon",
          "visits": []
        },
        {
          "period": "Evening",
          "visits": []
        }
      ]
    }
  ],
  "summary": "Brief 2-3 sentence overview of the itinerary"
}`;

    // Call GROQ API
    console.log('[Itinerary] Calling GROQ API...');
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GROQ API error: ${error}`);
    }

    const completion = await response.json();
    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error('Empty response from GROQ');
    }

    const itinerary: Itinerary = JSON.parse(responseText);

    console.log('[Itinerary] Successfully generated itinerary');

    return res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error('[Itinerary] Error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Validate GROQ API key on startup
if (!GROQ_API_KEY) {
  console.warn('⚠️  GROQ_API_KEY not set. Itinerary generation will fail.');
}
