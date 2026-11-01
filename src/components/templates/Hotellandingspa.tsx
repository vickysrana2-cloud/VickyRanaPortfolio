'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Users,
  BedDouble,
  Maximize,
  Eye,
  Check,
  Wifi,
  Waves,
  Sparkles,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Snowflake,
  ConciergeBell,
  Plane,
  Shirt,
  Wine,
  Baby,
  Coffee,
  Tv,
  ShieldCheck,
  TreePine,
  Navigation,
  Percent,
  Expand,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa6';

/* =============================================================================
   HOTEL LANDING PAGE TEMPLATE
   -----------------------------------------------------------------------------
   Pass a single `data` object (all keys optional, every field has a default):

   data = {
     theme:            { primary, accent, background }          // hex colours
     basicInfo:        { companyName, logo }
     heroSection:      { badge, title, highlight, description, buttonText,
                         secondaryButtonText, images[], stat1Number..stat4Label }
     aboutSection:     { badge, title, description, paragraph2, images[], highlights[] }
     roomsSection:     { badge, title, subtitle, rooms[] }
     amenitiesSection: { badge, title, subtitle, amenities[] }
     diningSection:    { badge, title, description, image, items[], buttonText }
     gallerySection:   { badge, title, images[] }
     offersSection:    { badge, title, subtitle, offers[] }
     testimonialsSection: { badge, title, rating, reviewCount, testimonials[] }
     faqSection:       { badge, title, subtitle, faqs[] }
     contactSection:   { badge, title, description, phone, email, address, hours,
                         checkInTime, checkOutTime, whatsapp, mapEmbedUrl,
                         buttonText, nearby[] }
     ctaSection:       { title, description, perks[] }
     footerSection:    { description, copyright, tagline }
     socialLinks:      { instagram, facebook, twitter, youtube }
   }

   Bookings are handled over WhatsApp (no payment engine): the check-in /
   check-out / guests bar and every "Reserve" button open a pre-filled chat.
   ============================================================================= */

/* ----------------------------- small helpers ----------------------------- */

// Accepts a real array, a JSON string, or a comma-separated string of URLs.
const toImageList = (data: any, fallback: string[]): string[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((d) => (typeof d === 'string' ? d : d?.url || d?.src || '')).filter(Boolean);
  }
  if (typeof data === 'string' && data.trim() !== '') {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter(Boolean);
    } catch {
      const items = data.split(',').map((s) => s.trim()).filter(Boolean);
      if (items.length > 0) return items;
    }
  }
  return fallback;
};

// 'card' style fields arrive as ready-made arrays of objects.
const withCardFallback = (data: any, defaults: any[]): any[] =>
  Array.isArray(data) && data.length > 0 ? data : defaults;

// "WiFi, Balcony" or ["WiFi", "Balcony"] -> ["WiFi", "Balcony"]
const toList = (v: any): string[] =>
  Array.isArray(v)
    ? v.map(String).filter(Boolean)
    : typeof v === 'string'
      ? v.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

const onlyDigits = (v: any) => String(v ?? '').replace(/\D/g, '');
const parseAmount = (price: any) => Number(String(price ?? '').replace(/[^\d.]/g, '')) || 0;
const currencyOf = (price: any) => (String(price ?? '').match(/^[^\d]*/)?.[0] || '').trim();
const formatMoney = (n: number, cur: string) =>
  `${cur}${Math.round(n).toLocaleString(cur.includes('₹') ? 'en-IN' : 'en-US')}`;

const toISO = (d: Date) => {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};
const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

// Amenity icon keys (use these in `amenities[].icon`)
const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  spa: Sparkles,
  dining: UtensilsCrossed,
  restaurant: UtensilsCrossed,
  parking: Car,
  gym: Dumbbell,
  fitness: Dumbbell,
  ac: Snowflake,
  concierge: ConciergeBell,
  airport: Plane,
  laundry: Shirt,
  bar: Wine,
  kids: Baby,
  breakfast: Coffee,
  tv: Tv,
  security: ShieldCheck,
  garden: TreePine,
};
const getIcon = (key?: string): LucideIcon => ICONS[String(key || '').toLowerCase()] || Sparkles;

/* ------------------------ tiny reusable components ------------------------ */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// <img> that falls back to a tasteful gradient if the URL is broken.
function SafeImg({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-[#2a4d45] via-[#173a34] to-[#0c211e] ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl space-y-4 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-[var(--c-accent)]" aria-hidden="true" />
        <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--c-accent)]">
          {badge}
        </span>
        {align === 'center' && <span className="h-px w-8 bg-[var(--c-accent)]" aria-hidden="true" />}
      </div>
      <h2
        className={`font-serif text-3xl font-light leading-[1.15] sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-[var(--c-primary)]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm leading-relaxed sm:text-base ${
            light ? 'text-white/65' : 'text-black/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ================================== PAGE ================================== */

export default function HotelLandingSPA({ data }: { data?: any }) {
  /* ---------- 1. read config ---------- */
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const roomsSection = data?.roomsSection || {};
  const amenitiesSection = data?.amenitiesSection || {};
  const diningSection = data?.diningSection || {};
  const gallerySection = data?.gallerySection || {};
  const offersSection = data?.offersSection || {};
  const testimonialsSection = data?.testimonialsSection || {};
  const faqSection = data?.faqSection || {};
  const contactSection = data?.contactSection || {};
  const ctaSection = data?.ctaSection || {};
  const footerSection = data?.footerSection || {};
  const socialLinks = data?.socialLinks || {};

  // Theme (re-colour the whole template for each hotel from one place)
  const rootStyle = {
    '--c-primary': data?.theme?.primary || '#0F2B27',
    '--c-accent': data?.theme?.accent || '#B88A3E',
    '--c-bg': data?.theme?.background || '#F7F2E8',
  } as React.CSSProperties;

  /* ---------- 2. defaults ---------- */
  const companyName = basicInfo.companyName || 'The Aurelian Hotel';
  const companyLogo = basicInfo.logo || 'https://bitbusters.netlify.app/logo.png';

  // Hero
  const heroBadge = heroSection.badge || '5-Star Luxury • Lakeside Retreat';
  const heroTitle = heroSection.title || 'Stay Where Every';
  const heroHighlight = heroSection.highlight || 'Moment Feels Timeless.';
  const heroDescription =
    heroSection.description ||
    'Refined suites, lakeside dining and a spa that slows time — a destination hotel designed around unhurried luxury and genuine hospitality.';
  const heroButtonText = heroSection.buttonText || 'Explore Rooms';
  const heroSecondaryButtonText = heroSection.secondaryButtonText || 'Book Now';
  const stats = [
    { n: heroSection.stat1Number || '120+', l: heroSection.stat1Label || 'Rooms & Suites' },
    { n: heroSection.stat2Number || '4.8/5', l: heroSection.stat2Label || 'Guest Rating' },
    { n: heroSection.stat3Number || '25', l: heroSection.stat3Label || 'Years of Hospitality' },
    { n: heroSection.stat4Number || '50k+', l: heroSection.stat4Label || 'Happy Guests' },
  ];
  const heroImages = toImageList(heroSection.images, [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1800&auto=format&fit=crop',
  ]);

  // About
  const aboutBadge = aboutSection.badge || 'Our Story';
  const aboutTitle = aboutSection.title || 'A Sanctuary of Quiet Luxury';
  const aboutDescription =
    aboutSection.description ||
    'Set along the water’s edge, our hotel blends heritage architecture with contemporary comfort. Every detail — from hand-woven textiles to the scent in the lobby — is chosen to make arrival feel like exhale.';
  const aboutParagraph2 =
    aboutSection.paragraph2 ||
    'Whether you are here for a honeymoon, a family celebration or a restorative break, our team anticipates what you need before you ask.';
  const aboutImages = toImageList(aboutSection.images, [
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop',
  ]);
  const aboutHighlights = withCardFallback(aboutSection.highlights, [
    { title: 'Lake-view rooms', desc: 'Wake up to sunrise over the water.' },
    { title: 'Farm-to-table dining', desc: 'Seasonal menus from local growers.' },
    { title: 'Award-winning spa', desc: 'Signature rituals and private suites.' },
    { title: 'Personal concierge', desc: 'Curated tours and seamless transfers.' },
  ]);

  // Rooms
  const roomsBadge = roomsSection.badge || 'Rooms & Suites';
  const roomsTitle = roomsSection.title || 'Rest, Beautifully Designed';
  const roomsSubtitle =
    roomsSection.subtitle ||
    'Choose from calm, light-filled rooms to expansive suites. Reserve directly with us for the best available rate.';
  const rooms = withCardFallback(roomsSection.rooms, [
    {
      name: 'Deluxe Garden Room',
      category: 'Rooms',
      size: '32 m²',
      bed: 'Queen Bed',
      guests: '2 Adults',
      view: 'Garden View',
      desc: 'A serene retreat with a work nook, rain shower and a private sit-out facing the gardens.',
      price: '₹6,499',
      features: 'Free Wi-Fi, Breakfast included, Smart TV, Mini bar',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Premium Lake-View Room',
      category: 'Rooms',
      size: '38 m²',
      bed: 'King Bed',
      guests: '2 Adults + 1 Child',
      view: 'Lake View',
      desc: 'Floor-to-ceiling windows, a lakeside balcony and a deep soaking tub made for slow evenings.',
      price: '₹8,999',
      features: 'Private balcony, Bathtub, Breakfast included, Coffee station',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Executive Suite',
      category: 'Suites',
      size: '62 m²',
      bed: 'King Bed',
      guests: '3 Adults',
      view: 'Lake View',
      desc: 'A separate living lounge, dining nook and butler-service pantry for longer, more spacious stays.',
      price: '₹14,999',
      features: 'Living lounge, Butler service, Lounge access, Evening cocktails',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Royal Heritage Suite',
      category: 'Suites',
      size: '95 m²',
      bed: 'Super King Bed',
      guests: '4 Adults',
      view: 'Panoramic Lake View',
      desc: 'Our signature suite — private terrace, plunge pool and handcrafted interiors inspired by local heritage.',
      price: '₹24,999',
      features: 'Private terrace, Plunge pool, Airport transfer, Spa credit',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop',
    },
  ]);

  // Amenities
  const amenitiesBadge = amenitiesSection.badge || 'Amenities';
  const amenitiesTitle = amenitiesSection.title || 'Everything You Need, Thoughtfully Included';
  const amenitiesSubtitle =
    amenitiesSection.subtitle ||
    'Complimentary comforts and elevated services, so every part of your stay feels effortless.';
  const amenities = withCardFallback(amenitiesSection.amenities, [
    { title: 'Infinity Pool', desc: 'Heated pool overlooking the lake, with a poolside bar.', icon: 'pool' },
    { title: 'Rejuvenation Spa', desc: 'Massages, hammam and couple’s rituals by certified therapists.', icon: 'spa' },
    { title: 'Fine Dining', desc: 'Three restaurants and 24-hour in-room dining.', icon: 'dining' },
    { title: 'High-Speed Wi-Fi', desc: 'Fibre-fast internet in every room and public area.', icon: 'wifi' },
    { title: 'Fitness Studio', desc: 'Modern equipment and guided morning yoga sessions.', icon: 'gym' },
    { title: 'Airport Transfers', desc: 'Chauffeured pick-up and drop on request.', icon: 'airport' },
    { title: '24/7 Concierge', desc: 'Tours, tickets and tables — arranged for you.', icon: 'concierge' },
    { title: 'Valet Parking', desc: 'Secure covered parking with EV charging.', icon: 'parking' },
  ]);

  // Dining
  const diningBadge = diningSection.badge || 'Dining & Experiences';
  const diningTitle = diningSection.title || 'Flavours Worth Travelling For';
  const diningDescription =
    diningSection.description ||
    'From sunrise breakfasts on the terrace to candlelit dinners by the water, every meal is crafted from seasonal, locally sourced ingredients.';
  const diningImage =
    diningSection.image ||
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop';
  const diningButtonText = diningSection.buttonText || 'Reserve a Table';
  const diningItems = withCardFallback(diningSection.items, [
    { title: 'Saffron Terrace', desc: 'All-day multi-cuisine dining with lake views.', time: '7:00 AM – 11:00 PM' },
    { title: 'The Cellar Bar', desc: 'Craft cocktails, curated wines and live music evenings.', time: '5:00 PM – 12:00 AM' },
    { title: 'Spa & Wellness Rituals', desc: 'Signature massages, steam and aromatherapy suites.', time: '9:00 AM – 9:00 PM' },
    { title: 'Weddings & Private Events', desc: 'Lawns and ballrooms for 20 to 400 guests.', time: 'By appointment' },
  ]);

  // Gallery
  const galleryBadge = gallerySection.badge || 'Gallery';
  const galleryTitle = gallerySection.title || 'A Glimpse of Your Stay';
  const galleryImages = toImageList(gallerySection.images, [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop',
  ]);

  // Offers
  const offersBadge = offersSection.badge || 'Exclusive Offers';
  const offersTitle = offersSection.title || 'Book Direct, Stay Better';
  const offersSubtitle =
    offersSection.subtitle || 'Special packages available only when you reserve directly with the hotel.';
  const offers = withCardFallback(offersSection.offers, [
    {
      title: 'Early Bird Escape',
      tag: 'Save 20%',
      desc: 'Book 30 days ahead and enjoy 20% off the best available rate, with free cancellation.',
      perk: 'Complimentary breakfast for two',
    },
    {
      title: 'Romantic Getaway',
      tag: 'Couples',
      desc: 'A candlelit lakeside dinner, rose-petal turndown and a couple’s spa ritual.',
      perk: 'Late checkout until 2:00 PM',
    },
    {
      title: 'Extended Stay',
      tag: '3rd Night Free',
      desc: 'Stay three nights and your third night is on us — ideal for slow, restorative breaks.',
      perk: 'Free airport transfer',
    },
  ]);

  // Testimonials
  const testimonialsBadge = testimonialsSection.badge || 'Guest Reviews';
  const testimonialsTitle = testimonialsSection.title || 'Loved by Guests From Around the World';
  const avgRating = testimonialsSection.rating || '4.8';
  const reviewCount = testimonialsSection.reviewCount || '2,400+';
  const testimonials = withCardFallback(testimonialsSection.testimonials, [
    {
      quote: 'The lake-view room was spotless and the staff remembered our names by the second morning. Easily our best stay in years.',
      author: 'Ananya & Rohan Mehta',
      role: 'Honeymoon Stay',
      source: 'Google Reviews',
      rating: 5,
    },
    {
      quote: 'Breakfast on the terrace is something I will think about for a long time. Service was warm, quick and never intrusive.',
      author: 'Priya Nair',
      role: 'Leisure Traveller',
      source: 'TripAdvisor',
      rating: 5,
    },
    {
      quote: 'We hosted our family wedding here — the events team handled everything flawlessly. Guests are still talking about it.',
      author: 'Vikram Singhania',
      role: 'Wedding Host',
      source: 'Google Reviews',
      rating: 5,
    },
    {
      quote: 'Perfect for a business trip with a reset built in. Fast Wi-Fi, quiet rooms and an excellent spa for the evening.',
      author: 'Daniel Foster',
      role: 'Business Traveller',
      source: 'Booking.com',
      rating: 5,
    },
    {
      quote: 'Our kids loved the pool and the staff made them feel like VIPs. Genuinely family-friendly without losing the luxury.',
      author: 'Sana & Imran Qureshi',
      role: 'Family Vacation',
      source: 'TripAdvisor',
      rating: 5,
    },
  ]);

  // FAQ
  const faqBadge = faqSection.badge || 'Good to Know';
  const faqTitle = faqSection.title || 'Frequently Asked Questions';
  const faqSubtitle =
    faqSection.subtitle || 'Quick answers about your stay. Still curious? Our front desk replies within minutes on WhatsApp.';
  const faqs = withCardFallback(faqSection.faqs, [
    { q: 'What are the check-in and check-out times?', a: 'Check-in is from 2:00 PM and check-out is until 11:00 AM. Early check-in and late check-out are available on request, subject to availability.' },
    { q: 'Is breakfast included in the room rate?', a: 'Most rates include a full breakfast buffet at Saffron Terrace. Your WhatsApp quote will confirm exactly what is included.' },
    { q: 'What is your cancellation policy?', a: 'Direct bookings can be cancelled free of charge up to 48 hours before arrival. Special offers may have different terms, which we confirm at booking.' },
    { q: 'Do you offer airport pick-up and drop?', a: 'Yes — chauffeured transfers can be arranged for a small fee. Share your flight details and we will take care of the rest.' },
    { q: 'Are pets and children welcome?', a: 'Children of all ages are welcome, and extra beds and cribs are available. Small pets are accepted in selected rooms with prior notice.' },
    { q: 'Is parking available?', a: 'Complimentary secure parking is provided for all guests, with valet service and EV charging available on site.' },
  ]);

  // Contact
  const contactBadge = contactSection.badge || 'Find Us';
  const contactTitle = contactSection.title || 'Plan Your Stay With Us';
  const contactDescription =
    contactSection.description ||
    'Reach our reservations team any time. We will help you choose the right room, arrange transfers and plan celebrations.';
  const contactPhone = contactSection.phone || '+91 12345 67890';
  const contactEmail = contactSection.email || 'reservations@yourhotel.com';
  const contactAddress = contactSection.address || 'Lakeview Road, Udaipur, Rajasthan - 313001';
  const contactHours = contactSection.hours || 'Front Desk: Open 24 hours';
  const checkInTime = contactSection.checkInTime || '2:00 PM';
  const checkOutTime = contactSection.checkOutTime || '11:00 AM';
  const contactButtonText = contactSection.buttonText || 'Chat on WhatsApp';
  const whatsappNumber = onlyDigits(contactSection.whatsapp || '911234567890');
  const mapEmbedUrl: string = contactSection.mapEmbedUrl || '';
  const nearby = withCardFallback(contactSection.nearby, [
    { place: 'Lakeside Promenade', distance: '800 m' },
    { place: 'City Centre & Old Market', distance: '2 km' },
    { place: 'Railway Station', distance: '5 km' },
    { place: 'International Airport', distance: '22 km' },
  ]);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`;

  // CTA band
  const ctaTitle = ctaSection.title || 'Book Direct. Best Rate Guaranteed.';
  const ctaDescription =
    ctaSection.description || 'Reserve with us directly and unlock benefits you will not find on any booking platform.';
  const ctaPerks = toList(ctaSection.perks).length
    ? toList(ctaSection.perks)
    : ['Lowest rate guarantee', 'Free room upgrade (subject to availability)', 'Complimentary breakfast', 'Flexible cancellation'];

  // Footer
  const footerDescription =
    footerSection.description ||
    'A lakeside luxury hotel offering refined rooms, exceptional dining and a spa designed for slow, memorable stays.';
  const footerCopyright =
    footerSection.copyright || `© ${new Date().getFullYear()} ${companyName}. All Rights Reserved.`;
  const footerTagline = footerSection.tagline || 'Hospitality, beautifully unhurried.';

  const instagram = socialLinks.instagram || '';
  const facebook = socialLinks.facebook || '';
  const twitter = socialLinks.twitter || '';
  const youtube = socialLinks.youtube || '';

  /* ---------- 3. state ---------- */
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);

  const [today, setToday] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const [roomFilter, setRoomFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { name: 'Rooms', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  /* ---------- 4. effects ---------- */
  useEffect(() => {
    setToday(toISO(new Date()));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero slideshow
  useEffect(() => {
    if (heroImages.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 6500);
    return () => window.clearInterval(id);
  }, [heroImages.length]);

  // Lightbox: keyboard + scroll lock
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) => (i === null ? i : (i + dir + galleryImages.length) % galleryImages.length)),
    [galleryImages.length]
  );
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, stepLightbox]);

  /* ---------- 5. derived ---------- */
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.round(
      (new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime()) / 86400000
    );
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);
  const dateError = Boolean(checkIn && checkOut && nights === 0);

  const roomCategories = useMemo(
    () => ['All', ...Array.from(new Set(rooms.map((r: any) => r.category).filter(Boolean))) as string[]],
    [rooms]
  );
  const visibleRooms = roomFilter === 'All' ? rooms : rooms.filter((r: any) => r.category === roomFilter);

  /* ---------- 6. WhatsApp ---------- */
  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const stayLines = () => {
    const lines: string[] = [];
    if (checkIn) lines.push(`• Check-in: ${prettyDate(checkIn)}`);
    if (checkOut) lines.push(`• Check-out: ${prettyDate(checkOut)}`);
    if (nights > 0) lines.push(`• Nights: ${nights}`);
    lines.push(`• Guests: ${guests}`);
    return lines;
  };

  const handleAvailability = () => {
    if (dateError) return;
    openWhatsApp(
      [
        `Hello ${companyName},`,
        '',
        'I would like to check room availability:',
        ...stayLines(),
        '',
        'Please share available room types and your best direct rates.',
      ].join('\n')
    );
  };

  const handleReserve = (room: any) => {
    const lines = [
      `Hello ${companyName},`,
      '',
      'I would like to reserve:',
      `*${room.name}*`,
      room.category ? `• Category: ${room.category}` : '',
      room.price ? `• Rate: ${room.price} / night` : '',
      ...stayLines(),
    ].filter(Boolean);
    const amt = parseAmount(room.price);
    if (amt && nights > 0) {
      lines.push(`• Estimated total: ${formatMoney(amt * nights, currencyOf(room.price))} (before taxes)`);
    }
    lines.push('', 'Please confirm availability and the next steps.');
    openWhatsApp(lines.join('\n'));
  };

  const handleOffer = (offer: any) =>
    openWhatsApp(
      [
        `Hello ${companyName},`,
        '',
        `I am interested in the *${offer.title}* offer.`,
        ...stayLines(),
        '',
        'Could you share the details and availability?',
      ].join('\n')
    );

  const handleTable = () =>
    openWhatsApp(`Hello ${companyName},\n\nI would like to reserve a table. Could you share availability for today or tomorrow?`);

  const handleGeneral = () =>
    openWhatsApp(`Hello ${companyName},\n\nI would like to enquire about a stay. Could you please help me with availability and rates?`);

  const scrollReviews = (dir: 'left' | 'right') => {
    const el = reviewsRef.current;
    if (!el) return;
    el.scrollBy({ left: (dir === 'left' ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const solidNav = scrolled || mobileMenuOpen;

  // SEO: Hotel structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: companyName,
    description: heroDescription,
    image: heroImages[0],
    telephone: contactPhone,
    email: contactEmail,
    address: { '@type': 'PostalAddress', streetAddress: contactAddress },
    ...(avgRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(avgRating).split('/')[0],
            reviewCount: onlyDigits(reviewCount) || undefined,
            bestRating: '5',
          },
        }
      : {}),
  };

  const galleryPattern = [
    'sm:col-span-2 sm:row-span-2',
    '',
    '',
    'sm:row-span-2',
    '',
    'sm:col-span-2',
    '',
    '',
  ];

  /* ================================ RENDER ================================ */
  return (
    <div
      style={rootStyle}
      className="min-h-screen bg-[var(--c-bg)] font-sans text-[#1b1f1e] antialiased selection:bg-[var(--c-accent)] selection:text-white"
    >
      <style>{`
        @keyframes hotel-kenburns { from { transform: scale(1.02); } to { transform: scale(1.12); } }
        .hotel-kenburns { animation: hotel-kenburns 9s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .hotel-kenburns { animation: none; } }
        .hotel-hide-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .hotel-hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ============================ 1. NAVBAR ============================ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solidNav ? 'bg-white/95 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${companyName} home`}>
            <Image src={companyLogo} width={40} height={40} unoptimized alt="" className="h-10 w-10 object-contain" />
            <span
              className={`font-serif text-lg font-medium uppercase tracking-[0.22em] transition-colors sm:text-xl ${
                solidNav ? 'text-[var(--c-primary)]' : 'text-white'
              }`}
            >
              {companyName}
            </span>
          </a>

          <nav
            aria-label="Primary"
            className={`hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] lg:flex ${
              solidNav ? 'text-black/65' : 'text-white/85'
            }`}
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="transition-colors hover:text-[var(--c-accent)]">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${contactPhone.replace(/\s/g, '')}`}
              className={`hidden items-center gap-2 text-xs font-medium xl:flex ${
                solidNav ? 'text-[var(--c-primary)]' : 'text-white'
              }`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contactPhone}
            </a>
            <button
              onClick={handleGeneral}
              className="hidden items-center gap-2 bg-[var(--c-accent)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:brightness-110 sm:inline-flex"
            >
              {heroSecondaryButtonText}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 lg:hidden ${solidNav ? 'text-[var(--c-primary)]' : 'text-white'}`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3 flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-5 shadow-xl lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm uppercase tracking-widest text-[var(--c-primary)]"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleGeneral();
              }}
              className="mt-3 flex items-center justify-center gap-2 bg-[var(--c-accent)] py-4 text-xs font-medium uppercase tracking-[0.22em] text-white"
            >
              {heroSecondaryButtonText}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      {/* ============================= 2. HERO ============================= */}
      <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--c-primary)]">
        {/* slideshow */}
        <div className="absolute inset-0" aria-hidden="true">
          {heroImages.map((src, i) => (
            <div
              key={src + i}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
                i === heroIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <SafeImg
                src={src}
                alt=""
                eager={i === 0}
                className={`h-full w-full object-cover ${i === heroIdx ? 'hotel-kenburns' : ''}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-primary)] via-black/35 to-black/55" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 pt-36 lg:px-12">
          <Reveal>
            <div className="inline-flex items-center gap-3 border border-white/25 bg-black/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]" aria-hidden="true" />
              {heroBadge}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {heroTitle} <br />
              <span className="italic text-[#E4C58A]">{heroHighlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-white/80 sm:text-base">
              {heroDescription}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#rooms"
                className="inline-flex items-center justify-center gap-2 bg-[var(--c-accent)] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:brightness-110"
              >
                {heroButtonText}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-2 border border-white/40 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-[var(--c-primary)]"
              >
                View Gallery
              </a>
            </div>
          </Reveal>

          {/* availability bar */}
          <Reveal delay={400}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAvailability();
              }}
              aria-label="Check room availability"
              className="mt-12 bg-white shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_auto]">
                <label className="block border-b border-black/10 p-4 sm:border-r lg:border-b-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/50">Check-in</span>
                  <div className="mt-1 flex items-center gap-2 text-[var(--c-primary)]">
                    <CalendarDays className="h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCheckIn(v);
                        if (v && (!checkOut || checkOut <= v)) setCheckOut(addDays(v, 1));
                      }}
                      className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                  </div>
                </label>

                <label className="block border-b border-black/10 p-4 lg:border-b-0 lg:border-r">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/50">Check-out</span>
                  <div className="mt-1 flex items-center gap-2 text-[var(--c-primary)]">
                    <CalendarDays className="h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                    <input
                      type="date"
                      min={checkIn ? addDays(checkIn, 1) : today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                  </div>
                </label>

                <label className="block border-b border-black/10 p-4 sm:border-r lg:border-b-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/50">Guests</span>
                  <div className="mt-1 flex items-center gap-2 text-[var(--c-primary)]">
                    <Users className="h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent text-sm font-medium outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={dateError}
                  className="group flex items-center justify-center gap-2 bg-[var(--c-primary)] px-8 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 lg:col-span-1"
                >
                  Check Availability
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>

              {(nights > 0 || dateError) && (
                <div
                  role="status"
                  className={`border-t border-black/10 px-4 py-2.5 text-xs ${
                    dateError ? 'text-red-600' : 'text-black/60'
                  }`}
                >
                  {dateError
                    ? 'Check-out must be after check-in.'
                    : `${nights} ${nights === 1 ? 'night' : 'nights'} selected. Your dates will be included in every room enquiry below.`}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ============================ 3. STATS ============================= */}
      <section aria-label="Hotel highlights" className="border-b border-black/10 bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-6 py-8 text-center lg:py-10 ${i % 2 === 1 ? 'border-l border-black/10' : ''} ${
                i > 1 ? 'border-t border-black/10 lg:border-t-0' : ''
              } ${i > 0 ? 'lg:border-l lg:border-black/10' : ''}`}
            >
              <dd className="font-serif text-3xl font-light text-[var(--c-primary)] sm:text-4xl">{s.n}</dd>
              <dt className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/50">{s.l}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ============================ 4. ABOUT ============================= */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-[85%] overflow-hidden shadow-xl">
              <SafeImg src={aboutImages[0]} alt={`${companyName} lobby and lounge`} className="h-full w-full object-cover" />
            </div>
            {aboutImages[1] && (
              <div className="absolute -bottom-10 right-0 hidden aspect-square w-[52%] overflow-hidden border-8 border-[var(--c-bg)] shadow-2xl sm:block">
                <SafeImg src={aboutImages[1]} alt={`${companyName} exterior`} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="absolute -left-3 top-8 hidden bg-[var(--c-primary)] px-6 py-5 text-center text-white shadow-xl sm:block">
              <div className="font-serif text-4xl font-light leading-none">{stats[2].n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/70">{stats[2].l}</div>
            </div>
          </Reveal>

          <div className="space-y-6 lg:col-span-6 lg:pl-8">
            <Reveal>
              <SectionHeading align="left" badge={aboutBadge} title={aboutTitle} />
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base leading-relaxed text-black/65">{aboutDescription}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/55">{aboutParagraph2}</p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 pt-2 sm:grid-cols-2">
                {aboutHighlights.map((h: any, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--c-accent)]/0 ring-1 ring-[var(--c-accent)]">
                      <Check className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--c-primary)]">{h.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-black/55">{h.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ 5. ROOMS ============================= */}
      <section id="rooms" className="scroll-mt-20 bg-white px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading badge={roomsBadge} title={roomsTitle} subtitle={roomsSubtitle} />
          </Reveal>

          {roomCategories.length > 2 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Room categories">
              {roomCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={roomFilter === cat}
                  onClick={() => setRoomFilter(cat)}
                  className={`px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-all ${
                    roomFilter === cat
                      ? 'bg-[var(--c-primary)] text-white'
                      : 'border border-black/15 text-black/60 hover:border-[var(--c-accent)] hover:text-[var(--c-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleRooms.map((room: any, idx: number) => {
              const features = toList(room.features).slice(0, 4);
              const amt = parseAmount(room.price);
              const total = amt && nights > 0 ? formatMoney(amt * nights, currencyOf(room.price)) : '';
              return (
                <Reveal key={`${room.name}-${idx}`} delay={(idx % 3) * 100}>
                  <article className="group flex h-full flex-col overflow-hidden border border-black/10 bg-[var(--c-bg)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SafeImg
                        src={room.image}
                        alt={room.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {room.category && (
                        <span className="absolute left-4 top-4 bg-[var(--c-primary)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                          {room.category}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-2xl font-normal text-[var(--c-primary)]">{room.name}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/60">{room.desc}</p>

                      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-y border-black/10 py-4 text-xs text-black/70">
                        {room.size && (
                          <li className="flex items-center gap-2">
                            <Maximize className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                            {room.size}
                          </li>
                        )}
                        {room.bed && (
                          <li className="flex items-center gap-2">
                            <BedDouble className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                            {room.bed}
                          </li>
                        )}
                        {room.guests && (
                          <li className="flex items-center gap-2">
                            <Users className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                            {room.guests}
                          </li>
                        )}
                        {room.view && (
                          <li className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                            {room.view}
                          </li>
                        )}
                      </ul>

                      {features.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {features.map((f) => (
                            <span
                              key={f}
                              className="border border-black/10 bg-white px-2.5 py-1 text-[10px] uppercase tracking-wider text-black/55"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">From</p>
                          <p className="font-serif text-2xl font-semibold text-[var(--c-primary)]">
                            {room.price}
                            <span className="ml-1 font-sans text-xs font-normal text-black/50">/ night</span>
                          </p>
                          {total && (
                            <p className="mt-0.5 text-[11px] text-[var(--c-accent)]">
                              ≈ {total} for {nights} {nights === 1 ? 'night' : 'nights'}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleReserve(room)}
                          className="group/btn inline-flex shrink-0 items-center gap-2 bg-[var(--c-primary)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:brightness-125"
                        >
                          Reserve
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================== 6. AMENITIES ========================== */}
      <section id="amenities" className="relative scroll-mt-20 overflow-hidden bg-[var(--c-primary)] px-6 py-24 lg:px-12 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[var(--c-accent)] opacity-[0.08] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading light badge={amenitiesBadge} title={amenitiesTitle} subtitle={amenitiesSubtitle} />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a: any, i: number) => {
              const Icon = getIcon(a.icon || a.title);
              return (
                <Reveal key={i} delay={(i % 4) * 80} className="bg-[var(--c-primary)]">
                  <div className="group h-full p-8 transition-colors duration-300 hover:bg-white/[0.04]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--c-accent)]/0 ring-1 ring-[var(--c-accent)] transition-all duration-300 group-hover:bg-[var(--c-accent)]">
                      <Icon className="h-5 w-5 text-[var(--c-accent)] transition-colors group-hover:text-white" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-serif text-xl font-light text-white">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{a.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ 7. DINING ============================ */}
      <section id="dining" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              <SafeImg src={diningImage} alt="Restaurant interior" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">Chef's Table</p>
                <p className="mt-1 font-serif text-xl font-light italic">Seasonal. Local. Unhurried.</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8 lg:col-span-7 lg:pl-8">
            <Reveal>
              <SectionHeading align="left" badge={diningBadge} title={diningTitle} subtitle={diningDescription} />
            </Reveal>

            <ol className="divide-y divide-black/10 border-y border-black/10">
              {diningItems.map((item: any, i: number) => (
                <li key={i}>
                  <Reveal delay={i * 80}>
                    <div className="flex items-start gap-5 py-5">
                      <span className="font-serif text-2xl font-light text-[var(--c-accent)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h3 className="font-serif text-xl text-[var(--c-primary)]">{item.title}</h3>
                          {item.time && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-black/50">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {item.time}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-black/60">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal>
              <button
                onClick={handleTable}
                className="group inline-flex items-center gap-3 bg-[var(--c-primary)] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:brightness-125"
              >
                {diningButtonText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ 8. GALLERY =========================== */}
      <section id="gallery" className="scroll-mt-20 bg-white px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading badge={galleryBadge} title={galleryTitle} />
          </Reveal>

          <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4 [grid-auto-flow:dense]">
            {galleryImages.slice(0, 8).map((src, i) => (
              <Reveal key={src + i} delay={(i % 4) * 70} className={galleryPattern[i] || ''}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                  aria-label={`Open gallery image ${i + 1}`}
                >
                  <SafeImg
                    src={src}
                    alt={`${companyName} gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-[var(--c-primary)]/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                    <Expand className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 9. OFFERS ============================ */}
      <section id="offers" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <SectionHeading badge={offersBadge} title={offersTitle} subtitle={offersSubtitle} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((o: any, i: number) => (
            <Reveal key={i} delay={i * 100}>
              <article className="group relative flex h-full flex-col border border-black/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--c-accent)] hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[var(--c-accent)]">
                    <Percent className="h-5 w-5 text-[var(--c-accent)]" aria-hidden="true" />
                  </span>
                  {o.tag && (
                    <span className="bg-[var(--c-accent)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                      {o.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-[var(--c-primary)]">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{o.desc}</p>
                {o.perk && (
                  <p className="mt-5 flex items-center gap-2 border-t border-black/10 pt-4 text-xs text-black/70">
                    <Check className="h-3.5 w-3.5 text-[var(--c-accent)]" aria-hidden="true" />
                    {o.perk}
                  </p>
                )}
                <button
                  onClick={() => handleOffer(o)}
                  className="group/btn mt-6 inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--c-primary)] transition-colors hover:text-[var(--c-accent)]"
                >
                  Claim this offer
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== 10. TESTIMONIALS ======================= */}
      <section id="reviews" className="scroll-mt-20 overflow-hidden bg-white px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading align="left" badge={testimonialsBadge} title={testimonialsTitle} />
            </Reveal>
            <div className="flex items-center gap-6">
              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="font-serif text-4xl font-light text-[var(--c-primary)]">{avgRating}</span>
                  <span className="text-xs text-black/50">/ 5</span>
                </div>
                <div className="mt-1 flex gap-0.5 text-[var(--c-accent)] sm:justify-end" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-black/50">from {reviewCount} reviews</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollReviews('left')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-[var(--c-primary)] transition-all hover:bg-[var(--c-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollReviews('right')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-[var(--c-primary)] transition-all hover:bg-[var(--c-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={reviewsRef}
            className="hotel-hide-scroll mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {testimonials.map((t: any, i: number) => (
              <figure
                key={i}
                className="flex w-full shrink-0 snap-start flex-col justify-between border border-black/10 bg-[var(--c-bg)] p-8 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-[var(--c-accent)]" aria-label={`${t.rating || 5} out of 5 stars`}>
                      {[...Array(Math.max(0, Math.min(5, Number(t.rating) || 5)))].map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-7 w-7 fill-current text-[var(--c-accent)] opacity-30" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-5 font-serif text-lg font-light italic leading-relaxed text-[var(--c-primary)]">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--c-primary)]">{t.author}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-black/50">{t.role}</p>
                  </div>
                  {t.source && <span className="text-[10px] uppercase tracking-wider text-black/40">{t.source}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== 11. FAQ ============================ */}
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading align="left" badge={faqBadge} title={faqTitle} subtitle={faqSubtitle} />
            <button
              onClick={handleGeneral}
              className="mt-8 inline-flex items-center gap-2 border border-[var(--c-primary)] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--c-primary)] transition-all hover:bg-[var(--c-primary)] hover:text-white"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              Ask the front desk
            </button>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map((f: any, i: number) => {
                const open = openFaq === i;
                return (
                  <li key={i}>
                    <h3>
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-accent)]"
                      >
                        <span className="font-serif text-lg text-[var(--c-primary)] sm:text-xl">{f.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[var(--c-accent)] transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className={`grid transition-all duration-300 ${
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-black/60">{f.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================ 12. CTA BAND ========================= */}
      <section aria-label="Book direct" className="relative overflow-hidden bg-[var(--c-primary)] px-6 py-20 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-[var(--c-accent)] opacity-[0.1] blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">{ctaTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">{ctaDescription}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ctaPerks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-white/80">
                  <Check className="h-4 w-4 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <button
              onClick={handleGeneral}
              className="group inline-flex w-full items-center justify-center gap-3 bg-[var(--c-accent)] px-8 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:brightness-110 sm:w-auto"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              {contactButtonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <a
              href={`tel:${contactPhone.replace(/\s/g, '')}`}
              className="inline-flex w-full items-center justify-center gap-3 border border-white/30 px-8 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-[var(--c-primary)] sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {contactPhone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============================ 13. CONTACT ========================== */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <Reveal>
              <SectionHeading align="left" badge={contactBadge} title={contactTitle} subtitle={contactDescription} />
            </Reveal>

            <Reveal delay={100}>
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[var(--c-primary)]">Address</p>
                    <p className="text-black/60">{contactAddress}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[var(--c-primary)]">Reservations</p>
                    <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-black/60 hover:text-[var(--c-accent)]">
                      {contactPhone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[var(--c-primary)]">Email</p>
                    <a href={`mailto:${contactEmail}`} className="text-black/60 hover:text-[var(--c-accent)]">
                      {contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--c-accent)]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[var(--c-primary)]">{contactHours}</p>
                    <p className="text-black/60">
                      Check-in {checkInTime} &nbsp;·&nbsp; Check-out {checkOutTime}
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="border border-black/10 bg-white p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--c-accent)]">Nearby</p>
                <ul className="mt-4 divide-y divide-black/10">
                  {nearby.map((n: any, i: number) => (
                    <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-black/70">{n.place}</span>
                      <span className="font-mono text-xs text-black/50">{n.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="relative h-full min-h-[420px] overflow-hidden border border-black/10 bg-white shadow-lg">
              {mapEmbedUrl ? (
                <iframe
                  title={`Map showing ${companyName}`}
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#e8e1d1] to-[#d7cfba] p-8 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--c-primary)] text-white shadow-xl">
                    <MapPin className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <p className="font-serif text-2xl text-[var(--c-primary)]">{companyName}</p>
                  <p className="max-w-xs text-sm text-black/60">{contactAddress}</p>
                </div>
              )}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[var(--c-primary)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:brightness-125"
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ 14. FOOTER =========================== */}
      <footer className="border-t border-black/10 bg-white px-6 pb-10 pt-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 border-b border-black/10 pb-14 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src={companyLogo} width={40} height={40} unoptimized alt="" className="h-10 w-10 object-contain" />
              <span className="font-serif text-lg font-medium uppercase tracking-[0.22em] text-[var(--c-primary)]">
                {companyName}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/55">{footerDescription}</p>
            <div className="flex gap-3 pt-1">
              {[
                { href: instagram, label: 'Instagram', Icon: FaInstagram },
                { href: facebook, label: 'Facebook', Icon: FaFacebook },
                { href: twitter, label: 'X (Twitter)', Icon: FaXTwitter },
                { href: youtube, label: 'YouTube', Icon: FaYoutube },
              ]
                .filter((s) => s.href && s.href !== '#')
                .map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/60 transition-all hover:border-[var(--c-accent)] hover:bg-[var(--c-accent)] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--c-primary)]">Explore</h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest text-black/55">
              <li>
                <a href="#top" className="hover:text-[var(--c-accent)]">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[var(--c-accent)]">Our Story</a>
              </li>
              {navLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="hover:text-[var(--c-accent)]">{l.name}</a>
                </li>
              ))}
              <li>
                <a href="#offers" className="hover:text-[var(--c-accent)]">Offers</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--c-accent)]">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-black/60 md:col-span-4">
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--c-primary)]">Reservations</h4>
            <p className="font-medium text-[var(--c-primary)]">{contactPhone}</p>
            <p>{contactEmail}</p>
            <p className="text-black/45">{contactAddress}</p>
            <p className="pt-1 text-[11px] uppercase tracking-widest text-[var(--c-primary)]">{contactHours}</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 pt-8 text-[11px] text-black/45 sm:flex-row">
          <p>{footerCopyright}</p>
          <p className="font-serif italic">{footerTagline}</p>
        </div>
      </footer>

      {/* =========================== LIGHTBOX ============================== */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(-1);
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stepLightbox(1);
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black"
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <img
            src={galleryImages[lightbox]}
            alt={`${companyName} gallery ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain shadow-2xl"
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/60">
            {lightbox + 1} / {galleryImages.length}
          </p>
        </div>
      )}

      {/* ======================= FLOATING WHATSAPP ========================= */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hello ${companyName},\n\nI would like to enquire about a stay.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
