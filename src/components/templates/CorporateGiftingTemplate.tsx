"use client";

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
  Sparkles,
  ArrowUp,
  Star,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

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
          if (parts.length >= 3) {
            return {
              title: parts[0] || "",
              price: parts[1] || "",
              desc: parts[2] || "",
              image: parts[3] || "",
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
          if (parts.length >= 3) {
            return {
              name: parts[0] || "",
              designation: parts[1] || "",
              quote: parts[2] || "",
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

export default function LuxuryLandingPage({ data }: { data: any }) {
  console.log("data is", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const giftsSection = data?.giftsSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const contactInfo = data?.contactInfo || {};

  // Default values
  const companyName = basicInfo.companyName || "GIFTIFY";
  const companyLogo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";
  const companyTagline = basicInfo.tagline || "Luxury Corporate Gifting";

  // Hero Section
  const heroTitle = heroSection.title || "Curate the Perfect";
  const heroHighlight = heroSection.highlight || "Impression.";
  const heroDescription = heroSection.description || 
    "Delight clients, employees and loved ones with beautifully curated luxury gifts designed to leave unforgettable impressions and build meaningful relationships.";
  const heroButtonText = heroSection.buttonText || "Explore Gifts";
  const heroImage = heroSection.image || 
    "https://www.thegoodroad.in/cdn/shop/files/S_P_7561web.jpg?v=1737103898";
  const heroPriceLabel = heroSection.priceLabel || "From ₹999";
  const heroBottomText = heroSection.bottomText || "Premium Curated Gifts";
  
  // Stats
  const stat1Number = heroSection.stat1Number || "150+";
  const stat1Label = heroSection.stat1Label || "Luxury Brands";
  const stat2Number = heroSection.stat2Number || "10K+";
  const stat2Label = heroSection.stat2Label || "Happy Clients";
  const stat3Number = heroSection.stat3Number || "4.9★";
  const stat3Label = heroSection.stat3Label || "Customer Rating";

  // About Section
  const aboutBadge = aboutSection.badge || "Crafted With Care";
  const aboutTitle = aboutSection.title || "The subtle art of";
  const aboutHighlight = aboutSection.highlight || "making them feel special.";
  const aboutDescription = aboutSection.description ||
    "We believe that the unboxing experience is just as important as the gift itself. Every detail, from the textured ribbon to the weight of the cardstock, is meticulously chosen to exude elegance.";
  const aboutImage = aboutSection.image ||
    "https://m.media-amazon.com/images/I/910JoLxRjoL._AC_UF894,1000_QL80_.jpg";

  // Gifts Section
  const giftsBadge = giftsSection.badge || "Our Masterpieces";
  const giftsTitle = giftsSection.title || "Curated";
  const giftsHighlight = giftsSection.highlight || "Collection";

  // Default gifts
  const defaultGifts = [
    {
      id: 1,
      title: "Luxury Chocolate Hamper",
      price: "₹3499",
      desc: "A curated box of artisanal luxury chocolates with gold foil detailing.",
      image: "https://chocolove.in/cdn/shop/files/Nutlover_gifthamoer.jpg?v=1725903118",
    },
    {
      id: 2,
      title: "Botanical Home Fragrance",
      price: "₹2899",
      desc: "Hand-poured artisan candles infused with lavender and rose petals.",
      image: "https://auradecor.co.in/cdn/shop/files/117.jpg?v=1780648378",
    },
    {
      id: 3,
      title: "Signature Desk Accessories",
      price: "₹5999",
      desc: "Premium leather-bound diary and weighted fountain pen set.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJz6EvtFtxNOpoKsCEpcMps8COx4LhBfIgCNfT_J_wEfCxSMXrDHdGAHY9&s=10",
    },
    {
      id: 4,
      title: "Crystal Wellness Kit",
      price: "₹4299",
      desc: "Himalayan bath salts, amethyst rollers, and organic essential oils.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GIOe0kEPkEVdnb_G0WyshfLRgYuSvqnOBdnP4ma5YPTS22CYGTgpk4o&s=10",
    },
  ];

  const gifts = safeParseArray(giftsSection?.gifts, defaultGifts);

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Testimonials";
  const testimonialsTitle = testimonialsSection.title || "Loved by";
  const testimonialsHighlight = testimonialsSection.highlight || "Clients";

  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      designation: "HR Director, TechFlow",
      quote: "Using GIFTIFY completely transformed our holiday gifting process. The presentation is simply breathtaking.",
    },
    {
      id: 2,
      name: "David Chen",
      designation: "CEO, InnovateX",
      quote: "The easiest platform we've used for corporate rewards. The quality and aesthetics of the gifts are unmatched.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      designation: "Operations, Sphere",
      quote: "When the thank you notes came in, we really got to see our ROI in a deeper, warm, and fuzzy feeling way.",
    },
  ];

  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // FAQ Section
  const faqBadge = faqSection.badge || "FAQs";
  const faqTitle = faqSection.title || "Your";
  const faqHighlight = faqSection.highlight || "Questions";

  const defaultFaqs = [
    {
      question: "How do I start sending premium gifts?",
      answer: "Simply create a concierge account, choose a curated collection or set a budget, and send VIP links to your recipients. They choose their preferred luxury gift and enter their details securely.",
    },
    {
      question: "Can I customize the gifts with our brand?",
      answer: "Absolutely. We offer bespoke branding options including subtle debossed logos on leather goods, premium ribboning, and custom thick-stock insert cards.",
    },
    {
      question: "Do you offer international white-glove shipping?",
      answer: "Yes, we support premium tracked shipping to over 150 countries. Our global logistics ensure your gifts arrive in pristine condition.",
    },
    {
      question: "What happens if a recipient doesn't claim their gift?",
      answer: "You only pay for gifts that are claimed. Unclaimed budgets are elegantly credited back to your account effortlessly.",
    },
  ];

  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Footer Section
  const footerCompanyName = footerSection.companyName || "GIFTIFY";
  const footerLogo = footerSection.logo || "https://bitbusters.netlify.app/logo.png";
  const footerDescription = footerSection.description ||
    "Elevating corporate relationships through the power of exceptional, unforgettable gifting.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerContactLabel = footerSection.contactLabel || "Contact";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} GIFTIFY. All rights reserved.`;

  // Contact Info
  const phone = contactInfo.phone || "+1 (800) LUX-GIFT";
  const email = contactInfo.email || "vip@giftify.com";
  const address = contactInfo.address || "5th Avenue, New York, NY";
  const whatsappNumber = contactInfo.whatsapp || "1234567890";

  // Social Links
  const instagram = socialLinks.instagram || "#";
  const facebook = socialLinks.facebook || "#";
  const linkedin = socialLinks.linkedin || "#";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimIndex, setTestimIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
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

      <div className="relative min-h-screen bg-[#FFF9F4] text-[#2F2B28] font-sans overflow-x-hidden selection:bg-[#FFD9E2] selection:text-[#2F2B28]">
        
        {/* Ambient Lighting */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="bg-noise absolute inset-0 z-50"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#FFD9E2] rounded-full mix-blend-multiply blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[30%] right-[-10%] w-[900px] h-[900px] bg-[#F5EEFF] rounded-full mix-blend-multiply blur-[150px] opacity-50" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-[#FF7A45] rounded-full mix-blend-multiply blur-[150px] opacity-20" />
        </div>

        {/* Floating Actions */}
        <a href={`https://wa.me/${whatsappClean.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${companyName}, I'd like to inquire about corporate gifting.`)}`} target="_blank" rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group">
          <FaWhatsapp className="text-3xl" />
        </a>

        {showBackToTop && (
          <button onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-white/40 backdrop-blur-xl border border-white/50 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-[#FF7A45] group">
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl bg-white/40 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.05)] px-2 py-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer group gap-3 " onClick={() => scrollToSection("home")}>
              {companyLogo && (
                <Image
                  src={companyLogo}
                  alt={companyName}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  unoptimized
                />
              )}
              <span className="text-2xl font-serif font-medium tracking-tight">
                <span className="text-[#FF7A45]">{companyName.charAt(0)}</span>{companyName.slice(1)}
              </span>
            </div>

            <div className="hidden md:flex space-x-10 items-center">
              {["Home", "About", "Gifts", "Testimonials", "FAQs"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#676767] hover:text-[#FF7A45] font-sans font-medium text-sm tracking-widest uppercase transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF7A45] to-[#FFD9E2] group-hover:w-full transition-all duration-500 ease-out" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href={`https://wa.me/${whatsappClean}`} className="p-2.5 bg-white/50 rounded-full hover:bg-white transition-colors border border-white/50 text-[#FF7A45] shadow-sm hover:shadow-md hover:scale-105">
                <MessageCircle size={18} />
              </a>
              <a href={`mailto:${email}`} className="p-2.5 bg-white/50 rounded-full hover:bg-white transition-colors border border-white/50 text-[#FF7A45] shadow-sm hover:shadow-md hover:scale-105">
                <Mail size={18} />
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#2F2B28] p-2 bg-white/50 rounded-full border border-white/50">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-20 left-0 w-full bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 p-0'}`}>
             <div className="flex flex-col space-y-4">
              {["Home", "About", "Gifts", "Testimonials", "FAQs"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left text-lg font-serif font-medium text-[#2F2B28] hover:text-[#FF7A45]">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          
          {/* Hero Section */}
          <section id="home" className="relative flex items-center overflow-hidden pt-28">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#FFD9E2]/40 blur-[140px]" />
              <div className="absolute top-20 right-0 w-[500px] h-[420px] rounded-full bg-[#FFB38A]/25 blur-[180px]" />
              <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#E8D8FF]/40 blur-[180px]" />
            </div>

            <div className="absolute top-[12%] left-[80%] md:top-[16%] md:left-[33%] text-4xl animate-float-slow opacity-70 -rotate-15">
              🎁
            </div>
            <div className="absolute top-[16%] left-[5%] md:top-[38%] md:left-[1.5%] text-5xl animate-float-medium opacity-80 text-[#FF7A45] rotate-10">
              ✨
            </div>
            <div className="absolute top-[65%] right-[12%] w-16 h-16 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl flex items-center justify-center animate-float-slow">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
            </div>

            <div className="relative max-w-[1500px] mx-auto w-full px-8 lg:px-16 xl:px-24">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  
                  <h1 className="font-serif text-[#2F2B28] font-semibold leading-[1.02] text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl">
                    {heroTitle}
                    <br />
                    <span className="italic font-light bg-gradient-to-r from-[#FF7A45] to-[#FFAA80] text-transparent bg-clip-text">
                      {heroHighlight}
                    </span>
                  </h1>

                  <p className="mt-8 text-[#676767] text-lg md:text-xl leading-7 max-w-xl mx-auto lg:mx-0">
                    {heroDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 mt-6 justify-center lg:justify-start">
                    <button
                      onClick={() => scrollToSection("gifts")}
                      className="group relative overflow-hidden rounded-full px-20 py-5 md:py-3 bg-gradient-to-r from-[#FF7A45] via-[#FF9568] to-[#FFB38A] text-white font-semibold shadow-[0_20px_60px_rgba(255,122,69,.35)] hover:scale-105 hover:-translate-y-1 duration-500 flex justify-center"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {heroButtonText}
                        <ChevronRight size={18} className="group-hover:translate-x-1 duration-300" />
                      </span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 bg-gradient-to-r from-[#FFB38A] to-[#FF7A45]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-8 mt-16 md:mt-10 max-w-lg mx-auto lg:mx-0">
                    <div>
                      <h3 className="text-3xl font-bold text-[#2F2B28]">{stat1Number}</h3>
                      <p className="text-[#676767] mt-2">{stat1Label}</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#2F2B28]">{stat2Number}</h3>
                      <p className="text-[#676767] mt-2">{stat2Label}</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#2F2B28]">{stat3Number}</h3>
                      <p className="text-[#676767] mt-2">{stat3Label}</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[700px]">
                    <div className="absolute -inset-6 rounded-[48px] blur-3xl opacity-70 group-hover:opacity-100 duration-700" />
                    <div className="relative rounded-[40px] bg-white/30 backdrop-blur-2xl border border-white/50 p-3 overflow-hidden">
                      <img
                        src={heroImage}
                        alt="Luxury Gift"
                        className="w-full h-[350px] xl:h-[500px] object-cover rounded-[30px] group-hover:scale-105 duration-700"
                      />
                      <div className="absolute top-8 right-8 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 px-5 py-2">
                        <span className="text-white font-semibold">{heroPriceLabel}</span>
                      </div>
                      <div className="absolute left-5 right-5 bottom-5 rounded-[28px] bg-white/18 backdrop-blur-sm border border-white/30 py-3 mx-auto flex justify-center">
                        <p className="text-white mx-auto text-2xl font-serif font-semibold">{heroBottomText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full h-12 bg-gradient-to-b from-transparent to-white/40 backdrop-blur-sm"></div>

          {/* About Section */}
          <section id="about" className="py-22 px-6 sm:px-12 lg:px-24 bg-white/60 backdrop-blur-2xl border-y border-white/50 relative overflow-hidden">
            <div className="absolute -left-32 top-0 w-[500px] h-[400px] bg-[#F5EEFF] rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
              <div className="order-2 lg:order-1 lg:w-1/2 relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A45]/10 to-transparent rounded-[32px] transform -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-700"></div>
                <Image
                  src={aboutImage}
                  alt="Luxury Packaging"
                  width={800}
                  height={900}
                  unoptimized
                  className="w-full h-[260px] sm:h-[340px] lg:h-auto object-cover rounded-[32px] shadow-2xl border-4 border-white/60 relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              <div className="order-1 lg:order-2 lg:w-1/2 flex flex-col space-y-8 text-center lg:text-left">
                <div className="inline-block border-b border-[#FF7A45] pb-2 self-center lg:self-start">
                  <h4 className="text-[#FF7A45] font-sans font-medium tracking-widest uppercase text-sm">{aboutBadge}</h4>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#2F2B28] leading-[1.2]">
                  {aboutTitle}
                  <br />
                  <span className="font-medium italic">{aboutHighlight}</span>
                </h2>

                <p className="text-[#676767] text-lg leading-relaxed font-light font-sans">
                  {aboutDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Gifts Section */}
          <section id="gifts" className="py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-white/60 to-[#F5EEFF]/40 relative">
            <div className="max-w-[85rem] mx-auto relative z-10">
              <div className="text-center mb-24">
                <h4 className="text-[#FF7A45] font-sans font-medium tracking-widest uppercase text-sm mb-4">{giftsBadge}</h4>
                <h2 className="text-5xl md:text-6xl font-serif font-light text-[#2F2B28]">{giftsTitle} <span className="italic font-medium">{giftsHighlight}</span></h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-5">
                {gifts.map((gift: any) => (
                  <div key={gift.id} className="group relative rounded-[32px] overflow-hidden h-[300px] md:h-[350px] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-700 hover:-translate-y-1 bg-white">
                    <img src={gift.image} alt={gift.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-1000 ease-out" />
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-xl border border-white/40 text-white font-sans text-sm md:text-md md:font-medium px-3 py-1 rounded-full shadow-lg z-20 group-hover:bg-white/30 transition-colors">
                      {gift.price}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-10" />
                    <div className="absolute -bottom-8 left-2 right-2 p-5 z-20 rounded-3xl transform translate-y-7 group-hover:-translate-y-10 transition-transform duration-500 ease-out group-hover:bg-white/10 group-hover:backdrop-blur-sm">
                      <h3 className="text-white text-lg md:text-2xl font-serif md:font-medium mb-3 relative inline-block">
                        {gift.title}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 delay-100"></span>
                      </h3>
                      <p className="text-white/80 font-sans font-light text-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {gift.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-32 px-6 sm:px-12 lg:px-24 bg-white/80 backdrop-blur-3xl border-t border-white/60">
            <div className="max-w-[85rem] mx-auto">
              <div className="flex flex-row md:flex-row justify-between items-start mb-15 gap-8">
                <div>
                  <h4 className="text-[#FF7A45] font-sans font-medium tracking-widest uppercase text-sm mb-4">{testimonialsBadge}</h4>
                  <h2 className="text-5xl md:text-6xl font-serif font-light text-[#2F2B28]">{testimonialsTitle} <span className="italic font-medium">{testimonialsHighlight}</span></h2>
                </div>
                <div className="flex space-x-4">
                  <button onClick={prevTestimonial} className="p-4 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200 text-[#2F2B28] hover:border-[#FF7A45] hover:text-[#FF7A45] hover:shadow-lg transition-all hover:scale-110">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextTestimonial} className="p-4 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200 text-[#2F2B28] hover:border-[#FF7A45] hover:text-[#FF7A45] hover:shadow-lg transition-all hover:scale-110">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleTestimonials.map((testimonial: any, idx: number) => (
                  <div key={`${testimonial.id}-${idx}`} className="group bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-[#FFD9E2] to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                    <Quote className="text-[#FF7A45]/20 w-12 h-12 mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                    <p className="text-[#2F2B28] font-serif text-xl italic leading-relaxed mb-5 flex-grow relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-4 border-t border-gray-100/50 pt-6 relative z-10">
                      <div>
                        <h4 className="font-sans font-medium text-[#2F2B28]">{testimonial.name}</h4>
                        <p className="text-[#676767] font-sans text-sm font-light">{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className="py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#FFD9E2]/20 to-white/60 relative">
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-serif font-light text-[#2F2B28]">{faqTitle} <span className="italic font-medium">{faqHighlight}</span></h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq: any, index: number) => (
                  <div key={index} className={`bg-white/50 backdrop-blur-2xl rounded-[32px] overflow-hidden transition-all duration-500 ${openFaq === index ? 'shadow-[0_20px_50px_rgba(255,122,69,0.08)] border border-[#FF7A45]/30' : 'shadow-sm border border-white/60 hover:shadow-md'}`}>
                    <button className="w-full flex justify-between items-center py-3 px-4 text-left focus:outline-none group" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      <span className={`text-lg md:text-xl font-serif transition-colors duration-300 ${openFaq === index ? 'text-[#FF7A45] font-medium' : 'text-[#2F2B28]'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${openFaq === index ? 'bg-[#FF7A45] border-[#FF7A45] text-white rotate-180' : 'bg-transparent border-[#2F2B28]/20 text-[#2F2B28] group-hover:border-[#FF7A45] group-hover:text-[#FF7A45] group-hover:rotate-90'}`}>
                        {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-60 pb-8 opacity-100 blur-none' : 'max-h-0 opacity-0 blur-sm'}`}>
                      <p className="text-[#676767] font-sans font-light text-lg leading-relaxed border-t border-gray-100/50 pt-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-white pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-gray-100 relative z-10">
          <div className="max-w-[85rem] mx-auto flex flex-col md:flex-row justify-between gap-20">
            <div className="md:w-1/3 flex flex-col items-start">
              <div className="flex items-center cursor-pointer mb-8 gap-3" onClick={() => scrollToSection("home")}>
                {footerLogo && (
                  <Image
                    src={footerLogo}
                    alt={footerCompanyName}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-contain"
                    unoptimized
                  />
                )}
                <span className="text-3xl font-serif font-medium tracking-tight">
                  <span className="text-[#FF7A45]">{footerCompanyName.charAt(0)}</span>{footerCompanyName.slice(1)}
                </span>
              </div>
              <p className="text-[#676767] font-sans font-light text-lg mb-8 leading-relaxed">
                {footerDescription}
              </p>
            </div>

            <div className="md:w-2/3 flex flex-col sm:flex-row gap-16 justify-end">
              <div className="sm:w-1/3">
                <h4 className="text-[#2F2B28] font-serif text-xl mb-8">{footerQuickLinksLabel}</h4>
                <ul className="space-y-4">
                  {["Home", "About", "Gifts", "Testimonials", "FAQs"].map((link) => (
                    <li key={link}>
                      <button onClick={() => scrollToSection(link.toLowerCase())} className="text-[#676767] hover:text-[#FF7A45] font-sans font-light transition-all relative group inline-block">
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF7A45] group-hover:w-full transition-all duration-300"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:w-1/2">
                <h4 className="text-[#2F2B28] font-serif text-xl mb-8">{footerContactLabel}</h4>
                <ul className="space-y-6">
                  <li>
                    <a href={`mailto:${email}`} className="flex items-center text-[#676767] hover:text-[#FF7A45] transition-colors font-sans font-light group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 group-hover:border border-[#FFD9E2]-3 transition-colors">
                        <Mail size={16} className="text-[#2F2B28] group-hover:text-[#FF7A45]" />
                      </div>
                      {email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${phone}`} className="flex items-center text-[#676767] hover:text-[#FF7A45] transition-colors font-sans font-light group">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 group-hover:border border-[#FFD9E2]-3 transition-colors">
                        <Phone size={16} className="text-[#2F2B28] group-hover:text-[#FF7A45]" />
                      </div>
                      {phone}
                    </a>
                  </li>
                  <li className="flex items-center text-[#676767] font-sans font-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <MapPin size={16} className="text-[#2F2B28]" />
                    </div>
                    {address}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-[85rem] mx-auto mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center text-[#676767] font-sans font-light text-sm">
            <p>{footerCopyright}</p>
          </div>  
        </footer>

      </div>
    </>
  );
}