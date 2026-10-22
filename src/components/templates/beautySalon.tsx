"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Image from "next/image";

const safeParseArray = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 3) {
            return {
              title: parts[0] || "",
              category: parts[1] || "",
              image: parts[2] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseGallery = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
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
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 3) {
            return {
              name: parts[0] || "",
              role: parts[1] || "",
              review: parts[2] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

const safeParseSlides = (data: any, defaultData: any[]): any[] => {
  if (Array.isArray(data) && data.length > 0) return data;
  if (typeof data === "string" && data.trim() !== "") {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      const items = data
        .split(",")
        .map((item) => {
          const parts = item.split("|").map((s) => s.trim());
          if (parts.length >= 3) {
            return {
              image: parts[0] || "",
              title: parts[1] || "",
              subtitle: parts[2] || "",
            };
          }
          return null;
        })
        .filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return defaultData;
};

export default function GlowStudio({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config - Updated to match new JSON structure
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const servicesGallery = data?.servicesGallery || {};
  const testimonialsSocial = data?.testimonialsSocial || {};
  const footerData = data?.footer || {};

  // Basic Info
  const companyName = basicInfo.name || "Glow Studio";
  const companyLogo = basicInfo.logo || "";
  const contactAddress = basicInfo.address || "London, United Kingdom";
  const contactPhone = basicInfo.phone || "+44 7700 900123";
  const contactEmail = basicInfo.email || "glowstudio@email.com";
  const contactHours = basicInfo.hours || "Mon - Sat: 9:00 AM – 7:00 PM";
  const contactSunday = basicInfo.sunday || "Sunday: Closed";
  const whatsappNumber = basicInfo.whatsapp || "1234567890";
  const primaryColor = basicInfo.primary || "#D4AF37";

  // Hero Section
  const heroBadge = heroSection.badge || "About Us";
  const heroTitle = heroSection.title || "Glow Like Never Before";
  const heroSubtitle = heroSection.subtitle || "Because you deserve the best";
  const aboutTitle =
    heroSection.aboutTitle || "Redefining Beauty & Wellness Experiences";
  const aboutDescription =
    heroSection.aboutDescription ||
    "At our salon, we blend artistry with expertise to deliver an unparalleled beauty experience. Our team of skilled professionals is dedicated to enhancing your natural elegance through personalized services, premium products, and a serene environment designed for relaxation.";
  const aboutImage =
    heroSection.aboutImage ||
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";

  const defaultSlides = [
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      title: "Luxury Beauty Experience",
      subtitle: "Indulge in premium salon services",
    },
    {
      image:
        "https://admin.juicesalons.com//Content/BannerImages/b49caa36-1555-4335-8dde-7a92debcdee9.jpg",
      title: "Expert Stylists",
      subtitle: "Crafting your perfect look",
    },
    {
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      title: "Glow Like Never Before",
      subtitle: "Because you deserve the best",
    },
  ];
  const slides = safeParseSlides(heroSection?.slides, defaultSlides);

  // Services & Gallery
  const servicesBadge = servicesGallery.servicesBadge || "Our Services";
  const servicesTitle =
    servicesGallery.servicesTitle ||
    "Premium beauty treatments tailored for you";

  const defaultServices = [
    {
      title: "Bridal Makeup",
      category: "Makeup",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      title: "Hair Styling",
      category: "Hair",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    },
    {
      title: "Nail Art",
      category: "Nails",
      image:
        "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2024/JULY/26/zPA0JwiW_68eb52a0e2e64d11b2b825a14cef7568.jpg",
    },
    {
      title: "Facials",
      category: "Skin",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    },
    {
      title: "Manicure",
      category: "Nails",
      image:
        "https://png.pngtree.com/png-vector/20250813/ourmid/pngtree-woman-hand-showing-ombre-pink-milky-nail-manicure-on-short-natural-png-image_17150567.webp",
    },
    {
      title: "Pedicure",
      category: "Nails",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
    },
  ];
  const services = safeParseArray(servicesGallery?.services, defaultServices);

  const galleryBadge = servicesGallery.galleryBadge || "Our Work";
  const galleryTitle =
    servicesGallery.galleryTitle || "A glimpse of our transformations";

  const defaultGallery = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2024/JULY/26/zPA0JwiW_68eb52a0e2e64d11b2b825a14cef7568.jpg",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30",
    "https://png.pngtree.com/png-vector/20250813/ourmid/pngtree-woman-hand-showing-ombre-pink-milky-nail-manicure-on-short-natural-png-image_17150567.webp",
  ];
  const galleryImages = safeParseGallery(
    servicesGallery?.galleryImages,
    defaultGallery,
  );

  // Testimonials & Social
  const testimonialsBadge =
    testimonialsSocial.testimonialsBadge || "What Our Clients Say";
  const testimonialsTitle =
    testimonialsSocial.testimonialsTitle ||
    "Real experiences from our happy clients";

  const defaultTestimonials = [
    {
      name: "Emily Johnson",
      role: "Bride",
      review:
        "Absolutely loved the bridal makeup! The team made my day perfect.",
    },
    {
      name: "Sophia Williams",
      role: "Client",
      review:
        "Very professional and hygienic. Highly recommend their services.",
    },
    {
      name: "Olivia Brown",
      role: "Model",
      review: "Amazing experience! My skin felt glowing after the facial.",
    },
    {
      name: "Sarah Wilson",
      role: "CEO",
      review: "The best salon experience I've ever had. Truly world-class!",
    },
  ];
  const testimonials = safeParseTestimonials(
    testimonialsSocial?.testimonials,
    defaultTestimonials,
  );

  const instagram = testimonialsSocial.instagram || "";
  const facebook = testimonialsSocial.facebook || "";
  const twitter = testimonialsSocial.twitter || "";

  // Footer
  const footerDescription =
    footerData.footerDescription ||
    "Luxury beauty & hair services designed to make you feel confident and radiant.";
  const footerCopyright =
    footerData.copyright ||
    `© ${new Date().getFullYear()} Glow Studio. All rights reserved.`;

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="bg-[#F8F5F2] text-[#1A1A1A] font-serif">
      <Navbar
        onBook={() => setOpen(true)}
        companyName={companyName}
        companyLogo={companyLogo}
        primaryColor={primaryColor}
      />
      <HeroCarousel slides={slides} />
      <About
        badge={heroBadge}
        title={aboutTitle}
        description={aboutDescription}
        image={aboutImage}
        primaryColor={primaryColor}
      />
      <Services
        services={services}
        onBook={(serviceName: string) => {
          setSelectedService(serviceName);
          setOpen(true);
        }}
        badge={servicesBadge}
        title={servicesTitle}
        primaryColor={primaryColor}
      />
      <OurWorkSection />
      <Gallery
        images={galleryImages}
        badge={galleryBadge}
        title={galleryTitle}
      />
      <Testimonials
        testimonials={testimonials}
        badge={testimonialsBadge}
        title={testimonialsTitle}
        primaryColor={primaryColor}
      />
      <ContactSection
        address={contactAddress}
        phone={contactPhone}
        email={contactEmail}
        hours={contactHours}
        sunday={contactSunday}
        whatsapp={whatsappNumber}
        primaryColor={primaryColor}
      />
      <Footer
        companyName={companyName}
        companyLogo={companyLogo}
        description={footerDescription}
        copyright={footerCopyright}
        address={contactAddress}
        phone={contactPhone}
        email={contactEmail}
        instagram={instagram}
        facebook={facebook}
        twitter={twitter}
        primaryColor={primaryColor}
      />
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        selectedService={selectedService}
        primaryColor={primaryColor}
        whatsapp={whatsappNumber}
      />
    </main>
  );
}

// ============================================
// COMPONENTS (Same as before, no changes needed)
// ============================================

function Navbar({ onBook, companyName, companyLogo, primaryColor }: any) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
        <div className="flex items-center gap-2">
          {companyLogo && (
            <Image
              src={companyLogo}
              alt={companyName}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              unoptimized
            />
          )}
          <h1 className="text-lg md:text-xl font-semibold tracking-wide font-serif">
            {companyName}
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-base uppercase tracking-wide font-serif font-semibold">
          <Link href="/">Home</Link>
          <Link href="#services">Services</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <button
          onClick={onBook}
          className="text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-sm uppercase tracking-wide hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
          style={{ backgroundColor: primaryColor }}
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}

function HeroCarousel({ slides }: { slides: any[] }) {
  const [index, setIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const SLIDE_INTERVAL = 2500;
  const ANIMATION_DURATION = 0.9;
  const loopedSlides = [...slides, ...slides];

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(
      () => setIndex((prev) => prev + 1),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (index === slides.length) {
      setTimeout(() => {
        setEnableTransition(false);
        setIndex(0);
      }, ANIMATION_DURATION * 1000);
      setTimeout(
        () => setEnableTransition(true),
        ANIMATION_DURATION * 1000 + 50,
      );
    }
  }, [index, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[index % slides.length] || slides[0];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="flex h-full will-change-transform"
        animate={{ x: `-${index * 100}%` }}
        transition={
          enableTransition
            ? { duration: ANIMATION_DURATION, ease: [0.77, 0, 0.175, 1] }
            : { duration: 0 }
        }
      >
        {loopedSlides.map((slide, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6 md:px-12">
        <div className="text-white max-w-3xl overflow-hidden">
          <motion.div
            key={index}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[2px] bg-white mb-6 mx-auto"
          />
          <motion.h1
            key={`title-${index}`}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.15,
            }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em] font-light mb-4 md:mb-6"
          >
            {current.title}
          </motion.h1>
          <motion.p
            key={`sub-${index}`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.3,
            }}
            className="font-sans text-sm md:text-lg tracking-[0.3em] uppercase opacity-80 font-light"
          >
            {current.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] },
  },
};

const lineReveal: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 80,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
  },
};

function About({ badge, title, description, image, primaryColor }: any) {
  return (
    <section className="bg-[#F8F5F2] py-16 md:py-28 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full h-[300px] md:h-[550px] overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src={image}
            alt="Salon Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 font-medium"
          >
            {badge}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] mb-6 font-light"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={lineReveal}
            className="h-[2px] mb-6"
            style={{ backgroundColor: primaryColor }}
          />
          <motion.p
            variants={fadeUp}
            className="font-sans text-sm md:text-base text-gray-600 leading-relaxed mb-8 font-light"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Services({ services, onBook, badge, title, primaryColor }: any) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(services.map((s: any) => s.category))];

  return (
    <section
      id="services"
      className="py-16 md:py-24 px-4 md:px-10 bg-[#F8F5F2]"
    >
      <div className="text-center mb-10 md:mb-12">
        <div
          className="w-20 h-[2px] mx-auto mb-6"
          style={{ backgroundColor: primaryColor }}
        />
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] font-light">
          {badge}
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 mt-4 font-light">
          {title}
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
        {categories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-all duration-300 hover:scale-105 ${
              selectedCategory === cat
                ? "text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            style={
              selectedCategory === cat ? { backgroundColor: primaryColor } : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services
          .filter(
            (s: any) =>
              selectedCategory === "All" || s.category === selectedCategory,
          )
          .map((s: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => onBook(s.title)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-base md:text-lg font-serif font-light">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mt-2 font-sans font-light">
                  {s.category}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}

function OurWorkSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const img1Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9)",
            opacity: img1Opacity,
            zIndex: 5,
          }}
        />

        <motion.div
          style={{ y: panelY }}
          className="absolute top-0 left-0 w-full h-[40%] bg-[#f4f1ee] z-10 flex items-center justify-center"
        >
          <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.1] tracking-[-0.02em] font-light text-[#3a3a3a]">
            Our Gallery
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery({ images, badge, title }: any) {
  return (
    <section id="gallery" className="py-16 md:py-24 px-4 md:px-10 bg-[#F8F5F2]">
      <div className="text-center mb-10 md:mb-12">
        <div className="w-20 h-[2px] bg-black/20 mx-auto mb-6" />
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] font-light">
          {badge}
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 mt-4 font-light">
          {title}
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((img: string, i: number) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-40 md:h-64 object-cover hover:scale-110 transition duration-700"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ testimonials, badge, title, primaryColor }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-white overflow-hidden">
      <div className="text-center mb-10 md:mb-12">
        <div className="w-20 h-[2px] bg-black/20 mx-auto mb-6" />
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] font-light">
          {badge}
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 mt-4 font-light">
          {title}
        </p>
      </div>

      <div className="flex justify-end gap-3 mb-6 max-w-6xl mx-auto">
        <button
          onClick={() => scrollTestimonials("left")}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          aria-label="Previous"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => scrollTestimonials("right")}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          aria-label="Next"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth max-w-6xl mx-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t: any, i: number) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] flex-shrink-0 snap-start bg-[#F8F5F2] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-l-4"
            style={{ borderColor: primaryColor }}
          >
            <p className="text-gray-600 text-sm md:text-base font-light italic">
              “{t.review}”
            </p>
            <div className="mt-4">
              <h4 className="font-serif text-lg font-medium">{t.name}</h4>
              <span className="text-xs text-gray-400 font-sans">{t.role}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-gray-400 md:hidden">
        ← Swipe to see more →
      </div>
    </section>
  );
}

function ContactSection({
  address,
  phone,
  email,
  hours,
  sunday,
  whatsapp,
  primaryColor,
}: any) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    const message = `Hello Glow Studio,%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Query:* ${data.query}`;
    const url = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-10 bg-[#F8F5F2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div
            className="w-20 h-[2px] mx-auto mb-6"
            style={{ backgroundColor: primaryColor }}
          />
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em] font-light">
            Get In Touch
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-gray-500 mt-4 font-light">
            We'd love to hear from you
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-4">
                Visit Our Studio
              </h3>
              <p className="text-gray-600 text-base md:text-lg font-light">
                📍 {address}
              </p>
              <p className="text-gray-600 text-base md:text-lg font-light">
                📞 {phone}
              </p>
              <p className="text-gray-600 text-base md:text-lg font-light">
                ✉️ {email}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-4">
                Opening Hours
              </h3>
              <p className="text-gray-600 text-base md:text-lg font-light">
                {hours}
              </p>
              <p className="text-gray-600 text-base md:text-lg font-light">
                {sunday}
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("name", { required: true })}
                placeholder="Your Name *"
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number *"
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
              <textarea
                {...register("query", { required: true })}
                placeholder="Your Query *"
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02] font-sans"
                style={{ backgroundColor: primaryColor }}
              >
                {isSubmitting ? "Sending..." : "Send via WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({
  companyName,
  companyLogo,
  description,
  copyright,
  address,
  phone,
  email,
  instagram,
  facebook,
  twitter,
  primaryColor,
}: any) {
  return (
    <footer className="bg-black text-white py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            {companyLogo && (
              <Image
                src={companyLogo}
                alt={companyName}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                unoptimized
              />
            )}
            <h2 className="text-lg md:text-xl font-serif font-light tracking-wide">
              {companyName}
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-light font-sans">
            {description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-gray-400">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-serif text-lg font-light mb-4">Contact</h3>
          <p className="text-gray-400 text-sm font-light font-sans">
            📍 {address}
          </p>
          <p className="text-gray-400 text-sm font-light font-sans">
            📞 {phone}
          </p>
          <p className="text-gray-400 text-sm font-light font-sans">
            ✉️ {email}
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-light mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm font-light font-sans">
            <li>
              <a
                href="#"
                className="hover:text-white transition-all duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-white transition-all duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="hover:text-white transition-all duration-300"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-white transition-all duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 md:mt-10 border-t border-gray-800 pt-6 text-center">
        <p className="text-gray-500 text-xs md:text-sm font-light font-sans">
          {copyright}
        </p>
      </div>
    </footer>
  );
}

function BookingModal({
  isOpen,
  onClose,
  selectedService,
  primaryColor,
  whatsapp,
}: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<any>({
    defaultValues: {
      services: selectedService ? [selectedService] : [],
      time: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const selectedTime = watch("time");
  const selectedServices = watch("services") || [];

  useEffect(() => {
    if (selectedService) setValue("services", [selectedService]);
  }, [selectedService, setValue]);
  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    const message = `Hello Glow Studio,%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Services:* ${data.services.join(", ")}%0A*Date:* ${data.date}%0A*Time:* ${data.time}`;
    const url = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setLoading(false);
    setSuccess(true);
    reset();
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  const serviceOptions = [
    "Bridal Makeup",
    "Hair Styling",
    "Facials",
    "Nail Art",
    "Manicure",
    "Pedicure",
  ];
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#F8F5F2] border border-gray-200 w-full max-w-md rounded-2xl p-4 md:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-serif font-light mb-4 text-center">
          Book Appointment
        </h2>
        {success ? (
          <p className="text-green-600 text-center font-medium">
            Booking Successful!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: true })}
              placeholder="Your Name *"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
            />
            <input
              {...register("phone", { required: true })}
              placeholder="Phone Number *"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
            />
            <div>
              <p className="text-sm font-medium mb-2">Select Services</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 border rounded-xl p-2 cursor-pointer hover:bg-gray-100 text-xs md:text-sm transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      value={s}
                      {...register("services", { required: true })}
                    />
                    <span className="font-light">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
            />
            <div>
              <p className="text-sm font-medium mb-2">Select Time</p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setValue("time", slot)}
                    className={`border rounded-xl py-2 text-xs md:text-sm transition-all duration-300 hover:scale-105 ${
                      selectedTime === slot ? "text-white" : "hover:bg-gray-100"
                    }`}
                    style={
                      selectedTime === slot
                        ? { backgroundColor: primaryColor }
                        : {}
                    }
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <input type="hidden" {...register("time", { required: true })} />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        )}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 block mx-auto font-light"
        >
          Close
        </button>
      </div>
    </div>
  );
}