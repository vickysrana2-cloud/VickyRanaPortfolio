"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Car,
  Crown,
  Mail,
  MapPin,
  Menu,
  Palmtree,
  Phone,
  Plane,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

// Helper functions to safely parse array data
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
          if (parts.length >= 2) {
            return {
              title: parts[0] || "",
              text: parts[1] || "",
              icon: parts[2] || "crown",
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

const safeParseDestinations = (data: any, defaultData: any[]): any[] => {
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
          if (parts.length >= 5) {
            return {
              name: parts[0] || "",
              place: parts[1] || "",
              days: parts[2] || "",
              price: parts[3] || "",
              image: parts[4] || "",
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

const safeParseTimings = (data: any, defaultData: any[]): any[] => {
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
              day: parts[0] || "",
              open: parts[1] || "",
              close: parts[2] || "",
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
          if (parts.length >= 4) {
            return {
              name: parts[0] || "",
              role: parts[1] || "",
              quote: parts[2] || "",
              rating: parseInt(parts[3]) || 5,
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

const safeParsePlanFields = (data: any, defaultData: any[]): any[] => {
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
          if (parts.length >= 2) {
            return {
              label: parts[0] || "",
              value: parts[1] || "",
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

const travelFallback = (
  title: string,
  subtitle: string,
  from = "#203c37",
  to = "#d8b88f",
) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="55%" stop-color="${to}"/>
          <stop offset="100%" stop-color="#f6efe3"/>
        </linearGradient>
        <radialGradient id="sun" cx="73%" cy="22%" r="18%">
          <stop offset="0%" stop-color="#fff7d6"/>
          <stop offset="100%" stop-color="#fff7d6" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#sky)"/>
      <rect width="1200" height="900" fill="url(#sun)"/>
      <path d="M0 610 C170 530 285 595 430 520 C605 430 755 520 910 455 C1040 400 1125 430 1200 380 L1200 900 L0 900 Z" fill="#172622" opacity=".45"/>
      <path d="M0 705 C180 645 330 710 490 650 C660 585 830 645 1000 590 C1095 560 1150 565 1200 540 L1200 900 L0 900 Z" fill="#253b37" opacity=".62"/>
      <path d="M0 790 C210 735 390 800 590 742 C805 680 1000 748 1200 690 L1200 900 L0 900 Z" fill="#0f1f1c" opacity=".72"/>
      <circle cx="870" cy="195" r="92" fill="#fff1bd" opacity=".78"/>
      <text x="80" y="126" fill="#ffffff" font-family="Georgia, serif" font-size="74" font-weight="500">${title}</text>
      <text x="84" y="186" fill="#ffffff" opacity=".82" font-family="Arial, sans-serif" font-size="28" letter-spacing="6">${subtitle}</text>
    </svg>
  `)}`;

const defaultImageFallback = {
  hero: travelFallback(
    "India in Style",
    "PRIVATE JOURNEYS + BOUTIQUE STAYS",
    "#172622",
    "#c99d72",
  ),
  about: travelFallback(
    "Royal Rajasthan",
    "PALACES + HERITAGE",
    "#293f3a",
    "#d3b490",
  ),
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function TravelAgencyTemplate({ data }: { data?: any }) {
  console.log("Received data:", data);

  // Extract data from config - 6 tabs structure (updated)
  const basicInfo = data?.basicInfo || {};
  const heroAbout = data?.heroAbout || {};
  const servicesDestinations = data?.servicesDestinations || {};
  const testimonialsGallery = data?.testimonialsGallery || {};
  const timingsFooter = data?.timingsFooter || {};
  const navigationContact = data?.navigationContact || {};

  // Basic Info
  const companyName = basicInfo.name || "Raahi & Co.";
  const companyLogo = basicInfo.logo || "";
  const aboutUs =
    basicInfo.aboutUs ||
    "We craft stress-free honeymoons, family vacations, wellness breaks, and milestone celebrations with handpicked stays, private transfers, local experiences, and on-trip support.";
  const contactAddress = basicInfo.address || "Mumbai | Delhi | Bengaluru";
  const contactPhone = basicInfo.phone || "+91 98765 43210";
  const contactEmail = basicInfo.email || "hello@raahiandco.in";
  const whatsappNumber = basicInfo.whatsapp || "1234567890";

  // Hero & About (now includes hero plan fields)
  const heroTitle =
    heroAbout.heroTitle ||
    "Private holidays designed around the way you travel.";
  const heroSubtitle =
    heroAbout.heroSubtitle || "Bespoke luxury travel from India";
  const heroImage =
    heroAbout.heroImage ||
    "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg";

  // Hero Plan fields now come from heroAbout
  const heroPlanTitle = heroAbout.heroPlanTitle || "Plan a journey";
  const heroPlanSubtitle = heroAbout.heroPlanSubtitle || "Tell us where";
  const heroPlanCta = heroAbout.heroPlanCta || "Get a custom itinerary";

  const defaultPlanFields = [
    { label: "Destination", value: "Rajasthan, Kerala, Bali" },
    { label: "Travel style", value: "Luxury, family, honeymoon" },
    { label: "Starting budget", value: "₹50,000 per person" },
  ];
  const heroPlanFields = safeParsePlanFields(
    heroAbout?.heroPlanFields,
    defaultPlanFields,
  );

  const aboutTitle =
    heroAbout.aboutTitle ||
    "A boutique travel studio for Indian families, couples, and explorers.";
  const aboutImage =
    heroAbout.aboutImage ||
    "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg";
  const aboutStat1Number = heroAbout.aboutStat1Number || "12k+";
  const aboutStat1Label = heroAbout.aboutStat1Label || "travellers planned";
  const aboutStat2Number = heroAbout.aboutStat2Number || "45+";
  const aboutStat2Label = heroAbout.aboutStat2Label || "Indian cities covered";
  const aboutStat3Number = heroAbout.aboutStat3Number || "24/7";
  const aboutStat3Label = heroAbout.aboutStat3Label || "trip support";
  const aboutFloatingQuote =
    heroAbout.aboutFloatingQuote || "Thoughtful planning, never templated.";

  // Services & Destinations
  const servicesBadge = servicesDestinations.servicesBadge || "Our services";
  const servicesTitle =
    servicesDestinations.servicesTitle ||
    "Everything arranged before you pack.";
  const servicesDescription =
    servicesDestinations.servicesDescription ||
    "Inspired by high-touch travel concierge service, every itinerary is built around your pace, dietary preferences, celebration needs, and comfort level.";

  const defaultServices = [
    {
      title: "Boutique Stays",
      text: "Heritage havelis, luxury resorts, private villas, wellness retreats.",
      icon: "crown",
    },
    {
      title: "Private Transfers",
      text: "Airport pickups, intercity chauffeurs, luxury tempo travellers.",
      icon: "car",
    },
    {
      title: "Local Experiences",
      text: "Chef-led food walks, private monument tours, wildlife safaris.",
      icon: "sparkles",
    },
    {
      title: "Travel Concierge",
      text: "Visa guidance, surprise arrangements, restaurant bookings.",
      icon: "plane",
    },
  ];
  const services = safeParseArray(
    servicesDestinations?.services,
    defaultServices,
  );

  const destinationsBadge =
    servicesDestinations.destinationsBadge || "Our destinations";
  const destinationsTitle =
    servicesDestinations.destinationsTitle ||
    "India trips made easy, elegant, and deeply local.";
  const destinationsCta =
    servicesDestinations.destinationsCta || "Design my trip";

  const defaultDestinations = [
    {
      name: "Royal Rajasthan",
      place: "Jaipur, Jodhpur, Udaipur",
      days: "7 nights",
      price: "₹68,000",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    },
    {
      name: "Kerala Slow Escape",
      place: "Kochi, Munnar, Alleppey",
      days: "6 nights",
      price: "₹54,500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/83/KumarakomHouseBoat.jpg",
    },
    {
      name: "Himalayan Hideaway",
      place: "Srinagar, Manali, Spiti",
      days: "8 nights",
      price: "₹72,000",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg",
    },
  ];
  const destinations = safeParseDestinations(
    servicesDestinations?.destinations,
    defaultDestinations,
  );

  // Testimonials & Gallery
  const testimonialsBadge =
    testimonialsGallery.testimonialsBadge || "Client testimonials";
  const testimonialsTitle =
    testimonialsGallery.testimonialsTitle ||
    "Trusted for family holidays, honeymoons, and celebration trips.";

  const defaultTestimonials = [
    {
      name: "Ananya Mehta",
      role: "Family trip from Mumbai",
      quote:
        "Our parents wanted comfort, our kids wanted adventure, and we wanted one peaceful holiday.",
      rating: 5,
    },
    {
      name: "Rahul Sharma",
      role: "Honeymoon Couple",
      quote:
        "The most incredible honeymoon experience! Every detail was perfectly planned.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Solo Traveler",
      quote:
        "I traveled solo to Rajasthan and felt completely safe and cared for.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Family Vacation",
      quote: "Our family of 8 had the most memorable trip to Kerala.",
      rating: 5,
    },
    {
      name: "Meera Nair",
      role: "Corporate Retreat",
      quote: "We booked a corporate wellness retreat in the Himalayas.",
      rating: 5,
    },
  ];
  const testimonials = safeParseTestimonials(
    testimonialsGallery?.testimonials,
    defaultTestimonials,
  );

  const galleryBadge = testimonialsGallery.galleryBadge || "Follow the journey";
  const galleryTitle =
    testimonialsGallery.galleryTitle ||
    "Curated stays, slow mornings, and India in detail.";

  const defaultGallery = [
    "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Srinagar_pano.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/83/KumarakomHouseBoat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  ];
  const galleryImages = safeParseGallery(
    testimonialsGallery?.galleryImages,
    defaultGallery,
  );

  // Social Links (from testimonialsGallery)
  const instagram = testimonialsGallery.instagram || "";
  const facebook = testimonialsGallery.facebook || "";
  const twitter = testimonialsGallery.twitter || "";
  const youtube = testimonialsGallery.youtube || "";

  // Timings & Footer
  const timingsBadge = timingsFooter.timingsBadge || "Travel desk hours";
  const timingsTitle =
    timingsFooter.timingsTitle ||
    "Speak with a planner before the bags come out.";
  const timingsDescription =
    timingsFooter.timingsDescription ||
    "Our team is available for itinerary calls, trip changes, celebration requests, and pre-departure support.";

  const defaultTimings = [
    { day: "Monday", open: "10:00", close: "19:00" },
    { day: "Tuesday", open: "10:00", close: "19:00" },
    { day: "Wednesday", open: "10:00", close: "19:00" },
    { day: "Thursday", open: "10:00", close: "19:00" },
    { day: "Friday", open: "10:00", close: "19:00" },
    { day: "Saturday", open: "11:00", close: "17:00" },
    { day: "Sunday", open: "Closed", close: "" },
  ];
  const timings = safeParseTimings(timingsFooter?.timings, defaultTimings);

  const footerDescription = timingsFooter.footerDescription || aboutUs;
  const footerCopyright =
    timingsFooter.footerCopyright ||
    `© ${new Date().getFullYear()} ${companyName} Travel Studio. All rights reserved.`;

  // Navigation & Contact (simplified - only nav CTA and footer WhatsApp CTA)
  const navCta = navigationContact.navCta || "Start Planning";
  const footerWhatsappCta =
    navigationContact.footerWhatsappCta || "Send via WhatsApp";

  // Hardcoded nav items since they're not in the JSON anymore
  const navItems = [
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "destinations", label: "Destinations" },
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  // State
  const [activeGallery, setActiveGallery] = useState(0);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGallery((current) => (current + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialScrollRef.current) {
      const scrollAmount = testimonialScrollRef.current.clientWidth / 2;
      testimonialScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    const message = `Hello ${companyName},%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Message:* ${data.message}`;
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsSubmitting(false);
    reset();
  };

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      crown: Crown,
      car: Car,
      sparkles: Sparkles,
      plane: Plane,
      star: Star,
      camera: Camera,
      map: MapPin,
      phone: Phone,
      mail: Mail,
    };
    return icons[iconName] || Crown;
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      text: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      icon: Phone,
      label: "Phone",
      text: contactPhone,
      href: `tel:${contactPhone}`,
    },
    {
      icon: MapPin,
      label: "Address",
      text: contactAddress,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`,
    },
    {
      icon: Camera,
      label: "Instagram",
      text: instagram ? `@${instagram.split("/").pop()}` : "",
      href: instagram,
    },
  ].filter((item) => item.text);

  const aboutStats = [
    { value: aboutStat1Number, label: aboutStat1Label },
    { value: aboutStat2Number, label: aboutStat2Label },
    { value: aboutStat3Number, label: aboutStat3Label },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 z-50 w-full"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
          <Link href="#" className="flex items-center gap-3 text-white">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={companyName}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-contain border border-white/50 bg-white/15 backdrop-blur p-2"
                unoptimized
              />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/15 backdrop-blur">
                <Palmtree className="h-5 w-5" />
              </span>
            )}
            <span className="font-serif text-2xl tracking-wide">
              {companyName}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-xs font-semibold tracking-[0.25em] text-white uppercase lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="transition hover:text-[#e9cba7]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] text-[#253b37] uppercase transition hover:bg-white md:inline-flex"
              style={{ backgroundColor: "#e9cba7" }}
            >
              {navCta}
            </a>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#f6efe3] text-[#253b37]">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <motion.img
            src={heroImage}
            alt={`${companyName} travel experience`}
            onError={(event) => {
              event.currentTarget.src = defaultImageFallback.hero;
            }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172622]/95 via-[#172622]/45 to-[#172622]/20" />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pt-36 pb-16 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 46 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
              className="max-w-4xl text-white"
            >
              <p className="mb-5 text-xs font-semibold tracking-[0.35em] text-[#e9cba7] uppercase">
                {heroSubtitle}
              </p>
              <h1 className="font-serif text-5xl leading-[0.95] font-medium tracking-tight md:text-7xl lg:text-8xl">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82">
                {aboutUs}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 54 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
              className="w-full rounded-t-[4rem] border border-white/20 bg-white/90 p-7 shadow-2xl backdrop-blur md:max-w-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] text-[#b47a4a] uppercase">
                    {heroPlanTitle}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl">
                    {heroPlanSubtitle}
                  </h2>
                </div>
                <CalendarDays className="h-6 w-6 text-[#b47a4a]" />
              </div>
              <div className="space-y-3">
                {heroPlanFields.map((field: any) => (
                  <div
                    key={field.label}
                    className="border-b border-[#d8c6b0] py-3 last:border-b-0"
                  >
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#78827c] uppercase">
                      {field.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-[#253b37]">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#3a554f]"
                style={{ backgroundColor: "#253b37" }}
              >
                {heroPlanCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={aboutImage}
                alt="About us"
                onError={(event) => {
                  event.currentTarget.src = defaultImageFallback.about;
                }}
                className="aspect-[4/5] w-full rounded-t-[6rem] object-cover"
              />
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
                className="absolute -right-4 -bottom-8 hidden max-w-xs bg-[#c9ded2] p-7 shadow-xl md:block"
              >
                <p className="font-serif text-3xl leading-tight">
                  {aboutFloatingQuote}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-[#b47a4a] uppercase">
                We are {companyName}
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                {aboutTitle}
              </h2>
              <div className="mt-8 h-px w-24 bg-[#b47a4a]" />
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#596862]">
                {aboutUs}
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {aboutStats.map((stat, index) => (
                  <div key={index}>
                    <p className="font-serif text-4xl text-[#253b37]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm tracking-[0.18em] text-[#7c877f] uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-[#c9ded2] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.3em] text-[#6f5b3f] uppercase">
                  {servicesBadge}
                </p>
                <h2 className="mt-4 font-serif text-4xl md:text-6xl">
                  {servicesTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[#43524c]">
                {servicesDescription}
              </p>
            </motion.div>

            <div className="grid gap-px overflow-hidden rounded-[2rem] bg-[#9fb6aa] md:grid-cols-2">
              {services.map((service: any, index: number) => {
                const Icon = getIcon(service.icon);
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -6 }}
                    className="bg-[#f6efe3] p-8 md:p-10"
                  >
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#253b37] text-[#e9cba7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-3xl">{service.title}</h3>
                    <p className="mt-4 leading-8 text-[#5d6d66]">
                      {service.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section id="destinations" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.3em] text-[#b47a4a] uppercase">
                  {destinationsBadge}
                </p>
                <h2 className="mt-4 font-serif text-4xl md:text-6xl">
                  {destinationsTitle}
                </h2>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-[#253b37] uppercase"
              >
                {destinationsCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <div className="grid gap-7 md:grid-cols-3">
              {destinations.map((item: any, index: number) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8 }}
                  className="group bg-white"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(event) => {
                        event.currentTarget.src = travelFallback(
                          item.name,
                          item.place,
                          "#273c38",
                          "#c58f5d",
                        );
                      }}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#f6efe3] px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#253b37] uppercase">
                      {item.days}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center gap-2 text-sm text-[#7a847e]">
                      <MapPin className="h-4 w-4 text-[#b47a4a]" />
                      {item.place}
                    </div>
                    <h3 className="font-serif text-3xl">{item.name}</h3>
                    <div className="mt-5 flex items-center justify-between border-t border-[#eadfce] pt-5">
                      <span className="text-sm text-[#7a847e]">
                        starts from
                      </span>
                      <span className="text-xl font-semibold text-[#253b37]">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Horizontal Scrolling Testimonials Section */}
        <section id="reviews" className="bg-white px-6 py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.3em] text-[#b47a4a] uppercase">
                  {testimonialsBadge}
                </p>
                <h2 className="mt-4 font-serif text-4xl md:text-6xl">
                  {testimonialsTitle}
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollTestimonials("left")}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  aria-label="Previous"
                >
                  <ArrowRight className="w-5 h-5 rotate-180 stroke-[1.5]" />
                </button>
                <button
                  onClick={() => scrollTestimonials("right")}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  aria-label="Next"
                >
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </motion.div>

            <div
              ref={testimonialScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((t: any, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="min-w-[300px] md:min-w-[380px] lg:min-w-[420px] flex-shrink-0 snap-start bg-[#f6efe3] p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-l-4"
                  style={{ borderColor: "#e9cba7" }}
                >
                  <div className="flex gap-1 mb-4 text-[#b47a4a]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-base md:text-lg font-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#d8c6b0]">
                    <h4 className="font-serif text-lg font-medium text-[#253b37]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-[#7a847e] font-sans tracking-wide">
                      {t.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 text-center text-xs text-gray-400 md:hidden">
              ← Swipe to see more →
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
            >
              <div>
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-[#b47a4a] uppercase">
                  <Camera className="h-4 w-4" />
                  {galleryBadge}
                </p>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl">
                  {galleryTitle}
                </h2>
              </div>
              <p className="text-[#5d6d66]">
                {instagram
                  ? `@${instagram.split("/").pop()}`
                  : `@${companyName.toLowerCase().replace(/[^a-z0-9]+/g, "")}`}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm"
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <motion.div
                  animate={{ x: `-${activeGallery * 100}%` }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="flex"
                >
                  {galleryImages.map((image: string, index: number) => (
                    <div key={image} className="min-w-full">
                      <img
                        src={image}
                        alt={`${companyName} travel gallery ${index + 1}`}
                        onError={(event) => {
                          event.currentTarget.src = travelFallback(
                            "Gallery",
                            "Travel Experience",
                            "#28413d",
                            "#d5ad80",
                          );
                        }}
                        className="h-[360px] w-full object-cover md:h-[520px]"
                      />
                    </div>
                  ))}
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGallery(
                        (current) =>
                          (current - 1 + galleryImages.length) %
                          galleryImages.length,
                      )
                    }
                    className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                  >
                    Prev
                  </button>

                  <div className="flex gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Show gallery image ${index + 1}`}
                        onClick={() => setActiveGallery(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          activeGallery === index
                            ? "w-8 bg-white"
                            : "w-2.5 bg-white/45"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveGallery(
                        (current) => (current + 1) % galleryImages.length,
                      )
                    }
                    className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timings Section */}
        <section className="bg-[#c9ded2] px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-[#6f5b3f] uppercase">
                {timingsBadge}
              </p>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">
                {timingsTitle}
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#43524c]">
                {timingsDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="overflow-hidden rounded-[2rem] bg-[#f6efe3] shadow-sm"
            >
              {timings.map((item: any) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between gap-4 border-b border-[#d8c6b0] px-6 py-4 last:border-b-0"
                >
                  <span className="font-semibold text-[#253b37]">
                    {item.day}
                  </span>
                  <span className="text-sm font-semibold text-[#5d6d66]">
                    {item.close ? `${item.open} - ${item.close}` : item.open}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer with WhatsApp Form */}
        <footer id="contact" className="bg-[#253b37] px-6 py-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr_0.8fr]"
          >
            <div>
              <div className="flex items-center gap-3">
                {companyLogo ? (
                  <Image
                    src={companyLogo}
                    alt={companyName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-contain bg-[#e9cba7] p-2"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9cba7] text-[#253b37]">
                    <Palmtree className="h-5 w-5" />
                  </span>
                )}
                <span className="font-serif text-3xl">{companyName}</span>
              </div>
              <p className="mt-6 max-w-md leading-8 text-white/70">
                {footerDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-[#e9cba7] uppercase">
                Contact
              </h4>
              <div className="mt-5 space-y-3 text-white/75">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-3 transition hover:text-white"
                  >
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-[#e9cba7]" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.3em] text-[#e9cba7] uppercase">
                Send us a message
              </h4>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 space-y-3"
              >
                <input
                  {...register("name", { required: true })}
                  placeholder="Your name *"
                  className="w-full rounded-full bg-white px-5 py-3 text-sm text-[#253b37] outline-none focus:ring-2 focus:ring-[#e9cba7]"
                />
                <input
                  {...register("email", { required: true })}
                  placeholder="Email address *"
                  className="w-full rounded-full bg-white px-5 py-3 text-sm text-[#253b37] outline-none focus:ring-2 focus:ring-[#e9cba7]"
                />
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Your message *"
                  rows={3}
                  className="w-full rounded-[1.25rem] bg-white px-5 py-3 text-sm text-[#253b37] outline-none focus:ring-2 focus:ring-[#e9cba7] resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full px-5 py-3 text-sm font-semibold text-[#253b37] transition hover:bg-white hover:scale-[1.02] disabled:opacity-70"
                  style={{ backgroundColor: "#e9cba7" }}
                >
                  {isSubmitting ? "Sending..." : footerWhatsappCta}
                </button>
              </form>
            </div>
          </motion.div>

          <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-5 border-t border-white/15 pt-7 text-sm text-white/55 md:flex-row">
            <p>{footerCopyright}</p>
            <div className="flex gap-6">
              {instagram && instagram !== "#" && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              )}
              {facebook && facebook !== "#" && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
              )}
              {twitter && twitter !== "#" && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Twitter
                </a>
              )}
              {youtube && youtube !== "#" && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}