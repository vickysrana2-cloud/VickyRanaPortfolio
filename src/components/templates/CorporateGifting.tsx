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
  ArrowUpRight,
  Star,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

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
          if (parts.length >= 2) {
            return { title: parts[0] || "", description: parts[1] || "" };
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CorporateGiftingTemplate1({ data }: { data: any }) {
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const giftsSection = data?.giftsSection || {};
  const processSection = data?.processSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const contactInfo = data?.contactInfo || {};

  // Basic info
  const companyName = basicInfo.companyName || "MERIDIAN";
  const companyLogo = basicInfo.logo || "";
  const companyTagline = basicInfo.tagline || "Corporate Gifting, Perfected";

  // Hero
  const heroTitle = heroSection.title || "Gifting that reflects";
  const heroHighlight = heroSection.highlight || "how you do business.";
  const heroDescription =
    heroSection.description ||
    "We plan, source and deliver client and employee gifting for companies who can't afford a generic hamper — with approvals, branding and delivery tracking handled in one place.";
  const heroButtonText = heroSection.buttonText || "Browse the Catalog";
  const heroImage =
    heroSection.image ||
    "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1400&auto=format&fit=crop";
  const heroPriceLabel = heroSection.priceLabel || "From \u20B9999";
  const heroBottomText = heroSection.bottomText || "Curated Corporate Gifts";

  const stat1Number = heroSection.stat1Number || "150+";
  const stat1Label = heroSection.stat1Label || "Brand Partners";
  const stat2Number = heroSection.stat2Number || "10K+";
  const stat2Label = heroSection.stat2Label || "Recipients Gifted";
  const stat3Number = heroSection.stat3Number || "4.9\u2605";
  const stat3Label = heroSection.stat3Label || "Client Rating";

  // About
  const aboutBadge = aboutSection.badge || "Why Teams Switch to Us";
  const aboutTitle = aboutSection.title || "Gifting is a reflection of";
  const aboutHighlight = aboutSection.highlight || "how you treat people.";
  const aboutDescription =
    aboutSection.description ||
    "Most gifting platforms optimise for a checkout page. We built ours around a procurement team's actual week — approvals, GST-compliant invoicing, staggered delivery windows and a single point of contact who already knows your account.";
  const aboutImage =
    aboutSection.image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

  // Gifts
  const giftsBadge = giftsSection.badge || "The Collection";
  const giftsTitle = giftsSection.title || "Curated";
  const giftsHighlight = giftsSection.highlight || "Corporate Collection";

  const defaultGifts = [
    {
      id: 1,
      title: "Client Welcome Set",
      price: "\u20B93,499",
      desc: "A first-impression box for new accounts — notebook, pen and a handwritten note card.",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Festive Hamper",
      price: "\u20B92,899",
      desc: "Seasonal hamper of regional snacks and sweets, packed for bulk dispatch.",
      image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Desk Essentials",
      price: "\u20B95,999",
      desc: "Leather-bound planner, fountain pen and a weighted brass paperweight.",
      image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Wellness Box",
      price: "\u20B94,299",
      desc: "Bath salts, a ceramic diffuser and unscented candle for a genuine reset.",
      image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=900&auto=format&fit=crop",
    },
  ];

  const gifts = safeParseArray(giftsSection?.gifts, defaultGifts);

  // Process
  const processBadge = processSection.badge || "How It Works";
  const processTitle = processSection.title || "From decision to";
  const processHighlight = processSection.highlight || "doorstep.";
  const defaultSteps = [
    { title: "Set a collection or budget", description: "Choose a curated set, or give recipients a spending limit to choose within." },
    { title: "Share secure gift links", description: "Recipients get a private link — no spreadsheets, no manual address collection." },
    { title: "They select and confirm", description: "Each person picks their gift and confirms delivery themselves." },
    { title: "You track delivery", description: "One dashboard shows dispatch and delivery in real time." },
  ];
  const steps = safeParseSteps(processSection?.steps, defaultSteps);

  // Testimonials
  const testimonialsBadge = testimonialsSection.badge || "Testimonials";
  const testimonialsTitle = testimonialsSection.title || "Loved by";
  const testimonialsHighlight = testimonialsSection.highlight || "Procurement Teams";

  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      designation: "HR Director, TechFlow",
      quote: "Our holiday gifting used to take three people two weeks. It now takes one person an afternoon, and the unboxing is better than what we designed ourselves.",
    },
    {
      id: 2,
      name: "David Chen",
      designation: "CEO, InnovateX",
      quote: "The reporting alone justified the switch — we finally know which gifts actually got claimed, and finance gets one clean invoice.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      designation: "Operations Lead, Sphere",
      quote: "Delivery tracking across six offices used to be our biggest headache. It isn't anymore.",
    },
  ];

  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // FAQ
  const faqBadge = faqSection.badge || "FAQs";
  const faqTitle = faqSection.title || "Your";
  const faqHighlight = faqSection.highlight || "Questions";

  const defaultFaqs = [
    {
      question: "How do we start sending gifts?",
      answer: "Set up a corporate account, choose a collection or set a per-recipient budget, then send secure gift links. Recipients pick their own gift and enter their delivery address directly.",
    },
    {
      question: "Can gifts carry our branding?",
      answer: "Yes. We offer debossed logos on leather and wood items, custom ribboning, and printed insert cards, reviewed with you before production.",
    },
    {
      question: "Do you ship outside major cities?",
      answer: "We deliver pan-India, including tier-2 and tier-3 addresses, with tracked dispatch and delivery confirmation on every order.",
    },
    {
      question: "What happens to unclaimed gifts?",
      answer: "You're only invoiced for gifts that are claimed within the redemption window. Unclaimed budget is credited back automatically.",
    },
  ];

  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Footer
  const footerCompanyName = footerSection.companyName || companyName;
  const footerLogo = footerSection.logo || companyLogo;
  const footerDescription =
    footerSection.description ||
    "Corporate gifting for companies that treat client and employee relationships as worth getting right.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerContactLabel = footerSection.contactLabel || "Contact";
  const footerCopyright =
    footerSection.copyright || `\u00A9 ${new Date().getFullYear()} ${footerCompanyName}. All rights reserved.`;

  // Contact
  const phone = contactInfo.phone || "+91 98765 43210";
  const email = contactInfo.email || "hello@meridiangifting.com";
  const address = contactInfo.address || "Baner Road, Pune, Maharashtra";
  const whatsappNumber = contactInfo.whatsapp || "919876543210";

  // Social
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

  const visibleTestimonials =
    testimonials.length >= 3
      ? [
          testimonials[testimIndex],
          testimonials[(testimIndex + 1) % testimonials.length],
          testimonials[(testimIndex + 2) % testimonials.length],
        ]
      : testimonials;

  const whatsappClean = String(whatsappNumber).replace(/\s/g, "");
  const navItems = ["Home", "About", "Gifts", "Process", "Testimonials", "FAQs"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,440;0,9..144,560;1,9..144,440&display=swap');
        .font-serif { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-sans { font-family: 'Inter', sans-serif; }

        @keyframes float-slow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(4deg); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-3deg); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.02;
          pointer-events: none;
        }
      `}</style>

      <div className="relative min-h-screen bg-[#FAF7F1] text-[#23262B] font-sans overflow-x-hidden selection:bg-[#EAD9B4] selection:text-[#23262B]">
        {/* Ambient Lighting */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="bg-noise absolute inset-0 z-50"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#EAD9B4] rounded-full mix-blend-multiply blur-[130px] opacity-40" />
          <div className="absolute top-[30%] right-[-10%] w-[900px] h-[900px] bg-[#E4E8F0] rounded-full mix-blend-multiply blur-[160px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-[#C9973B] rounded-full mix-blend-multiply blur-[160px] opacity-10" />
        </div>

        {/* Floating WhatsApp Button */}
        {whatsappClean && (
          <a
            href={`https://wa.me/${whatsappClean.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Hello ${companyName}, I'd like to inquire about corporate gifting.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        )}

        {showBackToTop && (
          <button
            onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-white/40 backdrop-blur-xl border border-white/50 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-[#C9973B] group"
          >
            <ArrowUp size={22} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}

        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl bg-white/50 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(31,38,60,0.06)] px-2 py-2 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer group gap-3" onClick={() => scrollToSection("home")}>
              {companyLogo ? (
                <Image src={companyLogo} alt={companyName} width={40} height={40} className="w-10 h-10 object-contain rounded-full" unoptimized />
              ) : (
                <span className="w-10 h-10 rounded-full bg-[#1C2430] text-white flex items-center justify-center font-serif text-lg">
                  {companyName.charAt(0)}
                </span>
              )}
              <span className="text-2xl font-serif font-medium tracking-tight">
                <span className="text-[#C9973B]">{companyName.charAt(0)}</span>
                {companyName.slice(1)}
              </span>
            </div>

            <div className="hidden md:flex space-x-9 items-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#5C6470] hover:text-[#C9973B] font-sans font-medium text-sm tracking-widest uppercase transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-[#C9973B] to-[#EAD9B4] group-hover:w-full transition-all duration-500 ease-out" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`https://wa.me/${whatsappClean}`}
                className="p-2.5 bg-white/60 rounded-full hover:bg-white transition-colors border border-white/50 text-[#C9973B] shadow-sm hover:shadow-md hover:scale-105"
              >
                <MessageCircle size={18} />
              </a>
              <button
                onClick={() => scrollToSection("gifts")}
                className="inline-flex items-center gap-1.5 bg-[#1C2430] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#C9973B] transition-colors"
              >
                Get a Quote
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#23262B] p-2 bg-white/50 rounded-full border border-white/50">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-20 left-0 w-full bg-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? "max-h-[28rem] opacity-100 p-6" : "max-h-0 opacity-0 p-0"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-lg font-serif font-medium text-[#23262B] hover:text-[#C9973B]"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("gifts")}
                className="mt-2 inline-flex items-center justify-center gap-1.5 bg-[#1C2430] text-white text-sm font-medium px-6 py-3 rounded-full"
              >
                Get a Quote
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="relative flex items-center overflow-hidden pt-32 lg:pt-28">
            <div className="absolute top-[64%] right-[10%] w-16 h-16 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl flex items-center justify-center animate-float-slow">
              <Star className="w-6 h-6 text-[#C9973B] fill-[#C9973B]" />
            </div>
            <div className="absolute top-[18%] left-[4%] hidden md:flex w-14 h-14 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl items-center justify-center animate-float-medium">
              <Sparkles className="w-6 h-6 text-[#C9973B]" />
            </div>

            <div className="relative max-w-[1500px] mx-auto w-full px-8 lg:px-16 xl:px-24">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-white/50 rounded-full px-4 py-1.5 mb-8 text-sm text-[#5C6470]">
                    <Sparkles size={14} className="text-[#C9973B]" />
                    Corporate gifting, managed end to end
                  </div>

                  <h1 className="font-serif text-[#23262B] font-semibold leading-[1.05] text-5xl md:text-6xl xl:text-7xl">
                    {heroTitle}
                    <br />
                    <span className="italic font-light bg-gradient-to-r from-[#C9973B] to-[#E4BE7C] text-transparent bg-clip-text">
                      {heroHighlight}
                    </span>
                  </h1>

                  <p className="mt-8 text-[#5C6470] text-lg md:text-xl leading-7 max-w-xl mx-auto lg:mx-0">
                    {heroDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
                    <button
                      onClick={() => scrollToSection("gifts")}
                      className="group relative overflow-hidden rounded-full px-12 py-4 bg-gradient-to-r from-[#1C2430] via-[#232C3A] to-[#3A4250] text-white font-semibold shadow-[0_20px_60px_rgba(28,36,48,.28)] hover:scale-105 hover:-translate-y-1 duration-500 flex justify-center"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {heroButtonText}
                        <ChevronRight size={18} className="group-hover:translate-x-1 duration-300" />
                      </span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 bg-gradient-to-r from-[#C9973B] to-[#E4BE7C]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-8 mt-16 md:mt-14 max-w-lg mx-auto lg:mx-0">
                    <div>
                      <h3 className="text-3xl font-bold text-[#23262B]">{stat1Number}</h3>
                      <p className="text-[#5C6470] mt-2 text-sm">{stat1Label}</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#23262B]">{stat2Number}</h3>
                      <p className="text-[#5C6470] mt-2 text-sm">{stat2Label}</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#23262B]">{stat3Number}</h3>
                      <p className="text-[#5C6470] mt-2 text-sm">{stat3Label}</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                  <div className="group relative w-full max-w-[700px]">
                    <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-tr from-[#EAD9B4]/60 to-[#E4E8F0]/60 blur-3xl opacity-70 group-hover:opacity-100 duration-700" />
                    <div className="relative rounded-[40px] bg-white/30 backdrop-blur-2xl border border-white/50 p-3 overflow-hidden">
                      <img
                        src={heroImage}
                        alt="Curated corporate gift"
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
            <div className="absolute -left-32 top-0 w-[500px] h-[400px] bg-[#E4E8F0] rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

            <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
              <div className="order-2 lg:order-1 lg:w-1/2 relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C9973B]/10 to-transparent rounded-[32px] transform -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-700"></div>
                <Image
                  src={aboutImage}
                  alt="Corporate gifting, prepared"
                  width={800}
                  height={900}
                  unoptimized
                  className="w-full h-[260px] sm:h-[340px] lg:h-auto object-cover rounded-[32px] shadow-2xl border-4 border-white/60 relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              <div className="order-1 lg:order-2 lg:w-1/2 flex flex-col space-y-8 text-center lg:text-left">
                <div className="inline-block border-b border-[#C9973B] pb-2 self-center lg:self-start">
                  <h4 className="text-[#C9973B] font-sans font-medium tracking-widest uppercase text-sm">{aboutBadge}</h4>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#23262B] leading-[1.2]">
                  {aboutTitle}
                  <br />
                  <span className="font-medium italic">{aboutHighlight}</span>
                </h2>

                <p className="text-[#5C6470] text-lg leading-relaxed font-light font-sans">{aboutDescription}</p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {["Dedicated account manager", "GST-ready invoicing", "Pan-India delivery"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/60 backdrop-blur-xl border border-white/60 text-[#3A4250] text-sm px-4 py-2 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gifts Section */}
          <section id="gifts" className="py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-white/60 to-[#E4E8F0]/40 relative">
            <div className="max-w-[85rem] mx-auto relative z-10">
              <div className="text-center mb-24">
                <h4 className="text-[#C9973B] font-sans font-medium tracking-widest uppercase text-sm mb-4">{giftsBadge}</h4>
                <h2 className="text-5xl md:text-6xl font-serif font-light text-[#23262B]">
                  {giftsTitle} <span className="italic font-medium">{giftsHighlight}</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-5">
                {gifts.map((gift: any) => (
                  <div
                    key={gift.id}
                    className="group relative rounded-[32px] overflow-hidden h-[300px] md:h-[350px] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-700 hover:-translate-y-1 bg-white"
                  >
                    <img src={gift.image} alt={gift.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-1000 ease-out" />
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-xl border border-white/40 text-white font-sans text-sm md:font-medium px-3 py-1 rounded-full shadow-lg z-20 group-hover:bg-white/30 transition-colors">
                      {gift.price}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 z-10" />
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

          {/* Process Section */}
          <section id="process" className="py-32 px-6 sm:px-12 lg:px-24 relative">
            <div className="max-w-[85rem] mx-auto relative z-10">
              <div className="text-center mb-20">
                <h4 className="text-[#C9973B] font-sans font-medium tracking-widest uppercase text-sm mb-4">{processBadge}</h4>
                <h2 className="text-5xl md:text-6xl font-serif font-light text-[#23262B]">
                  {processTitle} <span className="italic font-medium">{processHighlight}</span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[28px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-500"
                  >
                    <span className="font-serif text-3xl text-[#C9973B]">{String(idx + 1).padStart(2, "0")}</span>
                    <p className="font-serif text-lg mt-5 text-[#23262B]">{step.title}</p>
                    <p className="text-sm text-[#5C6470] mt-2 leading-relaxed font-light">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-32 px-6 sm:px-12 lg:px-24 bg-white/80 backdrop-blur-3xl border-t border-white/60">
            <div className="max-w-[85rem] mx-auto">
              <div className="flex flex-row justify-between items-start mb-15 gap-8">
                <div>
                  <h4 className="text-[#C9973B] font-sans font-medium tracking-widest uppercase text-sm mb-4">{testimonialsBadge}</h4>
                  <h2 className="text-5xl md:text-6xl font-serif font-light text-[#23262B]">
                    {testimonialsTitle} <span className="italic font-medium">{testimonialsHighlight}</span>
                  </h2>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-4 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200 text-[#23262B] hover:border-[#C9973B] hover:text-[#C9973B] hover:shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-4 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200 text-[#23262B] hover:border-[#C9973B] hover:text-[#C9973B] hover:shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleTestimonials.map((testimonial: any, idx: number) => (
                  <div
                    key={`${testimonial.id}-${idx}`}
                    className="group bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
                  >
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-[#EAD9B4] to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                    <Quote className="text-[#C9973B]/30 w-12 h-12 mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                    <p className="text-[#23262B] font-serif text-xl italic leading-relaxed mb-5 flex-grow relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-4 border-t border-gray-100/50 pt-6 relative z-10">
                      <div>
                        <h4 className="font-sans font-medium text-[#23262B]">{testimonial.name}</h4>
                        <p className="text-[#5C6470] font-sans text-sm font-light">{testimonial.designation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className="py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#EAD9B4]/20 to-white/60 relative">
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-20">
                <h4 className="text-[#C9973B] font-sans font-medium tracking-widest uppercase text-sm mb-4">{faqBadge}</h4>
                <h2 className="text-5xl md:text-6xl font-serif font-light text-[#23262B]">
                  {faqTitle} <span className="italic font-medium">{faqHighlight}</span>
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-white/50 backdrop-blur-2xl rounded-[32px] overflow-hidden transition-all duration-500 ${
                      openFaq === index ? "shadow-[0_20px_50px_rgba(201,151,59,0.10)] border border-[#C9973B]/30" : "shadow-sm border border-white/60 hover:shadow-md"
                    }`}
                  >
                    <button className="w-full flex justify-between items-center py-3 px-6 text-left focus:outline-none group" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      <span className={`text-lg md:text-xl font-serif transition-colors duration-300 ${openFaq === index ? "text-[#C9973B] font-medium" : "text-[#23262B]"}`}>
                        {faq.question}
                      </span>
                      <div
                        className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          openFaq === index
                            ? "bg-[#C9973B] border-[#C9973B] text-white rotate-180"
                            : "bg-transparent border-[#23262B]/20 text-[#23262B] group-hover:border-[#C9973B] group-hover:text-[#C9973B] group-hover:rotate-90"
                        }`}
                      >
                        {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>
                    <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? "max-h-60 pb-8 opacity-100 blur-none" : "max-h-0 opacity-0 blur-sm"}`}>
                      <p className="text-[#5C6470] font-sans font-light text-lg leading-relaxed border-t border-gray-100/50 pt-6">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="px-6 sm:px-12 lg:px-24 pb-6">
            <div className="max-w-[85rem] mx-auto relative overflow-hidden rounded-[40px] bg-[#1C2430] px-8 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C9973B]/30 rounded-full blur-[100px]"></div>
              <h2 className="text-3xl sm:text-4xl font-serif font-light leading-[1.2] max-w-lg text-center lg:text-left relative z-10">
                Ready to make your next gifting round easier?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1C2430] px-7 py-3.5 text-[15px] font-medium rounded-full hover:bg-[#EAD9B4] transition-colors"
                >
                  Request a Proposal
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-[15px] rounded-full hover:border-white transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-gray-100 relative z-10">
          <div className="max-w-[85rem] mx-auto flex flex-col md:flex-row justify-between gap-20">
            <div className="md:w-1/3 flex flex-col items-start">
              <div className="flex items-center cursor-pointer mb-8 gap-3" onClick={() => scrollToSection("home")}>
                {footerLogo ? (
                  <Image src={footerLogo} alt={footerCompanyName} width={50} height={50} className="w-12 h-12 object-contain rounded-full" unoptimized />
                ) : (
                  <span className="w-12 h-12 rounded-full bg-[#1C2430] text-white flex items-center justify-center font-serif text-xl">
                    {footerCompanyName.charAt(0)}
                  </span>
                )}
                <span className="text-3xl font-serif font-medium tracking-tight">
                  <span className="text-[#C9973B]">{footerCompanyName.charAt(0)}</span>
                  {footerCompanyName.slice(1)}
                </span>
              </div>
              <p className="text-[#5C6470] font-sans font-light text-lg mb-8 leading-relaxed">{footerDescription}</p>
              <div className="flex gap-4">
                {[
                  { href: instagram, label: "Instagram" },
                  { href: facebook, label: "Facebook" },
                  { href: linkedin, label: "LinkedIn" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-xs text-[#5C6470] hover:border-[#C9973B] hover:text-[#C9973B] transition-colors"
                  >
                    {s.label.charAt(0)}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col sm:flex-row gap-16 justify-end">
              <div className="sm:w-1/3">
                <h4 className="text-[#23262B] font-serif text-xl mb-8">{footerQuickLinksLabel}</h4>
                <ul className="space-y-4">
                  {navItems.map((link) => (
                    <li key={link}>
                      <button onClick={() => scrollToSection(link.toLowerCase())} className="text-[#5C6470] hover:text-[#C9973B] font-sans font-light transition-all relative group inline-block">
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9973B] group-hover:w-full transition-all duration-300"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:w-1/2">
                <h4 className="text-[#23262B] font-serif text-xl mb-8">{footerContactLabel}</h4>
                <ul className="space-y-6">
                  <li>
                    <a href={`mailto:${email}`} className="flex items-center text-[#5C6470] hover:text-[#C9973B] transition-colors font-sans font-light group">
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center mr-4 group-hover:border-[#EAD9B4] transition-colors">
                        <Mail size={16} className="text-[#23262B] group-hover:text-[#C9973B]" />
                      </div>
                      {email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${phone}`} className="flex items-center text-[#5C6470] hover:text-[#C9973B] transition-colors font-sans font-light group">
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center mr-4 group-hover:border-[#EAD9B4] transition-colors">
                        <Phone size={16} className="text-[#23262B] group-hover:text-[#C9973B]" />
                      </div>
                      {phone}
                    </a>
                  </li>
                  <li className="flex items-center text-[#5C6470] font-sans font-light">
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center mr-4">
                      <MapPin size={16} className="text-[#23262B]" />
                    </div>
                    {address}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-[85rem] mx-auto mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-2 text-[#5C6470] font-sans font-light text-sm">
            <p>{footerCopyright}</p>
            <span className="hidden md:inline">{"\u2014"}</span>
            <p>{companyTagline}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
