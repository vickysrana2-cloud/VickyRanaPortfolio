"use client";

import { useState } from "react";
import {
   Menu,
   X,
   ArrowRight,
   Check,
   Calendar,
   Sparkles,
   MapPin,
   Phone,
   Mail,
   Camera,
} from "lucide-react";

interface EventService {
   id: number;
   title: string;
   description: string;
   icon?: string;
}

interface Event {
   id: number;
   title: string;
   category: string;
   location: string;
   image: string;
}

interface Testimonial {
   id: number;
   name: string;
   role: string;
   quote: string;
}

interface EventPlanningData {
   basicInfo: {
      companyName: string;
      logo: string;
      tagline: string;
   };

   heroSection: {
      badge: string;
      title: string;
      highlight: string;
      description: string;
      primaryButtonText: string;
      secondaryButtonText: string;
      image: string;
      imageLabel: string;
   };

   aboutSection: {
      badge: string;
      title: string;
      highlight: string;
      description: string;
      image: string;
      stat1Number: string;
      stat1Label: string;
      stat2Number: string;
      stat2Label: string;
      stat3Number: string;
      stat3Label: string;
   };

   servicesSection: {
      badge: string;
      title: string;
      highlight: string;
      services: EventService[];
   };

   eventsSection: {
      badge: string;
      title: string;
      highlight: string;
      events: Event[];
   };

   processSection: {
      badge: string;
      title: string;
      description: string;
      steps: {
         number: string;
         title: string;
         description: string;
      }[];
   };

   testimonialsSection: {
      badge: string;
      title: string;
      highlight: string;
      testimonials: Testimonial[];
   };

   contactSection: {
      badge: string;
      title: string;
      description: string;
      buttonText: string;
      phone: string;
      email: string;
      address: string;
      whatsapp: string;
   };

   footerSection: {
      description: string;
      copyright: string;
   };

   socialLinks: {
      instagram: string;
      facebook: string;
   };
}

interface EventPlanningTemplateProps {
   data?: EventPlanningData;
}

const defaultData: EventPlanningData = {
   basicInfo: {
      companyName: "LUMIÈRE EVENTS",
      logo: "",
      tagline: "Creating celebrations worth remembering",
   },

   heroSection: {
      badge: "Luxury Event Planning",
      title: "Your Story.",
      highlight: "Beautifully Celebrated.",
      description:
         "We design unforgettable weddings, celebrations and corporate events with thoughtful details, elegant styling and flawless execution.",
      primaryButtonText: "Plan Your Event",
      secondaryButtonText: "Explore Events",
      image:
         "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      imageLabel: "Elegant Wedding Celebration",
   },

   aboutSection: {
      badge: "About Us",
      title: "We Turn Special Moments Into",
      highlight: "Beautiful Memories.",
      description:
         "From intimate celebrations to grand occasions, our team manages every detail so you can focus on the people and moments that matter most.",
      image:
         "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      stat1Number: "150+",
      stat1Label: "Events Created",
      stat2Number: "8+",
      stat2Label: "Years Experience",
      stat3Number: "98%",
      stat3Label: "Happy Clients",
   },

   servicesSection: {
      badge: "What We Do",
      title: "Everything Your Event",
      highlight: "Needs.",
      services: [
         {
            id: 1,
            title: "Wedding Planning",
            description:
               "Complete wedding planning from concept and vendor management to the final celebration.",
            icon: "sparkles",
         },
         {
            id: 2,
            title: "Event Styling",
            description:
               "Elegant themes, décor, floral arrangements and styling designed around your story.",
            icon: "sparkles",
         },
         {
            id: 3,
            title: "Corporate Events",
            description:
               "Professional conferences, launches, parties and corporate experiences.",
            icon: "calendar",
         },
         {
            id: 4,
            title: "Private Celebrations",
            description:
               "Birthdays, anniversaries and intimate gatherings planned down to every detail.",
            icon: "sparkles",
         },
      ],
   },

   eventsSection: {
      badge: "Our Work",
      title: "Celebrations We've",
      highlight: "Created.",
      events: [
         {
            id: 1,
            title: "Garden Wedding",
            category: "Wedding",
            location: "Udaipur",
            image:
               "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
         },
         {
            id: 2,
            title: "Modern Reception",
            category: "Wedding",
            location: "Mumbai",
            image:
               "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
         },
         {
            id: 3,
            title: "Luxury Celebration",
            category: "Private Event",
            location: "Delhi",
            image:
               "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
         },
         {
            id: 4,
            title: "Corporate Evening",
            category: "Corporate",
            location: "Bangalore",
            image:
               "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
         },
      ],
   },

   processSection: {
      badge: "Our Process",
      title: "From First Idea To",
      description:
         "A simple, personal and organised process designed to make event planning enjoyable.",
      steps: [
         {
            number: "01",
            title: "Discover",
            description:
               "We understand your vision, preferences, guest experience and expectations.",
         },
         {
            number: "02",
            title: "Design",
            description:
               "Our team develops the event concept, styling, mood and complete planning strategy.",
         },
         {
            number: "03",
            title: "Plan",
            description:
               "We coordinate vendors, timelines, logistics and every important detail.",
         },
         {
            number: "04",
            title: "Celebrate",
            description:
               "You enjoy your event while our team manages everything behind the scenes.",
         },
      ],
   },

   testimonialsSection: {
      badge: "Client Stories",
      title: "Loved By People Who",
      highlight: "Celebrate With Us.",
      testimonials: [
         {
            id: 1,
            name: "Ananya & Rohan",
            role: "Wedding Clients",
            quote:
               "Every detail felt incredibly personal. We could actually enjoy our wedding without worrying about anything.",
         },
         {
            id: 2,
            name: "Meera Shah",
            role: "Private Event",
            quote:
               "The styling was beautiful and the entire process was smooth from the first meeting to the final evening.",
         },
         {
            id: 3,
            name: "Arjun Mehta",
            role: "Corporate Client",
            quote:
               "Professional, creative and extremely organised. Our corporate event was executed perfectly.",
         },
      ],
   },

   contactSection: {
      badge: "Let's Create",
      title: "Planning Something",
      description:
         "Tell us about your event and let's start creating something unforgettable together.",
      buttonText: "Start Planning",
      phone: "+91 98765 43210",
      email: "hello@lumiereevents.com",
      address: "Mumbai, Maharashtra",
      whatsapp: "919876543210",
   },

   footerSection: {
      description:
         "Luxury weddings, celebrations and experiences thoughtfully designed around you.",
      copyright: "© 2026 Lumière Events. All rights reserved.",
   },

   socialLinks: {
      instagram: "#",
      facebook: "#",
   },
};

export default function EventPlanningTemplate({
   data = defaultData,
}: EventPlanningTemplateProps) {
   const [menuOpen, setMenuOpen] = useState(false);

   const services = Array.isArray(data.servicesSection?.services)
      ? data.servicesSection.services
      : [];

   const events = Array.isArray(data.eventsSection?.events)
      ? data.eventsSection.events
      : [];

   const steps = Array.isArray(data.processSection?.steps)
      ? data.processSection.steps
      : [];

   const testimonials = Array.isArray(
      data.testimonialsSection?.testimonials
   )
      ? data.testimonialsSection.testimonials
      : [];

   const scrollTo = (id: string) => {
      setMenuOpen(false);

      document.getElementById(id)?.scrollIntoView({
         behavior: "smooth",
      });
   };

   const openWhatsApp = () => {
      window.open(
         `https://wa.me/${data.contactSection.whatsapp}`,
         "_blank"
      );
   };

   return (
      <main className="min-h-screen bg-[#f8f6f2] text-[#25221e]">
         {/* NAVBAR */}
         <nav className="fixed left-1/2 top-5 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-full border border-black/5 bg-white/90 px-5 py-3 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between">
               <button
                  onClick={() => scrollTo("home")}
                  className="flex items-center gap-3"
               >
                  {data.basicInfo.logo ? (
                     <img
                        src={data.basicInfo.logo}
                        alt={data.basicInfo.companyName}
                        className="h-9 w-auto"
                     />
                  ) : (
                     <div>
                        <div className="font-serif text-xl tracking-wide">
                           {data.basicInfo.companyName}
                        </div>
                     </div>
                  )}
               </button>

               <div className="hidden items-center gap-7 text-sm md:flex">
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("home")}>Home</button>
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("about")}>About</button>
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("services")}>
                     Services
                  </button>
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("events")}>Our Work</button>
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("process")}>Process</button>
                  <button className="transition-colors hover:text-black/50" onClick={() => scrollTo("contact")}>Contact</button>
               </div>

               <button
                  onClick={openWhatsApp}
                  className="hidden rounded-full bg-[#25221e] px-5 py-2.5 text-sm text-white md:block"
               >
                  Plan Your Event
               </button>

               <button
                  className="md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
               >
                  {menuOpen ? <X /> : <Menu />}
               </button>
            </div>

            {menuOpen && (
               <div className="mt-4 border-t border-black/10 pt-4 md:hidden">
                  <div className="flex flex-col gap-4 text-sm">
                     <button onClick={() => scrollTo("home")}>Home</button>
                     <button onClick={() => scrollTo("about")}>About</button>
                     <button onClick={() => scrollTo("services")}>
                        Services
                     </button>
                     <button onClick={() => scrollTo("events")}>
                        Our Work
                     </button>
                     <button onClick={() => scrollTo("process")}>
                        Process
                     </button>
                     <button onClick={() => scrollTo("contact")}>
                        Contact
                     </button>
                  </div>
               </div>
            )}
         </nav>

         {/* HERO */}
         <section
            id="home"
            className="relative min-h-[75vh] scroll-mt-32 overflow-hidden"
         >
            <img
               src={data.heroSection.image}
               alt={data.heroSection.imageLabel}
               className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="relative mx-auto flex min-h-[75vh] max-w-[1440px] items-end px-4 pb-14 pt-28 lg:px-6">
               <div className="max-w-3xl text-white">
                  <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/75">
                     {data.heroSection.badge}
                  </p>

                  <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-8xl">
                     {data.heroSection.title}
                     <br />
                     <span className="italic">
                        {data.heroSection.highlight}
                     </span>
                  </h1>

                  <p className="mt-7 max-w-xl text-base leading-7 text-white/80">
                     {data.heroSection.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                     <button
                        onClick={() => scrollTo("contact")}
                        className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm text-black"
                     >
                        {data.heroSection.primaryButtonText}
                        <ArrowRight size={16} />
                     </button>

                     <button
                        onClick={() => scrollTo("events")}
                        className="rounded-full border border-white/40 px-6 py-3 text-sm text-white"
                     >
                        {data.heroSection.secondaryButtonText}
                     </button>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-8 right-8 hidden rounded-2xl bg-white/10 px-5 py-4 text-white backdrop-blur md:block">
               <p className="text-xs uppercase tracking-widest text-white/60">
                  Featured
               </p>
               <p className="mt-1 text-sm">{data.heroSection.imageLabel}</p>
            </div>
         </section>

         {/* ABOUT */}
         <section
            id="about"
            className="mx-auto max-w-[1440px] scroll-mt-32 px-4 py-20 lg:px-6"
         >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
               <div className="overflow-hidden rounded-[32px]">
                  <img
                     src={data.aboutSection.image}
                     alt={data.aboutSection.title}
                     className="h-[500px] w-full object-cover"
                  />
               </div>

               <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                     {data.aboutSection.badge}
                  </p>

                  <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                     {data.aboutSection.title}
                     <br />
                     <span className="italic">
                        {data.aboutSection.highlight}
                     </span>
                  </h2>

                  <p className="mt-6 max-w-xl leading-7 text-black/60">
                     {data.aboutSection.description}
                  </p>

                  <div className="mt-10 grid grid-cols-3 gap-5 border-t border-black/10 pt-8">
                     <div>
                        <p className="font-serif text-3xl">
                           {data.aboutSection.stat1Number}
                        </p>
                        <p className="mt-1 text-xs text-black/45">
                           {data.aboutSection.stat1Label}
                        </p>
                     </div>

                     <div>
                        <p className="font-serif text-3xl">
                           {data.aboutSection.stat2Number}
                        </p>
                        <p className="mt-1 text-xs text-black/45">
                           {data.aboutSection.stat2Label}
                        </p>
                     </div>

                     <div>
                        <p className="font-serif text-3xl">
                           {data.aboutSection.stat3Number}
                        </p>
                        <p className="mt-1 text-xs text-black/45">
                           {data.aboutSection.stat3Label}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* SERVICES */}
         <section
            id="services"
            className="scroll-mt-32 bg-[#25221e] px-4 py-20 text-white lg:px-6"
         >
            <div className="mx-auto max-w-[1440px]">
               <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                     {data.servicesSection.badge}
                  </p>

                  <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
                     {data.servicesSection.title}
                     <span className="italic">
                        {" "}
                        {data.servicesSection.highlight}
                     </span>
                  </h2>
               </div>

               <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {services.map((service) => (
                     <div
                        key={service.id}
                        className="rounded-[28px] border border-white/10 p-7 transition hover:bg-white/5"
                     >
                        <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                           {service.icon === "calendar" ? (
                              <Calendar size={18} />
                           ) : (
                              <Sparkles size={18} />
                           )}
                        </div>

                        <h3 className="font-serif text-2xl">
                           {service.title}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-white/55">
                           {service.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* EVENTS */}
         <section
            id="events"
            className="mx-auto max-w-[1440px] scroll-mt-32 px-4 py-20 lg:px-6"
         >
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
               <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                     {data.eventsSection.badge}
                  </p>

                  <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
                     {data.eventsSection.title}
                     <span className="italic">
                        {" "}
                        {data.eventsSection.highlight}
                     </span>
                  </h2>
               </div>

               <p className="max-w-md text-sm leading-6 text-black/50">
                  Every event is created around the people, place and story
                  behind it.
               </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
               {events.map((event, index) => (
                  <div
                     key={event.id}
                     className={`group relative overflow-hidden rounded-[30px] ${index === 0 ? "md:row-span-2" : ""
                        }`}
                  >
                     <img
                        src={event.image}
                        alt={event.title}
                        className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0 ? "h-[650px]" : "h-[310px]"
                           }`}
                     />

                     <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                     <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                        <p className="text-xs uppercase tracking-widest text-white/60">
                           {event.category}
                        </p>

                        <h3 className="mt-2 font-serif text-3xl">
                           {event.title}
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-sm text-white/65">
                           <MapPin size={14} />
                           {event.location}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* PROCESS */}
         <section
            id="process"
            className="scroll-mt-32 border-y border-black/10 bg-white px-4 py-20 lg:px-6"
         >
            <div className="mx-auto max-w-[1440px]">
               <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                     {data.processSection.badge}
                  </p>

                  <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                     {data.processSection.title}
                  </h2>

                  <p className="mx-auto mt-6 max-w-md leading-7 text-black/55">
                     {data.processSection.description}
                  </p>
               </div>

               <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step) => (
                     <div
                        key={step.number}
                        className="rounded-[24px] border border-black/10 bg-[#f8f6f2] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                     >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25221e] font-serif text-lg text-white">
                           {step.number}
                        </div>

                        <h3 className="mt-8 font-serif text-2xl">
                           {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-black/55">
                           {step.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* TESTIMONIALS */}
         <section className="mx-auto max-w-[1440px] px-4 py-20 lg:px-6">
            <div className="text-center">
               <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                  {data.testimonialsSection.badge}
               </p>

               <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl sm:text-5xl">
                  {data.testimonialsSection.title}
                  <span className="italic">
                     {" "}
                     {data.testimonialsSection.highlight}
                  </span>
               </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
               {testimonials.map((testimonial) => (
                  <div
                     key={testimonial.id}
                     className="rounded-[28px] bg-white p-7 shadow-sm"
                  >
                     <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((item) => (
                           <Sparkles key={item} size={13} />
                        ))}
                     </div>

                     <p className="mt-6 font-serif text-xl leading-8">
                        “{testimonial.quote}”
                     </p>

                     <div className="mt-8 border-t border-black/10 pt-5">
                        <p className="text-sm font-medium">
                           {testimonial.name}
                        </p>

                        <p className="mt-1 text-xs text-black/45">
                           {testimonial.role}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* CONTACT */}
         <section
            id="contact"
            className="scroll-mt-32 bg-[#d9d0c2] px-4 py-20 lg:px-6"
         >
            <div className="mx-auto max-w-[1440px] text-center">
               <p className="text-xs uppercase tracking-[0.3em] text-black/45">
                  {data.contactSection.badge}
               </p>

               <h2 className="mt-5 font-serif text-5xl sm:text-6xl">
                  {data.contactSection.title}
               </h2>

               <p className="mx-auto mt-6 max-w-xl leading-7 text-black/60">
                  {data.contactSection.description}
               </p>

               <button
                  onClick={openWhatsApp}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25221e] px-7 py-3.5 text-sm text-white"
               >
                  {data.contactSection.buttonText}
                  <ArrowRight size={16} />
               </button>

               <div className="mt-12 grid gap-6 border-t border-black/10 pt-8 sm:grid-cols-3">
                  <div className="flex flex-col items-center gap-2">
                     <Phone size={18} />
                     <span className="text-sm">
                        {data.contactSection.phone}
                     </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                     <Mail size={18} />
                     <span className="text-sm">
                        {data.contactSection.email}
                     </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                     <MapPin size={18} />
                     <span className="text-sm">
                        {data.contactSection.address}
                     </span>
                  </div>
               </div>
            </div>
         </section>

         {/* FOOTER */}
         <footer className="bg-[#25221e] px-4 py-12 text-white lg:px-6">
            <div className="mx-auto max-w-[1440px]">
               <div className="grid gap-10 md:grid-cols-3">
                  <div>
                     <h3 className="font-serif text-2xl">
                        {data.basicInfo.companyName}
                     </h3>

                     <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                        {data.footerSection.description}
                     </p>
                  </div>

                  <div>
                     <p className="text-xs uppercase tracking-widest text-white/40">
                        Contact
                     </p>

                     <div className="mt-4 space-y-3 text-sm text-white/60">
                        <p>{data.contactSection.phone}</p>
                        <p>{data.contactSection.email}</p>
                        <p>{data.contactSection.address}</p>
                     </div>
                  </div>

                  <div>
                     <p className="text-xs uppercase tracking-widest text-white/40">
                        Follow
                     </p>

                     <div className="mt-4 flex gap-3">
                        <a
                           href={data.socialLinks.instagram}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                        >
                           <Camera size={16} />
                        </a>

                        <a
                           href={data.socialLinks.facebook}
                           className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                        >
                           <span className="text-sm font-semibold" aria-hidden="true">
                              f
                           </span>
                           <span className="sr-only">Facebook</span>
                        </a>
                     </div>
                  </div>
               </div>

               <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/35">
                  {data.footerSection.copyright}
               </div>
            </div>
         </footer>

         {/* FLOATING WHATSAPP */}
         <button
            onClick={openWhatsApp}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25221e] text-white shadow-xl"
            aria-label="Contact on WhatsApp"
         >
            <Phone size={20} />
         </button>
      </main>
   );
}