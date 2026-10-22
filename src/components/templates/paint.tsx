"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Paintbrush, CheckCircle2, ShieldCheck, Palette, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface PaintingStudioProps {
  data?: any;
}

/**
 * Universal Data Extractor
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

export default function PaintingStudioTemplate({ data: rawData }: PaintingStudioProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Basic Info & Branding
  const studioName = extract(rawData, ["basicInfo", "basic"], ["name", "studioName", "brandName"], "painting");
  const studioSubName = extract(rawData, ["basicInfo", "basic"], ["subName", "subTitle"], "COLOR & WALL DECOR");
  const logoUrl = extract(rawData, ["basicInfo", "basic"], ["logoUrl", "logo"], "");
  const studioTagline = extract(
    rawData,
    ["basicInfo", "basic"],
    ["tagline", "description"],
    "Bring your home to lively colors with our professional interior, exterior, and artistic decorative painting services."
  );
  const studioEmail = extract(rawData, ["basicInfo", "basic"], ["email"], "contact@paintingstudio.com");
  const studioHotline = extract(rawData, ["basicInfo", "basic"], ["hotline", "phone"], "+1 (800) 456-7890");
  const studioAddress = extract(rawData, ["basicInfo", "basic"], ["address"], "124 Paintbrush Lane, Suite 10, NY");
  const whatsappNumber = extract(rawData, ["basicInfo", "basic"], ["whatsapp", "whatsappNumber"], "18004567890");

  // 2. Hero Section
  const heroBadge = extract(rawData, ["heroSection", "hero"], ["heroBadge", "badge"], "Splash your dream color");
  const heroHeading = extract(rawData, ["heroSection", "hero"], ["headingBold", "heroHeading", "title"], "Bring your home to");
  const heroAccent = extract(rawData, ["heroSection", "hero"], ["headingAccent", "accentWord"], "lively Colors");
  const heroSubheading = extract(
    rawData,
    ["heroSection", "hero"],
    ["description", "heroTagline", "subHeading"],
    "Transform your commercial or residential space with precision color matching, premium eco-friendly paints, and wall art expertise."
  );
  const heroCtaText = extract(rawData, ["heroSection", "hero"], ["ctaText", "buttonText"], "COLOR ME");
  const heroBgImage = extract(
    rawData,
    ["heroSection", "hero"],
    ["bgImage", "heroBgImage"],
    "/images/hero-green-room.jpg"
  );
  const heroSideImage = extract(
    rawData,
    ["heroSection", "hero"],
    ["heroSideImage", "sideImage", "spotlightImage"],
    "/images/hero-side.jpg"
  );

  // 3. Why Choose Us Section
  const whyChooseBadge = extract(rawData, ["whyChooseUs", "features"], ["badge"], "THE PAINTING DIFFERENCE");
  const whyChooseTitle = extract(rawData, ["whyChooseUs", "features"], ["title", "heading"], "Why Choose Our Studio?");
  const rawWhyChooseString = extract(rawData, ["whyChooseUs", "features"], ["featuresDataString", "featuresList"], "");
  const whyChooseList = resolveSectionArray(
    rawWhyChooseString,
    rawData?.whyChooseUs?.featuresList || rawData?.featuresList,
    [
      {
        title: "Eco-Friendly Paints",
        desc: "We exclusively use zero-VOC, non-toxic, eco-certified paint formulations that keep your indoor air clean and odor-free."
      },
      {
        title: "Precision Edge Lines",
        desc: "Our painters use professional masking techniques to ensure razor-sharp trim lines and spotless cleanup."
      },
      {
        title: "Custom Color Matching",
        desc: "We provide digital mockups and physical swatches so you preview exact wall color undertones before we paint."
      },
      {
        title: "Fully Insured & Timely",
        desc: "Backed by comprehensive property protection insurance and completed strictly according to project schedules."
      }
    ],
    (tokens) => ({
      title: tokens[0] || "Quality Feature",
      desc: tokens[1] || "High-standard painting service guaranteed."
    })
  );

  // 4. Services / Capabilities Section
  const servicesTitle = extract(rawData, ["services"], ["servicesTitle", "sectionTitle", "title"], "Our Specialty Painting Services");
  const rawServiceString = extract(rawData, ["services"], ["serviceDataString", "servicesDataString", "servicesList"], "");
  const servicesList = resolveSectionArray(
    rawServiceString,
    rawData?.services?.servicesList || rawData?.servicesList,
    [
      {
        title: "Interior Painting",
        desc: "Premium interior wall finishing with low-VOC, non-toxic eco-friendly paint formulas.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Exterior Coating",
        desc: "Weatherproof, multi-layer exterior protective paint treatments built to resist harsh climates.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Decorative Wall Art",
        desc: "Custom geometric motifs, hand-painted murals, textures, and luxury accent wall installations.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    (tokens) => ({
      title: tokens[0] || "Specialty Service",
      desc: tokens[1] || "Tailored painting solutions for your property.",
      image: tokens[2] || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    })
  );

  // 5. Reviews / Testimonials Section (Vertical Scroll Engine)
  const reviewsTitle = extract(rawData, ["testimonials", "reviews"], ["testimonialsTitle", "sectionTitle", "title"], "What Our Clients Say");
  const rawReviewsString = extract(rawData, ["testimonials", "reviews"], ["testimonialDataString", "reviewsDataString", "reviewsList"], "");
  const reviewList = resolveSectionArray(
    rawReviewsString,
    rawData?.testimonials?.reviewsList || rawData?.reviewsList,
    [
      {
        name: "Emily Watson",
        role: "Homeowner, Brooklyn",
        text: "Transformed our living area into a bright, colorful sanctuary. Exceptional clean finish and fast turnaround!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Michael Vance",
        role: "Interior Architect",
        text: "Precise edge lines and incredible attention to color accuracy. Highly recommended for custom home designs.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Sarah Jenkins",
        role: "Commercial Studio Manager",
        text: "The geometric accent wall in our studio gets compliments every single day. True wall artists!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }
    ],
    (tokens) => ({
      name: tokens[0] || "Satisfied Client",
      role: tokens[1] || "Property Owner",
      text: tokens[2] || "Flawless painting and wall decoration work.",
      rating: Number(tokens[3]) || 5,
      image: tokens[4] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    })
  );

  // 6. Contact / Form Section
  const formBadge = extract(rawData, ["contact", "form"], ["formBadge", "badge"], "FREE ESTIMATE & CONSULTATION");
  const formTitle = extract(rawData, ["contact", "form"], ["formTitle", "title"], "Book a Color Consultation");
  const formSubtitle = extract(rawData, ["contact", "form"], ["formSubtitle", "description"], "Fill out your details below to schedule an on-site painting quote via WhatsApp.");
  const formButtonText = extract(rawData, ["contact", "form"], ["formButtonText", "ctaText"], "Request Quote via WhatsApp");

  // 7. Operating Hours
  const monFriTime = extract(rawData, ["timings"], ["monFri"], "Mon - Fri: 8:00 AM - 6:00 PM");
  const satTime = extract(rawData, ["timings"], ["saturday"], "Sat: 9:00 AM - 3:00 PM");
  const sunTime = extract(rawData, ["timings"], ["sunday"], "Sun: Closed");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceType: "Interior Wall Painting",
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
      `Hello ${studioName},\n\nI would like to request a painting estimate:\n\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Email:* ${formData.email}\n` +
      `*Service Required:* ${formData.serviceType}\n` +
      `*Phone/WhatsApp:* ${formData.phone || "N/A"}\n` +
      `*Project Notes:* ${formData.details}\n`;

    const targetPhone = whatsappNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased relative">
      
      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I'm interested in getting a color quote.")}`}
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

      {/* RAINBOW GRADIENT NAVBAR */}
      <header className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 to-yellow-500 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#top" className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
            ) : (
              <Paintbrush size={28} className="text-white drop-shadow-sm" />
            )}
            <div className="flex flex-col leading-none">
              <span className="text-3xl font-extrabold tracking-tight lowercase">{studioName}</span>
              <span className="text-[9px] font-sans font-black tracking-[0.25em] text-white/80 uppercase pt-0.5">{studioSubName}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
            <a href="#top" className="hover:opacity-80 border-b-2 border-white pb-0.5">Home</a>
            <a href="#why-us" className="hover:opacity-80">Why Us</a>
            <a href="#services" className="hover:opacity-80">Services</a>
            <a href="#reviews" className="hover:opacity-80">Reviews</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH RIGHT SIDE IMAGE */}
      <section
        className="relative min-h-[80vh] bg-[#88b04b] bg-cover bg-center flex items-center px-8 md:px-16 overflow-hidden border-b border-slate-200"
        style={{
          backgroundImage: heroBgImage ? `url('${heroBgImage}')` : "none"
        }}
      >
        {/* Geometric Accent Shapes */}
        <div className="absolute top-12 left-10 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[45px] border-b-yellow-400 transform -rotate-12 opacity-90" />
        <div className="absolute bottom-16 left-8 w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[60px] border-b-purple-600 transform rotate-45 opacity-90" />
        <div className="absolute top-20 left-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-red-500 transform rotate-12 opacity-90" />
        <div className="absolute bottom-24 left-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-cyan-400 transform -rotate-45 opacity-90" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
          {/* Left Hero Text Box */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-xs p-8 sm:p-10 rounded-xl border border-white/20 shadow-lg">
            {heroBadge && (
              <p className="text-sm font-semibold italic text-slate-700 mb-2">
                {heroBadge}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight mb-4">
              {heroHeading} <span className="italic font-serif text-slate-900">{heroAccent}</span>
            </h1>
            <p className="text-xs text-slate-700 leading-relaxed mb-6 font-medium">
              {heroSubheading}
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-2.5 border-2 border-slate-800 text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition"
            >
              {heroCtaText}
            </a>
          </div>

          {/* Right Side Image Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center">
            {heroSideImage && (
              <div className="relative w-full max-w-md lg:max-w-lg h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl group">
                <img
                  src={heroSideImage}
                  alt="Painting Decor Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-us" className="py-20 px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            {whyChooseBadge && (
              <span className="text-xs uppercase font-bold tracking-widest text-lime-600 block">
                {whyChooseBadge}
              </span>
            )}
            <h2 className="text-3xl font-bold text-slate-900">{whyChooseTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-lime-500 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center mb-4">
                  {idx === 0 && <Sparkles size={20} />}
                  {idx === 1 && <CheckCircle2 size={20} />}
                  {idx === 2 && <Palette size={20} />}
                  {idx >= 3 && <ShieldCheck size={20} />}
                </div>
                <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CATALOG (WITH HOVER ZOOM ON IMAGES) */}
      <section id="services" className="py-20 px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
          {servicesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((s, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between"
            >
              {s.image && (
                <div className="w-full h-52 overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-lime-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (STRICT VERTICAL SCROLL ENGINE) */}
      <section id="reviews" className="py-16 bg-slate-900 text-white px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {reviewsTitle}
          </h2>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto space-y-4 pr-3 scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-slate-800"
          >
            {reviewList.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-800 border border-slate-700 rounded-lg flex items-start gap-4 shadow-md"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-lime-400 shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{item.name}</h4>
                    <span className="text-amber-400 text-xs">{'★'.repeat(Number(item.rating) || 5)}</span>
                  </div>
                  <p className="text-[11px] text-lime-400 mb-2">{item.role}</p>
                  <p className="text-slate-300 text-xs italic leading-relaxed">"{item.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & ESTIMATE FORM */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-3">
            {formBadge && (
              <span className="text-xs uppercase font-bold tracking-widest text-lime-600 block">
                {formBadge}
              </span>
            )}
            <h2 className="text-3xl font-bold text-slate-900">{formTitle}</h2>
            {formSubtitle && (
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                {formSubtitle}
              </p>
            )}
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
                className="border-b border-slate-300 py-3 text-sm focus:outline-none focus:border-lime-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleInputChange}
                required
                className="border-b border-slate-300 py-3 text-sm focus:outline-none focus:border-lime-500"
              />
            </div>
            <textarea
              name="details"
              placeholder="Describe wall dimensions, colors, or specialized finishes needed..."
              onChange={handleInputChange}
              required
              className="w-full border-b border-slate-300 py-3 text-sm focus:outline-none focus:border-lime-500"
              rows={4}
            />
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors rounded-md"
            >
              {formButtonText}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 px-6 font-sans text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white lowercase">{studioName}</h3>
            <p className="leading-relaxed text-slate-400">{studioTagline}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider">Studio Hours</h4>
            <p>{monFriTime}</p>
            <p>{satTime}</p>
            <p>{sunTime}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <p className="text-white font-semibold">{studioHotline}</p>
            <p>{studioEmail}</p>
            <p>{studioAddress}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-4 text-white">
              <a href="#" aria-label="Facebook"><FaFacebookF size={16} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={16} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} {studioName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}