import { useState } from "react";
import { Beaker, Wind, Activity, CheckCircle, AlertTriangle, XCircle, Download, Home, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { toast } from "@/hooks/use-toast";

const AirQualityPilot = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState({
    testId: `TIO2-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    vehicle: "Bus-A",
    location: "Muscat Central",
    weather: "Sunny",
    time: new Date().toTimeString().slice(0, 5),
    before: { co2: "", pm25: "", voc: "" },
    after: { co2: "", pm25: "", voc: "" }
  });

  const [testHistory] = useState([
    { id: "TIO2-001", date: "Oct 13", vehicle: "Bus-A", score: 25.1, effectiveness: "HIGHLY EFFECTIVE", credits: 10 },
    { id: "TIO2-002", date: "Oct 10", vehicle: "Bus-B", score: 18.5, effectiveness: "EFFECTIVE", credits: 10 },
    { id: "TIO2-003", date: "Oct 08", vehicle: "Bus-C", score: 12.3, effectiveness: "EFFECTIVE", credits: 10 },
    { id: "TIO2-004", date: "Oct 05", vehicle: "Bus-A", score: 8.7, effectiveness: "MODERATE", credits: 5 },
  ]);

  const calculateReduction = (before: number, after: number) => {
    if (!before || !after) return 0;
    return Math.max(0, ((before - after) / before) * 100);
  };

  const co2Reduction = calculateReduction(Number(testData.before.co2), Number(testData.after.co2));
  const pm25Reduction = calculateReduction(Number(testData.before.pm25), Number(testData.after.pm25));
  const vocReduction = calculateReduction(Number(testData.before.voc), Number(testData.after.voc));
  
  const weightedScore = (co2Reduction * 0.5) + (pm25Reduction * 0.3) + (vocReduction * 0.2);
  
  const getEffectiveness = (score: number) => {
    if (score >= 20) return { label: "HIGHLY EFFECTIVE", color: "text-primary", bg: "bg-primary/20", icon: CheckCircle };
    if (score >= 10) return { label: "EFFECTIVE", color: "text-primary", bg: "bg-primary/15", icon: CheckCircle };
    if (score >= 5) return { label: "MODERATE", color: "text-accent", bg: "bg-accent/20", icon: AlertTriangle };
    return { label: "INEFFECTIVE", color: "text-destructive", bg: "bg-destructive/20", icon: XCircle };
  };

  const effectiveness = getEffectiveness(weightedScore);
  const EffectivenessIcon = effectiveness.icon;

  const handleSubmit = () => {
    if (!testData.before.co2 || !testData.before.pm25 || !testData.before.voc || 
        !testData.after.co2 || !testData.after.pm25 || !testData.after.voc) {
      toast({
        title: "Incomplete Data",
        description: "Please fill in all measurement fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 Test Successful!",
      description: weightedScore >= 10 ? `Earned 10 Bonus EcoCredits! 🔬` : "Test recorded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6">
        <div className="flex items-center gap-4 mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-foreground">
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Beaker className="w-8 h-8" />
              TiO₂ Air Quality Pilot
            </h1>
            <p className="text-muted-foreground">Scientifically validate purification</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4">
        {/* Concept Card */}
        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <Beaker className="w-12 h-12 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold mb-2">How It Works</h2>
              <p className="text-muted-foreground mb-4">
                Buses coated with TiO₂ break down pollutants with sunlight. Measure the impact!
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-2">
                    <Wind className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="text-sm font-semibold">1. Before</p>
                  <p className="text-xs text-muted-foreground">Outside air</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-sm font-semibold">2. After</p>
                  <p className="text-xs text-muted-foreground">Inside bus</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">3. Result</p>
                  <p className="text-xs text-muted-foreground">% improvement</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Test Form */}
        <Card className="glass-card p-6 mb-6 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">New Test</h2>
          
          {/* Test Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Test ID</label>
              <Input value={testData.testId} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input 
                type="date" 
                value={testData.date} 
                onChange={(e) => setTestData({...testData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Time</label>
              <Input 
                type="time" 
                value={testData.time} 
                onChange={(e) => setTestData({...testData, time: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Vehicle</label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-background border border-input"
                value={testData.vehicle}
                onChange={(e) => setTestData({...testData, vehicle: e.target.value})}
              >
                <option>Bus-A</option>
                <option>Bus-B</option>
                <option>Bus-C</option>
                <option>Bus-D</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input 
                value={testData.location} 
                onChange={(e) => setTestData({...testData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Weather ☀️</label>
              <select 
                className="w-full px-3 py-2 rounded-md bg-background border border-input"
                value={testData.weather}
                onChange={(e) => setTestData({...testData, weather: e.target.value})}
              >
                <option>Sunny</option>
                <option>Partly Cloudy</option>
                <option>Cloudy</option>
              </select>
            </div>
          </div>

          {/* Before Measurements */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive"></div>
              BEFORE (Outside Air)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">CO₂ (ppm)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 450"
                  value={testData.before.co2}
                  onChange={(e) => setTestData({...testData, before: {...testData.before, co2: e.target.value}})}
                />
                <p className="text-xs text-muted-foreground mt-1">Normal: 400-450 ppm</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">PM2.5 (µg/m³)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 35"
                  value={testData.before.pm25}
                  onChange={(e) => setTestData({...testData, before: {...testData.before, pm25: e.target.value}})}
                />
                <p className="text-xs text-muted-foreground mt-1">WHO: &lt;15 µg/m³</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">VOC (ppb)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 120"
                  value={testData.before.voc}
                  onChange={(e) => setTestData({...testData, before: {...testData.before, voc: e.target.value}})}
                />
                <p className="text-xs text-muted-foreground mt-1">Volatile Organic Compounds</p>
              </div>
            </div>
          </div>

          {/* After Measurements */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              AFTER (Inside Bus with TiO₂)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">CO₂ (ppm)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 383"
                  value={testData.after.co2}
                  onChange={(e) => setTestData({...testData, after: {...testData.after, co2: e.target.value}})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">PM2.5 (µg/m³)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 20"
                  value={testData.after.pm25}
                  onChange={(e) => setTestData({...testData, after: {...testData.after, pm25: e.target.value}})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">VOC (ppb)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 86"
                  value={testData.after.voc}
                  onChange={(e) => setTestData({...testData, after: {...testData.after, voc: e.target.value}})}
                />
              </div>
            </div>
          </div>

          {/* Live Calculation */}
          {(testData.before.co2 && testData.after.co2) && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold mb-4">Live Calculation</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className={`p-4 ${co2Reduction >= 10 ? 'bg-primary/20' : co2Reduction >= 5 ? 'bg-accent/20' : 'bg-muted/20'}`}>
                  <p className="text-sm text-muted-foreground mb-1">CO₂ Reduction</p>
                  <p className="text-3xl font-bold">{co2Reduction.toFixed(1)}%</p>
                </Card>
                <Card className={`p-4 ${pm25Reduction >= 10 ? 'bg-primary/20' : pm25Reduction >= 5 ? 'bg-accent/20' : 'bg-muted/20'}`}>
                  <p className="text-sm text-muted-foreground mb-1">PM2.5 Reduction</p>
                  <p className="text-3xl font-bold">{pm25Reduction.toFixed(1)}%</p>
                </Card>
                <Card className={`p-4 ${vocReduction >= 10 ? 'bg-primary/20' : vocReduction >= 5 ? 'bg-accent/20' : 'bg-muted/20'}`}>
                  <p className="text-sm text-muted-foreground mb-1">VOC Reduction</p>
                  <p className="text-3xl font-bold">{vocReduction.toFixed(1)}%</p>
                </Card>
              </div>

              {/* Weighted Score */}
              <Card className={`p-6 ${effectiveness.bg} border-2 border-current mb-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Weighted Effectiveness Score</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Score = (CO₂×0.5) + (PM2.5×0.3) + (VOC×0.2) = {weightedScore.toFixed(1)}%
                    </p>
                  </div>
                  <div className={`text-right ${effectiveness.color}`}>
                    <EffectivenessIcon className="w-12 h-12 mb-2 mx-auto animate-pulse" />
                    <p className="text-2xl font-bold">{effectiveness.label}</p>
                  </div>
                </div>
              </Card>

              {/* Visualization */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium mb-2">CO₂</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-6 bg-destructive/30 rounded flex items-center justify-end px-2 text-xs">
                        {testData.before.co2}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 bg-primary rounded flex items-center justify-end px-2 text-xs"
                        style={{width: `${(Number(testData.after.co2) / Number(testData.before.co2)) * 100}%`}}
                      >
                        {testData.after.co2}
                      </div>
                    </div>
                    <p className="text-xs text-center text-primary font-bold">↓ {co2Reduction.toFixed(1)}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">PM2.5</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-6 bg-destructive/30 rounded flex items-center justify-end px-2 text-xs">
                        {testData.before.pm25}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 bg-primary rounded flex items-center justify-end px-2 text-xs"
                        style={{width: `${(Number(testData.after.pm25) / Number(testData.before.pm25)) * 100}%`}}
                      >
                        {testData.after.pm25}
                      </div>
                    </div>
                    <p className="text-xs text-center text-primary font-bold">↓ {pm25Reduction.toFixed(1)}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">VOC</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-6 bg-destructive/30 rounded flex items-center justify-end px-2 text-xs">
                        {testData.before.voc}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 bg-primary rounded flex items-center justify-end px-2 text-xs"
                        style={{width: `${(Number(testData.after.voc) / Number(testData.before.voc)) * 100}%`}}
                      >
                        {testData.after.voc}
                      </div>
                    </div>
                    <p className="text-xs text-center text-primary font-bold">↓ {vocReduction.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              {weightedScore >= 10 && (
                <Card className="p-4 bg-primary/20 border-primary/40 mb-4 animate-scale-in">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎉</div>
                    <div>
                      <p className="font-bold text-lg">Test Successful!</p>
                      <p className="text-sm text-muted-foreground">Earned 10 Bonus EcoCredits 🔬</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="hero" size="lg" className="flex-1" onClick={handleSubmit}>
              Submit Test Results
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </Card>

        {/* Test History */}
        <Card className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Test History</h2>
            <Badge className="bg-primary/20 text-primary">Average: 16.2%</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Vehicle</th>
                  <th className="text-right py-3 px-2">Score</th>
                  <th className="text-left py-3 px-2">Effectiveness</th>
                  <th className="text-right py-3 px-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test) => (
                  <tr key={test.id} className="border-b border-border/50 hover:bg-primary/5">
                    <td className="py-3 px-2 font-mono text-sm">{test.id}</td>
                    <td className="py-3 px-2">{test.date}</td>
                    <td className="py-3 px-2">{test.vehicle}</td>
                    <td className="py-3 px-2 text-right font-bold">{test.score}%</td>
                    <td className="py-3 px-2">
                      <Badge className={getEffectiveness(test.score).bg}>
                        {test.effectiveness}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right text-primary font-bold">+{test.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Educational Sidebar */}
        <Card className="glass-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Why TiO₂ Matters</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Titanium Dioxide (TiO₂) is a photocatalytic material that breaks down air pollutants when exposed to UV light from the sun.
            </p>
            <p>
              This technology can reduce harmful pollutants like nitrogen oxides (NOx), volatile organic compounds (VOCs), and particulate matter inside vehicles.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="text-xs">
                📄 Read Research Paper
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                🎥 How It Works
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default AirQualityPilot;