"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, HeartPulse, Phone, Clock, ShieldCheck, Stethoscope, 
  Award, Users, Heart, Calendar, Activity, Star, Quote 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface HospilTemplateProps {
  data?: {
    basicInfo?: {
      name?: string;
      tagline?: string;
      email?: string;
      hotline?: string;
      address?: string;
    };
    heroSection?: {
      badge?: string;
      headingBold?: string;
      headingBlue?: string;
      description?: string;
      bgImage?: string;
    };
    about?: {
      featuresDataString?: string;
    };
    services?: {
      departmentDataString?: string;
    };
    doctors?: {
      doctorDataString?: string;
    };
    testimonials?: {
      testimonialDataString?: string;
    };
    timings?: {
      monFri?: string;
      saturday?: string;
      sunday?: string;
      bookingTimeSlotsString?: string;
    };
    socials?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      whatsappNumber?: string;
    };
  };
}

export default function HospilTemplate({ data }: HospilTemplateProps) {
  // Safe destructuring matrices
  const basic = data?.basicInfo || {};
  const hero = data?.heroSection || {};
  const timings = data?.timings || {};
  const social = data?.socials || {};

  const brandName = basic.name || "Hospil";
  const brandTagline = basic.tagline || "Providing premium, personalized healthcare services combined with top-tier medical experts.";
  const clinicEmail = basic.email || "hospil@gmail.com";
  const clinicHotline = basic.hotline || "+91 00000 00000";
  const clinicAddress = basic.address || "Main Clinic Road, Medical District block 4B.";
  const monFriTime = timings.monFri || "Mon - Sat: 8:00 AM - 8:00 PM";
  const satTime = timings.saturday || "";
  const sunTime = timings.sunday || "";

  const whatsappLinkNumber = social.whatsappNumber || "8237024546";

  // Single-line token text strings passing from admin dashboard
  const rawFeatures = data?.about?.featuresDataString || "";
  const rawDepartments = data?.services?.departmentDataString || "";
  const rawReviewData = data?.testimonials?.testimonialDataString || "";
  const rawDoctors = data?.doctors?.doctorDataString || data?.doctors || "";
  const rawTimeSlots = timings.bookingTimeSlotsString || "";

  // Dynamic selector array configuration for doctors drop menu list logic
  let dynamicDoctors: any[] = [];
  if (Array.isArray(rawDoctors)) {
    dynamicDoctors = rawDoctors;
  } else if (typeof rawDoctors === 'string' && rawDoctors.trim() !== '') {
    dynamicDoctors = [rawDoctors.trim()];
  } else if (rawDoctors && typeof rawDoctors === 'object') {
    dynamicDoctors = [rawDoctors];
  }

  if (dynamicDoctors.length === 0) {
    dynamicDoctors = [
      { fullName: "Dr. Alex Smith", specialty: "Cardiology" },
      { fullName: "Dr. Jane Doe", specialty: "Neurology" }
    ];
  }

  return (
    <div className="min-h-screen bg-white text-neutral-800 antialiased">
      
      <NavbarComponent brandName={brandName} clinicHotline={clinicHotline} monFriTime={monFriTime} satTime={satTime} sunTime={sunTime} />
      
      <div className="pt-24 md:pt-36">
        
        <HeroComponent hero={hero} />

        <WhyChooseUsComponent featuresData={rawFeatures} />

        <FeaturedDepartmentsComponent departments={rawDepartments} />

        <ContactFormComponent 
          whatsappLinkNumber={whatsappLinkNumber} 
          doctors={dynamicDoctors} 
          departments={rawDepartments} 
          timeSlots={rawTimeSlots} 
        />

        <TestimonialsComponent reviews={rawReviewData} />

        <FooterComponent 
          brandName={brandName}
          brandTagline={brandTagline}
          clinicHotline={clinicHotline}
          clinicEmail={clinicEmail}
          clinicAddress={clinicAddress}
          timings={timings}
          social={social}
        />
      </div>

      <WhatsAppStickyComponent whatsappLinkNumber={whatsappLinkNumber} />
    </div>
  );
}

// ==========================================
// NAVBAR SUB-COMPONENT (FONT ENHANCED)
// ==========================================
function NavbarComponent({ brandName, clinicHotline, monFriTime, satTime, sunTime }: { brandName: string; clinicHotline: string; monFriTime: string; satTime: string; sunTime: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Appointment", href: "#contact" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="hidden md:flex w-full bg-blue-600 text-white text-sm lg:text-base py-3.5 px-8 lg:px-16 justify-between items-center border-b border-blue-500 font-semibold">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2.5">
            <Clock size={18} />
            <span>Hours: {monFriTime} {satTime && `| ${satTime}`} {sunTime && `| ${sunTime}`}</span>
          </span>
          <span className="flex items-center gap-2.5">
            <Phone size={18} />
            <span>Emergency Support Available 24/7</span>
          </span>
        </div>
        <div className="tracking-wide text-base">
          Call Central Hotline: <span className="underline font-bold">{clinicHotline}</span>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-neutral-200 py-4"
            : "bg-white border-neutral-100 py-6"
        } px-8 lg:px-16 flex justify-between items-center`}
      >
        <Link href="#" className="flex items-center gap-2.5 text-blue-600 font-extrabold text-2xl lg:text-3xl tracking-tight">
          <HeartPulse size={30} className="text-blue-600" />
          <span>{brandName}<span className="text-emerald-500">.</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-neutral-700 hover:text-blue-600 font-bold text-base transition-colors duration-200">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200">
            Make Appointment
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1 text-neutral-600 hover:text-blue-600 focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden w-full bg-white border-b border-neutral-200 shadow-xl flex flex-col px-8 py-5 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-neutral-800 hover:text-blue-600 font-bold text-lg py-1">
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-neutral-100">
            <Link href="#contact" onClick={() => setIsOpen(false)} className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base">
              Make Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ==========================================
// HERO SUB-COMPONENT
// ==========================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroComponent({ hero }: { hero: any }) {
  const badgeText = hero.badge || "Top-Rated Medical Studio";
  const mainHeadingBold = hero.headingBold || "Your Health,";
  const mainHeadingBlue = hero.headingBlue || "Our Total Priority.";
  const heroDescription = hero.description || "Experience world-class, personalized medical care without the long wait times. Our board-certified specialists utilize state-of-the-art diagnostics to put your wellness first.";
  const fallbackImg = hero.bgImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center px-6 lg:px-16 overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 w-full h-full">
        <img src={fallbackImg} alt="Clinic Background" className="w-full h-full object-cover opacity-35" />
      </div>
      <div className="max-w-7xl w-full mx-auto items-center z-10 relative py-20">
        <div className="flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full w-fit backdrop-blur-sm">
            <Activity size={14} />
            <span>{badgeText}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            {mainHeadingBold} <br />
            <span className="text-blue-400 block pt-3">{mainHeadingBlue}</span>
          </h1>

          <p className="text-neutral-300 text-base md:text-lg max-w-xl leading-relaxed">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-3.5 rounded-xl shadow-md transition-all duration-200">
              <Calendar size={16} />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// WHY CHOOSE US SUB-COMPONENT
// ==========================================
function WhyChooseUsComponent({ featuresData }: { featuresData: string }) {
  let parsedFeatures = featuresData.split(',').map((block: string, index: number) => {
    const tokens = block.split('|');
    const title = tokens[0]?.trim() || "";
    const description = tokens[1]?.trim() || "";
    
    const iconLayouts = [
      <Award className="text-blue-600" size={28} />,
      <Stethoscope className="text-blue-600" size={28} />,
      <Users className="text-blue-600" size={28} />,
      <ShieldCheck className="text-blue-600" size={28} />
    ];

    return { icon: iconLayouts[index % 4], title, description };
  }).filter(item => item.title !== "");

  if (parsedFeatures.length === 0) {
    parsedFeatures = [
      { icon: <Award className="text-blue-600" size={28} />, title: "Certified Excellence", description: "Our clinic is fully accredited with international health standards, ensuring you receive premium treatment protocols." },
      { icon: <Stethoscope className="text-blue-600" size={28} />, title: "Advanced Technology", description: "We utilize cutting-edge diagnostic equipment and minimal-access laboratory screening tools for precise results." },
      { icon: <Users className="text-blue-600" size={28} />, title: "Expert Medical Team", description: "Our staff consists of board-certified medical specialists and practitioners with decades of combined experience." },
      { icon: <ShieldCheck className="text-blue-600" size={28} />, title: "Patient-First Safety", description: "Your health records and physical treatment plans are secured with strict confidentiality and absolute care." }
    ];
  }

  return (
    <section id="about" className="w-full py-16 md:py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {parsedFeatures.map((item, index) => (
            <div key={index} className="group relative bg-white border border-neutral-100 p-6 rounded-2xl shadow-sm duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center duration-300 group-hover:bg-blue-600 group-hover:text-white mb-4">
                {React.cloneElement(item.icon, { className: "transition-colors duration-300 group-hover:text-white" })}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FEATURED DEPARTMENTS SUB-COMPONENT
// ==========================================
function FeaturedDepartmentsComponent({ departments }: { departments: string }) {
  let processedList = departments.split(',').map((block: string) => {
    const tokens = block.split('|');
    const title = tokens[0]?.trim() || "";
    const image = tokens[1]?.trim() || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop";
    const subListRaw = tokens[2]?.trim() || "Accredited Excellence; Advanced Diagnostics";
    
    const pointsArray = subListRaw.split(';').map((p: string) => p.trim()).filter(p => p !== "");
    return { title, image, points: pointsArray };
  }).filter(item => item.title !== "");

  if (processedList.length === 0) {
    processedList = [
      { title: "Cardiology", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop", points: ["24/7 Cardiac Cath Lab", "ECG, Echo & TMT"] },
      { title: "Neurology", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop", points: ["Advanced Neuro-Imaging", "Stroke Recovery Unit"] }
    ];
  }

  return (
    <section id="services" className="w-full py-16 md:py-24 px-6 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-950 tracking-tight">
            We Care for Patients Across Various Departments and Services.
          </h2>
        </div>

        <div className="space-y-24">
          {processedList.map((dept, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 relative items-center opacity-100 translate-y-0">
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-neutral-200 shadow-xl md:col-span-6 z-20 md:mr-[-40px] relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Heart className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">{dept.title}</h3>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                  Experience premier, customized healthcare solutions combined with top-tier medical protocols inside our specialized clinical unit.
                </p>
                <ul className="space-y-3">
                  {dept.points.map((pointText, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                      <ShieldCheck className="text-blue-500 shrink-0" size={18} />
                      <span>{pointText}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-6 h-64 md:h-[380px] w-full rounded-3xl overflow-hidden relative z-10 shadow-sm">
                <img src={dept.image} alt={dept.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CONTACT FORM SUB-COMPONENT (TIME DYNAMIC)
// ==========================================
function ContactFormComponent({ whatsappLinkNumber, doctors, departments, timeSlots }: { whatsappLinkNumber: string; doctors: any[]; departments: string; timeSlots: string }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "General Consultation", doctor: "Any Available Specialist", date: "", time: "", notes: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTime = formData.time || (timeSlots.trim() !== "" ? timeSlots.split(',')[0].trim() : "Morning Slot (8:00 AM - 12:00 PM)");

    const message =
      `Hi Hospil Clinic Team, I'd like to book an appointment:\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Department:* ${formData.service}\n` +
      `• *Doctor:* ${formData.doctor}\n` +
      `• *Date:* ${formData.date}\n` +
      `• *Preferred Time:* ${selectedTime}\n` +
      `• *Symptom Notes:* ${formData.notes || "None"}`;

    window.open(`https://wa.me/${whatsappLinkNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24 px-6 lg:px-16 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">Secure Your Healing Journey in Seconds</h2>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-sm text-neutral-600 font-medium"><Clock className="text-blue-600 shrink-0" size={20} /> Same-day slots available</div>
            <div className="flex items-center gap-3 text-sm text-neutral-600 font-medium"><ShieldCheck className="text-blue-600 shrink-0" size={20} /> Insurance options accepted</div>
          </div>
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100 mt-6">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" alt="Medical Team" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-50 border border-neutral-100 p-6 md:p-8 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">Book an Appointment</h3>
          <p className="text-xs text-neutral-500 mb-6">Confirm within 2 hours.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Full Name</label>
              <input type="text" required name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Phone Number</label>
                <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Email Address</label>
                <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Service</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  <option value="General Consultation">General Consultation</option>
                  {departments.split(',').map((block: string, i: number) => {
                    const title = block.split('|')[0]?.trim();
                    if (!title) return null;
                    return <option key={i} value={title}>{title}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Preferred Doctor</label>
                <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  <option value="Any Available Specialist">Any Available Specialist</option>
                  {doctors.flatMap((doc, i) => {
                    if (typeof doc === 'string') {
                      return doc.split(',').map((name, idx) => {
                        const cleanlyTrimmed = name.trim();
                        if (!cleanlyTrimmed) return null;
                        return <option key={`${i}-${idx}`} value={cleanlyTrimmed}>{cleanlyTrimmed}</option>;
                      });
                    }
                    if (doc && typeof doc === 'object') {
                      const nameVal = doc.fullName || doc.name || "";
                      if (!nameVal) return null;
                      return [<option key={i} value={nameVal}>{nameVal} {doc.specialty ? `(${doc.specialty})` : ''}</option>];
                    }
                    return [];
                  })}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Date</label>
                <input type="date" required name="date" value={formData.date} onChange={handleChange} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
              </div>
              
              {/* Dynamic Time Slot Dropdown Parser */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Preferred Time</label>
                <select name="time" value={formData.time} onChange={handleChange} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                  {typeof timeSlots === 'string' && timeSlots.trim() !== "" ? (
                    timeSlots.split(',').map((slot: string, i: number) => {
                      const cleanlyTrimmedSlot = slot.trim();
                      if (!cleanlyTrimmedSlot) return null;
                      return <option key={i} value={cleanlyTrimmedSlot}>{cleanlyTrimmedSlot}</option>;
                    })
                  ) : (
                    <>
                      <option>Morning Slot (8:00 AM - 12:00 PM)</option>
                      <option>Afternoon Slot (12:00 PM - 4:00 PM)</option>
                      <option>Evening Slot (4:00 PM - 8:00 PM)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-neutral-700">Additional Notes (optional)</label>
              <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="Describe symptoms..." className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-lg shadow-sm transition-all duration-200 mt-2">
              Confirm Appointment via WhatsApp →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// TESTIMONIALS SUB-COMPONENT
// ==========================================
function TestimonialsComponent({ reviews }: { reviews: string }) {
  let processedReviews = reviews.split(',').map((block: string) => {
    const tokens = block.split('|');
    const name = tokens[0]?.trim() || "";
    const role = tokens[1]?.trim() || "Verified Patient";
    const text = tokens[2]?.trim() || "Excellent clinical attention and premium treatment environments.";
    
    const rawRating = parseInt(tokens[3]?.trim() || "5", 10);
    const rating = isNaN(rawRating) ? 5 : rawRating;
    const image = tokens[4]?.trim() || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop";

    return { name, role, text, rating, image };
  }).filter(item => item.name !== "");

  if (processedReviews.length === 0) {
    processedReviews = [
      { name: "Sarah Jenkins", role: "Cardiology Patient", text: "The care I received at Hospil was exceptional. The booking process via WhatsApp was incredibly seamless.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" }
    ];
  }

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 px-6 lg:px-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-3xl md:text-4xl font-bold text-neutral-950 tracking-tight">Trusted by Thousands of Patients</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processedReviews.map((review, index) => (
            <div key={index} className="bg-white border border-neutral-200/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Quote className="absolute top-6 right-6 text-neutral-100 h-12 w-12 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed italic">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-neutral-100 relative z-10">
                <img src={review.image} alt={review.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-50" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{review.name}</h4>
                  <p className="text-xs text-neutral-500">{review.role}</p>
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
// FOOTER SUB-COMPONENT (FONT ENHANCED)
// ==========================================
function FooterComponent({ brandName, brandTagline, clinicHotline, clinicEmail, clinicAddress, timings, social }: any) {
  const monFriTime = timings.monFri || "Mon - Fri: 8:00 AM - 8:00 PM";
  const satTime = timings.saturday || "Saturday: 9:00 AM - 5:00 PM";
  const sunTime = timings.sunday || "Sunday: Emergencies Only";

  const fbLink = social.facebook || "https://facebook.com";
  const igLink = social.instagram || "https://instagram.com";
  const twLink = social.twitter || "https://twitter.com";
  const liLink = social.linkedin || "https://linkedin.com";

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 pt-20 pb-10 px-6 lg:px-16 border-t border-t-neutral-900 text-base md:text-lg font-medium leading-relaxed">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-2xl lg:text-3xl tracking-tight">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center"><HeartPulse size={20} className="text-white" /></div>
              <span>{brandName}<span className="text-blue-500">.</span></span>
            </div>
            <p className="text-sm lg:text-base leading-relaxed text-neutral-500 font-normal">{brandTagline}</p>
            <div className="flex items-center gap-4 pt-2">
              <a href={fbLink} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-blue-600 hover:text-white transition-all"><FaFacebookF size={16} /></a>
              <a href={igLink} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-blue-600 hover:text-white transition-all"><FaInstagram size={16} /></a>
              <a href={twLink} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-blue-600 hover:text-white transition-all"><FaTwitter size={16} /></a>
              <a href={liLink} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-blue-600 hover:text-white transition-all"><FaLinkedinIn size={16} /></a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-2">Quick Links</h4>
            <ul className="space-y-3 text-sm lg:text-base font-semibold">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-blue-500 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Appointment</a></li>
              <li><a href="#testimonials" className="hover:text-blue-500 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-2">Working Hours</h4>
            <ul className="space-y-3 text-sm lg:text-base text-neutral-500 font-semibold">
              <li className="flex flex-col gap-0.5"><span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">// Weekday:</span> {monFriTime}</li>
              {satTime && <li className="flex flex-col gap-0.5"><span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">// Saturday:</span> {satTime}</li>}
              {sunTime && <li className="flex flex-col gap-0.5"><span className="text-amber-500 uppercase tracking-wider font-bold">// Emergency:</span> {sunTime}</li>}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white border-b border-neutral-900 pb-2">Emergency</h4>
            <div className="space-y-1.5">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold">// Call 24/7 Desk</p>
              <p className="text-xl lg:text-2xl font-black text-blue-500 tracking-tight whitespace-nowrap">{clinicHotline}</p>
            </div>
            <div className="text-xs lg:text-sm text-neutral-500 font-semibold space-y-1 pt-1">
              <p className="text-neutral-300">Email: {clinicEmail}</p>
              <p className="leading-snug">{clinicAddress}</p>
            </div>
          </div>

        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs lg:text-sm text-neutral-600 gap-4 font-semibold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} {brandName} Clinic. All rights reserved.</p>
          <p className="flex items-center gap-1.5 normal-case tracking-normal">Made with <HeartPulse size={12} className="text-rose-600 fill-rose-600 animate-pulse" /> for complete medical care.</p>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// STICKY FLOATING WHATSAPP BUTTON SUB-COMPONENT
// ==========================================
function WhatsAppStickyComponent({ whatsappLinkNumber }: { whatsappLinkNumber: string }) {
  const whatsappUrl = `https://wa.me/${whatsappLinkNumber}?text=${encodeURIComponent("Hi, I'd like to inquire about booking an appointment.")}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center justify-center" aria-label="WhatsApp Sticky Support">
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-xs group-hover:pr-3 ease-in-out">Chat with us</span>
      <FaWhatsapp size={24} className="drop-shadow" />
    </a>
  );
}