import { useState, useEffect, useRef } from "react";
import { Upload, CheckCircle, AlertCircle, Home, User, Car, FileText, Shield, Camera, X, Eye, FileCheck, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  emergencyContact: string;
  insuranceNumber: string;
}

const DriverVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    vehicleNumber: "",
    vehicleType: "",
    capacity: "",
    emergencyContact: "",
    insuranceNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('driverVerificationData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || formData);
        setStep(parsed.step || 1);
        setUploadedFiles(parsed.uploadedFiles || {});
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data on changes
  useEffect(() => {
    const dataToSave = {
      formData,
      step,
      uploadedFiles,
      timestamp: Date.now()
    };
    localStorage.setItem('driverVerificationData', JSON.stringify(dataToSave));
  }, [formData, step, uploadedFiles]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const requiredDocuments = {
    licenseFront: { label: "Driver's License (Front)", required: true },
    licenseBack: { label: "Driver's License (Back)", required: true },
    vehicleRegistration: { label: "Vehicle Registration", required: true },
    vehiclePhoto: { label: "Vehicle Photo", required: true },
    insurance: { label: "Insurance Certificate", required: true },
    profilePhoto: { label: "Profile Photo", required: false },
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required";
    }

    if (currentStep === 2) {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
      if (!uploadedFiles.licenseFront) newErrors.licenseFront = "License front photo is required";
      if (!uploadedFiles.licenseBack) newErrors.licenseBack = "License back photo is required";
    }

    if (currentStep === 3) {
      if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle number is required";
      if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required";
      if (!formData.capacity.trim()) newErrors.capacity = "Seating capacity is required";
      if (!uploadedFiles.vehicleRegistration) newErrors.vehicleRegistration = "Vehicle registration is required";
      if (!uploadedFiles.vehiclePhoto) newErrors.vehiclePhoto = "Vehicle photo is required";
      if (!uploadedFiles.insurance) newErrors.insurance = "Insurance certificate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (documentType: string, file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: {
          file,
          preview,
          id: `${documentType}-${Date.now()}`
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (documentType: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentType];
      return newFiles;
    });
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save verification status
      localStorage.setItem('driverVerificationStatus', 'pending');

      toast({
        title: "Verification Submitted Successfully!",
        description: "Your documents are being reviewed. We'll notify you within 24-48 hours.",
      });

      // Clear saved data
      localStorage.removeItem('driverVerificationData');

      setTimeout(() => navigate("/driver"), 3000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFileUpload = (documentType: string, doc: { label: string; required: boolean }) => {
    const uploadedFile = uploadedFiles[documentType];

    return (
      <div key={documentType}>
        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
          {doc.label}
          {doc.required && <span className="text-red-500">*</span>}
        </label>
        {uploadedFile ? (
          <div className="glass-card p-4 border-2 border-green-500/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={uploadedFile.preview}
                  alt={doc.label}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                  onClick={() => removeFile(documentType)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(uploadedFile.preview, '_blank')}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="glass-card p-8 border-2 border-dashed border-border rounded-lg text-center hover:border-primary transition-all duration-300 cursor-pointer group"
            onClick={() => fileInputRefs.current[documentType]?.click()}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
            <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG up to 10MB
            </p>
            <input
              ref={el => el && (fileInputRefs.current[documentType] = el)}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(documentType, file);
              }}
            />
          </div>
        )}
        {errors[documentType] && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            {errors[documentType]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto max-w-4xl p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-white/10">
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Driver Verification
            </h1>
            <p className="text-muted-foreground">Complete your profile to start offering rides safely</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Shield className="w-4 h-4 mr-1" />
            Secure Process
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-scale-in">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm font-semibold text-emerald-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-slate-700" />
        </div>

        {/* Form Card */}
        <Card className="glass-card p-8 animate-scale-in border-slate-700/50 backdrop-blur-xl">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                  <User className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="+968 XXXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Emergency Contact *</label>
                  <Input
                    type="tel"
                    placeholder="Emergency contact number"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className={errors.emergencyContact ? "border-red-500" : ""}
                  />
                  {errors.emergencyContact && <p className="text-sm text-red-500 mt-1">{errors.emergencyContact}</p>}
                </div>
              </div>

              <div className="mt-6">
                {renderFileUpload('profilePhoto', requiredDocuments.profilePhoto)}
              </div>
            </div>
          )}

          {/* Step 2: License Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  License Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Driving License Number *</label>
                  <Input
                    placeholder="Enter license number"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className={errors.licenseNumber ? "border-red-500" : ""}
                  />
                  {errors.licenseNumber && <p className="text-sm text-red-500 mt-1">{errors.licenseNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFileUpload('licenseFront', requiredDocuments.licenseFront)}
                  {renderFileUpload('licenseBack', requiredDocuments.licenseBack)}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <Car className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Vehicle Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Vehicle Number *</label>
                  <Input
                    placeholder="e.g., ABC-1234"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className={errors.vehicleNumber ? "border-red-500" : ""}
                  />
                  {errors.vehicleNumber && <p className="text-sm text-red-500 mt-1">{errors.vehicleNumber}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Vehicle Type *</label>
                  <Input
                    placeholder="e.g., Sedan, SUV, Van"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className={errors.vehicleType ? "border-red-500" : ""}
                  />
                  {errors.vehicleType && <p className="text-sm text-red-500 mt-1">{errors.vehicleType}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Seating Capacity *</label>
                  <Input
                    type="number"
                    placeholder="e.g., 4, 7, 10"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className={errors.capacity ? "border-red-500" : ""}
                  />
                  {errors.capacity && <p className="text-sm text-red-500 mt-1">{errors.capacity}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Insurance Number *</label>
                  <Input
                    placeholder="Enter insurance policy number"
                    value={formData.insuranceNumber}
                    onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                    className={errors.insuranceNumber ? "border-red-500" : ""}
                  />
                  {errors.insuranceNumber && <p className="text-sm text-red-500 mt-1">{errors.insuranceNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {renderFileUpload('vehicleRegistration', requiredDocuments.vehicleRegistration)}
                {renderFileUpload('vehiclePhoto', requiredDocuments.vehiclePhoto)}
                {renderFileUpload('insurance', requiredDocuments.insurance)}
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <FileCheck className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Review & Submit
                </h2>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-3 text-emerald-400">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> {formData.fullName}</div>
                    <div><span className="text-muted-foreground">Email:</span> {formData.email}</div>
                    <div><span className="text-muted-foreground">Phone:</span> {formData.phone}</div>
                    <div><span className="text-muted-foreground">Emergency:</span> {formData.emergencyContact}</div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-3 text-cyan-400">License Information</h3>
                  <div className="text-sm">
                    <div><span className="text-muted-foreground">License Number:</span> {formData.licenseNumber}</div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-3 text-blue-400">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Vehicle Number:</span> {formData.vehicleNumber}</div>
                    <div><span className="text-muted-foreground">Type:</span> {formData.vehicleType}</div>
                    <div><span className="text-muted-foreground">Capacity:</span> {formData.capacity} seats</div>
                    <div><span className="text-muted-foreground">Insurance:</span> {formData.insuranceNumber}</div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-3 text-purple-400">Uploaded Documents</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(requiredDocuments).map(([key, doc]) => (
                      <div key={key} className="flex items-center gap-2">
                        {uploadedFiles[key] ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={uploadedFiles[key] ? "text-green-400" : "text-red-400"}>
                          {doc.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verification Status Indicators */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { step: 1, label: "Personal", icon: User },
              { step: 2, label: "License", icon: FileText },
              { step: 3, label: "Vehicle", icon: Car },
              { step: 4, label: "Review", icon: FileCheck },
            ].map(({ step: stepNum, label, icon: Icon }) => (
              <div key={stepNum} className={`glass-card p-4 text-center transition-all duration-300 ${
                step >= stepNum ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-600'
              }`}>
                {step > stepNum ? (
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                ) : step === stepNum ? (
                  <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-pulse" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                )}
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(step - 1)}
                className="flex-1 hover:bg-slate-700 border-slate-600"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : step === totalSteps ? (
                "Submit for Verification"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DriverVerification;
