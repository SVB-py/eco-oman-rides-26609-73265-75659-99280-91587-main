import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Map,
  Leaf,
  Radio,
  Compass,
  Shield,
  MessageSquare,
  RefreshCcw,
  Wallet2,
  Trophy,
  CalendarClock,
  Navigation,
  Share2,
  Ghost,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommunityBottomNav from "@/components/CommunityBottomNav";
import HeatmapCard from "@/components/maps/HeatmapCard";

const quickStats = [
  {
    label: "Seats locked in",
    value: "5",
    detail: "Across 2 daily commutes",
    icon: Users,
  },
  {
    label: "Circles live",
    value: "6",
    detail: "Neighbourhood + office",
    icon: Shield,
  },
  {
    label: "Eco balance",
    value: "880",
    detail: "+60 streak bonus",
    icon: Leaf,
  },
  {
    label: "Live sharers",
    value: "14",
    detail: "Friends sharing now",
    icon: Radio,
  },
];

const trustedCircles = [
  {
    name: "Wave Muscat Neighbours",
    joined: "Jan 2025",
    members: 42,
  },
  {
    name: "CBD Finance Crew",
    joined: "Mar 2025",
    members: 18,
  },
  {
    name: "Women in Tech Muscat",
    joined: "Apr 2025",
    members: 27,
  },
];

const pendingRequests = [
  {
    id: "CR-442",
    driver: "Maha N.",
    route: "Wave Muscat → CBD",
    status: "Awaiting confirmation",
  },
  {
    id: "CR-446",
    driver: "Khalid S.",
    route: "Al Ghubra → Airport",
    status: "Driver reviewing",
  },
];

const rideTimeline = [
  {
    time: "07:05 AM",
    route: "Wave Muscat → CBD",
    detail: "Pickup at Gate 2",
  },
  {
    time: "05:35 PM",
    route: "CBD → Wave Muscat",
    detail: "Return ride, seat confirmed",
  },
];

const CommunityRiderDashboard = () => {
  const navigate = useNavigate();
  const actions = useMemo(
    () => [
      {
        label: "View scout map",
        icon: Map,
        variant: "hero" as const,
        onClick: () => navigate("/eco-pulse"),
      },
      {
        label: "Eco Passport",
        icon: Leaf,
        variant: "accent" as const,
        onClick: () => navigate("/eco-passport"),
      },
      {
        label: "Find ride",
        icon: Compass,
        variant: "secondary" as const,
        onClick: () => navigate("/request-ride"),
      },
      {
        label: "Ghost Rides",
        icon: Ghost,
        variant: "outline" as const,
        onClick: () => navigate("/ghost-rides"),
      },
      {
        label: "Share live location",
        icon: Share2,
        variant: "glass" as const,
        onClick: () => navigate("/tracking"),
      },
      {
        label: "Women-only rides",
        icon: Shield,
        variant: "ghost" as const,
        onClick: () => navigate("/request-ride?womenOnly=true"),
      },
      {
        label: "Explore circles",
        icon: Users,
        variant: "glass" as const,
        onClick: () => navigate("/community-circles"),
      },
      {
        label: "Manage requests",
        icon: MessageSquare,
        variant: "secondary" as const,
        onClick: () => document.getElementById("requests")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Retry sync",
        icon: RefreshCcw,
        variant: "ghost" as const,
        onClick: () => window.location.reload(),
      },
    ],
    [navigate],
  );

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-foreground relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 py-10 space-y-10 relative z-10">
        <header className="space-y-4 text-center md:text-left">
          <p className="uppercase tracking-widest text-xs text-muted-foreground">Community Rider Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold">Cruise into neighbour rides fast.</h1>
          <p className="text-muted-foreground max-w-3xl">
            Match with trusted circles, keep tabs on live rides, and grow eco rewards — all powered by EcoPool360’s realtime pulse.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map(({ icon: Icon, label, value, detail }) => (
            <Card key={label} className="glass-card">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground font-medium">{label}</CardTitle>
                <Icon className="w-5 h-5 text-secondary" />
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Quick actions</p>
              <h2 className="text-2xl font-semibold">Get moving instantly</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/settings") }>
              Rider preferences
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {actions.map((action) => (
              <Button key={action.label} variant={action.variant} onClick={action.onClick} className="min-h-[56px]">
                <action.icon className="w-4 h-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Live community pulse</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <HeatmapCard height="250px" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground text-xs">Top pickup point</p>
                  <p className="font-semibold">Wave Muscat Gate 2</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground text-xs">Active circles</p>
                  <p className="font-semibold">14 live now</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground text-xs">CO₂ saved today</p>
                  <p className="font-semibold">21.6 kg</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate("/eco-pulse") }>
                  View scout map
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wallet2 className="w-5 h-5 text-accent" />
                <CardTitle className="text-xl">EcoWallet</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold text-primary">880</p>
                <p className="text-xs text-muted-foreground">Tier: Silver • CO₂ saved: 58.2 kg</p>
              </div>
              <div className="rounded-xl border border-white/10 p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => navigate("/eco-passport?showPerks=true")}>
                <p className="text-xs text-muted-foreground">Perks</p>
                <p className="font-semibold">Free sustenance drink • 2 priority matches</p>
                <p className="text-xs text-primary mt-1">Click to view all perks →</p>
              </div>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/eco-passport") }>
                View Eco Passport
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CalendarClock className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Ride timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {rideTimeline.map((ride) => (
                <div key={ride.time} className="rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{ride.time}</span>
                    <span className="text-xs text-muted-foreground">Seat confirmed</span>
                  </div>
                  <p>{ride.route}</p>
                  <p className="text-xs text-muted-foreground">{ride.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="requests" className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-secondary" />
                <CardTitle className="text-xl">Pending requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {pendingRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{request.route}</span>
                    <span className="text-xs text-primary uppercase tracking-wide">{request.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Driver {request.driver}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="secondary" size="sm" onClick={() => navigate("/tracking") }>
                      View details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Trusted circles</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {trustedCircles.map((circle) => (
                <div key={circle.name} className="rounded-xl border border-white/10 p-4">
                  <p className="font-semibold">{circle.name}</p>
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Joined {circle.joined}</span>
                    <span>{circle.members} members</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => navigate("/community-circles") }>
                Explore more circles
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-accent" />
                <CardTitle className="text-xl">Leaderboards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-semibold">Eco credits</p>
                <p className="text-xs text-muted-foreground">Top riders this week</p>
                <p className="text-sm text-primary">#1 Aisha Z. · #2 Priya V. · #3 Omar L.</p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="font-semibold">Streaks</p>
                <p className="text-xs text-muted-foreground">Keep your run alive</p>
                <p className="text-sm text-primary">18 day streak — unlock Gold tier</p>
              </div>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/leaderboard") }>
                View complete rankings
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <CommunityBottomNav />
    </div>
  );
};

export default CommunityRiderDashboard;
