import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Car,
  Navigation,
  Bell,
  Repeat
} from "lucide-react";

const Schedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month"); // month, week, day

  // Mock schedule data
  const scheduleData = {
    "2025-10-23": [
      { time: "7:45 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "Sarah Wilson", status: "completed" },
      { time: "3:30 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "Sarah Wilson", status: "scheduled" }
    ],
    "2025-10-24": [
      { time: "7:50 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "Mike Chen", status: "scheduled" },
      { time: "3:25 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "Mike Chen", status: "scheduled" }
    ],
    "2025-10-25": [
      { time: "7:45 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "Emma Davis", status: "scheduled" },
      { time: "3:30 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "Emma Davis", status: "scheduled" }
    ],
    "2025-10-28": [
      { time: "7:40 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "John Smith", status: "scheduled" },
      { time: "3:35 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "John Smith", status: "scheduled" }
    ],
    "2025-10-29": [
      { time: "7:55 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "Sarah Wilson", status: "scheduled" },
      { time: "3:20 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "Sarah Wilson", status: "scheduled" }
    ],
    "2025-10-30": [
      { time: "7:45 AM", type: "pickup", location: "123 Main St", destination: "Green Valley High School", driver: "Mike Chen", status: "scheduled" },
      { time: "3:30 PM", type: "dropoff", location: "Green Valley High School", destination: "456 Oak Ave", driver: "Mike Chen", status: "scheduled" }
    ]
  };

  const recurringSchedule = [
    { day: "Monday", pickup: "7:45 AM", dropoff: "3:30 PM", driver: "Sarah Wilson" },
    { day: "Tuesday", pickup: "7:50 AM", dropoff: "3:25 PM", driver: "Mike Chen" },
    { day: "Wednesday", pickup: "7:45 AM", dropoff: "3:30 PM", driver: "Emma Davis" },
    { day: "Thursday", pickup: "7:40 AM", dropoff: "3:35 PM", driver: "John Smith" },
    { day: "Friday", pickup: "7:55 AM", dropoff: "3:20 PM", driver: "Sarah Wilson" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "scheduled": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "cancelled": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "pickup" ? <MapPin className="w-4 h-4" /> : <Navigation className="w-4 h-4" />;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const hasSchedule = (day: number) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduleData[dateKey] && scheduleData[dateKey].length > 0;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const today = new Date();
  const isToday = (day: number) => {
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/school/student")}
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Ride Schedule</h1>
              <p className="text-slate-400">Plan your eco-friendly rides</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedView("month")}
              className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                selectedView === "month"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              }`}
            >
              Month
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedView("week")}
              className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                selectedView === "week"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10"
              }`}
            >
              Week
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{formatDate(currentDate)}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl animate-fade-in">
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-slate-400 font-medium text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 rounded-xl border transition-all duration-300 ${
                    day
                      ? `border-slate-700/50 hover:border-emerald-500/50 cursor-pointer ${
                          isToday(day) ? 'bg-emerald-500/10 border-emerald-500/30' : 'hover:bg-slate-700/30'
                        }`
                      : 'border-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(day) ? 'text-emerald-300' : 'text-white'
                      }`}>
                        {day}
                      </div>
                      {hasSchedule(day) && (
                        <div className="space-y-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto"></div>
                          {scheduleData[`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`]?.length > 1 && (
                            <div className="w-2 h-2 bg-teal-400 rounded-full mx-auto"></div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Today's Schedule
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Badge>
            </div>
            <div className="space-y-3">
              {scheduleData["2025-10-23"]?.map((ride, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${getStatusColor(ride.status)}`}>
                      {getTypeIcon(ride.type)}
                    </div>
                    <div>
                      <div className="text-white font-medium flex items-center gap-2">
                        {ride.type === "pickup" ? "Pickup" : "Drop-off"}
                        <Badge className={`text-xs ${getStatusColor(ride.status)}`}>
                          {ride.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ride.time}
                      </div>
                      <div className="text-sm text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {ride.driver}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate("/tracking")}
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              )) || (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No rides scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recurring Schedule */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Repeat className="w-5 h-5 text-teal-400" />
                Weekly Schedule
              </h3>
              <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Recurring
              </Badge>
            </div>
            <div className="space-y-3">
              {recurringSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{schedule.day}</div>
                      <div className="text-sm text-slate-400 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {schedule.pickup}
                        </span>
                        <span className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {schedule.dropoff}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">{schedule.driver}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/request-ride")}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <Car className="w-5 h-5 mr-2" />
            Request Extra Ride
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/settings")}
            className="border-slate-600 text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 font-semibold py-4 rounded-xl transition-all duration-300"
          >
            <Bell className="w-5 h-5 mr-2" />
            Schedule Reminders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;