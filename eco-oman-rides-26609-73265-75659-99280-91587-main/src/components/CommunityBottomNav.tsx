import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Compass, Home, Map, User, CalendarRange } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: typeof Home;
  hash?: string;
}

const CommunityBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole");
  const isDriver = role === "community-driver" || location.pathname.includes("/driver");
  const basePath = isDriver ? "/community/driver" : "/community/rider";

  const navItems: NavItem[] = [
    {
      label: "Home",
      icon: Home,
      path: basePath,
    },
    {
      label: "My rides",
      icon: CalendarRange,
      path: basePath,
      hash: "rides",
    },
    {
      label: "Passport",
      icon: Map,
      path: "/eco-passport",
    },
    {
      label: "Pulse",
      icon: Compass,
      path: "/eco-pulse",
    },
    {
      label: "Profile",
      icon: User,
      path: isDriver ? "/driver-profile" : "/student-profile",
    },
  ];

  const isActive = useCallback(
    (item: NavItem) => {
      if (item.path === basePath) {
        return location.pathname === basePath;
      }
      return location.pathname === item.path;
    },
    [basePath, location.pathname],
  );

  const handleNavigate = useCallback(
    (item: NavItem) => {
      if (item.hash) {
        navigate(item.path);
        requestAnimationFrame(() => {
          document.getElementById(item.hash || "")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        navigate(item.path);
      }
    },
    [navigate],
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-[70px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <button
                key={item.label}
                onClick={() => handleNavigate(item)}
                className={`relative flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all duration-300 ${
                  active ? "text-secondary" : "text-muted-foreground"
                }`}
              >
                {active && <span className="absolute inset-0 rounded-xl bg-secondary/10" />}
                <Icon className={`relative w-5 h-5 ${active ? "scale-110" : "scale-100"}`} />
                <span className="relative text-xs font-semibold uppercase tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CommunityBottomNav;
