import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Search, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { mockRides } from '../lib/testData';
import { supabase } from '@/lib/backend';

// Set to true to use real Supabase data, false for mock data
const USE_REAL_DATA = false;

const rides = {
  search: async (filters: any) => {
    let query = supabase.from('rides').select('*, driver:driver_id(name, rating)');
    if (filters.from) query = query.ilike('from_location', `%${filters.from}%`);
    if (filters.to) query = query.ilike('to_location', `%${filters.to}%`);
    if (filters.date) query = query.eq('date', filters.date);
    return await query;
  }
};

const RequestRide = () => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    seats: 1
  });

  const locations = ["Seeb", "Al Khuwair", "Ruwi", "Bausher", "Al Qurum"];
  const schools = [
    "Indian School Muscat",
    "BRCA School",
    "Pakistan School",
    "Al Sahwa School",
  ];

  const handleSearch = async () => {
    setSearching(true);
    
    if (USE_REAL_DATA) {
      // Use real Supabase data
      const { data } = await rides.search(filters);
      setSearchResults(data || []);
    } else {
      // Use mock data for testing
      await new Promise(resolve => setTimeout(resolve, 500));
      setSearchResults(mockRides);
    }
    
    setSearching(false);
    
    toast({
      title: "Search Complete! 🎉",
      description: `Found ${USE_REAL_DATA ? searchResults.length : mockRides.length} available rides`,
    });
  };

  const handleBookRide = (rideId: string) => {
    toast({
      title: "Ride Booked Successfully! 🎉",
      description: "Driver will contact you shortly",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Find a Ride</h1>
        <p className="text-white/80">Search for available carpool rides</p>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 -mt-8 space-y-6">
        <Card className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-6 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Search Rides</h2>

          {/* From Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              From
            </label>
            <Input
              placeholder="Enter pickup location"
              className="bg-gray-900/50 border-white/10 text-white"
              list="from-locations"
              value={filters.from}
              onChange={(e) => setFilters({...filters, from: e.target.value})}
            />
            <datalist id="from-locations">
              {locations.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          {/* To Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              To
            </label>
            <Input
              placeholder="Enter destination"
              className="bg-gray-900/50 border-white/10 text-white"
              list="to-locations"
              value={filters.to}
              onChange={(e) => setFilters({...filters, to: e.target.value})}
            />
            <datalist id="to-locations">
              {schools.map((school) => (
                <option key={school} value={school} />
              ))}
            </datalist>
          </div>

          {/* Date and Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Date
              </label>
              <Input
                type="date"
                className="bg-gray-900/50 border-white/10 text-white"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                Seats
              </label>
              <Input
                type="number"
                min="1"
                max="7"
                className="bg-gray-900/50 border-white/10 text-white"
                value={filters.seats}
                onChange={(e) => setFilters({...filters, seats: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            size="lg"
            onClick={handleSearch}
            disabled={searching}
          >
            <Search className="w-5 h-5 mr-2" />
            {searching ? 'Searching...' : 'Search Rides'}
          </Button>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Available Rides ({searchResults.length})</h3>
            
            {searchResults.map((ride) => (
              <Card key={ride.id} className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-white">{ride.driver?.name || 'Driver'}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>⭐ {ride.driver?.rating || 5.0}</span>
                      <span>•</span>
                      <span>{ride.seats_available} seats available</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">{ride.price_per_seat} OMR</p>
                    <p className="text-xs text-gray-400">per seat</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{ride.from_location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{ride.to_location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {ride.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ride.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-white">CO₂ Saved: {(ride.distance_km * 0.21).toFixed(1)} kg</span>
                  </div>
                  <span className="text-sm text-gray-400">{ride.distance_km} km</span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                  onClick={() => handleBookRide(ride.id)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Book This Ride
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!searching && searchResults.length === 0 && filters.from && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No rides found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search filters or check back later
            </p>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Create Ride Request
            </Button>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default RequestRide;
