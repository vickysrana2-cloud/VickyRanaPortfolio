"use client";

import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaBehance,
  FaDribbble,
} from "react-icons/fa6";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function GraphicDesignerTemplate({
  data,
}: {
  data?: any;
}) {
  console.log("Graphic Designer data:", data);

  const hero = data?.hero || {};
  const about = data?.about || {};
  const skills = data?.skills || {};
  const services = data?.services || {};
  const contact = data?.contact || {};
  const process = data?.process || {};
  const portfolio = data?.portfolio || {};
  const experience = data?.experience || {};
  const testimonials = data?.testimonials || {};

  /* -----------------------------
     HERO
  ----------------------------- */

  const designerName = hero.name || "Alex Morgan";

  const headline =
    hero.headline || "Graphic Designer & Visual Artist";

  const introduction =
    hero.introduction ||
    "I create bold visual identities, meaningful digital experiences and memorable designs for ambitious brands.";

  const profileImage =
    hero.profileImage ||
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80";

  const heroButton =
    hero.ctaButton || "View My Work";

  /* -----------------------------
     ABOUT
  ----------------------------- */

  const aboutTitle =
    about.aboutTitle || "About Me";

  const aboutDescription =
    about.aboutDescription ||
    "I am a passionate graphic designer focused on transforming ideas into visual experiences. My approach combines strategy, creativity and clean visual communication.";

  const aboutExperience =
    about.experience || "5+ Years Experience";

  const aboutLocation =
    about.location || "Mumbai, India";

  const aboutImage =
    about.aboutImage ||
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=80";

  /* -----------------------------
     SERVICES
  ----------------------------- */

  const servicesTitle =
    services.servicesTitle || "Design Services";

  const servicesDescription =
    services.servicesDescription ||
    "Creative design solutions built to help brands communicate clearly and stand out.";

  const serviceList = Array.isArray(services.services)
    ? services.services
    : [
        "Brand Identity",
        "Logo Design",
        "Social Media Design",
        "UI/UX Design",
        "Packaging Design",
        "Marketing Materials",
      ];

  /* -----------------------------
     SKILLS
  ----------------------------- */

  const skillsTitle =
    skills.skillsTitle || "Design Skills";

  const skillList = Array.isArray(skills.skills)
    ? skills.skills
    : [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Figma",
        "Brand Strategy",
        "Typography",
        "Visual Identity",
      ];

  /* -----------------------------
     PROCESS
  ----------------------------- */

  const processTitle =
    process.processTitle || "My Creative Process";

  const processDescription =
    process.processDescription ||
    "A simple and collaborative process that turns ideas into powerful visual solutions.";

  const processSteps = Array.isArray(process.processSteps)
    ? process.processSteps
    : [
        "Discover",
        "Research",
        "Concept",
        "Design",
        "Refine",
        "Deliver",
      ];

  /* -----------------------------
     PORTFOLIO
  ----------------------------- */

  const portfolioTitle =
    portfolio.portfolioTitle || "Selected Works";

  const portfolioDescription =
    portfolio.portfolioDescription ||
    "A selection of creative projects, identities and visual experiences.";

  const portfolioImages = Array.isArray(portfolio.portfolioImages)
    ? portfolio.portfolioImages
    : [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
      ];

  /* -----------------------------
     EXPERIENCE
  ----------------------------- */

  const experienceTitle =
    experience.experienceTitle || "Professional Experience";

  const experienceDescription =
    experience.experienceDescription ||
    "Experience working with brands, businesses and creative teams to deliver impactful design.";

  const companies = Array.isArray(experience.companies)
    ? experience.companies
    : [
        "Creative Studio",
        "Digital Agency",
        "Branding Agency",
      ];

  /* -----------------------------
     TESTIMONIALS
  ----------------------------- */

  const testimonialsTitle =
    testimonials.testimonialsTitle || "What Clients Say";

  const testimonialsDescription =
    testimonials.testimonialsDescription ||
    "A few words from people and brands I've had the opportunity to work with.";

  /* -----------------------------
     CONTACT
  ----------------------------- */

  const contactTitle =
    contact.contactTitle || "Let's Work Together";

  const contactDescription =
    contact.contactDescription ||
    "Have a project in mind? Let's create something meaningful together.";

  const email =
    contact.email || "designer@example.com";

  const phone =
    contact.phone || "+91 98765 43210";

  const website =
    contact.website || "https://example.com";

  const contactButton =
    contact.contactButton || "Get In Touch";

  /* -----------------------------
     HELPERS
  ----------------------------- */

  const validImage = (value: any) => {
    if (typeof value !== "string") return "";
    return value.trim();
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111111] overflow-hidden">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f5]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          <a
            href="#home"
            className="text-xl font-black tracking-tight"
          >
            {designerName}
            <span className="text-[#ff4d00]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-[#ff4d00] transition">
              About
            </a>

            <a href="#services" className="hover:text-[#ff4d00] transition">
              Services
            </a>

            <a href="#work" className="hover:text-[#ff4d00] transition">
              Work
            </a>

            <a href="#process" className="hover:text-[#ff4d00] transition">
              Process
            </a>

            <a href="#contact" className="hover:text-[#ff4d00] transition">
              Contact
            </a>
          </div>

          <a
            href={`mailto:${email}`}
            className="hidden sm:flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#ff4d00] transition"
          >
            Let's Talk
            <ArrowRight size={15} />
          </a>

        </div>
      </nav>

      {/* =========================================
          HERO
      ========================================= */}

      <section
        id="home"
        className="pt-32 lg:pt-40 pb-20 px-6 lg:px-10"
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">

            {/* Left */}

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 text-sm font-medium mb-8">
                <Sparkles size={15} className="text-[#ff4d00]" />
                Available for creative projects
              </div>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-[#ff4d00] mb-5">
                {headline}
              </p>

              <h1 className="text-6xl sm:text-7xl lg:text-[100px] leading-[0.9] font-black tracking-[-0.06em]">
                {designerName}
                <span className="text-[#ff4d00]">.</span>
              </h1>

              <p className="mt-8 text-lg lg:text-xl leading-relaxed text-black/60 max-w-xl">
                {introduction}
              </p>

              <div className="flex flex-wrap gap-4 mt-9">

                <a
                  href="#work"
                  className="inline-flex items-center gap-3 bg-[#ff4d00] text-white px-7 py-4 rounded-full font-semibold hover:bg-black transition"
                >
                  {heroButton}
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-white border border-black/10 px-7 py-4 rounded-full font-semibold hover:border-black transition"
                >
                  Let's Connect
                </a>

              </div>

            </div>

            {/* Right */}

            <div className="relative">

              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full border border-[#ff4d00] hidden lg:block" />

              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#ff4d00] hidden lg:block" />

              <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[4/5]">

                <img
                  src={profileImage}
                  alt={designerName}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-widest font-bold text-black/50">
                    Creative Director
                  </p>

                  <p className="text-xl font-bold mt-1">
                    Visual stories that connect.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          ABOUT
      ========================================= */}

      <section
        id="about"
        className="py-24 lg:py-32 px-6 lg:px-10 bg-black text-white"
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative">

              <div className="absolute -top-5 -left-5 text-[#ff4d00] text-6xl font-black">
                +
              </div>

              <img
                src={aboutImage}
                alt={aboutTitle}
                className="w-full max-w-lg aspect-square object-cover rounded-[2rem]"
              />

            </div>

            <div>

              <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
                About the designer
              </p>

              <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
                {aboutTitle}
                <span className="text-[#ff4d00]">.</span>
              </h2>

              <p className="mt-7 text-lg leading-relaxed text-white/60">
                {aboutDescription}
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">

                <div className="border border-white/15 rounded-2xl p-6">
                  <p className="text-3xl font-black">
                    {aboutExperience}
                  </p>
                  <p className="text-sm text-white/50 mt-2">
                    Professional experience
                  </p>
                </div>

                <div className="border border-white/15 rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#ff4d00]" />
                    <p className="text-lg font-bold">
                      {aboutLocation}
                    </p>
                  </div>

                  <p className="text-sm text-white/50 mt-2">
                    Based & available worldwide
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          SERVICES
      ========================================= */}

      <section
        id="services"
        className="py-24 lg:py-32 px-6 lg:px-10"
      >
        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl">

            <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
              What I do
            </p>

            <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
              {servicesTitle}
              <span className="text-[#ff4d00]">.</span>
            </h2>

            <p className="text-lg text-black/50 mt-6 leading-relaxed">
              {servicesDescription}
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">

            {serviceList.map((service: any, index: number) => (

              <div
                key={index}
                className="group bg-white border border-black/5 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between hover:bg-black hover:text-white transition-all duration-300"
              >

                <div className="flex justify-between items-start">

                  <span className="text-sm text-black/30 group-hover:text-white/40 font-bold">
                    0{index + 1}
                  </span>

                  <ArrowRight
                    size={22}
                    className="text-[#ff4d00] group-hover:translate-x-1 transition"
                  />

                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    {typeof service === "string"
                      ? service
                      : service?.name || service?.title || "Design Service"}
                  </h3>

                  <p className="text-sm text-black/40 group-hover:text-white/50 mt-3">
                    Creative solutions tailored to your brand.
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* =========================================
          PORTFOLIO
      ========================================= */}

      <section
        id="work"
        className="py-24 lg:py-32 px-6 lg:px-10 bg-white"
      >
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>

              <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
                Portfolio
              </p>

              <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
                {portfolioTitle}
                <span className="text-[#ff4d00]">.</span>
              </h2>

            </div>

            <p className="text-black/50 max-w-md leading-relaxed">
              {portfolioDescription}
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">

            {portfolioImages.map((image: any, index: number) => {

              const imageUrl = validImage(image);

              if (!imageUrl) return null;

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl bg-[#f2f2f0] ${
                    index === 0
                      ? "md:row-span-2"
                      : ""
                  }`}
                >

                  <img
                    src={imageUrl}
                    alt={`Portfolio project ${index + 1}`}
                    className={`w-full object-cover group-hover:scale-105 transition duration-700 ${
                      index === 0
                        ? "h-full min-h-[500px]"
                        : "aspect-square"
                    }`}
                  />

                  <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">

                    <div>
                      <p className="font-bold">
                        Creative Project {index + 1}
                      </p>

                      <p className="text-xs text-black/50">
                        Graphic Design
                      </p>
                    </div>

                    <ExternalLink size={18} />

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================
          SKILLS
      ========================================= */}

      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-[#ff4d00] text-white">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16">

            <div>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-white/60">
                Expertise
              </p>

              <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
                {skillsTitle}
                <span className="text-black">.</span>
              </h2>

            </div>

            <div className="grid sm:grid-cols-2 gap-3">

              {skillList.map((skill: any, index: number) => (

                <div
                  key={index}
                  className="border border-white/30 rounded-2xl px-6 py-5 flex items-center justify-between hover:bg-black hover:border-black transition"
                >

                  <span className="font-semibold">
                    {typeof skill === "string"
                      ? skill
                      : skill?.name || skill?.title || "Design Skill"}
                  </span>

                  <span className="text-white/50 text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          PROCESS
      ========================================= */}

      <section
        id="process"
        className="py-24 lg:py-32 px-6 lg:px-10"
      >
        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl">

            <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
              How I work
            </p>

            <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
              {processTitle}
              <span className="text-[#ff4d00]">.</span>
            </h2>

            <p className="text-lg text-black/50 mt-6 leading-relaxed">
              {processDescription}
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">

            {processSteps.map((step: any, index: number) => (

              <div
                key={index}
                className="bg-black text-white rounded-3xl p-8 min-h-[190px] flex flex-col justify-between"
              >

                <span className="text-[#ff4d00] font-black text-3xl">
                  0{index + 1}
                </span>

                <h3 className="text-2xl font-bold">
                  {typeof step === "string"
                    ? step
                    : step?.name || step?.title || "Creative Step"}
                </h3>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* =========================================
          EXPERIENCE
      ========================================= */}

      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-black text-white">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16">

            <div>

              <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
                Experience
              </p>

              <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
                {experienceTitle}
                <span className="text-[#ff4d00]">.</span>
              </h2>

              <p className="text-white/50 text-lg mt-6 leading-relaxed max-w-xl">
                {experienceDescription}
              </p>

            </div>

            <div className="space-y-3">

              {companies.map((company: any, index: number) => (

                <div
                  key={index}
                  className="border-b border-white/15 py-6 flex items-center justify-between group"
                >

                  <div className="flex items-center gap-5">

                    <span className="text-[#ff4d00] font-bold">
                      0{index + 1}
                    </span>

                    <span className="text-xl font-semibold">
                      {typeof company === "string"
                        ? company
                        : company?.name ||
                          company?.title ||
                          "Organization"}
                    </span>

                  </div>

                  <ArrowRight
                    size={20}
                    className="text-white/30 group-hover:text-[#ff4d00] group-hover:translate-x-1 transition"
                  />

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          TESTIMONIALS
      ========================================= */}

      <section className="py-24 lg:py-32 px-6 lg:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-[#ff4d00] uppercase tracking-[0.25em] text-xs font-bold">
              Client feedback
            </p>

            <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] mt-5">
              {testimonialsTitle}
              <span className="text-[#ff4d00]">.</span>
            </h2>

            <p className="text-black/50 mt-6 leading-relaxed">
              {testimonialsDescription}
            </p>

          </div>

          <div className="mt-14 bg-white rounded-[2rem] p-8 lg:p-14 border border-black/5 text-center">

            <div className="text-[#ff4d00] text-5xl font-black">
              “
            </div>

            <p className="text-2xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto mt-5">
              Great design isn't just about looking good.
              It's about making people feel something.
            </p>

            <div className="mt-8">

              <p className="font-bold">
                Happy Client
              </p>

              <p className="text-sm text-black/40 mt-1">
                Creative Project Partner
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          CONTACT
      ========================================= */}

      <section
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-10 bg-[#ff4d00]"
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16 items-end">

            <div>

              <p className="uppercase tracking-[0.25em] text-xs font-bold text-black/50">
                Start a project
              </p>

              <h2 className="text-6xl lg:text-8xl font-black tracking-[-0.06em] mt-5">
                {contactTitle}
                <span className="text-white">.</span>
              </h2>

              <p className="text-lg lg:text-xl mt-7 max-w-xl leading-relaxed">
                {contactDescription}
              </p>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 mt-9 bg-black text-white px-7 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                {contactButton}
                <ArrowRight size={18} />
              </a>

            </div>

            <div className="bg-black text-white rounded-[2rem] p-8 lg:p-10">

              <div className="space-y-6">

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Email
                    </p>

                    <p className="font-semibold group-hover:text-[#ff4d00] transition">
                      {email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Phone
                    </p>

                    <p className="font-semibold group-hover:text-[#ff4d00] transition">
                      {phone}
                    </p>
                  </div>
                </a>

                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ExternalLink size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Website
                    </p>

                    <p className="font-semibold group-hover:text-[#ff4d00] transition break-all">
                      {website.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </a>

              </div>

              <div className="border-t border-white/10 mt-8 pt-7 flex gap-3">

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4d00] transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4d00] transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4d00] transition"
                  aria-label="Behance"
                >
                  <FaBehance />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff4d00] transition"
                  aria-label="Dribbble"
                >
                  <FaDribbble />
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="bg-black text-white px-6 lg:px-10 py-8">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="font-bold">
            {designerName}
            <span className="text-[#ff4d00]">.</span>
          </p>

          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <a
            href="#home"
            className="text-sm font-semibold hover:text-[#ff4d00] transition"
          >
            Back to top ↑
          </a>

        </div>

      </footer>

    </main>
  );
}