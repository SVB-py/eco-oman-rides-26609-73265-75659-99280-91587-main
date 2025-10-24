import {
  Activity,
  Download,
  Gauge,
  Leaf,
  Radar,
  ShieldCheck,
  Users,
  BarChart3,
  Settings,
  AlertTriangle,
  Database,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeatmapCard from "@/components/maps/HeatmapCard";

const systemMetrics = [
  {
    label: "Live rides",
    value: "128",
    change: "+18% vs yesterday",
    icon: Activity,
  },
  {
    label: "System reliability",
    value: "99.4%",
    change: "No incidents",
    icon: ShieldCheck,
  },
  {
    label: "CO₂ saved today",
    value: "82.6 kg",
    change: "+9.2 kg",
    icon: Leaf,
  },
  {
    label: "Active circles",
    value: "42",
    change: "7 high demand",
    icon: Users,
  },
];

const AuroraDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-background to-black text-foreground">
    <div className="container mx-auto px-4 py-10 space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <p className="uppercase tracking-widest text-xs text-muted-foreground">Aurora Control Center</p>
        <h1 className="text-4xl md:text-5xl font-bold">Monitor, optimise, and celebrate eco impact.</h1>
        <p className="text-muted-foreground max-w-3xl">
          Real-time command hub for school and community admins. Track system health, manage users, export analytics, and surface emerging ride demand instantly.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="hero" onClick={() => window.print()}>
            <Download className="w-4 h-4" />
            Export analytics
          </Button>
          <Button variant="secondary">
            <Settings className="w-4 h-4" />
            Manage users &amp; groups
          </Button>
          <Button variant="ghost">
            <Radar className="w-4 h-4" />
            View Eco Pulse
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemMetrics.map(({ icon: Icon, label, value, change }) => (
          <Card key={label} className="glass-card">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">{label}</CardTitle>
              <Icon className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Radar className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Pulse heatmap</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <HeatmapCard height="300px" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Top pickup</p>
                <p className="font-semibold">Wave Muscat Gate 2</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Demand surge</p>
                <p className="font-semibold">CBD (18%)</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-muted-foreground">Eco impact</p>
                <p className="font-semibold">+21.6 kg CO₂ saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">System status</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Reliability</p>
              <p className="font-semibold">All services operational</p>
              <p className="text-xs text-muted-foreground">No outages in the last 7 days</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Alerts</p>
              <p className="flex items-center gap-2 font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                1 pending: Route delay in Seeb
              </p>
            </div>
            <Button variant="ghost" className="w-full">
              View incident log
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Ride analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs text-muted-foreground">Ride completion</p>
                <p className="text-2xl font-bold text-primary">94.2%</p>
                <p className="text-xs text-muted-foreground">3 cancellations flagged for review</p>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <p className="text-xs text-muted-foreground">Average fill rate</p>
                <p className="text-2xl font-bold text-secondary">82%</p>
                <p className="text-xs text-muted-foreground">+6 pts vs last week</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 p-6 text-center text-muted-foreground">
              Trend chart placeholder — rides per hour, segmented by school vs community.
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">User management</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Approve new drivers</p>
              <p className="text-xs text-muted-foreground">3 pending verifications</p>
              <Button variant="secondary" size="sm" className="mt-3">
                Review queue
              </Button>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Active student accounts</p>
              <p className="text-xs text-muted-foreground">1,248 verified · 38 awaiting docs</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Community circles</p>
              <p className="text-xs text-muted-foreground">42 active · 6 archived</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Data exports</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Daily ride summary</p>
              <p className="text-xs text-muted-foreground">CSV, XLSX, API webhook</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Eco impact report</p>
              <p className="text-xs text-muted-foreground">Weekly digest sent to stakeholders</p>
            </div>
            <Button variant="hero" className="w-full">
              Export latest data
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Upcoming events</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">System upgrade window</p>
              <p className="text-xs text-muted-foreground">Sunday 01:00 – 03:00 GST</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-semibold">Community townhall</p>
              <p className="text-xs text-muted-foreground">Thursday 6 PM · Eco rewards roadmap</p>
            </div>
            <Button variant="ghost" className="w-full">
              Notify stakeholders
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  </div>
);

export default AuroraDashboard;
