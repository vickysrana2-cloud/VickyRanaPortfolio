"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Flame, ChevronLeft, ChevronRight 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface GlassStudioProps {
  data?: any;
}

/**
 * Universal Data Extractor
 * Deeply checks for direct properties, section objects, nested fields arrays, and flat inputs.
 */
function extract(inputData: any, sectionKeys: string[], fieldKeys: string[], fallback: string = ""): string {
  if (!inputData) return fallback;

  let root = inputData;
  if (typeof root === "string") {
    try {
      root = JSON.parse(root);
    } catch (e) {
      return fallback;
    }
  }

  root = root?.formData || root?.formJson?.[0] || root?.formJson || root?.data || root;

  const targets: any[] = [];
  for (const sKey of sectionKeys) {
    if (root?.[sKey]) targets.push(root[sKey]);
    if (root?.tabs?.[sKey]) targets.push(root.tabs[sKey]);
  }
  targets.push(root);

  const checkValue = (val: any): string | null => {
    if (typeof val === "string" && val.trim() !== "") return val.trim();
    if (typeof val === "number") return String(val);
    return null;
  };

  for (const target of targets) {
    if (!target) continue;

    for (const fKey of fieldKeys) {
      const directVal = checkValue(target[fKey]);
      if (directVal !== null) return directVal;

      const fieldsArray = Array.isArray(target) ? target : Array.isArray(target?.fields) ? target.fields : null;

      if (fieldsArray) {
        const found = fieldsArray.find((f: any) => f?.name === fKey || f?.id === fKey || f?.key === fKey);
        if (found) {
          const val = checkValue(found.value) ?? checkValue(found.defaultValue) ?? checkValue(found.val) ?? checkValue(found.placeholder);
          if (val !== null) return val;
        }
      }
    }
  }

  return fallback;
}

/**
 * Delimited String & Array Resolver
 */
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

export default function GlassStudioTemplate({ data: rawData }: GlassStudioProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Basic Info & Branding
  const studioName = extract(rawData, ["basicInfo", "basic"], ["name", "studioName", "hotelName"], "Vitreus Atelier");
  const studioSubName = extract(rawData, ["basicInfo", "basic"], ["subName", "subTitle"], "STUDIO & GLAZING");
  const logoUrl = extract(rawData, ["basicInfo", "basic"], ["logoUrl", "logo"], "");
  const studioTagline = extract(
    rawData,
    ["basicInfo", "basic"],
    ["tagline", "description"],
    "Discover the beauty of glass craft at Vitreus Atelier. From structural architectural installations to hand-blown art sculptures."
  );
  const studioEmail = extract(rawData, ["basicInfo", "basic"], ["email"], "art@vitreusglass.com");
  const studioHotline = extract(rawData, ["basicInfo", "basic"], ["hotline", "phone"], "+1 (800) 452-7788");
  const studioAddress = extract(rawData, ["basicInfo", "basic"], ["address"], "Studio 4, Glassworks Yard, NY");
  const whatsappNumber = extract(rawData, ["basicInfo", "basic"], ["whatsapp", "whatsappNumber"], "18004527788");

  // 2. Hero Section
  const heroBadge = extract(rawData, ["heroSection", "hero"], ["heroBadge", "badge"], "FINE ART & STRUCTURAL GLASS");
  const heroHeading = extract(rawData, ["heroSection", "hero"], ["headingBold", "heroHeading", "title"], "The Art of Glass Mastery");
  const heroSubheading = extract(
    rawData,
    ["heroSection", "hero"],
    ["description", "heroTagline", "subHeading"],
    "Discover the beauty of custom glass art & architectural glazing. Each piece is a masterpiece of traditional craftsmanship and modern design."
  );
  const heroCtaText = extract(rawData, ["heroSection", "hero"], ["ctaText", "buttonText"], "EXPLORE COLLECTION");
  const heroBgImage = extract(
    rawData,
    ["heroSection", "hero"],
    ["bgImage", "heroBgImage"],
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
  );
  const heroSideImage = extract(
    rawData,
    ["heroSection", "hero"],
    ["sideImage", "spotlightImage"],
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
  );

  // 3. About Section
  const aboutBadge = extract(rawData, ["aboutSection", "about"], ["aboutBadge", "badge"], "ABOUT OUR ATELIER");
  const aboutHeading = extract(rawData, ["aboutSection", "about"], ["heading", "title"], "Crafting Legacy Through Fire & Clarity");
  const aboutDesc1 = extract(
    rawData,
    ["aboutSection", "about"],
    ["desc1", "description"],
    "Founded on centuries-old glassblowing techniques paired with cutting-edge architectural engineering, Vitreus operates at the intersection of structural precision and fine art."
  );
  const aboutDesc2 = extract(
    rawData,
    ["aboutSection", "about"],
    ["desc2", "subDescription"],
    "Every installation and sculpture is meticulously fabricated in our studio atelier, ensuring zero compromise on safety, structural integrity, and aesthetic brilliance."
  );
  const aboutImage = extract(
    rawData,
    ["aboutSection", "about"],
    ["image", "aboutImage"],
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  );

  // 4. Services / Capabilities Section
  const servicesBadge = extract(rawData, ["services"], ["servicesBadge", "badge"], "ATELIER CAPABILITIES");
  const servicesTitle = extract(rawData, ["services"], ["servicesTitle", "sectionTitle", "title"], "Architectural Glazing & Fine Art Glass");
  const rawServiceString = extract(rawData, ["services"], ["serviceDataString", "servicesList"], "");
  const servicesList = resolveSectionArray(
    rawServiceString,
    rawData?.services?.servicesList || rawData?.servicesList,
    [
      {
        title: "Architectural Construction Glass",
        desc: "Custom structural glass walls, frameless partitions, skylights, and balustrades engineered for modern architecture.",
        image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80",
        category: "Construction"
      },
      {
        title: "Hand-Blown Glass Sculptures",
        desc: "Bespoke fine art glass sculptures, blown glass vessels, and custom lighting installations for galleries.",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
        category: "Art & Sculpture"
      },
      {
        title: "Frameless Shower & Facades",
        desc: "Heavy-duty tempered glass enclosures, custom mirrors, and insulated glazing solutions.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        category: "Construction"
      }
    ],
    (tokens) => ({
      title: tokens[0] || "Glass Service",
      desc: tokens[1] || "Crafted to exact client standards.",
      image: tokens[2] || "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=800&q=80",
      category: tokens[3] || "Custom Glass"
    })
  );

  // 5. Gallery / Catalog Section
  const galleryBadge = extract(rawData, ["gallery"], ["galleryBadge", "badge"], "COLLECTION CATALOG");
  const galleryTitle = extract(rawData, ["gallery"], ["galleryTitle", "sectionTitle", "title"], "Sculptures & Structural Works");
  const rawGalleryString = extract(rawData, ["gallery"], ["galleryDataString", "galleryList"], "");
  const galleryList = resolveSectionArray(
    rawGalleryString,
    rawData?.gallery?.galleryList || rawData?.galleryList,
    [
      {
        title: "Lumina Art Sculpture",
        price: "$1,850",
        type: "Sculpture",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Aethel Curved Glass Facade",
        price: "Custom Quote",
        type: "Construction",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Cobalt Vessel Collection",
        price: "$920",
        type: "Hand-Blown Art",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
      }
    ],
    (tokens) => ({
      title: tokens[0] || "Glass Artwork",
      price: tokens[1] || "$0",
      type: tokens[2] || "Collection",
      image: tokens[3] || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    })
  );

  // 6. Reviews Section
  const reviewsBadge = extract(rawData, ["reviews"], ["reviewsBadge", "badge"], "TESTIMONIALS");
  const reviewsTitle = extract(rawData, ["reviews"], ["reviewsTitle", "sectionTitle", "title"], "Words From Our Patrons");
  const rawReviewsString = extract(rawData, ["reviews"], ["reviewsDataString", "reviewsList"], "");
  const reviewList = resolveSectionArray(
    rawReviewsString,
    rawData?.reviews?.reviewsList || rawData?.reviewsList,
    [
      {
        name: "Julian Vance",
        role: "Principal Architect",
        text: "Vitreus executed structural glass partitions for our penthouse project with flawless millimeter accuracy.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Eleanor Sterling",
        role: "Private Art Collector",
        text: "The custom hand-blown glass sculpture in our grand entryway is the absolute centerpiece of our home.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }
    ],
    (tokens) => ({
      name: tokens[0] || "Client Patron",
      role: tokens[1] || "Art Collector",
      text: tokens[2] || "Exquisite glass craftsmanship.",
      rating: Number(tokens[3]) || 5,
      image: tokens[4] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    })
  );

  // 7. Contact / Form Section
  const formBadge = extract(rawData, ["contact", "form"], ["formBadge", "badge"], "INQUIRIES & COMMISSIONS");
  const formTitle = extract(rawData, ["contact", "form"], ["formTitle", "title"], "Commission a Sculpture or Glass Facade");
  const formSubtitle = extract(rawData, ["contact", "form"], ["formSubtitle", "description"], "Fill out the details below to initiate a private consultation via WhatsApp.");
  const formButtonText = extract(rawData, ["contact", "form"], ["formButtonText", "ctaText"], "Send Inquiry via WhatsApp");

  // 8. Hours
  const monFriTime = extract(rawData, ["timings"], ["monFri"], "Mon - Fri: 9:00 AM - 6:00 PM");
  const satTime = extract(rawData, ["timings"], ["saturday"], "Sat: 10:00 AM - 4:00 PM");
  const sunTime = extract(rawData, ["timings"], ["sunday"], "Sun: Closed");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "Fine Art Glass Sculpture",
    phone: "",
    details: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message =
      `Hello ${studioName} Atelier,\n\nI would like to submit a project inquiry:\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Email:* ${formData.email}\n` +
      `*Project Type:* ${formData.projectType}\n` +
      `*Phone/WhatsApp:* ${formData.phone || "N/A"}\n` +
      `*Details:* ${formData.details}\n`;

    const targetPhone = whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const scrollReviews = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#F7FAF9] text-[#1A2321] font-serif antialiased relative">
      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Atelier, I would like to inquire about custom glass design.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Studio on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] active:scale-95 font-sans"
      >
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-[#25D366] opacity-75 blur animate-pulse" />
        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="text-xs font-bold tracking-wider uppercase">Inquire via WhatsApp</span>
      </a>

      {/* HEADER */}
      <header className="w-full bg-[#EBF5F3] border-b border-[#D8E8E4] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#top" className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-full border border-[#2D3E3A] flex items-center justify-center text-[#2D3E3A]">
                <Flame size={18} />
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span className="text-2xl tracking-tight font-normal text-[#1A2321]">{studioName}</span>
              <span className="text-[8px] font-sans font-bold tracking-[0.2em] text-[#537068] uppercase pt-0.5">{studioSubName}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-sm font-sans tracking-wide text-[#384D48]">
            <a href="#about" className="hover:text-[#1A2321]">About Us</a>
            <a href="#services" className="hover:text-[#1A2321]">Capabilities</a>
            <a href="#gallery" className="hover:text-[#1A2321]">Catalog</a>
            <a href="#reviews" className="hover:text-[#1A2321]">Reviews</a>
            <a href="#contact" className="hover:text-[#1A2321]">Commission</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] bg-[#F7FAF9] grid grid-cols-1 lg:grid-cols-12 items-stretch overflow-hidden border-b border-[#E0ECE9]">
        <div className="lg:col-span-7 relative flex items-center p-8 sm:p-16 lg:p-20 z-10">
          <div className="absolute inset-0 bg-cover bg-center -z-10 opacity-90" style={{ backgroundImage: `url('${heroBgImage}')` }} />
          <div className="bg-[#EBF5F3]/95 backdrop-blur-sm p-8 sm:p-12 max-w-xl shadow-sm border border-white/60">
            {heroBadge && (
              <span className="inline-block bg-[#1A2321] text-white text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1 mb-4">
                {heroBadge}
              </span>
            )}
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1A2321] leading-[1.1] mb-6 font-normal">
              {heroHeading}
            </h1>
            <p className="font-sans text-[#425953] text-sm sm:text-base leading-relaxed mb-8">
              {heroSubheading}
            </p>
            <a href="#gallery" className="inline-block bg-[#1A2321] text-white text-xs font-sans font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#2D3E3A] transition-colors">
              {heroCtaText}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#E2EBE8] relative min-h-[400px] flex items-center justify-center p-8">
          <img src={heroSideImage} alt="Spotlight" className="w-full h-full max-h-[600px] object-cover shadow-lg" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6 bg-[#EBF5F3] border-b border-[#D8E8E4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 h-[450px] relative overflow-hidden border border-[#D8E8E4]">
            <img src={aboutImage} alt="About" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            {aboutBadge && (
              <span className="font-sans text-xs uppercase tracking-widest text-[#537068] font-semibold block">
                {aboutBadge}
              </span>
            )}
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1A2321]">{aboutHeading}</h2>
            <p className="font-sans text-sm text-[#425953] leading-relaxed">{aboutDesc1}</p>
            <p className="font-sans text-sm text-[#425953] leading-relaxed">{aboutDesc2}</p>
          </div>
        </div>
      </section>

      {/* SERVICES / CAPABILITIES */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          {servicesBadge && (
            <span className="font-sans text-xs uppercase tracking-widest text-[#537068] font-semibold block">
              {servicesBadge}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1A2321]">{servicesTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((s, idx) => (
            <div key={idx} className="bg-white border border-[#E0ECE9] p-8 space-y-6 shadow-sm">
              <div className="h-64 overflow-hidden relative bg-[#EBF5F3]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-white/90 text-[#1A2321] text-[10px] font-sans font-bold uppercase px-3 py-1">
                  {s.category}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#1A2321]">{s.title}</h3>
              <p className="font-sans text-xs text-[#537068] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="gallery" className="py-24 bg-[#EBF5F3] border-t border-b border-[#D8E8E4] px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            {galleryBadge && (
              <span className="font-sans text-xs uppercase tracking-widest text-[#537068] font-semibold block">
                {galleryBadge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A2321]">{galleryTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryList.map((item, idx) => (
              <div key={idx} className="bg-white p-6 border border-[#D8E8E4] space-y-4 shadow-sm">
                <div className="h-72 overflow-hidden bg-[#F7FAF9]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-sans text-[10px] uppercase text-[#537068]">{item.type}</span>
                    <h3 className="text-xl font-serif text-[#1A2321]">{item.title}</h3>
                  </div>
                  <span className="font-sans text-sm font-semibold text-[#1A2321]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white border-b border-[#D8E8E4]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              {reviewsBadge && (
                <span className="font-sans text-xs uppercase tracking-widest text-[#537068] font-semibold block">
                  {reviewsBadge}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A2321]">{reviewsTitle}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollReviews("left")}
                aria-label="Scroll left"
                className="p-3 rounded-full bg-[#EBF5F3] border border-[#D8E8E4] text-[#1A2321] hover:bg-[#1A2321] hover:text-white transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollReviews("right")}
                aria-label="Scroll right"
                className="p-3 rounded-full bg-[#EBF5F3] border border-[#D8E8E4] text-[#1A2321] hover:bg-[#1A2321] hover:text-white transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviewList.map((item, idx) => (
              <div key={idx} className="shrink-0 w-[85vw] sm:w-[420px] bg-[#F7FAF9] border border-[#D8E8E4] p-8 space-y-6 flex flex-col justify-between">
                <p className="font-serif italic text-sm text-[#2D3E3A]">"{item.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-[#E0ECE9]">
                  <img src={item.image} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A2321] uppercase">{item.name}</h4>
                    <p className="text-[10px] text-[#537068]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & FORM */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-[#D8E8E4] p-8 sm:p-14 shadow-sm space-y-8">
          <div className="text-center space-y-3">
            {formBadge && (
              <span className="font-sans text-xs uppercase tracking-widest text-[#537068] font-semibold block">
                {formBadge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A2321]">{formTitle}</h2>
            {formSubtitle && (
              <p className="font-sans text-xs text-[#537068] max-w-lg mx-auto leading-relaxed">
                {formSubtitle}
              </p>
            )}
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="border-b border-[#C1D6D2] py-3 text-sm focus:outline-none" />
              <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="border-b border-[#C1D6D2] py-3 text-sm focus:outline-none" />
            </div>
            <textarea name="details" placeholder="Describe your project dimensions or artistic vision..." onChange={handleInputChange} required className="w-full border-b border-[#C1D6D2] py-3 text-sm focus:outline-none" rows={4}></textarea>
            <button type="submit" className="w-full bg-[#1A2321] text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#2D3E3A] transition-colors">
              {formButtonText}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EBF5F3] border-t border-[#D8E8E4] pt-16 pb-12 px-6 font-sans text-xs text-[#537068]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#D8E8E4]">
          <div className="space-y-3">
            <h3 className="text-xl font-serif text-[#1A2321]">{studioName}</h3>
            <p className="leading-relaxed">{studioTagline}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#1A2321] uppercase">Atelier Hours</h4>
            <p>{monFriTime}</p>
            <p>{satTime}</p>
            <p>{sunTime}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#1A2321] uppercase">Studio Contact</h4>
            <p className="text-[#1A2321] font-semibold">{studioHotline}</p>
            <p>{studioEmail}</p>
            <p>{studioAddress}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#1A2321] uppercase">Follow Atelier</h4>
            <div className="flex gap-4 text-[#1A2321]">
              <a href="#" aria-label="Facebook"><FaFacebookF size={16} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={16} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 text-center text-[11px]">
          © {new Date().getFullYear()} {studioName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}