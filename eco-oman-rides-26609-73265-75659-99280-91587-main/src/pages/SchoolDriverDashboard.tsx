import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gauge,
  Users,
  Leaf,
  Star,
  Navigation,
  Activity,
  ShieldCheck,
  Clock3,
  MapPin,
  Radar,
  Sparkles,
  Route,
  PlusCircle,
  RefreshCcw,
  Car,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Timer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeatmapCard from "@/components/maps/HeatmapCard";

const quickStats = [
  {
  icon: Car,
    label: "Rides offered",
    value: "24",
    sub: "+6 this week",
  },
  {
    icon: Users,
    label: "Seats filled",
    value: "118",
    sub: "92% avg occupancy",
  },
  {
    icon: Leaf,
    label: "Eco credits",
    value: "2,340",
    sub: "+180 this week",
  },
  {
    icon: Star,
    label: "Reliability",
    value: "4.9",
    sub: "Top 5% drivers",
  },
];

const reputationMetrics = [
  {
    label: "Verified communities",
    value: "6",
    icon: ShieldCheck,
  },
  {
    label: "Women-only journeys",
    value: "18",
    icon: Sparkles,
  },
  {
    label: "Avg response time",
    value: "3m 12s",
    icon: Clock3,
  },
];

const rideRequests = [
  {
    id: "RR-1024",
    route: "Al Khuwair → Sultan Qaboos School",
    seats: 3,
    status: "Awaiting approval",
    eta: "Start 06:40 AM",
  },
  {
    id: "RR-1027",
    route: "Madinat → Beacon Private School",
    seats: 2,
    status: "Pending info",
    eta: "Start 06:55 AM",
  },
  {
    id: "RR-1031",
    route: "Qurum → ABA School",
    seats: 4,
    status: "Ready to board",
    eta: "Start 07:10 AM",
  },
];

const leaderboard = [
  {
    driver: "Ahmed Al Lamki",
    ecoImpact: "142 kg CO₂",
    credits: "2,340",
    reliability: "4.9",
  },
  {
    driver: "Fatma Al Riyami",
    ecoImpact: "118 kg CO₂",
    credits: "2,120",
    reliability: "4.8",
  },
  {
    driver: "Ali Al Busaidi",
    ecoImpact: "101 kg CO₂",
    credits: "1,980",
    reliability: "4.7",
  },
];

const SchoolDriverDashboard = () => {
  const navigate = useNavigate();
  
  // Attendance state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState(() => {
    // Initialize with dummy data for today and yesterday
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    return {
      [today]: [
        { id: 1, name: "Ahmed Al Saadi", status: "present" },
        { id: 2, name: "Fatima Al Zadjali", status: "present" },
        { id: 3, name: "Mohammed Al Balushi", status: "absent" },
        { id: 4, name: "Aisha Al Riyami", status: "present" },
        { id: 5, name: "Khalid Al Hashmi", status: "present" },
        { id: 6, name: "Noor Al Farsi", status: "absent" },
        { id: 7, name: "Omar Al Ghafri", status: "present" },
        { id: 8, name: "Maryam Al Habsi", status: "present" },
        { id: 9, name: "Said Al Maskari", status: "absent" },
        { id: 10, name: "Zahra Al Lawati", status: "present" },
      ],
      [yesterday]: [
        { id: 1, name: "Ahmed Al Saadi", status: "present" },
        { id: 2, name: "Fatima Al Zadjali", status: "present" },
        { id: 3, name: "Mohammed Al Balushi", status: "present" },
        { id: 4, name: "Aisha Al Riyami", status: "absent" },
        { id: 5, name: "Khalid Al Hashmi", status: "present" },
        { id: 6, name: "Noor Al Farsi", status: "present" },
        { id: 7, name: "Omar Al Ghafri", status: "absent" },
        { id: 8, name: "Maryam Al Habsi", status: "present" },
        { id: 9, name: "Said Al Maskari", status: "present" },
        { id: 10, name: "Zahra Al Lawati", status: "present" },
      ]
    };
  });

  // Calculate attendance statistics
  const filteredAttendance = attendanceData[selectedDate] || [];
  const presentCount = filteredAttendance.filter(record => record.status === 'present').length;
  const absentCount = filteredAttendance.filter(record => record.status === 'absent').length;
  const pendingCount = Math.max(0, 25 - presentCount - absentCount); // Assuming 25 students total

  const actionButtons = useMemo(
    () => [
      {
        label: "Launch AI Route Coach",
        icon: Route,
        variant: "hero" as const,
        onClick: () => navigate("/ai-route-coach"),
      },
      {
        label: "Open Eco Pulse",
        icon: Radar,
        variant: "secondary" as const,
        onClick: () => navigate("/eco-pulse"),
      },
      {
        label: "View Eco Passport",
        icon: Leaf,
        variant: "accent" as const,
        onClick: () => navigate("/eco-passport"),
      },
      {
        label: "Create New Ride",
        icon: PlusCircle,
        variant: "glass" as const,
        onClick: () => navigate("/offer-ride"),
      },
      {
        label: "Switch Role",
        icon: RefreshCcw,
        variant: "outline" as const,
        onClick: () => navigate("/role-selection/school"),
      },
    ],
    [navigate],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-foreground relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 py-10 space-y-10 relative z-10">
        <header className="space-y-4 text-center md:text-left">
          <p className="uppercase tracking-widest text-xs text-muted-foreground">
            School Driver Dashboard
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            Steer your school’s smartest shared routes.
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Stay on top of verified communities, optimise every pickup with AI, and keep your eco impact climbing.
          </p>
        </header>

        {/* Driver Verification Status Banner */}
        <div>
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

        {/* Attendance Overview Section */}
        <section className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Student Attendance Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="glass-input px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm text-muted-foreground">Present</p>
                </div>
                <p className="text-2xl font-bold text-green-500">{presentCount}</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
                <p className="text-2xl font-bold text-red-500">{absentCount}</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Attendance Records</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-2 glass-card rounded-lg">
                      <span className="text-sm">{record.name}</span>
                      <div className="flex items-center gap-2">
                        {record.status === 'present' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          record.status === 'present' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No attendance records for this date</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {quickStats.map(({ icon: Icon, label, value, sub }) => (
            <Card key={label} className="glass-card md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground font-medium">
                  {label}
                </CardTitle>
                <Icon className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-xs text-primary/80">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">Aurora Driver Cockpit</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reputationMetrics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-card rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {label}
                        </p>
                        <p className="text-lg font-semibold">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {actionButtons.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    onClick={action.onClick}
                    className="flex-1 min-w-[200px]"
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-secondary" />
                <CardTitle className="text-xl">Today’s Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Start window</span>
                  <span>06:40 – 07:20</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students on board</span>
                  <span>24 / 26</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Projected CO₂ saved</span>
                  <span>12.4 kg</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/tracking/mission") }>
                <Activity className="w-4 h-4" />
                Start live tracking
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card id="ai-route" className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Route className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">AI Route Coach Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 border border-primary/20">
                  <p className="text-xs text-muted-foreground">Projected time saved</p>
                  <p className="text-2xl font-bold text-primary">14 mins</p>
                </div>
                <div className="glass-card rounded-xl p-4 border border-primary/20">
                  <p className="text-xs text-muted-foreground">Emission drop</p>
                  <p className="text-2xl font-bold text-secondary">-9.5%</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Merge Seeb Heights &amp; Wave Muscat pickups (save 6 mins)
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Stagger Qurum stop by 5 mins for better flow
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Suggest dedicated drop lane at ABA Annex
                </li>
              </ul>
              <Button variant="hero" className="w-full" onClick={() => navigate("/ai-route-coach") }>
                Launch coach
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Radar className="w-5 h-5 text-secondary" />
                <CardTitle className="text-xl">Eco Pulse Snapshot</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <HeatmapCard height="200px" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground">Live ride demand</p>
                  <p className="text-lg font-semibold">High in Al Hail</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground">Top pickup point</p>
                  <p className="text-lg font-semibold">Muscat Hills gate</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground">Active circles</p>
                  <p className="text-lg font-semibold">12</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground">CO₂ saved today</p>
                  <p className="text-lg font-semibold">18.2 kg</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/eco-pulse") }>
                View full heatmap
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="rides" className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Ride Management</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/offer-ride") }>
                  Manage seats
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {rideRequests.map((request) => (
                <div
                  key={request.id}
                  className="glass-card rounded-xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">{request.route}</p>
                    <p className="text-xs text-muted-foreground">{request.id}</p>
                    <p className="text-xs text-primary/80 mt-1">{request.status}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{request.seats} seats</span>
                    <span className="text-muted-foreground">{request.eta}</span>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-accent" />
                <CardTitle className="text-xl">Leaderboards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {leaderboard.map((entry) => (
                <div key={entry.driver} className="rounded-xl border border-white/10 p-4 space-y-2">
                  <p className="font-semibold">{entry.driver}</p>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{entry.ecoImpact}</span>
                    <span>{entry.credits} credits</span>
                    <span>{entry.reliability}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => navigate("/leaderboard") }>
                View all drivers
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SchoolDriverDashboard;
