import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModeSelection = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode: string) => {
    localStorage.setItem("userMode", mode);
    navigate(`/role-selection/${mode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Logo and Header */}
      <div className="text-center mb-12 space-y-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-emerald-400">ECpool360</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Who are you today?
          </h2>
          <p className="text-slate-400 text-lg">
            Select your ECpool identity
          </p>
        </div>
      </div>


      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
        {/* School Mode Card */}
        <button
          onClick={() => handleModeSelect("school")}
          className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 relative overflow-hidden"
        >
          {/* Card glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          
          <div className="flex flex-col items-center space-y-6 relative z-10">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl group-hover:shadow-emerald-500/50">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold">School</h3>

            {/* Description */}
            <p className="text-slate-400 text-center text-sm">
              Access dedicated experiences for verified drivers and students within your institution.
            </p>

            {/* Button */}
            <Button 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold h-12 rounded-full"
            >
              Continue as School
            </Button>
          </div>
        </button>

        {/* Community Mode Card */}
        <button
          onClick={() => handleModeSelect("community")}
          className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden"
        >
          {/* Card glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          
          <div className="flex flex-col items-center space-y-6 relative z-10">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl group-hover:shadow-cyan-500/50">
              <Users className="w-14 h-14 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold">Community</h3>

            {/* Description */}
            <p className="text-slate-400 text-center text-sm">
              Join neighbourhood ride-sharing circles for everyday commutes and rewards.
            </p>

            {/* Button */}
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold h-12 rounded-full"
            >
              Continue as Community
            </Button>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;
