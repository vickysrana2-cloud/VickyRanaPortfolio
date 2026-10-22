"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Phone, Mail, MapPin, Sparkles, Shield, Truck, Award, Send, ArrowRight, Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

// ==================== HELPER FUNCTIONS ====================

// Safe parse for hero slides
const safeParseSlides = (data: any, defaultData: any[]): any[] => {
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
              subtitle: parts[1] || "",
              image: parts[2] || "",
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

// Safe parse for navigation items
const safeParseNavItems = (data: any, defaultData: any[]): any[] => {
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
              label: parts[0] || "",
              href: parts[1] || "#",
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

// Safe parse for features
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
          if (parts.length >= 3) {
            return {
              title: parts[0] || "",
              description: parts[1] || "",
              icon: parts[2] || "Shield",
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

// Safe parse for best selling products
const safeParseBestSelling = (data: any, defaultData: any[]): any[] => {
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
          if (parts.length >= 5) {
            return {
              name: parts[0] || "",
              price: parts[1] || "",
              rating: parseFloat(parts[2]) || 4.0,
              reviews: parseInt(parts[3]) || 0,
              image: parts[4] || "",
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

// Safe parse for trending floors
const safeParseTrending = (data: any, defaultData: any[]): any[] => {
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
              price: parts[1] || "",
              image: parts[2] || "",
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

// Safe parse for testimonials
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
              text: parts[1] || "",
              rating: parseInt(parts[2]) || 5,
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

// Icon mapping for features
const featureIconMap: { [key: string]: any } = {
  Shield: Shield,
  Sparkles: Sparkles,
  Truck: Truck,
  Award: Award,
};

const getFeatureIcon = (iconName: string) => {
  return featureIconMap[iconName] || Shield;
};

// ==================== MAIN COMPONENT ====================

export default function RoyaleTouche({ data }: { data: any }) {
  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const navItemsSection = data?.navItems || {};
  const featuresSection = data?.featuresSection || {};
  const bestSellingSection = data?.bestSellingSection || {};
  const trendingSection = data?.trendingSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const contactInfo = data?.contactInfo || {};
  const socialLinks = data?.socialLinks || {};
  const footerSection = data?.footerSection || {};

  // Basic Info
  const companyName = basicInfo.companyName || "Royale Touche";
  const companyLogo = basicInfo.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYH3gycF6w7vHU_xD_-dvUKFoXwy3QaQEOKszDX7YTN5fMTP2YaLMKs4&s=10";
  const companyTagline = basicInfo.tagline || "Pioneer of Luxury Laminates";

  // Hero Slides
  const defaultSlides = [
    {
      title: "Premium Wooden Flooring",
      subtitle: "Luxury laminates that redefine elegance",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "Pioneer of Luxury Laminates",
      subtitle: "Unmatched quality & durability",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    },
    {
      title: "Innovative VR Technology",
      subtitle: "Visualize your dream floors",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  ];
  const heroSlides = safeParseSlides(heroSection?.slides, defaultSlides).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Navigation Items
  const defaultNavItems = [
    { label: "Home", href: "#home" },
    { label: "Best Selling", href: "#best-selling" },
    { label: "Trending", href: "#trending" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const navItems = safeParseNavItems(navItemsSection?.items, defaultNavItems);

  // Features
  const defaultFeatures = [
    { title: "Premium Quality", description: "1.25mm thickness for superior durability", icon: "Shield" },
    { title: "VR Technology", description: "Visualize floors in your space", icon: "Sparkles" },
    { title: "Free Delivery", description: "Pan India delivery on orders above ₹50,000", icon: "Truck" },
    { title: "5 Year Warranty", description: "Complete peace of mind", icon: "Award" },
  ];
  const features = safeParseFeatures(featuresSection?.features, defaultFeatures);

  // Best Selling Products
  const defaultBestSelling = [
    { name: "Heritage Oak", price: "₹2,499/sq.ft", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Royal Walnut", price: "₹3,199/sq.ft", rating: 4.9, reviews: 98, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Classic Teak", price: "₹2,899/sq.ft", rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Modern Maple", price: "₹2,199/sq.ft", rating: 4.6, reviews: 87, image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Scandinavian Pine", price: "₹2,799/sq.ft", rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Italian Marble Wood", price: "₹3,599/sq.ft", rating: 4.9, reviews: 76, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  ];
  const bestSellingProducts = safeParseBestSelling(bestSellingSection?.products, defaultBestSelling).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Trending Floors
  const defaultTrending = [
    { name: "Scandinavian Pine", price: "₹2,799/sq.ft", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Italian Marble Wood", price: "₹3,599/sq.ft", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Rustic Barnwood", price: "₹2,399/sq.ft", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  ];
  const trendingFloors = safeParseTrending(trendingSection?.floors, defaultTrending).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Testimonials
  const defaultTestimonials = [
    { name: "Anjali Gajjar", text: "Nice display and good service. Excellent staff and many collections. Highly recommend!", rating: 5 },
    { name: "Sharad Parikh", text: "Very cooperative and polite staff. Explained everything deeply. Showed many varieties. Sincere thanks!", rating: 5 },
    { name: "Mitesh Gajjar", text: "Very helpful to see through VR. Really good experience!", rating: 5 },
    { name: "Dipen Bhalani", text: "Excellent range of laminates with unmatched quality. 1.25mm thickness provides superior durability.", rating: 5 },
    { name: "Manan Pathak", text: "Really good designs. Must visit for paneling and furniture woods. Amazing experience!", rating: 5 },
    { name: "Amit Kumar", text: "Thank you very much for your time and helping to select laminates for my home.", rating: 5 },
    { name: "Zeel Patel", text: "Many options available. Great customer service that helped choose the right combinations.", rating: 5 },
    { name: "Rakesh Patani", text: "Divyang guided us very well. Appreciate the efforts. So kind and supportive.", rating: 5 },
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Contact Info
  const phone = contactInfo.phone || "+91 98765 43210";
  const email = contactInfo.email || "info@royaletouche.com";
  const address = contactInfo.address || "S.G. Highway, Ahmedabad, Gujarat, India - 380054";
  const whatsappNumber = contactInfo.whatsapp || "919876543210";
  const formTitle = contactInfo.formTitle || "Send a Message";
  const formButtonText = contactInfo.formButtonText || "Send";
  const contactBadge = contactInfo.contactBadge || "Get in Touch";
  const contactTitle = contactInfo.contactTitle || "Contact Us";
  const contactHighlight = contactInfo.contactHighlight || "Us";
  const contactDescription = contactInfo.contactDescription || "We'd love to hear from you. Reach out for any queries or to schedule a visit.";

  // Contact Info Items
  const contactInfoItems = [
    {
      id: 1,
      icon: Phone,
      title: "Call Us",
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      id: 2,
      icon: Mail,
      title: "Email",
      value: email,
      href: `mailto:${email}?subject=Flooring%20Inquiry&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about...`,
    },
    {
      id: 3,
      icon: MapPin,
      title: "Location",
      value: address,
      href: "https://maps.google.com/maps?q=S.G.+Highway+Ahmedabad+Gujarat+India",
    },
  ];

  // Social Links
  const defaultSocialLinks = [
    { id: 1, icon: FaFacebookF, href: "https://www.facebook.com/", label: "Facebook" },
    { id: 2, icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
    { id: 3, icon: FaTwitter, href: "https://twitter.com/", label: "Twitter" },
    { id: 4, icon: FaYoutube, href: "https://www.youtube.com/", label: "YouTube" },
  ];

  // Footer Section
  const footerCompanyName = footerSection.companyName || "Royale Touche";
  const footerLogo = footerSection.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYH3gycF6w7vHU_xD_-dvUKFoXwy3QaQEOKszDX7YTN5fMTP2YaLMKs4&s=10";
  const footerTagline = footerSection.tagline || "Pioneer of luxury laminates in India";
  const footerDescription = footerSection.description || "Pioneer of luxury laminates in India. Premium wooden flooring solutions that redefine elegance and durability for your spaces.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerHoursLabel = footerSection.hoursLabel || "Opening Hours";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} Royale Touche. All rights reserved.`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [bestSellingIndex, setBestSellingIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-slide for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Auto-slide for best selling
  useEffect(() => {
    const interval = setInterval(() => {
      setBestSellingIndex((prev) => (prev + 1) % (bestSellingProducts.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [bestSellingProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextBestSelling = () => {
    setBestSellingIndex((prev) => (prev + 1) % (bestSellingProducts.length - 2));
  };

  const prevBestSelling = () => {
    setBestSellingIndex((prev) => (prev - 1 + (bestSellingProducts.length - 2)) % (bestSellingProducts.length - 2));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const whatsappMessage = `*New Flooring Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    const phoneNumber = whatsappNumber.replace(/\+/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
    setIsSubmitting(false);
  };

  const doubledTestimonials = [...testimonials, ...testimonials];
  const doubledFeatures = [...features, ...features];

  return (
    <div className="font-sans antialiased bg-gray-50">
      {/* Navbar - Mobile Responsive */}
      <nav className="fixed w-full z-50 bg-transparent backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center">
              <img
                src={companyLogo}
                alt={companyName}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-lg"
              />
              <div className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wider drop-shadow-lg ml-2 sm:ml-3">
                <span className="text-amber-400">{companyName.split(' ')[0]}</span> 
                <span className="hidden xs:inline">{companyName.split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-white font-medium drop-shadow-md">
            {navItems.map((item: any) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-amber-400 transition relative group text-sm lg:text-base">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Get Quote Button */}
          <button className="hidden md:block bg-amber-500 hover:bg-amber-600 text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-amber-500/30">
            <a href="#contact">Get Quote</a>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-gray-900/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item: any) => (
              <a 
                key={item.label}
                href={item.href} 
                className="block text-white hover:text-amber-400 transition py-2 border-b border-gray-700/50 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="block bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        {heroSlides.map((slide: any, index: number) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-center text-white px-4 sm:px-6 md:px-16 lg:px-24 max-w-4xl">
              <div className={`transform transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-amber-400 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wider mb-2">Premium Flooring Solutions</p>
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 drop-shadow-lg leading-tight">{slide.title}</h1>
                <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 drop-shadow-md text-gray-200">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition shadow-lg"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition shadow-lg"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-amber-400 w-6 sm:w-10' : 'bg-white/50 w-4 sm:w-6 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section - Responsive Marquee */}
      <section className="py-4 sm:py-6 md:py-8 bg-amber-600 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="relative overflow-hidden">
            <div className="flex animate-features-marquee whitespace-nowrap">
              {doubledFeatures.map((feature: any, index: number) => {
                const Icon = getFeatureIcon(feature.icon);
                return (
                  <div key={index} className="inline-flex items-center space-x-2 sm:space-x-4 mx-3 sm:mx-6 md:mx-8 flex-shrink-0 group">
                    <div className="bg-white p-1.5 sm:p-2 md:p-3 rounded-full group-hover:bg-amber-200 transition">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-700" />
                    </div>
                    <div className="text-left whitespace-normal">
                      <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-zinc-950">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Section - Responsive Carousel */}
      <section id="best-selling" className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">{bestSellingSection.badge || "Collection"}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mt-2">
              {bestSellingSection.title || "Best"} <span className="text-amber-600">{bestSellingSection.highlight || "Selling"}</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base px-4">{bestSellingSection.description || "Our most popular flooring options chosen by thousands of happy customers"}</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${bestSellingIndex * (100 / (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)` }}
              >
                {bestSellingProducts.map((product: any) => (
                  <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3">
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-amber-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">BESTSELLER</div>
                      </div>
                      <div className="p-3 sm:p-4 md:p-5">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">{product.name}</h3>
                        <p className="text-amber-600 font-bold text-base sm:text-lg md:text-xl">{product.price}</p>
                        <div className="flex items-center mt-1 sm:mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`fill-current w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} />)}
                          </div>
                          <span className="ml-2 text-xs sm:text-sm text-gray-500">({product.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevBestSelling}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition -ml-2 sm:-ml-4"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={nextBestSelling}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition -mr-2 sm:-mr-4"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Trending Floors Section - Responsive Grid */}
      <section id="trending" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">{trendingSection.badge || "Discover"}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mt-2">
              {trendingSection.title || "Trending"} <span className="text-amber-600">{trendingSection.highlight || "Floors"}</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base px-4">{trendingSection.description || "Stay ahead with the latest trends in wooden flooring design"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {trendingFloors.map((floor: any) => (
              <div key={floor.id} className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500">
                <img src={floor.image} alt={floor.name} className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white transform transition duration-300 group-hover:translate-y-[-4px] sm:group-hover:translate-y-[-8px]">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-600 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">TRENDING</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{floor.name}</h3>
                  <p className="text-amber-300 font-semibold text-base sm:text-lg md:text-xl">{floor.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Responsive Marquee */}
      <section id="testimonials" className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">{testimonialsSection.badge || "Testimonials"}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mt-2">
              {testimonialsSection.title || "What Our"} <span className="text-amber-600">{testimonialsSection.highlight || "Customers Say"}</span>
            </h2>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {doubledTestimonials.map((testimonial: any, index: number) => (
                <div key={`${testimonial.id}-${index}`} className="inline-block w-64 sm:w-72 md:w-80 lg:w-96 mx-2 sm:mx-3 flex-shrink-0">
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{testimonial.name}</h4>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-2.5 h-2.5 sm:w-3 sm:h-3" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-normal">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section - Responsive */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">{contactBadge}</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-2">
              {contactTitle} <span className="text-amber-400">{contactHighlight}</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base px-4">{contactDescription}</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            <div className="flex-1 space-y-4 sm:space-y-6 bg-gray-800/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-10">Visit Our Showroom</h3>
              
              {contactInfoItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id === 3 ? "_blank" : undefined}
                  rel={item.id === 3 ? "noopener noreferrer" : undefined}
                  className="flex items-start space-x-3 sm:space-x-4 group hover:translate-x-2 transition cursor-pointer"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mt-5 sm:mt-6 flex-shrink-0" />
                  <div className="mt-4 sm:mt-5">
                    <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
                    <p className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
              
              <div className="flex space-x-3 sm:space-x-4 pt-6 sm:pt-10 border-t border-gray-700">
                {defaultSocialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition hover:scale-110 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 space-y-3 sm:space-y-4 bg-gray-800/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{formTitle}</h3>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-amber-400 focus:outline-none text-white placeholder-gray-400 transition text-sm sm:text-base" 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-amber-400 focus:outline-none text-white placeholder-gray-400 transition text-sm sm:text-base" 
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-amber-400 focus:outline-none text-white placeholder-gray-400 transition text-sm sm:text-base" 
              />
              <textarea 
                name="message"
                placeholder="Your Message" 
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-amber-400 focus:outline-none text-white placeholder-gray-400 transition resize-none text-sm sm:text-base"
                rows={3}
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition transform hover:scale-105 w-full shadow-lg hover:shadow-amber-600/30 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? "SENDING..." : formButtonText}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section - Responsive */}
      <footer className="bg-gray-950 text-gray-300">
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <img
                    src={footerLogo}
                    alt="Royale Touche Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-lg bg-white/10 p-1.5 sm:p-2"
                  />
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider">
                    <span className="text-amber-400">{footerCompanyName.split(' ')[0]}</span> 
                    <span className="hidden xs:inline">{footerCompanyName.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {footerDescription}
                </p>
                <div className="flex space-x-3 sm:space-x-4 pt-2">
                  {defaultSocialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-amber-600 p-1.5 sm:p-2 rounded-full transition-colors duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">{footerQuickLinksLabel}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li><a href="#home" className="text-gray-400 hover:text-amber-400 transition flex items-center group text-sm sm:text-base"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition" /> Home</a></li>
                  <li><a href="#best-selling" className="text-gray-400 hover:text-amber-400 transition flex items-center group text-sm sm:text-base"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition" /> Best Selling</a></li>
                  <li><a href="#trending" className="text-gray-400 hover:text-amber-400 transition flex items-center group text-sm sm:text-base"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition" /> Trending Floors</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition flex items-center group text-sm sm:text-base"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition" /> Testimonials</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">{footerHoursLabel}</h4>
                <ul className="space-y-1.5 sm:space-y-2.5">
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Monday  -  10 AM to 6 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Tuesday  -  10 AM to 6 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Wednesday  -  10 AM to 6 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Thursday  -  10 AM to 6 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Friday  -  10 AM to 6 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Saturday  -  10 AM to 4 PM</p></li>
                  <li><p className="text-gray-400 hover:text-amber-400 transition text-xs sm:text-sm">Sunday  -  10 AM to 4 PM</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="justify-between items-center gap-4">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-400">
                {footerCopyright}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-1">{footerTagline}</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        @keyframes features-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-features-marquee {
          animation: features-marquee 20s linear infinite;
          width: fit-content;
        }
        .animate-features-marquee:hover {
          animation-play-state: paused;
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}