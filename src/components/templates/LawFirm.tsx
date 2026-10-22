"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, Scale, ShieldAlert, FileCheck, Landmark, Gavel, 
  MenuSquare, Star, Quote, ChevronRight, Clock, MessageSquare, ExternalLink
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

// WhatsApp link helper (number se non-digits hata deta hai)
const waLink = (number: string, msg: string) =>
  `https://wa.me/${String(number).replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

interface LawFirmTemplateProps {
  data?: {
    basicInfo?: { name?: string; tagline?: string; email?: string; hotline?: string; address?: string; };
    heroSection?: { badge?: string; headingBold?: string; headingGold?: string; description?: string; bgImage?: string; };
    services?: { departments?: Array<{ title: string; description: string; image: string; points?: Array<{ point: string }>; }>; };
    counsel?: { attorneys?: Array<{ fullName: string; specialty: string; }>; };
    testimonials?: { testimonials?: Array<{ name: string; role: string; text: string; rating: string | number; image: string; }>; };
    timings?: { monFri?: string; saturday?: string; sunday?: string; };
    socials?: { facebook?: string; instagram?: string; twitter?: string; linkedin?: string; whatsappNumber?: string; };
  };
}

export default function LawFirmTemplate({ data }: LawFirmTemplateProps) {
  const basic = data?.basicInfo || {};
  const hero = data?.heroSection || {};
  const timings = data?.timings || {};
  const social = data?.socials || {};

  const firmName = basic.name || "Aurelia Law";
  const firmEmail = basic.email || "intake@aurelialaw.com";
  const firmTagline = basic.tagline || "Elite corporate litigation and legal advisory services powered by courtroom success.";
  const firmHotline = basic.hotline || "+91 00000 00000";
  const firmAddress = basic.address || "Suite 4800, Legal District Tower, Financial Avenue.";
  const monFriTime = timings.monFri || "Mon - Fri: 9:00 AM - 6:00 PM";
  
  const whatsappIntakeNumber = social.whatsappNumber || "8237024546";

  const fbLink = social.facebook || "https://facebook.com";
  const igLink = social.instagram || "https://instagram.com";
  const twLink = social.twitter || "https://twitter.com";
  const liLink = social.linkedin || "https://linkedin.com";

  // Enriched with high-end editorial litigation imagery
  const dynamicPracticeAreas = data?.services?.departments || [
    { title: "Corporate Litigation", description: "High-stakes commercial representation, asset recovery operations, breach of contract management, and rigorous corporate defense parameters.", points: [{ point: "M&A Dispute Advocacy" }, { point: "Antitrust & Competition Defense" }], image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop" },
    { title: "Financial & Banking Law", description: "Strategic counsel navigating multi-jurisdictional regulatory systems, complex corporate restructuring workflows, and institutional transaction audits.", points: [{ point: "Regulatory Compliance Checks" }, { point: "Cross-Border Securities Tracking" }], image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop" },
    { title: "Appellate Advocacy", description: "Defending trial outcomes and challenging errors before supreme appellate courts. Specializing in high-value petition mandates.", points: [{ point: "Brief Preparation Matrix" }, { point: "Oral Argument Simulations" }], image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop" },
    { title: "Intellectual Property Guard", description: "Comprehensive protection of proprietary corporate tech frameworks, complex international patent dockets, and global trademark portfolios.", points: [{ point: "Infringement Risk Analysis" }, { point: "Trade Secret Shielding" }], image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop" }
  ];

  const dynamicPartners = data?.counsel?.attorneys || [
    { fullName: "Charles W. Attorna, Esq.", specialty: "Senior Managing Partner" },
    { fullName: "Hon. Victoria Vance", specialty: "Senior Counsel, Appellate Chair" }
  ];

  const dynamicCaseLogs = data?.testimonials?.testimonials || [
    { name: "Marcus Vance", role: "CEO, Vanguard Logistics", text: "Their aggressive courtroom litigation defense parameters secured a complete dismissal of our international patent dispute.", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" },
    { name: "Helena Rostova", role: "General Counsel, Orbit Tech", text: "Attorna provides exceptional cross-border advisory. Their multi-jurisdictional compliance framework is second to none.", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" },
    { name: "Arthur Pendelton", role: "Managing Director, Apex Capital", text: "Uncompromising precision during our late-stage M&A restructuring. Absolute masters of corporate strategy.", rating: 5, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-amber-500 selection:text-neutral-950 font-serif">
      
      <NavbarComponent
        firmName={firmName}
        firmHotline={firmHotline}
        monFriTime={monFriTime}
        whatsappNumber={whatsappIntakeNumber}
      />
      
      <div className="pt-14 md:pt-24">
        
        {/* HERO */}
        <HeroComponent hero={hero} whatsappNumber={whatsappIntakeNumber} />

        {/* PRACTICE AREAS ASYMMETRIC GRID */}
        <AsymmetricPracticeAreas practiceAreas={dynamicPracticeAreas} whatsappNumber={whatsappIntakeNumber} />

        {/* SECURE INTAKE HUB CARD */}
        <SecureIntakeHub 
          whatsappIntakeNumber={whatsappIntakeNumber} 
          firmEmail={firmEmail} 
          firmHotline={firmHotline}
          fbLink={fbLink}
          igLink={igLink}
          twLink={twLink}
          liLink={liLink}
          partners={dynamicPartners}
        />

        {/* CASE SUCCESS LOGS */}
        <CaseReviewsComponent logs={dynamicCaseLogs} />

        {/* FOOTER */}
        <FooterComponent
          firmName={firmName}
          firmTagline={firmTagline}
          firmHotline={firmHotline}
          firmEmail={firmEmail}
          firmAddress={firmAddress}
          timings={timings}
          social={social}
          whatsappNumber={whatsappIntakeNumber}
        />
      </div>

      <WhatsAppStickyComponent whatsappIntakeNumber={whatsappIntakeNumber} />
    </div>
  );
}

// ==========================================
// 1. NAVBAR SUB-COMPONENT
// ==========================================
function NavbarComponent({
  firmName,
  firmHotline,
  monFriTime,
  whatsappNumber,
}: {
  firmName: string;
  firmHotline: string;
  monFriTime: string;
  whatsappNumber: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navWaUrl = waLink(whatsappNumber, "Hello, I'd like to book a legal consultation.");

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top utility contact bar */}
      <div className="hidden md:flex w-full bg-neutral-950 text-neutral-500 text-[10px] font-sans uppercase tracking-widest py-3 px-8 lg:px-16 justify-between items-center border-b border-neutral-900">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Clock size={12} className="text-amber-500" /> Chambers: {monFriTime}</span>
          <span className="flex items-center gap-2"><Scale size={12} className="text-amber-500" /> Executive Intake Grid</span>
        </div>
        <div className="tracking-widest">Urgent Advisory: <span className="text-amber-500 font-bold">{firmHotline}</span></div>
      </div>

      {/* Main Navigation Row */}
      <nav className={`w-full transition-all duration-300 border-b ${isScrolled ? 'bg-neutral-950/95 backdrop-blur-md shadow-lg border-neutral-900 py-4' : 'bg-neutral-950/20 py-6 border-neutral-900/40'} px-8 lg:px-16 flex justify-between items-center`}>
        <Link href="#" className="flex items-center gap-2 text-white font-bold text-lg tracking-wider uppercase font-sans">
          <Landmark size={20} className="text-amber-500" />
          <span>{firmName}<span className="text-amber-500">.</span></span>
        </Link>

        {/* Desktop Menu Link Matrix */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-sans uppercase tracking-widest text-neutral-400">
          <a href="#" className="hover:text-amber-500 transition-colors">Overview</a>
          <a href="#practices" className="hover:text-amber-500 transition-colors">Practice Fields</a>
          <a href="#connect" className="hover:text-amber-500 transition-colors">Connect Desk</a>
          <a href="#records" className="hover:text-amber-500 transition-colors">Success Logs</a>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href="#connect" className="border-b border-amber-500 text-amber-500 hover:text-white font-sans uppercase tracking-widest text-[11px] py-1 transition-all duration-300">
            Secure Intake Channels →
          </a>
          <a
            href={navWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white font-sans uppercase tracking-widest text-[10px] px-4 py-2 transition-colors"
          >
            <FaWhatsapp size={14} /> WhatsApp
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neutral-400 hover:text-amber-500">
          {isOpen ? <X size={22} /> : <MenuSquare size={22} />}
        </button>
      </nav>

      {/* Mobile Sidebar Navigation */}
      {isOpen && (
        <div className="md:hidden w-full bg-neutral-950 border-b border-neutral-900 px-6 py-6 flex flex-col space-y-4 font-sans uppercase tracking-widest text-xs">
          <a href="#" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500">Overview</a>
          <a href="#practices" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500">Practice Fields</a>
          <a href="#connect" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500">Connect Desk</a>
          <a href="#records" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500">Success Logs</a>
          <a
            href={navWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-[#25D366]"
          >
            <FaWhatsapp size={16} /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. HERO SUB-COMPONENT
// ==========================================
function HeroComponent({ hero, whatsappNumber }: { hero: any; whatsappNumber: string }) {
  const headingBold = hero.headingBold || "Defending Your Rights,";
  const headingGold = hero.headingGold || "Securing Your Legacy.";
  const description = hero.description || "We provide uncompromising legal defense, high-stakes commercial representation, and meticulous multi-jurisdictional advisory for corporate entities and private estates.";
  // Luxury law scales hero architecture visual
  const bgImg = hero.bgImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  const heroWaUrl = waLink(whatsappNumber, "Hello, I need legal advice.");

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center px-8 lg:px-16 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 w-full h-full">
        <img src={bgImg} alt="Chambers Office Grid" className="w-full h-full object-cover opacity-15 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative py-12">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-none">
            {headingBold} <br />
            <span className="text-amber-500 italic font-normal">{headingGold}</span>
          </h1>
          <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-xl leading-relaxed">
            {description}
          </p>

          {/* Mobile-friendly WhatsApp CTA (desktop pe side card mein bhi hai) */}
          <a
            href={heroWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white text-[11px] font-sans font-bold uppercase tracking-widest px-6 py-3 transition-colors"
          >
            <FaWhatsapp size={16} /> Chat on WhatsApp
          </a>

          <div className="flex flex-wrap gap-6 pt-4 font-sans text-[11px] tracking-widest uppercase text-neutral-400">
            <span className="flex items-center gap-2"><Gavel size={14} className="text-amber-500" /> Appellate Advocacy</span>
            <span className="flex items-center gap-2"><ShieldAlert size={14} className="text-amber-500" /> Asset Shell Protection</span>
            <span className="flex items-center gap-2"><FileCheck size={14} className="text-amber-500" /> Regulatory Alignment</span>
          </div>
        </div>
        
        <div className="hidden lg:block lg:col-span-4 border border-neutral-900 p-8 bg-neutral-900/10 backdrop-blur-sm space-y-4">
          <h3 className="text-sm font-sans uppercase tracking-widest text-white border-b border-neutral-800 pb-2">Chambers Entry</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">Counsel consultation gates are accessible via automated deep link frameworks routing instantly into counsel platforms.</p>
          <a href="#connect" className="block text-center bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[10px] font-sans font-bold uppercase tracking-widest py-3 transition-colors">Access Connect Desk</a>
          <a
            href={heroWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-[#128C7E] text-[#25D366] hover:bg-[#128C7E] hover:text-white text-[10px] font-sans font-bold uppercase tracking-widest py-3 transition-colors"
          >
            <FaWhatsapp size={14} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. PRACTICE AREAS ASYMMETRIC GRID
// ==========================================
function AsymmetricPracticeAreas({ practiceAreas, whatsappNumber }: { practiceAreas: any[]; whatsappNumber: string }) {
  return (
    <section id="practices" className="w-full py-20 md:py-32 px-8 lg:px-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">Our Framework Matrix</h2>
          </div>
          <p className="text-neutral-500 font-sans text-xs max-w-sm leading-relaxed">Rigorous advocacy protocols engineered to manage high-stakes disputes and cross-border commercial litigation channels.</p>
        </div>

        {/* Dynamic Multi-Column Practice Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceAreas.map((item, idx) => (
            <div key={idx} className="border border-neutral-900 bg-neutral-900/10 hover:bg-neutral-900/30 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300 overflow-hidden min-h-[460px]">
              
              {/* Card Header Media Holder */}
              <div className="w-full h-44 border-b border-neutral-900 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60" />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-900/60 pb-3">
                    <h3 className="text-xl text-white font-normal group-hover:text-amber-500 transition-colors">{item.title}</h3>
                    <span className="text-xs text-neutral-600 font-sans">0{idx + 1}</span>
                  </div>
                  <p className="text-neutral-400 font-sans text-xs leading-relaxed">{item.description}</p>
                </div>
                
                <div className="pt-6 border-t border-neutral-900/40 mt-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-[11px] text-neutral-300">
                    {item.points?.map((p: any, i: number) => (
                      <li key={i} className="flex items-center gap-1.5 opacity-80">
                        <span className="w-1 h-1 bg-amber-500 rounded-none shrink-0" />
                        <span>{p.point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(whatsappNumber, `Hello, I'd like to discuss ${item.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-[#25D366] hover:text-white transition-colors"
                  >
                    <FaWhatsapp size={14} /> Enquire on WhatsApp
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SECURE INTAKE HUB
// ==========================================
function SecureIntakeHub({ whatsappIntakeNumber, firmEmail, firmHotline, fbLink, igLink, twLink, liLink }: any) {
  const whatsappUrl = waLink(whatsappIntakeNumber, "Aurelia Law Advisory Request // Initial conflict clearance inquiry.");

  return (
    <section id="connect" className="w-full py-20 md:py-32 px-8 lg:px-16 bg-neutral-900/20 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">Connect with Us On Social Platforms & WhatsApp</h2>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              Chambers are optimized for instant legal data routing. To maintain elite confidentiality and prioritize immediate intake verification metrics, we have removed traditional static tracking forms. 
            </p>
            <p className="text-neutral-500 font-sans text-xs leading-relaxed italic">
              Please initialize conflict clear evaluation cycles instantly by connecting through our official verified communication channels.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
            {/* WHATSAPP PORTAL LINK CARD */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-neutral-900/60 border border-neutral-800 p-8 hover:border-[#128C7E] transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 bg-[#128C7E]/10 text-[#25D366] flex items-center justify-center mb-4 border border-[#128C7E]/20">
                  <FaWhatsapp size={20} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">WhatsApp Intake Desk</h4>
                <p className="text-neutral-400 text-xs normal-case tracking-normal leading-relaxed">Instant file encryption routing. Launch legal brief statements directly to counsel handlers.</p>
              </div>
              <span className="text-amber-500 text-[11px] uppercase tracking-widest font-bold inline-flex items-center gap-1.5 pt-4">Initialize Chat <ExternalLink size={12} /></span>
            </a>

            {/* INSTITUTIONAL LINK MATRIX */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                  <MessageSquare size={18} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Corporate Networks</h4>
                <p className="text-neutral-400 text-xs normal-case tracking-normal leading-relaxed">Contact us on social media platforms for institutional updates, event dockets, and corporate mail tracking logs.</p>
              </div>
              
              <div className="flex items-center gap-3 pt-4 text-neutral-400">
                <a href={fbLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors" title="Facebook"><FaFacebookF size={12} /></a>
                <a href={igLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors" title="Instagram"><FaInstagram size={12} /></a>
                <a href={twLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors" title="Twitter"><FaTwitter size={12} /></a>
                <a href={liLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors" title="LinkedIn"><FaLinkedinIn size={12} /></a>
              </div>
            </div>

            {/* DIRECT DESK CHANNELS FOOTNOTE */}
            <div className="sm:col-span-2 border-t border-neutral-900 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-neutral-500 uppercase tracking-widest">
              <div>Desk Phone: <span className="text-neutral-300 font-bold">{firmHotline}</span></div>
              <div>Secure Registry Mail: <span className="text-neutral-300 font-bold lowercase">{firmEmail}</span></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. SUCCESS RECORDS / TESTIMONIALS
// ==========================================
function CaseReviewsComponent({ logs }: { logs: any[] }) {
  return (
    <section id="records" className="w-full py-20 md:py-32 px-8 lg:px-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <p className="text-3xl md:text-4xl font-light text-white tracking-tight">Institutional Trust Profiles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {logs.map((item, index) => (
            <div key={index} className="bg-neutral-900/20 border border-neutral-900 p-8 flex flex-col justify-between relative hover:border-neutral-800 transition-all rounded-none">
              <Quote className="absolute top-6 right-6 text-neutral-900 h-10 w-12 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(typeof item.rating === "number" ? item.rating : 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-neutral-300 text-xs md:text-sm leading-relaxed italic font-light">"{item.text}"</p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-neutral-900 font-sans relative z-10">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover border border-neutral-800 grayscale rounded-none" />
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase">{item.name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. FOOTER SUB-COMPONENT
// ==========================================
function FooterComponent({ firmName, firmTagline, firmHotline, firmEmail, firmAddress, timings, social, whatsappNumber }: any) {
  const monFriTime = timings.monFri || "Mon - Fri: 9:00 AM - 6:00 PM";
  const satTime = timings.saturday || "Saturday: By Consultation Only";
  const sunTime = timings.sunday || "Sunday: 24/7 Litigation Emergency Line";

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 pt-20 pb-8 px-8 lg:px-16 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wider uppercase font-sans">
              <Landmark size={18} className="text-amber-500" />
              <span>{firmName}<span className="text-amber-500">.</span></span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-500 font-sans">{firmTagline}</p>
          </div>

          <div className="md:col-span-3 space-y-4 font-sans text-xs uppercase tracking-widest">
            <h4 className="font-bold text-white tracking-widest text-[10px] border-b border-neutral-900 pb-2">Fields of Practice</h4>
            <ul className="space-y-2.5 text-neutral-500 text-[11px]">
              <li><a href="#practices" className="hover:text-amber-500 transition-colors">Corporate Litigation</a></li>
              <li><a href="#practices" className="hover:text-amber-500 transition-colors">Banking Regulation</a></li>
              <li><a href="#connect" className="hover:text-amber-500 transition-colors">Connect Intake Desk</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4 font-sans text-xs uppercase tracking-widest">
            <h4 className="font-bold text-white tracking-widest text-[10px] border-b border-neutral-900 pb-2">Chambers Timeline</h4>
            <ul className="space-y-2 text-neutral-500 normal-case tracking-normal font-sans text-[11px]">
              <li className="flex flex-col gap-0.5"><span className="text-neutral-400 uppercase text-[10px] tracking-wider">Business Standard:</span> {monFriTime}</li>
              <li className="flex flex-col gap-0.5"><span className="text-neutral-400 uppercase text-[10px] tracking-wider">Weekend Deck:</span> {satTime}</li>
              <li className="flex flex-col gap-0.5"><span className="text-amber-500/80 uppercase text-[10px] tracking-wider font-bold">Emergency Docket:</span> {sunTime}</li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 font-sans text-xs uppercase tracking-widest">
            <h4 className="font-bold text-white tracking-widest text-[10px] border-b border-neutral-900 pb-2">Primary Registry</h4>
            <div className="space-y-1 text-neutral-500 normal-case tracking-normal text-[11px]">
              <p className="text-[10px] uppercase tracking-wider text-neutral-400">Direct Desk Hotline:</p>
              <p className="text-sm font-bold text-amber-500 tracking-tight">{firmHotline}</p>
            </div>
            <p className="text-[11px] text-neutral-600 leading-snug">{firmEmail}</p>
            <p className="text-[11px] text-neutral-600 leading-snug">{firmAddress}</p>
            <a
              href={waLink(whatsappNumber, "Hello, I'd like to get in touch.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-[#25D366] hover:text-white transition-colors normal-case tracking-normal"
            >
              <FaWhatsapp size={14} /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 7. GLOBAL WHATSAPP FLOATING INTAKE GATEWAY
// ==========================================
function WhatsAppStickyComponent({ whatsappIntakeNumber }: { whatsappIntakeNumber: string }) {
  const secureUrl = waLink(whatsappIntakeNumber, "Aurelia Law Registry Desk // Requesting conflict-check evaluation forms.");

  return (
    <a href={secureUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#128C7E] hover:bg-[#075E54] border border-emerald-600/20 text-white p-4 rounded-none shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center font-sans uppercase tracking-widest text-[10px]" aria-label="Secure Intake Gateway">
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-300 group-hover:max-w-xs group-hover:pr-3 ease-in-out">Secure Intake Desk</span>
      <FaWhatsapp size={20} className="drop-shadow" />
    </a>
  );
}