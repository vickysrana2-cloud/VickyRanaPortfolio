"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowUp,
  ArrowUpRight,
  Star,
  Quote,
  Flame,
  Clock,
  Check,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Parsing helpers — every *DataString field is "a | b | c , a2 | b2 | c2"
// ---------------------------------------------------------------------------

const splitEntries = (data: any): string[] => {
  if (typeof data !== "string" || data.trim() === "") return [];
  return data
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const parseClasses = (data: any, fallback: any[]): any[] => {
  const entries = splitEntries(data);
  if (entries.length === 0) return fallback;
  const items = entries
    .map((entry) => {
      const p = entry.split("|").map((s) => s.trim());
      if (p.length < 4) return null;
      return { title: p[0], price: p[1], duration: p[2], level: p[3], image: p[4] || "" };
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
};

const parsePricing = (data: any, fallback: any[]): any[] => {
  const entries = splitEntries(data);
  if (entries.length === 0) return fallback;
  const items = entries
    .map((entry) => {
      const p = entry.split("|").map((s) => s.trim());
      if (p.length < 3) return null;
      return { title: p[0], desc: p[1], price: p[2] };
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
};

const parsePairs = (data: any, fallback: any[]): any[] => {
  const entries = splitEntries(data);
  if (entries.length === 0) return fallback;
  const items = entries
    .map((entry) => {
      const p = entry.split("|").map((s) => s.trim());
      if (p.length < 2) return null;
      return { title: p[0], desc: p[1] };
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
};

const parseTimings = (data: any, fallback: any[]): any[] => {
  const entries = splitEntries(data);
  if (entries.length === 0) return fallback;
  const items = entries
    .map((entry) => {
      const p = entry.split("|").map((s) => s.trim());
      if (p.length < 2) return null;
      return { slot: p[0], hours: p[1] };
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
};

const parseTestimonials = (data: any, fallback: any[]): any[] => {
  const entries = splitEntries(data);
  if (entries.length === 0) return fallback;
  const items = entries
    .map((entry) => {
      const p = entry.split("|").map((s) => s.trim());
      if (p.length < 3) return null;
      return { name: p[0], role: p[1], text: p[2], rating: Number(p[3]) || 5, image: p[4] || "" };
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DanceMartial({ data = {} }: { data?: any } = {}) {
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const whyChooseUs = data?.whyChooseUs || {};
  const classesTab = data?.classes || {};
  const featuresTab = data?.features || {};
  const pricingTab = data?.pricing || {};
  const testimonialsTab = data?.testimonials || {};
  const socials = data?.socials || {};

  // Basic info
  const studioName = basicInfo.name || "kova";
  const logoUrl = basicInfo.logoUrl || "";
  const tagline =
    basicInfo.tagline ||
    "At Kova, we build strength, discipline, and confidence through dance and martial arts training for every level.";
  const email = basicInfo.email || "info@kovastudio.com";
  const hotline = basicInfo.hotline || "+91 12345 67890";
  const address = basicInfo.address || "Riverside Training District, Unit 7";

  // Hero
  const badge = heroSection.badge || "DANCE & MARTIAL ARTS FOR EVERY BODY";
  const headingBold = heroSection.headingBold || "Move with power";
  const headingLight = heroSection.headingLight || "through disciplined practice";
  const bgImage =
    heroSection.bgImage ||
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1400&auto=format&fit=crop";
  const statMembers = heroSection.statMembers || "3,200+";
  const statTagNumber = heroSection.statTagNumber || "12+ Years";
  const statTagSub = heroSection.statTagSub || "TRAINING EXPERIENCE";

  // Why choose us
  const whyTag = whyChooseUs.whyTag || "WHY TRAIN WITH US";
  const whyTitle = whyChooseUs.whyTitle || "Transform your body and mindset from the ground up";
  const whyDesc =
    whyChooseUs.whyDesc ||
    "Dance and martial arts are more than physical training; they are a disciplined path to coordination, resilience, and mental focus.";
  const defaultBenefits = [
    { title: "Improved Coordination", desc: "Footwork and form sharpen body control." },
    { title: "Mental Focus", desc: "Structured drills build discipline and calm." },
    { title: "Real Strength", desc: "Conditioning that carries into everyday life." },
    { title: "Community", desc: "Train alongside people pushing for the same growth." },
  ];
  const benefits = parsePairs(whyChooseUs.benefitsDataString, defaultBenefits);

  // Classes
  const classesTitle = classesTab.classesTitle || "Find Your Discipline";
  const classesSubTitle =
    classesTab.classesSubTitle || "Expert coaching in dance and martial arts for every age and skill level.";
  const defaultClasses = [
    { title: "Muay Thai Fundamentals", price: "$35/class", duration: "60 min", level: "All levels", image: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=700" },
    { title: "Contemporary Flow", price: "$28/class", duration: "50 min", level: "Intermediate", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=700" },
    { title: "Brazilian Jiu-Jitsu", price: "$40/class", duration: "75 min", level: "All levels", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=700" },
    { title: "Street & Hip-Hop", price: "$25/class", duration: "45 min", level: "Beginner", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=700" },
  ];
  const classes = parseClasses(classesTab.classDataString, defaultClasses);

  // Features / pillars + timings
  const featuresTitle = featuresTab.featuresTitle || "Building discipline, strength, and confidence through movement";
  const defaultPillars = [
    { title: "Discipline", desc: "Structured training builds lasting focus." },
    { title: "Strength", desc: "Conditioning drills forge real power." },
    { title: "Precision", desc: "Every technique is drilled until it's instinct." },
  ];
  const pillars = parsePairs(featuresTab.featuresDataString, defaultPillars);

  const timingsTitle = featuresTab.timingsTitle || "Class Schedule";
  const defaultTimings = [
    { slot: "Morning Conditioning", hours: "6:00 AM - 8:00 AM" },
    { slot: "Youth Classes", hours: "4:00 PM - 5:30 PM" },
    { slot: "Evening Sparring", hours: "6:00 PM - 8:00 PM" },
  ];
  const timings = parseTimings(featuresTab.timingsDataString, defaultTimings);

  // Pricing
  const pricingTag = pricingTab.pricingTag || "TRAINING PACKAGES";
  const pricingTitle = pricingTab.pricingTitle || "Train with purpose and see real progress";
  const defaultPricing = [
    { title: "Open Mat", desc: "Drop-in access to any class", price: "$35/session" },
    { title: "Private Coaching", desc: "One-on-one technique sessions", price: "$90/session" },
    { title: "Sparring Package", desc: "Guided sparring and conditioning", price: "$220/month" },
  ];
  const pricingPlans = parsePricing(pricingTab.pricingDataString, defaultPricing);

  // Testimonials
  const testimonialTag = testimonialsTab.testimonialTag || "TESTIMONIAL";
  const testimonialTitle = testimonialsTab.testimonialTitle || "Student Feedback & Reviews";
  const defaultTestimonials = [
    { name: "Arjun K.", role: "Software Engineer", text: "The instructors pushed me further than I thought possible and my footwork has never been sharper.", rating: 5, image: "" },
    { name: "Meera S.", role: "Physiotherapist", text: "I came in stiff and self-conscious. Six months later I move like I mean it.", rating: 5, image: "" },
    { name: "Rohan D.", role: "College Student", text: "Sparring nights are brutal and I look forward to every one of them.", rating: 5, image: "" },
  ];
  const testimonials = parseTestimonials(testimonialsTab.testimonialDataString, defaultTestimonials);

  // Socials
  const whatsappClean = String(socials.whatsappNumber || "911234567890").replace(/\s/g, "");
  const facebook = socials.facebook || "https://facebook.com";
  const instagram = socials.instagram || "https://instagram.com";
  const twitter = socials.twitter || "https://twitter.com";
  const linkedin = socials.linkedin || "https://linkedin.com";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimIndex, setTestimIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const nextTestimonial = () => setTestimIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const activeTestimonial = testimonials[testimIndex] || testimonials[0];

  const navItems = ["Home", "Classes", "Schedule", "Pricing", "Reviews"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.01em; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
        .clip-diagonal-rev { clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%); }
      `}</style>

      <div className="relative min-h-screen bg-[#F6F4EF] text-[#17181C] font-sans overflow-x-hidden selection:bg-[#D6402C] selection:text-white">
        {/* Floating WhatsApp Button */}
        {whatsappClean && (
          <a
            href={`https://wa.me/${whatsappClean.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Hello ${studioName}, I'd like to inquire about classes.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        )}

        {showBackToTop && (
          <button
            onClick={() => scrollToSection("home")}
            className="fixed bottom-24 right-8 z-50 bg-[#17181C] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#F6F4EF]/95 backdrop-blur-md border-b border-black/5">
          <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer gap-3" onClick={() => scrollToSection("home")}>
              {logoUrl ? (
                <Image src={logoUrl} alt={studioName} width={40} height={40} className="w-10 h-10 object-contain" unoptimized />
              ) : (
                <span className="w-10 h-10 bg-[#17181C] text-white flex items-center justify-center font-display text-lg">
                  {studioName.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="text-2xl font-display uppercase tracking-tight">
                {studioName}
              </span>
            </div>

            <div className="hidden md:flex space-x-10 items-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#17181C]/70 hover:text-[#D6402C] font-sans font-medium text-sm transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("classes")}
                className="inline-flex items-center gap-1.5 bg-[#D6402C] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#17181C] transition-colors"
              >
                Book a Class
                <ArrowUpRight size={15} />
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <div
            className={`md:hidden bg-[#F6F4EF] border-b border-black/5 overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col space-y-5 px-6 py-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-lg font-display uppercase"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("classes")}
                className="inline-flex items-center justify-center gap-1.5 bg-[#D6402C] text-white text-sm font-semibold px-6 py-3"
              >
                Book a Class
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero */}
          <section id="home" className="relative pt-20">
            <div className="grid lg:grid-cols-2 min-h-[85vh]">
              <div className="flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 self-start bg-[#17181C] text-white text-xs font-semibold px-4 py-2 mb-8">
                  <Flame size={14} className="text-[#D6402C]" />
                  {badge}
                </div>

                <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl leading-[0.95] uppercase">
                  {headingBold}
                </h1>
                <p className="font-sans italic text-2xl sm:text-3xl text-[#17181C]/60 mt-3 max-w-md">
                  {headingLight}
                </p>

                <p className="text-[#17181C]/70 text-base leading-7 max-w-md mt-8">{tagline}</p>

                <div className="flex flex-wrap gap-4 mt-10">
                  <button
                    onClick={() => scrollToSection("classes")}
                    className="inline-flex items-center gap-2 bg-[#D6402C] text-white font-semibold px-9 py-4 hover:bg-[#17181C] transition-colors"
                  >
                    View Classes
                    <ChevronRight size={18} />
                  </button>
                  <a
                    href={`tel:${hotline}`}
                    className="inline-flex items-center gap-2 border-2 border-[#17181C] font-semibold px-9 py-4 hover:bg-[#17181C] hover:text-white transition-colors"
                  >
                    {hotline}
                  </a>
                </div>

                <div className="flex items-center gap-10 mt-14">
                  <div>
                    <h3 className="text-3xl font-display">{statMembers}</h3>
                    <p className="text-[#17181C]/60 text-sm mt-1">Active members</p>
                  </div>
                  <div className="w-px h-10 bg-[#17181C]/15" />
                  <div>
                    <h3 className="text-3xl font-display">{statTagNumber}</h3>
                    <p className="text-[#17181C]/60 text-sm mt-1">{statTagSub}</p>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 min-h-[45vh] lg:min-h-full">
                <div className="absolute inset-0 clip-diagonal-rev lg:clip-diagonal">
                  <img src={bgImage} alt={studioName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17181C]/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-28 px-6 lg:px-16 bg-[#17181C] text-white">
            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-[#D6402C] font-semibold text-sm">{whyTag}</span>
                <h2 className="font-display text-4xl sm:text-5xl uppercase mt-4 leading-[1.05]">{whyTitle}</h2>
                <p className="text-white/60 leading-relaxed mt-6 max-w-md">{whyDesc}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-white/10">
                {benefits.map((b: any, idx: number) => (
                  <div key={idx} className="bg-[#17181C] p-8">
                    <Check className="text-[#D6402C] mb-4" size={22} />
                    <h4 className="font-display text-lg uppercase mb-2">{b.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Classes */}
          <section id="classes" className="py-28 px-6 lg:px-16">
            <div className="max-w-[1400px] mx-auto">
              <div className="max-w-xl mb-16">
                <h2 className="font-display text-4xl sm:text-5xl uppercase">{classesTitle}</h2>
                <p className="text-[#17181C]/60 mt-4">{classesSubTitle}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {classes.map((c: any, idx: number) => (
                  <div key={idx} className="group relative h-[360px] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#D6402C] text-white text-xs font-semibold px-3 py-1">
                      {c.level}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="font-display text-xl uppercase">{c.title}</h3>
                      <div className="flex items-center justify-between mt-2 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {c.duration}
                        </span>
                        <span className="font-semibold">{c.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features + Timings */}
          <section id="schedule" className="py-28 px-6 lg:px-16 bg-[#EFEBE2]">
            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase leading-[1.1] mb-10">{featuresTitle}</h2>
                <div className="space-y-8">
                  {pillars.map((p: any, idx: number) => (
                    <div key={idx} className="flex gap-5 border-b border-black/10 pb-8">
                      <span className="font-display text-2xl text-[#D6402C]">{String(idx + 1).padStart(2, "0")}</span>
                      <div>
                        <h4 className="font-display text-lg uppercase">{p.title}</h4>
                        <p className="text-[#17181C]/60 text-sm mt-1 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#17181C] text-white p-10">
                <h3 className="font-display text-2xl uppercase mb-8">{timingsTitle}</h3>
                <div className="space-y-1">
                  {timings.map((t: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                      <span className="font-medium">{t.slot}</span>
                      <span className="text-[#D6402C] font-semibold text-sm">{t.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="py-28 px-6 lg:px-16">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[#D6402C] font-semibold text-sm">{pricingTag}</span>
                <h2 className="font-display text-4xl sm:text-5xl uppercase mt-4">{pricingTitle}</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.map((plan: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-10 border-2 ${
                      idx === 1 ? "border-[#D6402C] bg-[#17181C] text-white" : "border-[#17181C]/10"
                    }`}
                  >
                    <h4 className="font-display text-xl uppercase">{plan.title}</h4>
                    <p className={`text-sm mt-2 mb-8 ${idx === 1 ? "text-white/60" : "text-[#17181C]/60"}`}>
                      {plan.desc}
                    </p>
                    <p className="font-display text-3xl mb-8">{plan.price}</p>
                    <button
                      className={`w-full py-3.5 font-semibold transition-colors ${
                        idx === 1
                          ? "bg-[#D6402C] text-white hover:bg-white hover:text-[#17181C]"
                          : "bg-[#17181C] text-white hover:bg-[#D6402C]"
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="reviews" className="py-28 px-6 lg:px-16 bg-[#EFEBE2]">
            <div className="max-w-[900px] mx-auto text-center">
              <span className="text-[#D6402C] font-semibold text-sm">{testimonialTag}</span>
              <h2 className="font-display text-4xl sm:text-5xl uppercase mt-4 mb-14">{testimonialTitle}</h2>

              {activeTestimonial && (
                <div className="relative">
                  <Quote className="text-[#D6402C]/30 w-14 h-14 mx-auto mb-6" />
                  <p className="font-display text-xl sm:text-2xl uppercase leading-snug mb-8">
                    {activeTestimonial.text}
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: activeTestimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-[#D6402C] fill-[#D6402C]" />
                    ))}
                  </div>
                  <p className="font-semibold">{activeTestimonial.name}</p>
                  <p className="text-[#17181C]/60 text-sm">{activeTestimonial.role}</p>
                </div>
              )}

              {testimonials.length > 1 && (
                <div className="flex justify-center gap-4 mt-12">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 border-2 border-[#17181C]/15 hover:border-[#D6402C] hover:text-[#D6402C] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 border-2 border-[#17181C]/15 hover:border-[#D6402C] hover:text-[#D6402C] transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#17181C] text-white pt-20 pb-10 px-6 lg:px-16">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-14">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {logoUrl ? (
                  <Image src={logoUrl} alt={studioName} width={40} height={40} className="w-10 h-10 object-contain" unoptimized />
                ) : (
                  <span className="w-10 h-10 bg-[#D6402C] text-white flex items-center justify-center font-display text-lg">
                    {studioName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-2xl font-display uppercase">{studioName}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">{tagline}</p>
              <div className="flex gap-3 mt-6">
                {[
                  { href: instagram, label: "IG" },
                  { href: facebook, label: "FB" },
                  { href: twitter, label: "X" },
                  { href: linkedin, label: "IN" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-9 h-9 border border-white/20 flex items-center justify-center text-xs hover:border-[#D6402C] hover:text-[#D6402C] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display uppercase text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-white/60 hover:text-[#D6402C] text-sm transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display uppercase text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#D6402C]" /> {email}
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#D6402C]" /> {hotline}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#D6402C]" /> {address}
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} {studioName}. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
