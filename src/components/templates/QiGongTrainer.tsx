'use client';

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Plus,
  Minus,
  ArrowUp,
  Star,
  Quote,
  Wind,
  Brain,
  Heart,
  Activity,
  ArrowRight,
  Clock
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

// Helper functions to safely parse array data
const safeParseArray = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data.split(",").map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        if (parts.length >= 4) {
          return {
            title: parts[0] || "",
            description: parts[1] || "",
            image: parts[2] || "",
            duration: parts[3] || "",
            level: parts[4] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseBenefits = (data: any, defaultData: any[]): any[] => {
  // If it's already an array with data, return it
  if (Array.isArray(data) && data.length > 0) return data;
  
  // If it's a string, try to parse it
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // Parse pipe-separated format: "title | description"
      // Icon is NOT needed from JSON - it will be assigned by index in the component
      const items = data.split(",").map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        // Only need 2 parts: title and description
        if (parts.length >= 2) {
          return {
            title: parts[0] || "",
            description: parts[1] || "",
            // icon will be assigned by index in the component
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseTestimonials = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data.split(",").map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        if (parts.length >= 3) {
          return {
            name: parts[0] || "",
            role: parts[1] || "",
            quote: parts[2] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseFaqs = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data.split(",").map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        if (parts.length >= 2) {
          return {
            question: parts[0] || "",
            answer: parts[1] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

export default function Trainer({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const benefitsSection = data?.benefitsSection || {};
  const sessionsSection = data?.sessionsSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const contactInfo = data?.contactInfo || {};

  // Default values
  const companyName = basicInfo.companyName || "QiFlow";
  const companyLogo = basicInfo.logo || "";

  // Hero Section
  const heroBadge = heroSection.badge || "Awaken Your Vital Energy";
  const heroTitle = heroSection.title || "Cultivate Balance";
  const heroHighlight = heroSection.highlight || "Find Inner Peace.";
  const heroDescription = heroSection.description || 
    "Master the art of mindful movement and breathwork. Join our guided sessions to heal your body, elevate your spirit, and discover profound tranquility.";
  const heroButtonText = heroSection.buttonText || "Discover the Practice";
  const heroImage = heroSection.image || 
    "https://cdn.britannica.com/67/258067-050-65FCAEF5/qigong-practice-Vilnius-Lithuania.jpg";
  
  // Stats
  const stat1Number = heroSection.stat1Number || "20+";
  const stat1Label = heroSection.stat1Label || "Years of Mastery";
  const stat2Number = heroSection.stat2Number || "5K+";
  const stat2Label = heroSection.stat2Label || "Practitioners";
  const stat3Number = heroSection.stat3Number || "100%";
  const stat3Label = heroSection.stat3Label || "Harmony";

  // About Section
  const aboutBadge = aboutSection.badge || "The Master";
  const aboutTitle = aboutSection.title || "Movement is the";
  const aboutHighlight = aboutSection.highlight || "song of the body.";
  const aboutDescription = aboutSection.description ||
    "With over two decades dedicated to traditional Qigong and Tai Chi, Master Lin curates an environment of pure tranquility. The philosophy is simple: true health originates from the uninterrupted, harmonious flow of Qi.";
  const aboutImage = aboutSection.image ||
    "https://cdn.yogajournal.com/wp-content/uploads/2019/01/istock-996839654.jpg";

  // Benefits Section
  const benefitsBadge = benefitsSection.badge || "The Philosophy";
  const benefitsTitle = benefitsSection.title || "The Power of";
  const benefitsHighlight = benefitsSection.highlight || "Qi";

  // Define icons array - these will be assigned by index
  const benefitIcons = [Brain, Heart, Activity];

  const defaultBenefits = [
    {
      title: "Mental Clarity",
      description: "Dissolve mental fatigue and cultivate a razor-sharp, tranquil focus that transcends the practice mat."
    },
    {
      title: "Emotional Balance",
      description: "Release stagnant energy, elevating your mood and fostering an unshakeable inner joy."
    },
    {
      title: "Physical Vitality",
      description: "Enhance your body's natural healing capabilities, improving flexibility, balance, and core strength."
    }
  ];
  
  const benefits = safeParseBenefits(benefitsSection?.benefits, defaultBenefits);
  console.log("Parsed benefits:", benefits);

  // Sessions Section
  const sessionsBadge = sessionsSection.badge || "Our Offerings";
  const sessionsTitle = sessionsSection.title || "Curated";
  const sessionsHighlight = sessionsSection.highlight || "Practices";

  const defaultSessions = [
    {
      title: "Eight Brocades",
      description: "An elegant, flowing sequence designed for beginners to open essential energy channels.",
      image: "https://images.squarespace-cdn.com/content/v1/59615e9b36e5d31cf08fd6ed/1567265531199-WRIASDV6D8438QYR78ER/8-brocades-2.jpg    ",
      duration: "45 min",
      level: "Foundational"
    },
    {
      title: "Medical Qigong",
      description: "Targeted micro-movements and clinical breathwork addressing chronic tension and organ vitality.",
      image: "https://content.api.news/v3/images/bin/b6b252da8435f8a41d308b0e54bb7a4d",
      duration: "60 min",
      level: "All Levels"
    },
    {
      title: "Advanced Flow",
      description: "Complex sequences focusing on deep spiritual grounding and traditional martial applications.",
      image: "https://www.sinowushuacademy.com/uploads/3/4/1/9/34198470/20190622-161742_1_orig.jpg",
      duration: "75 min",
      level: "Mastery"
    }
  ];
  const sessions = safeParseArray(sessionsSection?.sessions, defaultSessions);

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Perspectives";
  const testimonialsTitle = testimonialsSection.title || "Student";
  const testimonialsHighlight = testimonialsSection.highlight || "Journeys";

  const defaultTestimonials = [
    {
      name: "Sarah Mitchell",
      role: "Yoga Instructor",
      quote: "Master Lin's approach is profoundly grounding. The breathwork has completely redefined my daily routine and inner peace."
    },
    {
      name: "David Nakamura",
      role: "Architect",
      quote: "The mental clarity I've gained is remarkable. It serves as the perfect counter-balance to a high-stress corporate life."
    },
    {
      name: "Elena Kostova",
      role: "Wellness Advocate",
      quote: "Starting at 65, I was hesitant. Now, my balance and flexibility rival that of my younger years. Truly transformative."
    }
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // FAQ Section
  const faqBadge = faqSection.badge || "Inquiries";
  const faqTitle = faqSection.title || "Common";
  const faqHighlight = faqSection.highlight || "Questions";

  const defaultFaqs = [
    {
      question: "Is prior experience required?",
      answer: "Not at all. Our foundational classes are adaptable to any fitness level, and movements can be performed seated if necessary."
    },
    {
      question: "What is the recommended attire?",
      answer: "Loose, breathable garments that allow for unrestricted motion. We practice barefoot or in flat-soled studio shoes."
    },
    {
      question: "How does this differ from Yoga?",
      answer: "Qigong involves continuous, fluid movements and specific energy cultivation techniques rather than the static stretching often found in Yoga."
    }
  ];
  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Footer Section - Use same company name and logo as basicInfo
  const footerCompanyName = basicInfo.companyName || "QiFlow";
  const footerLogo = basicInfo.logo || "";
  const footerDescription = footerSection.description ||
    "Elevating the human experience through ancient movement and mindful breathwork. Discover the art of stillness in motion.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Navigation";
  const footerContactLabel = footerSection.contactLabel || "Contact";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} QiFlow. All rights reserved.`;

  // Contact Info
  const phone = contactInfo.phone || "+91 12345 67890";
  const email = contactInfo.email || "inquiries@qiflow.com";
  const address = contactInfo.address || "Mumbai, Maharashtra - 400000";
  const whatsappNumber = contactInfo.whatsapp || "1234567890";

  // Social Links
  const instagram = socialLinks.instagram || "#";
  const facebook = socialLinks.facebook || "#";
  const linkedin = socialLinks.linkedin || "#";
  const youtube = socialLinks.youtube || "#";

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimIndex, setTestimIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const nextTestimonial = () => setTestimIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const visibleTestimonials = testimonials.length >= 3
    ? [
        testimonials[testimIndex],
        testimonials[(testimIndex + 1) % testimonials.length],
        testimonials[(testimIndex + 2) % testimonials.length],
      ]
    : testimonials;

  const whatsappClean = whatsappNumber.replace(/\s/g, '');

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    // Create WhatsApp message
    const textMessage = `🧘 *New Session Inquiry*

*First Name:* ${formData.firstName}
*Last Name:* ${formData.lastName}
*Email:* ${formData.email}
*Message:* ${formData.message}

*Sent from:* QiFlow Website`;

    const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(textMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        .premium-input {
          width: 100%;
          background: transparent;
          border-bottom: 1px solid #E5E7EB;
          padding: 1rem 0;
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          color: #111827;
          transition: border-color 0.4s ease;
        }
        .premium-input:focus {
          outline: none;
          border-bottom-color: #111827;
        }
        .premium-input::placeholder { color: #9CA3AF; }
        .premium-input:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hover-line-link {
          position: relative;
        }
        .hover-line-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .hover-line-link:hover::after {
          width: 100%;
        }

        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .submit-btn .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .section-hero {
          background: 
            radial-gradient(circle at 0% 20%, #F5F0EB 0%, transparent 50%),
            radial-gradient(circle at 100% 80%, #EDE8E0 0%, transparent 50%),
            #FAFAFA;
        }

        .section-about {
          background: 
            radial-gradient(circle at 50% 0%, #F0EBE5 0%, transparent 40%),
            #FFFFFF;
        }

        .section-benefits {
          background: 
            radial-gradient(circle at 30% 50%, #F5F0EB 0%, transparent 45%),
            #FAFAFA;
        }

        .section-sessions {
          background: 
            radial-gradient(circle at 70% 30%, #EDE8E0 0%, transparent 40%),
            #FFFFFF;
        }

        .section-testimonials {
          background: #1A1C1E;
        }

        .section-faq {
          background: #FFFFFF;
        }

        .section-form {
          background: #FAFAFA;
        }

        /* Section divider - subtle separation */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(181, 164, 139, 0.15), transparent);
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>

      <div className="relative min-h-screen bg-[#FAFAFA] text-[#111827] font-sans selection:bg-[#B5A48B] selection:text-white">
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <button onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-white shadow-xl border border-gray-100 p-3 rounded-full hover:bg-[#B5A48B] hover:text-white transition-all duration-300 group">
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* Floating WhatsApp Button */}
        {whatsappClean && (
          <a
            href={`https://wa.me/${whatsappClean.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Hello ${companyName}, I'd like to inquire about Qi-Gong sessions.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        )}

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
            
            <div className="flex items-center cursor-pointer gap-3 z-50" onClick={() => scrollToSection("home")}>
              {companyLogo ? (
                <Image src={companyLogo} alt={companyName} width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
              ) : (
                <Wind className="w-6 h-6 text-[#111827]" />
              )}
              <span className="text-xl font-serif tracking-widest uppercase">
                {companyName}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-12">
              {["About", "Benefits", "Sessions", "FAQ"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#4B5563] hover:text-[#111827] text-xs tracking-[0.2em] uppercase hover-line-link">
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => scrollToSection("faq")}
                className="bg-[#111827] text-white px-8 py-3 text-xs uppercase tracking-[0.15em] hover:bg-[#B5A48B] transition-colors duration-400">
                Book a Session
              </button>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-[#111827] z-50">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="flex flex-col items-center space-y-8 text-center">
              {["Home", "About", "Benefits", "Sessions", "FAQ", "Contact"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} 
                  className="text-3xl font-serif tracking-wide text-[#111827] hover:text-[#B5A48B] transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main>
          
          {/* Hero Section - Reduced height to fit screen */}
          <section
            id="home"
            className="relative min-h-[calc(100vh-80px)] h-auto flex items-center pt-16 md:pt-20 section-hero overflow-hidden"
          >
            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 grid lg:grid-cols-12 gap-12 xl:gap-20 items-center py-8 md:py-12">

              <div className="lg:col-span-5 flex flex-col justify-center fade-in-up space-y-6 md:space-y-8 relative z-10">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#B5A48B]" />
                  <span className="text-[#B5A48B] uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium">
                    {heroBadge}
                  </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl leading-[1.08] text-[#111827]">
                  {heroTitle}
                  <br />
                  <span className="italic text-[#B5A48B]">
                    {heroHighlight}
                  </span>
                </h1>

                <p className="text-[#4B5563] text-base md:text-lg leading-7 md:leading-8 font-light max-w-md">
                  {heroDescription}
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => scrollToSection("sessions")}
                    className="group flex items-center gap-4 border-b border-[#111827] pb-2 text-xs md:text-sm uppercase tracking-[0.15em] text-[#111827] hover:text-[#B5A48B] hover:border-[#B5A48B] transition-all duration-500"
                  >
                    {heroButtonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-gray-200">

                  {[
                    { val: stat1Number, label: stat1Label },
                    { val: stat2Number, label: stat2Label },
                    { val: stat3Number, label: stat3Label },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl md:text-3xl font-serif text-[#111827]">
                        {stat.val}
                      </div>
                      <div className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#6B7280] mt-1 md:mt-2">
                        {stat.label}
                      </div>
                    </div>
                  ))}

                </div>

              </div>

              <div
                className="lg:col-span-7 relative flex justify-center items-center h-[320px] md:h-[400px] xl:h-[480px] fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >

                <div className="absolute w-[90%] h-[90%] rounded-[50px] md:rounded-[60px] bg-gradient-to-br from-[#F7F5F2] via-[#EEF3EC] to-[#F3F0EA] blur-[60px] md:blur-[80px] opacity-70"></div>

                <div className="absolute w-[85%] h-[85%] rounded-[36px] md:rounded-[42px] border border-[#D7C8B3]/20"></div>

                {/* Main Image - Reduced height */}
                <div
                  className="
                    relative
                    w-full
                    max-w-[680px]
                    h-[300px]
                    md:h-[380px]
                    xl:h-[440px]
                    rounded-[32px]
                    md:rounded-[38px]
                    overflow-hidden
                    bg-white
                    shadow-[0_30px_80px_rgba(0,0,0,0.10)]
                    group
                  "
                >

                  <img
                    src={heroImage}
                    alt="Qi Gong Practice"
                    className="
                      w-full
                      h-full
                      object-cover
                      object-center
                      transition-transform
                      duration-[2500ms]
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>

                </div>

                <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-[#B5A48B]/50"></div>

              </div>

            </div>
          </section>

          {/* Subtle Section Divider */}
          <div className="section-divider"></div>

          {/* About Section */}
          <section id="about" className="py-20 lg:py-28 px-6 md:px-12 section-about">
            <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
              
              <div className="relative h-[300px] md:h-[470px] w-full lg:w-4/5 mx-auto lg:ml-auto order-2 lg:order-1">
                <img
                  src={aboutImage}
                  alt="About"
                  className="w-full h-[300px] md:h-[75vh] object-cover object-center rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FAFAFA] -z-10 rounded-full" />
              </div>

              <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[#B5A48B]" />
                  <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">{aboutBadge}</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-[#111827]">
                  {aboutTitle} <br/>
                  <span className="italic">{aboutHighlight}</span>
                </h2>

                <p className="text-[#4B5563] text-base md:text-lg font-light leading-relaxed">
                  {aboutDescription}
                </p>

              </div>

            </div>
          </section>

          {/* Section Divider */}
          <div className="section-divider"></div>

          {/* Benefits Section */}
          <section id="benefits" className="py-20 lg:py-28 px-6 md:px-12 section-benefits">
            <div className="max-w-[1600px] mx-auto">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4 max-w-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-[#B5A48B]" />
                    <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">{benefitsBadge}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#111827]">
                    {benefitsTitle} <span className="italic">{benefitsHighlight}</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {benefits.map((benefit: any, index: number) => {
                  // Assign icon by index from the benefitIcons array
                  const Icon = benefitIcons[index % benefitIcons.length];
                  return (
                    <div key={index} className="group bg-white p-8 md:p-10 lg:p-12 border border-gray-100 hover:border-[#B5A48B] hover:-translate-y-2 transition-all duration-500 rounded-2xl shadow-sm hover:shadow-xl">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#B5A48B] mb-6 md:mb-8" strokeWidth={1} />
                      <h3 className="text-xl md:text-2xl font-serif text-[#111827] mb-3 md:mb-4">{benefit.title}</h3>
                      <p className="text-[#4B5563] font-light leading-relaxed text-sm md:text-base">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="section-divider"></div>

          {/* Sessions Section */}
          <section id="sessions" className="py-20 lg:py-28 px-6 md:px-12 section-sessions">
            <div className="max-w-[1600px] mx-auto">
              
              <div className="mb-12 md:mb-16 space-y-3 md:space-y-4 text-left">
  <div className="flex items-center gap-4">
    <div className="w-8 h-px bg-[#B5A48B]" />
    <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">
      {sessionsBadge}
    </span>
  </div>

  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#111827] leading-tight">
    {sessionsTitle}{" "}
    <span className="italic">
      {sessionsHighlight}
    </span>
  </h2>
</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {sessions.map((session: any, index: number) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative h-[300px] md:h-[380px] w-full overflow-hidden rounded-2xl mb-4 md:mb-6">
                      <img
                        src={session.image}
                        alt={session.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white px-3 md:px-4 py-1 md:py-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-[#111827] rounded-full">
                        {session.level}
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                      <div className="flex justify-between items-center text-[#6B7280] text-[10px] md:text-xs tracking-wider">
                        <span className="flex items-center gap-1 md:gap-2">
                          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={1.5} />
                          {session.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif text-[#111827]">{session.title}</h3>
                      <p className="text-[#4B5563] font-light leading-relaxed text-sm mb-4 md:mb-6 line-clamp-2">
                        {session.description}
                      </p>
                      <button onClick={() => scrollToSection("faq")} className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#111827] border-b border-[#111827] pb-1 hover:text-[#B5A48B] hover:border-[#B5A48B] transition-colors">
                        Reserve Space
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Section Divider - subtle line before testimonials (dark section) */}
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 lg:py-28 px-6 md:px-12 section-testimonials text-white">
            <div className="max-w-[1600px] mx-auto">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-[#B5A48B]" />
                    <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">{testimonialsBadge}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
                    {testimonialsTitle} <span className="italic text-[#B5A48B]">{testimonialsHighlight}</span>
                  </h2>
                </div>
                
                <div className="flex space-x-3 md:space-x-4">
                  <button onClick={prevTestimonial} className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                    <ChevronLeft className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
                  </button>
                  <button onClick={nextTestimonial} className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                    <ChevronRight className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-white/10 pt-10 md:pt-12">
                {visibleTestimonials.map((testimonial: any, idx: number) => (
                  <div key={`${testimonial.name}-${idx}`} className="space-y-4 md:space-y-6">
                    <Quote className="text-[#B5A48B] w-7 h-7 md:w-8 md:h-8 opacity-50" />
                    <p className="font-serif text-lg md:text-xl italic leading-relaxed text-white/90 min-h-[80px] md:min-h-[100px]">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="text-xs md:text-sm font-medium tracking-wide uppercase">{testimonial.name}</h4>
                      <p className="text-[10px] md:text-xs text-white/50 tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* FAQ & Contact Section Split */}
          <section id="faq" className="bg-[#FAFAFA]">
            <div className="grid lg:grid-cols-2">
              
              {/* FAQ Side */}
              <div className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 flex flex-col justify-center section-faq">
                <div className="max-w-xl mx-auto w-full space-y-10 md:space-y-12">
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-[#B5A48B]" />
                      <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">{faqBadge}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#111827]">
                      {faqTitle} <span className="italic">{faqHighlight}</span>
                    </h2>
                  </div>

                  <div className="space-y-2">
                    {faqs.map((faq: any, index: number) => (
                      <div key={index} className="border-b border-gray-200">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full py-4 md:py-6 flex justify-between items-center text-left hover:text-[#B5A48B] transition-colors group"
                        >
                          <span className="font-serif text-lg md:text-xl text-[#111827] group-hover:text-[#B5A48B] transition-colors">{faq.question}</span>
                          {openFaq === index ? (
                            <Minus className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={1.5} />
                          ) : (
                            <Plus className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={1.5} />
                          )}
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-40 pb-4 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-[#4B5563] font-light leading-relaxed text-sm md:text-base">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Form Side */}
              <div className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 flex flex-col justify-center section-form">
                <div className="max-w-xl mx-auto w-full space-y-10 md:space-y-12">
                  
                  <div className="space-y-3 md:space-y-4">
                    <span className="text-[#B5A48B] uppercase tracking-[0.2em] text-[10px] font-medium">Inquiries</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#111827]">
                      Begin Your <span className="italic">Journey</span>
                    </h2>
                    <p className="text-[#4B5563] font-light text-sm md:text-base">Connect with us to schedule your initial consultation or inquire about our specialized programs.</p>
                  </div>

                  <form className="space-y-6 md:space-y-8" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="premium-input" 
                          placeholder="First Name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="premium-input" 
                          placeholder="Last Name"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="premium-input" 
                        placeholder="Email Address"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <textarea 
                        name="message"
                        rows={3} 
                        value={formData.message}
                        onChange={handleInputChange}
                        className="premium-input resize-none" 
                        placeholder="Your Message"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="submit-btn mt-4 md:mt-8 bg-[#111827] text-white px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#B5A48B] transition-colors duration-400 w-full md:w-auto flex items-center justify-center gap-3 rounded-full"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loader" />
                          Sending...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </form>

                </div>
              </div>

            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-[#111827] text-white pt-20 lg:pt-24 pb-8 lg:pb-12 px-6 md:px-12">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-12 lg:gap-8 pb-12 lg:pb-16 border-b border-white/10">
            
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                {footerLogo ? (
                  <Image src={footerLogo} alt={footerCompanyName} width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
                ) : (
                  <Wind className="w-6 h-6 text-[#B5A48B]" />
                )}
                <span className="text-xl md:text-2xl font-serif tracking-widest uppercase">{footerCompanyName}</span>
              </div>
              <p className="text-white/60 font-light text-sm max-w-sm leading-relaxed">
                {footerDescription}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 md:mb-6">{footerQuickLinksLabel}</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-light text-white/80">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-[#B5A48B] transition-colors">About the Practice</button></li>
                <li><button onClick={() => scrollToSection("sessions")} className="hover:text-[#B5A48B] transition-colors">Curated Sessions</button></li>
                <li><button onClick={() => scrollToSection("faqs")} className="hover:text-[#B5A48B] transition-colors">Client Inquiries</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 md:mb-6">{footerContactLabel}</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-light text-white/80">
                <li><a href={`tel:${phone}`} className="hover:text-[#B5A48B] transition-colors">{phone}</a></li>
                <li><a href={`mailto:${email}`} className="hover:text-[#B5A48B] transition-colors">{email}</a></li>
                <li className="text-white/50">{address}</li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
                {instagram && instagram !== "#" && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#B5A48B] transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                {facebook && facebook !== "#" && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#B5A48B] transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                )}
                {linkedin && linkedin !== "#" && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#B5A48B] transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
                {youtube && youtube !== "#" && (
                  <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#B5A48B] transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Copyright centered */}
          <div className="max-w-[1600px] mx-auto pt-6 md:pt-8 flex justify-center text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/40">
            <p>{footerCopyright}</p>
          </div>
        </footer>

      </div>
    </>
  );
}