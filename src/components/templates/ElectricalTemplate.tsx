'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Zap,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Mail,
  MapPin,
  Menu,
  X,
  Settings,
  Quote,
  Compass,
  Wrench,
  PackageCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */

interface ContactFormInputs {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

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
        // EXPECTING: name | category | price | description | image
        if (parts.length >= 5) {
          return {
            name: parts[0] || "",
            category: parts[1] || "",
            price: parts[2] || "",
            description: parts[3] || "",
            image: parts[4] || "",
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
        if (parts.length >= 3) {
          return {
            step: parts[0] || "",
            title: parts[1] || "",
            description: parts[2] || "",
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
            client: parts[1] || "",
            company: parts[2] || "",
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
      const items = data.split(",").map((item) => item.trim()).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function VoltEdgeSPA({ data }: { data?: any }) {
  // console.log("Received data:", data);

  // Extract data from config
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const equipmentSection = data?.equipmentSection || {};
  const workflowSection = data?.workflowSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const contactSection = data?.contactSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};
  const marqueeSection = data?.marqueeSection || {};

  // Default values - Basic Info (Single source of truth)
  const companyName = basicInfo.companyName || "VoltEdge";
  const companyLogo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";

  // Nav Links - Hardcoded (as requested)
  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Equipment", href: "expertise" },
    { name: "Process", href: "workflow" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ];

  // Hero Section
  const heroBadge = heroSection.badge || "Industrial OEM Manufacturer";
  const heroTitle = heroSection.title || "Heavy-Duty Electrical Equipment For";
  const heroHighlight = heroSection.highlight || "Critical Infrastructure";
  const heroDescription = heroSection.description ||
    "Engineered switchgear, motor control centers, and power distribution systems built for continuous industrial uptime.";
  const heroButtonText = heroSection.buttonText || "Explore Equipment";
  const heroSecondaryButtonText = heroSection.secondaryButtonText || "Our Process";
  const heroImage = heroSection.image ||
    "https://blog.enerpac.com/wp-content/uploads/2026/04/heavy-equipment-handling-solutions-data-center-1.png";
  const heroCertBadge = heroSection.certBadge || "UL 508A Certified";
  const heroCertSub = heroSection.certSub || "Arc-Flash Mitigated";

  // Hero Stats
  const stat1Number = heroSection.stat1Number || "24+";
  const stat1Label = heroSection.stat1Label || "Years Experience";
  const stat2Number = heroSection.stat2Number || "500+";
  const stat2Label = heroSection.stat2Label || "Industrial Clients";
  const stat3Number = heroSection.stat3Number || "99.9%";
  const stat3Label = heroSection.stat3Label || "Uptime Guaranteed";

  const heroStats = [
    { value: stat1Number, label: stat1Label },
    { value: stat2Number, label: stat2Label },
    { value: stat3Number, label: stat3Label },
  ];

  // Marquee Section
  const defaultMarquee = [
    "UL 508A Certified",
    "ISO 9001:2015",
    "Arc-Flash Mitigated",
    "Zero Downtime Tech",
    "24/7 Support",
    "Robotic Fabrication",
  ];
  const marqueeItems = safeParseMarquee(marqueeSection?.marqueeItems, defaultMarquee);

  // About Section
  const aboutBadge = aboutSection.badge || "About Us";
  const aboutTitle = aboutSection.title || "Engineering Electrical Reliability Since 2002";
  const aboutDescription = aboutSection.description ||
    "VoltEdge is a premier OEM manufacturer of heavy-duty electrical equipment. We operate an automated fabrication plant equipped with robotic CNC busbar processing and high-voltage testing labs.";
  const aboutSubDescription = aboutSection.subDescription ||
    "Our mission: eliminate infrastructure failure. By merging heavy-duty fabrication with smart telemetry, we empower industries to run continuously without compromise.";
  const aboutImage = aboutSection.image ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5-r0b1LjKvyOXTXfs8Ybc3xOZ_qr5TTkjtYzHL2tjgOw2-mtiAeocSE&s=10";
  const aboutStat1Number = aboutSection.stat1Number || "20+";
  const aboutStat1Label = aboutSection.stat1Label || "Countries Served";
  const aboutStat2Number = aboutSection.stat2Number || "5000+";
  const aboutStat2Label = aboutSection.stat2Label || "Projects Completed";

  const aboutStats = [
    { value: aboutStat1Number, label: aboutStat1Label },
    { value: aboutStat2Number, label: aboutStat2Label },
  ];

  // Equipment Section
  const equipmentBadge = equipmentSection.badge || "Equipment";
  const equipmentTitle = equipmentSection.title || "Engineered Power Systems";
  const equipmentDescription = equipmentSection.description ||
    "Custom switchgear and automation cabinets designed for maximum operational longevity.";
const defaultProducts = [
  {
    name: "Vacuum Circuit Breaker (VCB)",
    category: "Switchgear",
    price: "3,75,000",
    description: "High-performance vacuum circuit breaker designed for reliable protection and switching in medium-voltage power distribution systems.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS954j0CVNHJNOLX1hghy5LT6U_r1RrI1Dmtk1cpVQT0A&s=10"
  },
  {
    name: "Distribution Transformer",
    category: "Transformers",
    price: "6,20,000",
    description: "Energy-efficient oil-cooled distribution transformer ensuring stable voltage supply for industrial and commercial facilities.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedFbiIbKdI2RxuBrQv5wzTFSD4bbYTy-I-_NUuHoB2HfUlJlrpXhshog&s=10"
  },
  {
    name: "Motor Control Center (MCC)",
    category: "Control Panels",
    price: "2,95,000",
    description: "Centralized motor control panel with advanced protection, monitoring, and automation capabilities.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGAhtFw3jteZpKSanBLZWvJ-eCVxPOz5Dm8DPxtcbpLhEERlVpzV6GUQ&s=10"
  },
  {
    name: "PLC Automation Panel",
    category: "Industrial Automation",
    price: "3,40,000",
    description: "Programmable Logic Controller panel designed for efficient machine automation and process control.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz5WOKz5qCfVA4xnk2uUmfqbUpkXfPEjZAhU-I2sHg43WxtUJOh8Fb55rX&s=10"
  },
  {
    name: "APFC Panel",
    category: "Power Quality",
    price: "2,25,000",
    description: "Automatic Power Factor Correction panel that minimizes power losses and improves electrical efficiency.",
    image: "https://cpimg.tistatic.com/10650863/b/4/25KVAR-APFC-Capacitor-Control-Panel..jpg"
  },
  {
    name: "Industrial UPS System",
    category: "Power Backup",
    price: "4,85,000",
    description: "Online UPS system delivering uninterrupted power to mission-critical industrial equipment and control systems.",
    image: "https://cpimg.tistatic.com/10212450/b/5/Industrial-UPS-Systems.png"
  },
];
  const products = safeParseArray(equipmentSection?.products, defaultProducts);

  // Workflow Section
  const workflowBadge = workflowSection.badge || "Process";
  const workflowTitle = workflowSection.title || "Our Engineering Workflow";
  const workflowDescription = workflowSection.description ||
    "From consultation to delivery, our ISO-certified process ensures zero defects.";

  const defaultWorkflow = [
    { step: "01", title: "Consultation", description: "We analyze your facility's load requirements and compliance mandates." },
    { step: "02", title: "Engineering", description: "Generating 3D CAD schematics and thermal dissipation simulations." },
    { step: "03", title: "Manufacturing", description: "Precision fabrication using premium copper busbars and certified enclosures." },
    { step: "04", title: "Testing & Delivery", description: "Full factory acceptance testing before global logistics dispatch." },
  ];
  const workflow = safeParseWorkflow(workflowSection?.workflow, defaultWorkflow);

  // Workflow Icons (Hardcoded, cycled through)
  const workflowIcons = [Compass, Settings, Wrench, PackageCheck];

  // Testimonials Section
  const testimonialsBadge = testimonialsSection.badge || "Testimonials";
  const testimonialsTitle = testimonialsSection.title || "What Our Clients Say";

  const defaultTestimonials = [
    {
      quote: "VoltEdge re-engineered our entire refinery power distribution framework. Their custom switchgear cut our maintenance downtime by over 40%.",
      client: "Marcus Vance",
      company: "PetroChem Global",
    },
    {
      quote: "In automotive manufacturing, precision and safety are non-negotiable. VoltEdge delivered 45 custom MCC panels on time and certified.",
      client: "Elena Rostova",
      company: "Apex Motors",
    },
    {
      quote: "The durability of their cast-resin transformers is unmatched. We operate in high-humidity offshore environments without any insulation failure.",
      client: "David Henderson",
      company: "DeepSea Energy",
    },
    {
      quote: "From CAD thermal simulations to factory acceptance testing, their engineering team demonstrated supreme technical rigor.",
      client: "Sarah Jenkins",
      company: "Nexa Steelworks",
    },
    {
      quote: "Their 24/7 mission-critical support team saved us from a catastrophic plant outage during a major utility grid surge.",
      client: "Robert Chen",
      company: "HyperScale Data Centers",
    },
    {
      quote: "We required custom arc-resistant enclosures designed to fit within tight underground mine substations. VoltEdge delivered a turnkey solution.",
      client: "Arthur Pendelton",
      company: "TerraMining Corp",
    },
  ];
  const testimonials = safeParseTestimonials(testimonialsSection?.testimonials, defaultTestimonials);

  // Contact Section
  const contactBadge = contactSection.badge || "Contact";
  const contactTitle = contactSection.title || "Start Your Consultation";
  const contactDescription = contactSection.description ||
    "Submit your specifications for an immediate consultation with our engineering team.";
  const contactButtonText = contactSection.buttonText || "Send via WhatsApp";
  const contactPhone = contactSection.phone || "+91 1234567890";
  const contactEmail = contactSection.email || "electrical@gmail.com";
  const contactAddress = contactSection.address || "Mumbai, Maharashtra";
  const whatsappNumber = contactSection.whatsapp || "1234567890";

  // Footer Section
  const footerDescription = footerSection.description ||
    "Global OEM manufacturer of heavy-duty switchgear, motor control centers, and power distribution systems.";
  const footerCopyright = footerSection.copyright || `© ${new Date().getFullYear()} VoltEdge Electrical Equipment. All Rights Reserved.`;

  // Social Links (Conditional Rendering)
  const facebook = socialLinks.facebook || "";
  const instagram = socialLinks.instagram || "";
  const linkedin = socialLinks.linkedin || "";
  const twitter = socialLinks.twitter || "";

  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href);
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialScrollRef.current) {
      const scrollAmount = testimonialScrollRef.current.clientWidth / 2;
      testimonialScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onSubmit = (data: ContactFormInputs) => {
    const targetPhone = whatsappNumber.replace(/\s/g, '');
    const text = `*New Inquiry via VoltEdge*%0A%0A*Name:* ${encodeURIComponent(
      data.fullName
    )}%0A*Email:* ${encodeURIComponent(data.email)}%0A*Phone:* ${encodeURIComponent(
      data.phone
    )}%0A*Message:* ${encodeURIComponent(data.message)}`;

    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
    reset();
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-['Inter',sans-serif] selection:bg-[#0052FF] selection:text-white">
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Manrope', sans-serif;
        }

        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 20s linear infinite;
        }

        .testimonial-scroll::-webkit-scrollbar {
          display: none;
        }
        .testimonial-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* =========================================================================
          NAVBAR
          ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="flex items-center gap-3 group"
          >
            <img src={companyLogo} className="w-8 h-8 object-contain" alt={companyName} />
            <span className="text-xl font-heading font-extrabold tracking-tight text-[#0F172A]">
              {companyName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#0052FF]"
                      : "text-gray-600 hover:text-[#0F172A]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052FF]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0052FF] text-white text-sm font-medium hover:bg-[#003BBA] transition-colors rounded-lg shadow-sm hover:shadow-md"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-[#0052FF] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-white border-b border-gray-100 px-6 py-6 mt-3 shadow-lg"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={`#${link.href}`}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm font-medium text-gray-800 py-2 border-b border-gray-50 flex items-center justify-between hover:text-[#0052FF] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0052FF] text-white font-medium text-sm rounded-lg"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          HERO
          ========================================================================= */}
      <section
        id="home"
        className="relative pt-28 pb-12 md:pt-20 md:pb-16 min-h-[90vh] flex items-center justify-center bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-gray-200 text-[#0F172A] text-xs font-semibold tracking-wider uppercase rounded-full">
                <span className="w-2 h-2 bg-[#0052FF] rounded-full" />
                <span>{heroBadge}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                {heroTitle}
                <span className="text-[#0052FF] block text-5xl lg:text-6xl">{heroHighlight}</span>
              </h1>

              <p className="text-base text-gray-600 max-w-lg">
                {heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="#expertise"
                  onClick={(e) => scrollToSection(e, "expertise")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-[#0F172A] text-white text-sm font-medium hover:bg-[#0052FF] transition-colors rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <span>{heroButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <a
                  href="#workflow"
                  onClick={(e) => scrollToSection(e, "workflow")}
                  className="px-8 py-3.5 bg-white text-[#0F172A] text-sm font-medium border border-gray-300 hover:border-[#0F172A] transition-colors rounded-lg"
                >
                  {heroSecondaryButtonText}
                </a>
              </div>

              <div className="flex gap-8 pt-4 border-t border-gray-200 max-w-lg">
                {heroStats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-2xl font-heading font-bold text-[#0F172A]">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="border border-gray-200 bg-gray-50 p-2 rounded-xl overflow-hidden shadow-lg">
                <div className="relative overflow-hidden aspect-[1/1] bg-gray-900 rounded-lg group">
                  <img
                    src={heroImage}
                    alt="Industrial electrical equipment"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0F172A] flex items-center justify-center text-white rounded-lg">
                        <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                      </div>
                      <div>
                        <p className="text-xs font-heading font-bold text-[#0F172A] uppercase tracking-wider">
                          {heroCertBadge}
                        </p>
                        <p className="text-[11px] text-gray-600">
                          {heroCertSub}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE
          ========================================================================= */}
      <section className="py-3.5 bg-[#0F172A] text-white overflow-hidden border-y border-gray-800">
        <div className="animate-ticker">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center gap-8 px-8">
              <span className="text-xs font-semibold tracking-widest uppercase select-none flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#0052FF]" />
                {item}
              </span>
              <span className="w-1 h-1 bg-gray-700 inline-block rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ABOUT
          ========================================================================= */}
      <section id="about" className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="relative group">
              <div className="border border-gray-200 bg-gray-50 p-2 rounded-xl overflow-hidden shadow-md">
                <div className="relative overflow-hidden aspect-[3/3] bg-gray-900 rounded-lg">
                  <img
                    src={aboutImage}
                    alt="Manufacturing facility"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                <span>{aboutBadge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                {aboutTitle}
              </h2>

              <p className="text-base text-gray-600 leading-relaxed">
                {aboutDescription}
              </p>

              <p className="text-sm text-gray-500 leading-relaxed">
                {aboutSubDescription}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {aboutStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-2xl font-heading font-bold text-[#0F172A]">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EQUIPMENT
          ========================================================================= */}
      <section id="expertise" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-gray-200 text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-full">
                <span className="w-2 h-2 bg-[#0052FF] rounded-full" />
                <span>{equipmentBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                {equipmentTitle}
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              {equipmentDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 aspect-[9/10]"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
                  <span className="rounded-full border border-black/50 bg-black/50 backdrop-blur-md px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    {prod.category}
                  </span>
                  <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#0F172A] shadow-lg">
                    ₹{prod.price}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 px-2 py-3">
                  <div className="rounded-3xl bg-black/20 backdrop-blur-sm p-5">
                    <h3 className="text-xl font-heading font-bold text-white transition-colors duration-300 group-hover:text-[#60A5FA]">
                      {prod.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-200 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORKFLOW
          ========================================================================= */}
      <section id="workflow" className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-full">
              <Settings className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>{workflowBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight">
              {workflowTitle}
            </h2>
            <p className="text-sm text-gray-600">
              {workflowDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item: any, index: number) => {
              const IconComponent = workflowIcons[index % workflowIcons.length];
              const isHovered = hoveredStep === index;
              return (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  whileHover={{ y: -8 }}
                  className={`bg-white p-8 border border-gray-200 flex flex-col rounded-xl transition-all duration-300 ${
                    isHovered ? "shadow-xl border-[#0052FF]" : "shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-[#F8FAFC] border border-gray-200 flex items-center justify-center rounded-lg">
                      <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                          isHovered ? "text-[#0052FF]" : "text-[#0F172A]"
                        }`} />
                      </motion.div>
                    </div>
                    <span
  className={`text-3xl font-heading font-extrabold transition-colors duration-500 ${
    isHovered ? "text-[#0052FF]" : "text-gray-200"
  }`}
>
  {item.step}
</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-heading font-bold text-[#0F172A]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 bg-[#0F172A] text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl">
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-sm font-medium text-gray-400">
                Need custom dimensions or busbars?
              </p>
              <h3 className="text-xl font-heading font-bold text-white">
                Custom Fabrication Available
              </h3>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-[#0052FF] text-white font-medium text-sm hover:bg-white hover:text-[#0F172A] transition-colors rounded-lg flex items-center gap-2 shrink-0"
            >
              <span>Request Custom Spec</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS
          ========================================================================= */}
      <section id="testimonials" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-gray-200 text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-full">
                <Quote className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>{testimonialsBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                {testimonialsTitle}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTestimonials("left")}
                className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors rounded-lg"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTestimonials("right")}
                className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors rounded-lg"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={testimonialScrollRef}
            className="flex gap-6 overflow-x-auto pb-4 testimonial-scroll snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testi: any, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="w-[85vw] sm:w-[45vw] lg:w-[30vw] shrink-0 bg-[#F8FAFC] p-8 border border-gray-200 flex flex-col rounded-xl snap-start shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-transparent border border-gray-200 flex items-center justify-center rounded-full">
                    <Quote className="w-4 h-4 text-[#0052FF]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#0052FF]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed italic flex-1">
                  "{testi.quote}"
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-heading font-bold text-[#0F172A]">
                    {testi.client}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {testi.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-widest md:hidden">
            ← Swipe to view more →
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT
          ========================================================================= */}
      <section id="contact" className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="border border-gray-200 bg-white overflow-hidden rounded-xl shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="bg-[#0F172A] text-white p-8 sm:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-[#0052FF] text-xs font-semibold uppercase tracking-wider rounded-full">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{contactBadge}</span>
                  </div>

                  <h2 className="text-3xl font-heading font-extrabold tracking-tight">
                    {contactTitle}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {contactDescription}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800 text-[#0052FF] flex items-center justify-center shrink-0 rounded-lg">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                          Hotline
                        </p>
                        <p className="text-sm font-heading font-bold">
                          {contactPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800 text-[#0052FF] flex items-center justify-center shrink-0 rounded-lg">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                          Email
                        </p>
                        <p className="text-sm font-heading font-bold">
                          {contactEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800 text-[#0052FF] flex items-center justify-center shrink-0 rounded-lg">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                          Location
                        </p>
                        <p className="text-sm font-heading font-bold">
                          {contactAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="p-8 sm:p-12">
                <h3 className="text-xl font-heading font-bold text-[#0F172A] mb-1">
                  Submit Your Specifications
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  We'll respond via WhatsApp within 2 hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      className={`w-full px-4 py-3 bg-[#F8FAFC] border ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } text-sm text-[#0F172A] focus:outline-none focus:border-[#0052FF] transition-all rounded-lg`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 font-semibold">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="rahuls@gmail.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-[#F8FAFC] border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } text-sm text-[#0F172A] focus:outline-none focus:border-[#0052FF] transition-all rounded-lg`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 font-semibold">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className={`w-full px-4 py-3 bg-[#F8FAFC] border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } text-sm text-[#0F172A] focus:outline-none focus:border-[#0052FF] transition-all rounded-lg`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 font-semibold">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Requirements *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify voltage, amperage, NEMA type, and timeline..."
                      {...register("message", {
                        required: "Please detail your requirements",
                      })}
                      className={`w-full px-4 py-3 bg-[#F8FAFC] border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } text-sm text-[#0F172A] focus:outline-none focus:border-[#0052FF] transition-all rounded-lg resize-none`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 font-semibold">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 bg-[#0052FF] hover:bg-[#003BBA] text-white font-medium text-sm transition-colors rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <span>{contactButtonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="bg-[#0F172A] text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
            <div className="lg:col-span-5 space-y-5">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className="flex items-center gap-3 group"
              >
                <img src={companyLogo} className="w-8 h-8 object-contain" alt={companyName} />
                <span className="text-xl font-heading font-extrabold tracking-tight text-white">
                  {companyName}
                </span>
              </a>

              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                {footerDescription}
              </p>

              <div className="flex items-center gap-3 pt-2">
                {/* Conditionally render social icons only if URLs are provided */}
                {linkedin && linkedin !== "#" && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0052FF] transition-colors rounded-lg"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {twitter && twitter !== "#" && (
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0052FF] transition-colors rounded-lg"
                    aria-label="Twitter"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                )}
                {facebook && facebook !== "#" && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0052FF] transition-colors rounded-lg"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                )}
                {instagram && instagram !== "#" && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0052FF] transition-colors rounded-lg"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#0052FF]">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={`#${link.href}`}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-sm font-medium text-gray-400 hover:text-white transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#0052FF]">
                Headquarters
              </h4>
              <div className="space-y-3 text-sm text-gray-400">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                  <span>{contactAddress}</span>
                </p>
                <p className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-[#0052FF] shrink-0" />
                  <span>{contactPhone}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#0052FF] shrink-0" />
                  <span>{contactEmail}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-sm font-medium text-gray-500">
            <p>{footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}