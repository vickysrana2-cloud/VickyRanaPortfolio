"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BedDouble, MapPin, Ruler } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Handshake,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  House,
  FileCheck,
  KeyRound,
} from "lucide-react";
import { Menu, Phone, Mail, Star, BadgeCheck } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  fullName: string;
  phone: string;
  email: string;
  budget: string;
  propertyType: string;
  city: string;
  query: string;
}

// heroStats.stats, whyChooseUs.features, properties.properties,
// workingProcess.steps, testimonials.reviews and contactSection.benefits
// are all 'card' fields now, so they arrive as ready-made arrays of
// objects — just fall back to defaults if empty.
const withCardFallback = (data: any, defaultData: any[]): any[] =>
  Array.isArray(data) && data.length > 0 ? data : defaultData;

export const RealEstateTemplate: React.FC<{ data: any }> = ({ data }) => {
  const basicInfo = data?.basicInfo || {};
  const heroSection = data?.heroSection || {};
  const whyChooseUsData = data?.whyChooseUs || {};
  const propertiesData = data?.properties || {};
  const workingProcessData = data?.workingProcess || {};
  const testimonialsData = data?.testimonials || {};
  const contactSectionData = data?.contactSection || {};
  const contactDetailsData = data?.contactDetails || {};
  const socialLinksData = data?.socialLinks || {};
  const footerData = data?.footer || {};

  const companyName = basicInfo?.companyName || "Skyline Realty";
  const logo = basicInfo.logo || "https://bitbusters.netlify.app/logo.png";

  const heroImage =
    heroSection.heroImage ||
    "https://www.risehighrealestate.in/images/home/home-lage-1.jpg";
  const heroTitle = heroSection.heroTitle || "Find Your Dream Property";
  const heroDescription =
    heroSection.heroDescription ||
    "Discover premium residential and commercial properties with trusted experts.";
  const heroTagline =
    heroSection.heroTagline || "⭐ Trusted by 1500+ families.";

  const defaultStats = [
    { title: "500+", description: "Properties Sold" },
    { title: "15+", description: "Years Experience" },
    { title: "98%", description: "Happy Clients" },
    { title: "123+", description: "Expert Agents" },
  ];
  const stats = withCardFallback(data?.heroStats?.stats, defaultStats);

  const defaultFeatures = [
    {
      title: "Verified Properties",
      description:
        "Every property is carefully verified for authenticity, ownership, and documentation before it reaches our clients.",
      icon: "Building2",
    },
    {
      title: "Expert Guidance",
      description:
        "Our experienced consultants help you make informed decisions based on your budget and long-term goals.",
      icon: "Handshake",
    },
    {
      title: "Market Insights",
      description:
        "Stay ahead with current market trends, investment opportunities, and accurate property valuations.",
      icon: "TrendingUp",
    },
    {
      title: "End-to-End Support",
      description:
        "From property visits to legal paperwork, we assist you throughout the complete buying or selling journey.",
      icon: "ShieldCheck",
    },
  ];
  const whyChooseUsTitle =
    whyChooseUsData.sectionTitle || "Why Choose Skyline Realty";
  const whyChooseUsDescription =
    whyChooseUsData.sectionDescription ||
    "Your trusted partner for buying, selling and investing in premium residential and commercial properties.";
  const features = withCardFallback(whyChooseUsData.features, defaultFeatures);

  const defaultProperties = [
    {
      image:
        "https://d3m6qar7mpuxfl.cloudfront.net/images/thumbs/680ca28670dc0-26-04-2025-09-08-22-66aa213df59e744be90334e3_lg.webp",
      title: "Luxury Villa",
      location: "Mumbai, Maharashtra",
      price: "₹2.45 Cr",
      bedrooms: "3 BHK",
      area: "2400 sq.ft",
      bedroomsLabel: "Bedrooms",
      areaLabel: "Area",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4Lzk48ldMMLgPrMzWI1XFpIYPV2hGL_McKLACkSJVWEKYAeyjB9jdGg&s=10",
      title: "Modern Apartment",
      location: "Pune, Maharashtra",
      price: "₹1.15 Cr",
      bedrooms: "2 BHK",
      area: "1250 sq.ft",
      bedroomsLabel: "Bedrooms",
      areaLabel: "Area",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF3KVNfi1jGr7BjC-tnu4km7l19aCrvEwrDh1Q-31icMVALOYUlyEP-um&s=10",
      title: "Sea View Penthouse",
      location: "Goa",
      price: "₹4.80 Cr",
      bedrooms: "4 BHK",
      area: "3600 sq.ft",
      bedroomsLabel: "Bedrooms",
      areaLabel: "Area",
    },
    {
      image:
        "https://5.imimg.com/data5/SELLER/Default/2025/10/552522148/TJ/XS/WP/119740441/premium-duplex-home-for-sale-in-adukkamparai-prime-location.jpeg",
      title: "Premium Duplex",
      location: "Bengaluru, Karnataka",
      price: "₹2.10 Cr",
      bedrooms: "3 BHK",
      area: "2100 sq.ft",
      bedroomsLabel: "Bedrooms",
      areaLabel: "Area",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWYj8zAjOkaa8tV2joYoeHPPGId11T0Y7qaERTDhMNO2vih5xnqWNSppg&s=10",
      title: "Urban Studio",
      location: "Hyderabad, Telangana",
      price: "₹78 Lakh",
      bedrooms: "1 BHK",
      area: "750 sq.ft",
      bedroomsLabel: "Bedrooms",
      areaLabel: "Area",
    },
  ];
  const propertiesTitle = propertiesData.sectionTitle || "Featured Properties";
  const propertiesDescription =
    propertiesData.sectionDescription ||
    "Explore our handpicked premium properties.";
  const rawProperties = withCardFallback(
    propertiesData.properties,
    defaultProperties,
  );
  const properties = rawProperties.map((prop: any) => ({
    ...prop,
    bedroomsLabel: prop.bedroomsLabel || "Bedrooms",
    areaLabel: prop.areaLabel || "Area",
  }));

  const defaultSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Understand your budget, lifestyle and investment goals.",
      icon: "PhoneCall",
    },
    {
      number: "02",
      title: "Explore Properties",
      description: "Visit carefully selected homes that match your needs.",
      icon: "House",
    },
    {
      number: "03",
      title: "Documentation",
      description: "We handle legal paperwork, negotiations and verification.",
      icon: "FileCheck",
    },
    {
      number: "04",
      title: "Get Your Keys",
      description: "Complete the purchase and move into your dream property.",
      icon: "KeyRound",
    },
  ];
  const processTitle = workingProcessData.sectionTitle || "How It Works";
  const processDescription =
    workingProcessData.sectionDescription ||
    "Simple, transparent, and guided at every step.";
  const steps = withCardFallback(workingProcessData.steps, defaultSteps);

  const defaultReviews = [
    {
      name: "Talha Khan",
      initials: "TH",
      role: "Verified Buyer",
      property: "Luxury Villa",
      review:
        "Skyline Realty made our home-buying journey incredibly smooth. Their team understood exactly what we wanted and handled every detail professionally.",
      rating: 5,
    },
    {
      name: "Sachin Gupta",
      initials: "SG",
      role: "Verified Client",
      property: "Modern Apartment",
      review:
        "Transparent pricing, genuine properties, and excellent guidance throughout the process. I highly recommend Skyline Realty.",
      rating: 5,
    },
    {
      name: "Daskh Sevkani",
      initials: "DS",
      role: "Verified Buyer",
      property: "Sea View Penthouse",
      review:
        "From paperwork to possession, everything was stress-free. Their consultants were always available whenever we needed assistance.",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      initials: "AP",
      role: "Verified Buyer",
      property: "Premium Duplex",
      review:
        "The consultants were patient, knowledgeable, and helped us find the perfect home within our budget. Every step was transparent.",
      rating: 5,
    },
    {
      name: "Rohan Mehra",
      initials: "RM",
      role: "Verified Investor",
      property: "Luxury Residence",
      review:
        "Excellent market insights and honest advice. Skyline Realty helped me secure an investment property with great appreciation potential.",
      rating: 5,
    },
    {
      name: "Neha Kapoor",
      initials: "NK",
      role: "Verified Client",
      property: "Garden Villa",
      review:
        "I appreciated their attention to detail and prompt communication. The entire buying experience felt seamless and professional.",
      rating: 5,
    },
    {
      name: "Arjun Nair",
      initials: "AN",
      role: "Verified Buyer",
      property: "Urban Studio",
      review:
        "As a first-time homebuyer, I had countless questions. The Skyline Realty team guided me with patience and clarity throughout the journey.",
      rating: 5,
    },
  ];
  const testimonialsTitle =
    testimonialsData.sectionTitle || "What Our Clients Say";
  const testimonialsDescription =
    testimonialsData.sectionDescription ||
    "Trusted by hundreds of families who found their perfect home with Skyline Realty.";
  const reviews = withCardFallback(
    testimonialsData.reviews,
    defaultReviews,
  );

  const contactHeading =
    contactSectionData.heading || "Ready to Find Your Dream Property?";
  const contactDescription =
    contactSectionData.description ||
    "Let's help you discover the perfect property that matches your lifestyle and investment goals. Fill out the form and one of our experts will get in touch with you shortly.";
  const benefits = withCardFallback(contactSectionData.benefits, [
    { text: "Free Consultation" },
    { text: "Verified Properties" },
    { text: "Response within 24 Hours" },
  ]);

  const formTitle = contactSectionData.formTitle || "Consult with Expert";
  const formSubtitle =
    contactSectionData.formSubtitle ||
    "Fill in your details and our team will contact you.";
  const fullNameLabel = contactSectionData.fullNameLabel || "Full Name";
  const phoneLabel = contactSectionData.phoneLabel || "Phone";
  const emailLabel = contactSectionData.emailLabel || "Email";
  const budgetLabel = contactSectionData.budgetLabel || "Budget";
  const propertyTypeLabel =
    contactSectionData.propertyTypeLabel || "Property Type";
  const cityLabel = contactSectionData.cityLabel || "City";
  const queryLabel = contactSectionData.queryLabel || "Query";
  const submitButtonText =
    contactSectionData.submitButtonText || "Send Inquiry";

  const phone = contactDetailsData.phone || "+91 12345 67890";
  const email = contactDetailsData.email || "hello@skylinerealty.com";
  const address = contactDetailsData.address || "Mumbai, Maharashtra";
  const city = contactDetailsData.city || "Mumbai";
  const whatsappNumber = contactDetailsData.whatsapp || "9028965101";

  const instagram = socialLinksData.instagram || "https://www.instagram.com/";
  const facebook = socialLinksData.facebook || "https://www.facebook.com/";
  const linkedin = socialLinksData.linkedin || "https://www.linkedin.com/";
  const whatsappLink = socialLinksData.whatsapp || "https://www.whatsapp.com/";

  const footerDescriptionText =
    footerData.footerDescription ||
    "Helping families find their dream homes with trust, transparency, and expert guidance.";
  const copyright =
    footerData.copyright || "© 2026 Skyline Realty. All Rights Reserved.";

  const iconMap: Record<string, any> = {
    Building2,
    Handshake,
    TrendingUp,
    ShieldCheck,
    PhoneCall,
    House,
    FileCheck,
    KeyRound,
  };

  return (
    <div>
      <Navbar companyName={companyName} logo={logo} />
      <section className="relative h-screen overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          priority
          className="object-cover -z-10"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent -z-10" />
        <Hero
          heroTitle={heroTitle}
          heroDescription={heroDescription}
          heroTagline={heroTagline}
          stats={stats}
        />
      </section>
      <section className="relative">
        <div className="absolute inset-0 bg-white/80 -z-10" />
        <WhyUs
          title={whyChooseUsTitle}
          description={whyChooseUsDescription}
          features={features}
          iconMap={iconMap}
        />
      </section>
      <section className="relative">
        <Property
          title={propertiesTitle}
          description={propertiesDescription}
          properties={properties}
        />
      </section>
      <section className="relative">
        <Timeline
          title={processTitle}
          description={processDescription}
          steps={steps}
          iconMap={iconMap}
        />
      </section>
      <section className="relative">
        <Testimonials
          title={testimonialsTitle}
          description={testimonialsDescription}
          reviews={reviews}
        />
      </section>
      <section className="relative">
        <Contact
          heading={contactHeading}
          description={contactDescription}
          benefits={benefits}
          phone={phone}
          email={email}
          address={address}
          city={city}
          whatsapp={whatsappNumber}
          formTitle={formTitle}
          formSubtitle={formSubtitle}
          fullNameLabel={fullNameLabel}
          phoneLabel={phoneLabel}
          emailLabel={emailLabel}
          budgetLabel={budgetLabel}
          propertyTypeLabel={propertyTypeLabel}
          cityLabel={cityLabel}
          queryLabel={queryLabel}
          submitButtonText={submitButtonText}
        />
      </section>
      <section className="relative">
        <Footer
          companyName={companyName}
          logo={logo}
          footerDescription={footerDescriptionText}
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
      <a
        href={`https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(
          `Hello ${companyName}, I'm interested in a property and would like to know more.`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default RealEstateTemplate;

// Navbar Component
const Navbar: React.FC<{ companyName: string; logo: string }> = ({
  companyName,
  logo,
}) => {
  const tabs = [
    { title: "Home", link: "#hero" },
    { title: "About", link: "#whyus" },
    { title: "Properties", link: "#properties" },
    { title: "Contact", link: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-gradient-to-r from-white/90 via-[#F5E6C8]/70 to-[#C8A46B]/70 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center text-xl sm:text-2xl lg:text-3xl font-bold text-[#8B6B3E]"
        >
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="mr-2 sm:mr-3 w-8 h-8 sm:w-9 sm:h-9"
            unoptimized
          />
          <span>{companyName}</span>
        </Link>
        <div className="hidden md:block rounded-full bg-[#6F532D]/50 backdrop-blur-xl border px-1 py-1">
          <div className="flex items-center gap-4 uppercase text-sm">
            {tabs.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="text-white transition hover:text-[#C8A46B] hover:bg-white hover:text-[#6F532D] rounded-full px-2 py-1"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <Link href="#contact" className="hidden md:block">
          <Button className="rounded-lg bg-[#6F532D]/20 bg-white/80 px-5 py-5 transition hover:scale-110 hover:bg-[#6F532D]/80 hover:text-white text-[#6F532D]">
            Contact Us
          </Button>
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#2B2218] border-none text-white px-5"
            >
              <div className="mt-10 flex flex-col gap-7">
                {tabs.map((item) => (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="text-lg hover:text-[#C8A46B]"
                  >
                    {item.title}
                  </Link>
                ))}
                <Link href="#contact">
                  <Button className="w-full bg-[#6F532D] mt-4 text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// Hero Component
const Hero: React.FC<{
  heroTitle: string;
  heroDescription: string;
  heroTagline: string;
  stats: any[];
}> = ({ heroTitle, heroDescription, heroTagline, stats }) => {
  return (
    <section id="hero" className="flex min-h-screen flex-col justify-between">
      <div className="flex-1 flex items-center">
        <div className="w-full px-5 sm:px-8 md:px-14 lg:px-24 xl:px-30">
          <div className="max-w-3xl text-white">
            <p className="text-sm sm:text-base">{heroTagline}</p>
            <h1 className="mt-4 mb-6 font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl leading-relaxed">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="#properties">
                <Button className="w-full sm:w-auto bg-[#6F532D] px-6 py-6 transition hover:scale-105 hover:bg-[#6F532D]/90 text-white">
                  Explore Properties
                </Button>
              </Link>
              <Link href="#contact">
                <Button className="w-full sm:w-auto border border-white bg-white/10 backdrop-blur-xl px-6 py-6 transition hover:scale-105 hover:bg-white/5 text-white border-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#c2ae9b]/20 backdrop-blur-md">
        <div className="hidden md:flex justify-center items-center">
          {stats.map((item, index) => (
            <React.Fragment key={index}>
              <div className="px-12 py-8 text-center">
                <h2 className="text-4xl font-extrabold text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-white">
                  {item.description}
                </p>
              </div>
              {index !== stats.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="h-auto my-3 bg-white"
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-2 md:hidden">
          {stats.map((item) => (
            <div
              key={item.title}
              className="border border-white/20 py-6 text-center"
            >
              <h2 className="text-3xl font-bold text-white">{item.title}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Component
const WhyUs: React.FC<{
  title: string;
  description: string;
  features: any[];
  iconMap: Record<string, any>;
}> = ({ title, description, features, iconMap }) => {
  return (
    <section
      id="whyus"
      className="relative w-full overflow-hidden bg-gradient-to-t from-black/10 via-white/90 to-white px-5 py-14 sm:px-8 md:px-12 lg:px-20 lg:py-20"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex w-full items-center justify-center gap-3 sm:gap-5">
          <Separator className="flex-1 bg-[#8B6B3E]" />
          <h1 className="whitespace-nowrap text-2xl font-bold text-[#8B6B3E] sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <Separator className="flex-1 bg-[#8B6B3E]" />
        </div>
        <p className="max-w-3xl text-sm leading-7 sm:text-base lg:text-xl text-[#4B4B4B]">
          {description}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-4 xl:grid-cols-4">
        {features.map((item, index) => {
          const Icon = iconMap[item.icon] || Building2;
          return (
            <div
              key={index}
              className="group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#8B6B3E] hover:shadow-xl"
            >
              <div className="flex justify-start">
                <span className="rounded-full border bg-[#F8F6F2] px-1.5 py-1 text-sm font-semibold text-[#8B6B3E]">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8B6B3E]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8B6B3E]/20 hover:rotate-15">
                  <Icon className="h-8 w-8 text-[#8B6B3E]" />
                </div>
              </div>
              <h3 className="mt-6 text-center text-xl font-semibold text-[#1A1A1A]">
                {item.title}
              </h3>
              <p className="mt-4 text-center text-sm leading-7 text-[#4B4B4B]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Property Component
const Property: React.FC<{
  title: string;
  description: string;
  properties: any[];
}> = ({ title, description, properties }) => {
  return (
    <section
      id="properties"
      className="relative w-full bg-gradient-to-t from-black/10 via-white/90 to-white px-5 sm:px-8 md:px-12 lg:px-20 py-14 lg:py-20"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex w-full items-center justify-center gap-3 sm:gap-6">
          <Separator className="flex-1 bg-[#8B6B3E]" />
          <h1 className="whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8B6B3E]">
            {title}
          </h1>
          <Separator className="flex-1 bg-[#8B6B3E]" />
        </div>
        <p className="text-sm sm:text-base lg:text-xl max-w-2xl text-[#4B4B4B]">
          {description}
        </p>
      </div>
      <div className="mt-12">
        <Carousel
          opts={{ align: "start" }}
          className="w-full px-2 sm:px-6 lg:px-10"
        >
          <CarouselContent>
            {properties.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/3 xl:basis-1/3 2xl:basis-1/4"
              >
                <div className="p-2">
                  <Card className="group overflow-hidden rounded-3xl border-0 p-0 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-white">
                    <div className="relative h-60 sm:h-64 lg:h-56 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm font-semibold backdrop-blur-md text-white">
                        {item.price}
                      </div>
                    </div>
                    <CardContent className="space-y-5 p-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                          {item.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-[#6B6B6B]">
                          <MapPin className="h-4 w-4 shrink-0 text-[#8B6B3E]" />
                          <span className="text-sm sm:text-base">
                            {item.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-[#F8F6F2] px-4 sm:px-6 py-3">
                        <div className="text-center">
                          <BedDouble className="mx-auto mb-1 h-5 w-5 text-[#8B6B3E]" />
                          <p className="text-[11px] sm:text-xs text-[#6B6B6B]">
                            {item.bedroomsLabel}
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                            {item.bedrooms}
                          </p>
                        </div>
                        <div className="h-10 w-px bg-[#D1D1D1]" />
                        <div className="text-center">
                          <Ruler className="mx-auto mb-1 h-5 w-5 text-[#8B6B3E]" />
                          <p className="text-[11px] sm:text-xs text-[#6B6B6B]">
                            {item.areaLabel}
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                            {item.area}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 h-9 w-9 border bg-white/90 shadow-md hover:bg-white" />
          <CarouselNext className="right-1 h-9 w-9 border bg-white/90 shadow-md hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
};

// Timeline Component
const Timeline: React.FC<{
  title: string;
  description: string;
  steps: any[];
  iconMap: Record<string, any>;
}> = ({ title, description, steps, iconMap }) => {
  return (
    <section className="relative w-full bg-[#F8F6F2] px-5 sm:px-8 md:px-12 lg:px-20 py-14 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex w-full items-center justify-center gap-3 sm:gap-6">
          <Separator className="flex-1 bg-[#8B6B3E]" />
          <h1 className="whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8B6B3E]">
            {title}
          </h1>
          <Separator className="flex-1 bg-[#8B6B3E]" />
        </div>
        <p className="max-w-2xl text-sm sm:text-base lg:text-xl text-[#4B4B4B]">
          {description}
        </p>
      </div>
      <div className="relative mt-20 hidden lg:block">
        <div className="absolute left-0 right-0 top-6 h-[2px] bg-[#D8C8B4]" />
        <div className="grid grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = iconMap[step.icon] || PhoneCall;
            return (
              <div
                key={step.number}
                className="group relative z-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-3"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#8B6B3E] bg-white shadow-lg transition duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-[#8B6B3E]" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-[#8B6B3E]">
                  {step.number}
                </h2>
                <h3 className="mt-2 text-xl font-semibold text-[#1A1A1A]">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-[#4B4B4B]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative mt-14 lg:hidden">
        <div className="absolute left-6 top-0 h-full w-[2px] bg-[#D8C8B4]" />
        <div className="space-y-10">
          {steps.map((step) => {
            const Icon = iconMap[step.icon] || PhoneCall;
            return (
              <div key={step.number} className="relative flex gap-5">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#8B6B3E] bg-white shadow-md">
                  <Icon className="h-5 w-5 text-[#8B6B3E]" />
                </div>
                <div className="pb-2">
                  <p className="text-lg font-bold text-[#8B6B3E]">
                    {step.number}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#4B4B4B]">
                    {step.description}
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

// Testimonials Component
const Testimonials: React.FC<{
  title: string;
  description: string;
  reviews: any[];
}> = ({ title, description, reviews }) => {
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  return (
    <section
      id="testimonials"
      className="relative w-full bg-gradient-to-t from-black/10 via-white/90 to-white px-5 sm:px-8 md:px-12 lg:px-20 py-14 lg:py-20"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between rounded-2xl border border-[#8B6B3E] p-6 sm:p-8 lg:px-16 lg:py-12 bg-white">
        <div className="w-full lg:max-w-[35%] text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B6B3E] leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl leading-8 text-[#4B4B4B]">
            {description}
          </p>
        </div>
        <div className="relative w-full lg:w-[430px]">
          <Carousel plugins={[plugin.current]} className="w-full">
            <CarouselContent>
              {reviews.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="group rounded-xl shadow-md border border-[#8B6B3E] bg-white">
                    <CardContent className="flex flex-col p-6 sm:p-8">
                      <div className="mb-6 flex gap-1">
                        {Array.from({ length: item.rating || 5 }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-500 text-yellow-500 transition group-hover:scale-110"
                            />
                          ),
                        )}
                      </div>
                      <p className="leading-7 italic min-h-[160px] flex items-center text-[#4B4B4B]">
                        "{item.review}"
                      </p>
                      <div className="my-6 border-t border-[#E5E5E5]" />
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3ECE3] font-bold text-[#8B6B3E]">
                          {item.initials}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1A1A1A]">
                            {item.name}
                          </h3>
                          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                            <BadgeCheck className="h-4 w-4" />
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold text-[#8B6B3E]">
                          {item.property}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 h-9 w-9 bg-white border-[#E5E5E5]" />
            <CarouselNext className="right-2 h-9 w-9 bg-white border-[#E5E5E5]" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact: React.FC<{
  heading: string;
  description: string;
  benefits: any[];
  phone: string;
  email: string;
  address: string;
  city: string;
  whatsapp: string;
  formTitle: string;
  formSubtitle: string;
  fullNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  budgetLabel: string;
  propertyTypeLabel: string;
  cityLabel: string;
  queryLabel: string;
  submitButtonText: string;
}> = ({
  heading,
  description,
  benefits,
  phone,
  email,
  address,
  city,
  whatsapp,
  formTitle,
  formSubtitle,
  fullNameLabel,
  phoneLabel,
  emailLabel,
  budgetLabel,
  propertyTypeLabel,
  cityLabel,
  queryLabel,
  submitButtonText,
}) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const textMessage = `🏡 *New Property Inquiry*\n\nFull Name: ${data.fullName}\nPhone: ${data.phone}\nEmail: ${data.email}\nProperty Type: ${data.propertyType}\nBudget: ${data.budget}\nCity: ${data.city}\n\nQuery:\n${data.query}`;
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(textMessage)}`,
      "_blank",
    );
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-t from-black/10 via-white/90 to-white px-5 sm:px-8 md:px-12 lg:px-20 py-14 lg:py-20"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 rounded-2xl border border-[#8B6B3E] p-6 sm:p-8 lg:p-10 bg-white">
        <div className="w-full lg:max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="text-2xl font-bold text-[#8B6B3E]">
                {formTitle}
              </div>
              <div className="mt-2 text-sm text-[#6B6B6B]">{formSubtitle}</div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    label: fullNameLabel,
                    name: "fullName",
                    type: "text",
                    placeholder: "Bhavik Sapat",
                  },
                  {
                    label: phoneLabel,
                    name: "phone",
                    type: "tel",
                    placeholder: "+91 1234567890",
                  },
                  {
                    label: emailLabel,
                    name: "email",
                    type: "email",
                    placeholder: "bhavik@gmail.com",
                  },
                  {
                    label: budgetLabel,
                    name: "budget",
                    type: "text",
                    placeholder: "₹50 Lakhs",
                  },
                  {
                    label: propertyTypeLabel,
                    name: "propertyType",
                    type: "text",
                    placeholder: "Villa",
                  },
                  {
                    label: cityLabel,
                    name: "city",
                    type: "text",
                    placeholder: "Mumbai",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-1 text-[#1A1A1A]">
                      {field.label}
                    </label>
                    <input
                      {...register(field.name as any)}
                      type={field.type}
                      className="w-full px-4 rounded-lg py-1 bg-white border border-[#EDE8E1] focus:border-[#8B6B3E] outline-none transition-colors text-[#1A1A1A]"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-[#1A1A1A]">
                    {queryLabel}
                  </label>
                  <textarea
                    {...register("query")}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-[#EDE8E1] focus:border-[#8B6B3E] outline-none transition-colors resize-none text-[#1A1A1A]"
                    placeholder="Tell us what you're looking for..."
                  />
                </div>
                <Button
                  type="submit"
                  className="sm:col-span-2 bg-[#8B6B3E] hover:bg-[#6F532D] text-white"
                >
                  {submitButtonText}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full lg:max-w-md text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B6B3E] leading-tight">
            {heading}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-8 text-[#4B4B4B]">
            {description}
          </p>
          <div className="flex justify-left">
            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[#1A1A1A]"
                >
                  <span className="text-green-500 font-bold text-xl">✓</span>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC<{
  companyName: string;
  logo: string;
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
  logo,
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
  return (
    <footer className="bg-[#2B2218] text-white/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-16 py-14">
        <div className="flex flex-col gap-12 text-center md:text-left md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-md">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start text-2xl sm:text-3xl font-bold text-[#C8A46B]"
            >
              <Image
                src={logo}
                className="mr-3"
                alt="logo"
                width={35}
                height={35}
                unoptimized
              />
              {companyName}
            </Link>
            <p className="mt-5 leading-7 text-sm sm:text-base">
              {footerDescription}
            </p>
            <div className="mt-6 flex justify-center gap-4 md:justify-start">
              {instagram && (
                <Link
                  href={instagram}
                  target="_blank"
                  className="rounded-lg border border-white/20 p-2 transition-all duration-300 hover:bg-[#6F532D] hover:scale-110"
                >
                  <FaInstagram className="text-xl" />
                </Link>
              )}
              {facebook && (
                <Link
                  href={facebook}
                  target="_blank"
                  className="rounded-lg border border-white/20 p-2 transition-all duration-300 hover:bg-[#6F532D] hover:scale-110"
                >
                  <FaFacebookF className="text-xl" />
                </Link>
              )}
              {linkedin && (
                <Link
                  href={linkedin}
                  target="_blank"
                  className="rounded-lg border border-white/20 p-2 transition-all duration-300 hover:bg-[#6F532D] hover:scale-110"
                >
                  <FaLinkedinIn className="text-xl" />
                </Link>
              )}
              {whatsappLink && (
                <Link
                  href={whatsappLink}
                  target="_blank"
                  className="rounded-lg border border-white/20 p-2 transition-all duration-300 hover:bg-[#6F532D] hover:scale-110"
                >
                  <FaWhatsapp className="text-xl" />
                </Link>
              )}
            </div>
          </div>
          <div className="flex gap-4 md:gap-30 text-left">
            <div className="mx-auto md:w-fit">
              <h3 className="mb-5 text-lg font-semibold text-[#C8A46B]">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["Home", "Properties", "About", "Testimonials", "Contact"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <Link
                        href={`#${item.toLowerCase() === "home" ? "hero" : item.toLowerCase() === "properties" ? "properties" : item.toLowerCase() === "about" ? "whyus" : item.toLowerCase() === "testimonials" ? "testimonials" : "contact"}`}
                        className="transition hover:text-white"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="mx-auto">
              <h3 className="mb-5 text-lg font-semibold text-[#C8A46B]">
                Contact
              </h3>
              <div className="space-y-4">
                <Link
                  href={`tel:${phone}`}
                  className="flex items-center justify-left gap-3 transition hover:text-white"
                >
                  <Phone size={18} className="text-[#C8A46B] shrink-0" />
                  <span>{phone}</span>
                </Link>
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center justify-left gap-3 transition hover:text-white"
                >
                  <Mail size={18} className="text-[#C8A46B] shrink-0" />
                  <span>{email}</span>
                </Link>
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  className="flex items-center justify-left gap-3 transition hover:text-white"
                >
                  <MapPin size={18} className="text-[#C8A46B] shrink-0" />
                  <span>{address}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-10 bg-[#8B6B3E]/40" />
        <div className="text-center text-xs sm:text-sm text-white/60">
          {copyright}
        </div>
      </div>
    </footer>
  );
};