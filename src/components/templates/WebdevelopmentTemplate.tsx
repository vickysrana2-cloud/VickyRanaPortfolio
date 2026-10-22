"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaRocket,
  FaCloud,
  FaShieldAlt,
  FaStar,
  FaQuoteRight,
  FaUser,
  FaBriefcase,
  FaEnvelopeOpen,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  Diamond,
  Gem,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  Crown,
  Plus,
  Minus,
  Rocket as RocketIcon,
  Cloud as CloudIcon,
} from "lucide-react";
import {
  Code2,
  ShoppingCart,
  Globe,
} from "lucide-react";
import { FaWordpress } from "react-icons/fa6";
import { useForm } from "react-hook-form";

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
              else if (index === 2) result.icon = part;
              else if (index === 3) result.features = part.split(",").map((p: string) => p.trim());
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

const safeParsePortfolio = (data: any, defaultData: any[]): any[] => {
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
              title: parts[0] || "",
              category: parts[1] || "",
              image: parts[2] || "",
              description: parts[3] || "",
              technologies: parts[4].split(",").map((p: string) => p.trim()),
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
              role: parts[1] || "",
              text: parts[2] || "",
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

// Icon mapping for services
const iconMap: { [key: string]: any } = {
  FaWordpress: FaWordpress,
  FaShoppingCart: FaShoppingCart,
  Globe: Globe,
  Code2: Code2,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || FaCode;
};

// Define the interface for form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  agree: boolean;
}

export default function WebDev({ data }: { data: any }) {
  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const statsSection = data?.statsSection || {};
  const aboutSection = data?.aboutSection || {};
  const servicesSection = data?.servicesSection || {};
  const portfolioSection = data?.portfolioSection || {};
  const technologiesSection = data?.technologiesSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const contactInfo = data?.contactInfo || {};
  const socialLinks = data?.socialLinks || {};
  const footerSection = data?.footerSection || {};

  // Basic Info
  const companyName = basicInfo.companyName || "VisionCraft";
  const companyLogo = basicInfo.logo || "https://img.magnific.com/premium-vector/developers-logo-software-logo_1079321-612.jpg?semt=ais_hybrid&w=740&q=80";
  const companyTagline = basicInfo.tagline || "Build. Inspire. Grow.";

  // Hero Section
  const heroTitle = heroSection.title || "Globally Trusted";
  const heroSubtitle = heroSection.subtitle || "Tailored Web & Mobile App";
  const heroDescription = heroSection.description || "Solutions for limitless possibilities";
  const heroText = heroSection.text || "We design beautiful websites, build scalable web applications and create digital products that help brands stand out in today's competitive market.";
  const heroImage = heroSection.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUgE2LwzE62K6zVgjR56ilCnzNAX9d-91SM3Zata9d5g&s=10";

  // Stats
  const defaultStats = [
    { number: "20+", label: "Years Experience" },
    { number: "1.2k+", label: "Happy Clients" },
    { number: "5k+", label: "Projects Delivered" },
    { number: "120+", label: "Team Members" },
    { number: "99%", label: "Client Satisfaction" },
  ];
  const stats = safeParseStats(statsSection?.stats, defaultStats);

  // About Section
  const aboutBadge = aboutSection.badge || "ABOUT US";
  const aboutTitle = aboutSection.title || "Who We Are";
  const aboutDescription = aboutSection.description || "We are a team of passionate developers, designers, and strategists dedicated to building digital products that make a difference.";
  const aboutImage = aboutSection.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";
  const aboutSubtitle = aboutSection.subtitle || "Building Digital Excellence Since 1995";
  const aboutText1 = aboutSection.text1 || "VisionCraft is a premier digital solutions provider with over two decades of experience in web development, mobile applications, and digital marketing. We combine creativity with technology to deliver innovative solutions that drive business growth.";
  const aboutText2 = aboutSection.text2 || "Our team of 120+ experts works collaboratively to understand your unique business needs and craft tailored digital strategies that set you apart from the competition.";
  const aboutButtonText = aboutSection.buttonText || "Learn More About Us";

  // Services Section
  const servicesBadge = servicesSection.badge || "Our Services";
  const servicesTitle = servicesSection.title || "Premium Web Development Services That Deliver Results";
  const servicesDescription = servicesSection.description || "We build fast, secure and scalable websites that attract visitors, improve engagement and help businesses grow with modern digital experiences.";
  
  const defaultServices = [
    {
      title: "WordPress Development",
      description: "Custom WordPress websites that are fast, SEO-friendly, and easy to manage.",
      icon: "FaWordpress",
      features: ["Custom Theme Development", "Plugin Integration", "SEO Optimized", "Performance Focused"],
    },
    {
      title: "Shopify Development",
      description: "High-converting Shopify stores built for sales, scalability, and a seamless shopping experience.",
      icon: "FaShoppingCart",
      features: ["Custom Store Design", "App Integration", "Payment Gateway Setup", "Conversion Optimization"],
    },
    {
      title: "E-commerce Development",
      description: "Powerful e-commerce solutions that drive sales and improve customer satisfaction.",
      icon: "Globe",
      features: ["Custom E-commerce Solutions", "Product Management", "Secure Checkout", "Analytics & Reporting"],
    },
    {
      title: "Custom Website Development",
      description: "Tailored websites that reflect your brand and help your business grow.",
      icon: "Code2",
      features: ["Custom Design", "Responsive Layout", "Speed Optimization", "Ongoing Support"],
    },
  ];
  const services = safeParseArray(servicesSection?.services, defaultServices);

  // Portfolio Section
  const portfolioBadge = portfolioSection.badge || "OUR PORTFOLIO";
  const portfolioTitle = portfolioSection.title || "Premium Projects We've Delivered";
  const portfolioDescription = portfolioSection.description || "Explore some of our best work across various industries and technologies.";
  
  const defaultPortfolio = [
    {
      title: "EcoMart - Sustainable E-commerce",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      description: "A sustainable e-commerce platform with AI-powered product recommendations.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "HealthTrack - Patient Management",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160550-217d3ba999ef?w=800&q=80",
      description: "Comprehensive patient management system with real-time analytics.",
      technologies: ["Next.js", "Python", "PostgreSQL", "AWS"],
    },
  ];
  const portfolioData = safeParsePortfolio(portfolioSection?.projects, defaultPortfolio).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  
  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "TESTIMONIALS";
  const testimonialsTitle = testimonialsSection.title || "Don't just take our word for it.";
  const testimonialsSubtitle = testimonialsSection.subtitle || "See how we've helped businesses";
  
  const defaultTestimonials = [
    {
      name: "Michael Anderson",
      role: "Chief Executive Officer, TechNova Solutions",
      text: "Partnering with this team was one of the best decisions we made for our business. From the initial consultation to the final launch, they demonstrated exceptional professionalism, technical expertise, and attention to detail.",
    },
    {
      name: "Sophia Williams",
      role: "Marketing Director, BrightEdge Media",
      text: "The entire experience was seamless from start to finish. The team listened carefully to our ideas, transformed them into a beautiful and highly functional website, and ensured every detail matched our vision.",
    },
  ];
  const testimonialsData = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials).map((item: any, index: number) => ({
    ...item,
    id: index + 1,
  }));

  // FAQ Section
  const faqBadge = faqSection.badge || "FAQ";
  const faqTitle = faqSection.title || "Frequently Asked Questions";
  const faqDescription = faqSection.description || "Find answers to common questions about our services and process.";
  
  const defaultFaqs = [
    {
      question: "What services does VisionCraft offer?",
      answer: "We offer a comprehensive range of digital services including Web Development, Mobile App Development, UI/UX Design, Digital Marketing, Cloud Solutions, and Cyber Security.",
    },
    {
      question: "How long does it take to build a website?",
      answer: "The timeline depends on the complexity of the project. A simple website can take 2-4 weeks, while more complex web applications or e-commerce sites may take 2-6 months.",
    },
  ];
  const faqs = safeParseFaqs(faqSection?.faqs, defaultFaqs);

  // Contact Info
  const phone = contactInfo.phone || "+91 12345 67890";
  const email = contactInfo.email || "info@imageonline.co.in";
  const address = contactInfo.address || "India";
  const whatsappNumber = contactInfo.whatsapp || "911234567890";
  const formTitle = contactInfo.formTitle || "Get a Quote";
  const formButtonText = contactInfo.formButtonText || "Submit";
  const responseTime = contactInfo.responseTime || "24 Hours";
  const responseSubtext = contactInfo.responseSubtext || "We'll get back to you within 24 hours";

  // Social Links
  const facebook = socialLinks.facebook || "https://www.facebook.com/";
  const instagram = socialLinks.instagram || "https://www.instagram.com/";
  const linkedin = socialLinks.linkedin || "https://www.linkedin.com/";
  const youtube = socialLinks.youtube || "https://www.youtube.com/";

  // Footer Section
  const footerCompanyName = footerSection.companyName || "VisionCraft";
  const footerLogo = footerSection.logo || "https://img.magnific.com/premium-vector/developers-logo-software-logo_1079321-612.jpg?semt=ais_hybrid&w=740&q=80";
  const footerTagline = footerSection.tagline || "Build. Inspire. Grow.";
  const footerDescription = footerSection.description || "Building modern websites and digital products for ambitious businesses since 1995.";
  const footerQuickLinksLabel = footerSection.quickLinksLabel || "Quick Links";
  const footerFollowUsLabel = footerSection.followUsLabel || "Follow Us";
  const footerCopyright = footerSection.copyright || `© 2026 VisionCraft Pvt. Ltd. All Rights Reserved.`;

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { isSubmitting } 
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    const message = `*New Quote Request from ${companyName}*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Company:* ${data.company || 'Not specified'}%0A*Agreed to be contacted:* ${data.agree ? 'Yes' : 'No'}`;
    const phoneNumber = whatsappNumber.replace(/\+/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    reset();
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const navLinks = [
    { icon: FaHome, label: "Home", href: "#" },
    { icon: FaUser, label: "About", href: "#about" },
    { icon: FaBriefcase, label: "Services", href: "#services" },
    { icon: FaCode, label: "Portfolio", href: "#portfolio" },
    { icon: FaCode, label: "Testimonials", href: "#testimonials" },
    { icon: FaEnvelopeOpen, label: "Contact", href: "#contact" },
  ];

  // ===== SERVICES CAROUSEL STATE =====
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [serviceDirection, setServiceDirection] = useState(0);
  const [visibleServices, setVisibleServices] = useState(1);

  useEffect(() => {
    const getVisibleServices = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      return 4;
    };
    setVisibleServices(getVisibleServices());

    const handleResize = () => {
      setVisibleServices(getVisibleServices());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalServiceSlides = Math.ceil(services.length / visibleServices);
  const maxServiceIndex = totalServiceSlides - 1;

  const goToServiceSlide = (index: number) => {
    setServiceDirection(index > currentServiceIndex ? 1 : -1);
    setCurrentServiceIndex(index);
  };

  const goToServicePrevious = () => {
    const newIndex = currentServiceIndex === 0 ? maxServiceIndex : currentServiceIndex - 1;
    goToServiceSlide(newIndex);
  };

  const goToServiceNext = () => {
    const newIndex = currentServiceIndex === maxServiceIndex ? 0 : currentServiceIndex + 1;
    goToServiceSlide(newIndex);
  };

  const getVisibleServicesList = () => {
    const start = currentServiceIndex * visibleServices;
    return services.slice(start, start + visibleServices);
  };

  // ===== PORTFOLIO FILTER STATE =====
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(portfolioData.map((item: any) => item.category))];
  
  const filteredPortfolio = selectedCategory === "All" 
    ? portfolioData 
    : portfolioData.filter((item: any) => item.category === selectedCategory);

  // ===== TESTIMONIALS CAROUSEL STATE =====
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(1);

  useEffect(() => {
    const getVisibleTestimonials = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };
    setVisibleTestimonials(getVisibleTestimonials());

    const handleResize = () => {
      setVisibleTestimonials(getVisibleTestimonials());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalTestimonialSlides = Math.ceil(testimonialsData.length / visibleTestimonials);
  const maxTestimonialIndex = totalTestimonialSlides - 1;

  const goToTestimonialSlide = (index: number) => {
    setTestimonialDirection(index > currentTestimonialIndex ? 1 : -1);
    setCurrentTestimonialIndex(index);
  };

  const goToTestimonialPrevious = () => {
    const newIndex = currentTestimonialIndex === 0 ? maxTestimonialIndex : currentTestimonialIndex - 1;
    goToTestimonialSlide(newIndex);
  };

  const goToTestimonialNext = () => {
    const newIndex = currentTestimonialIndex === maxTestimonialIndex ? 0 : currentTestimonialIndex + 1;
    goToTestimonialSlide(newIndex);
  };

  const getVisibleTestimonialsList = () => {
    const start = currentTestimonialIndex * visibleTestimonials;
    return testimonialsData.slice(start, start + visibleTestimonials);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsSidebarOpen(false);
  };

  const marqueeIcons = [Diamond, Gem, Award, Sparkles, Heart, Crown];

  // ===== TECHNOLOGIES DATA =====
  const technologies = {
    frontend: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Next.js", icon: "▲", color: "#000000" },
      { name: "Vue.js", icon: "🟢", color: "#4FC08D" },
      { name: "Angular", icon: "🔴", color: "#DD0031" },
      { name: "TypeScript", icon: "📘", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", color: "#339933" },
      { name: "Python", icon: "🐍", color: "#3776AB" },
      { name: "Java", icon: "☕", color: "#007396" },
      { name: "PHP", icon: "🐘", color: "#777BB4" },
      { name: "GraphQL", icon: "📊", color: "#E10098" },
      { name: "REST APIs", icon: "🔗", color: "#FF6C37" },
    ],
    database: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
      { name: "MySQL", icon: "🐬", color: "#4479A1" },
      { name: "Redis", icon: "🔴", color: "#DC382D" },
      { name: "Firebase", icon: "🔥", color: "#FFCA28" },
      { name: "Prisma", icon: "🔮", color: "#2D3748" },
    ],
    cloud: [
      { name: "AWS", icon: "☁️", color: "#FF9900" },
      { name: "Azure", icon: "🟦", color: "#0078D4" },
      { name: "Google Cloud", icon: "🟩", color: "#4285F4" },
      { name: "Docker", icon: "🐳", color: "#2496ED" },
      { name: "Kubernetes", icon: "⚓", color: "#326CE5" },
      { name: "Vercel", icon: "▲", color: "#000000" },
    ],
  };

  // ===== DEVELOPMENT PROCESS DATA =====
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business goals, target audience, and project requirements. This phase involves thorough research and strategic planning to ensure we're aligned with your vision.",
      icon: FaPaintBrush,
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: "Our designers create wireframes and interactive prototypes that bring your ideas to life. We focus on user-centric design that delivers an exceptional experience across all devices.",
      icon: FaRocket,
    },
    {
      number: "03",
      title: "Development & Integration",
      description: "Using cutting-edge technologies and best practices, we build robust, scalable solutions. We integrate third-party services, APIs, and ensure seamless functionality.",
      icon: FaCode,
    },
    {
      number: "04",
      title: "Testing & Quality Assurance",
      description: "Rigorous testing is conducted to identify and fix any issues. We ensure your application is bug-free, secure, and performs optimally across all platforms and browsers.",
      icon: ShieldCheck,
    },
    {
      number: "05",
      title: "Launch & Deployment",
      description: "We handle the complete deployment process, ensuring a smooth transition to the live environment. Our team provides training and documentation for your team.",
      icon: RocketIcon,
    },
    {
      number: "06",
      title: "Maintenance & Support",
      description: "We provide ongoing support, updates, and maintenance to keep your application running smoothly. Our team is always available to assist with any needs that arise.",
      icon: CloudIcon,
    },
  ];

  return (
    <main className="bg-[#FCF9F5] min-h-screen overflow-x-hidden">
      {/* ================= FIXED NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] shadow-lg border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] flex items-center justify-center text-[#0A0A0A] font-bold text-xs md:text-sm overflow-hidden">
                <img 
                  src={companyLogo}
                  width={80}
                  height={60}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden xs:block">
                <h2 className="text-lg md:text-xl font-bold text-[#F5E6CA] leading-tight">
                  {companyName}
                </h2>
                <p className="text-[8px] md:text-[10px] text-[#D4AF37] font-medium tracking-wider">
                  {companyTagline}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                className="text-sm font-medium text-[#F5E6CA] hover:text-[#D4AF37] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A] px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition"
            >
              <FaPhone className="text-xs" />
              <span className="hidden md:inline">{phone}</span>
              <span className="md:hidden">Call</span>
            </a>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-[#D4AF37]/10 transition flex items-center justify-center border border-[#D4AF37]/20"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <FaTimes className="text-[#F5E6CA] text-xl" />
              ) : (
                <FaBars className="text-[#F5E6CA] text-xl" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center cursor-pointer text-[#F5E6CA] hover:scale-110 duration-300 border border-[#D4AF37]/20"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs md:text-sm" />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center cursor-pointer text-[#F5E6CA] hover:scale-110 duration-300 border border-[#D4AF37]/20"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs md:text-sm" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition items-center justify-center cursor-pointer text-[#F5E6CA] hover:scale-110 duration-300 border border-[#D4AF37]/20"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xs md:text-sm" />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition items-center justify-center cursor-pointer text-[#F5E6CA] hover:scale-110 duration-300 border border-[#D4AF37]/20"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xs md:text-sm" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-[#0A0A0A] z-50 lg:hidden shadow-2xl border-l border-[#D4AF37]/20"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      onClick={() => scrollToSection(link.href.replace("#", ""))}
                      className="flex items-center gap-3 text-[#F5E6CA] hover:text-[#D4AF37] transition py-2 border-b border-[#D4AF37]/10"
                    >
                      <link.icon className="text-[#D4AF37]" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#D4AF37]/10">
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-[#F5E6CA] hover:text-[#D4AF37] transition py-2"
                  >
                    <FaPhone className="text-[#D4AF37]" />
                    <span>{phone}</span>
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-[#F5E6CA] hover:text-[#D4AF37] transition py-2"
                  >
                    <FaEnvelope className="text-[#D4AF37]" />
                    <span className="text-sm break-all">{email}</span>
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-[#D4AF37]/10 flex gap-3">
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20">
                    <FaFacebookF />
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20">
                    <FaInstagram />
                  </a>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20">
                    <FaLinkedinIn />
                  </a>
                  <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================HERO========================== */}
      <section className="pt-16 md:pt-20 relative overflow-hidden bg-[#FCF9F5]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/20 mb-3 md:mb-4">
                {heroTitle}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[#0A0A0A]">
                {heroSubtitle}
                <br />
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] bg-clip-text text-transparent">
                  {heroDescription}
                </span>
              </h1>

              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                {heroText}
              </p>

              <button
                onClick={() => scrollToSection("contact")}
                className="mt-6 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A] rounded-full font-semibold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition flex items-center gap-2 text-sm md:text-base"
              >
                Get Started
                <FaArrowRight className="text-xs md:text-sm" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-2xl border border-[#D4AF37]/20">
                <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#D4AF37] to-[#F5E6CA] rounded-full opacity-10 blur-2xl" />
                <img
                  src={heroImage}
                  alt={heroSubtitle}
                  width={900}
                  height={700}
                  className="rounded-xl md:rounded-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE STATS SECTION ================= */}
      <div className="py-10 md:py-16 bg-[#0A0A0A] border-y border-[#D4AF37]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 text-center">
            {stats.map((stat: any, idx: number) => {
              const Icon = marqueeIcons[idx % marqueeIcons.length];
              return (
                <div key={idx} className="text-[#F5E6CA]">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#D4AF37]">{stat.number}</h1>
                  <p className="mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm tracking-wider text-[#F5E6CA]/60">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-12 md:py-20 bg-[#FCF9F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/20">
              {aboutBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 md:mt-6 text-[#0A0A0A]">
              {aboutTitle}
            </h2>
            <p className="text-gray-600 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-[15px] font-light px-4">
              {aboutDescription}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#D4AF37]/20">
                <img
                  src={aboutImage}
                  alt="Our Team"
                  width={800}
                  height={600}
                  className="rounded-xl md:rounded-2xl w-full object-cover h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0A0A0A]">
                {aboutSubtitle}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {aboutText1}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {aboutText2}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="mt-4 md:mt-6 px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A] rounded-full font-semibold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition flex items-center gap-2 text-sm md:text-base"
              >
                {aboutButtonText}
                <FaArrowRight className="text-xs md:text-sm" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION WITH CAROUSEL ================= */}
      <section id="services" className="relative overflow-hidden bg-[#0A0A0A] py-12 md:py-20">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.05),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 md:px-5 py-1.5 md:py-2">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" />
              <span className="text-[10px] md:text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
                {servicesBadge}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 md:mt-8 max-w-4xl text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-[#F5E6CA]">
              {servicesTitle}
            </h2>
            <p className="mx-auto mt-4 md:mt-6 max-w-3xl text-sm md:text-lg leading-7 md:leading-8 text-gray-400 px-4">
              {servicesDescription}
            </p>
          </motion.div>

          <div className="relative mt-10 md:mt-16">
            <div className="overflow-hidden">
              <motion.div
                key={currentServiceIndex}
                initial={{ opacity: 0, x: serviceDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -serviceDirection * 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                {getVisibleServicesList().map((service: any, index: number) => {
                  const Icon = getIcon(service.icon);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group rounded-2xl md:rounded-3xl border border-[#D4AF37]/10 bg-[#1A1A1A] p-5 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/30"
                    >
                      <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-[#D4AF37]/10 group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#F5E6CA] transition-all duration-300">
                        <Icon className="h-6 w-6 md:h-8 md:w-8 text-[#D4AF37] group-hover:text-[#0A0A0A] transition-colors" />
                      </div>

                      <h3 className="text-lg md:text-2xl font-bold text-[#F5E6CA] group-hover:text-[#D4AF37] transition-colors">
                        {service.title}
                      </h3>

                      <p className="mt-2 md:mt-3 leading-6 md:leading-7 text-gray-400 text-xs md:text-sm">
                        {service.description}
                      </p>

                      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                        {service.features && service.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 md:gap-3">
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37] flex-shrink-0" />
                            <span className="text-gray-300 text-xs md:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {totalServiceSlides > 1 && (
              <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">
                <button
                  onClick={goToServicePrevious}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A1A1A] shadow-md hover:shadow-xl transition-all flex items-center justify-center border border-[#D4AF37]/20 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] group"
                  aria-label="Previous services"
                >
                  <FaChevronLeft className="text-[#F5E6CA] text-sm md:text-base group-hover:text-[#0A0A0A] transition" />
                </button>

                <div className="flex gap-1.5 md:gap-2">
                  {Array.from({ length: totalServiceSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToServiceSlide(index)}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                        currentServiceIndex === index
                          ? "w-6 md:w-10 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA]"
                          : "w-4 md:w-8 bg-[#2A2A2A] hover:bg-[#3A3A3A]"
                      }`}
                      aria-label={`Go to service slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToServiceNext}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A1A1A] shadow-md hover:shadow-xl transition-all flex items-center justify-center border border-[#D4AF37]/20 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] group"
                  aria-label="Next services"
                >
                  <FaChevronRight className="text-[#F5E6CA] text-sm md:text-base group-hover:text-[#0A0A0A] transition" />
                </button>
              </div>
            )}

            <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-gray-500 font-medium">
              {currentServiceIndex + 1} / {totalServiceSlides}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO SECTION ================= */}
      <section id="portfolio" className="py-12 md:py-20 bg-[#FCF9F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/20">
              {portfolioBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 md:mt-6 text-[#0A0A0A]">
              {portfolioTitle}
            </h2>
            <p className="text-gray-600 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-[15px] font-light px-4">
              {portfolioDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
          >
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A] shadow-lg shadow-[#D4AF37]/20"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {filteredPortfolio.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#D4AF37] text-[#0A0A0A] px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-[#0A0A0A] group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
                    {item.technologies && item.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] md:text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-12 md:py-20 bg-[#FCF9F5]" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/20">
              {testimonialsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-4 md:mt-6 text-[#0A0A0A]">
              {testimonialsTitle}
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-1 md:mt-2">{testimonialsSubtitle}</p>
          </motion.div>

          <div className="relative mt-10 md:mt-16">
            <div className="overflow-hidden">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: testimonialDirection * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -testimonialDirection * 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {getVisibleTestimonialsList().map((testimonial: any, i: number) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-xl hover:shadow-2xl transition-all border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 relative"
                  >
                    <FaQuoteRight className="text-3xl md:text-4xl text-[#D4AF37]/10 absolute top-4 md:top-6 right-4 md:right-6" />
                    
                    <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4">
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} className="text-[#D4AF37] text-xs md:text-sm" />
                      ))}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm mb-4 md:mb-6 relative z-10 line-clamp-6 md:line-clamp-4">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] flex items-center justify-center text-[#0A0A0A] font-bold text-base md:text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#0A0A0A] text-sm md:text-base truncate">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm truncate">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">
              <button
                onClick={goToTestimonialPrevious}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md hover:shadow-xl transition-all flex items-center justify-center border border-[#D4AF37]/20 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] group"
                aria-label="Previous testimonials"
              >
                <FaChevronLeft className="text-[#0A0A0A] text-sm md:text-base group-hover:text-[#0A0A0A] transition" />
              </button>

              <div className="flex gap-1.5 md:gap-2">
                {Array.from({ length: totalTestimonialSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonialSlide(index)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      currentTestimonialIndex === index
                        ? "w-6 md:w-10 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA]"
                        : "w-4 md:w-8 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToTestimonialNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md hover:shadow-xl transition-all flex items-center justify-center border border-[#D4AF37]/20 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] group"
                aria-label="Next testimonials"
              >
                <FaChevronRight className="text-[#0A0A0A] text-sm md:text-base group-hover:text-[#0A0A0A] transition" />
              </button>
            </div>

            <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-gray-400 font-medium">
              {currentTestimonialIndex + 1} / {totalTestimonialSlides}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-12 md:py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/20">
              {faqBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 md:mt-6 text-[#F5E6CA]">
              {faqTitle}
            </h2>
            <p className="text-gray-400 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-[15px] font-light px-4">
              {faqDescription}
            </p>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#1A1A1A] rounded-xl md:rounded-2xl border transition-all duration-300 ${
                  activeFaq === index ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10" : "border-[#D4AF37]/10 hover:border-[#D4AF37]/30"
                }`}
              >
                <button
                  className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex items-center justify-between hover:bg-[#D4AF37]/5 rounded-xl md:rounded-2xl transition-colors gap-3"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className={`font-semibold text-xs sm:text-sm md:text-base ${
                    activeFaq === index ? "text-[#D4AF37]" : "text-[#F5E6CA]"
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    activeFaq === index ? "bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A]" : "bg-[#2A2A2A] text-[#F5E6CA]"
                  }`}>
                    {activeFaq === index ? <Minus size={16} className="md:w-[18px] md:h-[18px]" /> : <Plus size={16} className="md:w-[18px] md:h-[18px]" />}
                  </span>
                </button>
                <div className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? "pb-4 md:pb-6 max-h-96" : "max-h-0"
                }`}>
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed border-t border-[#D4AF37]/10 pt-3 md:pt-4">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-12 md:py-20 bg-[#FCF9F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A0A0A]">
                  {formTitle}
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#0A0A0A] mb-4 md:mb-6">
                    How can we reach you?
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        {...register("name", { required: true })}
                        className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border border-gray-200 px-3 md:px-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition bg-gray-50/50 text-gray-800 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        {...register("email", { required: true })}
                        className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border border-gray-200 px-3 md:px-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition bg-gray-50/50 text-gray-800 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder={phone}
                        {...register("phone", { required: true })}
                        className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border border-gray-200 px-3 md:px-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition bg-gray-50/50 text-gray-800 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your company name"
                        {...register("company")}
                        className="w-full h-10 md:h-12 rounded-lg md:rounded-xl border border-gray-200 px-3 md:px-4 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition bg-gray-50/50 text-gray-800 text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 flex items-start gap-2 md:gap-3">
                    <input
                      type="checkbox"
                      {...register("agree")}
                      className="w-4 h-4 md:w-5 md:h-5 mt-0.5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-2"
                    />
                    <label className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      I agree to be contacted by phone, email, or WhatsApp regarding my quote request.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 md:mt-8 px-8 md:px-10 py-2.5 md:py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] text-[#0A0A0A] rounded-full font-semibold shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition flex items-center gap-2 text-sm md:text-base"
                  >
                    {isSubmitting ? "Opening WhatsApp..." : formButtonText}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-2xl md:rounded-3xl p-6 md:p-8 sticky top-20 md:top-24 border border-[#D4AF37]/20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] flex items-center justify-center text-[#0A0A0A] text-lg md:text-xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F5E6CA] text-sm md:text-base">Need Help?</h3>
                    <p className="text-xs md:text-sm text-gray-400">We're here to assist you</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3 p-2 md:p-3 bg-[#1A1A1A] rounded-lg md:rounded-xl shadow-sm border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all">
                    <FaPhone className="text-[#D4AF37] mt-0.5 text-sm md:text-base" />
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400">Phone</p>
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-xs md:text-sm font-medium text-[#F5E6CA] hover:text-[#D4AF37] transition">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 md:p-3 bg-[#1A1A1A] rounded-lg md:rounded-xl shadow-sm border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all">
                    <FaEnvelope className="text-[#D4AF37] mt-0.5 text-sm md:text-base" />
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400">Email</p>
                      <a href={`mailto:${email}?subject=Inquiry%20from%20Website&body=Hi%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services...`} className="text-xs md:text-sm font-medium text-[#F5E6CA] hover:text-[#D4AF37] transition break-all">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 md:p-3 bg-[#1A1A1A] rounded-lg md:rounded-xl shadow-sm border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all">
                    <FaMapMarkerAlt className="text-[#D4AF37] mt-0.5 text-sm md:text-base" />
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400">Address</p>
                      <a href="https://maps.google.com/maps?q=India" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium text-[#F5E6CA] hover:text-[#D4AF37] transition">
                        {address}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] rounded-lg md:rounded-xl text-[#0A0A0A]">
                  <p className="text-xs md:text-sm font-medium">Response Time</p>
                  <p className="text-xl md:text-2xl font-bold">{responseTime}</p>
                  <p className="text-[10px] md:text-xs opacity-80 mt-0.5 md:mt-1">{responseSubtext}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0A0A0A] text-white border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5E6CA] flex items-center justify-center text-[#0A0A0A] font-bold text-sm overflow-hidden">
                  <img 
                    src={footerLogo}
                    width={80}
                    height={60}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#F5E6CA] leading-tight">{footerCompanyName}</h2>
                  <p className="text-[8px] md:text-xs text-[#D4AF37] font-medium tracking-wider">{footerTagline}</p>
                </div>
              </div>
              <p className="text-gray-400 mt-3 md:mt-4 text-sm leading-relaxed">
                {footerDescription}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-[#D4AF37] text-sm md:text-base">{footerQuickLinksLabel}</h3>
              <ul className="space-y-2 text-gray-400 text-xs md:text-sm">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-[#D4AF37] transition cursor-pointer">About</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-[#D4AF37] transition cursor-pointer">Services</button></li>
                <li><button onClick={() => scrollToSection("portfolio")} className="hover:text-[#D4AF37] transition cursor-pointer">Portfolio</button></li>
                <li><button onClick={() => scrollToSection("testimonials")} className="hover:text-[#D4AF37] transition cursor-pointer">Testimonials</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-[#D4AF37] transition cursor-pointer">Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-[#D4AF37] text-sm md:text-base">{footerFollowUsLabel}</h3>
              <div className="flex gap-2 md:gap-3 flex-wrap">
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20 hover:scale-110 duration-300">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20 hover:scale-110 duration-300">
                  <FaInstagram className="text-sm" />
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20 hover:scale-110 duration-300">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F5E6CA] hover:text-[#0A0A0A] transition flex items-center justify-center border border-[#D4AF37]/20 hover:scale-110 duration-300">
                  <FaYoutube className="text-sm" />
                </a>
              </div>

              <p className="text-gray-400 text-xs md:text-sm mt-4">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#D4AF37] transition inline-flex items-center gap-2">
                  <FaPhone className="inline text-xs" />
                  {phone}
                </a>
              </p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                <a href={`mailto:${email}?subject=Inquiry%20from%20Website`} className="hover:text-[#D4AF37] transition inline-flex items-center gap-2">
                  <FaEnvelope className="inline text-xs" />
                  {email}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[#D4AF37]/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
            {footerCopyright}
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

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

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0A0A0A;
        }

        ::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #F5E6CA;
        }

        @media (min-width: 480px) {
          .xs\\:block {
            display: block;
          }
        }
      `}} />
    </main>
  );
}