import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Leaf,
  Users,
  ArrowRight,
  TrendingUp,
  Users2,
  Leaf as LeafIcon,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Star,
  CheckCircle,
  Shield,
  Zap,
  Award,
  Globe,
  Clock,
  Target,
  Sparkles,
  ChevronDown,
  Play,
  Quote
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    rides: 1247,
    users: 15420,
    co2: 2847,
    communities: 89
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ahmed Al Saadi",
      role: "School Student",
      content: "ECpool360 has transformed how I commute to school. I've saved 45kg of CO₂ this month and earned enough credits for a free ride!",
      rating: 5
    },
    {
      name: "Fatima Al Riyami",
      role: "School Driver",
      content: "The platform is incredibly user-friendly. My reliability score has improved, and I'm making a real difference in our community.",
      rating: 5
    },
    {
      name: "Dr. Khalid Al Hashmi",
      role: "School Principal",
      content: "ECpool360 has revolutionized our school's transportation system. Parents are happier, students are safer, and our carbon footprint has reduced significantly.",
      rating: 5
    }
  ];

  // Animate stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        rides: prev.rides + Math.floor(Math.random() * 5),
        users: prev.users + Math.floor(Math.random() * 12),
        co2: prev.co2 + Math.floor(Math.random() * 8),
        communities: prev.communities + Math.floor(Math.random() * 2)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    localStorage.removeItem("userRole");
    navigate("/mode-selection");
  };

  const handleQuickAccess = (role: string, route: string) => {
    localStorage.setItem("userRole", role);
    navigate(route);
  };

  const handleLearnMore = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStudentSignIn = () => {
    navigate("/auth?mode=student");
  };

  const handleDriverSignIn = () => {
    navigate("/auth?mode=driver");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1f15] to-[#0a1810] text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-orange-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Bus className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-emerald-400">ECpool360</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('features-section')} className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
            Features
          </button>
          <button onClick={() => scrollToSection('stats-section')} className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
            Impact
          </button>
          <button onClick={() => scrollToSection('testimonials-section')} className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
            Testimonials
          </button>
          <Button
            variant="outline"
            onClick={handleStudentSignIn}
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
          >
            Sign In
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Revolutionizing School Transportation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Eco-Smart
              </span>
              <br />
              <span className="text-white">Ride Sharing</span>
              <br />
              <span className="text-slate-300">in Oman</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join Oman's most trusted community-based eco-ride platform.
              Share rides safely, reduce your carbon footprint, and earn rewards for every sustainable journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-slate-600 hover:border-emerald-500 text-white hover:text-emerald-400 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Verified Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>15,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>4.9★ Rating</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="text-emerald-400">ECpool360</span>?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the future of school transportation with cutting-edge features designed for safety, sustainability, and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Verified Safety</h3>
              <p className="text-slate-300 leading-relaxed">
                Every ride is verified with real-time GPS tracking, emergency alerts, and community ratings to ensure maximum safety for students.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Carbon Neutral</h3>
              <p className="text-slate-300 leading-relaxed">
                Track your environmental impact in real-time. Every shared ride reduces CO₂ emissions and contributes to Oman's green future.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Routes</h3>
              <p className="text-slate-300 leading-relaxed">
                Our advanced AI optimizes routes for efficiency, safety, and minimal environmental impact across all Omani communities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Reward System</h3>
              <p className="text-slate-300 leading-relaxed">
                Earn EcoCredits for every sustainable ride. Redeem them for exclusive perks, discounts, and community recognition.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Community First</h3>
              <p className="text-slate-300 leading-relaxed">
                Built by Omanis, for Omanis. Connect with your local community while making a positive environmental impact together.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-Time Updates</h3>
              <p className="text-slate-300 leading-relaxed">
                Live tracking, instant notifications, and real-time attendance monitoring keep everyone informed and safe.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How <span className="text-emerald-400">ECpool360</span> Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Getting started is simple. Join our community in just three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Join Community</h3>
              <p className="text-slate-300 leading-relaxed">
                Sign up and connect with verified drivers and riders in your school or local community.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Book & Share</h3>
              <p className="text-slate-300 leading-relaxed">
                Find or offer rides with our AI-powered matching system that optimizes for safety and efficiency.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Earn Rewards</h3>
              <p className="text-slate-300 leading-relaxed">
                Track your impact, earn EcoCredits, and redeem them for exclusive benefits and recognition.
              </p>
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section id="stats-section" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-emerald-400">Growing Impact</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time statistics from our expanding community across Oman
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20 text-center group hover:border-emerald-500/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.rides.toLocaleString()}+</div>
              <div className="text-slate-300 font-medium">Rides Completed</div>
              <div className="text-sm text-slate-400 mt-1">This month</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/20 text-center group hover:border-teal-500/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-teal-400 mb-2">{stats.users.toLocaleString()}+</div>
              <div className="text-slate-300 font-medium">Active Users</div>
              <div className="text-sm text-slate-400 mt-1">Across Oman</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 text-center group hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <LeafIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.co2.toLocaleString()}kg</div>
              <div className="text-slate-300 font-medium">CO₂ Saved</div>
              <div className="text-sm text-slate-400 mt-1">This month</div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/20 text-center group hover:border-orange-500/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-orange-400 mb-2">{stats.communities}+</div>
              <div className="text-slate-300 font-medium">Communities</div>
              <div className="text-sm text-slate-400 mt-1">Active</div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials-section" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What Our <span className="text-emerald-400">Community</span> Says
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hear from students, drivers, and schools who are transforming transportation in Oman
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-slate-700/50">
              <Quote className="w-12 h-12 text-emerald-400 mb-6" />
              <blockquote className="text-xl lg:text-2xl text-white mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-slate-400">{testimonials[currentTestimonial].role}</div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Make a <span className="text-emerald-400">Difference</span>?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Omanis who are already reducing their carbon footprint and earning rewards for sustainable commuting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-12 py-4 text-lg rounded-full shadow-2xl shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleDriverSignIn}
                className="border-2 border-slate-600 hover:border-emerald-500 text-white hover:text-emerald-400 font-semibold px-12 py-4 text-lg rounded-full transition-all duration-300"
              >
                Driver Portal
              </Button>
            </div>

            <p className="text-slate-400">
              Already have an account?{" "}
              <button onClick={handleStudentSignIn} className="text-emerald-400 hover:text-emerald-300 font-medium underline transition-colors">
                Sign in here
              </button>
            </p>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="border-t border-slate-800/50 pt-16 pb-8 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Bus className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-emerald-400">ECpool360</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                Revolutionizing school transportation in Oman with eco-friendly ride sharing, community building, and sustainable mobility solutions.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                  <Facebook className="w-5 h-5 text-slate-400 hover:text-emerald-400" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-emerald-400" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                  <Instagram className="w-5 h-5 text-slate-400 hover:text-emerald-400" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <div className="space-y-3">
                <button onClick={() => navigate('/eco-passport')} className="block text-slate-400 hover:text-emerald-400 transition-colors">
                  Eco Passport
                </button>
                <button onClick={() => navigate('/eco-pulse')} className="block text-slate-400 hover:text-emerald-400 transition-colors">
                  Live Eco Pulse
                </button>
                <button onClick={() => navigate('/aurora')} className="block text-slate-400 hover:text-emerald-400 transition-colors">
                  Aurora Analytics
                </button>
                <button onClick={() => navigate('/mode-selection')} className="block text-slate-400 hover:text-emerald-400 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-slate-400 hover:text-emerald-400 transition-colors">Help Center</a>
                <a href="#" className="block text-slate-400 hover:text-emerald-400 transition-colors">Safety Guidelines</a>
                <a href="#" className="block text-slate-400 hover:text-emerald-400 transition-colors">Contact Us</a>
                <a href="#" className="block text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 text-center">
            <p className="text-slate-500 mb-2">
              &copy; 2024 ECpool360. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm">
              Made with ❤️ for Oman's sustainable future
            </p>
          </div>
        </footer>

        {/* Developer Quick Access */}
        <div className="max-w-4xl mx-auto pt-8 pb-8">
          <details className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-4 border border-slate-800/30">
            <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Developer Quick Access
            </summary>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAccess("school-driver", "/school/driver")}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              >
                School Driver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAccess("school-student", "/school/student")}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              >
                School Student
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAccess("community-driver", "/community/driver")}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              >
                Community Driver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAccess("community-rider", "/community/rider")}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              >
                Community Rider
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/aurora")}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs"
              >
                Aurora Admin
              </Button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Index;
