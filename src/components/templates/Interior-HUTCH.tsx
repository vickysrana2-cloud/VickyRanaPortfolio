"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Home,
  Users,
  Briefcase,
  Sofa,
  Palette,
  PenTool,
  Hammer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  fullName: string;
  email: string;
  query: string;
}

// services.services, projects.projects, faqs.faqs and process.steps are
// all 'card' fields now, so they arrive as ready-made arrays of objects —
// just fall back to defaults if empty.
const withCardFallback = (data: any, defaultData: any[]): any[] =>
  Array.isArray(data) && data.length > 0 ? data : defaultData;

export const HutchTemplate: React.FC<{ data: any }> = ({ data }) => {
  console.log("data is", data);

  // Extract data from the config (FLAT STRUCTURE)
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const aboutSection = data?.aboutSection || {};
  const processData = data?.process || {};
  const contactData = data?.contact || {};
  const socialLinks = data?.socialLinks || {};
  const footerData = data?.footer || {};

  // Default values
  const companyName = basicInfo.companyName || "HUTCH";
  const tagline = basicInfo.tagline || "Creating Timeless Interiors";
  const description =
    basicInfo.description ||
    "Creating functional and timeless spaces designed to look beautiful and feel inspiring for modern living and work.";

  const heroImage =
    heroSection.heroImage ||
    "https://cdn.apartmenttherapy.info/image/upload/v1696351310/at/house%20tours/2023-House-Tours/2023-October/miranda-co/tours-brooklyn-miranda-co-6.jpg";
  const heroSubtitle = heroSection.subtitle || "Featured Projects";
  const heroTitle = heroSection.title || "Creating Interiors";
  const heroHighlight = heroSection.highlight || "That Inspire Living";
  const heroButtonText = heroSection.buttonText || "View Portfolio";

  const aboutHeading = aboutSection.heading || "";
  const aboutContent =
    aboutSection.content ||
    "HUTCH is a design studio based in Mumbai, creating functional and timeless spaces for modern living and work. We believe in the power of thoughtful design to transform environments and enhance lives";

  const processBackground =
    processData.backgroundImage ||
    "https://img.magnific.com/free-photo/modern-minimalist-living-room-interior-design_23-2151983191.jpg?semt=ais_hybrid&w=740&q=80";

  const phone = contactData.phone || "+91 12345 67890";
  const email = contactData.email || "hello@hutch.com";
  const address = contactData.address || "Mumbai, Maharashtra";
  const whatsappNumber = contactData.whatsapp || "1234567890";

  const instagram = socialLinks.instagram || "#";
  const facebook = socialLinks.facebook || "#";
  const linkedin = socialLinks.linkedin || "#";
  const whatsappLink = socialLinks.whatsappLink || "#";
  // Floating on-screen WhatsApp button: dedicated field first, then the contact number
  const floatingWhatsappNumber = String(
    socialLinks.whatsappNumber || whatsappNumber,
  ).replace(/\D/g, "");

  const copyright =
    footerData.copyright || "© 2026 HUTCH. All Rights Reserved.";
  const footerDescription =
    footerData.footerDescription ||
    "Creating functional and timeless spaces designed to look beautiful and feel inspiring for modern living and work.";

  // Default services if none provided
  const defaultServices = [
    {
      title: "Residential Design",
      description:
        "Full-service interior design for luxury homes, apartments, and villa layouts to your lifestyle.",
      image:
        "https://www.andacademy.com/resources/wp-content/uploads/2024/03/2-13.webp",
    },
    {
      title: "Commercial Spaces",
      description:
        "Creating impactful environments for retail, hospitality, and public spaces that reflect brand identity.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmd00VblyWkkicBVR0ZduYD7hL6rSMM1rbC7YP6ukrQZ10Cc75UKJYbU&s=10",
    },
    {
      title: "Office Design",
      description:
        "Product and inspiring workspace solutions that enhance employee well-being and efficiency.",
      image:
        "https://royaletouche.gumlet.io/wp-content/uploads/2024/09/27123301/interior-design-for-office1.jpg?compress=true&quality=80&w=1500&dpr=2.6",
    },
    {
      title: "Custom Furniture",
      description:
        "Bespoke furniture design and sourcing to ensure unique pieces that perfectly fit your space.",
      image:
        "https://antiquehomedecors.com/wp-content/uploads/2024/08/81cvV9dc8CL._SL1500-1.jpg",
    },
  ];

  const services = withCardFallback(data?.services?.services, defaultServices);

  // Default projects if none provided
  const defaultProjects = [
    {
      title: "Residential Design",
      description:
        "Full-service interior design for luxury homes, apartments, and villa layouts to your lifestyle.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA7lCbz2slsDX5ZqBiPCLNDCg0JjjD6xGWwL2ecs_ulGkY3BDE7YH6P3Fc&s=10",
    },
    {
      title: "Commercial Spaces",
      description:
        "Creating impactful environments for retail, hospitality, and public spaces that reflect brand identity.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOa1yNrNT1znaiMfe31BHNTZsPKgZMHcOBKd5j_MkbTjFQil46guF8C6V-&s=10",
    },
    {
      title: "Office Design",
      description:
        "Product and inspiring workspace solutions that enhance employee well-being and efficiency.",
      image:
        "https://cdn.decorilla.com/online-decorating/wp-content/uploads/2024/05/Contemporary-executive-office-design-by-Decorilla-1024x574.jpeg?width=900",
    },
    {
      title: "Custom Furniture",
      description:
        "Bespoke furniture design and sourcing to ensure unique pieces that perfectly fit your space.",
      image:
        "https://www.curvesandcarvings.com/pub/media/mageplaza/blog/post/w/h/why_is_customised_furniture_in_mumbai_1.jpg",
    },
    {
      title: "Luxury Villa",
      description:
        "Elegant and sophisticated interior design for luxury villas with stunning finishes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfbVp0NejqNtf9alO22AHXwgtTYw29r2-N01aPcPIvjqnUrwN_gF2Lxc&s=10",
    },
    {
      title: "Restaurant Design",
      description:
        "Creating immersive dining experiences through thoughtful interior design.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7DTnlg2uXhKgX7GcvKasd7J3b6yx_T3cHZxhy29jCQy3rBz-DtmLbKTE&s=10",
    },
    {
      title: "Office Renovation",
      description:
        "Modern and productive workspace solutions that boost employee morale and efficiency.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS6Uxr60TzIM8AopqQfx0QxB1LCAEaGwkcg2QJDtiUB1ElhLvmNZ_doXM&s=10",
    },
    {
      title: "Boutique Hotel",
      description:
        "Designing unique and memorable spaces for boutique hotels and luxury accommodations.",
      image:
        "https://assets.architecturaldigest.in/photos/67bd5b1af91a1a5f0a072e1b/16:9/w_2560%2Cc_limit/Untitled%2520design.jpg",
    },
  ];

  const projects = withCardFallback(data?.projects?.projects, defaultProjects);

  // Default FAQs if none provided
  const defaultFaqs = [
    {
      question: "Is this a service suitable for all skill types?",
      answer:
        "Yes, our products are carefully formulated to suit all skill types, including DIY, construction, and interior design.",
    },
    {
      question: "How long does it take to see visible results?",
      answer:
        "Our products are designed to deliver results in a timely manner. The timeline depends on the scope of your project and specific requirements.",
    },
    {
      question: "Can I use these products every day?",
      answer:
        "Yes, our products are designed to be used every day. They are built with durability and longevity in mind.",
    },
    {
      question: "Do you offer consultation for small projects?",
      answer:
        "Absolutely! We offer consultation for projects of all sizes. Whether it's a single room or an entire building, we're here to help.",
    },
    {
      question: "What is your design process?",
      answer:
        "Our design process includes discovery, concept development, detailed design, and execution. We work closely with you at every stage.",
    },
  ];

  const faqs = withCardFallback(data?.faqs?.faqs, defaultFaqs);

  // Default process steps if none provided
  const defaultSteps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We begin with a consultation to understand your needs, style, and budget.",
    },
    {
      number: "02",
      title: "Concept",
      description:
        "Developing initial mood boards, layouts, and design direction for your project.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "We bring to life a custom design that reflects your vision.",
    },
    {
      number: "04",
      title: "Execution",
      description:
        "Managing construction, finishing, and installation to ensure a seamless project.",
    },
  ];

  const steps = withCardFallback(processData.steps, defaultSteps);

  return (
    <>
      <Navbar companyName={companyName} />

      <div className="pt-16">
        <section id="hero" className="relative min-h-screen overflow-hidden">
          <Image
            src={heroImage}
            alt="Hero Background"
            fill
            priority
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 md:via-transparent to-transparent -z-10" />
          <Hero
            subtitle={heroSubtitle}
            title={heroTitle}
            highlight={heroHighlight}
            buttonText={heroButtonText}
          />
        </section>

        <section
          id="about"
          className="relative min-h-auto overflow-hidden bg-[#F7F4F0]/100"
        >
          <About heading={aboutHeading} content={aboutContent} />
        </section>

        <section
          id="services"
          className="relative min-h-auto overflow-hidden bg-white"
        >
          <Services services={services} />
        </section>

        <section id="process" className="relative min-h-auto overflow-hidden">
          <Image
            src={processBackground}
            alt="Process Background"
            fill
            priority
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent md:via-black/50 to-transparent -z-10" />
          <Process steps={steps} />
        </section>

        <section
          id="projects"
          className="relative min-h-auto overflow-hidden bg-white"
        >
          <FeaturedProjects projects={projects} />
        </section>

        <section id="faqs" className="relative min-h-auto overflow-hidden">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-cAM3FulKyFSnaViW1OmQ87D9aKT07MDTpUDR3be9IN-ugEJHQDP4rc&s=10"
            alt="FAQ Background"
            fill
            priority
            className="fixed object-cover -z-10"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] -z-10" />
          <FAQ faqs={faqs} />
        </section>

        <section
          id="contact"
          className="relative min-h-auto overflow-hidden bg-white"
        >
          <Contact
            phone={phone}
            email={email}
            address={address}
            whatsapp={whatsappNumber}
          />
        </section>

        <section className="relative min-h-auto overflow-hidden">
          <Footer
            companyName={companyName}
            footerDescription={footerDescription}
            copyright={copyright}
            phone={phone}
            email={email}
            address={address}
            instagram={instagram}
            facebook={facebook}
            linkedin={linkedin}
            whatsappLink={whatsappLink}
          />
        </section>
      </div>

      <WhatsAppFloat whatsapp={floatingWhatsappNumber} companyName={companyName} />
    </>
  );
};

export default HutchTemplate;

// Floating WhatsApp Button
const WhatsAppFloat: React.FC<{ whatsapp: string; companyName: string }> = ({
  whatsapp,
  companyName,
}) => {
  if (!whatsapp) return null;

  const message = `Hello ${companyName}, I'd like to discuss an interior design project.`;

  return (
    <Link
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
};

// Navbar Section
const Navbar: React.FC<{ companyName: string }> = ({ companyName }) => {
  const tabs = [
    { title: "Home", link: "#hero" },
    { title: "About us", link: "#about" },
    { title: "Project", link: "#projects" },
    { title: "FAQs", link: "#faqs" },
    { title: "Contact Us", link: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3">
        <Link
          href="/"
          className="flex items-center text-2xl sm:text-3xl font-bold font-serif tracking-wider text-[#1A1A1A]"
        >
          <span className="tracking-[0.3em]">{companyName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {tabs.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#C4A882] transition-colors uppercase tracking-wide"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#1A1A1A] hover:bg-[#F7F4F0]"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white border-none text-[#1A1A1A] px-6"
            >
              <div className="mt-10 flex flex-col gap-6">
                {tabs.map((item) => (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="text-lg font-medium hover:text-[#C4A882] transition-colors uppercase tracking-wide"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero: React.FC<{
  subtitle: string;
  title: string;
  highlight: string;
  buttonText: string;
}> = ({ subtitle, title, highlight, buttonText }) => {
  return (
    <section className="flex min-h-screen items-center px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl text-white">
        <p className="text-sm sm:text-base uppercase tracking-[0.2em] bg-gradient-to-r from-white to-[#C4A882] bg-clip-text text-transparent font-light">
          {subtitle}
        </p>

        <h1 className="mt-6 mb-8 font-light leading-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
          {title}
          <br />
          <span className="font-serif italic">{highlight}</span>
        </h1>

        <Link href="#projects">
          <Button className="bg-[#C4A882] hover:bg-[#B09578] text-white px-8 py-6 text-sm uppercase tracking-wider rounded-none transition-all hover:scale-105">
            {buttonText}
          </Button>
        </Link>
      </div>
    </section>
  );
};

// About Section
const About: React.FC<{ heading: string; content: string }> = ({
  heading,
  content,
}) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
      <div className="group relative overflow-hidden p-8 hover:-translate-y-1 transition-all duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium mb-4">
            Who we are
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
            {heading || content}
          </h2>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services: React.FC<{ services: any[] }> = ({ services }) => {
  const serviceIcons = [Home, Briefcase, Sofa, Palette];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-[#1A1A1A] mt-2">
            What We Offer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <div
                key={index}
                className="group relative overflow-hidden p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#C4A882]/70 transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white z-40 pt-5">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-white/80 leading-relaxed my-auto pb-3">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Process Section
const Process: React.FC<{ steps: any[] }> = ({ steps }) => {
  const stepIcons = [Users, PenTool, Palette, Hammer];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium">
            Our Working Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-white mt-2">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div
                key={index}
                className="relative p-8 bg-white border border-[#EDE8E1] hover:border-[#C4A882] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-light text-[#C4A882]">
                    {step.number}
                  </span>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C4A882]/10">
                    <Icon className="h-6 w-6 text-[#C4A882]" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-medium text-[#1A1A1A]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-[#666] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const FeaturedProjects: React.FC<{ projects: any[] }> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium">
              Featured Projects
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1A1A] mt-1">
              Our Work
            </h2>
          </div>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols gap-6 sm:hidden">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-white border border-[#EDE8E1] hover:border-[#C4A882] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F7F4F0]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="flex absolute m-3 justify-center items-center bg-white/70 h-7 w-7 rounded-full">
                  0{index + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-[#1A1A1A]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-[#666] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group overflow-hidden bg-white border border-[#EDE8E1] hover:border-[#C4A882] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#F7F4F0]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="flex absolute m-3 justify-center items-center bg-white/70 h-7 w-7 rounded-full">
                  0{index + 1}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-[#1A1A1A]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-[#666] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ: React.FC<{ faqs: any[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-[#1A1A1A] mt-2">
            Frequently Asked Questions?
          </h2>
          <p className="mt-4 text-[#666]">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#EDE8E1] hover:border-[#C4A882] transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-[#1A1A1A] pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#C4A882]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#C4A882]" />
                  )}
                </div>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "pb-6 max-h-96" : "max-h-0"
                }`}
              >
                <p className="text-sm text-[#666] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact: React.FC<{
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}> = ({ phone, email, address, whatsapp }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const textMessage = `🏡 *New Design Inquiry*

Full Name: ${data.fullName}
Email: ${data.email}
Query:${data.query}`;

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      textMessage,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      id="contact"
      className="w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C4A882] font-medium">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1A1A] mt-2">
              Let's Create Something
              <br />
              <span className="font-serif">Beautiful Together</span>
            </h2>

            <p className="mt-6 text-[#666] leading-relaxed">
              Have a project in mind? We'd love to hear about it. Reach out to
              us and let's bring your vision to life.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C4A882]/10">
                  <Phone className="h-5 w-5 text-[#C4A882]" />
                </div>
                <div>
                  <p className="text-sm text-[#666]">Phone</p>
                  <Link
                    href={`tel:${phone}`}
                    className="text-[#1A1A1A] hover:text-[#C4A882] transition-colors"
                  >
                    {phone}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C4A882]/10">
                  <Mail className="h-5 w-5 text-[#C4A882]" />
                </div>
                <div>
                  <p className="text-sm text-[#666]">Email</p>
                  <Link
                    href={`mailto:${email}`}
                    className="text-[#1A1A1A] hover:text-[#C4A882] transition-colors"
                  >
                    {email}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C4A882]/10">
                  <MapPin className="h-5 w-5 text-[#C4A882]" />
                </div>
                <div>
                  <p className="text-sm text-[#666]">Location</p>
                  <p className="text-[#1A1A1A]">{address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F4F0] p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                    Your Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-[#EDE8E1] focus:border-[#C4A882] outline-none transition-colors"
                    placeholder="Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-[#EDE8E1] focus:border-[#C4A882] outline-none transition-colors"
                    placeholder="rahul@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                    Message
                  </label>
                  <textarea
                    {...register("query")}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-[#EDE8E1] focus:border-[#C4A882] outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white px-8 py-6 text-sm uppercase tracking-wider rounded-none transition-all"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC<{
  companyName: string;
  footerDescription: string;
  copyright: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  whatsappLink: string;
}> = ({
  companyName,
  footerDescription,
  copyright,
  phone,
  email,
  address,
  instagram,
  facebook,
  linkedin,
  whatsappLink,
}) => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = 64;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14">
        <div className="flex flex-col gap-12 text-center md:text-left md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-md">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start text-2xl sm:text-3xl font-serif tracking-wider text-[#C4A882]"
            >
              {companyName}
            </Link>

            <p className="mt-4 leading-7 text-sm text-white/60">
              {footerDescription}
            </p>

            <div className="mt-6 flex justify-center gap-4 md:justify-start">
              {instagram && instagram !== "#" && (
                <Link
                  href={instagram}
                  className="rounded-lg border border-white/10 p-2 transition-all duration-300 hover:bg-[#C4A882] hover:border-[#C4A882] hover:scale-110"
                >
                  <FaInstagram className="text-lg" />
                </Link>
              )}
              {facebook && facebook !== "#" && (
                <Link
                  href={facebook}
                  className="rounded-lg border border-white/10 p-2 transition-all duration-300 hover:bg-[#C4A882] hover:border-[#C4A882] hover:scale-110"
                >
                  <FaFacebookF className="text-lg" />
                </Link>
              )}
              {linkedin && linkedin !== "#" && (
                <Link
                  href={linkedin}
                  className="rounded-lg border border-white/10 p-2 transition-all duration-300 hover:bg-[#C4A882] hover:border-[#C4A882] hover:scale-110"
                >
                  <FaLinkedinIn className="text-lg" />
                </Link>
              )}
              {whatsappLink && whatsappLink !== "#" && (
                <Link
                  href={whatsappLink}
                  className="rounded-lg border border-white/10 p-2 transition-all duration-300 hover:bg-[#C4A882] hover:border-[#C4A882] hover:scale-110"
                >
                  <FaWhatsapp className="text-lg" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-10 md:gap-46 md:justify-between justify-center text-left">
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#C4A882]">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#hero"
                    onClick={(e) => handleScroll(e, "#hero")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    onClick={(e) => handleScroll(e, "#about")}
                    className="hover:text-white transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    onClick={(e) => handleScroll(e, "#projects")}
                    className="hover:text-white transition-colors"
                  >
                    Project
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faqs"
                    onClick={(e) => handleScroll(e, "#faqs")}
                    className="hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={(e) => handleScroll(e, "#contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[#C4A882]">
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <Link
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-[#C4A882]" />
                  {phone}
                </Link>
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-[#C4A882]" />
                  {email}
                </Link>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#C4A882]" />
                  {address}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />
        <div className="text-center text-xs text-white/40">{copyright}</div>
      </div>
    </footer>
  );
};