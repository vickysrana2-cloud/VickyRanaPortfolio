"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Star,
  ArrowRight,
  Gift,
  GraduationCap,
  Building2,
  Home,
  Library,
  Award,
  Quote,
} from "lucide-react"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa"
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: "Our Collection",
    children: [
      "New Arrivals",
      "Bestsellers",
      "Folio Picks",
      "Young Readers",
      "Gift Sets",
      "Illustrated Editions",
    ],
  },
  { label: "Our Story" },
  { label: "Reader Reviews" },
  {
    label: "Special Services",
    children: [
      "Gift Cards",
      "School Program",
      "Corporate Gifting",
      "Home Library",
      "Society Library",
      "Folio Membership",
    ],
  },
  {
    label: "Gallery",
    children: ["Inside Folio", "Author Spotlights"],
  },
  { label: "Journal" },
  { label: "Find Us" },
]

const COLLECTION_ITEMS = [
  {
    label: "New Arrivals",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    accent: "#b5451b",
  },
  {
    label: "Bestsellers",
    cover:
      "https://images.unsplash.com/photo-1476275466078-4cad320e9f9b?w=400&q=80",
    accent: "#2d5a27",
  },
  {
    label: "Folio Picks",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    accent: "#1a3a5c",
  },
  {
    label: "Young Readers",
    cover:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    accent: "#7b3a8e",
  },
  {
    label: "Gift Sets",
    cover:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80",
    accent: "#8b5a2b",
  },
  {
    label: "Illustrated Editions",
    cover:
      "https://images.unsplash.com/photo-1549122728-f519709caa9c?w=400&q=80",
    accent: "#4a6741",
  },
]

const HERO_SLIDES = [
  {
    location: "Colaba Causeway, Mumbai",
    tagline: "Where every shelf tells a story",
    bg: "from-[#1a0f07] to-[#3d2010]",
  },
  {
    location: "The Grand Hyatt, Mumbai",
    tagline: "A literary haven in the heart of the city",
    bg: "from-[#071a12] to-[#10382a]",
  },
  {
    location: "Leela Palace, Bengaluru",
    tagline: "Curated reads for curious minds",
    bg: "from-[#07101a] to-[#0f2a3d]",
  },
  {
    location: "Khan Market, New Delhi",
    tagline: "India's most loved independent bookstore",
    bg: "from-[#1a1107] to-[#3d2d10]",
  },
]

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    text: "Folio changed the way I think about browsing books. The curation is extraordinary — every recommendation feels like a letter from a friend who truly knows your taste.",
  },
  {
    name: "Priya Nair",
    text: "I discovered three of my all-time favourite reads entirely by accident at Folio. The staff's knowledge is encyclopaedic, the space is a sanctuary.",
  },
  {
    name: "Rohan Das",
    text: "There are bookstores, and then there is Folio. The illustrated editions section alone is worth the trip. I have never left empty-handed.",
  },
]

const LIMELIGHT = [
  "Amitav Ghosh Reading Circle",
  "Chetan Bhagat Exclusive Signing",
  "Ruskin Bond at Folio Delhi",
]

const SERVICES = [
  {
    icon: Gift,
    title: "Folio Gift Cards",
    desc: "The most thoughtful gift for a book lover. Available in denominations from ₹250 to ₹10,000, redeemable across all Folio locations. Let them choose the story that calls to them.",
  },
  {
    icon: GraduationCap,
    title: "School Program",
    desc: "We believe reading shapes futures. Our school program brings expertly curated reading lists, author visits, and in-store reading sessions that ignite a lifelong love for books.",
  },
  {
    icon: Building2,
    title: "Corporate Gifting",
    desc: "Elevate your corporate gifting with a book that inspires. We help organisations select titles that reflect their values — from leadership reads to beautifully produced coffee table volumes.",
  },
  {
    icon: Home,
    title: "Home Library",
    desc: "Transform any corner of your home into a world-class personal library. Our curators work with you to select books that reflect your aesthetic and feed your curiosity.",
  },
  {
    icon: Library,
    title: "Society Library",
    desc: "Bring the joy of reading to your entire community. We design and stock residential society libraries with thoughtfully selected titles across every genre and age group.",
  },
  {
    icon: Award,
    title: "Folio Membership",
    desc: "Join a circle of devoted readers. Members enjoy early access to new arrivals, invitations to exclusive author events, personalised recommendations, and member-only discounts.",
  },
]

const FOOTER_COLLECTION = [
  "New Arrivals",
  "Bestsellers",
  "Folio Picks",
  "Young Readers",
  "Gift Sets",
  "Illustrated Editions",
]

const FOOTER_LINKS = [
  "Our Story",
  "Reader Reviews",
  "Author Spotlights",
  "Gift Cards",
  "School Program",
  "Corporate Gifting",
  "Home Library",
  "Society Library",
  "Folio Membership",
  "Inside Folio",
  "Journal",
  "Find Us",
]

const LOCATIONS = [
  "Colaba Causeway, Mumbai",
  "The Grand Hyatt, Mumbai",
  "Leela Palace, Bengaluru",
  "Khan Market, New Delhi",
]

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [threshold])
  return scrolled
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function TopBar() {
  return (
    <div className="hidden items-center justify-between bg-[#1a0f07] px-8 py-2 text-xs text-[#d4a96a] md:flex">
      <span className="font-medium tracking-widest uppercase">
        Subscribe to Folio Journal — curated reads, author notes & store news
      </span>
      <a
        href="tel:+912233445566"
        className="flex items-center gap-1.5 transition-colors hover:text-white"
      >
        <Phone size={12} />
        <span>+91 22 3344 5566</span>
      </a>
    </div>
  )
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#d4a96a]/20 bg-[#fdf6ed]/95 shadow-sm backdrop-blur-md"
          : "border-b border-[#d4a96a]/30 bg-[#fdf6ed]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a0f07]">
            <BookOpen size={16} className="text-[#d4a96a]" />
          </div>
          <div className="leading-none">
            <span
              className="block text-xl font-bold tracking-tight text-[#1a0f07]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              FOLIO
            </span>
            <span className="block text-[9px] tracking-[0.3em] text-[#8b6340] uppercase">
              Book Store
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group relative">
              <button
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-[#3d2010] transition-colors hover:bg-[#f5e6d0] hover:text-[#b5451b]"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.label}
                {item.children && (
                  <ChevronDown size={13} className="opacity-60" />
                )}
              </button>
              {item.children && (
                <div
                  className={`absolute top-full left-0 mt-1 min-w-48 rounded-xl border border-[#e8d5bc] bg-white py-2 shadow-lg transition-all duration-150 ${
                    activeDropdown === item.label
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block px-4 py-2 text-sm text-[#3d2010] transition-colors hover:bg-[#fdf0e0] hover:text-[#b5451b]"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="p-2 text-[#3d2010] hover:text-[#b5451b] lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="space-y-1 border-t border-[#e8d5bc] bg-[#fdf6ed] px-6 py-4 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <a
                href="#"
                className="block py-2 text-sm font-medium text-[#3d2010] hover:text-[#b5451b]"
              >
                {item.label}
              </a>
              {item.children?.map((child) => (
                <a
                  key={child}
                  href="#"
                  className="block py-1.5 pl-4 text-xs text-[#8b6340] hover:text-[#b5451b]"
                >
                  {child}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      4500
    )
    return () => clearInterval(t)
  }, [])

  const slide = HERO_SLIDES[current]
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-1000`}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      {/* Decorative large text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span
          className="leading-none font-bold text-white opacity-[0.03]"
          style={{
            fontSize: "clamp(120px,28vw,320px)",
            fontFamily: "Georgia, serif",
          }}
        >
          FOLIO
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: "92vh" }}
      >
        <Badge className="mb-6 border-[#d4a96a]/40 bg-[#d4a96a]/20 px-4 py-1.5 text-xs tracking-widest text-[#d4a96a] uppercase">
          {slide.location}
        </Badge>

        <h1
          className="mb-6 leading-tight font-bold text-white"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
          }}
        >
          FOLIO&nbsp;
          <span className="text-[#d4a96a]">BOOK STORE</span>
          <br />
          <span
            className="font-light text-white/80 italic"
            style={{ fontSize: "0.55em" }}
          >
            The Experience
          </span>
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          {slide.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button className="rounded-full bg-[#d4a96a] px-8 font-semibold text-[#1a0f07] hover:bg-[#c4913a]">
            Browse Collection
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-white/40 px-8 text-white hover:bg-white/10"
          >
            Our Story
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#d4a96a]" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionSection() {
  return (
    <section className="bg-[#fdf6ed] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs tracking-[0.35em] text-[#b5451b] uppercase">
            Browse by Category
          </p>
          <h2
            className="text-4xl font-bold text-[#1a0f07]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Collection
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {COLLECTION_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-md">
                <img
                  src={item.cover}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: item.accent }}
                />
              </div>
              <span
                className="text-center text-sm font-semibold text-[#1a0f07] transition-colors group-hover:text-[#b5451b]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a0f07] py-24">
      {/* subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4a96a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80"
              alt="Inside Folio"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute -right-5 -bottom-5 flex h-36 w-36 items-center justify-center rounded-xl text-center"
            style={{ background: "#d4a96a" }}
          >
            <div>
              <p
                className="text-3xl font-bold text-[#1a0f07]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                25+
              </p>
              <p className="text-xs font-medium text-[#1a0f07]/70">
                Years of Stories
              </p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="mb-3 text-xs tracking-[0.35em] text-[#d4a96a] uppercase">
            Est. 2000 · Mumbai
          </p>
          <h2
            className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Story
          </h2>
          <p className="mb-5 text-base leading-relaxed text-white/70">
            Folio was born from a simple but radical idea: that a bookstore
            should feel like coming home. Founded in 2000 in the lanes of
            Colaba, Folio grew from a tiny corner shop into one of India's most
            celebrated independent bookstores — always guided by the belief that
            the right book finds the right reader.
          </p>
          <p className="mb-8 text-base leading-relaxed text-white/70">
            Our shelves are not stocked by algorithms. Every title is
            hand-picked by our team of lifelong readers, travellers, and
            thinkers. Whether you're hunting for an obscure debut novel or a
            gift that will be treasured for decades, Folio is your guide.
          </p>
          <Button className="rounded-full bg-[#d4a96a] px-8 font-semibold text-[#1a0f07] hover:bg-[#c4913a]">
            Read More <ArrowRight size={15} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section className="bg-[#f5e6d0] py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Quote size={40} className="mx-auto mb-6 text-[#d4a96a] opacity-60" />
        <blockquote
          className="mb-8 text-2xl leading-relaxed font-light text-[#1a0f07] italic md:text-3xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          "I walked into Folio on a Tuesday afternoon looking for nothing in
          particular. I left three hours later with five books, a membership
          card, and the deep conviction that this was my city's best-kept
          secret."
        </blockquote>
        <p className="text-sm font-semibold tracking-widest text-[#8b6340] uppercase">
          — Deepa Krishnamurthy, Mumbai
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#b5451b] hover:underline"
        >
          Read More Reader Stories <ArrowRight size={14} />
        </a>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-[#fdf6ed] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs tracking-[0.35em] text-[#b5451b] uppercase">
            Hear Them Say It
          </p>
          <h2
            className="text-4xl font-bold text-[#1a0f07]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Reader Reviews
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-[#e8d5bc] bg-white p-7"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#d4a96a] text-[#d4a96a]"
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-[#3d2010]/80 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-[#f0dfc4] pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e6d0] text-sm font-bold text-[#8b6340]">
                  {t.name[0]}
                </div>
                <span className="text-sm font-semibold text-[#1a0f07]">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#b5451b] hover:underline"
          >
            See All Reviews <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function LimelightSection() {
  const images = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=600&q=80",
    "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=600&q=80",
  ]

  return (
    <section className="bg-[#1a0f07] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs tracking-[0.35em] text-[#d4a96a] uppercase">
            Personalities, Events & Happenings
          </p>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Folio Limelight
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {LIMELIGHT.map((title, i) => (
            <a
              key={title}
              href="#"
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img
                src={images[i]}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <p
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {title}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-[#d4a96a] group-hover:underline">
                  View Event <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="rounded-full border-[#d4a96a]/50 px-8 text-[#d4a96a] hover:bg-[#d4a96a]/10"
          >
            View All <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="bg-[#fdf6ed] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs tracking-[0.35em] text-[#b5451b] uppercase">
            Folio Special Services
          </p>
          <h2
            className="text-4xl font-bold text-[#1a0f07]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Services
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="group flex flex-col gap-4 rounded-2xl border border-[#e8d5bc] bg-white p-7 transition-all hover:border-[#d4a96a]/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d0] transition-colors group-hover:bg-[#d4a96a]/20">
                <svc.icon size={22} className="text-[#b5451b]" />
              </div>
              <h3
                className="text-lg font-bold text-[#1a0f07]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {svc.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-[#3d2010]/70">
                {svc.desc}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#b5451b] hover:underline"
              >
                Read More <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState("")
  return (
    <section className="bg-[#d4a96a] py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2
          className="mb-3 text-3xl font-bold text-[#1a0f07] md:text-4xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Stay in the Story
        </h2>
        <p className="mb-8 text-base text-[#1a0f07]/70">
          Subscribe to Folio Journal for curated reading lists, author
          interviews, event invites, and exclusive member previews.
        </p>
        <div className="mx-auto flex max-w-md gap-3">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="rounded-full border-0 bg-white/80 px-5 text-[#1a0f07] placeholder:text-[#8b6340]/60 focus-visible:ring-[#1a0f07]"
          />
          <Button className="shrink-0 rounded-full bg-[#1a0f07] px-7 font-semibold text-[#d4a96a] hover:bg-[#3d2010]">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const socials = [
    { Icon: FaFacebook, href: "#" },
    { Icon: FaTwitter, href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: FaYoutube, href: "#" },
    { Icon: FaLinkedin, href: "#" },
  ]

  return (
    <footer className="bg-[#0d0804] text-white/70">
      {/* Contact bar */}
      <div className="border-b border-white/10 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="mb-2 text-xs tracking-widest text-white/40 uppercase">
              Phone
            </p>
            <a
              href="tel:+912233445566"
              className="font-medium text-[#d4a96a] transition-colors hover:text-white"
            >
              +91 22 3344 5566
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-widest text-white/40 uppercase">
              Email
            </p>
            <a
              href="mailto:hello@foliobooks.in"
              className="font-medium text-[#d4a96a] transition-colors hover:text-white"
            >
              hello@foliobooks.in
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs tracking-widest text-white/40 uppercase">
              Locations
            </p>
            <p className="text-sm text-white/60">
              Mumbai · Bengaluru · New Delhi
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a96a]">
              <BookOpen size={15} className="text-[#1a0f07]" />
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              FOLIO
            </span>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-white/50">
            Since 2000, Folio Book Store has been India's home for independent,
            curated reading — an artfully designed space where every visit feels
            like a discovery.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all hover:border-[#d4a96a]/40 hover:bg-[#d4a96a]/20"
              >
                <Icon
                  size={14}
                  className="text-white/50 hover:text-[#d4a96a]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Collection */}
        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
            Collection
          </h4>
          <ul className="space-y-2.5">
            {FOOTER_COLLECTION.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm text-white/50 transition-colors hover:text-[#d4a96a]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
            Our Links
          </h4>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.slice(0, 8).map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm text-white/50 transition-colors hover:text-[#d4a96a]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-widest text-white uppercase">
            Our Locations
          </h4>
          <ul className="space-y-3">
            {LOCATIONS.map((loc) => (
              <li key={loc}>
                <a
                  href="#"
                  className="group flex items-start gap-2 text-sm text-white/50 transition-colors hover:text-[#d4a96a]"
                >
                  <MapPin
                    size={13}
                    className="mt-0.5 shrink-0 group-hover:text-[#d4a96a]"
                  />
                  {loc}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-xs text-white/30 md:flex-row">
        <span>© 2025 Folio Book Store · All Rights Reserved</span>
        <span>
          Designed with <span className="text-[#d4a96a]">♥</span> for readers
          everywhere
        </span>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function FolioTemplate() {
  const scrolled = useScrolled()

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <TopBar />
      <Navbar scrolled={scrolled} />
      <HeroSlider />
      <CollectionSection />
      <AboutSection />
      <QuoteSection />
      <TestimonialsSection />
      <LimelightSection />
      <ServicesSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
