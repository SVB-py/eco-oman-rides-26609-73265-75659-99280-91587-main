import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Bus, School, AlertTriangle, CheckCircle, ArrowRight, User, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoleSelectionSchool = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem("userMode", "school");
    localStorage.setItem("userRole", role);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />

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
            <School className="w-5 h-5 mr-2" />
            in School Mode
          </Badge>
        </div>

        {/* Enhanced Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <div
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => handleRoleSelect("student")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500" />

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-xl">
                  Student
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                Student
              </h3>
              <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300">
                Join the eco-friendly transportation network as a student. Request rides, track your carbon footprint, and earn rewards for sustainable choices.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Request eco-friendly rides
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Track attendance & rewards
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Earn eco-points & badges
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                Continue as Student
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Driver Card */}
          <Card
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 cursor-pointer animate-fade-in"
            style={{ animationDelay: '0.6s' }}
            onClick={() => handleRoleSelect("driver")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors duration-500" />

            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-xl">
                  Driver
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                Driver
              </h3>
              <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300">
                Become a driver in the eco-transportation network. Offer rides, manage your vehicle, and contribute to a greener community.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  Offer eco-friendly rides
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  Manage vehicle & earnings
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  Earn rewards & recognition
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/25">
                Continue as Driver
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

};

export default RoleSelectionSchool;
