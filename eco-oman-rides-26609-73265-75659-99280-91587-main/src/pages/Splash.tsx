import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Navigate after loading
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Logo Animation */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-bounce">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 blur-xl opacity-50 animate-pulse" />
          </div>

          {/* Brand Name */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              ECpool360
            </h1>
            <p className="text-lg text-emerald-400 font-medium">
              Smart Carpooling for Oman
            </p>
          </div>
        </div>

        {/* Enhanced Loading Bar */}
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="relative">
            <div className="w-full h-3 bg-slate-800/60 backdrop-blur-sm rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-sm opacity-50" />
              </div>
            </div>

            {/* Progress percentage indicator */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-slate-700/50">
                <span className="text-sm font-semibold text-emerald-300">{progress}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-base text-slate-300 font-medium">
              Loading your eco-friendly journey...
            </p>

            {/* Dynamic loading messages */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span>
                {progress < 30 ? "Initializing routes..." :
                 progress < 60 ? "Connecting communities..." :
                 progress < 90 ? "Preparing dashboard..." :
                 "Almost ready!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;