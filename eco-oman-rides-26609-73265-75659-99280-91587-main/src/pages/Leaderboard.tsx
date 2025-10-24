import { useEffect, useState } from 'react';
import { mockLeaderboard } from '../lib/testData';
import { analytics } from '../lib/backend';

// Set to true to use real Supabase data, false for mock data
const USE_REAL_DATA = false;

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadLeaderboard();
  }, []);
  
  const loadLeaderboard = async () => {
    if (USE_REAL_DATA) {
      const { data } = await analytics.getLeaderboard(50);
      setLeaders(data || []);
    } else {
      // Use mock data for testing
      await new Promise(resolve => setTimeout(resolve, 300));
      setLeaders(mockLeaderboard);
    }
    setLoading(false);
  };
  
  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <p>Loading leaderboard...</p>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🏆 Top Eco Warriors</h1>
        
        <div className="space-y-2">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 ${
                index < 3 ? 'border-2 border-yellow-500/50' : 'border border-white/10'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                'bg-gray-700'
              }`}>
                #{index + 1}
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-lg">{leader.name}</p>
                <p className="text-sm text-gray-400">{leader.total_rides} rides • ⭐ {leader.rating}</p>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">{leader.eco_credits}</p>
                <p className="text-xs text-gray-400">EcoCredits</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
