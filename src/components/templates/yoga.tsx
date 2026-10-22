"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Sunrise, Leaf, Heart, Sparkles, Star, Quote, 
  Clock, Layers, CheckCircle 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface YovaYogaStudioProps {
  data?: any;
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

export default function YovaYogaStudio({ data: rawData }: YovaYogaStudioProps) {
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

  // Studio Basic Info
  const studioName = basic.name || "yova";
  const studioTagline = basic.tagline || "At Yova, we help you build strength, flexibility, and inner calm through accessible yoga practices designed for modern living.";
  
  // Hero Section
  const heroBadge = hero.badge || "MODERN YOGA FOR BALANCED LIVING";
  const heroBold = hero.headingBold || "Find balance";
  const heroLight = hero.headingLight || "through mindful yoga practice";
  const heroImg = hero.bgImage || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200";
  const statMembers = hero.statMembers || "2,500+";
  const statTagNumber = hero.statTagNumber || "10+ Years";
  const statTagSub = hero.statTagSub || "STUDIO EXPERIENCE";

  // Section Headers & Titles
  const featuresTitle = featuresData.featuresTitle || "Empowering people through mindful movement and wellness";
  const timingsTitle = featuresData.timingsTitle || "Class Timings";

  const whyTag = whyData.whyTag || "WHY CHOOSE YOGA";
  const whyTitle = whyData.whyTitle || "Transform your system from the inside out";
  const whyDesc = whyData.whyDesc || "Yoga is more than basic movement; it is an integrated engineering blueprint for continuous physical alignment and mental calmness.";

  const pricingTag = pricingData.pricingTag || "PREMIUM PACKAGE";
  const pricingTitle = pricingData.pricingTitle || "Build a career that supports healthier lives";

  const classesTitle = classesData.classesTitle || "Find What You Love";
  const classesSubTitle = classesData.classesSubTitle || "World-class instruction for every level and lifestyle.";

  const testimonialTag = testimonialsData.testimonialTag || "TESTIMONIAL";
  const testimonialTitle = testimonialsData.testimonialTitle || "Client Feedback & Reviews";

  // Footer & Social
  const hotline = basic.hotline || social.hotline || "+91 12345 67890";
  const email = basic.email || social.email || "info@aurayoga.com";
  const address = basic.address || social.address || "Wellness District Block 4B";

  // Array Resolutions
  const featuresArray = resolveSectionArray(
    featuresData.featuresDataString || featuresData.featuresString,
    featuresData.featuresList,
    [
      { title: "Compassion", text: "Amet hendrerit inceptos dolor dictumst blandit." },
      { title: "Mindfulness", text: "Blandit nascetur dapibus mauris class inceptos." },
      { title: "Growth", text: "Dictumst cras platea cubilia habitasse congue sit." },
      { title: "Authenticity", text: "Maecenas tristique pretium cubilia sodales cursus." }
    ],
    (tokens) => ({ title: tokens[0] || "Pillar", text: tokens[1] || "Description text" })
  );

  const timingsArray = resolveSectionArray(
    featuresData.timingsDataString || featuresData.timingsString,
    featuresData.timingsList,
    [
      { slot: "Morning Flows", hours: "6:00 AM - 9:00 AM" },
      { slot: "Midday Alignment", hours: "12:00 PM - 2:00 PM" },
      { slot: "Evening Vinyasa", hours: "5:00 PM - 8:00 PM" },
      { slot: "Weekend Restorative", hours: "8:00 AM - 11:00 AM" }
    ],
    (tokens) => ({ slot: tokens[0] || "Slot", hours: tokens[1] || "Hours" })
  );

  const benefitsArray = resolveSectionArray(
    whyData.benefitsDataString || whyData.benefitsString || whyData.benefits,
    whyData.benefitsList,
    [
      { title: "Enhanced Flexibility", text: "Regular practice stretches and tones the muscle matrices, deeply improving joint mobility." },
      { title: "Mental Clarity", text: "By pairing conscious breathing with precise motion patterns, yoga lowers structural cortisol levels." },
      { title: "Core Strength", text: "Holding balance postures dynamically anchors your center of gravity, building target muscle stamina." },
      { title: "Sleep Optimization", text: "The deeply restorative nature of targeted sequences helps settle the nervous system." }
    ],
    (tokens) => ({ title: tokens[0] || "Benefit Title", text: tokens[1] || "Benefit details and descriptions go here." })
  );

  const pricingArray = resolveSectionArray(
    pricingData.pricingDataString || pricingData.pricingString || pricingData.pricing,
    pricingData.pricingList,
    [
      { title: "Private Coaching", desc: "Porta maximus justo praesent quam consectetuer convallis.", price: "$85/session" },
      { title: "Couples Package", desc: "Porta maximus justo praesent quam consectetuer convallis.", price: "$199/month" },
      { title: "10-Class Pack", desc: "Porta maximus justo praesent quam consectetuer convallis.", price: "$250" },
      { title: "Student Discount", desc: "Porta maximus justo praesent quam consectetuer convallis.", price: "25% off" }
    ],
    (tokens) => ({
      title: tokens[0] || "Package Tier",
      desc: tokens[1] || "Package details and offerings.",
      price: tokens[2] || "Custom"
    })
  );

  const classesArray = resolveSectionArray(
    classesData.classDataString || classesData.classesDataString || classesData.classString,
    classesData.classList,
    [
      { title: "Vinyasa Flow", price: "$29/class", duration: "60 min", level: "All levels", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600" },
      { title: "Power Yoga", price: "$32/class", duration: "75 min", level: "Intermediate", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600" },
      { title: "Mindful Meditation", price: "$25/class", duration: "45 min", level: "Beginners", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600" }
    ],
    (tokens) => ({
      title: tokens[0] || "Class Offering",
      price: tokens[1] || "$0",
      duration: tokens[2] || "60 min",
      level: tokens[3] || "All Levels",
      image: tokens[4] || "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600"
    })
  );

  const testimonialsArray = resolveSectionArray(
    testimonialsData.testimonialDataString || 
      testimonialsData.testimonialsDataString || 
      testimonialsData.testimonialString ||
      testimonialsData.testimonialsString ||
      testimonialsData.testimonials,
    testimonialsData.testimonialList || testimonialsData.testimonialsList,
    [
      { 
        name: "Sarah M.", 
        role: "Marketing Director", 
        text: "The classes are easy to follow and have significantly improved my flexibility.", 
        rating: 5, 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150" 
      },
      { 
        name: "Emma L.", 
        role: "Entrepreneur", 
        text: "More than yoga, Yova has become an important part of my wellbeing routine.", 
        rating: 5, 
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" 
      }
    ],
    (tokens) => ({
      name: tokens[0] || "Client Name",
      role: tokens[1] || "Member",
      text: tokens[2] || "Great experience overall.",
      rating: Number(tokens[3]) || 5,
      image: tokens[4] || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
    })
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E35] antialiased font-sans">
      
      {/* NAVBAR */}
      <NavbarComponent studioName={studioName} />

      <div className="pt-24 lg:pt-32">
        
        {/* HERO HEADER */}
        <section className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-block bg-[#4E6E5D]/10 text-[#4E6E5D] font-bold tracking-widest text-xs px-4 py-2 rounded-full uppercase">
              {heroBadge}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#1B2B22] tracking-tight leading-tight font-serif font-light">
              {heroBold} <br />
              <span className="block text-[#8C6D53] italic font-normal pt-2">{heroLight}</span>
            </h1>
            <p className="text-[#56665D] text-lg max-w-xl leading-relaxed">
              {studioTagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                href="#booking-anchor" 
                className="bg-[#4E6E5D] hover:bg-[#3D5749] text-white font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start Your Journey
              </Link>
              <Link 
                href="#classes" 
                className="border border-[#4E6E5D]/30 hover:border-[#4E6E5D] hover:bg-[#4E6E5D]/5 text-[#4E6E5D] font-medium px-8 py-3.5 rounded-full transition-all duration-300"
              >
                Explore Classes
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl relative z-10 border-4 border-white bg-stone-100">
              <img src={heroImg} alt="Yoga Banner" className="w-full h-full object-cover" />
            </div>
            
            <div className="absolute top-12 -left-6 bg-white shadow-lg p-4 rounded-2xl flex items-center gap-3 z-20 border border-stone-100">
              <div className="w-10 h-10 rounded-full bg-[#EAE4DC] flex items-center justify-center text-[#8C6D53]"><Heart size={18} fill="currentColor" /></div>
              <div>
                <p className="text-sm font-bold text-[#1B2B22] leading-none">{statMembers} Members</p>
                <p className="text-xs text-stone-400 pt-1">Join our community</p>
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 bg-[#4E6E5D] text-white shadow-lg p-5 rounded-2xl z-20 min-w-[180px]">
              <p className="text-2xl font-serif font-light tracking-wide">{statTagNumber}</p>
              <p className="text-xs text-[#E2EAE5] pt-0.5 uppercase tracking-widest font-bold">{statTagSub}</p>
            </div>
          </div>
        </section>

        {/* PILLARS MATRIX */}
        <FeaturesComponent 
          title={featuresTitle} 
          timingsTitle={timingsTitle} 
          featuresList={featuresArray} 
          timingsList={timingsArray} 
        />

        {/* WHY CHOOSE YOGA */}
        <WhyChooseUsComponent 
          whyTag={whyTag} 
          whyTitle={whyTitle} 
          whyDesc={whyDesc} 
          benefitsList={benefitsArray} 
        />

        {/* MEMBERSHIP PRICING */}
        <PricingComponent 
          pricingTag={pricingTag} 
          pricingTitle={pricingTitle} 
          pricingList={pricingArray} 
        />

        {/* CLASSES */}
        <ClassesComponent 
          classesTitle={classesTitle} 
          classesSubTitle={classesSubTitle} 
          classList={classesArray} 
        />

        {/* TESTIMONIAL REVIEWS */}
        <TestimonialsComponent 
          testimonialTag={testimonialTag} 
          testimonialTitle={testimonialTitle} 
          testimonialList={testimonialsArray} 
        />

        {/* WHATSAPP CTA STRIP */}
        <section id="booking-anchor" className="w-full py-16 bg-[#4E6E5D] text-white text-center px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-4xl font-serif font-light">Ready to Reserve Your Sacred Space?</h3>
            <p className="text-sm md:text-base text-[#E2EAE5] max-w-xl mx-auto font-sans leading-relaxed">
              Contact us directly via WhatsApp for instant schedule availability and booking confirmations.
            </p>
            <div className="pt-4 flex justify-center">
              <a 
                href={`https://wa.me/${social.whatsappNumber || "911234567890"}?text=${encodeURIComponent("Namaste! I would like to book a yoga class session.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-[#4E6E5D] font-bold px-8 py-4 rounded-full shadow-lg transition-transform text-base font-sans"
              >
                <FaWhatsapp size={22} className="text-[#25D366]" />
                <span>Message Secure Intake Desk</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <FooterComponent 
          studioName={studioName} 
          hotline={hotline} 
          email={email} 
          address={address} 
          social={social} 
          firmTagline={studioTagline} 
        />

      </div>
    </div>
  );
}

// 1. GLOBAL NAVBAR
function NavbarComponent({ studioName }: { studioName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#2C3E35]/5 px-6 lg:px-16 py-5 flex justify-between items-center">
      <Link href="#" className="flex items-center gap-2 text-[#1B2B22] font-serif text-3xl font-bold tracking-tight">
        <Leaf size={26} className="text-[#4E6E5D]" />
        <span className="capitalize">{studioName}</span>
      </Link>

      <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest font-bold text-[#56665D]">
        <Link href="#" className="hover:text-[#4E6E5D] transition-colors">Home</Link>
        <Link href="#features" className="hover:text-[#4E6E5D] transition-colors">About Us</Link>
        <Link href="#why-choose-us" className="hover:text-[#4E6E5D] transition-colors">Why Choose Us</Link>
        <Link href="#classes" className="hover:text-[#4E6E5D] transition-colors">Classes</Link>
        <Link href="#pricing" className="hover:text-[#4E6E5D] transition-colors">Pricing</Link>
      </div>

      <div className="hidden md:block">
        <Link href="#booking-anchor" className="bg-[#4E6E5D] hover:bg-[#3D5749] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300">
          Book a Class
        </Link>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#1B2B22] p-1">
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-stone-200 p-6 flex flex-col space-y-4 shadow-xl uppercase tracking-wider text-sm font-bold">
          <Link href="#" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#features" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="#why-choose-us" onClick={() => setIsOpen(false)}>Why Choose Us</Link>
          <Link href="#classes" onClick={() => setIsOpen(false)}>Classes</Link>
          <Link href="#pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
        </div>
      )}
    </nav>
  );
}

// 2. CORE PILLARS & TIMINGS BOARD
function FeaturesComponent({ title, timingsTitle, featuresList, timingsList }: any) {
  return (
    <section id="features" className="w-full py-20 max-w-7xl mx-auto px-6 lg:px-16 border-t border-stone-200/60 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-8 space-y-10">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1B2B22]">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {featuresList.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#4E6E5D]/10 text-[#4E6E5D] flex items-center justify-center shrink-0">
                {[<Sparkles key={1} size={22}/>, <Sunrise key={2} size={22}/>, <Leaf key={3} size={22}/>, <CheckCircle key={4} size={22}/>][idx % 4]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1B2B22]">{item.title}</h4>
                <p className="text-sm text-[#56665D] pt-1 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 bg-[#F4F1EA] p-8 rounded-3xl border border-stone-200/40 space-y-6">
        <h3 className="text-xl font-serif text-[#1B2B22] font-semibold tracking-wide flex items-center gap-2">
          <Clock size={20} className="text-[#8C6D53]" />
          <span>{timingsTitle}</span>
        </h3>
        <div className="space-y-4 text-sm font-sans text-[#56665D]">
          {timingsList.map((time: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b border-stone-300/40 pb-2 last:border-none last:pb-0">
              <span className="font-bold text-[#2C3E35]">{time.slot}</span>
              <span>{time.hours}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2b. WHY CHOOSE US
function WhyChooseUsComponent({ whyTag, whyTitle, whyDesc, benefitsList }: any) {
  return (
    <section id="why-choose-us" className="w-full py-20 bg-white border-t border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C6D53]">{whyTag}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1B2B22]">{whyTitle}</h2>
          <p className="text-[#56665D] text-base md:text-lg max-w-2xl leading-relaxed">{whyDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsList.map((benefit: any, idx: number) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#FDFBF7] border border-stone-200/50 flex flex-col space-y-4 shadow-sm group">
              <span className="text-3xl font-serif font-light text-[#8C6D53]/40 group-hover:text-[#8C6D53] transition-colors">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-[#1B2B22] font-serif group-hover:text-[#4E6E5D] transition-colors">{benefit.title}</h3>
              <p className="text-sm text-[#56665D] leading-relaxed font-normal">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. MEMBERSHIP PRICING TIERS
function PricingComponent({ pricingTag, pricingTitle, pricingList }: any) {
  return (
    <section id="pricing" className="w-full py-20 bg-[#F4F1EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C6D53]">{pricingTag}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1B2B22]">{pricingTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingList.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-200/50 text-center min-h-[260px] flex flex-col justify-between shadow-sm group">
              <div className="space-y-3">
                <h4 className="text-xl font-serif text-[#1B2B22] group-hover:text-[#4E6E5D] transition-colors">{item.title}</h4>
                <p className="text-sm text-[#56665D] leading-relaxed">{item.desc}</p>
              </div>
              <p className="text-2xl font-serif font-normal text-[#8C6D53] pt-6 border-t border-stone-200/60 mt-4 group-hover:text-[#3D5749]">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. CLASSES
function ClassesComponent({ classesTitle, classesSubTitle, classList }: any) {
  return (
    <section id="classes" className="w-full py-20 max-w-7xl mx-auto px-6 lg:px-16 space-y-12 overflow-hidden">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1B2B22]">{classesTitle}</h2>
        <p className="text-sm text-[#56665D]">{classesSubTitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {classList.map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-200/50 flex flex-col justify-between group">
            <div className="h-60 w-full relative overflow-hidden bg-stone-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#8C6D53]">{item.price}</div>
            </div>
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif font-normal text-[#1B2B22] group-hover:text-[#4E6E5D] transition-colors">{item.title}</h3>
                <p className="text-xs text-[#56665D] pt-1">Designed for continuous physical alignment and body awareness.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold font-sans tracking-wide text-[#4E6E5D] pt-4 border-t border-stone-100 uppercase">
                <span className="flex items-center gap-1"><Clock size={14} /> {item.duration}</span>
                <span className="flex items-center gap-1"><Layers size={14} /> {item.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 5. TESTIMONIAL REVIEWS
function TestimonialsComponent({ testimonialTag, testimonialTitle, testimonialList }: any) {
  return (
    <section id="testimonials" className="w-full py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest font-bold text-[#4E6E5D]">{testimonialTag}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1B2B22]">{testimonialTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialList.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#FDFBF7] p-8 rounded-[2rem] relative shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <Quote className="absolute top-6 right-6 text-stone-200 w-12 h-12 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#2C3E35] italic text-base leading-relaxed">"{item.text}"</p>
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-stone-200/60 mt-6 font-sans">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover bg-stone-100" />
                <div>
                  <h4 className="text-sm font-bold text-[#1B2B22]">{item.name}</h4>
                  <p className="text-xs text-stone-400 pt-0.5">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. FOOTER
function FooterComponent({ studioName, hotline, email, address, social, firmTagline }: any) {
  const fbLink = social.facebook || "https://facebook.com";
  const igLink = social.instagram || "https://instagram.com";
  const twLink = social.twitter || "https://twitter.com";
  const liLink = social.linkedin || "https://linkedin.com";

  return (
    <footer className="w-full bg-[#1B2B22] text-stone-400 pt-24 pb-16 px-6 lg:px-16 border-t border-stone-800/40 font-sans text-base lg:text-lg font-medium leading-relaxed">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-stone-800/40">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3 text-white font-serif text-3xl font-bold tracking-tight">
              <Leaf size={26} className="text-[#4E6E5D]" />
              <span className="capitalize">{studioName}</span>
            </div>
            <p className="leading-relaxed text-stone-500 text-base font-normal">{firmTagline}</p>
          </div>

          <div className="md:col-span-4 space-y-6 uppercase tracking-widest text-xs lg:text-sm">
            <h4 className="font-extrabold text-white tracking-widest border-b border-stone-800/40 pb-3 text-sm lg:text-base normal-case">Quick Links</h4>
            <ul className="space-y-4 text-stone-500 font-semibold lowercase tracking-normal first-letter:uppercase text-base">
              <li><Link href="#" className="hover:text-white transition-colors block py-0.5">Overview / Top</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors block py-0.5">Core Pillars</Link></li>
              <li><Link href="#why-choose-us" className="hover:text-white transition-colors block py-0.5">Why Choose Yoga</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors block py-0.5">Membership Tiers</Link></li>
              <li><Link href="#classes" className="hover:text-white transition-colors block py-0.5">Studio Offerings</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6 uppercase tracking-widest text-xs lg:text-sm">
            <h4 className="font-extrabold text-white tracking-widest border-b border-stone-800/40 pb-3 text-sm lg:text-base normal-case">Primary Registry</h4>
            <div className="space-y-2 normal-case tracking-normal font-medium text-base">
              <p className="leading-snug text-neutral-300 font-bold">{email}</p>
              <p className="leading-relaxed text-stone-500 text-sm font-sans font-medium">{address}</p>
            </div>
            <div className="space-y-2 normal-case tracking-normal pt-2">
              <p className="text-xs uppercase tracking-wider text-stone-500 font-extrabold">Advisory Desk Hotline</p>
              <p className="text-xl lg:text-2xl font-black text-[#8C6D53] tracking-tight whitespace-nowrap">{hotline}</p>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-stone-800/40">
              <a href={fbLink} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#16241C] border border-stone-800/40 flex items-center justify-center hover:border-[#8C6D53] hover:text-white transition-colors text-stone-400 rounded-xl"><FaFacebookF size={16} /></a>
              <a href={igLink} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#16241C] border border-stone-800/40 flex items-center justify-center hover:border-[#8C6D53] hover:text-white transition-colors text-stone-400 rounded-xl"><FaInstagram size={16} /></a>
              <a href={twLink} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#16241C] border border-stone-800/40 flex items-center justify-center hover:border-[#8C6D53] hover:text-white transition-colors text-stone-400 rounded-xl"><FaTwitter size={16} /></a>
              <a href={liLink} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[#16241C] border border-stone-800/40 flex items-center justify-center hover:border-[#8C6D53] hover:text-white transition-colors text-stone-400 rounded-xl"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 tracking-normal font-normal">
          <p>© Copyright {new Date().getFullYear()} {studioName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}