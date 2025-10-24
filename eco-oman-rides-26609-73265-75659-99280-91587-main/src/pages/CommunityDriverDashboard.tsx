import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gauge,
  Leaf,
  Users,
  Star,
  Zap,
  Route,
  Radar,
  PlusCircle,
  ClipboardCheck,
  BookMarked,
  RefreshCcw,
  ShieldCheck,
  Timer,
  MapPin,
  Car,
  Flame,
  Trophy,
  Navigation,
  AlertTriangle,
  MessageCircle,
  Activity,
  Share2,
  Radio,
  Home,
  Wallet,
  BarChart3,
  User,
  Map,
  TrendingUp,
  Clock,
  Sparkles,
  Ghost,
} from "lucide-react";
import type { LatLngExpression, LatLngLiteral } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import OmanMap, { type MapStop } from "@/components/maps/OmanMap";
import CommunityBottomNav from "@/components/CommunityBottomNav";

type TimelineStatus = "completed" | "current" | "upcoming";

const EARTH_RADIUS_KM = 6371;
const AVERAGE_SPEED_KPH = 42;

const timelineStatusStyles: Record<TimelineStatus, string> = {
  completed: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  current: "border-sky-400/40 bg-sky-500/10 text-sky-100",
  upcoming: "border-white/10 bg-white/5 text-muted-foreground",
};

const timelineStatusLabels: Record<TimelineStatus, string> = {
  completed: "Completed",
  current: "In progress",
  upcoming: "Upcoming",
};

const clockFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });

const formatClock = () => clockFormatter.format(new Date());

const formatDistanceLabel = (distanceKm: number) =>
  `${distanceKm < 10 ? distanceKm.toFixed(1) : distanceKm.toFixed(0)} km`;

const normalizeLatLng = (value: LatLngExpression): LatLngLiteral => {
  if (Array.isArray(value)) {
    const [lat, lng] = value;
    return { lat, lng };
  }

  const candidate = value as { lat?: number; lng?: number; lon?: number };
  if (typeof candidate.lat === "number") {
    return {
      lat: candidate.lat,
      lng: typeof candidate.lng === "number" ? candidate.lng : candidate.lon ?? 0,
    };
  }

  return { lat: 0, lng: 0 };
};

const haversineDistance = (from: LatLngLiteral, to: LatLngLiteral): number => {
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const root = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(root)));
};

const DEFAULT_ROUTE_STATS = {
  distanceKm: 18.6,
  etaMinutes: 32,
};

const circleRouteTemplates: Record<string, MapStop[]> = {
  "Wave Muscat Morning": [
    {
      label: "Al Mouj Community Hub",
      description: "Women-first assembly point",
      timestamp: "07:05 • Departed",
      color: "#34d399",
      lat: 23.6139,
      lng: 58.2956,
    },
    {
      label: "Wave Muscat — Gate 5",
      description: "Women-only riders aboard",
      timestamp: "07:12 • Completed",
      color: "#a855f7",
      lat: 23.6103,
      lng: 58.341,
    },
    {
      label: "Qurum Park & Ride",
      description: "Merge with CBD express",
      timestamp: "07:28 • ETA",
      color: "#22d3ee",
      lat: 23.6024,
      lng: 58.4646,
    },
    {
      label: "CBD, Ruwi",
      description: "Finance district drop",
      timestamp: "07:45 • Final",
      color: "#facc15",
      lat: 23.588,
      lng: 58.533,
    },
  ],
  "Seeb Innovation Loop": [
    {
      label: "Al Hail North Hub",
      description: "Tech circles departure",
      timestamp: "07:00 • Departed",
      color: "#34d399",
      lat: 23.668,
      lng: 58.168,
    },
    {
      label: "Muscat Mall Transit",
      description: "Car share handshake",
      timestamp: "07:18 • Completed",
      color: "#38bdf8",
      lat: 23.609,
      lng: 58.293,
    },
    {
      label: "Knowledge Oasis Oman",
      description: "Innovation park arrival",
      timestamp: "07:34 • ETA",
      color: "#f97316",
      lat: 23.585,
      lng: 58.198,
    },
    {
      label: "Airport Heights Link",
      description: "Optional extension",
      timestamp: "07:46 • Optional",
      color: "#facc15",
      lat: 23.595,
      lng: 58.276,
    },
  ],
  "CBD Express Merge": [
    {
      label: "Madinat Qaboos Plaza",
      description: "Premium pickup zone",
      timestamp: "07:10 • Boarding",
      color: "#34d399",
      lat: 23.601,
      lng: 58.422,
    },
    {
      label: "Azaiba Heights",
      description: "Corporate shuttle sync",
      timestamp: "07:18 • Completed",
      color: "#38bdf8",
      lat: 23.602,
      lng: 58.377,
    },
    {
      label: "Qurum Business Park",
      description: "Add-on riders waiting",
      timestamp: "07:32 • ETA",
      color: "#a855f7",
      lat: 23.611,
      lng: 58.479,
    },
    {
      label: "CBD, Ruwi",
      description: "Final handoff",
      timestamp: "07:48 • Final",
      color: "#facc15",
      lat: 23.588,
      lng: 58.533,
    },
  ],
};

const missionUpdateBase = [
  {
    title: "Women-only channel synced",
    detail: "New rider from Wave Muscat confirmed seat three.",
    time: "07:11",
    accent: "text-fuchsia-300",
  },
  {
    title: "Eco-points surge",
    detail: "Merged with CBD express — projected +42 credits on arrival.",
    time: "07:16",
    accent: "text-emerald-300",
  },
  {
    title: "AI coach insight",
    detail: "Hold four minutes at Qurum for finance cluster pickup.",
    time: "07:18",
    accent: "text-sky-300",
  },
];

const liveMessagesBase = [
  {
    author: "Sara • Wave Muscat",
    message: "Thanks for enabling the women-only filter — all riders checked in.",
    time: "07:09",
  },
  {
    author: "Maha • CBD Ops",
    message: "Front seat reserved for Rasha at Qurum park-and-ride.",
    time: "07:14",
  },
  {
    author: "Circle Bot",
    message: "Auto-sharing eco stats with Seeb innovation loop riders.",
    time: "07:15",
  },
];

const quickStats = [
  {
    icon: Users,
    label: "Community members",
    value: "247",
    helper: "+12 this week",
  },
  {
    icon: Leaf,
    label: "Eco credits earned",
    value: "3,420",
    helper: "+280 this week",
  },
  {
    icon: Star,
    label: "Community rating",
    value: "4.9",
    helper: "Top community driver",
  },
  {
    icon: Activity,
    label: "Events hosted",
    value: "18",
    helper: "3 upcoming",
  },
  {
    icon: Share2,
    label: "Connections made",
    value: "156",
    helper: "Active network",
  },
];

const reputation = [
  {
    label: "Community hubs managed",
    value: "6",
    icon: Home,
  },
  {
    label: "Social events organized",
    value: "24",
    icon: Activity,
  },
  {
    label: "Neighborhood safety",
    value: "4.9",
    icon: ShieldCheck,
  },
];

const requests = [
  {
    member: "Community Garden Group",
    activity: "Weekend planting event",
    participants: 12,
    note: "Need transportation for tools",
    status: "Planning",
  },
  {
    member: "Women's Tech Circle",
    activity: "Monthly meetup",
    participants: 8,
    note: "Safe ride coordination needed",
    status: "Confirmed",
  },
  {
    member: "Youth Sports Club",
    activity: "Basketball practice",
    participants: 15,
    note: "Evening pickup required",
    status: "Pending",
  },
];

const leaderboard = [
  {
    name: "Maha Al Habsi",
    metric: "Eco credits",
    value: "2,120",
  },
  {
    name: "Khalid Said",
    metric: "CO₂ saved",
    value: "132 kg",
  },
  {
    name: "Selma Noor",
    metric: "Reliability",
    value: "4.9",
  },
];

const CommunityDriverDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const circleKeys = useMemo(() => Object.keys(circleRouteTemplates), []);
  const defaultCircle = circleKeys[0];

  const [selectedCircle, setSelectedCircle] = useState(defaultCircle);
  const [autoRoute, setAutoRoute] = useState(true);
  const [isTracking, setIsTracking] = useState(true);
  const [womenOnly, setWomenOnly] = useState(true);
  const [dynamicStop, setDynamicStop] = useState<MapStop | null>(null);
  const [lastPinnedStop, setLastPinnedStop] = useState<MapStop | null>(null);
  const [routeStats, setRouteStats] = useState(DEFAULT_ROUTE_STATS);
  const [lastRouteSync, setLastRouteSync] = useState(formatClock());

  const actions = useMemo(
    () => [
      {
        label: "Plan Community Event",
        icon: Activity,
        variant: "hero" as const,
        onClick: () => navigate("/community-events"),
      },
      {
        label: "Manage Hub",
        icon: Home,
        variant: "secondary" as const,
        onClick: () => navigate("/hub-management"),
      },
      {
        label: "Organize Ride",
        icon: PlusCircle,
        variant: "glass" as const,
        onClick: () => navigate("/offer-ride"),
      },
      {
        label: "Ghost Rides",
        icon: Ghost,
        variant: "outline" as const,
        onClick: () => navigate("/ghost-rides"),
      },
      {
        label: "Community Requests",
        icon: Users,
        variant: "accent" as const,
        onClick: () => document.getElementById("requests")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "View Eco Passport",
        icon: BookMarked,
        variant: "outline" as const,
        onClick: () => navigate("/eco-passport"),
      },
      {
        label: "Switch Role",
        icon: RefreshCcw,
        variant: "ghost" as const,
        onClick: () => navigate("/role-selection/community"),
      },
    ],
    [navigate],
  );

  const baseRoute = useMemo(
    () => circleRouteTemplates[selectedCircle] ?? circleRouteTemplates[defaultCircle],
    [selectedCircle, defaultCircle],
  );

  useEffect(() => {
    setDynamicStop(null);
    setLastPinnedStop(null);
  }, [selectedCircle]);

  const stops = useMemo(() => {
    const route = [...baseRoute];
    if (!dynamicStop) {
      return route;
    }
    const withDynamic = [...route];
    const insertIndex = Math.max(1, route.length - 1);
    withDynamic.splice(insertIndex, 0, dynamicStop);
    return withDynamic;
  }, [baseRoute, dynamicStop]);

  const currentStopIndex = Math.max(1, Math.min(2, stops.length - 2));
  const livePosition = stops[currentStopIndex] ?? stops[stops.length - 1];
  const liveTrail = useMemo(
    () => stops.slice(0, currentStopIndex + 1).map(({ lat, lng }) => ({ lat, lng })),
    [stops, currentStopIndex],
  );

  const timeline = useMemo(
    () =>
      stops.map((stop, index) => {
        let status: TimelineStatus = "upcoming";
        if (index < currentStopIndex) {
          status = "completed";
        } else if (index === currentStopIndex) {
          status = "current";
        }
        return { ...stop, status };
      }),
    [stops, currentStopIndex],
  );

  const activeStop = timeline[currentStopIndex];
  const nextStop = timeline[currentStopIndex + 1];

  const liveMessages = useMemo(() => {
    const messages = [...liveMessagesBase];
    if (lastPinnedStop) {
      messages.unshift({
        author: "You",
        message: `Inserted ${lastPinnedStop.label} into ${selectedCircle}. Riders notified.`,
        time: lastPinnedStop.timestamp ?? formatClock(),
      });
    }
    return messages.slice(0, 4);
  }, [lastPinnedStop, selectedCircle]);

  const missionFeed = useMemo(() => {
    const updates = [
      {
        title: "Route recalculated",
        detail: `ETA ${routeStats.etaMinutes} min • ${formatDistanceLabel(routeStats.distanceKm)} remaining.`,
        time: lastRouteSync,
        accent: "text-emerald-300",
      },
      ...missionUpdateBase,
    ];

    if (lastPinnedStop) {
      updates.unshift({
        title: "Waypoint staged",
        detail: `${lastPinnedStop.label} added before final drop.`,
        time: lastPinnedStop.timestamp ?? formatClock(),
        accent: "text-amber-300",
      });
    }

    return updates.slice(0, 5);
  }, [lastPinnedStop, lastRouteSync, routeStats.distanceKm, routeStats.etaMinutes]);

  const handleRouteReady = useCallback((coordinates: LatLngExpression[]) => {
    if (!coordinates.length) {
      return;
    }

    let total = 0;
    let previous = normalizeLatLng(coordinates[0]);

    for (const point of coordinates.slice(1)) {
      const current = normalizeLatLng(point);
      total += haversineDistance(previous, current);
      previous = current;
    }

    const distanceKm = Math.max(0.1, Number(total.toFixed(2)));
    const etaMinutes = Math.max(5, Math.round((distanceKm / AVERAGE_SPEED_KPH) * 60));

    setRouteStats({
      distanceKm: Number(distanceKm.toFixed(1)),
      etaMinutes,
    });
    setLastRouteSync(formatClock());
  }, []);

  const handleMapClick = useCallback(
    (coords: LatLngLiteral) => {
      const newStop: MapStop = {
        label: "Proposed community pickup",
        description: `Manual waypoint near ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`,
        timestamp: formatClock(),
        color: "#fb923c",
        lat: coords.lat,
        lng: coords.lng,
      };
      setDynamicStop(newStop);
      setLastPinnedStop(newStop);
      toast({
        title: "Waypoint staged",
        description: "Recalculating OSRM route with the new pickup before final drop.",
      });
    },
    [toast],
  );

  const handleSOS = useCallback(() => {
    toast({
      title: "SOS dispatched",
      description: "Care team and eight verified guardians notified with live location.",
    });
  }, [toast]);

  const handleBroadcast = useCallback(() => {
    toast({
      title: "Broadcast shared",
      description: "Circle received a six-minute delay update and adjusted ETA.",
    });
  }, [toast]);

  const handleShare = useCallback(() => {
    setIsTracking(true);
    toast({
      title: "Live link sent",
      description: "Riders can now follow your Oman route in real time.",
    });
  }, [toast]);

  const handleGhostRide = useCallback(() => {
    toast({
      title: "Ghost scan active",
      description: "Monitoring for stalled vehicles along the Muscat corridor.",
    });
  }, [toast]);

  const handleGuardianPing = useCallback(() => {
    toast({
      title: "Guardians pinged",
      description: "Women-only circle guardians acknowledged the live tracking link.",
    });
  }, [toast]);

  const handleSafeArrival = useCallback(() => {
    toast({
      title: "Arrival logged",
      description: "Eco credits and safety streak updated for today's mission.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-foreground relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />

        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-teal-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-10 space-y-10 relative z-10">
        <header className="space-y-4 text-center md:text-left animate-fade-in">
          <p className="uppercase tracking-widest text-xs text-cyan-400 font-semibold">Community Driver Dashboard</p>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Build stronger communities together.
          </h1>
          <p className="text-slate-300 max-w-3xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Connect neighbors, organize events, and create lasting bonds while earning eco rewards for sustainable community building.
          </p>
        </header>

        {/* Driver Verification Status Banner */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {(() => {
            const verificationStatus = localStorage.getItem('driverVerificationStatus');
            if (!verificationStatus || verificationStatus === 'none') {
              return (
                <Card className="glass-card border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-amber-500/20">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-400">Verification Required</p>
                        <p className="text-sm text-amber-300/80">Complete your driver verification to start offering rides</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/driver-verification')}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      Verify Now
                    </Button>
                  </div>
                </Card>
              );
            } else if (verificationStatus === 'pending') {
              return (
                <Card className="glass-card border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-500/20">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-400">Verification Pending</p>
                        <p className="text-sm text-blue-300/80">Your documents are being reviewed. We'll notify you within 24-48 hours.</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <Timer className="w-3 h-3 mr-1" />
                      In Review
                    </Badge>
                  </div>
                </Card>
              );
            } else if (verificationStatus === 'approved') {
              return (
                <Card className="glass-card border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-emerald-500/20">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-400">Verification Approved</p>
                        <p className="text-sm text-emerald-300/80">You're verified! Start offering rides and earn rewards.</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </Card>
              );
            } else if (verificationStatus === 'rejected') {
              return (
                <Card className="glass-card border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-red-500/20">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-red-400">Verification Rejected</p>
                        <p className="text-sm text-red-300/80">Please review your documents and try again.</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate('/driver-verification')}
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Re-verify
                    </Button>
                  </div>
                </Card>
              );
            }
            return null;
          })()}
        </div>

        {/* Enhanced Quick Stats with wow-factor animations */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {quickStats.map(({ icon: Icon, label, value, helper }, index) => (
            <Card key={label} className="glass-card rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-500/30 hover:scale-105 transition-all duration-500 animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Animated glow effects */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />

              <CardHeader className="flex items-center justify-between pb-4">
                <CardTitle className="text-sm text-slate-400 font-medium uppercase tracking-wide">{label}</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {value}
                </p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{helper}</p>
                <div className="w-full bg-slate-800/50 rounded-full h-1 mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(parseInt(value.replace(/[^\d]/g, '')) / 20 * 100, 100)}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Enhanced Quick Actions with wow-factor */}
        <section className="glass-card rounded-3xl p-8 border border-slate-700/50 hover:border-blue-500/30 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Animated background effects */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/8 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="space-y-2">
                <p className="uppercase tracking-widest text-xs text-blue-400 font-semibold">Quick actions</p>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Your command deck
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/settings")}
                className="border-slate-600/50 hover:border-blue-500/40 hover:bg-blue-500/10 text-slate-300 hover:text-blue-300 px-6 py-3 rounded-xl transition-all duration-300 group"
              >
                <RefreshCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Driver preferences
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {actions.map((action, index) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  onClick={action.onClick}
                  className={`min-h-[64px] rounded-2xl transition-all duration-500 hover:scale-105 animate-fade-in group ${
                    action.variant === 'hero'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60'
                      : action.variant === 'accent'
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60'
                      : 'border-slate-600/50 hover:border-slate-500/60 hover:bg-slate-500/10 text-slate-300 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-semibold text-sm">{action.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
          <div className="glass-card overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-950/40 to-black">
            <div className="flex flex-col gap-3 px-4 pt-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">Community hub</p>
                  <h2 className="text-xl font-semibold text-emerald-100">Neighborhood coordination center</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>Auto route</span>
                    <Switch
                      checked={autoRoute}
                      onCheckedChange={(checked) => setAutoRoute(Boolean(checked))}
                      aria-label="Toggle auto route"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Live tracking</span>
                    <Switch
                      checked={isTracking}
                      onCheckedChange={(checked) => setIsTracking(Boolean(checked))}
                      aria-label="Toggle live tracking"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Women-only</span>
                    <Switch
                      checked={womenOnly}
                      onCheckedChange={(checked) => setWomenOnly(Boolean(checked))}
                      aria-label="Toggle women only filter"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {circleKeys.map((circle) => (
                  <Button
                    key={circle}
                    variant={circle === selectedCircle ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCircle(circle)}
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide transition ${
                      circle === selectedCircle
                        ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
                        : "border-white/10 text-muted-foreground hover:text-emerald-100"
                    }`}
                  >
                    {circle}
                  </Button>
                ))}
              </div>
            </div>
            <div className="px-2 pb-3 md:px-3">
              <OmanMap
                stops={stops}
                livePosition={livePosition}
                liveTrail={liveTrail}
                autoRoute={autoRoute}
                routeStroke="#34d399"
                onMapClick={handleMapClick}
                onRouteReady={handleRouteReady}
                isTracking={isTracking}
                height="240px"
              >
                <div className="pointer-events-none flex h-full flex-col justify-between gap-2 p-3 md:p-4">
                  <div className="pointer-events-auto flex w-full flex-col gap-3 md:max-w-sm">
                    <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-2 shadow-lg backdrop-blur">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-1 items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">
                            <Navigation className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Active route</p>
                            <p className="text-lg font-semibold leading-tight text-emerald-100">{selectedCircle}</p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                            isTracking
                              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100"
                              : "border-white/20 bg-white/10 text-muted-foreground"
                          }`}
                        >
                          {isTracking ? "Live" : "Paused"}
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-emerald-100/80">
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
                          <p className="text-[10px] uppercase text-emerald-200/70">Distance</p>
                          <p className="text-base font-semibold text-emerald-100">{formatDistanceLabel(routeStats.distanceKm)}</p>
                        </div>
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
                          <p className="text-[10px] uppercase text-emerald-200/70">ETA</p>
                          <p className="text-base font-semibold text-emerald-100">{routeStats.etaMinutes} min</p>
                        </div>
                        <div className="col-span-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
                          <p className="text-[10px] uppercase text-emerald-200/70">Next stop</p>
                          <p className="text-sm font-semibold text-emerald-100">{nextStop ? nextStop.label : "Final destination"}</p>
                          <p className="text-[11px] text-emerald-200/70">{nextStop?.timestamp ?? "Awaiting routing signal"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/60 p-4 text-xs text-emerald-100/80 shadow-lg backdrop-blur">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
                          <Leaf className="h-4 w-4" />
                          Eco credits surge
                        </span>
                        <span className="text-[10px] uppercase text-emerald-200/70">{lastRouteSync}</span>
                      </div>
                      <p className="mt-2">
                        Projected <span className="font-semibold text-emerald-200">+42 credits</span> if circle merge holds through
                        Qurum.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-wide text-emerald-100"
                        >
                          Women-only {womenOnly ? "on" : "off"}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-wide text-emerald-100"
                        >
                          Seats filled 86%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                    <div className="pointer-events-auto flex w-full flex-col gap-1 rounded-2xl border border-white/10 bg-black/60 p-2 text-xs text-white/80 shadow-lg backdrop-blur md:max-w-xs">
                      <div className="flex items-center justify-between text-sm font-semibold text-white">
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-emerald-200" />
                          Circle feed
                        </span>
                        <span className="text-[10px] uppercase text-emerald-200/70">Live</span>
                      </div>
                      <p>
                        Rasha: “Confirming we keep the stop at Qurum, arriving <span className="font-semibold text-emerald-200">07:26</span>.”
                      </p>
                      {lastPinnedStop && (
                        <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-amber-100">
                          Waypoint staged near {lastPinnedStop.label}.
                        </p>
                      )}
                    </div>
                    <Button
                      variant="secondary"
                      onClick={handleSOS}
                      className="pointer-events-auto flex items-center gap-2 rounded-full border border-rose-400/60 bg-rose-600/20 px-5 py-3 text-sm font-semibold text-rose-100 shadow-lg backdrop-blur transition hover:bg-rose-600/30"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      SOS ready
                    </Button>
                  </div>
                </div>
              </OmanMap>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Route timeline</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-wide text-emerald-100"
                  >
                    {stops.length} stops
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {timeline.map((stop, index) => (
                  <div
                    key={`${stop.label}-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: stop.color ?? "#34d399" }}
                        />
                        <div>
                          <p className="font-semibold text-foreground">{stop.label}</p>
                          <p className="text-xs text-muted-foreground">{stop.description}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${timelineStatusStyles[stop.status]}`}
                      >
                        {timelineStatusLabels[stop.status]}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <Navigation className="h-3 w-3" />
                        {stop.timestamp ?? "Live update"}
                      </span>
                      {index === currentStopIndex && (
                        <span className="flex items-center gap-1 text-secondary">
                          <Activity className="h-3 w-3" />
                          On route
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-xl">Live circle chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ScrollArea className="h-56 pr-2">
                  <div className="space-y-3">
                    {liveMessages.map((message, index) => (
                      <div
                        key={`${message.author}-${index}`}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
                      >
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">{message.author}</span>
                          <span>{message.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground/90">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    Share live link
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleBroadcast}>
                    <Radio className="h-4 w-4" />
                    Broadcast delay
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">Safety console</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Guardian sync</p>
                  <p className="mt-1 text-sm text-muted-foreground/90">
                    Live location shared with <span className="font-semibold text-foreground">8 verified guardians</span>.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button variant="hero" onClick={handleSOS} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Trigger SOS
                  </Button>
                  <Button variant="outline" onClick={handleGhostRide} className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Ghost ride scan
                  </Button>
                  <Button variant="ghost" onClick={handleGuardianPing} className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Ping guardians
                  </Button>
                  <Button variant="secondary" onClick={handleSafeArrival} className="flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Mark safe arrival
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Eco Wallet</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="rounded-xl border border-white/10 p-4">
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="text-2xl font-bold text-primary">1,980</p>
                  <p className="text-xs text-muted-foreground">Tier: Gold • CO₂ saved: 124.7 kg</p>
                </div>
                <Button variant="ghost" className="w-full" onClick={() => navigate("/marketplace") }>
                  Visit Marketplace
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Route className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">AI Route Coach</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass-card rounded-xl p-4 border border-primary/20">
                  <p className="text-muted-foreground">Projected time save</p>
                  <p className="text-2xl font-bold text-primary">11 mins</p>
                </div>
                <div className="glass-card rounded-xl p-4 border border-primary/20">
                  <p className="text-muted-foreground">Emission drop</p>
                  <p className="text-2xl font-bold text-secondary">-7.8%</p>
                </div>
                <div className="glass-card rounded-xl p-4 border border-primary/20">
                  <p className="text-muted-foreground">Match boost</p>
                  <p className="text-2xl font-bold text-accent">+3 riders</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-primary" />
                  Merge Wave Muscat &amp; Seeb pickups to cut detours by 6 mins.
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-primary" />
                  Suggest drop at Oman Avenues Mall for two new riders.
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-primary" />
                  AI recommends flexible departure window 7:05–7:15.
                </li>
              </ul>
              <Button variant="hero" onClick={() => navigate("/ai-route-coach") }>
                Open full coach
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-secondary" />
                <CardTitle className="text-xl">Publish ride</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="rounded-xl border border-white/10 p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Origin</p>
                  <p className="font-semibold">Al Mouj, Gate 4</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="font-semibold">CBD, Ruwi</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Departure</p>
                    <p className="font-semibold">07:10</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Stops</p>
                  <p className="font-semibold">Wave Muscat • Qurm • Hamriya</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/offer-ride") }>
                Publish this ride
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/offer-ride") }>
                Open instant match view
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="rides" className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Manage requests</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/offer-ride") }>
                  Adjust seats
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {requests.map((request) => (
                <div key={request.member} className="glass-card rounded-xl p-4 border border-white/10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">{request.activity}</p>
                    <p className="text-xs text-muted-foreground">{request.member} • {request.participants} participants</p>
                    <p className="text-xs text-primary/80">{request.note}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      {request.status === "Planning" ? "Plan" : request.status === "Confirmed" ? "Manage" : "Review"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Message
                    </Button>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">{request.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Radar className="w-5 h-5 text-secondary" />
                <CardTitle className="text-xl">Community reputation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {reputation.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => navigate("/analytics") }>
                View detailed stats
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Radar className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Mission feed</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {missionFeed.map((update, index) => (
                <div
                  key={`${update.title}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-semibold ${update.accent}`}>{update.title}</span>
                    <span className="text-xs text-muted-foreground">{update.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground/90">{update.detail}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => navigate("/tracking")}>
                Open mission log
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-accent" />
                <CardTitle className="text-xl">Leaderboards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {leaderboard.map((entry) => (
                <div key={entry.name} className="rounded-xl border border-white/10 p-4 backdrop-blur">
                  <p className="font-semibold text-foreground">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.metric}</p>
                  <p className="text-sm text-primary">{entry.value}</p>
                </div>
              ))}
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-xs text-emerald-100">
                <p className="text-sm font-semibold">Today&apos;s impact</p>
                <p className="mt-1 text-muted-foreground/80">
                  {formatDistanceLabel(routeStats.distanceKm)} shared • {routeStats.etaMinutes} min saved.
                </p>
              </div>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/leaderboard")}>
                View community rankings
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <CommunityBottomNav />
    </div>
  );
};

export default CommunityDriverDashboard;
