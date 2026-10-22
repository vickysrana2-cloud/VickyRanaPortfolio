"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle,
  Award,
  Leaf,
  TreePine,
  SprayCan,
  Sparkles,
  Ruler,
  Recycle,
  Sprout,
  Sun,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import { useState, useEffect } from "react";

// ==================== HELPER FUNCTIONS ====================

// Safe parse for transforming spaces
const safeParseTransformingSpaces = (data: any, defaultData: any[]): any[] => {
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
          if (parts.length >= 6) {
            return {
              title: parts[0] || "",
              description: parts[1] || "",
              icon: parts[2] || "Sprout",
              points: parts[3].split(",").map((p: string) => p.trim()),
              image: parts[4] || "",
              number: parts[5] || "01",
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

// Safe parse for services
const safeParseServices = (data: any, defaultData: any[]): any[] => {
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
              title: parts[0] || "",
              icon: parts[1] || "TreePine",
              points: parts[2].split(",").map((p: string) => p.trim()),
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

// Safe parse for why choose us reasons
const safeParseReasons = (data: any, defaultData: any[]): any[] => {
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

// Safe parse for gallery items
const safeParseGallery = (data: any, defaultData: any[]): any[] => {
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
              title: parts[0] || "",
              description: parts[1] || "",
              image: parts[2] || "",
              categories: parts[3].split(",").map((p: string) => p.trim()),
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

// Safe parse for stats
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
          if (parts.length >= 2) {
            return {
              number: parts[0] || "",
              title: parts[1] || "",
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

// Icon mapping for transforming spaces
const spaceIconMap: { [key: string]: any } = {
  Sprout: Sprout,
  Leaf: Leaf,
  SprayCan: SprayCan,
  Ruler: Ruler,
};

const getSpaceIcon = (iconName: string) => {
  return spaceIconMap[iconName] || Sprout;
};

// Icon mapping for services
const serviceIconMap: { [key: string]: any } = {
  TreePine: TreePine,
  Recycle: Recycle,
  Award: Award,
  Sun: Sun,
  Users: Users,
  SprayCan: SprayCan,
};

const getServiceIcon = (iconName: string) => {
  return serviceIconMap[iconName] || TreePine;
};

// Icon mapping for why choose us
const reasonIconMap: { [key: string]: any } = {
  Shield: Shield,
  Sparkles: Sparkles,
  Users: Users,
};

const getReasonIcon = (iconName: string) => {
  return reasonIconMap[iconName] || Shield;
};

// ==================== MAIN COMPONENT ====================

export default function GreenLeafTreeCare({ data }: { data: any }) {
  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const transformingSpacesSection = data?.transformingSpacesSection || {};
  const servicesSection = data?.servicesSection || {};
  const whyChooseUsSection = data?.whyChooseUsSection || {};
  const statsSection = data?.statsSection || {};
  const gallerySection = data?.gallerySection || {};
  const contactInfo = data?.contactInfo || {};
  const socialLinks = data?.socialLinks || {};
  const footerSection = data?.footerSection || {};

  // Basic Info
  const companyName = basicInfo.companyName || "GreenLeaf";
  const companyLogo = basicInfo.logo || "https://thumbs.dreamstime.com/b/green-leaf-leaves-logo-use-your-brand-product-other-needs-you-can-add-text-name-even-edit-98757070.jpg";
  const companyTagline = basicInfo.tagline || "Expert Tree Care For Every Need";

  // Hero Section
  const heroBadge = heroSection.badge || "Mumbai's Premier Tree Care Specialists";
  const heroTitle = heroSection.title || "Expert Tree Care";
  const heroHighlight = heroSection.highlight || "For Every Need";
  const heroDescription = heroSection.description || "Experience excellence in tree care with our dedicated team, state-of-the-art equipment, and round-the-clock service for all your landscaping needs.";
  const heroButtonText = heroSection.buttonText || "Get Free Quote";
  const heroSecondaryButtonText = heroSection.secondaryButtonText || "Explore Services";
  const heroBackgroundImage = heroSection.backgroundImage || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80";

  const heroStats = [
    { number: heroSection.stat1Number || "20+", label: heroSection.stat1Label || "Years Experience" },
    { number: heroSection.stat2Number || "1000+", label: heroSection.stat2Label || "Projects Done" },
    { number: heroSection.stat3Number || "100%", label: heroSection.stat3Label || "Satisfaction" },
  ];

  // Hero Images (static - could be made dynamic if needed)
  const heroImages = [
    {
      id: 1,
      src: "https://media.istockphoto.com/id/478261537/photo/arborist-tree-pruning-service-working-on-high-branches.jpg?s=612x612&w=0&k=20&c=W89b8x269Sxpz_Pa6Yi9m5LCNYFKAmz6YaeE8v3Py9Y=",
      alt: "Tree cutting",
    },
    {
      id: 2,
      src: "https://www.gotreequotes.com.au/wp-content/uploads/2021/07/Questions-to-ask-tree-pruning-services-trimming.jpg",
      alt: "Pruning",
    },
    {
      id: 3,
      src: "https://t3.ftcdn.net/jpg/05/34/34/92/360_F_534349268_XLErmUsNRNWmBU2f5fBn7z29oP7CNYkW.jpg",
      alt: "Hedge trimming",
    },
    {
      id: 4,
      src: "https://media.istockphoto.com/id/1419427334/photo/banner-a-human-lawn-mower-cuts-the-grass-in-the-backyard-agricultural-machinery-for-the-care.jpg?s=612x612&w=0&k=20&c=uC5UpUt2S2Sr7SbpDCCyxaWAWOkrZ8CcuLhshNhTLUs=",
      alt: "Garden",
    },
  ];

  // Transforming Spaces
  const defaultTransformingSpaces = [
    {
      title: "Garden/Urban",
      description: "We provide expert garden design and maintenance, from potted plants to complete garden makeovers.",
      icon: "Sprout",
      points: ["Garden Design", "Garden Maintenance", "Garden Makeovers"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
      number: "01"
    },
    {
      title: "Artificial Plants",
      description: "We provide artificial plants and trees for your garden or landscape.",
      icon: "Leaf",
      points: ["Artificial Plants", "Artificial Trees", "Artificial Flowers"],
      image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=600&q=80",
      number: "02"
    },
  ];
  const transformingSpaces = safeParseTransformingSpaces(transformingSpacesSection?.spaces, defaultTransformingSpaces).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Services
  const defaultServices = [
    {
      title: "Landscape Design",
      icon: "TreePine",
      points: ["Custom Design Plans", "Professional Installation", "Sustainable Solutions"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80"
    },
    {
      title: "Lawn Care",
      icon: "Recycle",
      points: ["Regular Maintenance", "Lawn Care Services", "Year-round Care"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80"
    },
    {
      title: "Hardscaping",
      icon: "Award",
      points: ["Patio Design", "Walkway Installation", "Terrace Construction"],
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80"
    },
    {
      title: "Terrace Transformation",
      icon: "Sun",
      points: ["Modern Design", "Low-maintenance Plants", "Space Optimization"],
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80"
    },
  ];
  const services = safeParseServices(servicesSection?.services, defaultServices).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Why Choose Us
  const defaultReasons = [
    {
      title: "Expert Care",
      description: "Your plants are as living as humans, and need a lot of love and care. In the hands of our experts, your plants are safe and will grow healthy.",
      icon: "Shield",
    },
    {
      title: "Craftsmanship",
      description: "We at Green Leaf Tree Care are proud to offer carefully designed landscapes crafted to suit our commercial clients' preferences while prioritizing sustainability.",
      icon: "Sparkles",
    },
    {
      title: "Customer Satisfaction",
      description: "We deliver satisfaction through our comprehensive range of expert landscaping services, including both residential and commercial landscaping.",
      icon: "Users",
    },
  ];
  const whyChooseUs = safeParseReasons(whyChooseUsSection?.reasons, defaultReasons).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Stats
  const defaultStats = [
    { number: "20+", title: "Years of Excellence" },
    { number: "1000+", title: "Happy Clients" },
    { number: "500+", title: "Projects Completed" },
    { number: "20+", title: "Expert Team Members" },
  ];
  const stats = safeParseStats(statsSection?.stats, defaultStats).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Gallery
  const defaultGallery = [
    {
      title: "Tree Transplantation Project",
      description: "Successful relocation of mature trees in Mumbai residential area",
      image: "https://www.treescapes.in/wp-content/uploads/2025/05/image.jpeg",
      categories: ["Tree Care", "Transplantation"],
    },
    {
      title: "Modern Garden Design",
      description: "Contemporary landscape design for luxury apartment complex",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
      categories: ["Landscape", "Modern Design"],
    },
    {
      title: "Urban Balcony Transformation",
      description: "Space-efficient vertical garden installation for urban home",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      categories: ["Urban", "Vertical Garden"],
    },
  ];
  const galleryItems = safeParseGallery(gallerySection?.items, defaultGallery).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Contact Info
  const phone = contactInfo.phone || "+91 98765 43210";
  const email = contactInfo.email || "info@greenleaftreecare.in";
  const address = contactInfo.address || "Mumbai, Maharashtra, India";
  const whatsappNumber = contactInfo.whatsapp || "919876543210";
  const workingHours = contactInfo.workingHours || "10 AM - 7 PM (All Days)";
  const formTitle = contactInfo.formTitle || "CONTACT US FOR A QUOTE";
  const formButtonText = contactInfo.formButtonText || "SUBMIT";
  const companySlogan = contactInfo.companySlogan || "Brooklyn, Queens, Bronx, Staten Island, Manhattan, Nassau & Suffolk's #1 Tree Experts";
  const contactHeroTitle = contactInfo.heroTitle || "GREENLEAF TREE CARE";

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
      href: `mailto:${email}?subject=Tree%20Care%20Inquiry&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about...`,
    },
    {
      id: 3,
      icon: MapPin,
      title: "Location",
      value: address,
      href: "https://maps.google.com/maps?q=Mumbai,+Maharashtra,+India",
    },
    {
      id: 4,
      icon: Clock,
      title: "Working Hours",
      value: workingHours,
      href: "#",
    },
  ];

  // Social Links
  const defaultSocialLinks = [
    { id: 1, icon: FaFacebookF, href: "https://www.facebook.com/", label: "Facebook" },
    { id: 2, icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
    { id: 3, icon: FaTwitter, href: "https://twitter.com/", label: "Twitter" },
    { id: 4, icon: FaLinkedinIn, href: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  // Footer Section
  const footerCompanyName = footerSection.companyName || "GreenLeaf";
  const footerLogo = footerSection.logo || "https://thumbs.dreamstime.com/b/green-leaf-leaves-logo-use-your-brand-product-other-needs-you-can-add-text-name-even-edit-98757070.jpg";
  const footerDescription = footerSection.description || "Expert Tree Care & Maintenance in Mumbai. Transforming spaces naturally since 2022.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerContactLabel = footerSection.contactLabel || "Contact Info";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} Green Leaf Tree Care Services. All Rights Reserved.`;

  // Navigation Items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  interface ContactFormData {
    fullName: string;
    phone: string;
    email: string;
    service: string;
    message: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    const message = `*New Service Inquiry*%0A%0A*Full Name:* ${data.fullName}%0A*Phone:* ${data.phone}%0A*Email:* ${data.email}%0A*Service Type:* ${data.service || 'Not specified'}%0A*Message:* ${data.message}`;
    const phoneNumber = whatsappNumber.replace(/\+/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    reset();
  };

  const nextSlide = () => {
    const totalSlides = Math.ceil(services.length / visibleCards);
    if (current < totalSlides - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* =========================NAVBAR========================== */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-100"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            <Link
              href="/"
              className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-green-100 overflow-hidden flex items-center justify-center border-2 border-green-200">
                <img 
                  src={companyLogo} 
                  alt={companyName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span>
                Green<span className="text-green-600">Leaf</span>
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 hover:text-green-600 transition-colors duration-300 font-medium text-sm relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="hidden lg:flex bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-green-300 text-sm"
            >
              Get Free Quote
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-slate-700 hover:text-green-600 transition-colors p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {open && (
            <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-slate-700 hover:text-green-600 transition-colors font-medium text-sm py-2"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block mt-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2.5 rounded-full font-medium text-sm w-full text-center"
              >
                Get Free Quote
              </a>
            </div>
          )}
        </div>
      </header>

      {/* =========================HERO========================== */}
      <section
        id="home"
        className="relative min-h-screen pt-14 sm:pt-16 md:pt-20 flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroBackgroundImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/80 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-green-100 mb-4 sm:mb-6">
                <Award size={16} className="flex-shrink-0" />
                <span>{heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                {heroTitle}
                <span className="block text-green-300">{heroHighlight}</span>
              </h1>

              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-7 md:leading-8 text-green-50">
                {heroDescription}
              </p>

              <div className="mt-5 sm:mt-6 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-green-600 to-green-500 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-white font-medium hover:shadow-xl transition text-sm sm:text-base"
                >
                  {heroButtonText}
                </a>

                <a
                  href="#services"
                  className="rounded-full border border-green-300/50 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-white hover:bg-white/10 transition text-sm sm:text-base"
                >
                  {heroSecondaryButtonText}
                </a>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-12 flex items-center justify-center lg:justify-start gap-6 sm:gap-8">
                {heroStats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">
                        {stat.number}
                      </h3>
                      <p className="text-xs sm:text-sm text-green-100">
                        {stat.label}
                      </p>
                    </div>
                    {index < heroStats.length - 1 && (
                      <div className="w-px h-8 sm:h-10 md:h-12 bg-green-400/30" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right - Image Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex flex-col gap-4">
                  {heroImages.slice(0, 2).map((img) => (
                    <div key={img.id} className={`overflow-hidden rounded-2xl shadow-xl ${img.id === 1 ? 'h-56' : 'h-72'}`}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  {heroImages.slice(2).map((img) => (
                    <div key={img.id} className={`overflow-hidden rounded-2xl shadow-xl ${img.id === 3 ? 'h-72' : 'h-56'}`}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================TRANSFORMING SPACES========================== */}
      <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {transformingSpacesSection.title || "Transforming Spaces Naturally"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8">
              {transformingSpacesSection.description || "Green Leaf Tree Care Services offers a comprehensive range of landscaping solutions that cater to diverse client needs. Our expertise in landscape design and installation ensures that every space reflects the client's vision while prioritizing sustainability."}
            </p>
            <p className="text-green-700 font-semibold mt-3 text-sm sm:text-base">
              {transformingSpacesSection.subDescription || "From design to maintenance, we're here for you."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {transformingSpaces.map((space: any) => {
              const Icon = getSpaceIcon(space.icon);
              return (
                <div key={space.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-green-200 group">
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-green-700">{space.number}</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-green-700 transition-colors duration-300">
                        {space.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {space.description}
                    </p>
                    <ul className="space-y-2">
                      {space.points.map((point: string) => (
                        <li key={point} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================OUR SERVICES========================== */}
      <section
        id="services"
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800">
              {servicesSection.title || "Our Services"}
            </h2>
            <p className="text-green-700 text-base sm:text-lg md:text-xl mt-3 sm:mt-5">
              {servicesSection.description || "Comprehensive tree care solutions for every need"}
            </p>
          </motion.div>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute -left-3 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={current === 0}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-3 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={current >= Math.ceil(services.length / visibleCards) - 1}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {services
                .slice(current * visibleCards, current * visibleCards + visibleCards)
                .map((service: any) => {
                  const Icon = getServiceIcon(service.icon);
                  return (
                    <div key={service.id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-green-100 h-full">
                      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 md:p-6">
                        <ul className="space-y-2.5 sm:space-y-3">
                          {service.points.map((point: string) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-600 flex-shrink-0 mt-1.5"></div>
                              <span className="text-sm sm:text-base text-gray-700 font-medium leading-snug">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 gap-2 sm:gap-3">
              {Array.from({
                length: Math.ceil(services.length / visibleCards),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 sm:w-10 h-2 sm:h-3 bg-green-600"
                      : "w-2 sm:w-3 h-2 sm:h-3 bg-green-200 hover:bg-green-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================WHY CHOOSE US========================== */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {whyChooseUsSection.title || "Why Choose Us"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8">
              {whyChooseUsSection.description || "Green Leaf Tree Care services is a one stop window, providing sustainable green spaces to individuals and commercial property holders. We provide end to end solutions for all your plant care needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-auto">
              <img
                src={whyChooseUsSection.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"}
                alt="Our Philosophy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {whyChooseUsSection.philosophyTitle || "Our Philosophy"}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                      {whyChooseUsSection.philosophyText || "The year 2022 saw the birth of Green Leaf Tree Care. The motto was to bring the benefits of green makeovers, Tree services, and delivering quality plants to its greater heights. To every doorstep as they say."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              {whyChooseUs.map((item: any) => {
                const Icon = getReasonIcon(item.icon);
                return (
                  <div key={item.id} className="bg-slate-50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center border-t border-slate-200 pt-8 sm:pt-12">
            {stats.map((stat: any) => (
              <div key={stat.id}>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================GALLERY SECTION========================== */}
      <section id="gallery" className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <span className="inline-block bg-green-100 text-green-700 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-green-200">
              {gallerySection.badge || "Our Gallery"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-6 text-slate-900">
              {gallerySection.title || "Recent Projects"}
            </h2>
            <p className="text-slate-600 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-[15px] font-light px-4">
              {gallerySection.description || "Explore our recent transformations and see how we bring nature to life."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item: any) => (
              <div 
                key={item.id}
                className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:border-green-200 transition-all hover:-translate-y-2 hover:shadow-2xl duration-300"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {item.categories.map((category: string) => (
                      <span key={category} className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================CONTACT========================== */}
      <section id="contact" className="py-12 sm:py-16 bg-gradient-to-b from-green-900 to-green-800 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzOgINUde49EMPWhXZk22JYq8gwNcIhI_NNjGivdGo7cKxQx1TCjPF5fk&s=10')",
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {contactHeroTitle}
              </h2>

              <p className="mt-4 sm:mt-6 text-green-200 text-base sm:text-lg leading-relaxed max-w-lg">
                {companySlogan}
              </p>

              <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
                {contactInfoItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-950 flex items-center justify-center border border-green-500 flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-green-300 text-xs sm:text-sm font-medium">{item.title}</p>
                      <a
                        href={item.href}
                        target={item.id === 3 ? "_blank" : undefined}
                        rel={item.id === 3 ? "noopener noreferrer" : undefined}
                        className="text-white text-sm sm:text-base md:text-lg font-semibold hover:text-green-300 transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-800 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border border-green-500/20">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {formTitle}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <div>
                  <input
                    {...register("fullName")}
                    placeholder="Full name"
                    className="w-full rounded-xl bg-white border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 text-black placeholder:text-black/50 outline-none transition text-sm"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="w-full rounded-xl bg-white border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 text-black placeholder:text-black/50 outline-none transition text-sm"
                  />
                </div>

                <div>
                  <input
                    {...register("phone")}
                    placeholder="Phone"
                    className="w-full rounded-xl bg-white border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 text-black placeholder:text-black/50 outline-none transition text-sm"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    {...register("message")}
                    placeholder="What can we help you with?"
                    className="w-full rounded-xl bg-white border border-white/20 px-4 sm:px-5 py-3 sm:py-3.5 text-black placeholder:text-black/50 outline-none transition text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 text-white hover:bg-green-700 font-bold py-3 sm:py-3.5 rounded-xl transition text-sm uppercase tracking-wider"
                >
                  {isSubmitting ? "SENDING..." : formButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================FOOTER========================== */}
      <footer className="bg-slate-900 text-white pt-8 sm:pt-10 md:pt-20 pb-4 sm:pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-green-100 overflow-hidden flex items-center justify-center border-2 border-green-200">
                  <img 
                    src={footerLogo} 
                    alt={footerCompanyName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>
                  Green<span className="text-green-400">Leaf</span>
                </span>
              </h2>
              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base text-slate-300 leading-relaxed sm:leading-8">
                {footerDescription}
              </p>

              <div className="flex gap-3 mt-4 sm:mt-6 md:mt-8">
                {defaultSocialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={14} className="sm:text-base" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">
                {footerQuickLinksLabel}
              </h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm sm:text-base text-slate-300 hover:text-green-400 transition-colors block py-1"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">
                {footerContactLabel}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfoItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <item.icon className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                    <a
                      href={item.href}
                      target={item.id === 3 ? "_blank" : undefined}
                      rel={item.id === 3 ? "noopener noreferrer" : undefined}
                      className="text-sm sm:text-base text-slate-300 hover:text-green-400 transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 sm:mt-8 md:mt-16 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm md:text-base text-slate-400">
            {footerCopyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {whatsappNumber && (
        <a
          href={`https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(
            `Hello ${companyName}, I'd like to request a quote for tree care services.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      )}
    </main>
  );
}