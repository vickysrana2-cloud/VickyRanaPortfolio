"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Menu, X, Phone, Mail, MapPin, Calendar, Users, 
  Sparkles, Award, ChevronRight, ChevronLeft, Star 
} from "lucide-react";

interface LuxeHavenHotelProps {
  data?: any;
}

// Universal Parser Helper: Handles raw strings, arrays, and pipe-delimited tokens
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

export default function LuxeHavenHotel({ data: rawData }: LuxeHavenHotelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic User Input Extraction
  const data = rawData?.formData || rawData?.formJson?.[0] || rawData || {};

  const basic = data?.basicInfo || data || {};
  const hero = data?.heroSection || data || {};
  const roomsData = data?.rooms || data || {};
  const amenitiesData = data?.amenities || data || {};
  const diningData = data?.dining || data || {};
  const testimonialsData = data?.testimonials || data || {};
  const social = data?.socials || data || {};

  // 1. All Dynamic User Inputs for Identity & Logo
  const hotelName = basic.hotelName || "LUXEHAVEN";
  const subTitle = basic.subTitle || "RESORT & SPA";
  const logoUrl = basic.logoUrl || data?.logoUrl || ""; // User Input Logo Image URL
  const hotelDesc = basic.description || "A sanctuary of serene luxury nestled along coastal shores, offering tailored hospitality and refined comfort.";
  const phone = basic.phone || social.phone || "+1 (800) 555-0199";
  const email = basic.email || social.email || "concierge@luxehavenresort.com";
  const address = basic.address || social.address || "742 Paradise Cove Road, Malibu, CA 90265";
  const whatsappNumber = social.whatsappNumber || basic.whatsappNumber || "18005550199";

  // 2. All Dynamic User Inputs for Hero Section
  const heroHeading = hero.heroHeading || "Elegance Redefined in Every Detail";
  const heroTagline = hero.heroTagline || "Experience bespoke luxury, world-class dining, and serene coastal views tailored for the discerning traveler.";
  const heroBg = hero.heroBgImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600";
  const ctaText = hero.ctaText || "Reserve Your Suite";

  // 3. Dynamic User Inputs for Accommodations
  const roomsArray = resolveSectionArray(
    roomsData.roomsDataString,
    roomsData.roomsList,
    [
      {
        name: "Oceanfront Sanctuary Suite",
        price: "$850 / night",
        details: "2 Guests • 850 sq ft",
        desc: "Panoramic coastline views with private infinity plunge pool and dedicated butler service.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800"
      },
      {
        name: "Royal Palm Villa",
        price: "$1,450 / night",
        details: "4 Guests • 1,600 sq ft",
        desc: "Two-bedroom sanctuary with private garden patio, outdoor rain shower, and lounge.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800"
      },
      {
        name: "Horizon Executive Suite",
        price: "$620 / night",
        details: "2 Guests • 650 sq ft",
        desc: "Contemporary elegance featuring floor-to-ceiling glass walls and marble bath amenities.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800"
      }
    ],
    (tokens) => ({
      name: tokens[0] || "Luxury Suite",
      price: tokens[1] || "Contact for Rates",
      details: tokens[2] || "2 Guests",
      desc: tokens[3] || "High-end luxury accommodations with ocean views.",
      image: tokens[4] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800"
    })
  );

  // 4. Dynamic User Inputs for Amenities
  const amenitiesArray = resolveSectionArray(
    amenitiesData.amenitiesDataString,
    amenitiesData.amenitiesList,
    [
      { title: "Holistic Thermal Spa", desc: "Revitalizing hydrotherapy circuits, custom massages, and organic botanical skincare treatments." },
      { title: "Infinity Oceanfront Pool", desc: "Temperature-controlled dual pool deck with private cabanas and daybed service." },
      { title: "Signature Coastal Dining", desc: "Farm-to-table cuisine crafted by Michelin-starred culinary artisans." },
      { title: "Private Heliport Access", desc: "Seamless aerial arrivals and private island transfer services." }
    ],
    (tokens) => ({ title: tokens[0] || "Amenity", desc: tokens[1] || "Exclusive feature detail." })
  );

  // 5. Dynamic User Inputs for Dining
  const diningArray = resolveSectionArray(
    diningData.diningDataString,
    diningData.diningList,
    [
      { name: "Aura Ocean Grill", cuisine: "Mediterranean Seafood", hours: "5:30 PM - 11:00 PM", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800" },
      { name: "The Velvet Lounge", cuisine: "Craft Cocktails & Wine", hours: "4:00 PM - 1:00 AM", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800" }
    ],
    (tokens) => ({
      name: tokens[0] || "Dining Venue",
      cuisine: tokens[1] || "Gourmet Cuisine",
      hours: tokens[2] || "Open Daily",
      image: tokens[3] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
    })
  );

  // 6. Dynamic User Inputs for Testimonials
  const testimonialsArray = resolveSectionArray(
    testimonialsData.testimonialsDataString,
    testimonialsData.testimonialsList,
    [
      { name: "Evelyn & Thomas V.", location: "New York, USA", text: "An extraordinary retreat. The attention to detail from the concierge staff made our anniversary trip unforgettable." },
      { name: "Dr. Julian Vance", location: "London, UK", text: "The spa treatment and private infinity pool terrace exceeded all expectations. True five-star hospitality." },
      { name: "Sophia & Marcus L.", location: "Zurich, Switzerland", text: "From the heliport transfer to private dining on the beach, every second felt perfectly curated and effortless." },
      { name: "Aria Sterling", location: "Los Angeles, CA", text: "Pure serenity. The horizon suite is an architectural masterpiece with world-class personalized service." }
    ],
    (tokens) => ({ name: tokens[0] || "Valued Guest", location: tokens[1] || "Global Guest", text: tokens[2] || "Wonderful experience." })
  );

  // Horizontal Testimonials Carousel Control
  const scrollTestimonials = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1817] font-serif antialiased selection:bg-[#C5A059]/30 relative">
      
      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Concierge, I would like to inquire about booking availability.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Concierge on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] active:scale-95 group font-sans"
      >
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-[#25D366] opacity-75 blur animate-pulse" />
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="text-xs font-bold tracking-wider uppercase">Book via WhatsApp</span>
      </a>

      {/* TOP HEADER & NAVBAR */}
      <NavbarComponent hotelName={hotelName} subTitle={subTitle} logoUrl={logoUrl} ctaText={ctaText} phone={phone} />

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt={hotelName} className="w-full h-full object-cover brightness-[0.45]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-sans tracking-[0.25em] uppercase">
            <Sparkles size={13} className="text-[#C5A059]" />
            <span>Luxury Sanctuary</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight leading-tight font-normal">
            {heroHeading}
          </h1>
          <p className="text-stone-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            {heroTagline}
          </p>

          {/* DYNAMIC QUICK SEARCH/BOOKING STRIP */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-full shadow-2xl text-[#1A1817] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border border-stone-200">
              <div className="flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-stone-200 text-left">
                <Calendar size={18} className="text-[#C5A059]" />
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-stone-400 font-bold">Check In / Out</label>
                  <span className="text-xs font-sans font-medium text-stone-700">Select Dates</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-stone-200 text-left">
                <Users size={18} className="text-[#C5A059]" />
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-stone-400 font-bold">Guests</label>
                  <span className="text-xs font-sans font-medium text-stone-700">2 Adults, 0 Children</span>
                </div>
              </div>
              <Link 
                href="#booking" 
                className="w-full bg-[#C5A059] hover:bg-[#b08b46] text-white text-xs font-sans font-bold tracking-widest uppercase py-3.5 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{ctaText}</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SUITES & ACCOMMODATIONS */}
      <section id="rooms" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#C5A059] text-xs font-sans tracking-[0.3em] uppercase font-bold">ACCOMMODATIONS</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1817] tracking-tight">
            {roomsData.sectionTitle || "Bespoke Suites & Villas"}
          </h2>
          <p className="text-stone-500 font-sans text-sm leading-relaxed font-light">
            {roomsData.sectionDesc || "Each space is carefully curated with premium linens, private terraces, and panoramic ocean vistas."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomsArray.map((room: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-sans font-medium">
                  {room.price}
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059] font-bold">{room.details}</span>
                  <h3 className="text-xl font-serif text-[#1A1817] pt-1">{room.name}</h3>
                  <p className="text-stone-500 font-sans text-xs leading-relaxed pt-2 font-light">{room.desc}</p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <Link 
                    href="#booking" 
                    className="inline-flex items-center gap-1 text-xs font-sans font-bold tracking-widest text-[#1A1817] hover:text-[#C5A059] transition-colors uppercase"
                  >
                    <span>Reserve Suite</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESORT AMENITIES */}
      <section id="amenities" className="bg-[#1A1817] text-white py-28 px-6 lg:px-16 border-t border-b border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#C5A059] text-xs font-sans tracking-[0.3em] uppercase font-bold">WORLD-CLASS EXPERIENCE</span>
            <h2 className="text-3xl sm:text-5xl font-serif leading-tight">
              {amenitiesData.sectionTitle || "Curated Resort Amenities"}
            </h2>
            <p className="text-stone-400 font-sans text-sm leading-relaxed font-light">
              Designed for wellness, serenity, and memorable luxury. Immerse yourself in state-of-the-art facilities crafted for relaxation and leisure.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {amenitiesArray.map((item: any, idx: number) => (
              <div key={idx} className="bg-stone-900/60 p-6 rounded-2xl border border-stone-800/80 space-y-3 hover:border-[#C5A059]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                  <Award size={18} />
                </div>
                <h4 className="text-lg font-serif text-white">{item.title}</h4>
                <p className="text-xs font-sans text-stone-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DINING & LOUNGE */}
      <section id="dining" className="py-28 px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#C5A059] text-xs font-sans tracking-[0.3em] uppercase font-bold">GASTRONOMY</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1817]">
            {diningData.sectionTitle || "Exquisite Culinary Venues"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {diningArray.map((venue: any, idx: number) => (
            <div key={idx} className="relative aspect-[16/10] rounded-2xl overflow-hidden group shadow-lg">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex justify-between items-center text-xs font-sans text-[#C5A059] uppercase tracking-widest font-bold">
                  <span>{venue.cuisine}</span>
                  <span>{venue.hours}</span>
                </div>
                <h3 className="text-2xl font-serif">{venue.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HORIZONTAL SCROLLING TESTIMONIALS */}
      <section id="reviews" className="bg-[#F4EFE6] py-24 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[#C5A059] text-xs font-sans tracking-[0.3em] uppercase font-bold">GUEST EXPERIENCES</span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1817]">
                Reflections of Luxury
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTestimonials("left")}
                aria-label="Scroll left"
                className="p-3 rounded-full bg-white border border-stone-200 text-[#1A1817] hover:bg-[#1A1817] hover:text-white transition-colors shadow-sm active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollTestimonials("right")}
                aria-label="Scroll right"
                className="p-3 rounded-full bg-white border border-stone-200 text-[#1A1817] hover:bg-[#1A1817] hover:text-white transition-colors shadow-sm active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonialsArray.map((item: any, idx: number) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[85vw] sm:w-[450px] bg-white p-8 rounded-2xl border border-stone-200/80 shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-stone-700 font-serif italic text-base leading-relaxed">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 font-sans">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-[#1A1817]">
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-stone-400 pt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RESERVATION CTA */}
      <section id="booking" className="py-24 bg-[#1A1817] text-white text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[#C5A059] text-xs font-sans tracking-[0.3em] uppercase font-bold">DIRECT CONCIERGE</span>
          <h3 className="text-3xl sm:text-5xl font-serif">Begin Your Journey</h3>
          <p className="text-stone-400 text-sm font-sans font-light leading-relaxed">
            Contact our dedicated concierge desk to reserve suites, customize private dining, or coordinate luxury airport transfers.
          </p>
          <div className="pt-4 flex justify-center">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Concierge, I would like to inquire about booking availability.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#C5A059] hover:bg-[#b08b46] text-white text-xs font-sans font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-xl transition-all duration-300"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Connect with Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <FooterComponent 
        hotelName={hotelName} 
        subTitle={subTitle} 
        logoUrl={logoUrl}
        phone={phone} 
        email={email} 
        address={address} 
        hotelDesc={hotelDesc}
        social={social} 
      />

    </div>
  );
}

// NAVBAR COMPONENT
function NavbarComponent({ hotelName, subTitle, logoUrl, ctaText, phone }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1817]/90 backdrop-blur-md text-white border-b border-stone-800 px-6 lg:px-16 py-3.5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO & HOTEL BRANDING */}
        <Link href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-stone-900/80 overflow-hidden flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#C5A059] transition-colors">
            {logoUrl ? (
              <img src={logoUrl} alt={hotelName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-serif font-bold text-sm text-[#C5A059]">
                {hotelName.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg sm:text-xl font-serif font-normal tracking-widest uppercase text-white leading-tight">{hotelName}</span>
            <span className="text-[8px] font-sans font-bold tracking-[0.3em] text-[#C5A059] uppercase">{subTitle}</span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium text-stone-300">
          <Link href="#" className="hover:text-[#C5A059] transition-colors">Home</Link>
          <Link href="#rooms" className="hover:text-[#C5A059] transition-colors">Suites</Link>
          <Link href="#amenities" className="hover:text-[#C5A059] transition-colors">Amenities</Link>
          <Link href="#dining" className="hover:text-[#C5A059] transition-colors">Dining</Link>
          <Link href="#reviews" className="hover:text-[#C5A059] transition-colors">Reviews</Link>
        </div>

        {/* RIGHT CALL CONTROLS */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="#booking" 
            className="bg-[#C5A059] hover:bg-[#b08b46] text-white text-xs font-sans font-bold tracking-widest uppercase px-6 py-2.5 rounded-full transition-colors"
          >
            {ctaText}
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1A1817] border-b border-stone-800 p-6 flex flex-col space-y-4 text-center font-sans text-xs uppercase tracking-widest">
          <Link href="#" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#rooms" onClick={() => setIsOpen(false)}>Suites</Link>
          <Link href="#amenities" onClick={() => setIsOpen(false)}>Amenities</Link>
          <Link href="#dining" onClick={() => setIsOpen(false)}>Dining</Link>
          <Link href="#reviews" onClick={() => setIsOpen(false)}>Reviews</Link>
          <Link href="#booking" onClick={() => setIsOpen(false)} className="text-[#C5A059] font-bold">Reserve</Link>
        </div>
      )}
    </nav>
  );
}

// FOOTER COMPONENT
function FooterComponent({ hotelName, subTitle, logoUrl, phone, email, address, hotelDesc, social }: any) {
  // Always fallback to standard URLs if user didn't provide specific social links
  const instagramLink = social?.instagram || social?.instagramUrl || "#";
  const facebookLink = social?.facebook || social?.facebookUrl || "#";
  const tripadvisorLink = social?.tripadvisor || social?.tripadvisorUrl || "#";
  const twitterLink = social?.twitter || social?.twitterUrl || "#";

  return (
    <footer className="bg-[#11100F] text-stone-400 py-16 px-6 lg:px-16 font-sans text-xs border-t border-stone-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-900">
        
        {/* Brand & Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#C5A059]/40 bg-stone-900 overflow-hidden flex items-center justify-center shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={hotelName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-serif font-bold text-xs text-[#C5A059]">{hotelName.charAt(0)}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif text-white tracking-widest uppercase">{hotelName}</span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-[#C5A059] uppercase">{subTitle}</span>
            </div>
          </div>
          <p className="text-stone-500 font-light max-w-xs leading-relaxed">{hotelDesc}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h5 className="text-white text-[10px] font-bold tracking-widest uppercase">Concierge & Contact</h5>
          <div className="space-y-2 text-stone-400">
            {address && <p className="flex items-center gap-2"><MapPin size={14} className="text-[#C5A059]" /> {address}</p>}
            {phone && <p className="flex items-center gap-2"><Phone size={14} className="text-[#C5A059]" /> {phone}</p>}
            {email && <p className="flex items-center gap-2"><Mail size={14} className="text-[#C5A059]" /> {email}</p>}
          </div>
        </div>

        {/* Social Media Links (Guaranteed High-Visibility Inline SVGs) */}
        <div className="space-y-3 md:text-right flex flex-col md:items-end">
          <h5 className="text-white text-[10px] font-bold tracking-widest uppercase">Social Media</h5>
          <div className="flex items-center gap-4 text-[#C5A059] pt-2">
            
            {/* Instagram */}
            <a 
              href={instagramLink} 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-stone-950 transition-all duration-300" 
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href={facebookLink} 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-stone-950 transition-all duration-300" 
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>

            {/* TripAdvisor */}
            <a 
              href={tripadvisorLink} 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-stone-950 transition-all duration-300" 
              aria-label="TripAdvisor"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.5 13.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm7 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a 
              href={twitterLink} 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-stone-950 transition-all duration-300" 
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 text-center text-stone-600 text-[10px]">
        © {new Date().getFullYear()} {hotelName} {subTitle}. All rights reserved.
      </div>
    </footer>
  );
}