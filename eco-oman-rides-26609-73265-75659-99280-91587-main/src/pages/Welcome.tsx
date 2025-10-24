import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mode-selection");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 text-center space-y-8 animate-fade-in px-4">
        {/* Animated Logo - 200px circle with green glow */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-60 animate-glow-pulse" />
            <div className="absolute inset-2 bg-primary rounded-full blur-2xl opacity-40 animate-pulse" />
            
            {/* Logo circle */}
            <div className="relative w-[200px] h-[200px] rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-glow-pulse shadow-[0_0_60px_rgba(34,197,94,0.6)]">
              <Leaf className="w-24 h-24 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* App Name - gradient text */}
        <div className="space-y-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            ECpool360
          </h1>
        </div>

        {/* Tagline */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-xl md:text-2xl text-slate-300 font-medium">
            Eco-Smart School Rides for Oman
          </p>
          <p className="text-base md:text-lg text-slate-400">
            Save money. Save planet. Share rides.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            onClick={() => navigate("/mode-selection")}
            className="mt-8 text-lg font-bold px-12 py-6 h-auto rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
