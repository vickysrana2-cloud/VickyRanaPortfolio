"use client";
import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle,
  Star,
  ChevronLeft,
  Home,
  Layout,
  FileText,
  Grid,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// --- HELPERS FOR SCHEMA RESOLUTION ---
const extract = (data: any, sectionKey: string, fieldName: string): string => {
  const fields = data?.tabs?.[sectionKey]?.fields || [];
  const field = fields.find((f: any) => f.name === fieldName);
  return field?.value || field?.placeholder || "";
};

const resolveSectionArray = (dataString: string, keys: string[]): any[] => {
  if (!dataString) return [];
  return dataString.split(",").map((item) => {
    const parts = item.split("|").map((p) => p.trim());
    const obj: any = {};
    keys.forEach((k, idx) => {
      obj[k] = parts[idx] || "";
    });
    return obj;
  });
};

interface CarpentryTemplateProps {
  data?: any;
}

export default function CarpentryStudioTemplate({ data }: CarpentryTemplateProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });

  // 1. Basic Info
  const studioName = extract(data, "basicInfo", "name") || "CORGAN";
  const studioSubName = extract(data, "basicInfo", "subName") || "CARPENTRY & TIMBER";
  const hotline = extract(data, "basicInfo", "hotline") || "+1 (800) 234-5678";
  const email = extract(data, "basicInfo", "email") || "info@corgancarpentry.com";
  const address = extract(data, "basicInfo", "address") || "854 Timberland Way, Workshop 4, Oregon";
  const whatsapp = extract(data, "basicInfo", "whatsapp") || "18002345678";

  // 2. Hero Section Slides
  const heroBadge = extract(data, "heroSection", "heroBadge") || "FINE WOOD CRAFT";
  const heroPrimaryCta = extract(data, "heroSection", "primaryCtaText") || "OUR WORK";
  const heroSecondaryCta = extract(data, "heroSection", "secondaryCtaText") || "ABOUT US";

  const heroSlides = [
    {
      heading: extract(data, "heroSection", "headingBold") || "MODERN WOODEN HOUSES",
      bg: extract(data, "heroSection", "bgImage") || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    },
    {
      heading: "BESPOKE TIMBER STRUCTURES",
      bg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
    },
    {
      heading: "SUSTAINABLE ARCHITECTURE",
      bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Hero Auto-Play Effect (Swaps every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 3. About Us / Services Section
  const introBadge = extract(data, "introSection", "badge") || "PREMIUM QUALITY";
  const introHeading = extract(data, "introSection", "heading") || "WE MAKE NATURAL WOOD HOUSE FRAMES FOR YOU";
  
  // 4. Feature Showcase Section
  const featBadge = extract(data, "featureShowcase", "badge") || "WOOD FRAMES";
  const featTitle = extract(data, "featureShowcase", "title") || "THE MIRACLES OF TIMBER FRAME CONSTRUCTION";
  const featDesc = extract(data, "featureShowcase", "description") || "Precision-cut timber frame structures built to withstand generations with natural warmth and high structural durability.";
  const featBulletsStr = extract(data, "featureShowcase", "bulletList") || "Sustainably sourced natural timber | Custom architectural frame design | Weather-proof protective treatment";
  const featBullets = featBulletsStr.split("|").map(b => b.trim());
  const featBtn = extract(data, "featureShowcase", "buttonText") || "DISCOVER";
  const featBgImage = extract(data, "featureShowcase", "bgImage") || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

  // Banner Images Before & After Blog Section
  const preBlogBg = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80";
  const postBlogBg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80";

  // 5. Testimonials Data & Carousel
  const reviewsBadge = extract(data, "reviews", "reviewsBadge") || "OUR WORK";
  const reviewsTitle = extract(data, "reviews", "reviewsTitle") || "OUR CUSTOMERS APPRECIATE THE WORK WE DO";
  const reviewsRaw = extract(data, "reviews", "reviewsDataString");
  
  const defaultReviews = [
    {
      name: "DAVID KENDALL",
      role: "Architect & Homeowner",
      comment: "Corgan delivered the timber frame structure ahead of schedule with immaculate joinery and incredible attention to natural detail.",
      rating: "5",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "SARAH JENKINS",
      role: "Interior Designer",
      comment: "The structural craftsmanship elevated our entire residential build. Their timber frames are truly works of architectural art.",
      rating: "5",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "MICHAEL VANCE",
      role: "Project Developer",
      comment: "Precision cut, sustainably harvested hardwood frames that made on-site assembly seamless and remarkably fast.",
      rating: "5",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const parsedReviews = resolveSectionArray(reviewsRaw, ["name", "role", "comment", "rating", "image"]);
  const reviews = parsedReviews.length > 0 && parsedReviews[0].name ? parsedReviews : defaultReviews;

  const [currentReview, setCurrentReview] = useState(0);

  // Testimonials Auto-Play Effect (Swaps every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  // 6. Recent News / Blog
  const newsBadge = extract(data, "recentNews", "newsBadge") || "BLOG & ARTICLES";
  const newsTitle = extract(data, "recentNews", "newsTitle") || "RECENT NEWS";
  const newsRaw = extract(data, "recentNews", "newsDataString");

  const defaultNews = [
    {
      title: "SUSTAINABLE LIVING: HOW TIMBER FRAMES CONTRIBUTE TO ECO-FRIENDLY HOMES",
      category: "HOUSES",
      date: "Mar 9, 2026",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DURABILITY AND HIGH QUALITY: TIMBER FRAME HOUSES IN HARSH CLIMATES",
      category: "HOUSES",
      date: "Mar 8, 2026",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "A STEP-BY-STEP GUIDE TO TIMBER HOUSE CONSTRUCTION EXCELLENCE",
      category: "HOUSES",
      date: "Mar 7, 2026",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const parsedNews = resolveSectionArray(newsRaw, ["title", "category", "date", "image"]);
  const newsList = parsedNews.length > 0 && parsedNews[0].title ? parsedNews : defaultNews;

  // 7. Contact Section
  const formBadge = extract(data, "contact", "formBadge") || "CONTACT US";
  const formTitle = extract(data, "contact", "formTitle") || "HAVE QUESTIONS?\nGET IN TOUCH!";
  const formBtnText = extract(data, "contact", "formButtonText") || "SUBMIT";

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${studioName}, I have an inquiry:\nName: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nMessage: ${formState.message}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsapp}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#222222] font-sans antialiased selection:bg-[#C86A4B] selection:text-white">
      
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="absolute top-0 left-0 right-0 z-50 text-white border-b border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 border-2 border-[#C86A4B] flex items-center justify-center font-extrabold text-lg tracking-tighter text-[#C86A4B]">
              C
            </div>
            <div>
              <span className="block font-black tracking-widest text-base uppercase leading-none font-serif">{studioName}</span>
              <span className="block text-[9px] tracking-[0.25em] text-gray-300 uppercase mt-0.5">{studioSubName}</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-200">
            <a href="#about" className="hover:text-[#C86A4B] transition-colors">About</a>
            <a href="#showcase" className="hover:text-[#C86A4B] transition-colors">Frames</a>
            <a href="#reviews" className="hover:text-[#C86A4B] transition-colors">Reviews</a>
            <a href="#news" className="hover:text-[#C86A4B] transition-colors">News</a>
            <a href="#contact" className="hover:text-[#C86A4B] transition-colors">Contact</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1E1916] border-b border-stone-800 px-6 py-6 space-y-4 text-xs font-bold tracking-widest uppercase">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-[#C86A4B]">About</a>
            <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-[#C86A4B]">Frames</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-[#C86A4B]">Reviews</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-[#C86A4B]">News</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-[#C86A4B]">Contact</a>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION (AUTO SLIDER) ================= */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20 transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('${heroSlides[currentHeroSlide].bg}')` }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <span className="inline-block text-[11px] font-bold tracking-[0.35em] uppercase text-stone-300">
            {heroBadge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase font-serif leading-[1.1] transition-opacity duration-700">
            {heroSlides[currentHeroSlide].heading}
          </h1>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#showcase" 
              className="bg-[#C86A4B] hover:bg-[#b0583b] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2"
            >
              <span>{heroPrimaryCta}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#about" 
              className="bg-[#BFA38E]/80 hover:bg-[#BFA38E] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300"
            >
              {heroSecondaryCta}
            </a>
          </div>
        </div>

        {/* Hero Slider Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentHeroSlide === idx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ================= ABOUT US / SERVICES SECTION ================= */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-stone-500">
            {introBadge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase font-serif leading-tight text-stone-900">
            {introHeading}
          </h2>
        </div>

        {/* 2x2 Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Card 1: Top Left */}
          <div className="flex flex-col items-center text-center p-10 md:p-14 bg-[#F4F1EA]">
            <div className="w-20 h-20 rounded-full bg-stone-200/60 flex items-center justify-center text-[#BFA38E] mb-6">
              <Home className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-black uppercase font-serif text-stone-900 mb-3 tracking-wider">
              FRAME BUILDING
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed max-w-sm">
              Custom hand-crafted timber frame structures built from sustainably harvested hardwoods, precision-engineered to deliver generational structural integrity and natural thermal insulation.
            </p>
          </div>

          {/* Card 2: Top Right (DARKER) */}
          <div className="flex flex-col items-center text-center p-10 md:p-14 bg-[#E3DED4]">
            <div className="w-20 h-20 flex items-center justify-center text-stone-800 mb-6">
              <Layout className="w-12 h-12 stroke-[1.2]" />
            </div>
            <h3 className="text-xl font-black uppercase font-serif text-stone-900 mb-3 tracking-wider">
              STRUCTURAL DESIGN
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed max-w-sm">
              Comprehensive architectural 3D modeling and structural timber engineering to ensure perfect load distribution, seamless joinery alignment, and aesthetic perfection for modern wooden builds.
            </p>
          </div>

          {/* Card 3: Bottom Left (DARKER) */}
          <div className="flex flex-col items-center text-center p-10 md:p-14 bg-[#E3DED4]">
            <div className="w-20 h-20 rounded-full bg-stone-200/60 flex items-center justify-center text-[#BFA38E] mb-6">
              <FileText className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-black uppercase font-serif text-stone-900 mb-3 tracking-wider">
              ASSEMBLY SERVICES
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed max-w-sm">
              On-site master carpentry assembly executed by certified craftsmen, using traditional mortise-and-tenon joinery methods paired with modern protective weather-proofing techniques.
            </p>
          </div>

          {/* Card 4: Bottom Right */}
          <div className="flex flex-col items-center text-center p-10 md:p-14 bg-[#F4F1EA]">
            <div className="w-20 h-20 rounded-full bg-stone-200/60 flex items-center justify-center text-[#BFA38E] mb-6">
              <Grid className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-black uppercase font-serif text-stone-900 mb-3 tracking-wider">
              FRAMING SOLUTIONS
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed max-w-sm">
              Tailored hybrid framing systems combining heavy timber posts with panelized energy-efficient walls for optimal structural resilience and reduced construction timelines.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURE SHOWCASE CARD SECTION ================= */}
      <section id="showcase" className="pb-28 px-6 max-w-7xl mx-auto">
        <div className="relative min-h-[500px] flex items-center bg-cover bg-center" style={{ backgroundImage: `url('${featBgImage}')` }}>
          <div className="my-12 lg:my-20 lg:ml-auto lg:mr-16 bg-[#EBE7DF] p-8 md:p-14 max-w-lg space-y-6 shadow-xl">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">
              {featBadge}
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase font-serif text-stone-900 leading-tight">
              {featTitle}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              {featDesc}
            </p>
            <ul className="space-y-2.5 pt-2">
              {featBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-[11px] font-bold tracking-wider uppercase text-stone-800">
                  <span className="text-[#C86A4B] font-extrabold">&gt;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <a 
                href="#contact"
                className="inline-flex items-center space-x-2 bg-[#C86A4B] hover:bg-[#b0583b] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
              >
                <span>{featBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION (AUTO CAROUSEL) ================= */}
      <section id="reviews" className="py-24 px-6 bg-[#F4F1EA] relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">
              {reviewsBadge}
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase font-serif text-stone-900 mt-2 leading-tight">
              {reviewsTitle}
            </h2>
          </div>

          <div className="space-y-6 pt-4 min-h-[220px] transition-all duration-500">
            <div className="flex justify-center">
              <img 
                src={reviews[currentReview]?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"} 
                alt={reviews[currentReview]?.name} 
                className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" 
              />
            </div>
            <p className="text-xs md:text-sm text-stone-600 italic leading-relaxed max-w-2xl mx-auto px-4">
              "{reviews[currentReview]?.comment}"
            </p>
            
            <div className="flex justify-center text-[#C86A4B] space-x-1">
              {[...Array(Number(reviews[currentReview]?.rating) || 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">{reviews[currentReview]?.name}</h4>
              <span className="text-[10px] uppercase text-stone-400 font-bold">{reviews[currentReview]?.role}</span>
            </div>
          </div>

          {/* Testimonial Dot Pagination */}
          <div className="flex justify-center items-center space-x-2 pt-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReview(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentReview === idx ? "w-6 bg-[#C86A4B]" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Manual Left/Right Carousel Controls */}
        <button 
          onClick={handlePrevReview}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-800 transition-colors p-2"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={handleNextReview}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-800 transition-colors p-2"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </section>

      {/* ================= PRE-BLOG SHOWCASE BANNER ================= */}
      <section className="h-[450px] bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${preBlogBg}')` }}>
        <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
          <span className="text-white text-xs font-bold tracking-[0.4em] uppercase border-b-2 border-[#C86A4B] pb-2 drop-shadow-md">
            SUSTAINABLE TIMBER ARCHITECTURE
          </span>
        </div>
      </section>

      {/* ================= RECENT NEWS SECTION ================= */}
      <section id="news" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-14">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">
            {newsBadge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase font-serif text-stone-900 tracking-tight">
            {newsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col space-y-4">
              <div className="aspect-[4/3] overflow-hidden bg-stone-200 shadow-sm">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>

              <div className="space-y-2 pt-1">
                <span className="block text-[10px] font-extrabold tracking-[0.2em] text-stone-600 uppercase">
                  {news.category || "HOUSES"}
                </span>

                <h3 className="text-base md:text-lg font-black uppercase font-serif text-stone-900 leading-tight group-hover:text-[#C86A4B] transition-colors">
                  {news.title}
                </h3>

                <div className="text-[11px] font-semibold text-stone-400 tracking-wide pt-1">
                  <span>{news.date || "Mar 9, 2026"}</span>
                  <span className="mx-1.5">•</span>
                  <span>0 Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POST-BLOG ARCHITECTURAL BANNER ================= */}
      <section className="h-[400px] bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url('${postBlogBg}')` }}>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* ================= CONTACT & ESTIMATE SECTION ================= */}
      <section id="contact" className="bg-[#EBE7DF] text-stone-900 py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">
              {formBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase font-serif leading-tight whitespace-pre-line">
              {formTitle}
            </h2>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="Name *"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="bg-transparent border-b border-stone-400 pb-3 text-xs tracking-wider placeholder:text-stone-500 focus:outline-none focus:border-[#C86A4B]"
              />
              <input 
                type="email" 
                placeholder="Email *"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="bg-transparent border-b border-stone-400 pb-3 text-xs tracking-wider placeholder:text-stone-500 focus:outline-none focus:border-[#C86A4B]"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <input 
                type="tel" 
                placeholder="Phone"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="bg-transparent border-b border-stone-400 pb-3 text-xs tracking-wider placeholder:text-stone-500 focus:outline-none focus:border-[#C86A4B]"
              />
              <input 
                type="text" 
                placeholder="Subject"
                className="bg-transparent border-b border-stone-400 pb-3 text-xs tracking-wider placeholder:text-stone-500 focus:outline-none focus:border-[#C86A4B]"
              />
            </div>

            <textarea 
              rows={3}
              placeholder="Comment"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full bg-transparent border-b border-stone-400 pb-3 text-xs tracking-wider placeholder:text-stone-500 focus:outline-none focus:border-[#C86A4B]"
            ></textarea>

            <div className="pt-4">
              <button 
                type="submit"
                className="bg-[#BFA38E] hover:bg-[#aa8e7a] text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {formBtnText}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1D1714] text-stone-400 text-[11px] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Studio Info Column */}
          <div className="space-y-4">
            <h4 className="text-white font-black uppercase tracking-widest font-serif text-xs">{studioName}</h4>
            <p className="text-stone-500 text-[10px] leading-relaxed max-w-sm">
              Bespoke timber structure fabrication and modern wood house framing built to last generations.
            </p>
          </div>

          {/* Pages Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">PAGES</h4>
            <ul className="space-y-2 text-[10px] uppercase tracking-wider text-stone-400">
              <li><a href="#about" className="hover:text-[#C86A4B] transition-colors">ABOUT</a></li>
              <li><a href="#showcase" className="hover:text-[#C86A4B] transition-colors">FRAMES</a></li>
              <li><a href="#reviews" className="hover:text-[#C86A4B] transition-colors">REVIEWS</a></li>
              <li><a href="#news" className="hover:text-[#C86A4B] transition-colors">NEWS</a></li>
              <li><a href="#contact" className="hover:text-[#C86A4B] transition-colors">CONTACT</a></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">CONTACT US</h4>
            <p className="text-[10px]">{address}</p>
            <p className="text-[#C86A4B] font-bold text-xs">{hotline}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800/60 text-center text-[9px] text-stone-600 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {studioName} {studioSubName}. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      {whatsapp && (
        <a 
          href={`https://wa.me/${String(whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(
            `Hello ${studioName}, I'd like to inquire about carpentry and woodwork services.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      )}

    </div>
  );
}