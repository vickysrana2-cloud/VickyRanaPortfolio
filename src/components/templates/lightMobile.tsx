'use client';


import { useParams } from "next/navigation";
/**
 * MobileAccessoriesStoreTemplate.tsx
 *
 * Accepts typed props that exactly mirror the section keys in mainTemplateConfig.
 * The shape of each prop matches what DynamicForm outputs for that section.
 *
 * Usage:
 *   <MobileAccessoriesStoreTemplate
 *     hero={formData.hero}
 *     story={formData.story}
 *     reviews={formData.reviews}
 *     address={formData.address}
 *     footer={formData.footer}
 *     timings={formData.timings}
 *     products={products}   ← from a separate products API, unchanged
 *   />
 */

import React, { useState } from 'react';

// ─── Prop types ── mirrors the templateJson config exactly ────────────────────

export interface HeroData {
  tag: string;
  heading: string;
  description: string;
  image: string;
  name: string;
  highlights: string[];
}

export interface StoryData {
  tag: string;
  heading: string;
  description: string;
  highlights: string[];
}

export interface ReviewItem {
  text: string;
  author: string;
  rating: number;
}

export interface ReviewsData {
  tag: string;
  heading: string;
  description: string;
  list: ReviewItem[];
}

export interface AddressData {
  tag: string;
  heading: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  'form-submit-api'?: string;
}

export interface FooterData {
  footerText: string;
  copyright: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface TimingsData {
  mondayOpen: string;    mondayClose: string;
  tuesdayOpen: string;   tuesdayClose: string;
  wednesdayOpen: string; wednesdayClose: string;
  thursdayOpen: string;  thursdayClose: string;
  fridayOpen: string;    fridayClose: string;
  saturdayOpen: string;  saturdayClose: string;
  sundayOpen: string;    sundayClose: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  tag?: string;
  category: string;
}

export interface MobileAccessoriesStoreProps {
  hero: HeroData;
  story: StoryData;
  reviews: ReviewsData;
  address: AddressData;
  footer: FooterData;
  timings: TimingsData;
  /** Products come from a separate API, not the template CMS */
  products?: ProductItem[];
}

type ApiHeroData = Partial<HeroData> & {
  'google-rating'?: string;
  'total-customers'?: string;
  'uk-delivery-over-£30'?: string;
};

type ApiReviewsData = Partial<Omit<ReviewsData, 'list'>> & {
  list?: ReviewItem[] | string;
};

type MobileAccessoriesStoreTemplateData = Partial<Omit<MobileAccessoriesStoreProps, 'hero' | 'reviews'>> & {
  hero?: ApiHeroData;
  reviews?: ApiReviewsData;
  customerReviews?: ApiReviewsData;
  'customer-reviews'?: ApiReviewsData;
  testimonials?: ApiReviewsData;
};

type MobileAccessoriesStoreTemplateProps = Partial<MobileAccessoriesStoreProps> & {
  data?: MobileAccessoriesStoreTemplateData;
};

// ─── Fallback / demo data (used when no props are passed) ─────────────────────

const DEMO_HERO: HeroData = {
  tag: 'PREMIUM TECH ACCESSORIES',
  heading: 'Power up your daily drive',
  description: 'Minimal design, maximum performance. Discover charging gear, audio essentials, and protective cases crafted for the modern lifestyle.',
  image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format',
  name: 'VoltCase',
  highlights: ['Fast charging certified', 'Sweat-proof & durable', '1-year warranty', 'Eco-friendly packaging', '24/7 support', 'Trusted by 20k+ users'],
};

const DEMO_STORY: StoryData = {
  tag: 'OUR STORY',
  heading: 'Built for the restless',
  description: 'We started VoltCase with a simple belief: your gear should work as hard as you do. In 2020, we set out to create mobile accessories that combine minimalist design with cutting-edge reliability.',
  highlights: ['Wireless Future Lab', 'Recycled materials', 'Engineered in Berlin', '24-month warranty', 'Fast shipping worldwide', 'Carbon-neutral shipping'],
};

const DEMO_REVIEWS: ReviewsData = {
  tag: 'TESTIMONIALS',
  heading: 'Trusted by thousands',
  description: 'Real feedback from customers who made the switch.',
  list: [
    { text: "The best braided cable I've ever owned. Zero tangles, and it charges my laptop too!", author: 'Google User', rating: 5 },
    { text: "Earphones have incredible battery life. The case fits perfectly in my jean pocket.", author: 'Google User', rating: 5 },
    { text: "Finally a power bank that doesn't feel like a brick. Sleek and fast.", author: 'Google User', rating: 5 },
  ],
};

const DEMO_ADDRESS: AddressData = {
  tag: 'VISIT & CONNECT',
  heading: "We're here to help",
  description: 'Questions about compatibility? Need a bulk order? Our team replies within 2 hours.',
  address: '22b Soho Street, London W1D 3QN, United Kingdom',
  phone: '+44 7700 900123',
  email: 'hello@voltcase.com',
  instagram: 'https://instagram.com/voltcase',
};

const DEMO_FOOTER: FooterData = {
  footerText: 'Stay powered, stay seamless',
  copyright: '© 2026 VoltCase — Modern mobile essentials',
  facebook: 'https://facebook.com/voltcase',
  instagram: 'https://instagram.com/voltcase',
  twitter: 'https://twitter.com/voltcase',
};

const DEMO_TIMINGS: TimingsData = {
  mondayOpen: '09:00', mondayClose: '18:00',
  tuesdayOpen: '09:00', tuesdayClose: '18:00',
  wednesdayOpen: '09:00', wednesdayClose: '18:00',
  thursdayOpen: '09:00', thursdayClose: '18:00',
  fridayOpen: '09:00', fridayClose: '18:00',
  saturdayOpen: '10:00', saturdayClose: '17:00',
  sundayOpen: '11:00', sundayClose: '16:00',
};

const DEMO_PRODUCTS: ProductItem[] = [
  { id: 'p1', name: '65W USB-C Charger', price: '£49', description: 'Ultra-compact, charges MacBook, iPad, and phone simultaneously.', image: 'https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?fm=jpg&q=60&w=800&auto=format', tag: 'Bestseller', category: 'chargers' },
  { id: 'p2', name: 'Wireless Headphones', price: '£89', description: '30h battery, IPX5 sweat resistance, spatial audio support.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format', tag: 'New', category: 'audio' },
  { id: 'p3', name: 'MagSafe Clear Case', price: '£35', description: '20% recycled silicone, raised edges, never yellows.', image: 'https://images.unsplash.com/photo-1605000977407-2771f2f8e908?fm=jpg&q=60&w=800&auto=format', tag: '', category: 'cases' },
  { id: 'p4', name: 'Slim 10,000mAh Power Bank', price: '£39', description: 'Built-in USB-C cable, digital display, pass-through charging.', image: 'https://plus.unsplash.com/premium_photo-1671103732255-24d3e813f2dd?fm=jpg&q=60&w=800&auto=format', tag: 'Eco edition', category: 'power' },
  { id: 'p5', name: 'Braided USB-C Cable (2m)', price: '£19', description: 'Nylon braided, 100W fast charge, tangle-free design.', image: 'https://images.unsplash.com/photo-1596570689888-52906bdd68a9?fm=jpg&q=60&w=800&auto=format', tag: '', category: 'chargers' },
  { id: 'p6', name: 'Active Noise Cancelling Headphones', price: '£149', description: 'Adaptive ANC, 40h playback, memory foam ear cups.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format', tag: 'Limited', category: 'audio' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => (
  <div className="group bg-white rounded-md border border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {product.tag && (
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm z-10">
          {product.tag}
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-white text-base">{product.name}</h3>
          <span className="text-white font-bold text-lg">{product.price}</span>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{product.description}</p>
      </div>
    </div>
  </div>
);

// ─── Main template component ──────────────────────────────────────────────────

const MobileAccessoriesStoreTemplate: React.FC<MobileAccessoriesStoreTemplateProps> = (props) => {

  const params = useParams();
  const productId = params.tenantId;
  const data: MobileAccessoriesStoreTemplateData = props.data ?? props;
  const hero: ApiHeroData = data.hero ?? {};
  const story: Partial<StoryData> = data.story ?? {};
  const reviews: ApiReviewsData = data.customerReviews ?? data['customer-reviews'] ?? data.reviews ?? data.testimonials ?? {};
  const address: Partial<AddressData> = data.address ?? {};
  const footer: Partial<FooterData> = data.footer ?? {};
  const timings: Partial<TimingsData> = data.timings ?? {};
  const products = Array.isArray(data.products) ? data.products : DEMO_PRODUCTS;
  const heroHighlights = Array.isArray(hero.highlights) ? hero.highlights : [];
  const storyHighlights = Array.isArray(story.highlights) ? story.highlights : [];
  const reviewList = DEMO_REVIEWS.list;
  console.log(hero.heading)

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  const categoryLabels: Record<string, string> = {
    all: 'All',
    chargers: 'Chargers & Cables',
    audio: 'Headphones & Audio',
    cases: 'Phone Cases',
    power: 'Power Banks',
  };

  const timingRows = [
    { day: 'Monday',    open: timings.mondayOpen    || DEMO_TIMINGS.mondayOpen,    close: timings.mondayClose    || DEMO_TIMINGS.mondayClose },
    { day: 'Tuesday',   open: timings.tuesdayOpen   || DEMO_TIMINGS.tuesdayOpen,   close: timings.tuesdayClose   || DEMO_TIMINGS.tuesdayClose },
    { day: 'Wednesday', open: timings.wednesdayOpen || DEMO_TIMINGS.wednesdayOpen, close: timings.wednesdayClose || DEMO_TIMINGS.wednesdayClose },
    { day: 'Thursday',  open: timings.thursdayOpen  || DEMO_TIMINGS.thursdayOpen,  close: timings.thursdayClose  || DEMO_TIMINGS.thursdayClose },
    { day: 'Friday',    open: timings.fridayOpen    || DEMO_TIMINGS.fridayOpen,    close: timings.fridayClose    || DEMO_TIMINGS.fridayClose },
    { day: 'Saturday',  open: timings.saturdayOpen  || DEMO_TIMINGS.saturdayOpen,  close: timings.saturdayClose  || DEMO_TIMINGS.saturdayClose },
    { day: 'Sunday',    open: timings.sundayOpen    || DEMO_TIMINGS.sundayOpen,    close: timings.sundayClose    || DEMO_TIMINGS.sundayClose },
  ];

  return (
    <div className="min-h-screen bg-white font-['Inter',system-ui,-apple-system,sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 22s linear infinite; display: flex; width: max-content; }
        .marquee-container:hover .animate-marquee { animation-play-state: paused; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-400" />
                <span className="uppercase text-blue-600 text-xs font-semibold tracking-wider">{hero.tag || DEMO_HERO.tag}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
                {hero.heading || DEMO_HERO.heading}
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                {hero.description || DEMO_HERO.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md">
                  Shop now →
                </a>
                <a href="#contact" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-blue-400 hover:text-blue-600 transition">
                  Contact team
                </a>
                {productId && (
                <a href={`/product/${productId}`} className="border-2 border-[#C8502A] text-[#8B3418] px-7 py-3 rounded-lg font-medium hover:bg-[#FDF4EF] transition">
                      Product Page
                    </a>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-md mt-12 pt-4 border-t border-gray-100">
                <div><p className="text-2xl font-bold text-gray-900">{hero['google-rating'] || '4.9★'}</p><p className="text-gray-500 text-xs">Google rating</p></div>
                <div><p className="text-2xl font-bold text-gray-900">{hero['total-customers'] || '20k+'}</p><p className="text-gray-500 text-xs">Happy customers</p></div>
                <div><p className="text-2xl font-bold text-gray-900">{hero['uk-delivery-over-£30'] || 'Free'}</p><p className="text-gray-500 text-xs">UK delivery over £30</p></div>
              </div>
            </div>
            <div className="order-2">
              <div className="rounded-sm relative overflow-hidden shadow-2xl max-h-[550px]">
                <img
                  src='https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format'
                  alt={hero.name || DEMO_HERO.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      {heroHighlights.length > 0 && (
        <div className="w-full bg-gray-50 py-4 overflow-hidden marquee-container border-y border-gray-100">
          <div className="animate-marquee whitespace-nowrap">
            {[...heroHighlights, ...heroHighlights].map((item, idx) => (
              <span key={idx} className="text-gray-600 text-sm mx-6 inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-400 rounded-full" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── PRODUCTS ──────────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="uppercase text-blue-600 text-xs font-semibold tracking-wider">Our top picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Engineered for everyday</h2>
            <p className="text-gray-500">Charging, audio, and protection — all tested to survive real life.</p>
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── STORY + TIMINGS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-blue-400" />
                <span className="uppercase text-blue-600 text-xs font-semibold tracking-wider">{story.tag || DEMO_STORY.tag}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{story.heading || DEMO_STORY.heading}</h2>
              <p className="text-gray-500 leading-relaxed mb-6">{story.description || DEMO_STORY.description}</p>
              <div className="flex flex-wrap gap-2">
                {(storyHighlights.length > 0 ? storyHighlights : DEMO_STORY.highlights).map((item, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="px-5 pt-5 pb-2">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">⏰ Opening hours</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {timingRows.map((row, idx) => (
                    <div key={idx} className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-gray-500">{row.day}</span>
                      <span className="text-gray-800 font-medium">{row.open} – {row.close}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-400" />
                <span className="uppercase text-blue-600 text-xs font-semibold tracking-wider">{reviews.tag || DEMO_REVIEWS.tag}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{reviews.heading || DEMO_REVIEWS.heading}</h2>
              <p className="text-gray-500 max-w-md">{reviews.description || DEMO_REVIEWS.description}</p>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 text-center min-w-[180px]">
              <p className="text-4xl font-bold text-gray-900">{typeof reviews?.list === 'string' ? reviews.list : '4.9'}</p>
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-gray-500 text-xs mt-1">Based on So many reviews</p>
            </div>
          </div>
          {reviewList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewList.map((review, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="text-4xl text-gray-200 font-serif leading-none mb-3">"</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-800">{review.author}</span>
                    <span className="text-amber-400 text-xs">{'★'.repeat(Math.max(1, Math.min(5, Number(review.rating))))}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-10">No reviews added yet.</p>
          )}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-blue-400" />
              <span className="uppercase text-blue-600 text-xs font-semibold tracking-wider">{address.tag || DEMO_ADDRESS.tag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{address.heading || DEMO_ADDRESS.heading}</h2>
            <p className="text-gray-500">{address.description || DEMO_ADDRESS.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">📍 Visit us</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{address.address || DEMO_ADDRESS.address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">📞 Contact</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <a href={`tel:${address.phone || DEMO_ADDRESS.phone}`} className="hover:text-blue-600">{address.phone || DEMO_ADDRESS.phone}</a>
                </p>
                <p className="text-gray-600 text-sm">
                  <a href={`mailto:${address.email || DEMO_ADDRESS.email}`} className="hover:text-blue-600">{address.email || DEMO_ADDRESS.email}</a>
                </p>
              </div>
              {address.instagram && (
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-3">📸 Social</h3>
                  <a href={address.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-blue-600">
                    Instagram
                  </a>
                </div>
              )}
            </div>
            <form
              action={address['form-submit-api'] || undefined}
              method={address['form-submit-api'] ? 'post' : undefined}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-5">Send us a message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-xs font-medium mb-1">Full name</label>
                  <input name="name" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition" />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs font-medium mb-1">Email address</label>
                  <input name="email" type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition" />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs font-medium mb-1">Enquiry type</label>
                  <select name="enquiryType" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-400 outline-none">
                    <option>Product support</option>
                    <option>Wholesale / bulk</option>
                    <option>Order status</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-xs font-medium mb-1">Message</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-400 outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm">
                  Send message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="font-semibold text-xl tracking-tight mb-2">{hero.name || DEMO_HERO.name}</div>
              <p className="text-gray-400 text-sm">{footer.footerText || DEMO_FOOTER.footerText}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Visit</h4>
              <ul className="space-y-2 text-sm">
                {address.address && (
                  <li><a href={`https://maps.google.com/?q=${encodeURIComponent(address.address)}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">{address.address}</a></li>
                )}
                {address.phone && <li><a href={`tel:${address.phone}`} className="text-gray-300 hover:text-white transition">{address.phone}</a></li>}
                {address.email && <li><a href={`mailto:${address.email}`} className="text-gray-300 hover:text-white transition">{address.email}</a></li>}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Follow</h4>
              <ul className="space-y-2 text-sm">
                {footer.instagram && <li><a href={footer.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Instagram</a></li>}
                {footer.twitter   && <li><a href={footer.twitter}   target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">X / Twitter</a></li>}
                {footer.facebook  && <li><a href={footer.facebook}  target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">Facebook</a></li>}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
            {footer.copyright || DEMO_FOOTER.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileAccessoriesStoreTemplate;