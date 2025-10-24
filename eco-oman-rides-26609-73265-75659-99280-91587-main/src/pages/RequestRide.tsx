import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, Search, Sparkles, Leaf, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/backend";

const rides = {
  search: async (filters: any, womenOnly: boolean = false) => {
    let query = supabase.from('rides').select('*, driver:driver_id(name, rating)');
    if (filters.from) query = query.ilike('from_location', `%${filters.from}%`);
    if (filters.to) query = query.ilike('to_location', `%${filters.to}%`);
    if (filters.date) query = query.eq('date', filters.date);
    if (womenOnly) query = query.eq('women_only', true);
    return await query;
  }
};

const RequestRide = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    seats: 1
  });

  const isWomenOnly = searchParams.get('womenOnly') === 'true';

  const locations = ["Seeb", "Al Khuwair", "Ruwi", "Bausher", "Al Qurum"];
  const schools = [
    "Indian School Muscat",
    "BRCA School",
    "Pakistan School",
    "Al Sahwa School",
  ];

  const handleSearch = async () => {
    setSearching(true);
    const { data } = await rides.search(filters, isWomenOnly);
    setSearchResults(data || []);
    setSearching(false);
    
    toast({
      title: "Search Complete! 🎉",
      description: `Found ${data?.length || 0} available ${isWomenOnly ? 'women-only ' : ''}rides`,
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
      <div className="bg-gradient-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isWomenOnly ? 'Women-Only Rides' : 'Find a Ride'}
            </h1>
            <p className="text-muted-foreground">
              {isWomenOnly 
                ? 'Safe, supportive rides exclusively for women' 
                : 'Search for available carpool rides'
              }
            </p>
          </div>
          {isWomenOnly && (
            <div className="flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-xl px-4 py-2">
              <Shield className="w-5 h-5 text-pink-400" />
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">Women Only</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 -mt-8 space-y-6">
        <Card className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Search Rides</h2>

          {/* From Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              From
            </label>
            <Input
              placeholder="Enter pickup location"
              className="bg-background/50"
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
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              To
            </label>
            <Input
              placeholder="Enter destination"
              className="bg-background/50"
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
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Date
              </label>
              <Input
                type="date"
                className="bg-background/50"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Seats
              </label>
              <Input
                type="number"
                min="1"
                max="7"
                className="bg-background/50"
                value={filters.seats}
                onChange={(e) => setFilters({...filters, seats: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            variant="hero"
            size="lg"
            className="w-full"
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
            <h3 className="text-xl font-bold">Available Rides ({searchResults.length})</h3>
            
            {searchResults.map((ride) => (
              <Card key={ride.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-bold text-lg">{ride.driver?.name || 'Driver'}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>⭐ {ride.driver?.rating || 5.0}</span>
                        <span>•</span>
                        <span>{ride.seats_available} seats available</span>
                      </div>
                    </div>
                    {(isWomenOnly || ride.women_only) && (
                      <div className="flex items-center gap-1 bg-pink-500/20 border border-pink-500/30 rounded-lg px-2 py-1">
                        <Shield className="w-3 h-3 text-pink-400" />
                        <span className="text-xs font-medium text-pink-300">Women Only</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{ride.price_per_seat} OMR</p>
                    <p className="text-xs text-muted-foreground">per seat</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{ride.from_location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="font-medium">{ride.to_location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-500" />
                    <span className="text-sm">CO₂ Saved: {(ride.distance_km * 0.21).toFixed(1)} kg</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{ride.distance_km} km</span>
                </div>

                <Button
                  variant="default"
                  className="w-full"
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
          <Card className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">{isWomenOnly ? '�️' : '�🔍'}</div>
            <h3 className="text-xl font-bold mb-2">
              {isWomenOnly ? 'No women-only rides found' : 'No rides found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isWomenOnly 
                ? 'Try adjusting your search filters or check back later for women-only rides'
                : 'Try adjusting your search filters or check back later'
              }
            </p>
            <Button variant="outline">
              {isWomenOnly ? 'Create Women-Only Ride Request' : 'Create Ride Request'}
            </Button>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default RequestRide;
