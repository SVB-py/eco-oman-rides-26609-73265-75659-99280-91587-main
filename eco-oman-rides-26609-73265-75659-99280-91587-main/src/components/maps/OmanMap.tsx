import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import type { LatLngExpression, LatLngLiteral } from "leaflet";
import { Icon, divIcon } from "leaflet";

const OMAN_CENTER: LatLngLiteral = { lat: 23.588, lng: 58.3829 };
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const defaultMarker = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -32],
  shadowSize: [41, 41],
});

const liveMarker = divIcon({
  className: "relative flex h-10 w-10 items-center justify-center",
  html: `
    <span style="
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 9999px;
      background: rgba(74, 222, 128, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(74, 222, 128, 0.55);
      box-shadow: 0 0 18px rgba(74, 222, 128, 0.4);
    ">
      <span style="
        width: 1rem;
        height: 1rem;
        border-radius: 9999px;
        background: rgba(34, 197, 94, 1);
        display: inline-block;
      " />
    </span>
  `,
  iconAnchor: [22, 22],
});

export interface MapStop extends LatLngLiteral {
  label: string;
  description?: string;
  timestamp?: string;
  color?: string;
}

export interface OmanMapProps {
  stops: MapStop[];
  livePosition?: LatLngLiteral | null;
  liveTrail?: LatLngExpression[];
  height?: string;
  autoRoute?: boolean;
  routeStroke?: string;
  children?: ReactNode;
  onMapClick?: (coords: LatLngLiteral) => void;
  onRouteReady?: (coordinates: LatLngExpression[]) => void;
  isTracking?: boolean;
}

const fetchRoute = async (points: LatLngLiteral[]): Promise<LatLngExpression[]> => {
  const coordinates = points.map(({ lng, lat }) => `${lng},${lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&overviewShapeFormat=geojson`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`OSRM request failed (${response.status})`);
  }

  const data = (await response.json()) as {
    routes?: Array<{ geometry: { coordinates: [number, number][] } }>;
  };
  const first = data.routes?.[0]?.geometry.coordinates;
  if (!first) {
    throw new Error("No route returned for selected stops.");
  }

  return first.map(([lng, lat]) => ({ lat, lng } satisfies LatLngLiteral));
};

const MapClickHandler = ({ onMapClick }: { onMapClick?: (coords: LatLngLiteral) => void }) => {
  useMapEvents({
    click(event) {
      if (onMapClick) {
        const { lat, lng } = event.latlng;
        onMapClick({ lat, lng });
      }
    },
  });

  return null;
};

const OmanMap = ({
  stops,
  livePosition,
  liveTrail,
  height = "420px",
  autoRoute = false,
  routeStroke = "#4ade80",
  children,
  onMapClick,
  onRouteReady,
  isTracking,
}: OmanMapProps) => {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLngExpression[]>([]);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const center = useMemo<LatLngLiteral>(() => {
    if (livePosition) return livePosition;
    if (stops.length > 0) return stops[0];
    return OMAN_CENTER;
  }, [livePosition, stops]);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (!autoRoute || stops.length < 2) {
        setRouteCoordinates([]);
        setRouteError(null);
        return;
      }

      setRouteLoading(true);
      try {
        const coords = await fetchRoute(stops);
        if (!ignore) {
          setRouteCoordinates(coords);
          setRouteError(null);
          onRouteReady?.(coords);
        }
      } catch (error) {
        if (!ignore) {
          setRouteError(error instanceof Error ? error.message : "Unable to build route.");
          setRouteCoordinates([]);
        }
      } finally {
        if (!ignore) {
          setRouteLoading(false);
        }
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [autoRoute, stops, onRouteReady]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/70 via-slate-900/80 to-black shadow-[0_0_45px_rgba(16,185,129,0.2)]">
      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
        style={{ minHeight: height }}
        zoomControl={false}
        scrollWheelZoom
      >
        <ZoomControl position="bottomright" />
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        {stops.map((stop, index) => (
          <Marker key={`${stop.lat}-${stop.lng}-${index}`} position={stop} icon={defaultMarker}>
            <Tooltip direction="top" offset={[0, -18]} opacity={1} permanent>
              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-semibold text-emerald-300">
                  {index === 0 ? "Start" : index === stops.length - 1 ? "Destination" : `Stop ${index}`}
                </span>
                <span className="text-emerald-100/90">{stop.label}</span>
                {stop.timestamp && <span className="text-[10px] text-emerald-200/70">{stop.timestamp}</span>}
              </div>
            </Tooltip>
          </Marker>
        ))}

        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} pathOptions={{ color: routeStroke, weight: 5, opacity: 0.65 }} />
        )}

        {liveTrail && liveTrail.length > 0 && (
          <Polyline positions={liveTrail} pathOptions={{ color: "#38bdf8", weight: 3, dashArray: "6 12" }} />
        )}

        {livePosition && <Marker position={livePosition} icon={liveMarker} />}

        <MapClickHandler onMapClick={onMapClick} />
        {children}
      </MapContainer>

      {routeLoading && (
        <div className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-emerald-900/80 px-4 py-1 text-xs font-medium text-emerald-200 shadow-lg backdrop-blur">
          Calculating optimal route...
        </div>
      )}

      {routeError && (
        <div className="absolute bottom-4 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200 shadow-lg backdrop-blur">
          <span>{routeError}</span>
          <button
            className="rounded-full border border-amber-400/40 px-3 py-1 text-[10px] font-semibold uppercase text-amber-200/90 hover:bg-amber-400/10"
            onClick={() => {
              setRouteError(null);
              setRouteCoordinates([]);
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {isTracking && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100 shadow-lg backdrop-blur">
          Live Tracking
        </div>
      )}

    </div>
  );
};

export default OmanMap;
