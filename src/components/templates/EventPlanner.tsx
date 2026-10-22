'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';

// --- ICON IMPORTS ---
import { FaInstagram, FaPinterest, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Quote, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  Gem, 
  Palette, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight as ArrowRightNavIcon 
} from 'lucide-react';

// --- WRAPPER COMPONENTS ---
const IconInstagram = ({ className = "w-6 h-6 lg:w-4 lg:h-4" }) => <FaInstagram className={className} />;
const IconPinterest = ({ className = "w-6 h-6 lg:w-4 lg:h-4" }) => <FaPinterest className={className} />;
const IconFacebook = ({ className = "w-6 h-6 lg:w-4 lg:h-4" }) => <FaFacebook className={className} />;
const IconTwitter = ({ className = "w-6 h-6 lg:w-4 lg:h-4" }) => <FaXTwitter className={className} />;

const IconPhone = () => <Phone className="w-5 h-5 stroke-[1.5]" />;
const IconMail = () => <Mail className="w-5 h-5 stroke-[1.5]" />;
const IconMapPin = () => <MapPin className="w-5 h-5 stroke-[1.5]" />;
const IconQuote = () => <Quote className="w-8 h-8 text-[#C5A880] opacity-60 fill-current" />;
const IconMenu = () => <Menu className="w-6 h-6 stroke-[1.5]" />;
const IconX = () => <X className="w-6 h-6 stroke-[1.5]" />;
const IconArrowRight = () => (
  <ArrowRight className="w-4 h-4 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 stroke-[1.5]" />
);

const IconSparkles = () => <Sparkles className="w-7 h-7 text-[#C5A880] stroke-[1.5]" />;
const IconDiamond = () => <Gem className="w-7 h-7 text-[#C5A880] stroke-[1.5]" />;
const IconPalette = () => <Palette className="w-7 h-7 text-[#C5A880] stroke-[1.5]" />;
const IconShieldCheck = () => <ShieldCheck className="w-7 h-7 text-[#C5A880] stroke-[1.5]" />;

const IconArrowLeftNav = () => <ArrowLeft className="w-5 h-5 stroke-[1.5]" />;
const IconArrowRightNav = () => <ArrowRightNavIcon className="w-5 h-5 stroke-[1.5]" />;

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
        if (parts.length >= 3) {
          return {
            title: parts[0] || "",
            desc: parts[1] || "",
            image: parts[2] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseWhyUs = (data: any, defaultData: any[]): any[] => {
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
            number: parts[0] || "",
            title: parts[1] || "",
            desc: parts[2] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParsePortfolio = (data: any, defaultData: any[]): any[] => {
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
            title: parts[0] || "",
            category: parts[1] || "",
            image: parts[2] || "",
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
            quote: parts[0] || "",
            author: parts[1] || "",
            role: parts[2] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};
const safeParseHeroServices = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // Handle comma-separated list like "Bhavik Sapat, Bhakti Sapat"
      const items = data.split(",").map((item) => item.trim()).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};
export default function LuminaEventsSPA({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const servicesSection = data?.servicesSection || {};
  const whyUsSection = data?.whyUsSection || {};
  const portfolioSection = data?.portfolioSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const contactSection = data?.contactSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};

  // Default values - Basic Info
  const companyName = basicInfo.companyName || "Lumina";
  const companyLogo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";
  const companyTagline = basicInfo.tagline || "Events & Luxury";

  // Nav Links - Hardcoded
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Hero Section
  const heroBadge = heroSection.badge || "Tailored Perfection";
  const heroTitle = heroSection.title || "Crafting";
  const heroHighlight = heroSection.highlight || "Unforgettable";
  const heroSubtitle = heroSection.subtitle || "Celebrations With Timeless Elegance";
  const heroButtonText = heroSection.buttonText || "Plan Your Event";
  const heroImage = heroSection.image ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop";

  const defaultHeroServices = [
    "Luxury Event Planning",
    "Wedding Planning",
    "Corporate Events",
    "Private Celebrations"
  ];
  const heroServices = safeParseHeroServices(heroSection?.services, defaultHeroServices);
  // About Section
  const aboutBadge = aboutSection.badge || "The Founder & Agency";
  const aboutTitle = aboutSection.title || "Curating moments that linger in memory long after the music fades.";
  const aboutDescription = aboutSection.description ||
    "Founded by Victoria Lumina, our agency approaches event production with the eye of an art director and the precision of a master craftsman. We believe that true luxury lies not in ostentation, but in flawless execution, thoughtful atmosphere, and personal resonance.";
  const aboutSubDescription = aboutSection.subDescription ||
    "From intimate coastal gatherings to grand estate weddings, every detail is styled to reflect your unique story, supported by an uncompromising standard of service.";
  const aboutImage = aboutSection.image ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop";
  const aboutStat1Number = aboutSection.stat1Number || "12+";
  const aboutStat1Label = aboutSection.stat1Label || "Years Experience";
  const aboutStat2Number = aboutSection.stat2Number || "350+";
  const aboutStat2Label = aboutSection.stat2Label || "Events Planned";
  const aboutStat3Number = aboutSection.stat3Number || "98%";
  const aboutStat3Label = aboutSection.stat3Label || "Happy Clients";

  // Services Section
  const servicesBadge = servicesSection.badge || "Bespoke Offerings";
  const servicesTitle = servicesSection.title || "Our Signature Services";

  const defaultServices = [
    {
      title: "Wedding Planning",
      desc: "Comprehensive design, styling, and coordination for luxury weddings worldwide.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Corporate Events",
      desc: "High-profile brand galas, executive retreats, and memorable product launches.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Private Celebrations",
      desc: "Exclusive milestone anniversaries, birthday galas, and bespoke dinner parties.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Destination Weddings",
      desc: "Seamless international travel management and scenic remote location sourcing.",
      image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop"
    }
  ];
  const services = safeParseArray(servicesSection?.services, defaultServices);

  // Why Us Section
  const whyUsBadge = whyUsSection.badge || "The Lumina Distinction";
  const whyUsTitle = whyUsSection.title || "Why Discerning Clients Choose Us";
  const whyUsSubtitle = whyUsSection.subtitle || "Uncompromising Standards & Elegance";

  const defaultWhyUs = [
    { number: "01", title: "Personal Planning", desc: "Tailored specifically to your lifestyle, taste, and personal narrative for an effortless journey." },
    { number: "02", title: "Luxury Vendors", desc: "Access to our curated network of world-class florists, chefs, photographers, and artisans." },
    { number: "03", title: "Creative Styling", desc: "Editorial visual concepts that transform ordinary venues into immersive cinematic environments." },
    { number: "04", title: "End-to-End Management", desc: "Flawless production control from initial moodboards to guest logistics and final farewells." }
  ];
  const whyUsItems = safeParseWhyUs(whyUsSection?.items, defaultWhyUs);

  const whyUsIcons = [IconSparkles, IconDiamond, IconPalette, IconShieldCheck];

  // Portfolio Section
  const portfolioBadge = portfolioSection.badge || "Visual Stories";
  const portfolioTitle = portfolioSection.title || "Selected Portfolio";

  const defaultPortfolio = [
    { title: "The Tuscan Romance", category: "Florence, Italy", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop" },
    { title: "Château Gala", category: "Paris, France", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" },
    { title: "Coastal Serenity", category: "Big Sur, California", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop" },
    { title: "Modern Minimalist Soirée", category: "New York, USA", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
    { title: "Venetian Elegance", category: "Venice, Italy", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop" },
    { title: "High-Society Jubilee", category: "London, UK", image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop" }
  ];
  const portfolioItems = safeParsePortfolio(portfolioSection?.items, defaultPortfolio);

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Words of Appreciation";
  const testimonialsTitle = testimonialsSection.title || "From Our Clients";

  const defaultTestimonials = [
    { quote: "Lumina Events made our destination wedding in Lake Como feel utterly effortless. Every design element exceeded our grandest expectations.", author: "Sarah Wilson", role: "Bride" },
    { quote: "The level of composure and creative direction provided for our corporate 50th gala was unmatched. Truly the pinnacle of luxury event planning.", author: "Marcus Vance", role: "Corporate Executive" },
    { quote: "Working with Victoria and her team felt like working with family who happened to have extraordinary taste and military-grade precision.", author: "Elena Rostova", role: "Private Client" },
    { quote: "The floral installations and custom architectural lighting transformed our family estate completely. Our guests are still raving about the evening.", author: "David & Claire M.", role: "Estate Wedding Clients" },
    { quote: "From international vendor management to the final champagne toast, Lumina executed our anniversary gala with absolute perfection.", author: "Amanda Sterling", role: "Milestone Celebrant" }
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // Contact Section
  const contactBadge = contactSection.badge || "Inquiries";
  const contactTitle = contactSection.title || "Let's Begin Crafting Your Event";
  const contactDescription = contactSection.description ||
    "We accept a limited number of commissions each year to ensure uncompromising dedication to every detail.";
  const contactButtonText = contactSection.buttonText || "Send Inquiry via WhatsApp";
  const contactPhone = contactSection.phone || "+91 12345 67890";
  const contactEmail = contactSection.email || "concierge@luminaevents.com";
  const contactAddress = contactSection.address || "Mumbai, Maharashtra - 421601";
  const contactInstagram = contactSection.instagram || "@luminaevents.official";
  const whatsappNumber = contactSection.whatsapp || "1234567890";

  // Footer Section
  const footerDescription = footerSection.description ||
    "Full-service luxury event design, destination wedding planning, and high-end production for global clientele.";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} Lumina Events. All Rights Reserved.`;
  const footerTagline = footerSection.tagline || "Crafted with timeless elegance.";

  // Social Links - Conditional
  const instagram = socialLinks.instagram || "";
  const pinterest = socialLinks.pinterest || "";
  const facebook = socialLinks.facebook || "";
  const twitter = socialLinks.twitter || "";

  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Planning',
    eventDate: '',
    message: ''
  });

  const testimonialsRef = useRef<HTMLDivElement | null>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialsRef.current) {
      const { clientWidth } = testimonialsRef.current;
      const scrollAmount = direction === 'left' 
        ? -(clientWidth / (window.innerWidth >= 768 ? 3 : 1)) 
        : (clientWidth / (window.innerWidth >= 768 ? 3 : 1));
      
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = whatsappNumber.replace(/\s/g, '');
    const text = `Hello Lumina Events,\n\nI would like to inquire about planning an event:\n\n• Name: ${formData.name}\n• Email: ${formData.email}\n• Phone: ${formData.phone}\n• Event Type: ${formData.eventType}\n• Preferred Date: ${formData.eventDate || 'Not decided'}\n• Message: ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#C5A880] selection:text-white min-h-screen">
      
      {/* ----------------- MOBILE HEADER ----------------- */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5DDD3] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center font-serif text-sm font-semibold tracking-widest text-[#1A1A1A]">
           <Image src={companyLogo} width={50} height={50} unoptimized alt={companyName} />
          </div>
          <span className="font-serif tracking-widest uppercase text-sm font-medium text-[#1A1A1A]">
            {companyName}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#1A1A1A] focus:outline-none p-1"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <IconX /> : <IconMenu />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FDFBF7] z-40 border-b border-[#E5DDD3] px-8 py-6 shadow-xl flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-lg tracking-wider text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 border-t border-[#E5DDD3] flex justify-around sm:justify-start sm:space-x-8 text-[#1A1A1A] py-2">
            {instagram && instagram !== "#" && (
              <a href={instagram} target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A880] transition-colors"><IconInstagram /></a>
            )}
            {pinterest && pinterest !== "#" && (
              <a href={pinterest} target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A880] transition-colors"><IconPinterest /></a>
            )}
            {facebook && facebook !== "#" && (
              <a href={facebook} target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A880] transition-colors"><IconFacebook /></a>
            )}
            {twitter && twitter !== "#" && (
              <a href={twitter} target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A880] transition-colors"><IconTwitter /></a>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* ----------------- 1. STICKY LEFT SIDEBAR (DESKTOP) ----------------- */}
        <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 xl:w-72 bg-[#FAF8F5] border-r border-[#E6E0D8] z-40 flex-col justify-between p-10 select-none">
          {/* Logo & Name */}
          <div className="space-y-3">
            <div className="w-12 h-12 flex items-center justify-center font-serif text-xl font-light text-[#1A1A1A] tracking-widest mx-auto">
              <Image src={companyLogo} width={50} height={50} unoptimized alt={companyName} />
            </div>
            <div className="text-center">
              <h1 className="font-serif text-xl tracking-[0.25em] uppercase text-[#1A1A1A] font-semibold">
                {companyName}
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C8275] mt-1 font-sans">
                {companyTagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto space-y-4 text-center">
            {navLinks.map((link) => (
              <div key={link.name}>
                <a
                  href={link.href}
                  className="inline-block text-xs uppercase tracking-[0.25em] text-[#55504A] hover:text-[#C5A880] transition-colors duration-300 py-1"
                >
                  {link.name}
                </a>
              </div>
            ))}
          </nav>

          {/* Social Icons - Conditional Rendering */}
          <div className="pt-6 border-t border-[#E6E0D8] flex justify-center space-x-5 text-[#8C8275]">
            {instagram && instagram !== "#" && (
              <a href={instagram} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] transition-colors duration-300" aria-label="Instagram">
                <IconInstagram />
              </a>
            )}
            {pinterest && pinterest !== "#" && (
              <a href={pinterest} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] transition-colors duration-300" aria-label="Pinterest">
                <IconPinterest />
              </a>
            )}
            {facebook && facebook !== "#" && (
              <a href={facebook} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] transition-colors duration-300" aria-label="Facebook">
                <IconFacebook />
              </a>
            )}
            {twitter && twitter !== "#" && (
              <a href={twitter} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] transition-colors duration-300" aria-label="Twitter">
                <IconTwitter />
              </a>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 lg:ml-64 xl:ml-72 min-h-screen bg-[#FDFBF7]">
          
          {/* ----------------- 2. HERO SECTION ----------------- */}
          <section id="home" className="relative min-h-screen flex items-center justify-center p-6 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Luxury Celebration Venue"
                className="w-full h-full object-cover object-center filter brightness-[0.88]"
              />
            </div>

            <div className="relative z-10 max-w-2xl w-full bg-[#FDFBF7]/95 backdrop-blur-md p-8 sm:p-12 lg:p-16 border border-[#E5DDD3] shadow-2xl my-12 lg:my-0 lg:-ml-24 xl:-ml-36 transform transition-transform duration-700">
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-4">
                {heroBadge}
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#1A1A1A] font-light mb-6">
                {heroTitle} <br />
                <span className="italic font-normal">{heroHighlight}</span> {heroSubtitle}
              </h2>

              <div className="w-12 h-[1px] bg-[#C5A880] mb-6"></div>

              <div className="grid grid-cols-2 gap-y-2 text-xs uppercase tracking-[0.18em] text-[#55504A] font-medium mb-8">
                {heroServices.map((service: string, idx: number) => (
                  <div key={idx}>• {service}</div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-block bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-[#C5A880] transition-colors duration-300 shadow-md"
              >
                {heroButtonText}
              </a>
            </div>
          </section>

          {/* ----------------- 3. ABOUT SECTION ----------------- */}
          <section id="about" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto border-b border-[#E6E0D8]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                  {aboutBadge}
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-snug">
                  {aboutTitle}
                </h2>

                <p className="text-sm text-[#55504A] leading-relaxed font-light">
                  {aboutDescription}
                </p>

                <p className="text-sm text-[#55504A] leading-relaxed font-light">
                  {aboutSubDescription}
                </p>

                <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#E6E0D8] text-center sm:text-left">
                  <div>
                    <div className="font-serif text-3xl lg:text-4xl text-[#1A1A1A] font-light">{aboutStat1Number}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] mt-1">{aboutStat1Label}</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl lg:text-4xl text-[#1A1A1A] font-light">{aboutStat2Number}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] mt-1">{aboutStat2Label}</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl lg:text-4xl text-[#1A1A1A] font-light">{aboutStat3Number}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] mt-1">{aboutStat3Label}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[3/4] overflow-hidden shadow-xl">
                  <img
                    src={aboutImage}
                    alt="Victoria Lumina - Founder"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C5A880] -z-10 hidden sm:block"></div>
              </div>

            </div>
          </section>

          {/* ----------------- 4. SERVICES SECTION ----------------- */}
          <section id="services" className="py-24 px-6 lg:px-16 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                  {servicesBadge}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                  {servicesTitle}
                </h2>
                <div className="w-12 h-[1px] bg-[#C5A880] mx-auto pt-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service: any, idx: number) => (
                  <div key={idx} className="group cursor-pointer bg-[#FDFBF7] border border-[#E5DDD3] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#55504A] leading-relaxed font-light">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------- 5. WHY CHOOSE US ----------------- */}
          <section id="why-us" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto border-b border-[#E6E0D8]">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
              <div>
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
                  {whyUsBadge}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                  {whyUsTitle}
                </h2>
              </div>
              <p className="text-xs text-[#8C8275] uppercase tracking-[0.2em] mt-4 lg:mt-0">
                {whyUsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUsItems.map((item: any, idx: number) => {
                const IconComponent = whyUsIcons[idx % whyUsIcons.length];
                return (
                  <div
                    key={idx}
                    className="group bg-[#FAF8F5] p-8 border border-[#E5DDD3] relative hover:border-[#C5A880] transition-colors duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-serif text-3xl text-[#C5A880] font-light">
                          {item.number}
                        </span>
                        <div className="p-2.5 rounded-full bg-[#FDFBF7] border border-[#E5DDD3] group-hover:border-[#C5A880] transition-colors">
                          <IconComponent />
                        </div>
                      </div>
                      <h3 className="font-serif text-lg text-[#1A1A1A] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#55504A] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ----------------- 6. PORTFOLIO ----------------- */}
          <section id="portfolio" className="py-24 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                  {portfolioBadge}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                  {portfolioTitle}
                </h2>
                <div className="w-12 h-[1px] bg-[#C5A880] mx-auto pt-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item: any, idx: number) => (
                  <div key={idx} className="group relative aspect-[4/5] overflow-hidden bg-stone-900 cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/70 md:bg-[#1A1A1A]/60 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 text-white">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl font-light mb-4">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------- 7. TESTIMONIALS ----------------- */}
          <section id="testimonials" className="py-24 px-6 lg:px-16 bg-[#1A1A1A] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6">
                <div className="text-center sm:text-left space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                    {testimonialsBadge}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#FDFBF7]">
                    {testimonialsTitle}
                  </h2>
                  <div className="w-12 h-[1px] bg-[#C5A880] mx-auto sm:mx-0 pt-2"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => scrollTestimonials('left')}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C5A880] hover:text-[#C5A880] transition-colors focus:outline-none"
                    aria-label="Previous Testimonial"
                  >
                    <IconArrowLeftNav />
                  </button>
                  <button 
                    onClick={() => scrollTestimonials('right')}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C5A880] hover:text-[#C5A880] transition-colors focus:outline-none"
                    aria-label="Next Testimonial"
                  >
                    <IconArrowRightNav />
                  </button>
                </div>
              </div>

              <div 
                ref={testimonialsRef}
                className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((item: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="w-full md:w-[calc(33.333%-1.333rem)] flex-shrink-0 snap-start bg-[#242424] p-8 border border-white/10 flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <IconQuote />
                      <p className="text-xs sm:text-sm text-[#D1C9BF] leading-relaxed font-light italic mt-4">
                        "{item.quote}"
                      </p>
                    </div>
                    <div>
                      <div className="w-8 h-[1px] bg-[#C5A880] mb-3"></div>
                      <h4 className="font-serif text-base text-white tracking-wide">
                        {item.author}
                      </h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ----------------- 8. CONTACT SECTION ----------------- */}
          <section id="contact" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
                    {contactBadge}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light mb-4">
                    {contactTitle}
                  </h2>
                  <p className="text-xs text-[#55504A] leading-relaxed font-light">
                    {contactDescription}
                  </p>
                </div>

                <div className="space-y-6 text-xs text-[#55504A]">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 border border-[#E5DDD3] text-[#C5A880]">
                      <IconPhone />
                    </div>
                    <div>
                      <span className="uppercase tracking-widest text-[10px] text-[#8C8275] block">Direct Line</span>
                      <span className="text-sm text-[#1A1A1A] font-medium">{contactPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 border border-[#E5DDD3] text-[#C5A880]">
                      <IconMail />
                    </div>
                    <div>
                      <span className="uppercase tracking-widest text-[10px] text-[#8C8275] block">Email Concierge</span>
                      <span className="text-sm text-[#1A1A1A] font-medium">{contactEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 border border-[#E5DDD3] text-[#C5A880]">
                      <IconMapPin />
                    </div>
                    <div>
                      <span className="uppercase tracking-widest text-[10px] text-[#8C8275] block">Studio Location</span>
                      <span className="text-sm text-[#1A1A1A] font-medium">{contactAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E6E0D8]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] mb-3">
                    Follow Our Visual Journal
                  </p>
                  {instagram && instagram !== "#" && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-xs text-[#1A1A1A] hover:text-[#C5A880] transition-colors"
                    >
                      <IconInstagram />
                      <span>{contactInstagram}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF8F5] p-8 sm:p-12 border border-[#E5DDD3]">
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                  Event Inquiry Form
                </h3>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Lady Victoria"
                        className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="victoria@domain.com"
                        className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        <option value="Wedding Planning">Wedding Planning</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Private Celebration">Private Celebration</option>
                        <option value="Destination Event">Destination Event</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                      Estimated Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#55504A] mb-2 font-medium">
                      Event Details / Vision *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your guest count, preferred locations, and aesthetic expectations..."
                      className="w-full bg-[#FDFBF7] border border-[#E5DDD3] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C5A880] transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-white text-[10px] md:text-xs uppercase tracking-[0.25em] py-4 px-2 hover:bg-[#C5A880] transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>{contactButtonText}</span>
                    <IconArrowRight />
                  </button>
                </form>
              </div>

            </div>
          </section>

          {/* ----------------- 9. FOOTER ----------------- */}
          <footer className="bg-[#FAF8F5] border-t border-[#E6E0D8] pt-16 pb-12 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#E6E0D8]">
              
              <div className="space-y-4">
                <div className='flex gap-3 items-center'>
                  <div className="w-8 h-8 flex items-center justify-center font-serif text-sm font-semibold tracking-widest text-[#1A1A1A]">
                    <Image src={companyLogo} width={50} height={50} unoptimized alt={companyName} />
                  </div>
                  <div className="font-serif text-2xl tracking-widest text-[#1A1A1A]">
                    {companyName.toUpperCase()}
                  </div>
                </div>
                <p className="text-xs text-[#8C8275] leading-relaxed font-light max-w-sm">
                  {footerDescription}
                </p>
                <div className="flex space-x-6 lg:space-x-4 text-[#8C8275] pt-2">
                  {instagram && instagram !== "#" && (
                    <a href={instagram} target="_blank" rel="noreferrer" className="p-1 lg:p-0 hover:text-[#C5A880] transition-colors"><IconInstagram /></a>
                  )}
                  {pinterest && pinterest !== "#" && (
                    <a href={pinterest} target="_blank" rel="noreferrer" className="p-1 lg:p-0 hover:text-[#C5A880] transition-colors"><IconPinterest /></a>
                  )}
                  {facebook && facebook !== "#" && (
                    <a href={facebook} target="_blank" rel="noreferrer" className="p-1 lg:p-0 hover:text-[#C5A880] transition-colors"><IconFacebook /></a>
                  )}
                  {twitter && twitter !== "#" && (
                    <a href={twitter} target="_blank" rel="noreferrer" className="p-1 lg:p-0 hover:text-[#C5A880] transition-colors"><IconTwitter /></a>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold mb-6">
                  Quick Links
                </h4>
                <ul className="space-y-3 text-xs text-[#55504A]">
                  <li><a href="#home" className="hover:text-[#C5A880] transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-[#C5A880] transition-colors">About Us</a></li>
                  <li><a href="#services" className="hover:text-[#C5A880] transition-colors">Services</a></li>
                  <li><a href="#portfolio" className="hover:text-[#C5A880] transition-colors">Portfolio</a></li>
                  <li><a href="#contact" className="hover:text-[#C5A880] transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] font-semibold mb-6">
                  Contact
                </h4>
                <address className="not-italic text-xs text-[#55504A] space-y-3">
                  <p>{contactAddress}</p>
                  <p>{contactPhone}</p>
                  <p>{contactEmail}</p>
                </address>
              </div>

            </div>

            <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#8C8275]">
              <p>{footerCopyright}</p>
              <p className="mt-2 sm:mt-0 font-serif italic">{footerTagline}</p>
            </div>
          </footer>

        </main>
      </div>

    </div>
  );
}