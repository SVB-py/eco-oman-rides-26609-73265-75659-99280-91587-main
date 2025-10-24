import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Plus,
  Filter,
  Search,
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const CommunityEvents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const events = [
    {
      id: 1,
      title: "Community Garden Planting Day",
      description: "Join us for a day of planting vegetables and flowers in our community garden. Tools and seeds provided.",
      date: "2025-10-28",
      time: "09:00 AM",
      location: "Al Mouj Community Garden",
      attendees: 24,
      maxAttendees: 30,
      status: "upcoming",
      organizer: "Green Thumb Initiative",
      category: "Environment",
      image: "🌱",
    },
    {
      id: 2,
      title: "Women's Tech Networking",
      description: "Connect with fellow women in tech, share experiences, and build professional relationships.",
      date: "2025-10-25",
      time: "06:30 PM",
      location: "Tech Hub Oman",
      attendees: 18,
      maxAttendees: 25,
      status: "upcoming",
      organizer: "Women in Tech Oman",
      category: "Professional",
      image: "💻",
    },
    {
      id: 3,
      title: "Youth Basketball Tournament",
      description: "Annual community basketball tournament for ages 12-18. Teams welcome!",
      date: "2025-11-02",
      time: "04:00 PM",
      location: "Sports Complex",
      attendees: 45,
      maxAttendees: 60,
      status: "upcoming",
      organizer: "Youth Sports Club",
      category: "Sports",
      image: "🏀",
    },
    {
      id: 4,
      title: "Arabic Calligraphy Workshop",
      description: "Learn traditional Arabic calligraphy techniques with local master calligrapher.",
      date: "2025-10-20",
      time: "02:00 PM",
      location: "Cultural Center",
      attendees: 15,
      maxAttendees: 20,
      status: "completed",
      organizer: "Cultural Heritage Society",
      category: "Arts",
      image: "✒️",
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleJoinEvent = (eventId: number) => {
    toast({
      title: "Joined Event!",
      description: "You've successfully joined this community event.",
    });
  };

  const handleCreateEvent = () => {
    toast({
      title: "Event Created!",
      description: "Your community event has been created and shared.",
    });
    setIsCreateDialogOpen(false);
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
                  Community Events
                </h1>
                <p className="text-sm text-slate-400">Plan and join local community activities</p>
              </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Create Community Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Event Title</label>
                    <Input placeholder="Enter event title" className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Description</label>
                    <Textarea placeholder="Describe your event" className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Date</label>
                      <Input type="date" className="bg-slate-800 border-slate-600 text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Time</label>
                      <Input type="time" className="bg-slate-800 border-slate-600 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Location</label>
                    <Input placeholder="Event location" className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300">Category</label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="arts">Arts & Culture</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateEvent} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="glass-card border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{event.image}</div>
                    <div>
                      <Badge
                        className={`text-xs ${
                          event.status === 'upcoming'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                        }`}
                      >
                        {event.status}
                      </Badge>
                      <p className="text-xs text-slate-400 mt-1">{event.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white text-lg group-hover:text-emerald-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}/{event.maxAttendees} attending</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500">
                    by {event.organizer}
                  </div>
                  {event.status === 'upcoming' && (
                    <Button
                      size="sm"
                      onClick={() => handleJoinEvent(event.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Join Event
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No events found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityEvents;