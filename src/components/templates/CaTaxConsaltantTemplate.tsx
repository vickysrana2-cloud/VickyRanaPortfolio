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
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Building2,
  FileText,
  Calculator,
  BarChart3,
  Zap,
  Target,
  UserCheck,
  HeartHandshake,
  RefreshCw,
  ClipboardList,
  CreditCard,
  PieChart,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
              else if (index === 3) result.number = part;
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
          if (parts.length >= 3) {
            return {
              name: parts[0] || "",
              role: parts[1] || "",
              message: parts[2] || "",
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

const safeParseFaqs = (data: any, defaultData: any[]): any[] => {
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
              question: parts[0] || "",
              answer: parts[1] || "",
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

export default function TaxNestLandingPage({ data }: { data: any }) {
  console.log("data is", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const whyChooseUsSection = data?.whyChooseUsSection || {};
  const servicesSection = data?.servicesSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const contactInfo = data?.contactInfo || {};

  // Default values
  const companyName = basicInfo.companyName || "TaxNest";
  const companyLogo = basicInfo.logo || "https://img.magnific.com/free-vector/tax-service-branding-identity-corporate-vector-logo-bundle-design_460848-13825.jpg";
  const companyTagline = basicInfo.tagline || "Accounting Handled. Growth Enabled.";

  // Hero Section
  const heroBadge = heroSection.badge || "Trusted by 100+ Businesses";
  const heroTitle = heroSection.title || "Accounting Handled.";
  const heroHighlight = heroSection.highlight || "Growth Enabled.";
  const heroDescription = heroSection.description || 
    "Expert accounting, taxation, and financial advisory — so you can run your business with confidence, not spreadsheets.";
  const heroButtonText = heroSection.buttonText || "Book a Consultation";
  const heroSecondaryButtonText = heroSection.secondaryButtonText || "Our Services";
  const heroImage = heroSection.image || 
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80";
  const heroBackgroundImage = heroSection.backgroundImage || 
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80";
  
  // Stats
  const stat1Number = heroSection.stat1Number || "100+";
  const stat1Label = heroSection.stat1Label || "Businesses served";
  const stat2Number = heroSection.stat2Number || "15+ yrs";
  const stat2Label = heroSection.stat2Label || "Industry experience";
  const stat3Number = heroSection.stat3Number || "100%";
  const stat3Label = heroSection.stat3Label || "Compliance track record";

  // About Section
  const aboutBadge = aboutSection.badge || "ABOUT US";
  const aboutTitle = aboutSection.title || "We're Here to Help You";
  const aboutHighlight = aboutSection.highlight || "Grow & Succeed";
  const aboutDescription = aboutSection.description ||
    "At TaxNest Accounting, we believe in more than just numbers. We're a team of dedicated Chartered Accountants and financial experts committed to helping businesses thrive through expert financial guidance and unwavering support.";
  const aboutImage = aboutSection.image ||
    "https://yianni.com.au/wp-content/uploads/2019/03/Yianni-Co-07.jpg";

  // Why Choose Us Section
  const whyChooseUsBadge = whyChooseUsSection.badge || "WHY CHOOSE US";
  const whyChooseUsTitle = whyChooseUsSection.title || "Why Work With Us";
  const whyChooseUsDescription = whyChooseUsSection.description ||
    "We combine expertise, innovation, and dedication to deliver exceptional financial services that drive business growth.";

  const defaultFeatures = [
    { title: "Expert Team", description: "Our team consists of experienced Chartered Accountants and financial experts." },
    { title: "Fast & Reliable", description: "We deliver quick turnarounds without compromising on quality or accuracy." },
    { title: "Tailored Solutions", description: "Every business is unique. We customize our services to meet your specific needs." },
    { title: "Trusted Partner", description: "We build long-term relationships based on trust, transparency, and results." },
  ];
  const features = safeParseFeatures(whyChooseUsSection?.features, defaultFeatures);

  // Services Section
  const servicesBadge = servicesSection.badge || "OUR SERVICES";
  const servicesTitle = servicesSection.title || "What We Do";
  const servicesDescription = servicesSection.description ||
    "We provide complete accounting, taxation, auditing, and financial advisory services tailored to your needs.";

  const defaultServices = [
    {
      number: "01",
      title: "Accounting Services",
      description: "Comprehensive accounting solutions to keep your financial records accurate and organized.",
      image: "https://t4.ftcdn.net/jpg/01/36/64/11/360_F_136641191_fYmeLwzvxYIprfMzZERKWew3cMjamdQH.jpg",
    },
    {
      number: "02",
      title: "Tax Services",
      description: "Expert tax planning, filing, and compliance services for individuals and businesses.",
      image: "https://akmglobal.com/images/taxation.jpg",
    },
    {
      number: "03",
      title: "Financial Advisory",
      description: "Strategic financial guidance to help your business grow with confidence.",
      image: "https://img.magnific.com/free-photo/finance-money-debt-credit-balance-concept_53876-133849.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      number: "04",
      title: "Company Registration",
      description: "Register your company with expert guidance. We manage the entire incorporation process.",
      image: "https://t3.ftcdn.net/jpg/01/03/94/68/360_F_103946864_BAn2n3MX4o9oDR2YeUUQlk1xgxYmXVYZ.jpg",
    },
  ];
  const services = safeParseArray(servicesSection?.services, defaultServices);

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "TESTIMONIALS";
  const testimonialsTitle = testimonialsSection.title || "What Our Clients Say";
  const testimonialsDescription = testimonialsSection.description ||
    "We take pride in building long-term relationships through reliable accounting, taxation, and financial consulting services.";

  const defaultTestimonials = [
    {
      name: "Arun Matkar",
      role: "Founder, TechStart",
      message: "The team handled our company registration and tax filing efficiently. Their guidance made the entire process smooth and stress-free.",
    },
    {
      name: "Pooja Jha",
      role: "CEO, DigitalWave",
      message: "Professional, reliable, and always available to answer our questions. Their accounting services have been a great support to our business.",
    },
    {
      name: "Yash Kale",
      role: "Director, BuildCorp",
      message: "Excellent experience working with them. From GST compliance to financial advice, everything was completed on time and with complete transparency.",
    },
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // FAQ Section
  const faqBadge = faqSection.badge || "FAQ";
  const faqTitle = faqSection.title || "Frequently Asked Questions";
  const faqDescription = faqSection.description ||
    "Find answers to common questions about our services and process.";

  const defaultFaqs = [
    {
      question: "What services do you offer?",
      answer: "We provide Accounting, Tax Planning, GST Registration & Filing, Company Registration, Audit & Assurance, and Financial Advisory services.",
    },
    {
      question: "Do you work with startups and small businesses?",
      answer: "Yes. We assist startups, MSMEs, and established businesses with accounting, taxation, compliance, and financial consulting.",
    },
    {
      question: "How long does company registration take?",
      answer: "The timeline depends on the type of business entity and government approvals, but we ensure a smooth and timely registration process.",
    },
    {
      question: "Can you help with GST registration and filing?",
      answer: "Absolutely. We offer complete GST registration, return filing, compliance, and advisory services.",
    },
  ];
  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Contact Info
  const phone = contactInfo.phone || "+91 98765 43210";
  const email = contactInfo.email || "info@taxnest.com";
  const address = contactInfo.address || "Mumbai, Maharashtra, India";
  const whatsappNumber = contactInfo.whatsapp || "+91 98765 43210";
  const formTitle = contactInfo.formTitle || "Request a Callback";
  const formButtonText = contactInfo.formButtonText || "Submit Enquiry";

  // Social Links
  const facebook = socialLinks.facebook || "https://www.facebook.com/";
  const instagram = socialLinks.instagram || "https://www.instagram.com/";
  const twitter = socialLinks.twitter || "https://twitter.com/";
  const linkedin = socialLinks.linkedin || "https://www.linkedin.com/";

  // Footer Section
  const footerCompanyName = footerSection.companyName || "TaxNest";
  const footerLogo = footerSection.logo || "https://img.magnific.com/free-vector/tax-service-branding-identity-corporate-vector-logo-bundle-design_460848-13825.jpg";
  const footerDescription = footerSection.description ||
    "A trusted Chartered Accountant firm providing Accounting, Taxation, GST, Audit and Financial Advisory services for businesses and individuals.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerContactLabel = footerSection.contactLabel || "Contact Info";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} TaxNest Accounting. All Rights Reserved.`;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      setScrolled(window.scrollY > 50);
    };
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
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
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

      <div className="relative min-h-screen bg-white font-['Inter'] overflow-x-hidden">
        
        {/* Ambient Lighting */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="bg-noise absolute inset-0 z-50" />
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-teal-100 rounded-full mix-blend-multiply blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[30%] right-[-10%] w-[900px] h-[900px] bg-teal-50 rounded-full mix-blend-multiply blur-[150px] opacity-30" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-200 rounded-full mix-blend-multiply blur-[150px] opacity-10" />
        </div>

        {/* Floating Actions */}
        <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-[#25D366] to-[#45E681] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        </a>

        {showBackToTop && (
          <button onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-white/40 backdrop-blur-xl border border-white/50 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-teal-600 group">
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* =========================TOP BAR========================== */}
        <div className="hidden md:block bg-slate-800 text-white border-b border-white/5 relative z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
                <a
                  href={`mailto:${email}?subject=Inquiry%20from%20Website&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services...`}
                  className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light"
                >
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:gap-5 text-sm">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1 lg:gap-2 font-light text-xs sm:text-sm"
              >
                <FaLinkedinIn className="text-teal-400" size={12} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href={`https://wa.me/${whatsappClean}?text=Hi%20${companyName}%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors flex items-center gap-1 lg:gap-2 font-light text-xs sm:text-sm"
              >
                <FaWhatsapp className="text-teal-400" size={12} />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================NAVBAR========================== */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100"
            : "bg-white border-b border-slate-100"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
              <div className="flex items-center cursor-pointer gap-2 sm:gap-3" onClick={() => scrollToSection("home")}>
                {companyLogo && (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-200 group-hover:shadow-teal-300 transition-all duration-300">
                    <img 
                      src={companyLogo}
                      width={80}
                      height={60}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">{companyName}</span>
                  <span className="hidden sm:block text-[10px] sm:text-[11px] text-teal-600 font-medium -mt-0.5 tracking-wide">
                    ACCOUNTING
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                {navItems.map((item) => (
                  <button key={item.name} onClick={() => scrollToSection(item.href.replace("#", ""))}
                    className="text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors relative group">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <a href={`https://wa.me/${whatsappClean}`} className="p-2.5 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors text-teal-600">
                  <MessageCircle size={18} />
                </a>
                <a href={`mailto:${email}`} className="p-2.5 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors text-teal-600">
                  <Mail size={18} />
                </a>
                <a href="#contact" className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 xl:px-7 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-teal-200">
                  Book Consultation
                </a>
              </div>

              <div className="lg:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800 p-2 -mr-2">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4 sm:pb-5' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {navItems.map((item) => (
                  <button key={item.name} onClick={() => scrollToSection(item.href.replace("#", ""))} 
                    className="text-left text-slate-700 hover:text-teal-600 font-medium text-sm sm:text-base px-2 py-1.5">
                    {item.name}
                  </button>
                ))}
                <a href="#contact" className="inline-block bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 sm:px-7 py-2.5 sm:py-3 rounded-full font-medium text-sm text-center">
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          
          {/* =========================HERO========================== */}
          <section id="home" className="relative min-h-[90vh] sm:min-h-screen pt-14 sm:pt-20 flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${heroBackgroundImage}')` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/10 to-transparent" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-teal-500/10 blur-[140px]" />
              <div className="absolute top-20 right-0 w-[500px] h-[420px] rounded-full bg-teal-400/10 blur-[180px]" />
              <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-teal-600/10 blur-[180px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-teal-400 backdrop-blur-sm border border-teal-500/20 mb-4 sm:mb-8">
                    <Award size={14} className="text-teal-400" />
                    {heroBadge}
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
                    {heroTitle}
                    <span className="block text-teal-400 mt-1 sm:mt-2">
                      {heroHighlight}
                    </span>
                  </h1>

                  <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8 text-white/60 max-w-lg font-light">
                    {heroDescription}
                  </p>

                  <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                    <a href="#contact" className="rounded-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 px-6 sm:px-8 py-2.5 sm:py-3.5 text-white font-medium hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 text-xs sm:text-sm tracking-wide inline-flex items-center gap-2">
                      {heroButtonText}
                      <ChevronRight size={16} />
                    </a>
                    <a href="#services" className="rounded-full border border-white/20 px-6 sm:px-8 py-2.5 sm:py-3.5 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm tracking-wide font-light">
                      {heroSecondaryButtonText}
                    </a>
                  </div>
                </div>

                <div className="hidden lg:flex justify-center">
                  <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 space-y-6">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-teal-400">{stat1Number}</p>
                      <p className="text-sm text-white/50 mt-1">{stat1Label}</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-teal-400">{stat2Number}</p>
                      <p className="text-sm text-white/50 mt-1">{stat2Label}</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-teal-400">{stat3Number}</p>
                      <p className="text-sm text-white/50 mt-1">{stat3Label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================ABOUT========================== */}
          <section id="about" className="py-16 sm:py-24 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-teal-400/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-[#f8f9fc] rounded-3xl overflow-hidden">
                    <img
                      src={aboutImage}
                      alt="About TaxNest"
                      width="600"
                      height="400"
                      loading="lazy"
                      className="w-full h-[250px] sm:h-[350px] lg:h-[500px] xl:h-[600px] object-cover"
                    />
                  </div>
                </div>

                <div className="mt-8 lg:mt-0">
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium tracking-widest mb-4 sm:mb-5">
                    {aboutBadge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 tracking-tight">
                    {aboutTitle}
                    <span className="block text-teal-500 mt-1 sm:mt-2">{aboutHighlight}</span>
                  </h2>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-500 leading-relaxed sm:leading-8 font-light">
                    {aboutDescription}
                  </p>

                  <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                    {["Expert Team", "Trusted Service", "100% Transparency", "On-Time Delivery"].map((item) => (
                      <div key={item} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="text-teal-600" size={14} />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="inline-flex items-center gap-2 mt-6 sm:mt-10 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg shadow-teal-200 hover:shadow-teal-300 text-xs sm:text-sm tracking-wide">
                    Get Started Today
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* =========================WHY CHOOSE US========================== */}
          <section id="whychooseus" className="py-16 sm:py-24 lg:py-32 bg-[#f8f9fc]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium tracking-widest mb-4 sm:mb-5">
                  {whyChooseUsBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 tracking-tight">
                  {whyChooseUsTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed sm:leading-8 font-light">
                  {whyChooseUsDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {features.map((item: any, index: number) => {
                  const Icons = [UserCheck, Zap, Target, HeartHandshake];
                  const Icon = Icons[index] || UserCheck;
                  return (
                    <div key={index} className="group bg-white rounded-2xl p-6 sm:p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-100/50 border border-slate-100 hover:border-teal-200">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-50 group-hover:bg-teal-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-200">
                        <Icon size={24} className="text-teal-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3 group-hover:text-teal-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed sm:leading-7 font-light">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =========================SERVICES========================== */}
          <section id="services" className="py-16 sm:py-24 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium tracking-widest mb-4 sm:mb-5">
                  {servicesBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 tracking-tight">
                  {servicesTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed sm:leading-8 font-light">
                  {servicesDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {services.map((service: any) => {
                  const Icons = [Calculator, FileText, BarChart3, Building2, RefreshCw, ClipboardList, CreditCard, PieChart];
                  const Icon = Icons[parseInt(service.number) - 1] || Calculator;
                  return (
                    <div key={service.number} className="group bg-[#f8f9fc] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-100/50 border border-slate-100 hover:border-teal-200">
                      <div className="relative h-40 sm:h-48 lg:h-48 overflow-hidden">
                        <img src={service.image} alt={service.title} width="400" height="200" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center font-bold text-teal-600 text-xs sm:text-sm">
                          {service.number}
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <h3 className="text-sm sm:text-lg font-semibold text-white">{service.title}</h3>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed sm:leading-6 font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =========================TESTIMONIALS========================== */}
          <section id="testimonials" className="py-16 sm:py-24 lg:py-32 bg-[#f8f9fc]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium tracking-widest mb-4 sm:mb-5">
                  {testimonialsBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 tracking-tight">
                  {testimonialsTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed sm:leading-8 font-light">
                  {testimonialsDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {testimonials.map((item: any) => (
                  <div key={item.name} className="group bg-white rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-100/50">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm sm:text-base">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-light">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-teal-400 text-teal-400" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed sm:leading-7 font-light italic">
                      "{item.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================FAQ========================== */}
          <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium tracking-widest mb-4 sm:mb-5">
                  {faqBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 tracking-tight">
                  {faqTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed sm:leading-8 font-light">
                  {faqDescription}
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq: any, index: number) => (
                  <div key={index} className="bg-[#f8f9fc] rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:border-teal-200">
                    <button className="w-full px-4 sm:px-8 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-teal-50/30 transition-colors gap-4" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base flex-1">{faq.question}</span>
                      <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-50 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openFaq === index ? "bg-teal-500" : ""}`}>
                        <span className={`text-teal-600 transition-all duration-300 ${openFaq === index ? "text-white rotate-180" : ""}`}>
                          <ChevronDown size={16} />
                        </span>
                      </span>
                    </button>
                    <div className={`px-4 sm:px-8 overflow-hidden transition-all duration-300 ${openFaq === index ? "pb-4 sm:pb-6 max-h-96" : "max-h-0"}`}>
                      <p className="text-sm sm:text-base text-slate-500 leading-relaxed sm:leading-7 font-light">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================CONTACT========================== */}
          <section id="contact" className="py-16 sm:py-24 bg-[#f8f9fc]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="rounded-[24px] sm:rounded-[32px] border border-teal-200 bg-white overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* LEFT SIDE */}
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
                    <span className="inline-flex w-fit rounded-full bg-teal-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-teal-700">
                      Get In Touch
                    </span>

                    <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-800">
                      Let's Grow
                      <br />
                      Your Business
                      <br />
                      Together.
                    </h2>

                    <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-9 text-slate-500">
                      Connect with our Chartered Accountants for taxation, GST, company registration, compliance and financial advisory services.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10">
                      {["Income Tax Filing", "GST Registration", "Trademark Registration", "Company Registration"].map((item) => (
                        <div key={item} className="flex items-center gap-2 sm:gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-teal-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE - Form */}
                  <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/5 rounded-full blur-3xl" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
                        <div className="w-1 h-6 sm:h-8 bg-teal-500 rounded-full" />
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
                          {formTitle}
                        </h3>
                      </div>
                      
                      <form className="space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="space-y-1">
                          <label className="text-xs sm:text-sm font-medium text-slate-700 block">Full Name</label>
                          <input placeholder="Enter your full name" className="w-full h-10 sm:h-11 md:h-12 rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-[#f8f9fc] text-sm transition-all duration-300 focus:bg-white px-4 border" />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs sm:text-sm font-medium text-slate-700 block">Email Address</label>
                          <input type="email" placeholder="Enter your email address" className="w-full h-10 sm:h-11 md:h-12 rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-[#f8f9fc] text-sm transition-all duration-300 focus:bg-white px-4 border" />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs sm:text-sm font-medium text-slate-700 block">Phone Number</label>
                          <input placeholder="Enter your phone number" className="w-full h-10 sm:h-11 md:h-12 rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-[#f8f9fc] text-sm transition-all duration-300 focus:bg-white px-4 border" />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs sm:text-sm font-medium text-slate-700 block">Select Service</label>
                          <select className="w-full h-10 sm:h-11 md:h-12 rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-[#f8f9fc] text-sm transition-all duration-300 focus:bg-white px-4 border">
                            <option value="">Select a service</option>
                            <option value="GST Filing">GST Filing</option>
                            <option value="Company Registration">Company Registration</option>
                            <option value="Income Tax">Income Tax</option>
                            <option value="Audit & Assurance">Audit & Assurance</option>
                            <option value="Financial Advisory">Financial Advisory</option>
                            <option value="Accounting">Accounting Services</option>
                            <option value="Payroll">Payroll Management</option>
                          </select>
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs sm:text-sm font-medium text-slate-700 block">Your Message</label>
                          <textarea rows={3} placeholder="Tell us how we can help you..." className="w-full resize-none rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-[#f8f9fc] text-sm transition-all duration-300 focus:bg-white px-4 py-3 border" />
                        </div>
                        
                        <a href={`https://wa.me/${whatsappClean}?text=New%20Enquiry`} target="_blank" rel="noopener noreferrer" className="w-full h-10 sm:h-11 md:h-12 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium shadow-lg shadow-teal-200 hover:shadow-teal-300 transition-all duration-300 text-sm tracking-wide flex items-center justify-center group">
                          {formButtonText}
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* =========================FOOTER========================== */}
        <footer className="bg-slate-800 text-white pt-12 sm:pt-16 lg:pt-24 pb-6 sm:pb-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
              
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3" onClick={() => scrollToSection("home")}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <img 
                      src={companyLogo}
                      width={80}
                      height={60}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight">{footerCompanyName}</span>
                    <span className="block text-[10px] sm:text-[11px] text-teal-400 font-medium -mt-0.5 tracking-wide">
                      ACCOUNTING
                    </span>
                  </div>
                </div>
                <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-400 leading-relaxed sm:leading-7 font-light max-w-xs">
                  {footerDescription}
                </p>
                
                <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110 group" aria-label="LinkedIn">
                    <FaLinkedinIn size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110 group" aria-label="Instagram">
                    <FaInstagram size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110 group" aria-label="Facebook">
                    <FaFacebookF size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110 group" aria-label="Twitter">
                    <FaTwitter size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 mb-4 sm:mb-6 uppercase">{footerQuickLinksLabel}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["Home", "About", "Services", "Why Us", "Testimonials", "FAQ", "Contact"].map((item) => (
                    <li key={item}>
                      <button onClick={() => scrollToSection(item.toLowerCase().replace(" ", ""))} className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 mb-4 sm:mb-6 uppercase">{footerContactLabel}</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <Phone className="text-teal-400 mt-0.5 group-hover:text-teal-300 transition-colors" size={16} />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light break-all">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <Mail className="text-teal-400 mt-0.5 group-hover:text-teal-300 transition-colors" size={16} />
                    <a href={`mailto:${email}?subject=Inquiry%20from%20Website`} className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light break-all">
                      {email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <MapPin className="text-teal-400 mt-0.5 group-hover:text-teal-300 transition-colors" size={16} />
                    <a href="https://maps.google.com/maps?q=Mumbai,+Maharashtra,+India" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light">
                      {address}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 group">
                    <FaWhatsapp className="text-teal-400 mt-0.5 group-hover:text-green-400 transition-colors" size={14} />
                    <a href={`https://wa.me/${whatsappClean}?text=Hi%20${footerCompanyName}%20Team`} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors font-light">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="border-t border-white/5 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-500 font-light">
              {footerCopyright}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}