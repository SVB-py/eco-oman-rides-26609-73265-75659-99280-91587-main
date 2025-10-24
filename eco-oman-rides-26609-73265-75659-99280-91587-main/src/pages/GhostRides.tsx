import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, MapPin, Calendar, Clock, Users, Coins, Plus,
  Filter, Ghost, Flame, Zap, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface GhostRide {
  id: string;
  passenger: {
    name: string;
    photo: string;
    rating: number;
  };
  from: string;
  to: string;
  scheduledDate: string;
  scheduledTime: string;
  daysUntil: number;
  seats: number;
  baseCredits: number;
  multiplier: number;
  totalCredits: number;
  distance: string;
  recurring?: boolean;
}

const GhostRides = () => {
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filter, setFilter] = useState<"all" | "hot" | "soon" | "scheduled">("all");
  
  const [ghostRides, setGhostRides] = useState<GhostRide[]>([
    {
      id: "1",
      passenger: { name: "Ahmed Ali", photo: "👨", rating: 4.8 },
      from: "Seeb",
      to: "Indian School",
      scheduledDate: "Oct 20",
      scheduledTime: "7:30 AM",
      daysUntil: 0.5,
      seats: 2,
      baseCredits: 2,
      multiplier: 3,
      totalCredits: 6,
      distance: "2km detour",
    },
    {
      id: "2",
      passenger: { name: "Fatima Mohammed", photo: "👧", rating: 4.9 },
      from: "Al Khuwair",
      to: "Sultan Qaboos University",
      scheduledDate: "Oct 21",
      scheduledTime: "8:00 AM",
      daysUntil: 1.5,
      seats: 1,
      baseCredits: 3,
      multiplier: 2,
      totalCredits: 6,
      distance: "3km detour",
    },
    {
      id: "3",
      passenger: { name: "Omar Hassan", photo: "👦", rating: 4.7 },
      from: "Ruwi",
      to: "Muscat Grand Mall",
      scheduledDate: "Oct 23",
      scheduledTime: "5:00 PM",
      daysUntil: 3,
      seats: 3,
      baseCredits: 2,
      multiplier: 1.5,
      totalCredits: 3,
      distance: "1km detour",
      recurring: true,
    },
    {
      id: "4",
      passenger: { name: "Sara Abdullah", photo: "👩", rating: 5.0 },
      from: "Qurum",
      to: "PDO Office",
      scheduledDate: "Oct 27",
      scheduledTime: "7:00 AM",
      daysUntil: 7,
      seats: 2,
      baseCredits: 4,
      multiplier: 1,
      totalCredits: 4,
      distance: "4km detour",
    },
  ]);

  const [newRide, setNewRide] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    recurring: false,
  });

  const getMultiplier = (days: number) => {
    if (days < 1) return { mult: 3, label: "🔥 HOT! Under 24hrs", color: "text-destructive" };
    if (days <= 2) return { mult: 2, label: "⚡ Soon! 2x", color: "text-amber-500" };
    if (days <= 6) return { mult: 1.5, label: "📅 1.5x", color: "text-blue-500" };
    return { mult: 1, label: "📅 Scheduled", color: "text-purple-500" };
  };

  const claimRide = (ride: GhostRide) => {
    toast.success(`Claimed ride from ${ride.from} to ${ride.to}!`);
    setGhostRides(prev => prev.filter(r => r.id !== ride.id));
  };

  const createGhostRide = () => {
    toast.success("Ghost ride published! Drivers will see your request.");
    setShowCreateDialog(false);
    setNewRide({ from: "", to: "", date: "", time: "", seats: 1, recurring: false });
  };

  const filteredRides = ghostRides.filter(ride => {
    if (filter === "all") return true;
    if (filter === "hot") return ride.daysUntil < 1;
    if (filter === "soon") return ride.daysUntil >= 1 && ride.daysUntil <= 2;
    if (filter === "scheduled") return ride.daysUntil > 2;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="glass" size="icon" onClick={() => navigate(-1)}>
              <Home className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Ghost className="w-6 h-6 text-purple-500" />
                Ghost Rides
              </h1>
              <p className="text-sm text-muted-foreground">Schedule rides in advance</p>
            </div>
            <Button variant="hero" size="icon" onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <Card className="glass-card p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">234</p>
              <p className="text-sm text-muted-foreground">Total Active</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Your Claimed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">45</p>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">12</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto">
          <Button
            variant={filter === "all" ? "hero" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Rides
          </Button>
          <Button
            variant={filter === "hot" ? "destructive" : "outline"}
            onClick={() => setFilter("hot")}
          >
            <Flame className="w-4 h-4 mr-2" />
            Hot (&lt;24h)
          </Button>
          <Button
            variant={filter === "soon" ? "outline" : "outline"}
            onClick={() => setFilter("soon")}
            className={filter === "soon" ? "border-amber-500 text-amber-500" : ""}
          >
            <Zap className="w-4 h-4 mr-2" />
            Soon (2x)
          </Button>
          <Button
            variant={filter === "scheduled" ? "outline" : "outline"}
            onClick={() => setFilter("scheduled")}
            className={filter === "scheduled" ? "border-purple-500 text-purple-500" : ""}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Scheduled
          </Button>
        </div>

        {/* Ghost Rides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRides.map((ride) => {
            const multiplierInfo = getMultiplier(ride.daysUntil);
            
            return (
              <Card 
                key={ride.id} 
                className="glass-card p-6 hover-scale relative overflow-hidden"
              >
                {/* Ghost Effect */}
                <div className="absolute top-0 right-0 opacity-10">
                  <Ghost className="w-32 h-32 text-purple-500" />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 bg-gradient-primary">
                        <div className="text-2xl">{ride.passenger.photo}</div>
                      </Avatar>
                      <div>
                        <p className="font-bold">{ride.passenger.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ⭐ {ride.passenger.rating}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${multiplierInfo.color}`}>
                        {ride.totalCredits}
                        <Coins className="w-5 h-5 inline ml-1" />
                      </p>
                      {ride.multiplier > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {ride.baseCredits} × {ride.multiplier}x
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Urgency Badge */}
                  <div className="mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      ride.daysUntil < 1 ? "bg-destructive/20 text-destructive animate-pulse" :
                      ride.daysUntil <= 2 ? "bg-amber-500/20 text-amber-500" :
                      "bg-purple-500/20 text-purple-500"
                    } font-semibold`}>
                      {multiplierInfo.label}
                    </span>
                    {ride.recurring && (
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 ml-2">
                        🔁 Weekly
                      </span>
                    )}
                  </div>

                  {/* Route */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{ride.from}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-destructive" />
                      <span className="font-semibold">{ride.to}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.scheduledTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{ride.seats} seat{ride.seats > 1 ? "s" : ""}</span>
                    </div>
                    <div className="text-muted-foreground">{ride.distance}</div>
                  </div>

                  {/* Countdown */}
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    🕐 In {ride.daysUntil < 1 ? `${Math.round(ride.daysUntil * 24)} hours` : `${Math.round(ride.daysUntil)} days`}
                  </p>

                  {/* Claim Button */}
                  <Button 
                    variant={ride.daysUntil < 1 ? "destructive" : "hero"}
                    className="w-full"
                    onClick={() => claimRide(ride)}
                  >
                    {ride.daysUntil < 1 && <Flame className="w-4 h-4 mr-2" />}
                    Quick Claim • {ride.totalCredits} Credits
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredRides.length === 0 && (
          <Card className="glass-card p-12 text-center">
            <Ghost className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg font-semibold mb-2">No ghost rides found</p>
            <p className="text-sm text-muted-foreground">Try a different filter or create your own!</p>
          </Card>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ghost className="w-5 h-5 text-purple-500" />
              Schedule Future Ride
            </DialogTitle>
            <DialogDescription>
              Create a ghost ride and let drivers claim it in advance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>From</Label>
              <Input
                placeholder="Pickup location"
                value={newRide.from}
                onChange={(e) => setNewRide({ ...newRide, from: e.target.value })}
              />
            </div>

            <div>
              <Label>To</Label>
              <Input
                placeholder="Destination"
                value={newRide.to}
                onChange={(e) => setNewRide({ ...newRide, to: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newRide.date}
                  onChange={(e) => setNewRide({ ...newRide, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newRide.time}
                  onChange={(e) => setNewRide({ ...newRide, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Seats: {newRide.seats}</Label>
              <Slider
                value={[newRide.seats]}
                onValueChange={([value]) => setNewRide({ ...newRide, seats: value })}
                min={1}
                max={4}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Repeat weekly</Label>
              <Switch
                checked={newRide.recurring}
                onCheckedChange={(checked) => setNewRide({ ...newRide, recurring: checked })}
              />
            </div>

            {/* Multiplier Info */}
            <Card className="p-4 bg-purple-500/10 border-purple-500/20">
              <p className="text-sm font-semibold mb-2">Credit Multipliers</p>
              <div className="space-y-1 text-xs">
                <p>🔥 Under 24 hours: 3x (6 credits)</p>
                <p>⚡ 1-2 days: 2x (4 credits)</p>
                <p>📅 3-6 days: 1.5x (3 credits)</p>
                <p>📅 7+ days: Standard (2 credits)</p>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={createGhostRide}>
              Publish Ghost Ride
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GhostRides;
