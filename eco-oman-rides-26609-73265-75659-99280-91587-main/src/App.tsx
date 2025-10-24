import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import RoleSelection from "./pages/RoleSelection";
import RoleSelectionSchool from "./pages/RoleSelectionSchool";
import RoleSelectionCommunity from "./pages/RoleSelectionCommunity";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Driver from "./pages/Driver";
import Student from "./pages/Student";
import DriverProfile from "./pages/DriverProfile";
import StudentProfile from "./pages/StudentProfile";
import Analytics from "./pages/Analytics";
import DriverVerification from "./pages/DriverVerification";
import Tracking from "./pages/Tracking";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ModeSelection from "./pages/ModeSelection";
import Leaderboard from "./pages/Leaderboard";
import RequestRide from "./pages/RequestRide";
import OfferRide from "./pages/OfferRide";
import MyVehicles from "./pages/MyVehicles";
import Wallet from "./pages/Wallet";
import NfcScanner from "./pages/NfcScanner";
import VoiceAssistant from "./pages/VoiceAssistant";
import BusTimeline from "./pages/BusTimeline";
import GhostRides from "./pages/GhostRides";
import AirQualityPilot from "./pages/AirQualityPilot";
import DriverTracking from "./pages/DriverTracking";
import SchoolDriverDashboard from "./pages/SchoolDriverDashboard";
import SchoolStudentDashboard from "./pages/SchoolStudentDashboard";
import CommunityDriverDashboard from "./pages/CommunityDriverDashboard";
import CommunityRiderDashboard from "./pages/CommunityRiderDashboard";
import AuroraDashboard from "./pages/AuroraDashboard";
import AIRouteCoach from "./pages/AIRouteCoach";
import EcoPulse from "./pages/EcoPulse";
import EcoPassport from "./pages/EcoPassport";
import Attendance from "./pages/Attendance";
import Schedule from "./pages/Schedule";
import EcoRewards from "./pages/EcoRewards";
import CommunityEvents from "./pages/CommunityEvents";
import CommunityCircles from "./pages/CommunityCircles";
import HubManagement from "./pages/HubManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/landing" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/mode-selection" element={<ModeSelection />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/role-selection/school" element={<RoleSelectionSchool />} />
          <Route path="/role-selection/community" element={<RoleSelectionCommunity />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/school/driver" element={<SchoolDriverDashboard />} />
          <Route path="/school/student" element={<SchoolStudentDashboard />} />
          <Route path="/school/attendance" element={<Attendance />} />
          <Route path="/school/schedule" element={<Schedule />} />
          <Route path="/school/rewards" element={<EcoRewards />} />
          <Route path="/community/driver" element={<CommunityDriverDashboard />} />
          <Route path="/community/rider" element={<CommunityRiderDashboard />} />
          <Route path="/community-circles" element={<CommunityCircles />} />
          <Route path="/community-events" element={<CommunityEvents />} />
          <Route path="/hub-management" element={<HubManagement />} />
          <Route path="/aurora" element={<AuroraDashboard />} />
          <Route path="/ai-route-coach" element={<AIRouteCoach />} />
          <Route path="/eco-pulse" element={<EcoPulse />} />
          <Route path="/eco-passport" element={<EcoPassport />} />
          <Route path="/marketplace" element={<EcoPassport />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/student" element={<Student />} />
          <Route path="/driver-profile" element={<DriverProfile />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/driver-verification" element={<DriverVerification />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/tracking/:rideId" element={<DriverTracking />} />
          <Route path="/nfc-scanner" element={<NfcScanner />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/bus-timeline" element={<BusTimeline />} />
          <Route path="/ghost-rides" element={<GhostRides />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/request-ride" element={<RequestRide />} />
          <Route path="/offer-ride" element={<OfferRide />} />
          <Route path="/my-vehicles" element={<MyVehicles />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/air-quality-pilot" element={<AirQualityPilot />} />
          <Route path="/driver-tracking" element={<DriverTracking />} />
          <Route path="/driver-tracking/:rideId" element={<DriverTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
