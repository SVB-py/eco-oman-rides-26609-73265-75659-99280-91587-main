import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Leaf,
  Award,
  Trophy,
  Flame,
  Calendar,
  Gift,
  ArrowUpRight,
  Share2,
  Sparkles,
  Zap,
  Star,
  Crown,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const badges = [
  {
    icon: "🏅",
    title: "Eco Champion",
    detail: "Complete 10 eco streak days",
    unlocked: true,
    glow: "emerald",
  },
  {
    icon: "🛡️",
    title: "Circle Guardian",
    detail: "Refer 3 classmates to verified circles",
    unlocked: true,
    glow: "cyan",
  },
  {
    icon: "🚺",
    title: "Women-first Ally",
    detail: "Host 5 women-only rides",
    unlocked: true,
    glow: "teal",
  },
  {
    icon: "⚡",
    title: "Speed Demon",
    detail: "Complete 50 rides",
    unlocked: false,
    glow: "yellow",
  },
  {
    icon: "🌟",
    title: "Star Driver",
    detail: "Maintain 4.9+ rating",
    unlocked: true,
    glow: "amber",
  },
  {
    icon: "🌿",
    title: "Green Warrior",
    detail: "Save 100kg CO₂",
    unlocked: false,
    glow: "lime",
  },
];

const perks = [
  {
    id: 1,
    title: "Free Coffee",
    description: "Redeem at any partner café",
    cost: 200,
    icon: "☕",
    tier: "Bronze",
  },
  {
    id: 2,
    title: "Priority Booking",
    description: "Skip the queue for 7 days",
    cost: 500,
    icon: "⚡",
    tier: "Silver",
  },
  {
    id: 3,
    title: "Premium Route Access",
    description: "Unlock AI-optimized routes",
    cost: 800,
    icon: "🚀",
    tier: "Silver",
  },
  {
    id: 4,
    title: "VIP Badge",
    description: "Show off your eco status",
    cost: 1200,
    icon: "👑",
    tier: "Gold",
  },
  {
    id: 5,
    title: "Carbon Offset Certificate",
    description: "Official eco impact certificate",
    cost: 300,
    icon: "🌱",
    tier: "Bronze",
  },
  {
    id: 6,
    title: "Ride Pass (10 rides)",
    description: "10 free ride credits",
    cost: 1500,
    icon: "🎟️",
    tier: "Gold",
  },
];

const history = [
  {
    date: "Oct 18",
    action: "Shared commute Muscat → CBD",
    credits: "+80",
    co2: "2.8 kg",
  },
  {
    date: "Oct 19",
    action: "Joined Women in Tech circle",
    credits: "+40",
    co2: "—",
  },
  {
    date: "Oct 20",
    action: "Unlocked Silver tier perk",
    credits: "+60",
    co2: "1.6 kg",
  },
  {
    date: "Oct 21",
    action: "Completed 5-day streak bonus",
    credits: "+100",
    co2: "—",
  },
];

const EcoPassport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [credits, setCredits] = useState(2340);
  const [showPerks, setShowPerks] = useState(() => {
    // Initialize showPerks based on URL parameter or route
    const params = new URLSearchParams(location.search);
    const isMarketplace = location.pathname === '/marketplace';
    return params.get('showPerks') === 'true' || isMarketplace;
  });
  const currentTier = credits >= 2000 ? "Gold" : credits >= 1000 ? "Silver" : "Bronze";
  const nextTier = currentTier === "Bronze" ? "Silver" : currentTier === "Silver" ? "Gold" : "Platinum";
  const progressToNext = currentTier === "Bronze" ? (credits / 1000) * 100 : currentTier === "Silver" ? ((credits - 1000) / 1000) * 100 : 100;

  // Auto-show perks if coming from community dashboard
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('showPerks') === 'true') {
      setShowPerks(true);
    }
  }, [location.search]);

  const handleRedeemPerk = (perk: typeof perks[0]) => {
    if (credits >= perk.cost) {
      setCredits(credits - perk.cost);
      toast({
        title: "Perk Redeemed!",
        description: `You've unlocked ${perk.title}. ${perk.cost} credits deducted.`,
      });
    } else {
      toast({
        title: "Insufficient Credits",
        description: `You need ${perk.cost - credits} more credits to redeem this perk.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-white pb-20 relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <div className="absolute top-1/3 right-10 w-1 h-1 bg-emerald-300/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />

        {/* Large gradient orbs with enhanced animation */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/2 left-1/3 w-80 h-80 bg-orange-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="container mx-auto px-6 py-10 space-y-8 relative z-10">
        {/* Enhanced Header with wow-factor */}
        <header className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold animate-fade-in">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-bold tracking-wider">
              ECO PASSPORT
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Track credits, streaks, and CO₂ saved.
            </span>
          </h1>
          <p className="text-slate-300 max-w-3xl text-lg animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Celebrate your eco wins and unlock rewards across School and Community modes. Share achievements with your circles or parents at any time.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-8 h-14 rounded-2xl shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300 group"
            >
              <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Share passport
            </Button>
          </div>
        </header>

        {/* Enhanced Main Stats with wow-factor animations */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fade-in">
            {/* Animated glow effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-emerald-400 group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="text-xl font-bold">Eco Credits</h3>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                  {credits.toLocaleString()}
                </p>
                <p className="text-sm text-emerald-300/80 font-medium">
                  +120 bonus this week • Tier: <span className="text-emerald-400 font-bold">{currentTier}</span>
                </p>
                <div className="w-full bg-emerald-900/30 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((credits % 1000) / 10, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Flame className="w-8 h-8 text-cyan-400 group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold">Streak</h3>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  18 <span className="text-2xl">days</span>
                </p>
                <p className="text-sm text-cyan-300/80 font-medium">
                  Keep it up to unlock <span className="text-cyan-400 font-bold">{nextTier}</span> tier
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                        i < 5 ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-cyan-900/30'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-teal-500/20 hover:border-teal-500/40 relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-teal-400 group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="text-xl font-bold">CO₂ Saved</h3>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  142 <span className="text-2xl">kg</span>
                </p>
                <p className="text-sm text-teal-300/80 font-medium">
                  Equivalent to <span className="text-teal-400 font-bold">23 trees</span> planted
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-teal-900/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2 rounded-full w-3/4 transition-all duration-1000" />
                  </div>
                  <span className="text-xs text-teal-400 font-bold">🌳</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Tier Progress with wow-factor */}
        <section className="glass-card rounded-3xl p-8 border border-emerald-500/20 hover:border-emerald-500/30 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Animated background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 rounded-full blur-2xl" />

          <div className="relative space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Tier Progress
                </h2>
                <p className="text-slate-300 text-lg">
                  Current Tier: <span className="text-emerald-400 font-bold text-xl">{currentTier}</span>
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-6 py-3 text-lg rounded-2xl shadow-2xl shadow-emerald-500/40 animate-pulse">
                <Crown className="w-6 h-6 mr-2 animate-bounce" />
                {currentTier}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  {currentTier}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  {nextTier}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-slate-800/50 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                    style={{ width: `${progressToNext}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    {Math.round(progressToNext)}% to {nextTier}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center p-6 glass-card rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group hover:scale-105">
                <div className="text-5xl mb-3 group-hover:animate-bounce">🥉</div>
                <p className="text-lg font-bold text-orange-400 mb-1">Bronze</p>
                <p className="text-sm text-orange-300/80">0-999 credits</p>
                <div className="mt-3 w-full bg-orange-900/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full w-full transition-all duration-1000" />
                </div>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl border border-slate-400/20 hover:border-slate-400/40 transition-all duration-300 group hover:scale-105">
                <div className="text-5xl mb-3 group-hover:animate-bounce" style={{ animationDelay: '0.1s' }}>🥈</div>
                <p className="text-lg font-bold text-slate-300 mb-1">Silver</p>
                <p className="text-sm text-slate-400/80">1000-1999 credits</p>
                <div className="mt-3 w-full bg-slate-800/30 rounded-full h-2">
                  <div className={`bg-gradient-to-r from-slate-400 to-slate-300 h-2 rounded-full transition-all duration-1000 ${
                    credits >= 1000 ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group hover:scale-105">
                <div className="text-5xl mb-3 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>🥇</div>
                <p className="text-lg font-bold text-amber-400 mb-1">Gold</p>
                <p className="text-sm text-amber-300/80">2000+ credits</p>
                <div className="mt-3 w-full bg-amber-900/30 rounded-full h-2">
                  <div className={`bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-1000 ${
                    credits >= 2000 ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redeemable Perks Section */}
        <section className="glass-card rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/30 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.35s' }}>
          {/* Animated background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 rounded-full blur-2xl" />

          <div className="relative space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Redeemable Perks
              </h2>
              <p className="text-slate-300 text-lg">
                Spend your Eco Credits on exclusive rewards and benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk, index) => (
                <div
                  key={perk.id}
                  className="glass-card rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl group-hover:animate-bounce">{perk.icon}</div>
                      <Badge
                        className={`font-bold px-3 py-1 rounded-full text-xs ${
                          perk.tier === 'Bronze' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                          perk.tier === 'Silver' ? 'bg-slate-500/20 text-slate-300 border-slate-500/30' :
                          'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {perk.tier}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {perk.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {perk.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-lg">{perk.cost}</span>
                        <span className="text-emerald-300/80 text-sm">credits</span>
                      </div>

                      <Button
                        onClick={() => handleRedeemPerk(perk)}
                        disabled={credits < perk.cost}
                        className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          credits >= perk.cost
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:scale-105 shadow-lg shadow-cyan-500/30'
                            : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {credits >= perk.cost ? 'Redeem' : 'Not enough'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Badges with wow-factor */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Achievement Badges
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Unlock badges by completing challenges and milestones. Each badge tells a story of your eco journey!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map((badge, index) => (
              <div
                key={badge.title}
                className={`relative group p-6 rounded-3xl text-center transition-all duration-500 hover:scale-110 animate-fade-in ${
                  badge.unlocked
                    ? 'glass-card border border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20'
                    : 'bg-slate-900/30 border border-slate-800/50 opacity-60 hover:opacity-80'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated glow for unlocked badges */}
                {badge.unlocked && (
                  <>
                    <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-xl animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </>
                )}

                <div className="relative z-10 space-y-4">
                  <div className={`text-5xl mb-3 transition-transform duration-300 group-hover:scale-125 ${
                    badge.unlocked ? 'animate-bounce' : 'grayscale'
                  }`} style={{ animationDelay: `${index * 0.2}s` }}>
                    {badge.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 leading-tight">{badge.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{badge.detail}</p>
                  {badge.unlocked && (
                    <Badge className="mt-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                      <Star className="w-4 h-4 mr-1 animate-spin" style={{ animationDuration: '2s' }} />
                      Unlocked
                    </Badge>
                  )}
                </div>

                {/* Hover effect particles */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Ride History with wow-factor */}
        <section className="glass-card rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-500/30 relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {/* Animated background effects */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-slate-700/10 to-slate-600/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
                  Ride & Reward History
                </h2>
                <p className="text-slate-400 text-lg">Track your eco journey and achievements</p>
              </div>
              <Button
                variant="outline"
                className="border-slate-700/50 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 px-6 py-3 rounded-2xl transition-all duration-300 group"
              >
                <TrendingUp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Export History
              </Button>
            </div>

            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 glass-card rounded-2xl border border-slate-700/30 hover:border-emerald-500/30 transition-all duration-300 group hover:scale-[1.02] animate-fade-in relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative z-10 space-y-1">
                    <p className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">{entry.date}</p>
                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{entry.action}</p>
                  </div>
                  <div className="relative z-10 text-right space-y-1">
                    <p className="text-emerald-400 font-bold text-xl group-hover:text-emerald-300 transition-colors">
                      +{entry.credits}
                    </p>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      {entry.co2} CO₂ saved
                    </p>
                  </div>

                  {/* Animated indicator */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Perks Modal with wow-factor */}
      <Dialog open={showPerks} onOpenChange={setShowPerks}>
        <DialogContent className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-emerald-500/20 text-white max-w-5xl max-h-[85vh] overflow-y-auto relative">
          {/* Animated background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10">
            <DialogHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
                    Perks Marketplace
                  </DialogTitle>
                  <p className="text-slate-300 text-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Redeem your eco credits for exclusive rewards and experiences
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 px-6 py-4 rounded-2xl border border-emerald-500/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Leaf className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <div className="text-center">
                    <span className="font-bold text-2xl text-emerald-400">{credits.toLocaleString()}</span>
                    <p className="text-sm text-slate-400">credits</p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {perks.map((perk, index) => (
                <div
                  key={perk.id}
                  className="glass-card rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 animate-fade-in relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{perk.icon}</div>
                      <Badge
                        className={`
                          px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-300 group-hover:scale-105
                          ${perk.tier === 'Gold' ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30' : ''}
                          ${perk.tier === 'Silver' ? 'bg-gradient-to-r from-slate-400/20 to-slate-300/20 text-slate-300 border border-slate-400/30' : ''}
                          ${perk.tier === 'Bronze' ? 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 text-orange-400 border border-orange-500/30' : ''}
                        `}
                      >
                        {perk.tier}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold group-hover:text-emerald-300 transition-colors">{perk.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{perk.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl">
                          <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                          <span className="font-bold text-xl text-emerald-400">{perk.cost}</span>
                          <span className="text-slate-400 text-sm">credits</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRedeemPerk(perk)}
                        disabled={credits < perk.cost}
                        className={`
                          px-8 py-3 rounded-2xl font-bold text-lg transition-all duration-300 group/btn hover:scale-105
                          ${credits >= perk.cost
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60'
                            : 'bg-slate-700/50 text-slate-400 cursor-not-allowed border border-slate-600'
                          }
                        `}
                      >
                        {credits >= perk.cost ? (
                          <div className="flex items-center gap-2">
                            <Gift className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                            Redeem
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <X className="w-5 h-5" />
                            Locked
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Hover effect particles */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute top-1/2 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EcoPassport;