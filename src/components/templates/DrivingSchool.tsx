"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  X, Clock, MapPin, ChevronRight, ShieldCheck, Car, Star, ArrowRight 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface DriveDrivingSchoolProps {
  data?: any;
}

// Steering Wheel Logo Icon Component matching exact theme branding
function SteeringWheelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="7" />
      <path d="M12 50 h22 M66 50 h22 M50 66 v22" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
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

export default function DriveDrivingSchool({ data: rawData }: DriveDrivingSchoolProps) {
  // Safe extraction layer
  const data = rawData?.formData || rawData?.formJson?.[0] || rawData || {};

  const basic = data?.basicInfo || data || {};
  const hero = data?.heroSection || data || {};
  const whyData = data?.whyChooseUs || data || {};
  const coursesData = data?.courses || data || {};
  const instructorsData = data?.instructors || data || {};
  const bookingData = data?.booking || data || {};
  const testimonialsData = data?.testimonials || data || {};
  const timings = data?.timings || data || {};
  const social = data?.socials || data || {};

  // Branding & Basic Info
  const schoolName = basic.name || "drive";
  const schoolSubName = basic.subName || "";
  const logoUrl = basic.logoUrl?.trim() || "";
  const schoolTagline = basic.tagline || "Idea of denouncing pleasure and praising pain was born and we will give you a complete.";
  const schoolEmail = basic.email || "info@udrivedrivingschool.com";
  const schoolHotline = basic.hotline || "+1 (800) 555-0199";
  const schoolAddress = basic.address || "San Fransisco";

  // Operating Hours
  const monFriTime = timings.monFri || "Mor Class 7am to 11am";
  const satTime = timings.saturday || "Saturday: 8:00 AM - 6:00 PM";
  const sunTime = timings.sunday || "Sunday: Closed";

  // Dynamic Section Badges
  const heroBadge = hero.badge || "VERIFIED DVSA CERTIFIED INSTRUCTORS";
  const whyTag = whyData.whyTag || "WHY CHOOSE DRIVE";
  const coursesTag = coursesData.coursesTag || "TAILORED PACKAGES";
  const instructorsTag = instructorsData.instructorsTag || "EXPERT TEAM";
  const bookingTag = bookingData.bookingTag || "FAST INTAKE";
  const testimonialTag = testimonialsData.testimonialTag || "SUCCESS STORIES";

  // Hero Section Main Titles
  const heroHeadingBold = hero.headingBold || "Fast Track";
  const heroHeadingYellow = hero.headingYellow || "Driving Lessons";
  const heroDesc = hero.description || "Idea of denouncing pleasure and praising pain was born and we will give you a complete.";
  const heroBgImage = hero.bgImage?.trim() || "data:image/jpeg;base64,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";
  const heroCtaText = hero.ctaText || "READ MORE";

  // Why Choose Us Section Titles
  const whyTitle = whyData.whyTitle || "Why 98% Of Our Students Pass On The First Attempt";

  // Dynamic Array Resolutions
  const whyFeaturesArray = resolveSectionArray(
    whyData.whyDataString || whyData.featuresString,
    whyData.whyList,
    [
      { title: "DVSA Approved Trainers", desc: "Patient, fully certified instructors trained in modern defensive driving." },
      { title: "Dual-Control Fleet", desc: "Drive safely in modern, regularly serviced dual-control vehicles." },
      { title: "Flexible Timelines", desc: "Early morning, evening, and weekend slots built around your schedule." },
      { title: "High First-Time Pass Rate", desc: "Structured mock driving tests matching official examination standards." }
    ],
    (tokens) => ({ title: tokens[0] || "Feature", desc: tokens[1] || "Description details" })
  );

  const coursesArray = resolveSectionArray(
    coursesData.courseDataString || coursesData.coursesString,
    coursesData.courseList,
    [
      { title: "Beginner Driving Course", price: "$299", duration: "10 Hours", desc: "Ideal for total beginners. Covers basic maneuvers, controls, and road awareness.", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600" },
      { title: "Intensive Crash Course", price: "$599", duration: "20 Hours", desc: "Fast-track your license in under 2 weeks with daily concentrated road practice.", image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=600" },
      { title: "Refresher & Motorway Lessons", price: "$180", duration: "5 Hours", desc: "Regain your road confidence or master high-speed motorway navigation rules.", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600" }
    ],
    (tokens) => ({
      title: tokens[0] || "Course Title",
      price: tokens[1] || "$0",
      duration: tokens[2] || "0 Hours",
      desc: tokens[3] || "Course details",
      image: tokens[4] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600"
    })
  );

  const instructorsArray = resolveSectionArray(
    instructorsData.instructorDataString || instructorsData.instructorsString,
    instructorsData.instructorList,
    [
      { name: "David Miller", role: "Senior Manual Specialist", exp: "12+ Yrs Exp", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300" },
      { name: "Sarah Jenkins", role: "Automatic & Beginners Lead", exp: "8+ Yrs Exp", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300" },
      { name: "Michael Chang", role: "Intensive Crash Course Coach", exp: "10+ Yrs Exp", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300" }
    ],
    (tokens) => ({
      name: tokens[0] || "Instructor Name",
      role: tokens[1] || "Specialty",
      exp: tokens[2] || "Experience",
      image: tokens[3] || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300"
    })
  );

  const testimonialsArray = resolveSectionArray(
    testimonialsData.testimonialDataString || testimonialsData.testimonialsString,
    testimonialsData.testimonialList,
    [
      { name: "Alex Thompson", role: "Passed First Time", text: "UDrive made learning so stress-free. David helped me build confidence on roundabouts quickly!", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" },
      { name: "Alex Thompson", role: "Passed First Time", text: "UDrive made learning so stress-free. David helped me build confidence on roundabouts quickly!", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" },
      { name: "Alex Thompson", role: "Passed First Time", text: "UDrive made learning so stress-free. David helped me build confidence on roundabouts quickly!", rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" },
      { name: "Elena Rostova", role: "Intensive Course Student", text: "Passed my practical test in just 10 days! The mock exams were identical to the actual DVSA test.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" }
    ],
    (tokens) => ({
      name: tokens[0] || "Student Name",
      role: tokens[1] || "Status",
      text: tokens[2] || "Great driving school experience.",
      rating: Number(tokens[3]) || 5,
      image: tokens[4] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    })
  );

  return (
    <div id="top" className="min-h-screen bg-white text-[#1a1a1a] font-sans antialiased selection:bg-yellow-400 selection:text-black">
      
      {/* NAVBAR */}
      <NavbarComponent 
        schoolName={schoolName} 
        schoolSubName={schoolSubName} 
        logoUrl={logoUrl} 
        schoolAddress={schoolAddress} 
        monFriTime={monFriTime}
      />

      <div className="pt-0">

        {/* HERO SECTION */}
        <HeroComponent 
          badge={heroBadge}
          headingBold={heroHeadingBold}
          headingYellow={heroHeadingYellow}
          description={heroDesc}
          bgImage={heroBgImage}
          ctaText={heroCtaText}
        />

        {/* WHY CHOOSE US */}
        <WhyChooseUsComponent 
          tag={whyTag}
          title={whyTitle}
          features={whyFeaturesArray}
        />

        {/* COURSES SECTION */}
        <CoursesComponent tag={coursesTag} courses={coursesArray} />

        {/* INSTRUCTORS SECTION */}
        <InstructorsComponent tag={instructorsTag} instructors={instructorsArray} />

        {/* BOOKING INTAKE FORM */}
        <BookingSectionComponent 
          tag={bookingTag}
          schoolName={schoolName} 
          whatsappNumber={social.whatsappNumber || "442079460921"} 
          courses={coursesArray}
        />

        {/* TESTIMONIALS (HORIZONTAL SCROLL) */}
        <TestimonialsComponent tag={testimonialTag} testimonials={testimonialsArray} />

        {/* FOOTER */}
        <FooterComponent 
          schoolName={schoolName}
          schoolSubName={schoolSubName}
          logoUrl={logoUrl}
          schoolTagline={schoolTagline}
          schoolHotline={schoolHotline}
          schoolEmail={schoolEmail}
          schoolAddress={schoolAddress}
          monFriTime={monFriTime}
          satTime={satTime}
          sunTime={sunTime}
          social={social}
        />

      </div>

      {/* WHATSAPP STICKY */}
      <WhatsAppStickyComponent whatsappNumber={social.whatsappNumber || "442079460921"} />

    </div>
  );
}

// ==========================================
// 1. NAVBAR
// ==========================================
function NavbarComponent({ schoolName, schoolSubName, logoUrl, schoolAddress, monFriTime }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      {/* TOP BLACK ANNOUNCEMENT BAR */}
      <div className="bg-[#111111] text-white py-3 px-4 text-xs font-bold tracking-wider uppercase border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span>
              <span className="text-white">TRAINING TIME:</span>{' '}
              <span className="text-gray-300 font-normal normal-case">{monFriTime}</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>
              <span className="text-white">WE HAVE COME CLOSER TO YOU:</span>{' '}
              <span className="text-gray-300 font-normal normal-case">{schoolAddress}</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
          </div>

        </div>
      </div>

      {/* MAIN NAVIGATION HEADER WITH LIGHT GRAY ANGLED ACCENT */}
      <nav className="relative bg-[#f4f4f4] max-w-7xl mx-auto px-6 sm:px-12 py-5 flex items-center justify-between z-20">
        {/* Left Angular Cutout */}
        <div 
          className="absolute top-0 left-0 bottom-0 bg-white w-24 -z-10 hidden sm:block"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        />

        {/* Right Angular Cutout */}
        <div 
          className="absolute top-0 right-0 bottom-0 bg-white w-48 -z-10 hidden sm:block"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        {/* Brand Logo & Name */}
        <Link href="#top" className="flex items-center gap-3">
          {logoUrl ? (
            <div className="h-11 max-w-[140px] flex items-center justify-start overflow-hidden shrink-0">
              <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-yellow-400 p-2 shadow-md shrink-0">
              <SteeringWheelIcon className="w-full h-full" />
            </div>
          )}
          
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-black lowercase font-sans">
              {schoolName}
            </span>
            {schoolSubName && (
              <span className="ml-1.5 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                {schoolSubName}
              </span>
            )}
          </div>
        </Link>

        {/* FOUR-SQUARES DROPDOWN MENU */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Toggle Navigation Dropdown"
            className="w-11 h-11 bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-sm focus:outline-none"
          >
            <div className="grid grid-cols-2 gap-1 w-4 h-4">
              <span className="bg-black w-1.5 h-1.5"></span>
              <span className="bg-black w-1.5 h-1.5"></span>
              <span className="bg-black w-1.5 h-1.5"></span>
              <span className="bg-black w-1.5 h-1.5"></span>
            </div>
          </button>

          {/* Floating Dropdown Items */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#111111] border border-gray-800 shadow-2xl py-3 z-50 text-xs font-bold tracking-widest uppercase text-white">
              <a 
                href="#top" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Home
              </a>
              <a 
                href="#why-choose-us" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Why Choose Us
              </a>
              <a 
                href="#courses" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Driving Courses
              </a>
              <a 
                href="#instructors" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Our Instructors
              </a>
              <a 
                href="#booking" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Book Lesson
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsDropdownOpen(false)}
                className="block px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Student Reviews
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

// ==========================================
// 2. HERO SHOWCASE
// ==========================================
function HeroComponent({ badge, headingBold, headingYellow, description, bgImage, ctaText }: any) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-20 overflow-hidden">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-yellow-600 bg-yellow-100 px-3 py-1 mb-6">
          <ShieldCheck size={16} />
          <span>{badge}</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[82px] font-black tracking-tight text-[#111111] leading-[1.02] mb-8">
          {headingBold} <br />
          <span className="text-[#111111]">{headingYellow}</span>
        </h1>

        <p className="text-gray-500 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-10 max-w-xl font-normal">
          {description}
        </p>

        <a
          href="#booking"
          className="inline-block bg-[#111111] text-white text-xs font-black tracking-[0.2em] px-9 py-4.5 hover:bg-yellow-400 hover:text-black transition-colors duration-200"
        >
          {ctaText}
        </a>
      </div>

      {/* Hero Image Cut at Angle matching screenshot */}
      <div className="mt-16 w-full max-w-5xl overflow-hidden">
        <div 
          className="w-full h-[380px] sm:h-[450px] bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${bgImage}')`,
            clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)' 
          }}
        />
      </div>
    </section>
  );
}

// ==========================================
// 3. WHY CHOOSE US
// ==========================================
function WhyChooseUsComponent({ tag, title, features }: any) {
  return (
    <section id="why-choose-us" className="w-full py-24 px-6 lg:px-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-yellow-600 font-extrabold text-xs uppercase tracking-widest">{tag}</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 p-8 hover:border-yellow-400 transition-all duration-300 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-yellow-400 text-black flex items-center justify-center font-black text-xl">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-black uppercase">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. COURSES CATALOG
// ==========================================
function CoursesComponent({ tag, courses }: any) {
  return (
    <section id="courses" className="w-full py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-yellow-600 font-extrabold text-xs uppercase tracking-widest">{tag}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">Featured Driving Courses</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all group">
              <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black text-sm px-3 py-1">
                  {course.price}
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-yellow-600 font-bold uppercase tracking-wider">{course.duration}</div>
                  <h3 className="text-2xl font-bold text-black uppercase">{course.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed pt-2">{course.desc}</p>
                </div>

                <a href="#booking" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black hover:text-yellow-600 pt-6 border-t border-gray-100">
                  <span>Enrol In Course</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. INSTRUCTORS
// ==========================================
function InstructorsComponent({ tag, instructors }: any) {
  return (
    <section id="instructors" className="w-full py-24 px-6 lg:px-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-yellow-600 font-extrabold text-xs uppercase tracking-widest">{tag}</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">Meet Our Certified Instructors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((item: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 text-center p-8 space-y-4 hover:border-yellow-400 transition-all shadow-sm">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-yellow-400 p-1">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black uppercase">{item.name}</h3>
                <p className="text-xs text-yellow-600 font-mono pt-1 uppercase">{item.role}</p>
              </div>
              <div className="inline-block bg-gray-100 px-4 py-1.5 text-xs text-gray-600 font-bold">
                {item.exp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. BOOKING SECTION
// ==========================================
function BookingSectionComponent({ tag, schoolName, whatsappNumber, courses }: any) {
  const [formData, setFormData] = useState({ name: "", phone: "", course: courses[0]?.title || "Beginner Course", date: "", transmission: "Manual" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${schoolName}, I would like to book a driving lesson:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Course: ${formData.course}\n• Transmission: ${formData.transmission}\n• Preferred Date: ${formData.date}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="booking" className="w-full py-24 px-6 lg:px-16 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto bg-[#111111] text-white p-8 sm:p-12 shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-widest">{tag}</span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Reserve Your Driving Slot</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-300">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-black border border-gray-800 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-400" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-300">Phone Number</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 800 000000" className="w-full bg-black border border-gray-800 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-300">Select Course</label>
              <select value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full bg-black border border-gray-800 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-400">
                {courses.map((c: any, i: number) => (
                  <option key={i} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-300">Transmission Type</label>
              <select value={formData.transmission} onChange={(e) => setFormData({...formData, transmission: e.target.value})} className="w-full bg-black border border-gray-800 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-400">
                <option value="Manual">Manual Vehicle</option>
                <option value="Automatic">Automatic Vehicle</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-300">Preferred Start Date</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-gray-800 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-400" />
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm uppercase tracking-widest py-4 transition-all">
            Confirm Booking Via WhatsApp →
          </button>
        </form>
      </div>
    </section>
  );
}

// ==========================================
// 7. TESTIMONIALS (HORIZONTAL SCROLL)
// ==========================================
function TestimonialsComponent({ tag, testimonials }: any) {
  return (
    <section id="testimonials" className="w-full py-24 bg-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-yellow-600 font-extrabold text-xs uppercase tracking-widest">{tag}</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">Recent Student Testimonials</h2>
        </div>

        <div 
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] snap-center bg-white border border-gray-200 p-8 flex flex-col justify-between space-y-6 hover:border-yellow-400 transition-all duration-300 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center text-yellow-400 gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 italic text-base leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" 
                />
                <div>
                  <h4 className="text-base font-bold text-black uppercase">{item.name}</h4>
                  <p className="text-xs text-yellow-600 font-mono">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. FOOTER
// ==========================================
function FooterComponent({ schoolName, schoolSubName, logoUrl, schoolTagline, schoolHotline, schoolEmail, schoolAddress, monFriTime, satTime, sunTime, social }: any) {
  return (
    <footer className="w-full bg-[#111111] text-gray-400 pt-20 pb-12 px-6 lg:px-16 border-t border-gray-800 text-xs font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-gray-800">
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <div className="h-10 max-w-[120px] flex items-center justify-start overflow-hidden shrink-0">
                <img src={logoUrl} alt="Logo" className="h-full w-auto object-contain" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black p-1.5 shrink-0">
                <SteeringWheelIcon className="w-full h-full" />
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tight uppercase">{schoolName}</span>
              {schoolSubName && <span className="text-[8px] font-bold text-yellow-400 tracking-[0.25em] uppercase pt-0.5">{schoolSubName}</span>}
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed font-normal">{schoolTagline}</p>
        </div>

        <div className="space-y-3 uppercase font-bold tracking-wider">
          <h4 className="text-white text-sm">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 font-semibold normal-case">
            <li><a href="#top" className="hover:text-yellow-400 transition-colors">Home Overview</a></li>
            <li><a href="#why-choose-us" className="hover:text-yellow-400 transition-colors">Why Choose Us</a></li>
            <li><a href="#courses" className="hover:text-yellow-400 transition-colors">Courses & Pricing</a></li>
            <li><a href="#instructors" className="hover:text-yellow-400 transition-colors">Instructors Team</a></li>
          </ul>
        </div>

        <div className="space-y-3 font-bold uppercase tracking-wider">
          <h4 className="text-white text-sm">Opening Hours</h4>
          <div className="space-y-1.5 text-gray-400 normal-case font-medium">
            <p className="text-white font-bold">{monFriTime}</p>
            <p>{satTime}</p>
            <p className="text-yellow-400">{sunTime}</p>
          </div>
        </div>

        <div className="space-y-3 font-bold uppercase tracking-wider">
          <h4 className="text-white text-sm">Contact Desk</h4>
          <div className="space-y-2 text-gray-400 normal-case font-medium">
            <p className="text-yellow-400 font-black text-base">{schoolHotline}</p>
            <p className="text-gray-300">{schoolEmail}</p>
            <p>{schoolAddress}</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500">
        <p>© {new Date().getFullYear()} {schoolName} {schoolSubName}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={social.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaFacebookF size={16} /></a>
          <a href={social.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaInstagram size={16} /></a>
          <a href={social.twitter || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaTwitter size={16} /></a>
          <a href={social.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaLinkedinIn size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 9. STICKY WHATSAPP
// ==========================================
function WhatsAppStickyComponent({ whatsappNumber }: { whatsappNumber: string }) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I would like to inquire about driving lessons.")}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center justify-center">
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-extrabold uppercase tracking-widest transition-all duration-300 group-hover:max-w-xs group-hover:pr-3 ease-in-out">Chat with Us</span>
      <FaWhatsapp size={24} />
    </a>
  );
}