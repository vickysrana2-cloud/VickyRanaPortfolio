"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface AutoDetailingData {
   heroSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      primaryButtonText?: string;
      secondaryButtonText?: string;
      image?: string;
      imageLabel?: string;
      stat1Number?: string;
      stat1Label?: string;
      stat2Number?: string;
      stat2Label?: string;
      stat3Number?: string;
      stat3Label?: string;
   };

   aboutSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      image?: string;
      imageLabel?: string;
      stat1Number?: string;
      stat1Label?: string;
      stat2Number?: string;
      stat2Label?: string;
      stat3Number?: string;
      stat3Label?: string;
   };

   servicesSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      services?: {
         id?: string | number;
         title?: string;
         description?: string;
         price?: string;
         image?: string;
      }[];
   };


   whyChooseSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      features?: {
         id?: string | number;
         title?: string;
         description?: string;
      }[];
   };

   processSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      steps?: {
         id?: string | number;
         number?: string;
         title?: string;
         description?: string;
      }[];
   };

   testimonialsSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      testimonials?: {
         id?: string | number;
         name?: string;
         role?: string;
         rating?: number;
         quote?: string;
      }[];
   };

   contactSection?: {
      badge?: string;
      title?: string;
      highlight?: string;
      description?: string;
      phone?: string;
      email?: string;
      address?: string;
      whatsapp?: string;
      buttonText?: string;
   };

   footerSection?: {
      description?: string;
      copyright?: string;
      phone?: string;
      email?: string;
      address?: string;
   };
}



export default function AutoDetailing({
   data,
}: {
   data?: AutoDetailingData;
}) {

   const hero = data?.heroSection || {};

   const heroBadge =
      hero.badge || "Premium Auto Detailing";

   const heroTitle =
      hero.title || "Drive Clean.";

   const heroHighlight =
      hero.highlight || "Drive Luxurious.";

   const heroDescription =
      hero.description ||
      "Precision detailing and premium auto care designed to restore, protect, and elevate the appearance of your vehicle.";

   const heroPrimaryButton =
      hero.primaryButtonText || "Book a Service";

   const heroSecondaryButton =
      hero.secondaryButtonText || "Explore Services";

   const heroImage =
      hero.image ||
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85";

   const heroImageLabel =
      hero.imageLabel || "Premium Vehicle Detailing";

   const stat1Number =
      hero.stat1Number || "10+";

   const stat1Label =
      hero.stat1Label || "Years Experience";

   const stat2Number =
      hero.stat2Number || "2K+";

   const stat2Label =
      hero.stat2Label || "Cars Detailed";

   const stat3Number =
      hero.stat3Number || "5★";

   const stat3Label =
      hero.stat3Label || "Customer Rating";

   // this for about us

   const about = data?.aboutSection || {};

   const aboutBadge =
      about.badge || "About AutoLux";

   const aboutTitle =
      about.title || "More Than a Clean.";

   const aboutHighlight =
      about.highlight || "A Complete Transformation.";

   const aboutDescription =
      about.description ||
      "AutoLux combines advanced detailing techniques, premium products, and meticulous craftsmanship to give every vehicle the finish it deserves.";

   const aboutImage =
      about.image ||
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=85";

   const aboutImageLabel =
      about.imageLabel || "Precision Auto Care";

   const aboutStat1Number =
      about.stat1Number || "10+";

   const aboutStat1Label =
      about.stat1Label || "Years Experience";

   const aboutStat2Number =
      about.stat2Number || "2K+";

   const aboutStat2Label =
      about.stat2Label || "Vehicles Served";

   const aboutStat3Number =
      about.stat3Number || "5★";

   const aboutStat3Label =
      about.stat3Label || "Customer Rating";

   // service section

   const services = data?.servicesSection || {};

   const servicesBadge =
      services.badge || "Our Services";

   const servicesTitle =
      services.title || "Detailing That";

   const servicesHighlight =
      services.highlight || "Makes a Difference.";

   const servicesDescription =
      services.description ||
      "From deep interior care to advanced paint protection, every service is designed to bring out the best in your vehicle.";

   const serviceList =
      services.services || [
         {
            id: 1,
            title: "Exterior Detailing",
            description:
               "Deep exterior cleaning, decontamination and finishing for a spotless appearance.",
            price: "From ₹2,499",
            image:
               "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85",
         },
         {
            id: 2,
            title: "Interior Detailing",
            description:
               "Complete interior cleaning and conditioning for a fresh and refined cabin.",
            price: "From ₹2,999",
            image:
               "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85",
         },
         {
            id: 3,
            title: "Ceramic Coating",
            description:
               "Advanced paint protection with enhanced gloss and long-lasting surface protection.",
            price: "From ₹8,999",
            image:
               "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85",
         },
         {
            id: 4,
            title: "Paint Correction",
            description:
               "Professional removal of swirls, scratches and imperfections for a refined finish.",
            price: "From ₹6,999",
            image:
               "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=85",
         },
         {
            id: 5,
            title: "Engine Bay Detailing",
            description:
               "Careful cleaning and dressing of the engine bay for a clean, finished appearance.",
            price: "From ₹1,999",
            image:
               "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85",
         },
         {
            id: 6,
            title: "Premium Protection",
            description:
               "A complete combination of detailing and protection treatments for your vehicle.",
            price: "From ₹12,999",
            image:
               "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
         },
      ];

   // why choose us section

   const whyChoose = data?.whyChooseSection || {};

   const whyChooseBadge =
      whyChoose.badge || "Why AutoLux";

   const whyChooseTitle =
      whyChoose.title || "The Difference Is";

   const whyChooseHighlight =
      whyChoose.highlight || "In the Details.";

   const whyChooseDescription =
      whyChoose.description ||
      "We combine professional expertise, premium products, and a meticulous process to deliver a finish you can see and feel.";

   const whyChooseFeatures =
      whyChoose.features || [
         {
            id: 1,
            title: "Expert Craftsmanship",
            description:
               "Every vehicle is handled with precision by professionals who care about the smallest details.",
         },
         {
            id: 2,
            title: "Premium Products",
            description:
               "We use carefully selected detailing and protection products for consistent, high-quality results.",
         },
         {
            id: 3,
            title: "Advanced Equipment",
            description:
               "Professional-grade tools and equipment help us achieve a deeper clean and superior finish.",
         },
         {
            id: 4,
            title: "Attention to Detail",
            description:
               "From paintwork to the smallest interior surfaces, nothing gets overlooked.",
         },
      ];

   // process section

   const process = data?.processSection || {};

   const processBadge =
      process.badge || "Our Process";

   const processTitle =
      process.title || "Simple Process.";

   const processHighlight =
      process.highlight || "Exceptional Results.";

   const processDescription =
      process.description ||
      "From the first consultation to the final inspection, every step is handled with care and precision.";

   const processSteps =
      process.steps || [
         {
            id: 1,
            number: "01",
            title: "Book",
            description:
               "Choose your service and schedule a convenient time for your vehicle.",
         },
         {
            id: 2,
            number: "02",
            title: "Inspect",
            description:
               "We carefully inspect your vehicle and understand its specific detailing requirements.",
         },
         {
            id: 3,
            number: "03",
            title: "Detail",
            description:
               "Our specialists perform the selected service using professional products and equipment.",
         },
         {
            id: 4,
            number: "04",
            title: "Deliver",
            description:
               "We complete a final quality inspection before returning your vehicle in its refreshed condition.",
         },
      ];

   // testimonials section

   const testimonials = data?.testimonialsSection || {};

   const testimonialsBadge =
      testimonials.badge || "Customer Reviews";

   const testimonialsTitle =
      testimonials.title || "Trusted by Drivers";

   const testimonialsHighlight =
      testimonials.highlight || "Who Expect More.";

   const testimonialsDescription =
      testimonials.description ||
      "Our clients trust AutoLux to treat their vehicles with the same care and precision they expect from a premium automotive studio.";

   const testimonialList =
      testimonials.testimonials || [
         {
            id: 1,
            name: "Rahul Mehta",
            role: "BMW 5 Series Owner",
            rating: 5,
            quote:
               "The attention to detail was exceptional. My car looked better than it did when I first bought it.",
         },
         {
            id: 2,
            name: "Arjun Kapoor",
            role: "Mercedes-Benz Owner",
            rating: 5,
            quote:
               "Professional service, premium finish and excellent communication throughout the entire process.",
         },
         {
            id: 3,
            name: "Neha Sharma",
            role: "Audi Q5 Owner",
            rating: 5,
            quote:
               "The ceramic coating completely transformed the finish of my car. Highly recommended.",
         },
      ];

   // book a service section

   const contact = data?.contactSection || {};

   const contactBadge =
      contact.badge || "Book Your Service";

   const contactTitle =
      contact.title || "Ready to Give Your Car";

   const contactHighlight =
      contact.highlight || "The AutoLux Treatment?";

   const contactDescription =
      contact.description ||
      "Tell us what your vehicle needs and our team will help you choose the right detailing service.";

   const contactPhone =
      contact.phone || "+91 98765 43210";

   const contactEmail =
      contact.email || "hello@autolux.in";

   const contactAddress =
      contact.address || "Premium Auto Care Studio, Mumbai";

   const contactWhatsapp =
      contact.whatsapp || "+91 98765 43210";

   const contactButton =
      contact.buttonText || "Book a Service";


   // footer section

   const footer = data?.footerSection || {};

   const footerDescription =
      footer.description ||
      "Premium auto detailing and vehicle care delivered with precision, care, and attention to every detail.";

   const footerCopyright =
      footer.copyright ||
      "© 2026 AutoLux. All rights reserved.";

   const footerPhone =
      footer.phone || contactPhone;

   const footerEmail =
      footer.email || contactEmail;

   const footerAddress =
      footer.address || contactAddress;

   const [menuOpen, setMenuOpen] = useState(false);


   return (
      <main className="min-h-screen bg-[#0b0f14] text-white">
         {/* Navbar */}
         <nav className="border-b border-white/10 bg-[#0b0f14]">
            <div className="mx-auto max-w-7xl px-5 sm:px-6">
               <div className="flex h-[72px] items-center justify-between">

                  {/* Logo */}
                  <a
                     href="#home"
                     className="flex items-center gap-2"
                  >
                     {/* Logo Mark */}
                     <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#b8ff1a] text-lg font-black text-black">
                        A
                     </span>

                     {/* Brand Name */}
                     <span className="text-xl font-semibold tracking-wide">
                        Auto<span className="text-[#b8ff1a]">Lux</span>
                     </span>
                  </a>

                  {/* Desktop Navigation */}
                  <div className="hidden items-center gap-8 md:flex">

                     <a
                        href="#home"
                        className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                     >
                        Home
                     </a>

                     <a
                        href="#about"
                        className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                     >
                        About
                     </a>

                     <a
                        href="#services"
                        className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                     >
                        Services
                     </a>

                     <a
                        href="#contact"
                        className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                     >
                        Contact
                     </a>

                     {/* CTA */}
                     <a
                        href="#contact"
                        className="rounded-md bg-[#b8ff1a] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d0ff66]"
                     >
                        Book a Service
                     </a>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     type="button"
                     onClick={() => setMenuOpen(!menuOpen)}
                     className="rounded-md p-2 text-white transition-colors hover:text-[#b8ff1a] md:hidden"
                     aria-label={menuOpen ? "Close menu" : "Open menu"}
                  >
                     {menuOpen ? (
                        <X className="h-6 w-6" />
                     ) : (
                        <Menu className="h-6 w-6" />
                     )}
                  </button>
               </div>

               {/* Mobile Navigation */}
               {menuOpen && (
                  <div className="border-t border-white/10 py-5 md:hidden">
                     <div className="flex flex-col gap-5">

                        <a
                           href="#home"
                           onClick={() => setMenuOpen(false)}
                           className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                        >
                           Home
                        </a>

                        <a
                           href="#about"
                           onClick={() => setMenuOpen(false)}
                           className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                        >
                           About
                        </a>

                        <a
                           href="#services"
                           onClick={() => setMenuOpen(false)}
                           className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                        >
                           Services
                        </a>

                        <a
                           href="#contact"
                           onClick={() => setMenuOpen(false)}
                           className="text-sm font-medium text-white/80 transition-colors hover:text-[#b8ff1a]"
                        >
                           Contact
                        </a>

                        {/* Mobile CTA */}
                        <a
                           href="#contact"
                           onClick={() => setMenuOpen(false)}
                           className="w-fit rounded-md bg-[#b8ff1a] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#d0ff66]"
                        >
                           Book a Service
                        </a>

                     </div>
                  </div>
               )}
            </div>
         </nav>

         {/* ==================== HERO ==================== */}
         <section
            id="home"
            className="relative overflow-hidden bg-[#0b0f14]"
         >
            {/* Background Glow */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#b8ff1a]/5 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 sm:px-6 md:py-10 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-8">

               {/* ==================== HERO CONTENT ==================== */}
               <div className="relative z-10 max-w-2xl">

                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                     <span className="h-2 w-2 rounded-full bg-[#b8ff1a]" />

                     <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                        {heroBadge}
                     </span>
                  </div>

                  {/* Heading */}
                  <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                     {heroTitle}
                     <br />
                     <span className="text-[#b8ff1a]">
                        {heroHighlight}
                     </span>
                  </h1>

                  {/* Description */}
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
                     {heroDescription}
                  </p>

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">

                     <a
                        href="#contact"
                        className="rounded-md bg-[#b8ff1a] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d0ff66]"
                     >
                        {heroPrimaryButton}
                     </a>

                     <a
                        href="#services"
                        className="rounded-md border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                     >
                        {heroSecondaryButton}
                     </a>

                  </div>

                  {/* Stats */}
                  <div className="mt-7 flex flex-wrap gap-8 border-t border-white/10 pt-5">

                     <div>
                        <p className="text-2xl font-bold">
                           {stat1Number}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                           {stat1Label}
                        </p>
                     </div>

                     <div>
                        <p className="text-2xl font-bold">
                           {stat2Number}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                           {stat2Label}
                        </p>
                     </div>

                     <div>
                        <p className="text-2xl font-bold">
                           {stat3Number}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                           {stat3Label}
                        </p>
                     </div>

                  </div>
               </div>

               {/* ==================== HERO IMAGE ==================== */}
               <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]">

                  {/* Image */}
                  <img
                     src={heroImage}
                     alt={heroImageLabel}
                     className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f14] via-transparent to-[#0b0f14]/20" />

                  {/* Image Label */}
                  <div className="absolute bottom-5 left-5 rounded-lg border border-white/10 bg-[#11161d]/90 px-5 py-4 backdrop-blur-md">
                     <p className="text-xs uppercase tracking-widest text-white/40">
                        Featured
                     </p>

                     <p className="mt-1 text-sm font-medium text-white">
                        {heroImageLabel}
                     </p>
                  </div>

                  {/* Floating Experience Card */}
                  <div className="absolute right-5 top-5 rounded-lg border border-white/10 bg-[#11161d]/90 px-5 py-4 backdrop-blur-md">
                     <p className="text-2xl font-bold text-[#b8ff1a]">
                        100%
                     </p>

                     <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                        Attention to Detail
                     </p>
                  </div>

               </div>
            </div>

            {/* ==================== SERVICE STRIP ==================== */}
            <div className="relative z-10 mx-auto max-w-7xl px-5 pb-6 sm:px-6 lg:px-10">

               <div className="grid overflow-hidden rounded-lg border border-white/10 bg-[#11161d]/90 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">

                  <div className="border-b border-white/10 p-4 sm:border-r">
                     <p className="text-sm font-semibold">
                        Exterior Detailing
                     </p>

                     <p className="mt-1 text-xs text-white/40">
                        Deep clean & restoration
                     </p>
                  </div>

                  <div className="border-b border-white/10 p-4 lg:border-r">
                     <p className="text-sm font-semibold">
                        Interior Care
                     </p>

                     <p className="mt-1 text-xs text-white/40">
                        Deep cleaning & protection
                     </p>
                  </div>

                  <div className="border-b border-white/10 p-4 sm:border-r lg:border-b-0">
                     <p className="text-sm font-semibold">
                        Ceramic Coating
                     </p>

                     <p className="mt-1 text-xs text-white/40">
                        Long-lasting paint protection
                     </p>
                  </div>

                  <div className="p-4">
                     <p className="text-sm font-semibold">
                        Paint Correction
                     </p>

                     <p className="mt-1 text-xs text-white/40">
                        Restore showroom finish
                     </p>
                  </div>

               </div>
            </div>
         </section>

         {/* ==================== ABOUT ==================== */}
         <section
            id="about"
            className="relative overflow-hidden border-t border-white/10 bg-[#0b0f14] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">

                  {/* Image */}
                  <div className="relative">

                     <div className="relative overflow-hidden rounded-xl border border-white/10">
                        <img
                           src={aboutImage}
                           alt={aboutImageLabel}
                           className="h-[340px] w-full object-cover sm:h-[400px]"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/80 via-transparent to-transparent" />

                        {/* Image Label */}
                        <div className="absolute bottom-5 left-5">
                           <p className="text-xs uppercase tracking-[0.2em] text-[#b8ff1a]">
                              {aboutImageLabel}
                           </p>
                        </div>
                     </div>

                     {/* Floating Stat */}
                     <div className="absolute -bottom-6 right-5 rounded-xl border border-white/10 bg-[#11161d] px-6 py-5 shadow-2xl sm:right-8">
                        <p className="text-3xl font-bold text-[#b8ff1a]">
                           {aboutStat1Number}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                           {aboutStat1Label}
                        </p>
                     </div>

                  </div>

                  {/* Content */}
                  <div>

                     {/* Badge */}
                     <div className="mb-5 inline-flex items-center gap-2">
                        <span className="h-px w-8 bg-[#b8ff1a]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                           {aboutBadge}
                        </span>
                     </div>

                     {/* Heading */}
                     <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {aboutTitle}
                        <br />
                        <span className="text-[#b8ff1a]">
                           {aboutHighlight}
                        </span>
                     </h2>

                     {/* Description */}
                     <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
                        {aboutDescription}
                     </p>

                     {/* Stats */}
                     <div className="mt-7 grid grid-cols-3 border-y border-white/10">

                        <div className="py-4">
                           <p className="text-2xl font-bold sm:text-3xl">
                              {aboutStat1Number}
                           </p>

                           <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
                              {aboutStat1Label}
                           </p>
                        </div>

                        <div className="border-l border-white/10 py-4 pl-4 sm:pl-6">
                           <p className="text-2xl font-bold sm:text-3xl">
                              {aboutStat2Number}
                           </p>

                           <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
                              {aboutStat2Label}
                           </p>
                        </div>

                        <div className="border-l border-white/10 py-4 pl-4 sm:pl-6">
                           <p className="text-2xl font-bold sm:text-3xl">
                              {aboutStat3Number}
                           </p>

                           <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
                              {aboutStat3Label}
                           </p>
                        </div>

                     </div>

                     {/* Bottom Statement */}
                     <div className="mt-8 border-l-2 border-[#b8ff1a] pl-5">
                        <p className="text-sm leading-6 text-white/70">
                           Every detail matters. Every vehicle gets the same level of
                           precision, care, and attention.
                        </p>
                     </div>

                  </div>
               </div>
            </div>
         </section>


         {/* ==================== SERVICES ==================== */}
         <section
            id="services"
            className="border-t border-white/10 bg-[#0b0f14] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               {/* Section Header */}
               <div className="max-w-2xl">

                  <div className="mb-5 inline-flex items-center gap-2">
                     <span className="h-px w-8 bg-[#b8ff1a]" />

                     <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                        {servicesBadge}
                     </span>
                  </div>

                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                     {servicesTitle}
                     <br />
                     <span className="text-[#b8ff1a]">
                        {servicesHighlight}
                     </span>
                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/60 sm:text-lg">
                     {servicesDescription}
                  </p>
               </div>

               {/* Service Cards */}
               <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {serviceList.map((service, index) => (
                     <article
                        key={service.id}
                        className="group overflow-hidden rounded-xl border border-white/10 bg-[#11161d] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8ff1a]/40"
                     >

                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                           <img
                              src={service.image}
                              alt={service.title || "Auto detailing service"}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                           />

                           <div className="absolute inset-0 bg-gradient-to-t from-[#11161d] via-transparent to-transparent" />

                           {/* Service Number */}
                           <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0b0f14]/80 text-xs font-semibold backdrop-blur-sm">
                              {String(index + 1).padStart(2, "0")}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">

                           <div className="flex items-start justify-between gap-4">
                              <h3 className="text-xl font-semibold">
                                 {service.title}
                              </h3>

                              <span className="shrink-0 text-xs font-medium text-[#b8ff1a]">
                                 {service.price}
                              </span>
                           </div>

                           <p className="mt-2 text-sm leading-6 text-white/50">
                              {service.description}
                           </p>

                           <a
                              href="#contact"
                              className="mt-4 inline-flex items-center text-sm font-medium text-white transition-colors hover:text-[#b8ff1a]"
                           >
                              Book this service
                              <span className="ml-2 transition-transform group-hover:translate-x-1">
                                 →
                              </span>
                           </a>

                        </div>
                     </article>
                  ))}

               </div>
            </div>
         </section>


         {/* ==================== WHY CHOOSE AUTO LUX ==================== */}
         <section
            id="why-choose"
            className="border-t border-white/10 bg-[#11161d] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">

                  {/* Left Content */}
                  <div>

                     <div className="mb-5 inline-flex items-center gap-2">
                        <span className="h-px w-8 bg-[#b8ff1a]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                           {whyChooseBadge}
                        </span>
                     </div>

                     <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {whyChooseTitle}
                        <br />
                        <span className="text-[#b8ff1a]">
                           {whyChooseHighlight}
                        </span>
                     </h2>

                     <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
                        {whyChooseDescription}
                     </p>

                  </div>

                  {/* Features */}
                  <div className="grid gap-4 sm:grid-cols-2">

                     {whyChooseFeatures.map((feature, index) => (
                        <div
                           key={feature.id}
                           className="group rounded-xl border border-white/10 bg-[#0b0f14] p-5 transition-all duration-300 hover:border-[#b8ff1a]/40"
                        >

                           {/* Number */}
                           <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-[#b8ff1a]">
                                 {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="text-white/20 transition-colors group-hover:text-[#b8ff1a]/50">
                                 +
                              </span>
                           </div>

                           <h3 className="mt-5 text-lg font-semibold">
                              {feature.title}
                           </h3>

                           <p className="mt-3 text-sm leading-6 text-white/50">
                              {feature.description}
                           </p>

                        </div>
                     ))}

                  </div>

               </div>
            </div>
         </section>

         {/* ==================== PROCESS ==================== */}
         <section
            id="process"
            className="border-t border-white/10 bg-[#0b0f14] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               {/* Header */}
               <div className="mx-auto max-w-2xl text-center">

                  <div className="mb-5 inline-flex items-center gap-2">
                     <span className="h-px w-8 bg-[#b8ff1a]" />

                     <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                        {processBadge}
                     </span>

                     <span className="h-px w-8 bg-[#b8ff1a]" />
                  </div>

                  <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                     {processTitle}
                     <br />
                     <span className="text-[#b8ff1a]">
                        {processHighlight}
                     </span>
                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/60 sm:text-lg">
                     {processDescription}
                  </p>

               </div>

               {/* Process Steps */}
               <div className="relative mt-9">

                  {/* Connecting Line - Desktop */}
                  <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-white/10 lg:block" />

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                     {processSteps.map((step, index) => (
                        <div
                           key={step.id}
                           className="relative rounded-xl border border-white/10 bg-[#11161d] p-5 transition-all duration-300 hover:border-[#b8ff1a]/40"
                        >

                           {/* Number */}
                           <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#b8ff1a]/40 bg-[#0b0f14] text-lg font-bold text-[#b8ff1a]">
                              {step.number || String(index + 1).padStart(2, "0")}
                           </div>

                           {/* Content */}
                           <h3 className="mt-5 text-xl font-semibold">
                              {step.title}
                           </h3>

                           <p className="mt-3 text-sm leading-6 text-white/50">
                              {step.description}
                           </p>

                        </div>
                     ))}

                  </div>
               </div>
            </div>
         </section>

         {/* ==================== TESTIMONIALS ==================== */}
         <section
            id="reviews"
            className="border-t border-white/10 bg-[#11161d] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               {/* Header */}
               <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                  <div className="max-w-2xl">

                     <div className="mb-5 inline-flex items-center gap-2">
                        <span className="h-px w-8 bg-[#b8ff1a]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                           {testimonialsBadge}
                        </span>
                     </div>

                     <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {testimonialsTitle}
                        <br />
                        <span className="text-[#b8ff1a]">
                           {testimonialsHighlight}
                        </span>
                     </h2>

                  </div>

                  <p className="max-w-md text-sm leading-6 text-white/50">
                     {testimonialsDescription}
                  </p>

               </div>

               {/* Reviews */}
               <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {testimonialList.map((testimonial) => (
                     <article
                        key={testimonial.id}
                        className="rounded-xl border border-white/10 bg-[#0b0f14] p-5 transition-all duration-300 hover:border-[#b8ff1a]/40"
                     >

                        {/* Rating */}
                        <div className="flex gap-1">
                           {Array.from({
                              length: testimonial.rating || 5,
                           }).map((_, index) => (
                              <span
                                 key={index}
                                 className="text-sm text-[#b8ff1a]"
                              >
                                 ★
                              </span>
                           ))}
                        </div>

                        {/* Quote */}
                        <p className="mt-4 text-sm leading-7 text-white/70">
                           &quot;{testimonial.quote}&quot;
                        </p>

                        {/* Customer */}
                        <div className="mt-6 border-t border-white/10 pt-4">
                           <p className="font-semibold">
                              {testimonial.name}
                           </p>

                           <p className="mt-1 text-xs text-white/40">
                              {testimonial.role}
                           </p>
                        </div>

                     </article>
                  ))}

               </div>
            </div>
         </section>

         {/* ==================== CONTACT / BOOKING ==================== */}
         <section
            id="contact"
            className="border-t border-white/10 bg-[#0b0f14] py-12 sm:py-16 lg:py-20"
         >
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

               <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11161d]">

                  <div className="grid lg:grid-cols-2">

                     {/* Left Content */}
                     <div className="p-6 sm:p-8 lg:p-10">

                        <div className="mb-5 inline-flex items-center gap-2">
                           <span className="h-px w-8 bg-[#b8ff1a]" />

                           <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8ff1a]">
                              {contactBadge}
                           </span>
                        </div>

                        <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                           {contactTitle}
                           <br />
                           <span className="text-[#b8ff1a]">
                              {contactHighlight}
                           </span>
                        </h2>

                        <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
                           {contactDescription}
                        </p>

                        {/* CTA */}
                        <a
                           href={`https://wa.me/${contactWhatsapp.replace(/\D/g, "")}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="mt-8 inline-flex rounded-md bg-[#b8ff1a] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d0ff66]"
                        >
                           {contactButton}
                        </a>

                     </div>

                     {/* Right Contact Information */}
                     <div className="border-t border-white/10 bg-[#0d1218] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">

                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                           Get in Touch
                        </p>

                        <div className="mt-6 space-y-5">

                           {/* Phone */}
                           <div>
                              <p className="text-xs uppercase tracking-wider text-white/30">
                                 Phone
                              </p>

                              <a
                                 href={`tel:${contactPhone}`}
                                 className="mt-2 block text-base font-medium text-white transition-colors hover:text-[#b8ff1a]"
                              >
                                 {contactPhone}
                              </a>
                           </div>

                           {/* Email */}
                           <div>
                              <p className="text-xs uppercase tracking-wider text-white/30">
                                 Email
                              </p>

                              <a
                                 href={`mailto:${contactEmail}`}
                                 className="mt-2 block text-base font-medium text-white transition-colors hover:text-[#b8ff1a]"
                              >
                                 {contactEmail}
                              </a>
                           </div>

                           {/* Address */}
                           <div>
                              <p className="text-xs uppercase tracking-wider text-white/30">
                                 Studio
                              </p>

                              <p className="mt-2 text-base font-medium text-white">
                                 {contactAddress}
                              </p>
                           </div>

                        </div>

                        {/* Availability */}
                        <div className="mt-7 border-t border-white/10 pt-5">
                           <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#b8ff1a]" />

                              <span className="text-sm text-white/60">
                                 Accepting service bookings
                              </span>
                           </div>
                        </div>

                     </div>

                  </div>
               </div>

            </div>
         </section>

         {/* ==================== FOOTER ==================== */}
         <footer className="border-t border-white/10 bg-[#080c10]">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10">

               <div className="grid gap-8 md:grid-cols-3">

                  {/* Brand */}
                  <div>
                     <a
                        href="#home"
                        className="inline-flex items-center gap-2"
                     >
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#b8ff1a] text-lg font-black text-black">
                           A
                        </span>

                        <span className="text-xl font-semibold tracking-wide">
                           Auto<span className="text-[#b8ff1a]">Lux</span>
                        </span>
                     </a>

                     <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
                        {footerDescription}
                     </p>
                  </div>

                  {/* Navigation */}
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                        Navigation
                     </p>

                     <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                        <a
                           href="#home"
                           className="text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           Home
                        </a>

                        <a
                           href="#about"
                           className="text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           About
                        </a>

                        <a
                           href="#services"
                           className="text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           Services
                        </a>

                        <a
                           href="#reviews"
                           className="text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           Reviews
                        </a>

                        <a
                           href="#contact"
                           className="text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           Contact
                        </a>
                     </div>
                  </div>

                  {/* Contact */}
                  <div>
                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                        Contact
                     </p>

                     <div className="mt-5 space-y-3 text-sm">

                        <a
                           href={`tel:${footerPhone}`}
                           className="block text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           {footerPhone}
                        </a>

                        <a
                           href={`mailto:${footerEmail}`}
                           className="block text-white/60 transition-colors hover:text-[#b8ff1a]"
                        >
                           {footerEmail}
                        </a>

                        <p className="text-white/40">
                           {footerAddress}
                        </p>

                     </div>
                  </div>

               </div>

               {/* Bottom Bar */}
               <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs text-white/30">
                     {footerCopyright}
                  </p>

                  <a
                     href="#contact"
                     className="text-xs font-medium text-[#b8ff1a] transition-colors hover:text-[#d0ff66]"
                  >
                     Book a Service →
                  </a>

               </div>

            </div>
         </footer>

      </main>
   );
}