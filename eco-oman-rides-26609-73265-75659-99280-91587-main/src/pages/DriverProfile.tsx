import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Save, User, Phone, Mail, Car, FileText, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";

const DriverProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Ahmed Al-Balushi",
    email: "ahmed@ecpool360.om",
    mobile: "+968 9123 4567",
    vehicleModel: "Toyota Camry",
    licensePlate: "ABC-1234",
    licenseNumber: "DL123456789",
    schoolAffiliation: "Indian School Muscat",
    totalRides: 47,
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully 🌿",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/driver")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Driver Profile</h1>
              <p className="text-muted-foreground">Manage your account & vehicle info</p>
            </div>
          </div>
          <Button variant="hero" onClick={handleSave}>
            <Save className="mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="glass-card p-8 mb-6 animate-slide-up">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="relative">
              <Avatar className="w-24 h-24 bg-gradient-primary">
                <div className="text-4xl">👤</div>
              </Avatar>
              <Button
                size="icon"
                variant="glass"
                className="absolute -bottom-2 -right-2"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="text-primary font-semibold">ECpool Verified Driver ✓</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.totalRides} Total Rides Offered
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    className="pl-10"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school">School Affiliation</Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="school"
                    className="pl-10"
                    value={formData.schoolAffiliation}
                    onChange={(e) => handleChange("schoolAffiliation", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-6 mt-8 pt-8 border-t border-border">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Car className="w-5 h-5 text-secondary" />
              Vehicle Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Model</Label>
                <Input
                  id="vehicle"
                  value={formData.vehicleModel}
                  onChange={(e) => handleChange("vehicleModel", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plate">License Plate</Label>
                <Input
                  id="plate"
                  value={formData.licensePlate}
                  onChange={(e) => handleChange("licensePlate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="license"
                    className="pl-10"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange("licenseNumber", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Verification Status */}
        <Card className="glass-card p-6 bg-primary/10 border-primary/20 animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Verification Status</h3>
              <p className="text-sm text-muted-foreground">
                Your account is fully verified and active
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/driver-verification")}>
              View Details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DriverProfile;
