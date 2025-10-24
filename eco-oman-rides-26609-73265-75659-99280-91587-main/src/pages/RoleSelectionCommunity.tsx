import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Car, CheckCircle, AlertTriangle, Coins, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoleSelectionCommunity = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem("userMode", "community");
    localStorage.setItem("userRole", role);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] relative overflow-hidden">
      {/* Enhanced Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />

        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Enhanced Header */}
      <div className="container mx-auto px-4 pt-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/mode-selection")}
            className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl px-4 py-2 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Mode Selection
          </Button>

          {/* Enhanced Progress */}
          <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 rounded-full bg-slate-600" />
          </div>

          <div className="w-32" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            Select Your Role
          </h1>
          <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 text-lg px-6 py-2 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Users className="w-5 h-5 mr-2" />
            in Community Mode
          </Badge>
        </div>

        {/* Enhanced Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Passenger Card */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer animate-fade-in h-full flex flex-col"
            style={{ animationDelay: '0.4s' }}
            onClick={() => handleRoleSelect("community-rider")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500" />

            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  Passenger
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Find carpools near you, save money, and reduce your carbon footprint
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <p className="text-sm font-semibold text-emerald-300 mb-3">What you can do:</p>
                {[
                  "Search for rides",
                  "Book carpools",
                  "Schedule ghost rides",
                  "Track ride live",
                  "Earn EcoCredits",
                  "Women-only filter"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-slate-700/50">
                <p className="text-xs text-slate-400 italic mb-3">
                  Example: "Daily commute Seeb → Muscat, 8:00 AM, Monday-Friday"
                </p>
              </div>

              {/* Cost Savings */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between bg-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-300">Save ~60% vs solo</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-teal-500/10 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-semibold text-teal-300">Reduce 4.5 kg CO₂/week</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center mb-4">3,890 passengers</p>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                Continue as Passenger
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Community Driver Card */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 cursor-pointer animate-fade-in h-full flex flex-col"
            style={{ animationDelay: '0.6s' }}
            onClick={() => handleRoleSelect("community-driver")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors duration-500" />

            <div className="p-8 relative z-10 flex flex-col h-full">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                  Community Driver
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Share your daily commute, earn EcoCredits, and meet new people
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <p className="text-sm font-semibold text-teal-300 mb-3">What you can do:</p>
                {[
                  "Offer rides",
                  "Earn credits",
                  "Voice assistant",
                  "Route optimization",
                  "Flexible scheduling",
                  "Build reputation"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-amber-400">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs">Verification needed: License, Vehicle registration</p>
                </div>
              </div>

              {/* Earnings */}
              <div className="bg-teal-500/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-teal-500/20">
                <p className="text-teal-300 font-semibold text-center">80-150 credits/month</p>
                <p className="text-xs text-slate-400 text-center">= 4-7.5 OMR value</p>
                <p className="text-xs text-slate-400 text-center">+ Fuel cost sharing</p>
              </div>

              {/* Social Benefit */}
              <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-cyan-500/20">
                <div className="flex items-center gap-3 justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <p className="text-xs text-cyan-300">Meet 5-10 new people per week</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/25">
                Continue as Community Driver
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCommunity;
