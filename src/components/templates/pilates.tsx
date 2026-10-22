"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Clock, User, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface PrillyPilatesStudioProps {
  data?: any;
}

interface StatItem {
  number: string;
  label: string;
}

interface BenefitItem {
  title: string;
  text: string;
}

interface ClassItem {
  title: string;
  desc: string;
  image: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  image: string;
}

// Universal Parser Helper
function resolveSectionArray<T>(
  dataStringInput: any,
  arrayInput: any,
  fallbackDefaults: T[],
  mapper: (tokens: string[]) => T
): T[] {
  if (Array.isArray(arrayInput) && arrayInput.length > 0) {
    return arrayInput;
  }

  const rawString = typeof dataStringInput === "string" && dataStringInput.trim()
    ? dataStringInput
    : typeof arrayInput === "string" && arrayInput.trim()
    ? arrayInput
    : null;

  if (rawString) {
    const items = rawString
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const tokens = item.split("|").map((t) => t.trim());
        return mapper(tokens);
      });
    if (items.length > 0) return items;
  }

  return fallbackDefaults;
}

export default function PrillyPilatesStudio({ data: rawData }: PrillyPilatesStudioProps) {
  // Safe extraction layer
  const data = rawData?.formData || rawData?.formJson?.[0] || rawData || {};

  const basic = data?.basicInfo || data || {};
  const hero = data?.heroSection || data || {};
  const whyData = data?.whyChooseUs || data || {};
  const classesData = data?.classes || data || {};
  const pricingData = data?.pricing || data || {};
  const featuresData = data?.features || data || {};
  const testimonialsData = data?.testimonials || data || {};
  const social = data?.socials || data || {};

  // Structural Branding
  const studioName = basic.name || "PRILLY";
  const studioSubName = basic.subName || "PILATES CLUB";
  
  // Hero Visual Structure Data
  const heroHeading = hero.headingLarge || "HEAL YOUR BODY AND MIND";
  const heroDesc = basic.tagline || "Engineered alignment methods designed to maximize structural core stability, optimize precise daily mechanics, and reclaim intentional movement pattern thresholds.";
  const membersText = hero.membersJoinedText || "More than 300 members have joined.";
  const heroCta = hero.ctaText || "JOIN CLUB";
  
  // Contact & Address Info
  const hotline = basic.hotline || social.hotline || "+1 234 567 8900";
  const email = basic.email || social.email || "info@prillypilates.com";
  const address = basic.address || social.address || "123 Balance Way, Wellness District";

  // Dynamic Array Resolutions
  const featuresArray = resolveSectionArray(
    featuresData.featuresDataString || featuresData.featuresString,
    featuresData.featuresList,
    [
      { title: "Precision Control", text: "Every minor posture motion matters to optimize stabilization goals." },
      { title: "Centered Breath", text: "Sync physical exertion thresholds dynamically to clear systemic internal exhaustion fields." }
    ],
    (tokens) => ({ title: tokens[0] || "Feature", text: tokens[1] || "Description" })
  );

  const timingsArray = resolveSectionArray(
    featuresData.timingsDataString || featuresData.timingsString,
    featuresData.timingsList,
    [
      { slot: "Morning Reformer", hours: "7:00 AM - 9:00 AM" },
      { slot: "Midday Power Flow", hours: "12:00 PM - 1:30 PM" },
      { slot: "Evening Core Burn", hours: "6:00 PM - 7:30 PM" }
    ],
    (tokens) => ({ slot: tokens[0] || "Slot", hours: tokens[1] || "Hours" })
  );

  const pricingArray = resolveSectionArray(
    pricingData.pricingDataString || pricingData.pricingString,
    pricingData.pricingList,
    [
      { title: "Standard Reformer Pass", desc: "Access to verified standard core level matrix setups.", price: "$120/month" },
      { title: "Premium Master Intake", desc: "Full tailored access with unlimited customized personal coaching blocks.", price: "$299/month" }
    ],
    (tokens) => ({ title: tokens[0] || "Pass Title", desc: tokens[1] || "Pass details", price: tokens[2] || "$0" })
  );

  const classesArray: ClassItem[] = resolveSectionArray(
    classesData.classDataString || classesData.classesDataString,
    classesData.classList,
    [
      { title: "Mat Pilates", desc: "A structural foundation leveraging calculated gravity resistance techniques.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600" },
      { title: "Reformer Pilates", desc: "Advanced resistance spring machinery calibrated for dynamic alignment loads.", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=600" },
      { title: "Tower Pilates", desc: "High-intensity technical vertical bar configurations targeting micro-muscle sets.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600" }
    ],
    (tokens) => ({
      title: tokens[0] || "Class Format",
      desc: tokens[1] || "Class details",
      image: tokens[2] || "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600"
    })
  );

  const testimonialsArray: TestimonialItem[] = resolveSectionArray(
    testimonialsData.testimonialDataString || testimonialsData.testimonialsDataString,
    testimonialsData.testimonialList,
    [
      { name: "Claire R.", role: "Club Member", text: "The architectural accuracy of the studio standard shifts your posture parameters instantly.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" },
      { name: "Marcus V.", role: "Performance Athlete", text: "Integrating these precision reformer loads corrected my structural muscle imbalances within weeks.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150" },
      { name: "Seraphina K.", role: "Movement Coach", text: "Prilly strips away the fluff. It is pure structural alignment execution combined with high-contrast design logic.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" }
    ],
    (tokens) => ({
      name: tokens[0] || "Member Name",
      role: tokens[1] || "Member",
      text: tokens[2] || "Great experience.",
      image: tokens[3] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    })
  );

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] antialiased font-sans selection:bg-[#D4EF68]/50">
      
      {/* NAVIGATION BAR */}
      <NavbarComponent studioName={studioName} studioSubName={studioSubName} heroCta={heroCta} />

      {/* HERO HEADER */}
      <header className="pt-36 lg:pt-48 max-w-7xl mx-auto px-6 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          <div className="lg:col-span-6 space-y-8 z-10">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.8rem] font-serif font-normal tracking-tight leading-[1.0] text-[#1C1C1C]">
              {heroHeading.split(' ').map((word: string, idx: number) => (
                <span key={idx} className="block uppercase tracking-wide">
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-[#7A7A7A] text-sm md:text-base leading-relaxed max-w-md font-sans pt-2">
              {heroDesc}
            </p>
          </div>

          <div className="lg:col-span-3 flex justify-center items-center py-8 lg:py-0">
            <div className="w-28 h-28 relative">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#1C1C1C] w-full h-full transform transition-transform duration-700 hover:rotate-90">
                <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
              </svg>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8 flex flex-col justify-end lg:items-end lg:text-right pt-8 lg:pt-24">
            <div className="space-y-2 lg:max-w-[240px]">
              <p className="text-xl md:text-2xl font-serif text-[#1C1C1C] leading-snug">
                {membersText}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 lg:justify-end">
              <Link 
                href="#testimonials" 
                className="text-xs font-sans font-black tracking-widest text-[#1C1C1C] border-b-2 border-transparent hover:border-[#1C1C1C] transition-all duration-200 flex items-center gap-1"
              >
                <span>WATCH STORY REVIEW</span>
                <span className="text-[9px] pl-0.5">▶</span>
              </Link>
            </div>
          </div>

        </div>
      </header>

      {/* MECHANICS & TIMETABLE */}
      <section id="features" className="w-full bg-[#1C1C1C] text-stone-300 py-20 border-t border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wide">Calibrated Mechanics Formula</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {featuresArray.map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-l border-stone-800 pl-4">
                  <h4 className="text-lg font-bold font-sans text-white uppercase tracking-wider">{item.title}</h4>
                  <p className="text-sm text-stone-400 leading-relaxed font-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 bg-stone-900 p-8 rounded-[1.5rem] space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#D4EF68] font-bold flex items-center gap-2">
              <Clock size={14} />
              <span>Lab Timetable</span>
            </h3>
            <div className="space-y-3 text-sm">
              {timingsArray.map((time: any, idx: number) => (
                <div key={idx} className="flex justify-between border-b border-stone-800 pb-2 last:border-none">
                  <span className="font-bold text-white uppercase tracking-wide">{time.slot}</span>
                  <span className="text-xs font-mono text-stone-500 ml-2">{time.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUsComponent whyData={whyData} />

      {/* PRICING */}
      <section id="pricing" className="w-full bg-stone-50 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
          <h2 className="text-4xl font-serif text-[#1C1C1C] tracking-tight">Active Access Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingArray.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-8 border border-stone-200 flex flex-col justify-between rounded-[2rem] hover:shadow-xl transition-shadow duration-300">
                <div className="space-y-2">
                  <h4 className="text-2xl font-serif text-[#1C1C1C] uppercase tracking-wide">{item.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed font-normal">{item.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-2xl font-mono text-[#1C1C1C] font-bold">{item.price}</span>
                  <Link 
                    href="#booking-anchor" 
                    className="bg-[#1C1C1C] text-white text-xs px-6 py-3 uppercase tracking-widest font-bold hover:bg-[#D4EF68] hover:text-[#1C1C1C] transition-colors duration-200"
                  >
                    Select Card
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="max-w-7xl mx-auto px-6 lg:px-16 py-24 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classesArray.slice(0, 3).map((item: ClassItem, idx: number) => (
            <div key={idx} className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 rounded-[1.8rem] group">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-6 rounded-[1.2rem] border border-white/20 shadow-lg">
                <h3 className="text-xl font-sans font-medium text-stone-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="w-full py-24 bg-[#1C1C1C] border-b border-stone-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div 
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialsArray.map((item: TestimonialItem, idx: number) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center bg-stone-900/60 p-8 rounded-[2rem] border border-stone-800/80 flex flex-col justify-between space-y-8"
              >
                <p className="text-white text-lg md:text-xl font-serif italic leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-stone-800/60">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#D4EF68]" />
                  <div className="text-left font-sans">
                    <h5 className="text-sm uppercase tracking-widest font-bold text-white">{item.name}</h5>
                    <p className="text-xs text-stone-500 font-mono lowercase tracking-normal">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA STRIP */}
      <section id="booking-anchor" className="w-full py-24 bg-[#D4EF68] text-[#1C1C1C] text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl md:text-5xl font-serif uppercase tracking-tight font-normal">Request Entry Registry</h3>
          <p className="text-stone-700 max-w-md mx-auto text-sm leading-relaxed font-sans font-normal">
            All configuration alignments are managed via active intake parameters. Connect directly to our secure WhatsApp channel to verify live weekly studio availability slots.
          </p>
          <div className="pt-4 flex justify-center">
            <a 
              href={`https://wa.me/${social.whatsappNumber || "911234567890"}?text=${encodeURIComponent("Hello Prilly Pilates Desk, checking structural active membership intake status.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1C1C1C] hover:bg-stone-900 text-white text-xs font-bold uppercase tracking-widest px-8 py-4.5 shadow-xl transition-transform hover:scale-105 duration-200"
            >
              <FaWhatsapp size={16} className="text-[#D4EF68]" />
              <span>Initialize Desk Booking</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <FooterComponent 
        studioName={studioName} 
        studioSubName={studioSubName} 
        hotline={hotline} 
        email={email} 
        address={address} 
        social={social} 
      />

    </div>
  );
}

// WHY CHOOSE US
function WhyChooseUsComponent({ whyData }: { whyData: any }) {
  const part1 = whyData?.whyTitlePart1 || "A growing community dedicated";
  const part2 = whyData?.whyTitlePart2 || "to health and wellness, empowering each other to build strength, find balance, and embrace mindful";
  const part3 = whyData?.whyTitlePart3 || "— creating a space where movement inspires harmony.";
  const inlineImg = whyData?.inlineAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100";

  const finalStats: StatItem[] = resolveSectionArray(
    whyData?.statsDataString,
    whyData?.statsList,
    [
      { number: "16", label: "Certified pilates instructors team" },
      { number: "5+", label: "Years of experience in pilates practice" },
      { number: "42", label: "An empowering weekly pilates workout" },
      { number: "300+", label: "Empowered pilates members community" }
    ],
    (tokens) => ({ number: tokens[0] || "0", label: tokens[1] || "Metric" })
  );

  const finalBenefits: BenefitItem[] = resolveSectionArray(
    whyData?.benefitsDataString,
    whyData?.benefitsList,
    [
      { title: "Increased Strength of Body & Mind", text: "Calculated structural muscle refinement paired with dynamic mental focus methods." },
      { title: "Increase Flexibility and Mobility", text: "Systematic motion expansion to protect alignment posture under heavy loads." },
      { title: "Improve Body Balance and Coordination", text: "Refine localized core engagement stability grids across active training intervals." },
      { title: "Mental Health and Stress Management", text: "Decompress tension architecture through intentional high-end breathing models." }
    ],
    (tokens) => ({ title: tokens[0] || "Benefit", text: tokens[1] || "Description" })
  );

  const iconSet = [
    <svg key="icon-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M6 3h12M6 21h12M4 7h16M4 17h16M10 7v10M14 7v10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="icon-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>,
    <svg key="icon-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>,
    <svg key="icon-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 21C12 21 4 13.6 4 8.5C4 5.4 6.5 3 9.5 3C11.2 3 12.7 3.8 13.5 5C14.3 3.8 15.8 3 17.5 3C20.5 3 23 5.4 23 8.5C23 13.6 15 21 15 21z"/></svg>
  ];

  return (
    <section id="why-choose-us" className="w-full py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-20">
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.45rem] font-sans font-normal leading-[1.6] text-stone-800 tracking-tight">
            {part1}{" "}
            <span className="inline-flex items-center justify-center bg-[#D4EF68] text-[#1C1C1C] px-3.5 py-1 mx-1.5 rounded-full transform -translate-y-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 22C12 22 17 17 19 14C21 11 20 7 17 7C15 7 13 9 12 11C11 9 9 7 7 7C4 7 3 11 5 14C7 17 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>{" "}
            {part2}{" "}
            <span className="inline-flex items-center bg-[#1c3242] w-12 h-6 mx-1.5 rounded-full overflow-hidden align-middle relative transform -translate-y-0.5">
              <img src={inlineImg} alt="Inline icon" className="w-full h-full object-cover scale-125 object-top" />
            </span>{" "}
            {part3}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center pt-4">
          {finalStats.slice(0, 4).map((stat: StatItem, idx: number) => (
            <div key={idx} className="space-y-2">
              <div className="text-5xl sm:text-6xl font-serif font-light tracking-tight text-[#1C1C1C]">
                {stat.number}
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-sans font-medium max-w-[180px] mx-auto leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {finalBenefits.slice(0, 4).map((benefit: BenefitItem, idx: number) => {
            const isLimeCard = idx % 2 === 0;

            return (
              <div 
                key={idx}
                className={`p-8 rounded-[1.8rem] flex flex-col justify-between min-h-[350px] border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
                  isLimeCard 
                    ? "bg-[#D4EF68] text-[#1C1C1C] border-[#c2dc5a]" 
                    : "bg-[#1C1C1C] text-white border-stone-900"
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-10 ${
                    isLimeCard ? "bg-[#1C1C1C] text-[#D4EF68]" : "bg-[#D4EF68] text-[#1C1C1C]"
                  }`}>
                    {iconSet[idx % iconSet.length]}
                  </div>
                  <h3 className="text-2xl font-sans font-medium tracking-tight leading-snug">
                    {benefit.title}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed pt-8 border-t font-normal ${
                  isLimeCard ? "text-[#3D3D3D] border-[#1C1C1C]/10" : "text-stone-400 border-stone-800"
                }`}>
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// NAVBAR
function NavbarComponent({ studioName, studioSubName, heroCta }: { studioName: string; studioSubName: string; heroCta: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-6 lg:px-16 py-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-stone-100">
      <Link href="#" className="flex flex-col text-[#1C1C1C] font-serif leading-none tracking-tight">
        <span className="text-2xl font-bold tracking-widest uppercase">{studioName}</span>
        <span className="text-[9px] font-sans font-extrabold tracking-[0.25em] text-stone-400 pl-0.5 pt-0.5">{studioSubName}</span>
      </Link>

      <div className="hidden md:flex items-center gap-7 bg-[#1C1C1C] text-stone-300 font-sans text-xs uppercase tracking-widest font-bold px-9 py-4.5 rounded-full shadow-lg">
        <Link href="#" className="hover:text-[#D4EF68] transition-colors">Home</Link>
        <Link href="#features" className="hover:text-[#D4EF68] transition-colors">Formula</Link>
        <Link href="#why-choose-us" className="hover:text-[#D4EF68] transition-colors">Why Choose Us</Link>
        <Link href="#pricing" className="hover:text-[#D4EF68] transition-colors">Pricing</Link>
        <Link href="#classes" className="hover:text-[#D4EF68] transition-colors">Classes</Link>
        <Link href="#testimonials" className="hover:text-[#D4EF68] transition-colors">Testimonials</Link>
      </div>

      <div className="hidden md:block">
        <Link 
          href="#booking-anchor" 
          className="bg-[#D4EF68] text-[#1C1C1C] text-xs font-bold uppercase tracking-widest px-8 py-4.5 rounded-full shadow-sm flex items-center gap-2 hover:bg-[#c2dc5a] transition-all duration-300"
        >
          <User size={14} />
          <span>{heroCta}</span>
        </Link>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#1C1C1C] p-1">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 p-8 flex flex-col space-y-4 uppercase tracking-widest text-xs font-bold text-center shadow-xl">
          <Link href="#" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#features" onClick={() => setIsOpen(false)}>Formula</Link>
          <Link href="#why-choose-us" onClick={() => setIsOpen(false)}>Why Choose Us</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="#classes" onClick={() => setIsOpen(false)}>Classes</Link>
          <Link href="#testimonials" onClick={() => setIsOpen(false)}>Testimonials</Link>
        </div>
      )}
    </nav>
  );
}

// FOOTER WITH HOTLINE PHONE NUMBER
function FooterComponent({ studioName, studioSubName, hotline, email, address, social }: any) {
  const fbLink = social.facebook || "https://facebook.com";
  const igLink = social.instagram || "https://instagram.com";
  const twLink = social.twitter || "https://twitter.com";
  const liLink = social.linkedin || "https://linkedin.com";

  return (
    <footer className="w-full bg-[#1C1C1C] text-stone-500 pt-16 pb-12 px-6 lg:px-16 font-sans text-xs uppercase tracking-wider font-medium border-t border-stone-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 items-start">
        
        {/* COL 1: IDENTITY & CONTACT INFO */}
        <div className="font-serif text-left space-y-4">
          <h4 className="text-white text-xl font-bold tracking-widest uppercase">{studioName} {studioSubName}</h4>
          <div className="text-stone-500 tracking-normal normal-case text-xs font-sans max-w-xs leading-relaxed space-y-1">
            <p>{address}</p>
            <p className="text-stone-400 font-medium">{email}</p>
            {hotline && (
              <p className="flex items-center gap-2 pt-2 text-[#D4EF68] font-mono text-sm font-bold">
                <Phone size={14} className="text-[#D4EF68]" />
                <span>{hotline}</span>
              </p>
            )}
          </div>
        </div>

        {/* COL 2: QUICK LINKS */}
        <div className="flex flex-col space-y-2 text-left">
          <h5 className="text-white text-[11px] font-bold tracking-widest mb-2 font-sans text-stone-400">QUICK LINKS</h5>
          <Link href="#" className="hover:text-white text-stone-500 transition-colors w-max">HOME INDEX</Link>
          <Link href="#features" className="hover:text-white text-stone-500 transition-colors w-max">LAB FORMULA</Link>
          <Link href="#why-choose-us" className="hover:text-white text-stone-500 transition-colors w-max">WHY CHOOSE US</Link>
          <Link href="#classes" className="hover:text-white text-stone-500 transition-colors w-max">FORMATS CATALOG</Link>
          <Link href="#testimonials" className="hover:text-white text-stone-500 transition-colors w-max">TESTIMONIAL REVIEWS</Link>
          <Link href="#pricing" className="hover:text-white text-stone-500 transition-colors w-max">PRICING PASSES</Link>
        </div>

        {/* COL 3: SOCIAL MEDIA HUBS */}
        <div className="space-y-4 md:text-right flex flex-col md:items-end">
          <h5 className="text-white text-[11px] font-bold tracking-widest font-sans text-stone-400">CONNECT HUBS</h5>
          <div className="flex items-center gap-6 pt-1">
            <a href={fbLink} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#D4EF68] transition-colors"><FaFacebookF size={22} /></a>
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#D4EF68] transition-colors"><FaInstagram size={22} /></a>
            <a href={twLink} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#D4EF68] transition-colors"><FaTwitter size={22} /></a>
            <a href={liLink} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#D4EF68] transition-colors"><FaLinkedinIn size={22} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}