import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Nfc, CheckCircle, XCircle, AlertCircle, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

type ScanStatus = "idle" | "scanning" | "success" | "error";

interface Student {
  id: string;
  name: string;
  grade: string;
  photo: string;
  status: "waiting" | "boarded";
  boardedAt?: string;
  medicalAlert?: string;
}

const NfcScanner = () => {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Ahmed Al-Balushi", grade: "Grade 8", photo: "👨", status: "waiting" },
    { id: "2", name: "Fatima Mohammed", grade: "Grade 7", photo: "👧", status: "waiting", medicalAlert: "Asthma" },
    { id: "3", name: "Mohammed Ali", grade: "Grade 9", photo: "👦", status: "waiting" },
    { id: "4", name: "Sara Hassan", grade: "Grade 8", photo: "👩", status: "waiting" },
    { id: "5", name: "Omar Abdullah", grade: "Grade 7", photo: "🧒", status: "waiting" },
  ]);

  const boarded = students.filter(s => s.status === "boarded").length;
  const total = students.length;

  const simulateScan = (student: Student) => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("success");
      setScannedStudent(student);
      
      // Update student status
      setStudents(prev => prev.map(s => 
        s.id === student.id 
          ? { ...s, status: "boarded" as const, boardedAt: new Date().toLocaleTimeString() }
          : s
      ));

      // Play success sound (simulated)
      toast.success(`${student.name} boarded successfully`);
      
      // Notify parent
      setTimeout(() => {
        toast.info(`✓ Parent notified: ${student.name} boarded at ${new Date().toLocaleTimeString()}`);
      }, 1000);

      // Reset after 3 seconds
      setTimeout(() => {
        setScanStatus("idle");
        setScannedStudent(null);
      }, 3000);
    }, 800);
  };

  const simulateError = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("error");
      toast.error("Card not recognized. Please try again.");
      setTimeout(() => {
        setScanStatus("idle");
      }, 2000);
    }, 800);
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
              <h1 className="text-2xl font-bold">NFC Boarding Scanner</h1>
              <p className="text-sm text-muted-foreground">Seeb → Indian School</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scanning Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-8">
              <div className="flex flex-col items-center">
                {/* Scan Circle */}
                <div className="relative w-96 h-96 flex items-center justify-center">
                  {/* Animated Rings */}
                  <div className={`absolute inset-0 rounded-full ${
                    scanStatus === "idle" ? "bg-primary/10 animate-pulse" :
                    scanStatus === "scanning" ? "bg-blue-500/20" :
                    scanStatus === "success" ? "bg-primary/20" :
                    "bg-destructive/20"
                  } transition-all duration-300`} />
                  
                  {scanStatus === "idle" && (
                    <>
                      <div className="absolute inset-8 rounded-full border-4 border-primary/30 animate-ping" />
                      <div className="absolute inset-16 rounded-full border-4 border-primary/20 animate-pulse" />
                    </>
                  )}

                  {/* Center Content */}
                  <div className="relative z-10 text-center">
                    {scanStatus === "idle" && (
                      <>
                        <Nfc className="w-20 h-20 text-primary mx-auto mb-4 animate-glow-pulse" />
                        <p className="text-lg text-muted-foreground mb-2">Hold card near device</p>
                        <p className="text-sm text-primary font-semibold">Ready to scan</p>
                      </>
                    )}

                    {scanStatus === "scanning" && (
                      <>
                        <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                        <p className="text-lg font-semibold">Reading...</p>
                      </>
                    )}

                    {scanStatus === "success" && scannedStudent && (
                      <div className="animate-scale-in">
                        <CheckCircle className="w-24 h-24 text-primary mx-auto mb-4" />
                        <div className="text-6xl mb-4">{scannedStudent.photo}</div>
                        <h3 className="text-2xl font-bold mb-2">{scannedStudent.name}</h3>
                        <p className="text-muted-foreground mb-2">{scannedStudent.grade}</p>
                        <p className="text-primary font-semibold">
                          {scannedStudent.boardedAt}
                        </p>
                        {scannedStudent.medicalAlert && (
                          <div className="mt-4 flex items-center justify-center gap-2 text-amber-500">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm font-semibold">{scannedStudent.medicalAlert}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {scanStatus === "error" && (
                      <div className="animate-scale-in">
                        <XCircle className="w-24 h-24 text-destructive mx-auto mb-4" />
                        <p className="text-xl font-semibold text-destructive">Not recognized</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Demo Buttons */}
                <div className="mt-8 space-y-2 w-full max-w-md">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Demo Mode: Click a student card to simulate NFC tap
                  </p>
                </div>
              </div>
            </Card>

            {/* Summary */}
            <Card className="glass-card p-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Current Stop: Al Khuwair Plaza</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      <Users className="w-4 h-4 inline mr-1" />
                      {boarded}/{total} boarded
                    </span>
                    <span className="text-muted-foreground">
                      {total - boarded} remaining
                    </span>
                  </div>
                </div>
                <Button size="lg" variant="hero" disabled={boarded === 0}>
                  Next Stop
                  <MapPin className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${(boarded / total) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Student Queue */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Students at This Stop
              </h3>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {students.map((student) => (
                  <Card
                    key={student.id}
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      student.status === "boarded" 
                        ? "bg-primary/10 border-primary/20" 
                        : "hover:bg-card/80"
                    }`}
                    onClick={() => student.status === "waiting" && simulateScan(student)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 bg-gradient-primary">
                        <div className="text-2xl">{student.photo}</div>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.grade}</p>
                      </div>
                      <div>
                        {student.status === "waiting" ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-500">
                            Waiting
                          </span>
                        ) : (
                          <div className="text-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            <p className="text-xs text-primary mt-1">{student.boardedAt}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {student.medicalAlert && student.status === "waiting" && (
                      <div className="mt-2 flex items-center gap-2 text-amber-500 text-xs">
                        <AlertCircle className="w-4 h-4" />
                        <span>{student.medicalAlert}</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <Button variant="outline" className="w-full">
                  Manual Attendance
                </Button>
                <Button variant="outline" className="w-full">
                  Report Issue
                </Button>
                <Button variant="destructive" className="w-full">
                  End Trip
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Footer */}
        <Card className="glass-card p-4 mt-6">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-primary">42</p>
              <p className="text-xs text-muted-foreground">Scanned Today</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-primary">0.3s</p>
              <p className="text-xs text-muted-foreground">Avg Scan Time</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-primary">99.8%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NfcScanner;
