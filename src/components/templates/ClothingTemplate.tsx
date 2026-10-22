'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Scissors, 
  Ruler, 
  Sparkles, 
  PackageCheck, 
  Quote, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star,
  Menu,
  X
} from 'lucide-react';
import { 
  FaInstagram, 
  FaPinterest, 
  FaFacebook, 
  FaXTwitter,
  FaWhatsapp
} from 'react-icons/fa6';
import Image from 'next/image';

// heroSection.images is still a plain dynamic-images list, so it keeps its
// own light parser (accepts a real array, or a comma-separated string).
const safeParseHeroImages = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data.split(",").map((item) => item.trim()).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

// processSection.steps, servicesSection.services, collectionSection.products
// and testimonialsSection.testimonials are all 'card' fields now, so they
// arrive as ready-made arrays of objects — just fall back to defaults if empty.
const withCardFallback = (data: any, defaultData: any[]): any[] =>
  Array.isArray(data) && data.length > 0 ? data : defaultData;

export default function LuminaTailorsSPA({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const servicesSection = data?.servicesSection || {};
  const collectionSection = data?.collectionSection || {};
  const processSection = data?.processSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const contactSection = data?.contactSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};

  // Default values - Basic Info
  const companyName = basicInfo.companyName || "Lumina Tailors";
  const companyLogo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";

  // Hero Section
  const heroBadge = heroSection.badge || "Bespoke Studio • Est. 2026";
  const heroTitle = heroSection.title || "Tailored To";
  const heroHighlight = heroSection.highlight || "Your Perfect Fit.";
  const heroDescription = heroSection.description ||
    "Premium bespoke tailoring crafted with absolute precision, anatomical comfort, and timeless sartorial elegance.";
  const heroButtonText = heroSection.buttonText || "Explore Collection";
  const heroSecondaryButtonText = heroSection.secondaryButtonText || "Order Now";
  const heroStat1Number = heroSection.stat1Number || "100%";
  const heroStat1Label = heroSection.stat1Label || "Handcrafted";
  const heroStat2Number = heroSection.stat2Number || "150+";
  const heroStat2Label = heroSection.stat2Label || "Italian Fabrics";
  const heroStat3Number = heroSection.stat3Number || "0";
  const heroStat3Label = heroSection.stat3Label || "Fitting Errors";

  const defaultHeroImages = [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=800&auto=format&fit=crop"
  ];
  const heroImages = safeParseHeroImages(heroSection?.images, defaultHeroImages);

  // Services Section
  const servicesBadge = servicesSection.badge || "Our Expertise";
  const servicesTitle = servicesSection.title || "Sartorial Excellence";
  const servicesSubtitle = servicesSection.subtitle || "Three distinct tailoring pillars crafted for the modern gentleman.";

  const defaultServices = [
    {
      title: "Bespoke Tailoring",
      desc: "Custom suits crafted precisely to your individual measurements and anatomical silhouette.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Wedding Collection",
      desc: "Elegant, ceremonial attire designed for unforgettable celebrations and timeless photographs.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Casual & Formal Wear",
      desc: "Premium everyday tailoring and office-ready clothing that bridges comfort with authority.",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
    }
  ];
  const services = withCardFallback(servicesSection?.services, defaultServices);

  // Collection Section
  const collectionBadge = collectionSection.badge || "Curated Garments";
  const collectionTitle = collectionSection.title || "Featured Collection";
  const collectionDescription = collectionSection.description ||
    "Select any piece to initiate a direct WhatsApp inquiry. No carts, no checkout algorithms—just direct communication with our studio.";

  const defaultProducts = [
    {
      name: "Premium Navy Blue Bespoke Suit",
      category: "Men's Formal",
      fabric: "Super 150s Italian Wool",
      desc: "A timeless single-breasted navy suit featuring hand-finished lapels and structured shoulders.",
      price: "₹14,999",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Charcoal Grey Executive Tuxedo",
      category: "Ceremonial",
      fabric: "Merino Wool & Silk Blend",
      desc: "Tailored for black-tie affairs with satin peak lapels and precision contouring.",
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Ivory Linen Summer Blazer",
      category: "Casual Smart",
      fabric: "100% Belgian Linen",
      desc: "Lightweight, breathable construction designed for sophisticated warm-weather layering.",
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Royal Emerald Velvet Jacket",
      category: "Wedding Collection",
      fabric: "Cotton-Silk Velvet",
      desc: "Rich jewel-toned evening jacket accented with silk-braided buttons and bespoke lining.",
      price: "₹16,000",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Classic Beige Trench & Suit Combo",
      category: "Outerwear & Suit",
      fabric: "Water-Resistant Gabardine",
      desc: "An architectural approach to seasonal layering with customizable epaulets and belt fit.",
      price: "₹22,000",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Midnight Black Three-Piece Suit",
      category: "Men's Formal",
      fabric: "English Worsted Wool",
      desc: "The ultimate power silhouette complete with a matching V-neck waistcoat and precision trousers.",
      price: "₹19,999",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Houndstooth Heritage Overcoat",
      category: "Winter Wear",
      fabric: "Scottish Tweed",
      desc: "Double-breasted heritage coat featuring deep welt pockets and horn button closures.",
      price: "₹15,500",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Olive Green Double-Breasted Suit",
      category: "Modern Bespoke",
      fabric: "Mohair Wool Blend",
      desc: "A contemporary cut with a wider lapel and tapered trousers for modern creative professionals.",
      price: "₹16,800",
      image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop"
    }
  ];
  const products = withCardFallback(collectionSection?.products, defaultProducts);

  // Process Section
  const processBadge = processSection.badge || "How It Works";
  const processTitle = processSection.title || "The Tailoring Process";

  const defaultProcess = [
    { step: "01", title: "Consultation", desc: "Choose your preferred style, silhouette, and functional requirements with our master stylists." },
    { step: "02", title: "Measurements", desc: "Over 20 precise anatomical measurements are taken to map your posture and unique physique." },
    { step: "03", title: "Tailoring", desc: "Expert artisans cut, canvas, and assemble your garment using traditional hand-stitching techniques." },
    { step: "04", title: "Delivery", desc: "Receive your finished outfit with a final fitting to guarantee absolute comfort and perfection." }
  ];
  const processSteps = withCardFallback(processSection?.steps, defaultProcess);

  // Process Icons (Hardcoded, cycled through)
  const processIcons = [Sparkles, Ruler, Scissors, PackageCheck];

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Patron Words";
  const testimonialsTitle = testimonialsSection.title || "Client Testimonials";

  const defaultTestimonials = [
    { quote: "Amazing craftsmanship. The fabric falls effortlessly and the posture correction in the cut is remarkable.", author: "Rahul Mehta", role: "Business Owner", rating: 5 },
    { quote: "I ordered my three-piece wedding suit through WhatsApp. The team guided me on measurements and delivered ahead of schedule.", author: "Vikramaditya Singhania", role: "Architect", rating: 5 },
    { quote: "The finest tailoring experience I have encountered. No unnecessary fittings—just pure precision and timeless elegance.", author: "Arjun Kapoor", role: "Creative Director", rating: 5 },
    { quote: "Their linen blazers have transformed my daily work wardrobe. Incredible attention to lapel roll and button stance.", author: "Samir Desai", role: "Legal Consultant", rating: 5 },
    { quote: "Impeccable service from start to finish. The Italian wool feels luxurious and breathes well even during summer events.", author: "Karan Johar", role: "Entrepreneur", rating: 5 }
  ];
  const testimonials = withCardFallback(testimonialsSection?.testimonials, defaultTestimonials);

  // Contact Section
  const contactBadge = contactSection.badge || "Visit Our Studio";
  const contactTitle = contactSection.title || "Begin Your Sartorial Journey";
  const contactDescription = contactSection.description ||
    "We invite you to our atelier for an exclusive one-on-one consultation. Experience our fabric swatches, discuss silhouette options, and get fitted by master tailors.";
  const contactPhone = contactSection.phone || "+91 12345 67890";
  const contactEmail = contactSection.email || "you@gmail.com";
  const contactAddress = contactSection.address || "Chembur, Mumbai, Maharashtra - 400000";
  const contactHours = contactSection.hours || "Mon – Sat: 11:00 AM – 8:30 PM";
  const contactButtonText = contactSection.buttonText || "Inquire via WhatsApp";
  const whatsappNumber = contactSection.whatsapp || "1234567890";

  // Footer Section
  const footerDescription = footerSection.description ||
    "Crafting modern sartorial heirlooms through traditional bespoke measurements, master tailoring, and exceptional Italian wools.";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} Lumina Tailors. All Rights Reserved.`;
  const footerTagline = footerSection.tagline || "Designed with precision & timeless elegance.";

  // Social Links (Conditional Rendering)
  const instagram = socialLinks.instagram || "";
  const pinterest = socialLinks.pinterest || "";
  const facebook = socialLinks.facebook || "";
  const twitter = socialLinks.twitter || "";

  // State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);

  // Nav Links - Hardcoded
  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Collection', href: '#collection' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Handle Sticky Navbar Background Change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WhatsApp Order Generator
  const generateWhatsAppLink = (productName: string, category: string, fabric: string, price: string) => {
    const text = `Hello,\nI am interested in:\n\n*${productName}*\n• Category: ${category}\n• Fabric: ${fabric}\n• Price: ${price}\n\nCan you please share available sizes and delivery information?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleGeneralInquiry = () => {
    const text = "Hello Lumina Tailors,\n\nI would like to inquire about booking a bespoke tailoring consultation.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialsRef.current) {
      const { clientWidth } = testimonialsRef.current;
      const scrollAmount = direction === 'left' 
        ? -(clientWidth / (window.innerWidth >= 1024 ? 3 : 1)) 
        : (clientWidth / (window.innerWidth >= 1024 ? 3 : 1));
      
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#1A1A1A] font-sans antialiased selection:bg-white selection:text-white min-h-screen">
      
      {/* ----------------- 1. STICKY NAVBAR ----------------- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100' 
          : 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left: Logo & Company Name */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <Image src={companyLogo} width={40} height={40} unoptimized alt={companyName} />
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
              {companyName}
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] text-[#55504A]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#1A1A1A] transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Primary WhatsApp Button */}
          <div className="hidden sm:block">
            <button
              onClick={handleGeneralInquiry}
              className="bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] px-6 py-3.5 hover:bg-black transition-all duration-300 flex items-center space-x-2 group shadow-sm"
            >
              <span>{heroSecondaryButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 stroke-[2]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1A1A1A] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-6 mt-4 shadow-xl flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest text-[#1A1A1A] py-1">
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => { setMobileMenuOpen(false); handleGeneralInquiry(); }}
                className="w-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] py-4 flex items-center justify-center space-x-2"
              >
                <span>{heroSecondaryButtonText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ----------------- 2. HERO SECTION ----------------- */}
      <section id="hero" className="h-screen mt-12 py-4 px-6 lg:px-12 max-w-7xl mx-auto flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full max-h-full">
          
          {/* Left: Luxury Typography & CTA */}
          <div className="lg:col-span-6 space-y-5 pr-0 lg:pr-6">
            <div className="inline-block border border-[#1A1A1A]/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#55504A]">
              {heroBadge}
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl leading-[1.1] text-[#1A1A1A] font-light">
              {heroTitle} <br />
              <span className="italic font-normal">{heroHighlight}</span>
            </h1>

            <p className="text-sm sm:text-base text-[#55504A] leading-relaxed font-light max-w-md">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#collection"
                className="border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-[0.2em] px-6 py-3.5 text-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                {heroButtonText}
              </a>
              <button
                onClick={handleGeneralInquiry}
                className="bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] px-6 py-3.5 flex items-center justify-center space-x-3 hover:bg-black transition-all duration-300 shadow-md group"
              >
                <span>{heroSecondaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[1.5]" />
              </button>
            </div>

            {/* Subtle Value Callouts */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-200/80 text-center sm:text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1A1A1A]">{heroStat1Number}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#77706A]">{heroStat1Label}</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1A1A1A]">{heroStat2Number}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#77706A]">{heroStat2Label}</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1A1A1A]">{heroStat3Number}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#77706A]">{heroStat3Label}</span>
              </div>
            </div>
          </div>

          {/* Right: 4-Image Grid */}
          <div className="lg:col-span-6 pl-0 lg:pl-10 flex justify-center items-center h-full">
            <div className="relative aspect-[3/4] w-full max-w-md lg:max-w-none max-h-[calc(100vh-12rem)] mx-auto bg-white p-1 shadow-2xl overflow-hidden">
              
              <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full bg-white">
                {heroImages.slice(0,4).map((image: string, idx: number) => (
                  <div key={idx} className="relative overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`Bespoke Tailoring ${idx + 1}`}
                      className="w-full h-full object-cover object-center filter contrast-[1.05] hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ----------------- 3. SERVICES SECTION ----------------- */}
      <section id="services" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#77706A] block mb-2">{servicesBadge}</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-light">
              {servicesTitle}
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#55504A] mt-4 md:mt-0 max-w-xs">
            {servicesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, idx: number) => (
            <div 
              key={idx}
              className="group relative h-[480px] overflow-hidden cursor-pointer bg-stone-900 shadow-sm"
              onClick={handleGeneralInquiry}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 mb-2 block">
                  0{idx + 1} // SERVICE
                </span>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-2xl font-light tracking-wide text-white">
                    {service.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-[#1A1A1A] group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light line-clamp-3">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- 4. FEATURED COLLECTION ----------------- */}
      <section id="collection" className="py-24 px-6 lg:px-12 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#77706A] block">{collectionBadge}</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light">
              {collectionTitle}
            </h2>
            <div className="w-10 h-[1px] bg-[#1A1A1A] mx-auto pt-2"></div>
            <p className="text-xs text-[#55504A] font-light pt-2">
              {collectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {products.map((product: any, index: number) => (
              <div key={index} className="group flex flex-col justify-between bg-[#FAF9F6] border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start text-[10px] uppercase tracking-widest text-[#77706A]">
                      <span>Fabric</span>
                      <span className="font-semibold text-[#1A1A1A]">{product.fabric}</span>
                    </div>

                    <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-black font-medium leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#55504A] font-light leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                    
                    <div className='flex'>
                      <div className="pt-2 font-serif text-lg font-semibold text-[#1A1A1A]">
                        {product.price}
                      </div>
                      <div className="ml-auto">
                        <a
                          href={generateWhatsAppLink(product.name, product.category, product.fabric, product.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block text-center text-black text-xs uppercase tracking-[0.2em] py-3.5 transition-all duration-300 group/btn"
                        >
                          <span className="inline-flex items-center space-x-2">
                            <span>Buy Now</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 stroke-[2]" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- 5. TAILORING PROCESS ----------------- */}
      <section id="process" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#77706A] block">{processBadge}</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light">
            {processTitle}
          </h2>
          <div className="w-10 h-[1px] bg-[#1A1A1A] mx-auto pt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {processSteps.map((item: any, idx: number) => {
            const IconComponent = processIcons[idx % processIcons.length];
            return (
              <div key={idx} className="group bg-white p-8 border border-gray-200/80 hover:border-[#1A1A1A] transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center group-hover:bg-[#1A1A1A]/5 transition-colors">
                      <IconComponent className="w-8 h-8 text-[#1A1A1A] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
                    </div>
                    <span className="font-serif text-3xl font-light text-gray-300 group-hover:text-[#1A1A1A] transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1A1A1A] mb-3 font-normal">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#55504A] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full border border-gray-200 text-[#77706A]">
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- 6. TESTIMONIALS ----------------- */}
      <section id="testimonials" className="py-24 px-6 lg:px-12 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 block mb-2">{testimonialsBadge}</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light">
                {testimonialsTitle}
              </h2>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => scrollTestimonials('left')}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-all focus:outline-none"
                aria-label="Previous"
              >
                <ArrowRight className="w-4 h-4 rotate-180 stroke-[1.5]" />
              </button>
              <button 
                onClick={() => scrollTestimonials('right')}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-all focus:outline-none"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          <div 
            ref={testimonialsRef}
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t: any, idx: number) => (
              <div 
                key={idx}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] flex-shrink-0 snap-start bg-[#242424] p-8 border border-white/10 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-gray-500 opacity-60 fill-current" />
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-serif text-base text-white tracking-wide">
                    {t.author}
                  </h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- 7. CONTACT SECTION ----------------- */}
      <section id="contact" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200/80 p-8 sm:p-14 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#77706A] block">{contactBadge}</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                {contactTitle}
              </h2>
              <p className="text-xs text-[#55504A] leading-relaxed font-light max-w-lg">
                {contactDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs text-[#55504A]">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Phone Inquiry</span>
                    <span>{contactPhone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Email Concierge</span>
                    <span>{contactEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Studio Address</span>
                    <span>{contactAddress}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1A1A1A] block">Working Hours</span>
                    <span>{contactHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F6] p-8 border border-gray-200 text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center mx-auto">
                <Scissors className="w-5 h-5 stroke-[1.5]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-[#1A1A1A]">
                  Instant WhatsApp Booking
                </h3>
                <p className="text-xs text-[#55504A] font-light">
                  Skip the queue and speak directly with our head tailor to schedule your measurement session.
                </p>
              </div>

              <button
                onClick={handleGeneralInquiry}
                className="w-full bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] py-4 px-6 hover:bg-black transition-all duration-300 flex items-center justify-center space-x-3 shadow-md group"
              >
                <span>{contactButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[1.5]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- 8. FOOTER ----------------- */}
      <footer className="bg-white border-t border-gray-200/80 pt-16 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-gray-100">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src={companyLogo} width={40} height={40} unoptimized alt={companyName} />
              <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
                {companyName}
              </span>
            </div>
            <p className="text-xs text-[#55504A] font-light leading-relaxed max-w-sm">
              {footerDescription}
            </p>
            <div className="flex space-x-5 text-[#55504A] pt-2">
              {instagram && instagram !== "#" && (
                <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-[#1A1A1A] transition-colors" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
              )}
              {facebook && facebook !== "#" && (
                <a href={facebook} target="_blank" rel="noreferrer" className="hover:text-[#1A1A1A] transition-colors" aria-label="Facebook">
                  <FaFacebook className="w-4 h-4" />
                </a>
              )}
              {pinterest && pinterest !== "#" && (
                <a href={pinterest} target="_blank" rel="noreferrer" className="hover:text-[#1A1A1A] transition-colors" aria-label="Pinterest">
                  <FaPinterest className="w-4 h-4" />
                </a>
              )}
              {twitter && twitter !== "#" && (
                <a href={twitter} target="_blank" rel="noreferrer" className="hover:text-[#1A1A1A] transition-colors" aria-label="Twitter">
                  <FaXTwitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="md:text-left">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest text-[#55504A]">
              <li><a href="#hero" className="hover:text-[#1A1A1A] transition-colors">Home</a></li>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#1A1A1A] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right space-y-3 text-xs text-[#55504A]">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold mb-5">
              Studio Contact
            </h4>
            <p className="font-medium text-[#1A1A1A]">{contactPhone}</p>
            <p>{contactEmail}</p>
            <p className="text-gray-400">{contactAddress}</p>
            <p className="text-[10px] uppercase tracking-widest pt-1 text-[#1A1A1A]">{contactHours}</p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#77706A]">
          <p>{footerCopyright}</p>
          <p className="mt-2 sm:mt-0 font-serif italic">{footerTagline}</p>
        </div>
      </footer>

      {/* ----------------- FLOATING WHATSAPP ----------------- */}
      <a
        href={`https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hello ${companyName},\n\nI would like to inquire about booking a bespoke tailoring consultation.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>

    </div>
  );
}