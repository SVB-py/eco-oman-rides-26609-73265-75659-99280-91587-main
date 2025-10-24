import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Plus, Sparkles, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const OfferRide = () => {
  const { toast } = useToast();
  const [womenOnly, setWomenOnly] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [seats, setSeats] = useState(4);
  const [showAIRoute, setShowAIRoute] = useState(false);

  const locations = ["Seeb", "Al Khuwair", "Ruwi", "Bausher", "Al Qurum"];
  const schools = [
    "Indian School Muscat",
    "BRCA School",
    "Pakistan School",
    "Al Sahwa School",
  ];

  const handlePublish = () => {
    toast({
      title: "Ride Published Successfully! 🎉",
      description: "3 riders are interested in your ride",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Offer a Ride</h1>
        <p className="text-muted-foreground">Share your commute and earn EcoCredits</p>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 -mt-8 space-y-6">
        {/* Ride Details Card */}
        <Card className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Ride Details</h2>

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
            />
            <datalist id="to-locations">
              {schools.map((school) => (
                <option key={school} value={school} />
              ))}
            </datalist>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Date
              </label>
              <Input
                type="date"
                className="bg-background/50"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Time
              </label>
              <Input type="time" className="bg-background/50" defaultValue="07:00" />
            </div>
          </div>

          {/* Available Seats */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Available Seats
            </label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSeats(Math.max(1, seats - 1))}
              >
                −
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{seats}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSeats(Math.min(7, seats + 1))}
              >
                +
              </Button>
              <span className="text-sm text-muted-foreground ml-auto">
                {Array.from({ length: seats }).map((_, i) => (
                  <span key={i}>💺</span>
                ))}
              </span>
            </div>
          </div>

          {/* Women-only Toggle */}
          <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-2xl">👩</div>
              <div>
                <div className="font-medium">Women-only Ride</div>
                <div className="text-sm text-muted-foreground">Only female passengers</div>
              </div>
            </div>
            <Switch checked={womenOnly} onCheckedChange={setWomenOnly} />
          </div>

          {/* Recurring Ride */}
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔄</div>
              <div>
                <div className="font-medium">Recurring Ride</div>
                <div className="text-sm text-muted-foreground">Repeat Mon-Fri</div>
              </div>
            </div>
            <Switch checked={recurring} onCheckedChange={setRecurring} />
          </div>
        </Card>

        {/* Route Preview Card */}
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-4">Route Preview</h3>
          <div className="bg-muted/50 h-[200px] rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Map preview will appear here</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Intermediate Stops
          </Button>
        </Card>

        {/* AI Route Optimization */}
        <Card className="glass-card p-6 border-primary/50">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI Suggest Optimal Route
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let AI find riders on your path
              </p>

              {showAIRoute ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Potential Riders</span>
                      <span className="text-lg font-bold text-primary">3</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Estimated Earnings</span>
                      <span className="text-lg font-bold text-primary">8-12 EcoCredits</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">CO₂ Savings</span>
                      <span className="text-lg font-bold text-primary">3.2 kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Time Impact</span>
                      <span className="text-sm text-accent">+5 mins</span>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    Use AI Route
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setShowAIRoute(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Calculate Optimal Route
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Pricing Card */}
        <Card className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-accent" />
            Pricing
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per seat (EcoCredits)</label>
              <Input
                type="number"
                placeholder="2"
                className="bg-background/50"
                defaultValue="2"
              />
              <p className="text-xs text-muted-foreground">
                Suggested price: 2-3 EcoCredits
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Potential Earnings</span>
                <span className="text-2xl font-bold text-accent">{seats * 2}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on {seats} seats × 2 credits
              </p>
            </div>
          </div>
        </Card>

        {/* Ride Preview */}
        <Card className="glass-card p-6 bg-gradient-glow">
          <h3 className="font-bold mb-4">Ride Preview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route</span>
              <span className="font-medium">Seeb → Indian School</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium">Today, 7:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Seats</span>
              <span className="font-medium">{seats} seats</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">2 EcoCredits/seat</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visibility</span>
              <span className="font-medium text-primary">~15 potential riders</span>
            </div>
          </div>
        </Card>

        {/* Publish Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full mb-8"
          onClick={handlePublish}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Publish Ride
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default OfferRide;
