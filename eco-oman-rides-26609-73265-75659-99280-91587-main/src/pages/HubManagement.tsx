import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Users,
  MapPin,
  Activity,
  Plus,
  Search,
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  Shield,
  Bell,
  BarChart3,
  MessageSquare,
  Calendar,
  Star,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const HubManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const hubStats = {
    totalMembers: 247,
    activeMembers: 189,
    totalEvents: 34,
    upcomingEvents: 8,
    totalRides: 1567,
    ecoCredits: 45230,
  };

  const members = [
    {
      id: 1,
      name: "Ahmed Al-Rashid",
      role: "Hub Coordinator",
      status: "active",
      joinDate: "2024-01-15",
      ridesCompleted: 45,
      ecoCredits: 1250,
      avatar: "AR",
    },
    {
      id: 2,
      name: "Fatima Al-Zahra",
      role: "Community Driver",
      status: "active",
      joinDate: "2024-02-20",
      ridesCompleted: 32,
      ecoCredits: 890,
      avatar: "FZ",
    },
    {
      id: 3,
      name: "Omar Al-Mansoori",
      role: "Member",
      status: "inactive",
      joinDate: "2024-03-10",
      ridesCompleted: 12,
      ecoCredits: 340,
      avatar: "OM",
    },
    {
      id: 4,
      name: "Layla Al-Hamad",
      role: "Event Organizer",
      status: "active",
      joinDate: "2024-01-28",
      ridesCompleted: 28,
      ecoCredits: 720,
      avatar: "LH",
    },
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberAction = (action: string, memberId: number) => {
    toast({
      title: "Action Completed",
      description: `${action} action performed for member.`,
    });
  };

  const handleHubSettingChange = (setting: string, value: boolean) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1810] via-[#0d1f15] to-[#0a0f1a] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Hub Management
                </h1>
                <p className="text-sm text-slate-400">Manage your community hub and members</p>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
              <Settings className="w-4 h-4 mr-2" />
              Hub Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Overview</TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-emerald-600">Members</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-emerald-600">Events</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-600">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-emerald-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.totalMembers}</p>
                      <p className="text-xs text-slate-400">Total Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.activeMembers}</p>
                      <p className="text-xs text-slate-400">Active Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.totalEvents}</p>
                      <p className="text-xs text-slate-400">Total Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.upcomingEvents}</p>
                      <p className="text-xs text-slate-400">Upcoming Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.totalRides}</p>
                      <p className="text-xs text-slate-400">Total Rides</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{hubStats.ecoCredits.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Eco Credits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-card border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">New member joined: Sarah Al-Mahmoud</p>
                      <p className="text-xs text-slate-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Community Garden event completed</p>
                      <p className="text-xs text-slate-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <div className="flex-1">
                      <p className="text-sm text-white">Hub reached 250 total rides milestone</p>
                      <p className="text-xs text-slate-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="glass-card border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-600 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{member.name}</h3>
                          <p className="text-sm text-slate-400">{member.role}</p>
                          <p className="text-xs text-slate-500">Joined {member.joinDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white">{member.ridesCompleted} rides</p>
                          <p className="text-xs text-slate-400">{member.ecoCredits} credits</p>
                        </div>
                        <Badge
                          className={`${
                            member.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Hub Events</h3>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Community Garden Day</h4>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">Join us for planting vegetables and flowers in our community garden.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Oct 28, 2025 • 9:00 AM</span>
                    <span className="text-emerald-400">24/30 attendees</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-slate-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Tech Networking Meetup</h4>
                    <Badge className="bg-blue-500/20 text-blue-400">Upcoming</Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">Connect with fellow tech enthusiasts and share experiences.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Oct 25, 2025 • 6:30 PM</span>
                    <span className="text-blue-400">18/25 attendees</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Hub Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Public Hub</h4>
                    <p className="text-sm text-slate-400">Allow anyone to join your hub</p>
                  </div>
                  <Switch
                    defaultChecked
                    onCheckedChange={(checked) => handleHubSettingChange("Public Hub", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Event Notifications</h4>
                    <p className="text-sm text-slate-400">Send notifications for new events</p>
                  </div>
                  <Switch
                    defaultChecked
                    onCheckedChange={(checked) => handleHubSettingChange("Event Notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Ride Sharing</h4>
                    <p className="text-sm text-slate-400">Enable ride sharing within the hub</p>
                  </div>
                  <Switch
                    defaultChecked
                    onCheckedChange={(checked) => handleHubSettingChange("Ride Sharing", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Eco Credit Rewards</h4>
                    <p className="text-sm text-slate-400">Reward members with eco credits</p>
                  </div>
                  <Switch
                    defaultChecked
                    onCheckedChange={(checked) => handleHubSettingChange("Eco Credit Rewards", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-800">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Member Roles
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-800">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Content Moderation
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-600 text-white hover:bg-slate-800">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Management
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HubManagement;