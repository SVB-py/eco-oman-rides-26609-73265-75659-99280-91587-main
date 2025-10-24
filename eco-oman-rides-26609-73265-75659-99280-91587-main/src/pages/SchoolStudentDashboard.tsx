import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Car,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Navigation,
  Target,
  Leaf,
  Settings,
  Bell,
  Home,
  Sun,
  Cloud,
  Zap,
  Trophy,
  Flame,
  Heart,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const SchoolStudentDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [currentTime]);

  const markAttendance = () => {
    setAttendanceMarked(true);
    // In a real app, this would make an API call
    setTimeout(() => {
      setShowAttendanceModal(true);
      setTimeout(() => setShowAttendanceModal(false), 3000);
    }, 500);
  };
  const studentData = {
    name: "Alex Johnson",
    grade: "Grade 12",
    school: "Green Valley High School",
    ecoPoints: 2450,
    ridesCompleted: 28,
    carbonSaved: 12.5,
    attendanceStreak: 15,
    nextRide: {
      time: "8:30 AM",
      pickup: "123 Main St",
      destination: "Green Valley High School",
      driver: "Sarah Wilson",
      status: "scheduled",
      eta: "15 min"
    }
  };

  const quickActions = [
    {
      title: "Mark Attendance",
      description: "Mark your daily attendance",
      icon: CheckCircle2,
      action: markAttendance,
      color: "from-green-500 to-emerald-500",
      hoverColor: "group-hover:shadow-green-500/25",
      bgColor: "group-hover:from-green-500/10 group-hover:to-emerald-500/10"
    },
    {
      title: "Request Ride",
      description: "Book a new eco-friendly ride",
      icon: Car,
      action: () => navigate("/request-ride"),
      color: "from-emerald-500 to-teal-500",
      hoverColor: "group-hover:shadow-emerald-500/25",
      bgColor: "group-hover:from-emerald-500/10 group-hover:to-teal-500/10"
    },
    {
      title: "View Schedule",
      description: "Check your ride schedule",
      icon: Calendar,
      action: () => navigate("/school/schedule"),
      color: "from-teal-500 to-cyan-500",
      hoverColor: "group-hover:shadow-teal-500/25",
      bgColor: "group-hover:from-teal-500/10 group-hover:to-cyan-500/10"
    },
    {
      title: "Attendance",
      description: "Track your attendance record",
      icon: CheckCircle,
      action: () => navigate("/school/attendance"),
      color: "from-cyan-500 to-blue-500",
      hoverColor: "group-hover:shadow-cyan-500/25",
      bgColor: "group-hover:from-cyan-500/10 group-hover:to-blue-500/10"
    },
    {
      title: "Track Ride",
      description: "Monitor current ride",
      icon: Navigation,
      action: () => navigate("/tracking"),
      color: "from-blue-500 to-purple-500",
      hoverColor: "group-hover:shadow-blue-500/25",
      bgColor: "group-hover:from-blue-500/10 group-hover:to-purple-500/10"
    },
    {
      title: "Eco Rewards",
      description: "View your achievements and rewards",
      icon: Award,
      action: () => navigate("/school/rewards"),
      color: "from-purple-500 to-pink-500",
      hoverColor: "group-hover:shadow-purple-500/25",
      bgColor: "group-hover:from-purple-500/10 group-hover:to-pink-500/10"
    }
  ];

  const recentRides = [
    { date: "Today", time: "7:45 AM", status: "completed", points: 25, driver: "Sarah Wilson", eco: "2.1kg CO₂ saved" },
    { date: "Yesterday", time: "8:00 AM", status: "completed", points: 25, driver: "Mike Chen", eco: "2.3kg CO₂ saved" },
    { date: "2 days ago", time: "7:50 AM", status: "completed", points: 25, driver: "Emma Davis", eco: "1.9kg CO₂ saved" },
    { date: "3 days ago", time: "8:15 AM", status: "completed", points: 25, driver: "John Smith", eco: "2.4kg CO₂ saved" }
  ];

  const achievements = [
    { title: "Eco Warrior", description: "Completed 25 eco-rides", icon: Leaf, unlocked: true, progress: 100 },
    { title: "Perfect Attendance", description: "15-day streak", icon: Target, unlocked: true, progress: 100 },
    { title: "Carbon Saver", description: "Saved 10kg CO₂", icon: TrendingUp, unlocked: true, progress: 100 },
    { title: "Top Student", description: "Highest rating this month", icon: Star, unlocked: false, progress: 75 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Attendance Success Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl shadow-2xl shadow-emerald-500/30 max-w-sm mx-4 text-center transform animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Attendance Marked!</h3>
            <p className="text-emerald-100">Your attendance has been successfully recorded for today.</p>
          </div>
        </div>
      )}
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 p-6 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg shadow-green-400/50" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {greeting}, {studentData.name.split(' ')[0]}!
                </h1>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              <p className="text-slate-400 text-sm">{studentData.grade} • {studentData.school}</p>
              <p className="text-slate-500 text-xs mt-1">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {studentData.ecoPoints.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-1">
                <Leaf className="w-4 h-4" />
                Eco Points
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-8 space-y-10">
        {/* Quick Actions - Enhanced Grid */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer animate-fade-in ${action.bgColor}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={action.action}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="p-5 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${action.hoverColor} group-hover:rotate-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white group-hover:text-white transition-colors text-base leading-tight">{action.title}</h3>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors mt-1">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Your Progress
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Car className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{studentData.ridesCompleted}</div>
                    <div className="text-xs text-slate-400">Rides</div>
                  </div>
                </div>
                <div className="text-sm text-emerald-300 font-medium">Completed</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Leaf className="w-8 h-8 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{studentData.carbonSaved}</div>
                    <div className="text-xs text-slate-400">kg CO₂</div>
                  </div>
                </div>
                <div className="text-sm text-teal-300 font-medium">Saved</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Flame className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{studentData.attendanceStreak}</div>
                    <div className="text-xs text-slate-400">Day</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-300 font-medium">Streak</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Star className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="text-xs text-slate-400">Rating</div>
                  </div>
                </div>
                <div className="text-sm text-blue-300 font-medium">Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Next Ride */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Next Ride
              </h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1">
                  {studentData.nextRide.status}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1">
                  ETA: {studentData.nextRide.eta}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time:
                  </span>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {studentData.nextRide.time}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    From:
                  </span>
                  <span className="text-white text-sm font-medium">{studentData.nextRide.pickup}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    To:
                  </span>
                  <span className="text-white text-sm font-medium">{studentData.nextRide.destination}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl">
                  <span className="text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Driver:
                  </span>
                  <span className="text-white text-sm font-medium">{studentData.nextRide.driver}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                onClick={() => navigate("/tracking")}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Track Ride
              </Button>
              <Button
                variant="outline"
                className="px-6 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-700/50 transition-all duration-300"
                onClick={() => navigate("/school/schedule")}
              >
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Recent Rides
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/school/schedule")}
                className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 rounded-xl transition-all duration-300 hover:scale-105"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentRides.map((ride, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{ride.date}</div>
                      <div className="text-slate-400 text-xs">{ride.time} • {ride.driver}</div>
                      <div className="text-emerald-300 text-xs mt-1">{ride.eco}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-1">
                      +{ride.points} pts
                    </Badge>
                    <div className="text-xs text-slate-500">Eco Ride</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Eco Impact */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                Your Eco Impact
              </h3>
              <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1">
                This Month
              </Badge>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-300 font-medium">Monthly Goal Progress</span>
                  <span className="text-emerald-400 font-bold">85%</span>
                </div>
                <div className="relative">
                  <Progress value={85} className="h-4 bg-slate-700 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-600/30 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    {studentData.carbonSaved}kg
                  </div>
                  <div className="text-sm text-slate-400 font-medium">CO₂ Saved</div>
                  <div className="w-full bg-slate-600 rounded-full h-1 mt-3">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-slate-700/30 to-slate-600/30 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {studentData.ridesCompleted}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Eco Rides</div>
                  <div className="w-full bg-slate-600 rounded-full h-1 mt-3">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-1 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Achievements */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                Achievements
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/school/rewards")}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-xl transition-all duration-300 hover:scale-105"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20'
                      : 'bg-slate-700/30 border-slate-600/30 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-yellow-500/30'
                        : 'bg-slate-600'
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.unlocked ? 'text-white' : 'text-slate-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold leading-tight ${
                        achievement.unlocked ? 'text-white' : 'text-slate-400'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className={`text-xs mt-1 ${
                        achievement.unlocked ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-yellow-300 font-medium">{achievement.progress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-slate-500 to-slate-400 h-2 rounded-full opacity-50"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{achievement.progress}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent backdrop-blur-xl border-t border-slate-700/50 p-4 z-20">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110 w-12 h-12 relative"
              onClick={() => navigate("/school/student")}
            >
              <Home className="w-6 h-6" />
            </Button>
            <div className="text-xs font-medium text-emerald-400 whitespace-nowrap">
              Dashboard
            </div>
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110 w-12 h-12 relative"
              onClick={() => navigate("/request-ride")}
            >
              <Car className="w-6 h-6" />
            </Button>
            <div className="text-xs font-medium text-slate-400 hover:text-emerald-300 whitespace-nowrap transition-colors duration-300">
              Request
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110 w-12 h-12 relative"
              onClick={() => navigate("/tracking")}
            >
              <Navigation className="w-6 h-6" />
            </Button>
            <div className="text-xs font-medium text-slate-400 hover:text-emerald-300 whitespace-nowrap transition-colors duration-300">
              Track
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300 hover:scale-110 w-12 h-12 relative"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-6 h-6" />
            </Button>
            <div className="text-xs font-medium text-slate-400 hover:text-emerald-300 whitespace-nowrap transition-colors duration-300">
              Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStudentDashboard;