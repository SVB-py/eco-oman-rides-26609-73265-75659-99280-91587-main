import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Target,
  Award,
  MapPin,
  User
} from "lucide-react";

const Attendance = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("October 2025");

  // Mock attendance data
  const attendanceStats = {
    totalDays: 22,
    presentDays: 20,
    absentDays: 1,
    lateDays: 1,
    attendanceRate: 95.5,
    currentStreak: 15
  };

  const attendanceRecords = [
    { date: "2025-10-23", status: "present", time: "7:45 AM", points: 25 },
    { date: "2025-10-22", status: "present", time: "8:00 AM", points: 25 },
    { date: "2025-10-21", status: "late", time: "8:15 AM", points: 15 },
    { date: "2025-10-20", status: "present", time: "7:50 AM", points: 25 },
    { date: "2025-10-19", status: "present", time: "7:55 AM", points: 25 },
    { date: "2025-10-18", status: "present", time: "8:05 AM", points: 25 },
    { date: "2025-10-17", status: "absent", time: "-", points: 0 },
    { date: "2025-10-16", status: "present", time: "7:40 AM", points: 25 },
    { date: "2025-10-15", status: "present", time: "8:10 AM", points: 25 },
    { date: "2025-10-14", status: "present", time: "7:35 AM", points: 25 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "late": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "absent": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="w-4 h-4" />;
      case "late": return <Clock className="w-4 h-4" />;
      case "absent": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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
              <h1 className="text-2xl font-bold text-white">Attendance Tracker</h1>
              <p className="text-slate-400">Monitor your school attendance</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {selectedMonth}
          </Badge>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Attendance Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in">
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xl font-bold text-white">{attendanceStats.presentDays}</div>
                  <div className="text-sm text-slate-400">Present</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-xl font-bold text-white">{attendanceStats.lateDays}</div>
                  <div className="text-sm text-slate-400">Late</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-6 h-6 text-red-400" />
                <div>
                  <div className="text-xl font-bold text-white">{attendanceStats.absentDays}</div>
                  <div className="text-sm text-slate-400">Absent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-teal-400" />
                <div>
                  <div className="text-xl font-bold text-white">{attendanceStats.attendanceRate}%</div>
                  <div className="text-sm text-slate-400">Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Rate Progress */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Monthly Attendance Rate
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {attendanceStats.attendanceRate}%
              </Badge>
            </div>
            <Progress value={attendanceStats.attendanceRate} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-slate-400">
              <span>Target: 95%</span>
              <span>Current: {attendanceStats.attendanceRate}%</span>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Attendance Streak</h3>
                  <p className="text-slate-400">Keep it up!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {attendanceStats.currentStreak}
                </div>
                <div className="text-sm text-slate-400">Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                Recent Attendance
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 rounded-xl transition-all duration-300"
              >
                View Calendar
              </Button>
            </div>
            <div className="space-y-3">
              {attendanceRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-slate-400">
                        {record.status === 'absent' ? 'No ride taken' : `Arrived at ${record.time}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {record.points > 0 && (
                      <Badge className="bg-emerald-500/20 text-emerald-300">
                        +{record.points} pts
                      </Badge>
                    )}
                    {record.status === 'absent' && (
                      <Badge className="bg-red-500/20 text-red-300">
                        0 pts
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Insights */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Attendance Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-medium">Best Performance</span>
                </div>
                <p className="text-slate-400 text-sm">You've maintained 95%+ attendance for 3 months</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span className="text-white font-medium">Improvement</span>
                </div>
                <p className="text-slate-400 text-sm">2% increase from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;