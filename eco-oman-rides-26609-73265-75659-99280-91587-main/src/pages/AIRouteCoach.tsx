import { Route, Clock, Gauge, Leaf, Sparkles, Share2, Download, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const routeSteps = [
  {
    title: "Seeb Heights pickup",
    detail: "Merge two stops, reduce idle time by 4 mins",
  },
  {
    title: "Wave Muscat cluster",
    detail: "Stagger entry via Gate 3 to avoid bottleneck",
  },
  {
    title: "Qurum boulevard",
    detail: "Use eco lane between 07:05–07:15 for 2.5 km",
  },
];

const AIRouteCoach = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-background to-black text-foreground">
    <div className="container mx-auto px-4 py-10 space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <p className="uppercase tracking-widest text-xs text-muted-foreground">AI Route Coach</p>
        <h1 className="text-4xl md:text-5xl font-bold">Optimise every kilometre with predictive coaching.</h1>
        <p className="text-muted-foreground max-w-3xl">
          Get instant route suggestions, see projected time savings, and broadcast smarter pickups to your riders or students.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="hero">
            <Sparkles className="w-4 h-4" />
            Generate new optimisation
          </Button>
          <Button variant="secondary">
            <Share2 className="w-4 h-4" />
            Share to circle
          </Button>
          <Button variant="ghost" onClick={() => window.print()}>
            <Download className="w-4 h-4" />
            Export route sheet
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Projected time saved</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">14 mins</CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Emission drop</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-secondary">-9.5%</CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Idle time reduced</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-accent">-12 mins</CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Seats optimised</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">+3 riders</CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Route className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Optimised route steps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {routeSteps.map((step) => (
              <div key={step.title} className="rounded-xl border border-white/10 p-4">
                <p className="font-semibold">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
            ))}
            <Button variant="secondary" className="w-full">
              Launch optimisation session
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Performance snapshot</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Route alignment</p>
              <p className="font-semibold">92% — Excellent</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Passenger satisfaction</p>
              <p className="font-semibold">4.8 / 5</p>
            </div>
            <Button variant="ghost" className="w-full">
              View historic comparisons
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Departure window recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p className="rounded-xl border border-white/10 p-4">
              Leave between 07:03–07:12 for optimal traffic flow and 2 additional quick-match riders.
            </p>
            <Button variant="secondary" className="w-full">
              Broadcast update
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-secondary" />
              <CardTitle className="text-xl">Eco impact forecast</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">CO₂ saved</p>
              <p className="font-semibold">+12.4 kg • Equivalent to 0.6 trees</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground">Fuel savings</p>
              <p className="font-semibold">3.2 L per ride loop</p>
            </div>
            <Button variant="ghost" className="w-full">
              Share eco summary
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Integration</p>
            <h2 className="text-2xl font-semibold">Available for School Drivers &amp; Admins</h2>
          </div>
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4" />
            Sync with Aurora dashboard
          </Button>
        </div>
        <p className="text-muted-foreground">
          Launch the coach from any school or community driver dashboard. Aurora admins can push route optimisations to specific fleets and monitor the impact in real time.
        </p>
      </section>
    </div>
  </div>
);

export default AIRouteCoach;
