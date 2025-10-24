import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FLASK_API = 'http://localhost:5000';

export default function Tracking() {
  const [busLocation, setBusLocation] = useState<[number, number]>([23.5880, 58.3829]);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate route for now
    const demoRoute: [number, number][] = [
      [23.5880, 58.3829],
      [23.5950, 58.4100],
      [23.6000, 58.4500],
      [23.6100, 58.5400]
    ];
    
    setRoute(demoRoute);
    setBusLocation(demoRoute[0]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚌</div>
          <p style={{ fontSize: '20px' }}>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '24px', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
        🚌 Live Passenger Tracking
      </h1>
      
      <p style={{ color: '#999', marginBottom: '24px' }}>
        Muscat → Nizwa • Distance: 45 km
      </p>

      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '16px', 
        padding: '16px', 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>
          <p style={{ fontSize: '14px', color: '#999' }}>Status</p>
          <p style={{ fontSize: '20px', fontWeight: '600', color: '#10b981' }}>● En Route</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#999' }}>Location</p>
          <p style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            {busLocation[0].toFixed(4)}, {busLocation[1].toFixed(4)}
          </p>
        </div>
      </div>

      <div style={{ 
        height: '500px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <MapContainer 
          center={busLocation} 
          zoom={11} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {route.map((point, idx) => (
            <Marker key={idx} position={point} />
          ))}
          
          <Polyline 
            positions={route} 
            color="#10b981" 
            weight={4}
          />
        </MapContainer>
      </div>
    </div>
  );
}
