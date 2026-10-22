'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import {
  Diamond,
  Gem,
  Award,
  Ruler,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

// --- Types ---
type ContactFormInputs = {
  name: string;
  email: string;
  query: string;
};

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
            name: parts[0] || "",
            price: parts[1] || "",
            image: parts[2] || "",
            offer: parts[3] || null,
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseWorkflow = (data: any, defaultData: any[]): any[] => {
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
            title: parts[0] || "",
            description: parts[1] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseReviews = (data: any, defaultData: any[]): any[] => {
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
            text: parts[2] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseMarquee = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data.split(",").map((item) => {
        const parts = item.split("|").map((s) => s.trim());
        if (parts.length >= 1) {
          return {
            name: parts[0] || "",
          };
        }
        return null;
      }).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

export default function SwarnaJewelryLandingPage({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const workflowSection = data?.workflowSection || {};
  const productsSection = data?.productsSection || {};
  const reviewsSection = data?.reviewsSection || {};
  const contactSection = data?.contactSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const marqueeSection = data?.marqueeSection || {};

  // Default values - Basic Info
  const companyName = basicInfo.companyName || "Swarna";
  const companyLogo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";

  // Hero Section
  const heroBadge = heroSection.badge || "Aura Of Elegance";
  const heroTitle = heroSection.title || "EVERY DETAIL";
  const heroHighlight1 = heroSection.highlight1 || "DESIGNED TO";
  const heroSubtitle = heroSection.subtitle || "CAPTURE YOUR";
  const heroHighlight2 = heroSection.highlight2 || "UNIQUENESS";
  const heroButtonText = heroSection.buttonText || "Explore Jewelries";
  const heroImage = heroSection.image || 
    "https://hazoorilaljewellers.com/wp-content/uploads/2023/01/Banner-5-mobile.jpg";

  // About Section
  const aboutBadge = aboutSection.badge || "Our Story";
  const aboutTitle = aboutSection.title || "A Gem For Every Story,";
  const aboutHighlight = aboutSection.highlight || "An Art For Every Soul.";
  const aboutDescription = aboutSection.description ||
    "We believe that fine jewelry is more than just an accessory—it's an expression of your journey. Using only the highest quality stones and precious metals, we design pieces that resonate with your inner brilliance. Every cut, every polish, designed to perfection.";
  const aboutImage = aboutSection.image ||
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const aboutStat1Number = aboutSection.stat1Number || "100+";
  const aboutStat1Label = aboutSection.stat1Label || "Art Installations";
  const aboutStat2Number = aboutSection.stat2Number || "250+";
  const aboutStat2Label = aboutSection.stat2Label || "Professional Staff";

  // Workflow Section
  const workflowBadge = workflowSection.badge || "The Process";
  const workflowTitle = workflowSection.title || "How It Works";
  const workflowIcons = [Gem, Ruler, Award, ShieldCheck];

  const defaultWorkflow = [
    {
      title: "Select Design",
      description: "Browse our exclusive collections and find the piece that speaks to your unique style."
    },
    {
      title: "Custom Sizing",
      description: "Provide your exact measurements or preferences for a flawless, tailored fit."
    },
    {
      title: "Master Crafting",
      description: "Our artisans meticulously craft your jewelry using ethically sourced materials."
    },
    {
      title: "Secure Delivery",
      description: "Receive your beautiful piece with insured shipping directly to your doorstep."
    }
  ];
  const workflow = safeParseWorkflow(workflowSection?.workflow, defaultWorkflow);

  // Products Section
  const productsBadge = productsSection.badge || "Our Collection";
  const productsTitle = productsSection.title || "Choose Your Ideal Jewel";

const defaultProducts = [
  {
    name: "Sapphire Pendant",
    price: "₹27,840",
    image: "https://rubans.in/cdn/shop/files/RLE13NS0041_Mood.jpg?v=1774847396&width=610",
    offer: "-15%",
  },
  {
    name: "Silver Hoop Earrings",
    price: "₹8,265",
    image: "https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/c/s/csj1411.jpg",
    offer: null,
  },
  {
    name: "Ruby Tennis Bracelet",
    price: "₹46,980",
    image: "https://www.twentyonejewels.com/cdn/shop/files/WhatsApp_Image_2026-03-25_at_5.46.54_PM_b4ce2b6c-c3fc-422e-bd5c-57e1950c6db3_550x.jpg?v=1774451816",
    offer: "-25%",
  },
  {
    name: "White Gold Chain",
    price: "₹22,620",
    image: "https://assets.myntassets.com/assets/images/2025/SEPTEMBER/28/C7cWxZWi_8ff991dbe1a14f9ebed4ccb50e094541.jpg",
    offer: "-12%",
  },
  {
    name: "Pearl Drop Earrings",
    price: "₹15,225",
    image: "https://www.lpjewel.in/cdn/shop/files/koreanpearldropearringcreative_2ebf0cd5-75ec-4454-8054-07cd87f6f16a.jpg?v=1775753387&width=3840",
    offer: null,
  },
  {
    name: "Vintage Brooch",
    price: "₹18,270",
    image: "https://imagescdn.jaypore.com/img/app/product/3/39604762-12201911.jpg",
    offer: "-18%",
  },
  {
    name: "Opal Cocktail Ring",
    price: "₹59,160",
    image: "https://www.antiqueringboutique.com/cdn/shop/products/debaa070f4c642819a72c0ea715499b3.thumbnail.0000000000.jpg?v=1676040136&width=1214",
    offer: "-8%",
  },
  {
    name: "Layered Gold Anklet",
    price: "₹12,615",
    image: "https://rubans.in/cdn/shop/files/rubans-set-of-2-pearls-stone-studded-24k-gold-plated-layered-anklet-anklet-1143857710.jpg?v=1755714088",
    offer: null,
  },
];
  const products = safeParseArray(productsSection?.products, defaultProducts);

  // Marquee Section
  const defaultMarquee = [
    { name: "Diamond Jewelry" },
    { name: "Sapphire Jewelry" },
    { name: "Gold Collection" },
    { name: "Bridal Sets" },
  ];
  const marqueeItems = safeParseMarquee(marqueeSection?.marqueeItems, defaultMarquee);
  const marqueeIcons = [Diamond, Gem, Award, Diamond];

  // Reviews Section
  const reviewsBadge = reviewsSection.badge || "Testimonials";
  const reviewsTitle = reviewsSection.title || "Reviews by our Clients";

  const defaultReviews = [
    {
      name: "Eleanor Pena",
      role: "Creative Director",
      text: "The craftsmanship is absolutely breathtaking. Every detail feels like it was meticulously planned and flawlessly executed. A masterpiece I wear daily.",
    },
    {
      name: "Isabella Martinez",
      role: "Fashion Editor",
      text: "Swarna's pieces don't just accessorize; they define the entire look. The ethereal glow of their diamonds is unmatched in modern jewelry.",
    },
    {
      name: "Sophia Kensington",
      role: "Private Collector",
      text: "From the personalized consultation to the exquisite unboxing experience, everything screams premium luxury. Simply phenomenal.",
    }
  ];
  const reviews = safeParseReviews(reviewsSection?.reviews, defaultReviews);

  // Contact Section
  const contactBadge = contactSection.badge || "Get In Touch";
  const contactTitle = contactSection.title || "Have a query?";
  const contactSubtitle = contactSection.subtitle || "Let's talk.";
  const contactDescription = contactSection.description ||
    "Whether you're looking for a bespoke design or have a question about our collections, our luxury concierge is here to assist you.";
  const contactButtonText = contactSection.buttonText || "Send via WhatsApp";
  const whatsappNumber = contactSection.whatsapp || "1234567890";
  const contactEmail = contactSection.email || "support@swarna.com";
  const contactPhone = contactSection.phone || "+91 1234567890";
  const contactAddress = contactSection.address || "Mumbai, Maharashtra - 400000";
  const contactHours = contactSection.hours || "Mon - Sat: 10:00 AM - 8:00 PM<br/>Sunday: Closed";

  // Footer Section
  const footerDescription = footerSection.description ||
    "Discover the epitome of elegance with our meticulously crafted jewelry. Every piece is a testament to timeless beauty and unparalleled luxury craftsmanship.";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} SWARNA JEWELRY. ALL RIGHTS RESERVED.`;

  // Social Links
  const facebook = socialLinks.facebook || "https://facebook.com/";
  const instagram = socialLinks.instagram || "https://instagram.com/";
  const twitter = socialLinks.twitter || "https://x.com/";

  // State
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = (data: ContactFormInputs) => {
    const text = `Hello! I have a query.%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Query:* ${data.query}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#FDF9F5] text-[#3B2416] selection:bg-[#3B2416] selection:text-[#FDF9F5] custom-sans">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-[#FDF9F5]/80 backdrop-blur-xl border-b border-[#E8DCCB] px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
            <Image
              src={companyLogo}
              alt={`${companyName} Logo`}
              width={40}
              height={40}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl custom-serif tracking-[0.15em] font-semibold uppercase">{companyName}</span>
        </div>
        <div className="hidden md:flex gap-10 text-[13px] font-medium tracking-[0.1em] uppercase">
          <a href="#hero" className="relative group hover:text-[#8C6239] transition-colors">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8C6239] transition-all group-hover:w-full"></span>
          </a>
          <a href="#about" className="relative group hover:text-[#8C6239] transition-colors">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8C6239] transition-all group-hover:w-full"></span>
          </a>
          <a href="#workflow" className="relative group hover:text-[#8C6239] transition-colors">
            Process
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8C6239] transition-all group-hover:w-full"></span>
          </a>
          <a href="#products" className="relative group hover:text-[#8C6239] transition-colors">
            Collections
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8C6239] transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="relative group hover:text-[#8C6239] transition-colors">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8C6239] transition-all group-hover:w-full"></span>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full min-h-screen pt-24 pb-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col items-start z-10 text-left pt-12 md:pt-0">
          <div className="flex items-center gap-4 mb-6 opacity-80">
            <div className="w-12 h-[1px] bg-[#8C6239]"></div>
            <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold">
              {heroBadge}
            </span>
          </div>
          <h1 className="text-5xl md:text-[4rem] custom-serif leading-[1.05] mb-8 font-light text-[#2A190F]">
            {heroTitle} <br />
            <span className="italic text-[#8C6239] font-normal text-5xl md:text-[4.5rem]">{heroHighlight1}</span> <br />
            {heroSubtitle} <br />
            <span className="italic text-[#8C6239] font-normal text-5xl md:text-[4.5rem]">{heroHighlight2}</span>
          </h1>
          <button className="group bg-[#3B2416] text-[#FDF9F5] px-10 py-5 text-[13px] tracking-[0.2em] uppercase hover:bg-[#8C6239] transition-all duration-500 flex items-center gap-4 overflow-hidden relative">
            <span className="relative z-10">{heroButtonText}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="w-full md:w-1/2 relative h-[60vh] md:h-[82vh]">
          <div className="absolute inset-0 bg-[#E8DCCB] rounded-tr-[120px] rounded-bl-[120px] hover:rounded-tl-[120px] hover:rounded-tr-[0px] hover:rounded-br-[120px] hover:rounded-bl-[0px] transition-all duration-700 -z-1 hover:scale-110"></div>
          <Image
            src={heroImage}
            alt="Elegant woman wearing jewelry"
            width={800}
            height={900}
            unoptimized
            className="w-full h-full object-cover rounded-tr-[120px] rounded-bl-[120px] hover:rounded-tl-[120px] hover:rounded-tr-[0px] hover:rounded-br-[120px] hover:rounded-bl-[0px] shadow-2xl hover:scale-105 transition-all duration-700 hover:-translate-x-0"
          />
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <div className="w-full bg-[#E8DCCB]/60 py-8 overflow-hidden flex whitespace-nowrap border-y border-[#E8DCCB]">
        <div className="animate-marquee flex gap-20 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item: any, idx: number) => {
            const Icon = marqueeIcons[idx % marqueeIcons.length];
            return (
              <div key={idx} className="flex items-center gap-4 text-[#3B2416] opacity-80 hover:opacity-100 transition-opacity">
                <Icon className="w-5 h-5 text-[#8C6239]" />
                <span className="custom-serif text-xl tracking-wider">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-16 flex flex-col md:flex-row gap-20 items-center max-w-[1600px] mx-auto">
        <div className="w-full md:w-1/2 relative h-[500px] md:h-[500px] group">
          <div className="absolute inset-0 bg-[#3B2416] rounded-tl-[120px] rounded-br-[120px] -translate-x-4 -translate-y-4"></div>
          <Image
            src={aboutImage}
            alt="Crafting Jewelry"
            width={800}
            height={900}
            unoptimized
            className="w-full h-full object-cover rounded-tl-[120px] rounded-br-[120px] relative z-10 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 md:group-hover:-translate-x-8 md:group-hover:-translate-y-8"
          />
          <div className="absolute -bottom-2 -right-2 md:-bottom-10 md:-right-10 w-30 h-30 md:w-48 md:h-48 bg-[#FDF9F5] rounded-full border border-[#E8DCCB] flex flex-col items-center justify-center p-6 text-center shadow-xl z-20 animate-spin-slow">
            <span className="text-[#8C6239] custom-serif italic text-lg leading-tight">Crafted with</span>
            <span className="text-[#3B2416] font-semibold tracking-widest uppercase text-xs mt-2">Passion & Precision</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8 text-left">
          <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold">{aboutBadge}</span>
          <h2 className="text-5xl md:text-6xl custom-serif leading-[1.1] text-[#2A190F]">
            {aboutTitle}<br/>
            <span className="italic text-[#8C6239]">{aboutHighlight}</span>
          </h2>
          <p className="text-gray-600 leading-loose max-w-xl text-[15px] font-light">
            {aboutDescription}
          </p>
          <div className="flex gap-16 mt-6 border-t border-[#E8DCCB] pt-10">
            <div>
              <h3 className="text-4xl custom-serif mb-3 text-[#2A190F]">{aboutStat1Number}</h3>
              <p className="text-[11px] text-[#8C6239] uppercase tracking-[0.2em] font-medium">{aboutStat1Label}</p>
            </div>
            <div>
              <h3 className="text-4xl custom-serif mb-3 text-[#2A190F]">{aboutStat2Number}</h3>
              <p className="text-[11px] text-[#8C6239] uppercase tracking-[0.2em] font-medium">{aboutStat2Label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="py-32 bg-[#FAF5F0] px-6 md:px-16 text-center border-y border-[#E8DCCB]/50">
        <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold mb-6 block">{workflowBadge}</span>
        <h2 className="text-5xl md:text-6xl custom-serif mb-20 text-[#2A190F]">{workflowTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {workflow.map((step: any, idx: number) => {
            const Icon = workflowIcons[idx % workflowIcons.length];
            return (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`flex flex-col items-center text-center p-6 md:p-12 bg-white border transition-all duration-500 cursor-default
                  ${hoveredStep === idx ? 'border-[#8C6239] shadow-2xl -translate-y-4' : 'border-[#E8DCCB] shadow-sm'}
                `}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-colors duration-500
                  ${hoveredStep === idx ? 'bg-[#8C6239] text-white' : 'bg-[#FAF5F0] text-[#3B2416]'}
                `}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl custom-serif mb-4 text-[#2A190F]">{step.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed font-light">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-32 px-6 md:px-16 text-center max-w-[1600px] mx-auto">
        <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold mb-6 block">{productsBadge}</span>
        <h2 className="text-5xl md:text-6xl custom-serif mb-20 text-[#2A190F]">{productsTitle}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product: any, index: number) => (
            <div key={index} className="group flex flex-col text-left cursor-pointer">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#FAF5F0] mb-6 border border-[#E8DCCB]/50 group-hover:border-[#8C6239] transition-colors duration-500">
                {product.offer && (
                  <span className="absolute top-5 right-5 z-10 bg-[#3B2416] text-[#FDF9F5] text-[10px] px-4 py-1.5 tracking-[0.2em] uppercase">
                    {product.offer}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <Image 
                  src={product.image} 
                  alt={product.name}
                  width={400}
                  height={500}
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <h3 className="custom-serif text-xl mb-2 text-[#2A190F] group-hover:text-[#8C6239] transition-colors">{product.name}</h3>
              <p className="text-[#8C6239] font-medium tracking-wide">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-32 px-6 md:px-16 bg-[#FAF5F0]">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold mb-6 block">{reviewsBadge}</span>
            <h2 className="text-5xl md:text-6xl custom-serif text-[#2A190F]">{reviewsTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((review: any, index: number) => (
              <div key={index} className="bg-white p-12 border border-[#E8DCCB] relative group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                <span className="absolute -top-6 left-8 text-8xl custom-serif text-[#E8DCCB] leading-none group-hover:text-[#8C6239] transition-colors duration-500">"</span>
                <p className="text-lg custom-serif italic text-gray-600 leading-loose mb-10 relative z-10 pt-4">
                  {review.text}
                </p>
                <div className="flex flex-col border-t border-[#E8DCCB] pt-6">
                  <span className="font-semibold text-sm tracking-widest uppercase text-[#3B2416] mb-1">{review.name}</span>
                  <span className="text-[11px] text-[#8C6239] tracking-[0.1em] uppercase">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-16 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-8 pr-0 md:pr-12">
            <span className="text-xs tracking-[0.3em] text-[#8C6239] uppercase font-semibold block">{contactBadge}</span>
            <h2 className="text-5xl md:text-[4rem] custom-serif text-[#2A190F] leading-tight">{contactTitle} <br/> {contactSubtitle}</h2>
            <p className="text-gray-500 font-light leading-relaxed text-[15px] max-w-md">
              {contactDescription}
            </p>
            
            <div className="mt-8 flex gap-6">
              {facebook && facebook !== "#" && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#E8DCCB] flex items-center justify-center text-[#3B2416] hover:bg-[#8C6239] hover:text-white hover:border-[#8C6239] transition-all duration-300">
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {twitter && twitter !== "#" && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#E8DCCB] flex items-center justify-center text-[#3B2416] hover:bg-[#8C6239] hover:text-white hover:border-[#8C6239] transition-all duration-300">
                  <FaXTwitter className="w-5 h-5" />
                </a>
              )}
              {instagram && instagram !== "#" && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-[#E8DCCB] flex items-center justify-center text-[#3B2416] hover:bg-[#8C6239] hover:text-white hover:border-[#8C6239] transition-all duration-300">
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div className="bg-[#FAF5F0] p-12 lg:p-16 border border-[#E8DCCB] shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
              <div className="relative">
                <input 
                  type="text" 
                  {...register("name", { required: true })}
                  className="w-full bg-transparent border-b border-[#3B2416]/20 py-4 text-[15px] focus:outline-none focus:border-[#8C6239] transition-colors peer placeholder-transparent"
                  placeholder="Full Name"
                  id="name"
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8C6239] uppercase tracking-widest font-medium">
                  Full Name
                </label>
                {errors.name && <span className="text-red-500 text-[10px] mt-2 absolute -bottom-5 left-0 uppercase tracking-wider">Required</span>}
              </div>

              <div className="relative mt-4">
                <input 
                  type="email" 
                  {...register("email", { required: true })}
                  className="w-full bg-transparent border-b border-[#3B2416]/20 py-4 text-[15px] focus:outline-none focus:border-[#8C6239] transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                  id="email"
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8C6239] uppercase tracking-widest font-medium">
                  Email Address
                </label>
                {errors.email && <span className="text-red-500 text-[10px] mt-2 absolute -bottom-5 left-0 uppercase tracking-wider">Required</span>}
              </div>
              
              <div className="relative mt-4">
                <textarea 
                  {...register("query", { required: true })}
                  rows={3}
                  className="w-full bg-transparent border-b border-[#3B2416]/20 py-4 text-[15px] focus:outline-none focus:border-[#8C6239] transition-colors peer placeholder-transparent resize-none"
                  placeholder="Your Query"
                  id="query"
                ></textarea>
                <label htmlFor="query" className="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#8C6239] uppercase tracking-widest font-medium">
                  Your Query
                </label>
                {errors.query && <span className="text-red-500 text-[10px] mt-2 absolute -bottom-5 left-0 uppercase tracking-wider">Required</span>}
              </div>

              <button type="submit" className="mt-8 bg-[#3B2416] text-[#FDF9F5] px-10 py-5 text-[12px] tracking-[0.2em] uppercase hover:bg-[#8C6239] transition-colors flex items-center justify-center gap-3 w-full group">
                {contactButtonText}
                <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2A190F] text-[#E8DCCB] pt-24 pb-10 px-6 md:px-16 border-t-[8px] border-[#8C6239]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-16">
            <div className="flex items-center gap-3 mb-8 text-[#FDF9F5]">
              <Image
                src={companyLogo}
                alt={`${companyName} Logo`}
                width={32}
                height={32}
                unoptimized
                className="w-8 h-8 object-contain rounded-full"
              />
              <span className="text-3xl custom-serif tracking-[0.15em] font-semibold uppercase">{companyName}</span>
            </div>
            <p className="text-[14px] leading-loose opacity-70 mb-8 max-w-md font-light">
              {footerDescription}
            </p>
          </div>

          <div>
            <h4 className="text-white custom-serif text-2xl mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-5 text-[13px] uppercase tracking-wider opacity-70">
              <li><a href="#hero" className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">Home</a></li>
              <li><a href="#about" className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">About Us</a></li>
              <li><a href="#products" className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">Collections</a></li>
              <li><a href="#contact" className="hover:text-white hover:tracking-[0.2em] transition-all duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white custom-serif text-2xl mb-8">Contact Us</h4>
            <ul className="flex flex-col gap-6 text-[14px] opacity-70 font-light">
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#8C6239] mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: contactHours }} />
              </li>
              <li>
  <a
    href={`tel:${contactPhone}`}
    className="text-white/80 hover:text-white transition-colors"
  >
    {contactPhone}
  </a>
</li><li>
  <a
    href={`mailto:${contactEmail}`}
    className="text-white/80 hover:text-white transition-colors"
  >
    {contactEmail}
  </a>
</li><li className="leading-relaxed">{contactAddress}</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#E8DCCB]/10 pt-10 flex flex-col md:flex-row justify-center items-center gap-4 text-[11px] opacity-50 tracking-[0.2em] uppercase">
          <p>{footerCopyright}</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .custom-serif {
          font-family: 'Playfair Display', serif;
        }

        .custom-sans {
          font-family: 'Jost', sans-serif;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}