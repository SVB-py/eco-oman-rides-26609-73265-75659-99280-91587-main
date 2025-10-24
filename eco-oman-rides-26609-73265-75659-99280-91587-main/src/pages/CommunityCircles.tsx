import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  Star,
  Heart,
  MessageCircle,
  Calendar,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  Plus,
  Globe,
  Building,
  Home,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CommunityBottomNav from "@/components/CommunityBottomNav";

const CommunityCircles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [joinedCircles, setJoinedCircles] = useState<string[]>(["Wave Muscat Neighbours"]);

  const circles = [
    {
      id: "wave-muscat-neighbours",
      name: "Wave Muscat Neighbours",
      description: "Local neighbourhood rides between Wave Muscat residential areas. Perfect for daily commutes and weekend outings.",
      category: "neighbourhood",
      members: 42,
      activeRides: 8,
      location: "Wave Muscat",
      rating: 4.8,
      joined: true,
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      features: ["Daily commutes", "Weekend rides", "Verified members", "24/7 support"],
    },
    {
      id: "cbd-finance-crew",
      name: "CBD Finance Crew",
      description: "Professional network for finance sector employees in Muscat's Central Business District. Reliable carpools for office hours.",
      category: "professional",
      members: 18,
      activeRides: 5,
      location: "CBD Muscat",
      rating: 4.6,
      joined: true,
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
      features: ["Office hours", "Professional network", "Flexible scheduling", "Business class"],
    },
    {
      id: "women-tech-muscat",
      name: "Women in Tech Muscat",
      description: "Empowering women in technology with safe, supportive rides. Building a stronger community through shared journeys.",
      category: "interest",
      members: 27,
      activeRides: 6,
      location: "Greater Muscat",
      rating: 4.9,
      joined: true,
      icon: Shield,
      color: "from-rose-500 to-pink-500",
      features: ["Women-only", "Tech focused", "Mentorship", "Events included"],
    },
    {
      id: "ghala-heights-community",
      name: "Ghala Heights Community",
      description: "Exclusive circle for Ghala Heights residents. Luxury rides, premium service, and community events.",
      category: "neighbourhood",
      members: 15,
      activeRides: 3,
      location: "Ghala Heights",
      rating: 4.7,
      joined: false,
      icon: Building,
      color: "from-amber-500 to-orange-500",
      features: ["Premium service", "Community events", "Luxury vehicles", "Concierge support"],
    },
    {
      id: "student-study-buddies",
      name: "Student Study Buddies",
      description: "University students sharing rides to campus, libraries, and study groups. Affordable and eco-friendly transport.",
      category: "education",
      members: 89,
      activeRides: 12,
      location: "Sultan Qaboos University",
      rating: 4.4,
      joined: false,
      icon: Users,
      color: "from-green-500 to-emerald-500",
      features: ["Student rates", "Study groups", "Campus access", "Flexible hours"],
    },
    {
      id: "airport-transfer-network",
      name: "Airport Transfer Network",
      description: "Reliable airport transfers and travel companions. Share costs and make airport runs more enjoyable.",
      category: "travel",
      members: 34,
      activeRides: 7,
      location: "Muscat International Airport",
      rating: 4.5,
      joined: false,
      icon: Globe,
      color: "from-indigo-500 to-blue-500",
      features: ["Airport transfers", "Flight tracking", "Luggage help", "Travel tips"],
    },
  ];

  const filteredCircles = circles.filter((circle) => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || circle.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCircle = (circleId: string) => {
    setJoinedCircles(prev => [...prev, circleId]);
  };

  const handleLeaveCircle = (circleId: string) => {
    setJoinedCircles(prev => prev.filter(id => id !== circleId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "neighbourhood": return Home;
      case "professional": return Briefcase;
      case "interest": return Heart;
      case "education": return Users;
      case "travel": return Globe;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-foreground relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/community-rider-dashboard")}
            className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl px-4 py-2 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Community Circles
            </h1>
            <p className="text-slate-400 text-sm">Discover and join trusted communities</p>
          </div>
          <div className="w-32" />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search circles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900/50 border-slate-700 focus:border-cyan-500"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-slate-700">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="neighbourhood">Neighbourhood</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="interest">Interest Groups</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Circles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCircles.map((circle) => {
            const IconComponent = circle.icon;
            const isJoined = joinedCircles.includes(circle.id);

            return (
              <Card key={circle.id} className="glass-card group hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${circle.color} flex items-center justify-center mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {isJoined && (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Joined
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-cyan-300 transition-colors">
                    {circle.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {circle.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {circle.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {circle.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{circle.members}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{circle.activeRides} active</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {circle.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs bg-slate-800/50">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant={isJoined ? "secondary" : "default"}
                      size="sm"
                      className="flex-1"
                      onClick={() => isJoined ? handleLeaveCircle(circle.id) : handleJoinCircle(circle.id)}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Leave Circle
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Join Circle
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCircles.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No circles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <CommunityBottomNav />
    </div>
  );
};

export default CommunityCircles;