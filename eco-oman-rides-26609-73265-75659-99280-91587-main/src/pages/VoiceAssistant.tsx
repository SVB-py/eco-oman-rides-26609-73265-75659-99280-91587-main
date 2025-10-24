import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, Mic, MicOff, Settings, Volume2, Play, 
  MapPin, Users, Clock, AlertTriangle, CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type ListeningStatus = "sleeping" | "listening" | "processing";

interface Message {
  role: "driver" | "assistant";
  content: string;
  timestamp: string;
}

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ListeningStatus>("sleeping");
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [speed, setSpeed] = useState([1]);
  const [voiceFeedback, setVoiceFeedback] = useState(true);

  const commands = [
    { text: "Start trip", icon: Play },
    { text: "Next stop", icon: MapPin },
    { text: "Student picked up", icon: Users },
    { text: "Emergency", icon: AlertTriangle },
    { text: "End trip", icon: CheckCircle },
    { text: "How many left?", icon: Users },
    { text: "Time to destination", icon: Clock },
  ];

  const handleCommand = (command: string) => {
    const now = new Date().toLocaleTimeString();
    
    setStatus("listening");
    setMessages(prev => [...prev, {
      role: "driver",
      content: `Hey ECpool, ${command.toLowerCase()}`,
      timestamp: now
    }]);

    setTimeout(() => {
      setStatus("processing");
    }, 500);

    setTimeout(() => {
      let response = "";
      
      switch(command.toLowerCase()) {
        case "start trip":
          response = "✓ Trip started at 7:00 AM. First stop: Seeb, 3 students waiting.";
          break;
        case "next stop":
          response = "✓ Moving to Al Khuwair. ETA 5 minutes. 4 students boarding.";
          break;
        case "student picked up":
          response = "✓ Ahmed boarded. 3 students remaining at this stop.";
          break;
        case "how many left?":
          response = "7 students remaining on route. Next stop has 4 waiting.";
          break;
        case "time to destination":
          response = "Arrive at Indian School in 12 minutes.";
          break;
        case "emergency":
          response = "🚨 Emergency activated! Alerting admin and all parents now.";
          toast.error("Emergency mode activated");
          break;
        case "end trip":
          response = "✓ Trip complete. 24 students delivered safely. Great job!";
          break;
        default:
          response = "Command received.";
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setStatus("sleeping");
      
      if (voiceFeedback) {
        toast.success(response);
      }
    }, 1500);
  };

  const toggleListening = () => {
    if (status === "sleeping") {
      setStatus("listening");
      toast.info("🎤 Listening... Say a command");
    } else {
      setStatus("sleeping");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="glass" size="icon" onClick={() => navigate(-1)}>
              <Home className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Voice Assistant</h1>
              <p className="text-sm text-muted-foreground">
                {status === "listening" ? "🎤 Listening..." : 
                 status === "processing" ? "💭 Processing..." : 
                 "💤 Say 'Hey ECpool' to start"}
              </p>
            </div>
            <Button 
              variant="glass" 
              size="icon" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualizer */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-8">
              <div className="flex flex-col items-center">
                {/* Audio Visualizer Circle */}
                <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                  {/* Animated Rings */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    status === "sleeping" ? "bg-muted/20" :
                    status === "listening" ? "bg-primary/20 animate-pulse" :
                    "bg-amber-500/20 animate-pulse"
                  }`} />
                  
                  {status !== "sleeping" && (
                    <>
                      <div className="absolute inset-8 rounded-full border-4 border-primary/30 animate-ping" />
                      <div className="absolute inset-16 rounded-full border-4 border-primary/20 animate-pulse" />
                      
                      {/* Audio Bars */}
                      <div className="absolute inset-24 flex items-center justify-center gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 rounded-full bg-primary transition-all duration-200 ${
                              status === "listening" ? "animate-pulse" : ""
                            }`}
                            style={{
                              height: `${Math.random() * 60 + 20}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Center Icon */}
                  <div className="relative z-10">
                    <button
                      onClick={toggleListening}
                      className={`p-8 rounded-full transition-all duration-300 ${
                        status === "sleeping" ? "bg-muted hover:bg-muted/80" :
                        status === "listening" ? "bg-primary hover:bg-primary/90 animate-glow-pulse" :
                        "bg-amber-500 animate-glow-pulse"
                      }`}
                    >
                      {status === "sleeping" ? (
                        <MicOff className="w-24 h-24 text-muted-foreground" />
                      ) : (
                        <Mic className="w-24 h-24 text-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Command Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-2xl">
                  {commands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <Button
                        key={cmd.text}
                        variant="outline"
                        onClick={() => handleCommand(cmd.text)}
                        className="hover:scale-105 transition-transform"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {cmd.text}
                      </Button>
                    );
                  })}
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  Click a command chip or speak naturally to control your trip
                </p>
              </div>
            </Card>
          </div>

          {/* Conversation History & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Settings Panel */}
            {showSettings && (
              <Card className="glass-card p-6 animate-slide-up">
                <h3 className="text-lg font-bold mb-4">Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label>Wake Word</Label>
                    <p className="text-sm text-muted-foreground mb-2">"Hey ECpool"</p>
                  </div>

                  <div>
                    <Label>Speech Speed: {speed[0]}x</Label>
                    <Slider
                      value={speed}
                      onValueChange={setSpeed}
                      min={0.5}
                      max={2}
                      step={0.25}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Voice Feedback</Label>
                    <Switch
                      checked={voiceFeedback}
                      onCheckedChange={setVoiceFeedback}
                    />
                  </div>

                  <div>
                    <Label>Voice</Label>
                    <select className="w-full mt-2 px-3 py-2 bg-card border border-border rounded-md">
                      <option>Male (English)</option>
                      <option>Female (English)</option>
                      <option>Male (Arabic)</option>
                      <option>Female (Arabic)</option>
                    </select>
                  </div>

                  <div>
                    <Label>Sensitivity</Label>
                    <Slider
                      defaultValue={[50]}
                      min={0}
                      max={100}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Conversation History */}
            <Card className="glass-card p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Conversation History
              </h3>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No commands yet. Try saying a command!
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${
                        msg.role === "driver"
                          ? "bg-primary/20 ml-4"
                          : "bg-secondary/20 mr-4"
                      }`}
                    >
                      <p className="text-sm font-semibold mb-1">
                        {msg.role === "driver" ? "You" : "Assistant"}
                      </p>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {msg.timestamp}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {messages.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setMessages([])}
                >
                  Clear History
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
