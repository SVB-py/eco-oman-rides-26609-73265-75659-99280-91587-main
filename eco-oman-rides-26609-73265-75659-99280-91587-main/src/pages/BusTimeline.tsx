import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, MapPin, Clock, Users, CheckCircle, Bus, 
  AlertTriangle, Phone, ChevronDown, ChevronUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Student {
  name: string;
  photo: string;
}

interface Stop {
  id: number;
  name: string;
  status: "completed" | "current" | "upcoming";
  scheduledTime: string;
  actualTime?: string;
  students: Student[];
  studentCount: number;
  duration?: string;
  eta?: string;
  distance?: string;
  expanded?: boolean;
}

const BusTimeline = () => {
  const navigate = useNavigate();
  const [stops, setStops] = useState<Stop[]>([
    {
      id: 1,
      name: "Seeb Market",
      status: "completed",
      scheduledTime: "7:00 AM",
      actualTime: "7:02 AM",
      students: [
        { name: "Ahmed", photo: "👨" },
        { name: "Fatima", photo: "👧" },
        { name: "Sara", photo: "👩" }
      ],
      studentCount: 3,
      duration: "2 min",
    },
    {
      id: 2,
      name: "Al Khuwair Plaza",
      status: "current",
      scheduledTime: "7:10 AM",
      eta: "Arriving in 2 mins",
      students: [
        { name: "Mohammed", photo: "👦" },
        { name: "Layla", photo: "👧" },
        { name: "Omar", photo: "🧒" },
        { name: "Zainab", photo: "👧" }
      ],
      studentCount: 4,
    },
    {
      id: 3,
      name: "Ruwi Junction",
      status: "upcoming",
      scheduledTime: "7:20 AM",
      eta: "In 10 mins",
      students: [
        { name: "Hassan", photo: "👦" },
        { name: "Maryam", photo: "👧" },
        { name: "Khalid", photo: "👨" },
        { name: "Aisha", photo: "👧" },
        { name: "Rashid", photo: "👦" }
      ],
      studentCount: 5,
      distance: "3.5 km",
    },
    {
      id: 4,
      name: "Qurum Beach Area",
      status: "upcoming",
      scheduledTime: "7:30 AM",
      studentCount: 6,
      students: [],
      distance: "6.2 km",
    },
    {
      id: 5,
      name: "Al Khoudh Junction",
      status: "upcoming",
      scheduledTime: "7:40 AM",
      studentCount: 4,
      students: [],
      distance: "9.1 km",
    },
    {
      id: 6,
      name: "Bausher District",
      status: "upcoming",
      scheduledTime: "7:50 AM",
      studentCount: 2,
      students: [],
      distance: "12.3 km",
    },
    {
      id: 7,
      name: "Indian School",
      status: "upcoming",
      scheduledTime: "8:00 AM",
      studentCount: 0,
      students: [],
      distance: "15 km",
    },
  ]);

  const [trafficAlert, setTrafficAlert] = useState(false);
  
  const toggleExpand = (stopId: number) => {
    setStops(prev => prev.map(stop => 
      stop.id === stopId ? { ...stop, expanded: !stop.expanded } : stop
    ));
  };

  const markArrived = () => {
    toast.success("Marked as arrived at Al Khuwair Plaza");
    // Move to next stop
    setTimeout(() => {
      setStops(prev => prev.map(stop => {
        if (stop.id === 2) return { ...stop, status: "completed" as const, actualTime: "7:12 AM" };
        if (stop.id === 3) return { ...stop, status: "current" as const };
        return stop;
      }));
    }, 1000);
  };

  const completedCount = stops.filter(s => s.status === "completed").length;
  const totalPickup = stops.reduce((sum, s) => sum + s.studentCount, 0);
  const pickedUp = stops.filter(s => s.status === "completed").reduce((sum, s) => sum + s.studentCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="glass" size="icon" onClick={() => navigate(-1)}>
              <Home className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Today's Route</h1>
              <p className="text-sm text-muted-foreground">Morning Route A</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">{completedCount}/7 stops</p>
              <p className="text-xs text-muted-foreground">{totalPickup} students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Summary */}
        <Card className="glass-card p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{completedCount}/7</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{pickedUp}/{totalPickup}</p>
              <p className="text-sm text-muted-foreground">Picked Up</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">15km</p>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">2.8kg</p>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(completedCount / 7) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Traffic Alert */}
        {trafficAlert && (
          <Card className="glass-card p-4 mb-6 bg-amber-500/10 border-amber-500/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div className="flex-1">
                <p className="font-semibold">Running 5 mins late - Traffic</p>
                <p className="text-sm text-muted-foreground">Heavy traffic near Al Khuwair Plaza</p>
              </div>
            </div>
          </Card>
        )}

        {/* Timeline */}
        <div className="space-y-6">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative">
              {/* Connecting Line */}
              {index < stops.length - 1 && (
                <div className={`absolute left-8 top-16 w-1 h-24 ${
                  stop.status === "completed" ? "bg-primary" :
                  stop.status === "current" ? "bg-primary/50 animate-pulse" :
                  "bg-muted"
                }`} />
              )}

              <Card className={`glass-card p-6 transition-all duration-300 ${
                stop.status === "current" ? "ring-2 ring-primary shadow-glow animate-glow-pulse" :
                stop.status === "completed" ? "bg-primary/5" :
                ""
              }`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-full flex-shrink-0 ${
                    stop.status === "completed" ? "bg-primary" :
                    stop.status === "current" ? "bg-primary animate-glow-pulse" :
                    "bg-muted"
                  }`}>
                    {stop.status === "completed" && (
                      <CheckCircle className="w-8 h-8 text-foreground" />
                    )}
                    {stop.status === "current" && (
                      <Bus className="w-8 h-8 text-foreground animate-pulse" />
                    )}
                    {stop.status === "upcoming" && (
                      <Clock className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-xl font-bold ${
                          stop.status === "current" ? "text-primary" : ""
                        }`}>
                          {stop.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {stop.scheduledTime}
                            {stop.actualTime && (
                              <span className="text-primary ml-1">→ {stop.actualTime}</span>
                            )}
                          </span>
                          {stop.duration && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              {stop.duration}
                            </span>
                          )}
                          {stop.eta && (
                            <span className={`font-semibold ${
                              stop.status === "current" ? "text-primary animate-pulse" : ""
                            }`}>
                              {stop.eta}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {stop.status !== "completed" && stop.distance && (
                        <span className="text-sm text-muted-foreground">{stop.distance}</span>
                      )}
                    </div>

                    {/* Students */}
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div className="flex -space-x-2">
                        {stop.students.slice(0, 5).map((student, i) => (
                          <Avatar key={i} className="w-8 h-8 border-2 border-background bg-gradient-primary">
                            <div className="text-sm">{student.photo}</div>
                          </Avatar>
                        ))}
                        {stop.studentCount > 5 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{stop.studentCount - 5}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {stop.studentCount} student{stop.studentCount !== 1 ? "s" : ""}
                      </span>
                      
                      {stop.students.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(stop.id)}
                        >
                          {stop.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      )}
                    </div>

                    {/* Expanded Student List */}
                    {stop.expanded && stop.students.length > 0 && (
                      <div className="mt-4 p-4 bg-card/50 rounded-lg space-y-2 animate-fade-in">
                        {stop.students.map((student, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8 bg-gradient-primary">
                                <div className="text-lg">{student.photo}</div>
                              </Avatar>
                              <span className="text-sm font-semibold">{student.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="mt-3">
                      {stop.status === "completed" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                          ✓ Boarded
                        </span>
                      )}
                      {stop.status === "current" && (
                        <Button 
                          variant="hero" 
                          size="lg"
                          onClick={markArrived}
                          className="animate-pulse"
                        >
                          Mark Arrived
                        </Button>
                      )}
                      {stop.status === "upcoming" && (
                        <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                          Waiting
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <Card className="glass-card p-4 mt-8 sticky bottom-6">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <MapPin className="w-4 h-4 mr-2" />
              Skip Stop
            </Button>
            <Button variant="outline" className="flex-1">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BusTimeline;
