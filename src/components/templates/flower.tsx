"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useParams } from "next/navigation";


// --- Data Constants ---

const categories = [
  {
    name: "Signature Boxes",
    image: "/luxury_bouquet_box_1777811616720.png",
    count: "12 Styles",
  },
  {
    name: "Bespoke Design",
    image: "/bespoke_floral_design_1777811633439.png",
    count: "Customized",
  },
  {
    name: "Seasonal Bouquets",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop",
    count: "24 Styles",
  },
];

const products = [
  {
    name: "Midnight Reverie",
    price: "£145",
    image: "/midnight_reverie.png",
    category: "Signature Box",
  },
  {
    name: "Tuscan Sun",
    price: "£85",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop",
    category: "Classic Bouquet",
  },
  {
    name: "Spring Awakening",
    price: "£95",
    image: "/spring_awakening.png",
    category: "Seasonal",
  },
  {
    name: "Ivory Whisper",
    price: "£160",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop",
    category: "Luxury Edition",
  },
];

const reviews = [
  {
    name: "Eleanor Pemberton",
    role: "Wedding Coordinator",
    content: "The attention to detail in their signature boxes is unparalleled. Floral Studio has become our go-to for high-end events in London.",
    rating: 5,
  },
  {
    name: "James Sutherland",
    role: "Collector",
    content: "Exquisite craftsmanship. The 'Midnight Reverie' bouquet arrived in pristine condition and stayed vibrant for nearly two weeks.",
    rating: 5,
  },
  {
    name: "Isabella Rossi",
    role: "Interior Designer",
    content: "Sustainability meets absolute luxury. Their commitment to ethical sourcing makes their botanical art even more beautiful.",
    rating: 5,
  },
];

const response = "sdjfns"

// --- Sub-components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-700 px-6 md:px-12 ${
        scrolled
          ? "glass premium-shadow py-3 md:py-4"
          : "bg-transparent text-white py-6 md:py-8"
      } flex justify-between items-center`}
    >
      <div className={`text-xl md:text-2xl kerning-luxury font-light transition-colors duration-500 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>
        FLORAL <span className="font-semibold text-primary">STUDIO</span>
      </div>

      <div className={`hidden md:flex gap-10 text-[11px] kerning-luxury font-medium transition-colors duration-500 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>
        <a href="#" className="hover:text-primary transition-colors">Shop All</a>
        <a href="#" className="hover:text-primary transition-colors">Bespoke</a>
        <a href="#" className="hover:text-primary transition-colors">Journal</a>
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
      </div>

      <div className={`flex items-center gap-6 transition-colors duration-500 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>
        <button className="hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button className="hover:text-primary transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span className="absolute -top-1 -right-1 bg-primary text-[8px] text-white w-3 h-3 rounded-full flex items-center justify-center">0</span>
        </button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const params = useParams();
  const productId = params.tenantId;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="/luxury_florist_hero_1777811595219.png"
          alt="Luxury Floral Arrangement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-white text-center px-6 max-w-5xl"
      >
        <span className="kerning-luxury text-[10px] md:text-xs mb-6 block opacity-80">Established 1994 • London</span>
        <h1 className="text-5xl md:text-8xl mb-8 leading-[1.1]">
          The Art of <br /> 
          <span className="italic font-light">Fine Floristry</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg opacity-90 font-light leading-relaxed mb-10">
          Hand-crafted botanical masterpieces delivered to your door. <br className="hidden md:block" />
          Elegance in every petal, curated for the most discerning tastes.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-10 py-4 bg-primary text-white text-[11px] kerning-luxury hover:bg-white hover:text-foreground transition-all duration-500 premium-shadow">
            Shop Collection
          </button>
          <button className="px-10 py-4 border border-white/30 text-white text-[11px] kerning-luxury hover:bg-white/10 transition-all duration-500 backdrop-blur-sm">
            Bespoke Services
          </button>
              {productId && (
                <a href={`/product/${productId}`} className="border-2 border-[#C8502A] text-[#8B3418] px-7 py-3 rounded-lg font-medium hover:bg-[#FDF4EF] transition">
                  Product Page
                </a>
            )}
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[9px] kerning-luxury opacity-60">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}

function BouquetCategory() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="kerning-luxury text-[10px] text-primary mb-4 block">Our Collections</span>
            <h2 className="text-4xl md:text-5xl leading-tight">
              Curated Floral <br /> 
              <span className="italic font-light">Excellence</span>
            </h2>
          </div>
          <button className="text-[11px] kerning-luxury border-b border-foreground/20 pb-1 hover:border-primary transition-colors">
            View All Collections
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl mb-1">{category.name}</h3>
                  <p className="text-[10px] kerning-luxury opacity-50">{category.count}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-white transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="kerning-luxury text-[10px] text-primary mb-4 block">Curated Selection</span>
          <h2 className="text-4xl md:text-5xl leading-tight mb-4">The Floral Shop</h2>
          <div className="w-20 h-[1px] bg-primary/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-secondary/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                <button className="absolute bottom-0 left-0 w-full py-4 bg-white/90 backdrop-blur-sm text-[10px] kerning-luxury translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  Quick Shop
                </button>
              </div>
              <p className="text-[10px] kerning-luxury text-primary mb-2 tracking-[0.2em]">{product.category}</p>
              <h3 className="text-lg font-light mb-1">{product.name}</h3>
              <p className="text-sm opacity-60 italic">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignatureCollections() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary/20">
              <img
                src="/craftsmanship.png"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/signature_collection.png";
                }}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-primary/20 -z-10 hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="kerning-luxury text-[10px] text-primary mb-8 block">The Floral Philosophy</span>
            <h2 className="text-4xl md:text-6xl mb-10 leading-[1.2]">
              Crafting Emotions <br /> 
              <span className="italic font-light text-foreground/80 text-3xl md:text-5xl block mt-2">Through Botanical Art</span>
            </h2>
            <p className="text-lg text-foreground/70 font-light leading-relaxed mb-12">
              Each arrangement is a unique dialogue between nature and design. We source only the rarest blooms from sustainable growers, ensuring each petal tells a story of elegance and ethical beauty.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12 border-y border-foreground/10 py-10">
              <div>
                <h4 className="text-2xl mb-2 italic">01.</h4>
                <p className="text-[11px] kerning-luxury mb-2">Artisan Curated</p>
                <p className="text-xs text-foreground/60 leading-relaxed">Every stem is hand-selected by our master florists for its unique character.</p>
              </div>
              <div>
                <h4 className="text-2xl mb-2 italic">02.</h4>
                <p className="text-[11px] kerning-luxury mb-2">Sustainable Sourcing</p>
                <p className="text-xs text-foreground/60 leading-relaxed">Committed to ethical farming and carbon-neutral delivery practices.</p>
              </div>
            </div>

            <button className="text-[11px] kerning-luxury flex items-center gap-4 group">
              Explore Our Story
              <div className="w-12 h-[1px] bg-foreground group-hover:w-20 transition-all duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 px-6 bg-background border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="kerning-luxury text-[10px] text-primary mb-4 block">Kind Words</span>
          <h2 className="text-4xl md:text-5xl leading-tight">Voices of Our <span className="italic font-light">Clients</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-primary"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <p className="text-lg text-foreground/80 font-light leading-relaxed mb-8 italic">
                "{review.content}"
              </p>
              <div>
                <h4 className="text-sm font-medium mb-1">{review.name}</h4>
                <p className="text-[10px] kerning-luxury opacity-40">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto pt-24 border-t border-foreground/5 text-center">
          <h2 className="text-2xl md:text-4xl italic font-light leading-snug mb-12 opacity-70">
            "Flowers are the music of the ground. From earth's lips spoken without sound."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-foreground/10" />
            <p className="text-[11px] kerning-luxury opacity-40">Edwin Curran</p>
            <div className="w-12 h-[1px] bg-foreground/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-24 px-6 md:px-12 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-1 md:col-span-3 lg:mb-0 mb-8">
            <div className="text-2xl kerning-luxury mb-8">FLORAL STUDIO</div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed font-light mb-8">
              Elevating the art of gifting through bespoke floral design and sustainable practices. Based in London, delivering elegance worldwide.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] kerning-luxury mb-8">Contact Us</h4>
            <ul className="space-y-6 text-sm text-white/60 font-light">
              <li className="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>124 Marylebone High St, <br /> London W1U 4PG</span>
              </li>
              <li className="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+44 (0) 20 7486 7870</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] kerning-luxury mb-8">Boutique Hours</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li className="flex justify-between gap-4">
                <span>Mon - Fri</span>
                <span className="text-white/30">09:00 - 19:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-white/30">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-white/30">11:00 - 17:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] kerning-luxury mb-8">Journal</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Floral Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workshop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] kerning-luxury mb-8">Newsletter</h4>
            <p className="text-xs text-white/60 mb-6 font-light">Join our list for exclusive seasonal previews.</p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent text-sm w-full outline-none placeholder:text-white/30"
              />
              <button className="text-[10px] kerning-luxury hover:text-primary transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] kerning-luxury text-white/40">© 2024 Floral Studio. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] kerning-luxury text-white/40">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BouquetCategory />
      <FeaturedProducts />
      <SignatureCollections />
      <Testimonials />
      <Footer />
    </main>
  );
}