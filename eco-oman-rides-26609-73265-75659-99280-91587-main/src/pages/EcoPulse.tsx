import {
  Radar,
  MapPin,
  Flame,
  Users,
  Leaf,
  RefreshCw,
  Locate,
  AlertTriangle,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeatmapCard from "@/components/maps/HeatmapCard";

const hotSpots = [
  {
    area: "Wave Muscat",
    demand: "High",
    co2: "12.4 kg saved",
  },
  {
    area: "Central Business District",
    demand: "Surging",
    co2: "9.8 kg saved",
  },
  {
    area: "Al Khuwair",
    demand: "Moderate",
    co2: "7.2 kg saved",
  },
];

const liveCircles = [
  {
    name: "Wave Neighbours",
    activeRides: 5,
  },
  {
    name: "CBD Finance Crew",
    activeRides: 3,
  },
  {
    name: "Women in Tech",
    activeRides: 4,
  },
];

const EcoPulse = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-background to-black text-foreground">
    <div className="container mx-auto px-4 py-10 space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <p className="uppercase tracking-widest text-xs text-muted-foreground">Eco Pulse</p>
        <h1 className="text-4xl md:text-5xl font-bold">Live community heatmap &amp; eco impact monitor.</h1>
        <p className="text-muted-foreground max-w-3xl">
          Track demand spikes, monitor CO₂ savings, and zoom into trusted circles in real time. Perfect for drivers, riders, and admins fine-tuning routes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="hero">
            <Locate className="w-4 h-4" />
            Center on my location
          </Button>
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4" />
            Refresh pulse
          </Button>
          <Button variant="ghost">
            <Compass className="w-4 h-4" />
            Send to Aurora dashboard
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Radar className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Live heatmap</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <HeatmapCard height="350px" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Peak demand</p>
                <p className="font-semibold">07:00 – 08:30 GST</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Active rides</p>
                <p className="font-semibold">128 right now</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">CO₂ saved today</p>
                <p className="font-semibold">82.6 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Eco impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Today’s savings</p>
              <p className="text-2xl font-bold text-primary">82.6 kg CO₂</p>
              <p className="text-xs text-muted-foreground">Equivalent to planting 3.7 trees</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Top eco contributors</p>
              <p className="font-semibold">Maha N., Ahmed L., Layan S.</p>
            </div>
            <Button variant="ghost" className="w-full">
              View weekly eco report
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Top pickup points</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {hotSpots.map((spot) => (
              <div key={spot.area} className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{spot.area}</span>
                  <span className="text-xs uppercase tracking-wide text-secondary">{spot.demand}</span>
                </div>
                <p className="text-xs text-muted-foreground">{spot.co2}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Active circles</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {liveCircles.map((circle) => (
              <div key={circle.name} className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{circle.name}</span>
                  <span className="text-xs text-primary uppercase tracking-wide">{circle.activeRides} rides</span>
                </div>
                <p className="text-xs text-muted-foreground">Tap to open in Aurora dashboard</p>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              Manage circles
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Alerts</p>
            <h2 className="text-2xl font-semibold">Stay ahead of demand swings</h2>
          </div>
          <Button variant="outline">
            <AlertTriangle className="w-4 h-4" />
            Configure notifications
          </Button>
        </div>
        <p className="text-muted-foreground">
          Eco Pulse alerts drivers when nearby demand spikes, notifies riders about circle activity, and gives admins real-time insights to manage fleets efficiently.
        </p>
      </section>
    </div>
  </div>
);

export default EcoPulse;
