import React from "react";
import { Circle, useMap } from "react-leaflet";
import type { LatLngLiteral } from "leaflet";

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number; // 0-1 scale
  radius?: number;
}

interface HeatmapOverlayProps {
  data?: HeatmapData[];
  maxIntensity?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

// Sample heatmap data for Muscat districts
const defaultHeatmapData: HeatmapData[] = [
  // CBD Area - High intensity
  { lat: 23.588, lng: 58.3829, intensity: 0.9, radius: 800 },
  { lat: 23.585, lng: 58.385, intensity: 0.8, radius: 600 },
  { lat: 23.590, lng: 58.380, intensity: 0.7, radius: 500 },

  // Al Mouj Area - Medium intensity
  { lat: 23.578, lng: 58.395, intensity: 0.6, radius: 700 },
  { lat: 23.575, lng: 58.398, intensity: 0.5, radius: 500 },

  // Qurm Area - Medium intensity
  { lat: 23.595, lng: 58.375, intensity: 0.6, radius: 600 },
  { lat: 23.598, lng: 58.372, intensity: 0.5, radius: 400 },

  // Wave Muscat - High intensity
  { lat: 23.570, lng: 58.405, intensity: 0.8, radius: 500 },
  { lat: 23.572, lng: 58.402, intensity: 0.7, radius: 400 },

  // Ruwi - Medium intensity
  { lat: 23.600, lng: 58.550, intensity: 0.5, radius: 600 },
  { lat: 23.602, lng: 58.552, intensity: 0.4, radius: 400 },
];

const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({
  data = defaultHeatmapData,
  maxIntensity = 1,
  minOpacity = 0.1,
  maxOpacity = 0.6,
}) => {
  const map = useMap();

  // Calculate opacity based on intensity
  const getOpacity = (intensity: number) => {
    return minOpacity + (maxOpacity - minOpacity) * (intensity / maxIntensity);
  };

  // Get color based on intensity (green to red gradient)
  const getColor = (intensity: number) => {
    const normalizedIntensity = intensity / maxIntensity;
    if (normalizedIntensity < 0.3) {
      // Green for low intensity
      return `rgba(34, 197, 94, ${getOpacity(intensity)})`;
    } else if (normalizedIntensity < 0.6) {
      // Yellow-green for medium intensity
      return `rgba(234, 179, 8, ${getOpacity(intensity)})`;
    } else {
      // Red for high intensity
      return `rgba(239, 68, 68, ${getOpacity(intensity)})`;
    }
  };

  return (
    <>
      {data.map((point, index) => (
        <Circle
          key={index}
          center={{ lat: point.lat, lng: point.lng }}
          radius={point.radius || 500}
          pathOptions={{
            color: getColor(point.intensity),
            fillColor: getColor(point.intensity),
            fillOpacity: getOpacity(point.intensity),
            weight: 0,
          }}
        />
      ))}
    </>
  );
};

export default HeatmapOverlay;