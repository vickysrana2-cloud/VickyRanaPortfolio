"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Truck,
  Award,
  Leaf,
  Star,
  ChevronRight,
  Heart,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Search,
  User,
  MessageCircle,
  Phone,
  Clock,
  Mail,
  ShoppingCart,
  MapPin,
  Send,
  Cake,
  Cookie,
  Coffee,
  Sparkles,
  ShieldCheck,
  Clock as ClockIcon,
  HeartHandshake,
  Wheat,
  Zap,
  Coffee as CoffeeIcon,
  CheckCircle,
  Gift,
  ThumbsUp,
  Quote,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon2,
  Crown,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaBreadSlice,
} from "react-icons/fa";

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
          if (parts.length >= 4) {
            return {
              image: parts[0] || "",
              alt: parts[1] || "",
              title: parts[2] || "",
              subtitle: parts[3] || "",
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
              description: parts[1] || "",
              image: parts[2] || "",
              tag: parts[3] || "",
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

// Safe parse for top picks
const safeParseTopPicks = (data: any, defaultData: any[]): any[] => {
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
          if (parts.length >= 7) {
            return {
              name: parts[0] || "",
              price: parts[1] || "",
              image: parts[2] || "",
              rating: parseFloat(parts[3]) || 4.0,
              reviews: parseInt(parts[4]) || 0,
              badge: parts[5] || "",
              badgeColor: parts[6] || "bg-[#F4D03F]",
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
          if (parts.length >= 6) {
            return {
              name: parts[0] || "",
              role: parts[1] || "",
              avatar: parts[2] || "",
              quote: parts[3] || "",
              rating: parseInt(parts[4]) || 5,
              date: parts[5] || "",
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

// Safe parse for FAQs
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
          if (parts.length >= 4) {
            return {
              question: parts[0] || "",
              answer: parts[1] || "",
              icon: parts[2] || "Sparkles",
              category: parts[3] || "",
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
              value: parts[0] || "",
              label: parts[1] || "",
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

// Icon mapping for FAQ icons
const faqIconMap: { [key: string]: any } = {
  Sparkles: Sparkles,
  Clock: ClockIcon,
  Cake: Cake,
  FaBreadSlice: FaBreadSlice,
  Leaf: Leaf,
};

const getFaqIcon = (iconName: string) => {
  return faqIconMap[iconName] || Sparkles;
};

// ==================== MAIN COMPONENT ====================

export default function BakerTemplate({ data }: { data: any }) {
  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const navItemsSection = data?.navItems || {};
  const aboutSection = data?.aboutSection || {};
  const statsSection = data?.statsSection || {};
  const servicesSection = data?.servicesSection || {};
  const topPicksSection = data?.topPicksSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const contactInfo = data?.contactInfo || {};
  const socialLinks = data?.socialLinks || {};
  const footerSection = data?.footerSection || {};

  // Basic Info
  const companyName = basicInfo.companyName || "Quality Bakery";
  const companyLogo = basicInfo.logo || "https://static.vecteezy.com/system/resources/thumbnails/044/812/070/small/vintage-bakery-shop-logo-on-transparent-background-png.png";
  const companyTagline = basicInfo.tagline || "Artisan Breads & Pastries";

  // Hero Slides
  const defaultSlides = [
    {
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&h=600&fit=crop&crop=center",
      alt: "Fresh baked breads",
      title: "Artisan Breads",
      subtitle: "Baked fresh daily with love",
    },
    {
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&h=600&fit=crop&crop=center",
      alt: "Assorted Pastries",
      title: "Sweet Treats",
      subtitle: "Perfect for every occasion",
    },
    {
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=600&fit=crop&crop=center",
      alt: "Sourdough bread",
      title: "Sourdough Special",
      subtitle: "36-hour fermented perfection",
    },
  ];
  const slides = safeParseSlides(heroSection?.slides, defaultSlides).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // Navigation Items
  const defaultNavItems = [
    { label: "HOME", href: "#" },
    { label: "ABOUT US", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "BEST SELLER", href: "#top-picks" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
  ];
  const navItems = safeParseNavItems(navItemsSection?.items, defaultNavItems);

  // About Section
  const aboutBadge = aboutSection.badge || "about us";
  const aboutTitle = aboutSection.title || "Where tradition meets artisan passion";
  const aboutHighlight = aboutSection.highlight || "artisan passion";
  const aboutDescription = aboutSection.description || "Since 2014, our bakery has been crafting breads and pastries that tell a story of quality, patience, and love for the craft.";
  const aboutImage1 = aboutSection.image1 || "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&h=400&fit=crop&crop=center";
  const aboutImage2 = aboutSection.image2 || "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center";
  const aboutImage3 = aboutSection.image3 || "https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg";
  const aboutImage4 = aboutSection.image4 || "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop&crop=center";

  // Stats
  const defaultStats = [
    { value: "13+", label: "Years of Baking" },
    { value: "300+", label: "Cities we Serve" },
    { value: "2000+", label: "Touch Points" },
    { value: "1M+", label: "Sourdoughs Sold" },
  ];
  const stats = safeParseStats(statsSection?.stats, defaultStats);

  // Services
  const defaultServices = [
    {
      title: "Same-day delivery",
      description: "Order before 11 AM and get your fresh bakes delivered by evening, in select cities.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center",
      tag: "Popular",
    },
    {
      title: "Custom cakes",
      description: "Celebrate with a cake designed just for you – from flavor to frosting, we make it personal.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center",
      tag: "Bestseller",
    },
    {
      title: "Clean ingredients",
      description: "Zero maida, no palm oil, and only 100% butter – because taste and health go hand in hand.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center",
      tag: "Healthy",
    },
    {
      title: "Wedding cakes",
      description: "Make your special day unforgettable with our custom-designed wedding cakes.",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=300&fit=crop&crop=center",
      tag: "Premium",
    },
    {
      title: "Artisan breads",
      description: "Hand-crafted sourdough, rye, and multigrain breads baked fresh every morning.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center",
      tag: "Signature",
    },
    {
      title: "Coffee & pastries",
      description: "Enjoy our freshly baked pastries with premium coffee blends.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center",
      tag: "New",
    },
  ];
  const services = safeParseServices(servicesSection?.services, defaultServices);

  // Top Picks
  const defaultTopPicks = [
    {
      name: "Classic Sourdough",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 234,
      badge: "Best Seller",
      badgeColor: "bg-[#F4D03F]",
    },
    {
      name: "Chocolate Chip Cookies",
      price: "$12.99",
      image: "https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg",
      rating: 4.8,
      reviews: 189,
      badge: "Top Rated",
      badgeColor: "bg-[#F9E79F]",
    },
    {
      name: "Wedding Cake (Custom)",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop&crop=center",
      rating: 5.0,
      reviews: 67,
      badge: "Premium",
      badgeColor: "bg-[#2D2D2D]",
    },
    {
      name: "Croissant Box",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 156,
      badge: "Popular",
      badgeColor: "bg-[#F4D03F]",
    },
    {
      name: "Banana Walnut Cake",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 92,
      badge: "Healthy",
      badgeColor: "bg-[#F9E79F]",
    },
    {
      name: "Sourdough Starter Kit",
      price: "$19.99",
      image: "https://thefermentationstation.com.au/cdn/shop/files/sourdough_master_kit.jpg?v=1764237082&width=1200",
      rating: 4.9,
      reviews: 78,
      badge: "DIY",
      badgeColor: "bg-[#6B7280]",
    },
  ];
  const topPicks = safeParseTopPicks(topPicksSection?.items, defaultTopPicks);

  // Testimonials
  const defaultTestimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=center",
      quote: "The sourdough from this bakery is absolutely phenomenal! The crust is perfectly crispy and the inside is so airy and flavorful.",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      name: "Michael Chen",
      role: "Wedding Planner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
      quote: "I've worked with many bakeries for weddings, but this one stands out. Their custom cakes are not only beautiful but taste incredible.",
      rating: 5,
      date: "1 month ago",
    },
    {
      name: "Emily Rodriguez",
      role: "Regular Customer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=center",
      quote: "The chocolate chip cookies are to die for! They're crispy on the outside, chewy on the inside, and packed with chocolate.",
      rating: 4,
      date: "3 weeks ago",
    },
    {
      name: "David Park",
      role: "Chef",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=center",
      quote: "As a chef, I appreciate quality ingredients and traditional techniques. This bakery delivers on both.",
      rating: 5,
      date: "2 months ago",
    },
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // FAQs
  const defaultFaqs = [
    {
      question: "Do you offer gluten-free options?",
      answer: "Yes, we have a dedicated gluten-free menu featuring sourdough, cookies, and brownies. All items are prepared in a separate area to avoid cross-contamination.",
      icon: "Sparkles",
      category: "Dietary",
    },
    {
      question: "How long does delivery take?",
      answer: "We deliver within 2-4 hours in metro cities. For other locations, we partner with local couriers to ensure freshness.",
      icon: "Clock",
      category: "Delivery",
    },
    {
      question: "Can I place a bulk order for events?",
      answer: "Absolutely! We cater to corporate events, weddings, and parties with custom menus and tasting sessions.",
      icon: "Cake",
      category: "Orders",
    },
    {
      question: "What makes your sourdough special?",
      answer: "Our sourdough is fermented for 36 hours using a wild yeast starter cultivated in-house since 2014.",
      icon: "FaBreadSlice",
      category: "Products",
    },
    {
      question: "Do you use preservatives or artificial flavors?",
      answer: "Never! We believe in clean baking. All our products are free from preservatives, artificial colors, and flavors.",
      icon: "Leaf",
      category: "Quality",
    },
  ];
  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Contact Info
  const phone = contactInfo.phone || "+1 0123 456 789";
  const email = contactInfo.email || "info@bakerytheme.com";
  const address = contactInfo.address || "123 Baker's Lane, NYC 10001";
  const whatsappNumber = contactInfo.whatsapp || "919876543210";
  const formTitle = contactInfo.formTitle || "Send us a message";
  const formButtonText = contactInfo.formButtonText || "Send";
  const contactBadge = contactInfo.contactBadge || "contact";
  const contactTitle = contactInfo.contactTitle || "We'd love to hear from you";
  const contactHighlight = contactInfo.contactHighlight || "hear from you";
  const contactDescription = contactInfo.contactDescription || "Whether you have a question about our ingredients, want to place a custom order, or just want to say hi – drop us a message.";
  const contactBgImage = contactInfo.backgroundImage || "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&h=800&fit=crop&crop=center";
  const contactImage1 = contactInfo.image1 || "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=200&h=200&fit=crop&crop=center";
  const contactImage2 = contactInfo.image2 || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop&crop=center";
  const contactImage3 = contactInfo.image3 || "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&crop=center";
  const responseText = contactInfo.responseText || "We'll respond within 24 hours via WhatsApp";

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
      href: `mailto:${email}?subject=Bakery%20Inquiry&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about...`,
    },
    {
      id: 3,
      icon: MapPin,
      title: "Location",
      value: address,
      href: "https://maps.google.com/maps?q=123+Bakers+Lane+NYC+10001",
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
  const footerCompanyName = footerSection.companyName || "Quality Bakery";
  const footerLogo = footerSection.logo || "https://static.vecteezy.com/system/resources/thumbnails/044/812/070/small/vintage-bakery-shop-logo-on-transparent-background-png.png";
  const footerDescription = footerSection.description || "Artisan breads, pastries, and cakes made with love and zero compromise. Freshly baked daily since 2014.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerVisitUsLabel = footerSection.visitUsLabel || "Visit Us";
  const footerHoursLabel = footerSection.hoursLabel || "Opening Hours";
  const footerCopyright = footerSection.copyright || `© 2026 Quality Bakery. All rights reserved.`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextService = () => {
    setServiceIndex((prev) => (prev + 1) % Math.ceil(services.length / 4));
  };

  const prevService = () => {
    setServiceIndex((prev) =>
      prev === 0 ? Math.ceil(services.length / 4) - 1 : prev - 1
    );
  };

  const totalServiceSlides = Math.ceil(services.length / 4);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const whatsappMessage = `*New Bakery Inquiry*%0A%0A*Full Name:* ${fullName}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Message:* ${message}`;
    const phoneNumber = whatsappNumber.replace(/\+/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative font-sans antialiased">
      {/* ===== TRANSPARENT NAVBAR ===== */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#F5F5F5] shadow-lg border-b border-[#F4D03F]" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <button
              className="lg:hidden text-white hover:text-[#F4D03F] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 3).map((item: any, index: number) => (
                <a
                  key={index}
                  href={item.href}
                  className={`text-sm font-semibold px-3 py-2 transition-colors relative group tracking-wide ${
                    scrolled 
                      ? (index === 0 ? "text-[#2D2D2D]" : "text-[#2D2D2D] hover:text-[#F4D03F]")
                      : "text-white hover:text-[#F4D03F]"
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#F4D03F] group-hover:w-full transition-all duration-300`}></span>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#F4D03F] flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md">
                <img
                  src={companyLogo}
                  width={80}
                  height={80}
                  alt="Bakery Logo"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(3).map((item: any, index: number) => (
                <a
                  key={index}
                  href={item.href}
                  className={`text-sm font-semibold px-3 py-2 transition-colors relative group tracking-wide ${
                    scrolled 
                      ? "text-[#2D2D2D] hover:text-[#F4D03F]"
                      : "text-white hover:text-[#F4D03F]"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#F4D03F] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20 bg-[#2D2D2D]/95 backdrop-blur-sm rounded-b-2xl">
              <div className="flex flex-col space-y-1">
                {navItems.map((item: any, index: number) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-white hover:text-[#F4D03F] hover:bg-white/10 text-sm font-semibold py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="relative h-[100vh]">
          {slides.map((slide: any, index: number) => (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="w-full h-full bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <p className="text-[#F4D03F] text-sm md:text-base font-semibold tracking-widest uppercase">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mt-2">{slide.title}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide ? "bg-[#F4D03F] w-8" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]" id="about">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F4D03F] font-semibold tracking-widest text-sm uppercase">
                {aboutBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mt-2 leading-tight">
                Where tradition meets <span className="text-[#F4D03F]">{aboutHighlight}</span>
              </h2>
              <div className="w-20 h-1 bg-[#F4D03F] mt-4 rounded-full"></div>
              <p className="text-gray-600 mt-6 leading-relaxed">
                {aboutDescription}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat: any, index: number) => (
                  <div key={index}>
                    <span className="text-2xl font-bold text-[#F4D03F]">{stat.value}</span>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={aboutImage1}
                alt="bakery interior"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img
                src={aboutImage2}
                alt="sourdough bread"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-6"
              />
              <img
                src={aboutImage3}
                alt="cookies"
                className="rounded-2xl shadow-lg w-full h-64 object-cover -mt-6"
              />
              <img
                src={aboutImage4}
                alt="baking"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services with Background Image */}
      <section className="py-16 md:py-20 relative" id="services">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1600&h=800&fit=crop&crop=center')",
          }}
        >
          <div className="absolute inset-0 bg-[#2D2D2D]/80 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#F4D03F] font-semibold tracking-widest text-sm uppercase bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
              {servicesSection.badge || "our services"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Freshly baked, <span className="text-[#F4D03F]">delivered with care</span>
            </h2>
            <p className="text-white/80 mt-3">
              From our oven to your table – every service is designed to bring artisan quality closer to you.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${serviceIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalServiceSlides }).map((_, slideIdx) => (
                  <div key={slideIdx} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                      {services
                        .slice(slideIdx * 4, slideIdx * 4 + 4)
                        .map((service: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className="group bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#F4D03F]/30 transition-all duration-500 hover:-translate-y-2 border border-white/20"
                            >
                              <div className="relative h-52 overflow-hidden">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3">
                                  <span className="bg-gradient-to-r from-[#F4D03F] to-[#E5C82A] text-[#2D2D2D] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {service.tag}
                                  </span>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="w-12 h-12 bg-[#F4D03F] rounded-xl flex items-center justify-center text-[#2D2D2D] mb-3 group-hover:scale-110 transition-transform duration-300">
                                  <Truck className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-[#2D2D2D]">{service.title}</h3>
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {totalServiceSlides > 1 && (
              <>
                <button
                  onClick={prevService}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/90 hover:bg-[#F4D03F] text-gray-700 hover:text-[#2D2D2D] p-3 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm transition-all z-10 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextService}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/90 hover:bg-[#F4D03F] text-gray-700 hover:text-[#2D2D2D] p-3 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm transition-all z-10 hover:scale-110"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: totalServiceSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setServiceIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === serviceIndex
                      ? "bg-[#F4D03F] w-10 h-2.5 shadow-lg shadow-[#F4D03F]/50"
                      : "bg-white/50 hover:bg-white/80 w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks & Best Sellers */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]" id="top-picks">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#F4D03F] font-semibold tracking-widest text-sm uppercase bg-yellow-50 px-4 py-1 rounded-full inline-block">
              {topPicksSection.badge || "top picks"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mt-4">
              Our <span className="text-[#F4D03F]">Best Sellers</span>
            </h2>
            <p className="text-gray-500 mt-3">
              Customer favorites that keep them coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-12">
            {topPicks.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-3 left-3 ${item.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {item.badge}
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-[#F4D03F] hover:bg-white transition-colors shadow-md">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#2D2D2D] text-sm truncate">{item.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(item.rating)
                              ? "text-[#F4D03F] fill-[#F4D03F]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-[#F4D03F]">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Testimonials Section */}
      <section className="py-16 md:py-20 relative overflow-hidden" id="testimonials">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=800&fit=crop&crop=center')",
          }}
        >
          <div className="absolute inset-0 bg-[#2D2D2D]/85 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
              <Quote className="w-4 h-4 text-[#F4D03F]" />
              <span className="text-[#F4D03F] font-semibold tracking-widest text-sm uppercase">
                {testimonialsSection.badge || "Testimonials"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              What Our <span className="text-[#F4D03F]">Customers Say</span>
            </h2>
            <p className="text-white/80 mt-3 max-w-2xl mx-auto">
              Real stories from real people who love our baked goods.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${testimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
                        <div className="flex items-center gap-4 mb-6">
                          <div>
                            <h4 className="font-bold text-[#2D2D2D] text-lg">{testimonial.name}</h4>
                            <p className="text-sm text-[#F4D03F] font-medium">{testimonial.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < testimonial.rating
                                        ? "text-[#F4D03F] fill-[#F4D03F]"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-400">• {testimonial.date}</span>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-[#F4D03F]">
                              <Quote className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/90 hover:bg-[#F4D03F] text-gray-700 hover:text-[#2D2D2D] p-3 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm transition-all z-10 hover:scale-110"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/90 hover:bg-[#F4D03F] text-gray-700 hover:text-[#2D2D2D] p-3 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm transition-all z-10 hover:scale-110"
            >
              <ChevronRightIcon2 className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === testimonialIndex
                      ? "bg-[#F4D03F] w-10 h-2.5 shadow-lg shadow-[#F4D03F]/50"
                      : "bg-white/40 hover:bg-white/60 w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]" id="faq">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F4D03F]/10 px-4 py-1.5 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-[#F4D03F]" />
              <span className="text-[#F4D03F] font-semibold tracking-wider text-xs uppercase">
                {faqSection.badge || "FAQ"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
              Frequently Asked <span className="text-[#F4D03F]">Questions</span>
            </h2>
            <p className="text-gray-500 mt-3">
              Quick answers to common questions about our bakery.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, index: number) => {
              const Icon = getFaqIcon(faq.icon);
              const isActive = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${
                    isActive ? "border-[#F4D03F] shadow-lg" : "border-gray-100"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center gap-4 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? "bg-[#F4D03F] text-[#2D2D2D]" : "bg-gray-100 text-[#F4D03F]"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`flex-1 font-semibold text-[#2D2D2D] ${
                      isActive ? "text-[#F4D03F]" : ""
                    }`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#F4D03F] transition-transform duration-300 flex-shrink-0 ${
                      isActive ? "rotate-180" : ""
                    }`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-48" : "max-h-0"
                  }`}>
                    <div className="px-6 pb-5 pt-0">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact with Clear Background Image */}
      <section className="py-16 md:py-20 relative" id="contact">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${contactBgImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-[#2D2D2D]/70 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
                <MessageCircle className="w-4 h-4 text-[#F4D03F]" />
                <span className="text-[#F4D03F] font-semibold tracking-widest text-sm uppercase">
                  {contactBadge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
                {contactTitle}
              </h2>
              <p className="text-white/90 mt-4 leading-relaxed">
                {contactDescription}
              </p>

              <div className="grid grid-cols-3 gap-3 mt-8">
                <img
                  src={contactImage1}
                  alt="Bakery"
                  className="rounded-xl w-full h-24 object-cover shadow-lg border-2 border-white/20 hover:scale-105 transition-transform duration-300"
                />
                <img
                  src={contactImage2}
                  alt="Pastry"
                  className="rounded-xl w-full h-24 object-cover shadow-lg border-2 border-white/20 hover:scale-105 transition-transform duration-300"
                />
                <img
                  src={contactImage3}
                  alt="Bread"
                  className="rounded-xl w-full h-24 object-cover shadow-lg border-2 border-white/20 hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-4 mt-8">
                {contactInfoItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.id === 3 ? "_blank" : undefined}
                    rel={item.id === 3 ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl hover:bg-white/25 transition-all duration-300 border border-white/10 hover:border-white/20 group"
                  >
                    <div className="w-12 h-12 bg-[#F4D03F]/30 rounded-full flex items-center justify-center text-[#F4D03F] flex-shrink-0 backdrop-blur-sm group-hover:bg-[#F4D03F]/50 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/30">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-gradient-to-b from-[#F4D03F] to-[#E5C82A] rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#2D2D2D]">{formTitle}</h3>
                <Gift className="w-5 h-5 text-[#F4D03F] ml-auto" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Full name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#F4D03F] focus:border-transparent transition bg-white/80 hover:border-[#F4D03F] text-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 234 567 890"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#F4D03F] focus:border-transparent transition bg-white/80 hover:border-[#F4D03F] text-black"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700">Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#F4D03F] focus:border-transparent transition bg-white/80 hover:border-[#F4D03F] text-black"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#F4D03F] focus:border-transparent transition resize-none bg-white/80 hover:border-[#F4D03F] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 bg-[#F4D03F] hover:bg-[#E5C82A] text-[#2D2D2D] font-semibold px-8 py-3 rounded-full transition shadow-lg shadow-[#F4D03F]/30 w-full flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? "SENDING..." : formButtonText}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  {responseText}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Clean & Minimal */}
      <footer className="bg-[#2D2D2D] text-gray-300 pt-16 pb-6" id="footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-gray-700/50">
            
            {/* Brand Column */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={footerLogo}
                  width={80}
                  height={80}
                  alt={footerCompanyName}
                />  
                <span className="text-2xl font-serif font-extrabold text-[#F4D03F]">
                  Quality <span className="text-white">Bakery</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                {footerDescription}
              </p>
              <div className="flex gap-2 mt-5">
                {defaultSocialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-[#F4D03F] hover:text-[#2D2D2D] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#F4D03F]/20"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {footerQuickLinksLabel}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#about" className="text-sm text-gray-400 hover:text-[#F4D03F] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-gray-400 hover:text-[#F4D03F] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#top-picks" className="text-sm text-gray-400 hover:text-[#F4D03F] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-gray-400 hover:text-[#F4D03F] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4D03F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Visit Us */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {footerVisitUsLabel}
              </h4>
              <ul className="space-y-3">
                {contactInfoItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target={item.id === 3 ? "_blank" : undefined}
                      rel={item.id === 3 ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 text-sm text-gray-400 hover:text-[#F4D03F] transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-[#F4D03F] mt-0.5 flex-shrink-0" />
                      <span>{item.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {footerHoursLabel}
              </h4>
              <ul className="space-y-2.5">
                <li className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#F4D03F] opacity-60" />
                    Monday - Friday
                  </span>
                  <span className="text-white font-medium">7:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#F4D03F] opacity-60" />
                    Saturday
                  </span>
                  <span className="text-white font-medium">8:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#F4D03F] opacity-60" />
                    Sunday
                  </span>
                  <span className="text-[#F4D03F] font-semibold">Closed</span>
                </li>
                <li className="mt-2 pt-2 border-t border-gray-700/50 flex justify-between text-sm text-gray-400">
                  <span className="text-[#F4D03F]">✦ Special Orders</span>
                  <span className="text-white font-medium">24/7 Available</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Centered */}
          <div className="pt-6 text-center">
            <span className="text-sm text-gray-500">
              {footerCopyright}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}