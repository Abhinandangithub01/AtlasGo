'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface MapPlace {
  id: number;
  title: string;
  slug: string;
  lat: number;
  lng: number;
  short_excerpt?: string;
  image?: string;
  type?: string;
}

interface MapProps {
  places: MapPlace[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  enableClustering?: boolean;
}

export default function Map({
  places,
  center = [38.7223, -9.1393], // Lisbon default
  zoom = 13,
  height = '500px',
  enableClustering = true,
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView(center, zoom);
    mapRef.current = map;

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapRef.current || !places.length) return;

    const map = mapRef.current;

    // Import MarkerClusterGroup dynamically
    import('leaflet.markercluster').then((MarkerCluster) => {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || (layer as any).clearLayers) {
          map.removeLayer(layer);
        }
      });

      if (enableClustering) {
        // Create marker cluster group
        const markers = (L as any).markerClusterGroup({
          maxClusterRadius: 50,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,
        });

        places.forEach((place) => {
          const marker = L.marker([place.lat, place.lng]);
          
          const popupContent = `
            <div style="min-width: 200px;">
              ${place.image ? `<img src="${place.image}" alt="${place.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />` : ''}
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${place.title}</h3>
              ${place.type ? `<span style="background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${place.type}</span>` : ''}
              ${place.short_excerpt ? `<p style="margin: 8px 0; font-size: 14px; color: #666;">${place.short_excerpt}</p>` : ''}
              <a href="/place/${place.slug}" style="display: inline-block; margin-top: 8px; color: #3b82f6; text-decoration: none; font-weight: 600;">View Details →</a>
            </div>
          `;
          
          marker.bindPopup(popupContent);
          markers.addLayer(marker);
        });

        map.addLayer(markers);

        // Fit bounds to show all markers
        if (places.length > 0) {
          const bounds = markers.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }
      } else {
        // Add markers without clustering
        places.forEach((place) => {
          const marker = L.marker([place.lat, place.lng]);
          
          const popupContent = `
            <div style="min-width: 200px;">
              ${place.image ? `<img src="${place.image}" alt="${place.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />` : ''}
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${place.title}</h3>
              ${place.type ? `<span style="background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${place.type}</span>` : ''}
              ${place.short_excerpt ? `<p style="margin: 8px 0; font-size: 14px; color: #666;">${place.short_excerpt}</p>` : ''}
              <a href="/place/${place.slug}" style="display: inline-block; margin-top: 8px; color: #3b82f6; text-decoration: none; font-weight: 600;">View Details →</a>
            </div>
          `;
          
          marker.bindPopup(popupContent).addTo(map);
        });

        // Fit bounds to show all markers
        if (places.length > 0) {
          const bounds = L.latLngBounds(places.map(p => [p.lat, p.lng]));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    });
  }, [places, enableClustering]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}
      className="shadow-md"
    />
  );
}
