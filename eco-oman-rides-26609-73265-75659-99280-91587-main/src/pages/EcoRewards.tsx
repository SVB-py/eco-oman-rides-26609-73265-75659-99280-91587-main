import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Trophy,
  Star,
  Gift,
  Target,
  TrendingUp,
  Award,
  Leaf,
  Car,
  CheckCircle,
  Lock,
  Zap,
  Crown,
  Medal,
  Flame,
  Calendar,
  Coins
} from "lucide-react";

const EcoRewards = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock rewards data
  const rewardsStats = {
    totalPoints: 2450,
    pointsThisMonth: 380,
    achievementsUnlocked: 8,
    totalAchievements: 15,
    currentLevel: "Eco Champion",
    nextLevelPoints: 3000
  };

  const achievements = [
    {
      id: 1,
      title: "First Ride",
      description: "Complete your first eco-friendly ride",
      icon: Car,
      points: 50,
      unlocked: true,
      unlockedDate: "2025-09-15",
      category: "rides"
    },
    {
      id: 2,
      title: "Eco Warrior",
      description: "Complete 25 eco-rides",
      icon: Leaf,
      points: 250,
      unlocked: true,
      unlockedDate: "2025-10-01",
      category: "rides"
    },
    {
      id: 3,
      title: "Perfect Attendance",
      description: "15-day attendance streak",
      icon: Target,
      points: 300,
      unlocked: true,
      unlockedDate: "2025-10-10",
      category: "attendance"
    },
    {
      id: 4,
      title: "Carbon Saver",
      description: "Save 10kg of CO₂",
      icon: TrendingUp,
      points: 200,
      unlocked: true,
      unlockedDate: "2025-10-05",
      category: "impact"
    },
    {
      id: 5,
      title: "Early Bird",
      description: "Arrive on time for 10 consecutive days",
      icon: CheckCircle,
      points: 150,
      unlocked: true,
      unlockedDate: "2025-09-28",
      category: "attendance"
    },
    {
      id: 6,
      title: "Ride Sharer",
      description: "Share rides with 5 different classmates",
      icon: Star,
      points: 100,
      unlocked: false,
      progress: 3,
      total: 5,
      category: "social"
    },
    {
      id: 7,
      title: "Eco Champion",
      description: "Reach 50 eco-rides completed",
      icon: Crown,
      points: 500,
      unlocked: false,
      progress: 28,
      total: 50,
      category: "rides"
    },
    {
      id: 8,
      title: "Green Guardian",
      description: "Save 25kg of CO₂ total",
      icon: Medal,
      points: 400,
      unlocked: false,
      progress: 12.5,
      total: 25,
      category: "impact"
    },
    {
      id: 9,
      title: "Streak Master",
      description: "Maintain 30-day attendance streak",
      icon: Flame,
      points: 600,
      unlocked: false,
      progress: 15,
      total: 30,
      category: "attendance"
    },
    {
      id: 10,
      title: "Community Builder",
      description: "Refer 3 friends to the eco-ride program",
      icon: Gift,
      points: 300,
      unlocked: false,
      progress: 1,
      total: 3,
      category: "social"
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Free School Lunch",
      description: "One free lunch at school cafeteria",
      points: 500,
      image: "🍽️",
      available: true,
      category: "food"
    },
    {
      id: 2,
      title: "Movie Tickets",
      description: "2 cinema tickets for weekend show",
      points: 800,
      image: "🎬",
      available: true,
      category: "entertainment"
    },
    {
      id: 3,
      title: "Eco Backpack",
      description: "Sustainable backpack made from recycled materials",
      points: 1200,
      image: "🎒",
      available: true,
      category: "gear"
    },
    {
      id: 4,
      title: "Book Voucher",
      description: "$25 bookstore voucher",
      points: 600,
      image: "📚",
      available: true,
      category: "education"
    },
    {
      id: 5,
      title: "Bike Helmet",
      description: "Safety helmet for cycling",
      points: 1000,
      image: "🚲",
      available: false,
      category: "gear"
    }
  ];

  const categories = [
    { id: "all", label: "All", icon: Trophy },
    { id: "rides", label: "Rides", icon: Car },
    { id: "attendance", label: "Attendance", icon: CheckCircle },
    { id: "impact", label: "Impact", icon: Leaf },
    { id: "social", label: "Social", icon: Star }
  ];

  const filteredAchievements = selectedCategory === "all"
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const getAchievementIcon = (achievement: any) => {
    const IconComponent = achievement.icon;
    return <IconComponent className="w-6 h-6" />;
  };

  const getProgressPercentage = (achievement: any) => {
    if (achievement.unlocked) return 100;
    if (!achievement.progress) return 0;
    return (achievement.progress / achievement.total) * 100;
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
              <h1 className="text-2xl font-bold text-white">Eco Rewards</h1>
              <p className="text-slate-400">Earn points and unlock achievements</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {rewardsStats.totalPoints.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Total Points</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Points Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in">
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Coins className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xl font-bold text-white">{rewardsStats.pointsThisMonth}</div>
                  <div className="text-sm text-slate-400">This Month</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-teal-400" />
                <div>
                  <div className="text-xl font-bold text-white">{rewardsStats.achievementsUnlocked}/{rewardsStats.totalAchievements}</div>
                  <div className="text-sm text-slate-400">Achievements</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-6 h-6 text-cyan-400" />
                <div>
                  <div className="text-lg font-bold text-white">{rewardsStats.currentLevel}</div>
                  <div className="text-sm text-slate-400">Current Level</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-xl font-bold text-white">{rewardsStats.nextLevelPoints - rewardsStats.totalPoints}</div>
                  <div className="text-sm text-slate-400">To Next Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Level Progress
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {rewardsStats.currentLevel}
              </Badge>
            </div>
            <Progress
              value={(rewardsStats.totalPoints / rewardsStats.nextLevelPoints) * 100}
              className="h-3 mb-2"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>{rewardsStats.totalPoints} points</span>
              <span>{rewardsStats.nextLevelPoints} points</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" />
                Achievements
              </h3>
              <Badge className="bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {filteredAchievements.filter(a => a.unlocked).length} / {filteredAchievements.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-600/50 text-slate-500'
                    }`}>
                      {achievement.unlocked ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                            +{achievement.points} pts
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                        {achievement.description}
                      </p>
                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div className="space-y-1">
                          <Progress value={getProgressPercentage(achievement)} className="h-2" />
                          <div className="text-xs text-slate-400">
                            {achievement.progress} / {achievement.total}
                          </div>
                        </div>
                      )}
                      {achievement.unlocked && achievement.unlockedDate && (
                        <div className="text-xs text-emerald-400">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-400" />
                Available Rewards
              </h3>
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Redeem Points
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    reward.available
                      ? 'bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/30 hover:border-purple-500/50'
                      : 'bg-slate-700/30 border-slate-600/30 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{reward.image}</div>
                    <h4 className={`font-semibold mb-2 ${reward.available ? 'text-white' : 'text-slate-400'}`}>
                      {reward.title}
                    </h4>
                    <p className={`text-sm mb-3 ${reward.available ? 'text-slate-300' : 'text-slate-500'}`}>
                      {reward.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={reward.available ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-600/50 text-slate-500'}>
                        {reward.points} pts
                      </Badge>
                      <Button
                        size="sm"
                        disabled={!reward.available || rewardsStats.totalPoints < reward.points}
                        className={`${
                          reward.available && rewardsStats.totalPoints >= reward.points
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                            : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {reward.available ? 'Redeem' : 'Unavailable'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoRewards;