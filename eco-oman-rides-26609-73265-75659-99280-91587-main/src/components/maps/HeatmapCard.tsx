import React from "react";
import OmanMap from "./OmanMap";
import HeatmapOverlay from "./HeatmapOverlay";
import type { MapStop } from "./OmanMap";

interface HeatmapCardProps {
  height?: string;
  stops?: MapStop[];
  className?: string;
}

const HeatmapCard: React.FC<HeatmapCardProps> = ({
  height = "300px",
  stops = [],
  className = "",
}) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 ${className}`}>
      <OmanMap
        stops={stops}
        height={height}
      >
        <HeatmapOverlay />
      </OmanMap>
      {/* Heatmap Legend */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 text-xs">
        <div className="text-white font-medium mb-2">Ride Intensity</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-300">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-300">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-slate-300">High</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapCard;