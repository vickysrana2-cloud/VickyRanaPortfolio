"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";


export const SportsOutletTemplate: React.FC<{ data: any }> = ({ data }) => {
  const params = useParams();
  const productId = params.tenantId;

  const [activeTab, setActiveTab] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)

  const basic = data?.basicInfo || {}
  const contact = data?.contact || {}
  const footer = data?.footer || {}
  const hero = data?.heroSection || {}
  const marquee = data?.marquee || {}
  const whyChooseUsTab = data?.whyChooseUs || {}
  const collection = data?.collection || {}
  const reviewsTab = data?.reviews || {}
  const timings = data?.timings || {}
  const gallery = data?.gallery || {}

  const shopName = basic.name || "Athletica Studio"
  const tagline = basic.tagline || "Push your limits"
  const aboutUs =
    basic.aboutUs ||
    "Premium sports gear for athletes who refuse to compromise."
  const address = contact.address || "123 Athletic Way, Fitness City"
  const phone = contact.phone || "+91 98765 433457"
  const email = contact.email || "hello@velocitysports.com"
  const instagram = contact.instagram || "velocitysports"
  const facebook = contact.facebook || ""
  const whatsapp = contact.whatsapp || contact.phone || "1234567890"
  const copyright = footer.copyright || "© 2026 Velocity Sports."
  const companyName = footer.companyName || shopName
  const openingHours = footer.openingHours || ""
  const hoursSubtitle = footer.hoursSubtitle || ""

  const defaultImages = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584735174965-48c48d4eff6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ]

  // ---- marquee.highlights (card) ----
  const defaultHighlights = [
    "FREE SHIPPING OVER $50",
    "30-DAY RETURNS",
    "PREMIUM QUALITY",
    "PERFORMANCE GEAR",
    "BUILT TO LAST",
    "PROFESSIONAL GRADE",
  ]
  const highlights: string[] =
    Array.isArray(marquee.highlights) && marquee.highlights.length > 0
      ? marquee.highlights.map((h: any) => (typeof h === "string" ? h : h.text || ""))
      : defaultHighlights

  // ---- whyChooseUs.whyChooseUs (card) ----
  const whyTitle = whyChooseUsTab.sectionTitle || "Why athletes shop with us"
  const whyDescription =
    whyChooseUsTab.sectionDescription ||
    "Authentic gear, fitted right, backed by people who train too."
  const defaultWhy = [
    { title: "Free Shipping", description: "Free delivery on every order over $50, no code needed." },
    { title: "30-Day Returns", description: "Didn't work out? Send it back within 30 days, no questions asked." },
    { title: "Verified Authentic", description: "Every item is sourced directly from the brand, never grey market." },
    { title: "Fit Guarantee", description: "Free exchanges if the size isn't right the first time." },
  ]
  const whyChooseUsItems =
    Array.isArray(whyChooseUsTab.whyChooseUs) && whyChooseUsTab.whyChooseUs.length > 0
      ? whyChooseUsTab.whyChooseUs
      : defaultWhy

  // ---- collection.categories + collection.products (card) ----
  const collectionTitle = collection.title || "Collection"
  const defaultCategories = [{ name: "Footwear" }, { name: "Apparel" }, { name: "Accessories" }]
  const categories: any[] =
    Array.isArray(collection.categories) && collection.categories.length > 0
      ? collection.categories
      : defaultCategories

  const defaultProducts = [
    { category: "Footwear", name: "Pro Runner X1", price: "$129.99", description: "Ultra-lightweight marathon running shoes with responsive cushioning.", tag: "New Arrival", image: defaultImages[0] },
    { category: "Apparel", name: "AeroTech Training Tee", price: "$34.99", description: "Moisture-wicking athletic shirt for high-intensity workouts.", tag: "Bestseller", image: defaultImages[1] },
    { category: "Accessories", name: "Elite Grip Gym Gloves", price: "$24.99", description: "Durable weightlifting gloves with wrist support.", tag: "", image: defaultImages[2] },
    { category: "Footwear", name: "CourtMaster Basketball", price: "$149.99", description: "High-top sneakers with maximum ankle support and traction.", tag: "", image: defaultImages[3] },
    { category: "Apparel", name: "Compression Tights", price: "$45.00", description: "Breathable compression wear for faster recovery.", tag: "Popular", image: defaultImages[4] },
    { category: "Accessories", name: "HydroFlask 32oz", price: "$39.99", description: "Insulated water bottle to keep drinks cold for 24 hours.", tag: "", image: defaultImages[5] },
    { category: "Apparel", name: "Windbreaker Jacket", price: "$89.99", description: "Lightweight, water-resistant jacket for outdoor training.", tag: "New", image: defaultImages[6] },
    { category: "Footwear", name: "Trail Blazer Running Shoes", price: "$139.99", description: "Rugged outsoles and responsive cushioning for off-road running.", tag: "", image: defaultImages[7] },
    { category: "Accessories", name: "Yoga Mat Pro", price: "$59.99", description: "Extra-thick, non-slip yoga mat for ultimate comfort.", tag: "Essential", image: defaultImages[8] },
    { category: "Apparel", name: "Swift Running Shorts", price: "$29.99", description: "Unlined, ultra-light shorts for unrestricted movement.", tag: "", image: defaultImages[9] },
    { category: "Accessories", name: "Resistance Band Set", price: "$19.99", description: "Set of 5 premium resistance bands for strength training.", tag: "Popular", image: defaultImages[10] },
    { category: "Footwear", name: "LiftMaster Weightlifting Shoes", price: "$179.99", description: "Solid base and elevated heel for peak lifting performance.", tag: "", image: defaultImages[11] },
  ]
  const allProducts: any[] =
    Array.isArray(collection.products) && collection.products.length > 0
      ? collection.products
      : defaultProducts

  const tabs = [
    { id: "all", label: "All" },
    ...categories.map((c: any) => ({
      id: (c.name || "").toLowerCase(),
      label: c.name || "",
    })),
  ]

  const currentItems =
    activeTab === "all"
      ? allProducts
      : allProducts.filter((i) => (i.category || "").toLowerCase() === activeTab)

  // ---- reviews.reviews (card) ----
  const reviewsHeading = reviewsTab.heading || "Feedback."
  const defaultReviews = [
    { text: "The Pro Runner X1s completely changed my marathon training. So responsive and light!", author: "Jake T.", stars: 5 },
    { text: "Best athletic wear I've ever purchased. The compression tights are a lifesaver.", author: "Sarah M.", stars: 5 },
    { text: "Amazing quality gear and fast shipping. Highly recommend!", author: "Mike R.", stars: 4 },
  ]
  const reviews: any[] =
    Array.isArray(reviewsTab.reviews) && reviewsTab.reviews.length > 0 ? reviewsTab.reviews : defaultReviews

  // ---- timings.storeHours (card) ----
  const defaultDays = [
    { day: "Monday", open: "08:00", close: "21:00" },
    { day: "Tuesday", open: "08:00", close: "21:00" },
    { day: "Wednesday", open: "08:00", close: "21:00" },
    { day: "Thursday", open: "08:00", close: "21:00" },
    { day: "Friday", open: "08:00", close: "22:00" },
    { day: "Saturday", open: "09:00", close: "22:00" },
    { day: "Sunday", open: "09:00", close: "18:00" },
  ]
  const days: any[] =
    Array.isArray(timings.storeHours) && timings.storeHours.length > 0 ? timings.storeHours : defaultDays

  // ---- hero.heroSlides (card) ----
  const defaultHeroSlides = [
    {
      image:
        hero.heroImage ||
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: hero.heroTitle || shopName,
      subtitle: hero.heroDescription || tagline,
    },
    {
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "UNSTOPPABLE",
      subtitle: "Defy expectations.",
    },
    {
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "AESTHETIC",
      subtitle: "Form meets function.",
    },
  ]
  const heroSlides: any[] =
    Array.isArray(hero.heroSlides) && hero.heroSlides.length > 0 ? hero.heroSlides : defaultHeroSlides

  // ---- gallery.galleryImages (dynamic-images) ----
  const galleryImages: string[] = Array.isArray(gallery.galleryImages) ? gallery.galleryImages : []

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <div className="min-h-screen bg-zinc-50 font-['Inter',sans-serif] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-editorial { font-family: 'Inter', sans-serif; letter-spacing: -0.04em; }
        .text-balance { text-wrap: balance; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; display: flex; width: max-content; }
        .marquee-container:hover .animate-marquee { animation-play-state: paused; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* WHATSAPP */}
      {whatsapp && (
        <a
          href={`https://wa.me/${String(whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(
            `Hello ${companyName}, I'd like to know more about your products.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:scale-110 transition-transform duration-300"
        >
          <FaWhatsapp size={28} />
        </a>
      )}

      {/* NAV (Minimalist) */}
      <nav className="absolute top-0 left-0 z-50 flex w-full items-center justify-between p-8 text-white mix-blend-difference">
        <div className="font-editorial text-2xl font-bold tracking-tighter uppercase">
          {companyName}
        </div>
        <div className="hidden gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          <a href="#collection" className="transition-opacity hover:opacity-50">
            Collection
          </a>
          <a href="#about" className="transition-opacity hover:opacity-50">
            About
          </a>
          <a href="#visit" className="transition-opacity hover:opacity-50">
            Visit
          </a>
            {productId && (
              <a href={`/product/${productId}`} className="border-2 border-[#C8502A] text-[#8B3418] px-7 py-3 rounded-lg font-medium hover:bg-[#FDF4EF] transition">
              Product Page
            </a>
             )}
        </div>
      </nav>

      {/* HERO SECTION - Animated Editorial Style */}
      <section className="relative flex h-screen w-full flex-col justify-end overflow-hidden bg-zinc-900 p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="Hero Slide"
              className="h-full w-full object-cover object-center"
            />
            {/* Very subtle gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 pb-8 md:flex-row md:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-w-3xl text-white"
            >
              <h1 className="font-editorial mb-6 text-6xl leading-[0.85] font-bold uppercase md:text-8xl lg:text-[10rem]">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="max-w-lg text-xl leading-snug font-light text-zinc-200 md:text-2xl">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex shrink-0 items-center gap-6">
            <div className="hidden gap-2 md:flex">
              {heroSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 transition-all duration-500 ${idx === currentSlide ? "w-8 bg-white" : "w-4 bg-white/30"}`}
                />
              ))}
            </div>
            <Button
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-none bg-white px-8 py-7 text-sm font-semibold tracking-widest text-zinc-900 uppercase transition-colors duration-300 hover:bg-zinc-200"
            >
              {hero.primaryButtonText || "Shop Collection"}
            </Button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-container w-full overflow-hidden border-y border-zinc-800 bg-zinc-900 py-5">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...highlights, ...highlights, ...highlights].map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="font-editorial mx-12 text-sm font-light tracking-widest text-zinc-300 uppercase">
                {item}
              </span>
              <span className="text-xs text-zinc-600">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* INTRODUCTION */}
      <section
        id="about"
        className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-32 md:flex-row md:gap-32 md:px-12"
      >
        <div className="md:w-1/3">
          <h2 className="font-editorial text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            Designed for the <br /> uncompromising.
          </h2>
        </div>
        <div className="md:w-2/3">
          <p className="text-xl leading-relaxed font-light text-balance text-zinc-500 md:text-2xl">
            {aboutUs} We strip away the unnecessary to focus on pure
            performance, utilizing advanced materials and rigorous testing to
            create gear that stands the test of time.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-editorial text-4xl font-medium tracking-tight md:text-5xl">{whyTitle}</h2>
          <p className="mt-5 text-lg font-light text-zinc-500">{whyDescription}</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUsItems.map((item: any, idx: number) => (
            <div key={idx} className="border-t border-zinc-200 pt-6">
              <span className="font-editorial text-sm text-zinc-400">{String(idx + 1).padStart(2, "0")}</span>
              <h4 className="font-editorial mt-3 text-xl font-medium tracking-tight">{item.title}</h4>
              <p className="mt-2 text-sm font-light leading-relaxed text-zinc-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG / MENU */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 pb-32 md:px-12"
      >
        <div className="mb-16 flex flex-col items-end justify-between gap-8 border-b border-zinc-200 pb-8 md:flex-row">
          <div>
            <h2 className="font-editorial text-5xl font-medium tracking-tight md:text-6xl">
              {collectionTitle}
            </h2>
          </div>

          <div className="hide-scroll flex w-full gap-6 overflow-x-auto md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 pb-2 text-sm font-medium tracking-widest whitespace-nowrap uppercase transition-colors ${
                  activeTab === tab.id
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.length === 0 ? (
            <div className="col-span-full py-20 text-center text-zinc-400">
              No items available in this category.
            </div>
          ) : (
            currentItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-zinc-100">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  )}
                  {item.tag && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-zinc-900 px-3 py-1 text-xs font-medium tracking-widest text-white uppercase">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="font-editorial text-2xl font-medium tracking-tight text-zinc-900">
                      {item.name}
                    </h3>
                    <span className="text-lg font-medium text-zinc-900">
                      {item.price}
                    </span>
                  </div>
                  <div className="mb-3 text-xs tracking-widest text-zinc-500 uppercase">
                    {item.category}
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed font-light text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* GALLERY */}
      {galleryImages.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
          <h2 className="font-editorial mb-12 text-4xl font-medium tracking-tight md:text-5xl">
            In the wild.
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.map((src, idx) => (
              <div key={idx} className="aspect-square overflow-hidden bg-zinc-100">
                <img src={src} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STORE & REVIEWS */}
      <section
        id="visit"
        className="bg-zinc-900 px-6 py-32 text-zinc-50 md:px-12"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-24 lg:grid-cols-2">
          {/* Store Info */}
          <div>
            <h2 className="font-editorial mb-12 text-4xl font-medium tracking-tight md:text-5xl">
              Visit Us.
            </h2>
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-8 border-t border-zinc-800 pt-8 sm:grid-cols-2">
                {address && (
                  <div>
                    <h4 className="mb-3 text-xs tracking-widest text-zinc-500 uppercase">
                      Location
                    </h4>
                    <p className="text-lg font-light">{address}</p>
                  </div>
                )}
                {phone && (
                  <div>
                    <h4 className="mb-3 text-xs tracking-widest text-zinc-500 uppercase">
                      Contact
                    </h4>
                    <p className="text-lg font-light">{phone}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-zinc-800 pt-8">
                <h4 className="mb-6 text-xs tracking-widest text-zinc-500 uppercase">
                  Store Hours
                </h4>
                <div className="space-y-3">
                  {days.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-zinc-800 pb-3 text-sm font-light"
                    >
                      <span className="text-zinc-400">{item.day}</span>
                      <span>
                        {item.open} — {item.close}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="font-editorial mb-12 text-4xl font-medium tracking-tight md:text-5xl">
              {reviewsHeading}
            </h2>
            <div className="space-y-12 border-t border-zinc-800 pt-8">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border-b border-zinc-800 pb-12 last:border-0"
                >
                  <div className="mb-6 flex gap-1 text-sm text-zinc-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.stars ? "opacity-100" : "opacity-20"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mb-6 text-xl leading-relaxed font-light text-balance text-zinc-300 md:text-2xl">
                    "{review.text}"
                  </p>
                  <div className="text-xs tracking-widest text-zinc-500 uppercase">
                    — {review.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-7xl border-t border-zinc-200 px-6 py-16 md:px-12">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-editorial mb-6 text-2xl font-bold tracking-tighter text-zinc-900 uppercase">
              {companyName}
            </h3>
            <p className="mb-3 max-w-sm leading-relaxed font-light text-zinc-500">
              Redefining athletic gear.
            </p>
            {openingHours && (
              <p className="text-sm font-light text-zinc-400">
                {openingHours}
                {hoursSubtitle ? ` · ${hoursSubtitle}` : ""}
              </p>
            )}
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-widest text-zinc-900 uppercase">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-light text-zinc-500">
              <li>
                <a href="#collection" className="transition-colors hover:text-zinc-900">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-zinc-900">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#visit" className="transition-colors hover:text-zinc-900">
                  Visit
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-zinc-900">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold tracking-widest text-zinc-900 uppercase">
              Social
            </h4>
            <ul className="space-y-4 text-sm font-light text-zinc-500">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors hover:text-zinc-900"
                  >
                    Email
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {facebook && (
                <li>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-8 text-xs tracking-widest text-zinc-400 uppercase md:flex-row">
          <div>{copyright}</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-zinc-900">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SportsOutletTemplate