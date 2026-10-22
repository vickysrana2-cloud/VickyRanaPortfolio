"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  MessageCircle,
  ArrowUp,
  Star,
  Quote,
  Award,
  Shield,
  HeartPulse,
  Car,
  Building2,
  Plane,
  Briefcase,
  Users,
  ShieldCheck,
  FileText,
  Headphones,
  CheckCircle,
  Zap,
  Target,
  UserCheck,
  Umbrella,
  Baby,
} from "lucide-react";
import Image from "next/image";

// Helper functions to safely parse array data
const safeParseArray = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 2) {
            const result: any = {};
            parts.forEach((part, index) => {
              if (index === 0) result.title = part;
              else if (index === 1) result.description = part;
              else if (index === 2) result.image = part;
              else if (index === 3) result.icon = part;
              else if (index === 4) result.points = part.split(",").map((p: string) => p.trim());
            });
            return result;
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) {
        return items;
      }
    }
  }
  return defaultData;
};

const safeParseStats = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 3) {
            return {
              number: parts[0] || "",
              title: parts[1] || "",
              description: parts[2] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) {
        return items;
      }
    }
  }
  return defaultData;
};

const safeParseFeatures = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 2) {
            return {
              title: parts[0] || "",
              description: parts[1] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) {
        return items;
      }
    }
  }
  return defaultData;
};

const safeParseSteps = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 3) {
            return {
              number: parts[0] || "",
              title: parts[1] || "",
              description: parts[2] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) {
        return items;
      }
    }
  }
  return defaultData;
};

const safeParseTestimonials = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 4) {
            return {
              name: parts[0] || "",
              location: parts[1] || "",
              review: parts[2] || "",
              rating: parseInt(parts[3]) || 5,
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) {
        return items;
      }
    }
  }
  return defaultData;
};

// Icon mapping
const iconMap: { [key: string]: any } = {
  Shield: Shield,
  HeartPulse: HeartPulse,
  Car: Car,
  Building2: Building2,
  Plane: Plane,
  Briefcase: Briefcase,
  Umbrella: Umbrella,
  Baby: Baby,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Target: Target,
  UserCheck: UserCheck,
  Users: Users,
  FileText: FileText,
  Headphones: Headphones,
  Phone: Phone,
  CheckCircle: CheckCircle,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Shield;
};

export default function InsuranceLandingPage({ data }: { data: any }) {
  console.log("data is", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const statsSection = data?.statsSection || {};
  const featuresSection = data?.featuresSection || {};
  const servicesSection = data?.servicesSection || {};
  const howItWorksSection = data?.howItWorksSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const contactInfo = data?.contactInfo || {};
  const socialLinks = data?.socialLinks || {};
  const footerSection = data?.footerSection || {};

  // Default values
  const companyName = basicInfo.companyName || "SecureShield";
  const companyLogo = basicInfo.logo || "https://static.vecteezy.com/system/resources/previews/075/197/756/non_2x/secure-shield-insurance-logo-with-hands-protecting-house-inside-symbol-free-vector.jpg";
  const companyTagline = basicInfo.tagline || "Protect What Matters Most";

  // Hero Section
  const heroBadge = heroSection.badge || "Trusted Insurance Advisor";
  const heroTitle = heroSection.title || "Protect What";
  const heroHighlight = heroSection.highlight || "Matters Most";
  const heroDescription = heroSection.description || 
    "Helping families and businesses secure the right insurance coverage through honest advice, personalized planning, and long-term support.";
  const heroButtonText = heroSection.buttonText || "Get Free Quote";
  const heroSecondaryButtonText = heroSection.secondaryButtonText || "Explore Services";
  const heroImage = heroSection.image || 
    "https://www.avivaindia.com/sites/default/files/Image%20for%20blog%205%20.jpg";
  const heroBackgroundImage = heroSection.backgroundImage || 
    "https://static.vecteezy.com/system/resources/thumbnails/039/053/949/small/ai-generated-modern-interior-design-office-hall-with-conference-table-wooden-floor-and-dark-wall-background-photo.jpeg";
  
  // Stats
  const stat1Number = heroSection.stat1Number || "5000+";
  const stat1Label = heroSection.stat1Label || "Families Protected";
  const stat2Number = heroSection.stat2Number || "10+";
  const stat2Label = heroSection.stat2Label || "Years Experience";

  // About Section
  const aboutBadge = aboutSection.badge || "About Us";
  const aboutTitle = aboutSection.title || "SecureShield Insurance in Numbers";
  const aboutDescription = aboutSection.description ||
    "Since our journey began, we have helped individuals, families, and businesses choose the right insurance plans with confidence.";

  // Stats Section
  const defaultStats = [
    { number: "5000+", title: "Happy Clients", description: "Trusted by families worldwide" },
    { number: "8000+", title: "Policies Issued", description: "Comprehensive coverage plans" },
    { number: "98%", title: "Claim Success Rate", description: "Quick and hassle-free claims" },
    { number: "24/7", title: "Customer Support", description: "Always here to help you" },
  ];
  const stats = safeParseStats(statsSection?.stats, defaultStats);

  // Features Section
  const featuresBadge = featuresSection.badge || "Why Choose Us";
  const featuresTitle = featuresSection.title || "We Make Insurance Simple";
  const featuresDescription = featuresSection.description ||
    "Our commitment to transparency and customer satisfaction sets us apart from the rest.";
  
  const defaultFeatures = [
    { title: "Trusted Advisors", description: "Expert guidance from experienced insurance professionals" },
    { title: "Quick Claims", description: "Fast and hassle-free claim settlement process" },
    { title: "Personalized Plans", description: "Customized insurance solutions for your unique needs" },
    { title: "Dedicated Support", description: "24/7 customer support for all your insurance queries" },
  ];
  const features = safeParseFeatures(featuresSection?.features, defaultFeatures);

  // Services Section
  const servicesBadge = servicesSection.badge || "Our Services";
  const servicesTitle = servicesSection.title || "Insurance Solutions For Every Need";
  const servicesDescription = servicesSection.description ||
    "Whether you're protecting your family, vehicle, home, or business, we offer personalized insurance solutions designed around your needs.";
  
  const defaultServices = [
    {
      title: "Life Insurance",
      description: "Financial security for your loved ones with flexible life insurance plans.",
      image: "https://pimwp.s3-accelerate.amazonaws.com/2021/06/life-insurance-2.jpg",
      icon: "Shield",
      points: ["Financial protection", "Tax saving benefits", "Flexible premium options"],
    },
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for individuals and families.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgFjtVJirYjJxeiSb3uu3jNav61l7xMbVZrddSL-Jo3mC8raQUtAKWZvo&s=10",
      icon: "HeartPulse",
      points: ["Cashless hospitalization", "Pre & post hospitalization", "Annual health checkups"],
    },
    {
      title: "Motor Insurance",
      description: "Protect your car or bike against accidents, theft, and damages.",
      image: "https://www.nextgenwealth.co.in/wp-content/uploads/2024/05/Vehicle-Insurance.jpg",
      icon: "Car",
      points: ["Third-party liability", "Own damage cover", "Roadside assistance"],
    },
    {
      title: "Home Insurance",
      description: "Keep your home and valuable belongings protected from unexpected events.",
      image: "https://cdn.confident-group.com/wp-content/uploads/2025/01/03143838/Property-Insurance-for-Assets-scaled.jpg",
      icon: "Building2",
      points: ["Fire protection", "Natural disasters", "Theft protection"],
    },
  ];
  const services = safeParseArray(servicesSection?.services, defaultServices);

  // How It Works Section
  const stepsBadge = howItWorksSection.badge || "Simple Process";
  const stepsTitle = howItWorksSection.title || "How It Works";
  const stepsDescription = howItWorksSection.description ||
    "A simple process designed to help you find the right insurance coverage with confidence.";
  
  const defaultSteps = [
    { number: "01", title: "Contact Us", description: "Reach out and tell us your insurance needs." },
    { number: "02", title: "Discuss", description: "We recommend plans based on your requirements." },
    { number: "03", title: "Choose Plan", description: "Compare and select the best policy." },
    { number: "04", title: "Get Covered", description: "Complete the process and enjoy peace of mind." },
  ];
  const steps = safeParseSteps(howItWorksSection?.steps, defaultSteps);

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Testimonials";
  const testimonialsTitle = testimonialsSection.title || "What Our Clients Say";
  const testimonialsDescription = testimonialsSection.description ||
    "We take pride in building long-term relationships through honest guidance, reliable support, and personalized insurance solutions.";
  
  const defaultTestimonials = [
    {
      name: "Rahul Sharma",
      location: "Mumbai",
      review: "The advisor explained every policy clearly and helped me choose the right health insurance plan for my family. The entire process was simple, transparent, and stress-free.",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      location: "Pune",
      review: "Excellent guidance from start to finish. Every policy option was explained patiently, making it easy for me to choose the best coverage within my budget.",
      rating: 5,
    },
    {
      name: "Amit Verma",
      location: "Navi Mumbai",
      review: "Professional service with outstanding claim assistance. Their honest advice and prompt support gave me complete confidence throughout the process.",
      rating: 5,
    },
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // Contact Info
  const phone = contactInfo.phone || "+91 98765 43210";
  const email = contactInfo.email || "info@SecureShieldinsurance.com";
  const address = contactInfo.address || "Mumbai, Maharashtra";
  const whatsappNumber = contactInfo.whatsapp || "+91 98765 43210";
  const formTitle = contactInfo.formTitle || "Request a Free Consultation";
  const formButtonText = contactInfo.formButtonText || "Send Message";

  // Social Links
  const facebook = socialLinks.facebook || "https://www.facebook.com/";
  const instagram = socialLinks.instagram || "https://www.instagram.com/";
  const twitter = socialLinks.twitter || "https://twitter.com/";
  const linkedin = socialLinks.linkedin || "https://www.linkedin.com/";

  // Footer Section
  const footerCompanyName = footerSection.companyName || "SecureShield";
  const footerLogo = footerSection.logo || "https://static.vecteezy.com/system/resources/previews/075/197/756/non_2x/secure-shield-insurance-logo-with-hands-protecting-house-inside-symbol-free-vector.jpg";
  const footerDescription = footerSection.description ||
    "Helping individuals and businesses protect what matters most with trusted insurance solutions.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerContactLabel = footerSection.contactLabel || "Contact Info";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} SecureShield Insurance. All Rights Reserved.`;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const whatsappClean = whatsappNumber.replace(/\s/g, '');

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-3deg); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.02;
          pointer-events: none;
        }
      `}</style>

      <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-x-hidden">
        
        {/* Ambient Lighting */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="bg-noise absolute inset-0 z-50"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#E0E7FF] rounded-full mix-blend-multiply blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[30%] right-[-10%] w-[900px] h-[900px] bg-[#EEF2FF] rounded-full mix-blend-multiply blur-[150px] opacity-50" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-[#6366F1] rounded-full mix-blend-multiply blur-[150px] opacity-20" />
        </div>

        {/* Floating Actions */}
        <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-[#25D366] to-[#45E681] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        </a>

        {showBackToTop && (
          <button onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-white/40 backdrop-blur-xl border border-white/50 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-indigo-600 group">
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center cursor-pointer group gap-2" onClick={() => scrollToSection("home")}>
                {companyLogo && (
                  <Image
                  unoptimized
                  width={50}
                  height={50}
                    src={companyLogo}
                    alt={companyName}
                    className="w-10 h-10 object-contain"
                  />
                )}
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  <span className="text-indigo-600">{companyName.charAt(0)}</span>{companyName.slice(1)}
                </span>
              </div>

              <div className="hidden lg:flex space-x-8 items-center">
                {navItems.map((item) => (
                  <button key={item.name} onClick={() => scrollToSection(item.href.replace("#", ""))}
                    className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors relative group">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <a href={`https://wa.me/${whatsappClean}`} className="p-2.5 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors text-indigo-600">
                  <MessageCircle size={18} />
                </a>
                <a href={`mailto:${email}`} className="p-2.5 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors text-indigo-600">
                  <Mail size={18} />
                </a>
                <a href="#contact" className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-indigo-200">
                  Get Started
                </a>
              </div>

              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 p-2">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button key={item.name} onClick={() => scrollToSection(item.href.replace("#", ""))} 
                    className="text-left text-slate-700 hover:text-indigo-600 font-medium text-sm">
                    {item.name}
                  </button>
                ))}
                <a href="#contact" className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-2.5 rounded-full font-medium text-sm text-center">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen pt-20 sm:pt-24 flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroBackgroundImage}')` }} />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#E0E7FF]/40 blur-[140px]" />
              <div className="absolute top-20 right-0 w-[500px] h-[420px] rounded-full bg-[#C7D2FE]/25 blur-[180px]" />
              <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#E8D8FF]/40 blur-[180px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-indigo-700 mb-4 sm:mb-6">
                    <Award size={16} />
                    {heroBadge}
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900">
                    {heroTitle}{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                      {heroHighlight}
                    </span>
                  </h1>

                  <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
                    {heroDescription}
                  </p>

                  <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                    <a href="#contact" className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 sm:px-8 py-2.5 sm:py-3.5 text-white font-medium hover:shadow-xl transition text-sm sm:text-base">
                      {heroButtonText}
                    </a>
                    <a href="#services" className="rounded-full border border-indigo-200 px-6 sm:px-8 py-2.5 sm:py-3.5 text-indigo-600 hover:bg-indigo-50 transition text-sm sm:text-base">
                      {heroSecondaryButtonText}
                    </a>
                  </div>

                  <div className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{stat1Number}</h3>
                      <p className="text-xs sm:text-sm text-slate-600">{stat1Label}</p>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-slate-300" />
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{stat2Number}</h3>
                      <p className="text-xs sm:text-sm text-slate-600">{stat2Label}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex justify-center lg:justify-end mt-8 lg:mt-0">
                  <img src={heroImage} alt="Insurance" className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl" />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {aboutBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                  {aboutTitle}
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-6 sm:leading-8">
                  {aboutDescription}
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {stats.map((item: any, index: number) => {
                  const Icon = [Users, FileText, ShieldCheck, Headphones][index] || ShieldCheck;
                  return (
                    <div key={item.title} className="group bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100">
                      <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:bg-indigo-600 transition-colors duration-500">
                        <Icon size={20} className="text-indigo-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">
                        {item.number}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-0.5 sm:mb-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 sm:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {featuresBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                  {featuresTitle}
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-8">
                  {featuresDescription}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {features.map((feature: any, index: number) => {
                  const Icons = [ShieldCheck, Zap, Target, UserCheck];
                  const Icon = Icons[index] || ShieldCheck;
                  return (
                    <div key={feature.title} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100 border border-slate-100">
                      <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center mb-4">
                        <Icon size={28} className="text-indigo-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-6">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {servicesBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 sm:mt-3">
                  {servicesTitle}
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-6 sm:leading-8">
                  {servicesDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {services.map((service: any) => {
                  const Icon = getIcon(service.icon || "Shield");
                  return (
                    <div key={service.title} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100 border border-slate-100 hover:border-indigo-200">
                      <div className="relative h-48 sm:h-52 overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
                            <Icon size={20} className="text-indigo-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-6">
                          {typeof service.description === 'string' ? service.description.substring(0, 60) : service.description}...
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="howitworks" className="py-16 sm:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {stepsBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                  {stepsTitle}
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-8">
                  {stepsDescription}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {steps.map((step: any, index: number) => {
                  const Icons = [Phone, Users, CheckCircle, Shield];
                  const Icon = Icons[index] || Shield;
                  return (
                    <div key={step.number} className="relative">
                      {index !== steps.length - 1 && (
                        <div className="hidden lg:block absolute top-14 left-1/2 w-full h-0.5 bg-indigo-200" />
                      )}
                      <div className="text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center mb-4">
                          <Icon size={28} className="text-indigo-600" />
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-indigo-600 mb-1 sm:mb-2">
                          Step {step.number}
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-6">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 sm:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {testimonialsBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                  {testimonialsTitle}
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-8">
                  {testimonialsDescription}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((item: any) => (
                  <div key={item.name} className="group bg-slate-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500">{item.location}</p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote size={24} className="text-indigo-200 mb-3" />
                    <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7 italic">
                      "{item.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 sm:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  Contact Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 sm:mt-3">
                  Let's Discuss Your Insurance Needs
                </h2>
                <p className="text-slate-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-8">
                  Have questions or need expert guidance? Reach out to our team and we'll help you find the right insurance solution.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left - Contact Information */}
                <div className="bg-white rounded-3xl p-10 shadow-lg">
                  <h3 className="text-3xl font-bold text-slate-900">Contact Information</h3>
                  <p className="mt-4 text-slate-600 leading-7">
                    Whether you're looking for health, life, travel, or business insurance, our advisors are ready to assist you.
                  </p>
                  <div className="space-y-8 mt-10">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <Phone className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Call Us</h4>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-slate-600 mt-1 hover:text-indigo-600 transition-colors block">
                          {phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <Mail className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Email</h4>
                        <a href={`mailto:${email}?subject=Insurance%20Inquiry`} className="text-slate-600 mt-1 hover:text-indigo-600 transition-colors block">
                          {email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <MapPin className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Office</h4>
                        <a href="https://maps.google.com/maps?q=Mumbai,+Maharashtra" target="_blank" rel="noopener noreferrer" className="text-slate-600 mt-1 hover:text-indigo-600 transition-colors block">
                          {address}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 pt-4 border-t border-slate-100">
                      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                        <MessageCircle className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Chat on WhatsApp</h4>
                        <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 mt-1 hover:text-green-600 transition-colors block">
                          Click to chat with us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Form */}
                <div className="bg-white rounded-3xl p-10 shadow-lg">
                  <h3 className="text-3xl font-bold text-slate-900 mb-8">{formTitle}</h3>
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <input type="text" placeholder="Full Name" className="w-full h-12 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                      <input type="tel" placeholder="Phone Number" className="w-full h-12 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full h-12 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    <select className="w-full h-12 rounded-xl border border-slate-200 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                      <option value="">Select Insurance Type</option>
                      <option value="life">Life Insurance</option>
                      <option value="health">Health Insurance</option>
                      <option value="vehicle">Vehicle Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="travel">Travel Insurance</option>
                      <option value="business">Business Insurance</option>
                      <option value="pet">Pet Insurance</option>
                      <option value="umbrella">Umbrella Insurance</option>
                    </select>
                    <textarea rows={5} placeholder="Tell us about your insurance requirements..." className="w-full rounded-xl border border-slate-200 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    <a href={`https://wa.me/${whatsappClean}?text=New%20Insurance%20Inquiry`} target="_blank" rel="noopener noreferrer" className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-medium flex items-center justify-center transition-all">
                      {formButtonText}
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white pt-12 sm:pt-20 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              <div className="sm:col-span-2 lg:col-span-1">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                  <img src={footerLogo} width={80} height={50} alt="SecureShield Logo" />
                  <span>Secure<span className="text-indigo-400">Shield</span></span>
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-300 leading-6 sm:leading-8">
                  {footerDescription}
                </p>
                <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{footerQuickLinksLabel}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li><button onClick={() => scrollToSection("home")} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">Home</button></li>
                  <li><button onClick={() => scrollToSection("about")} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">About</button></li>
                  <li><button onClick={() => scrollToSection("services")} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">Services</button></li>
                  <li><button onClick={() => scrollToSection("testimonials")} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">Reviews</button></li>
                  <li><button onClick={() => scrollToSection("contact")} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">Contact</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{footerContactLabel}</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="text-indigo-400 mt-0.5" size={18} />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-indigo-400 mt-0.5" size={18} />
                    <a href={`mailto:${email}`} className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">
                      {email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-indigo-400 mt-0.5" size={18} />
                    <a href="https://maps.google.com/maps?q=Mumbai,+Maharashtra,+India" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-slate-300 hover:text-indigo-400 transition-colors">
                      {address}, India
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-8 sm:mt-16 pt-6 sm:pt-8 text-center text-sm sm:text-base text-slate-400">
              {footerCopyright}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}