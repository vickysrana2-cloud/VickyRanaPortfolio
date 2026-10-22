"use client"

import React, { useEffect, useState } from "react"
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Dumbbell,
  Flame,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const fitnessFallback = (
  title: string,
  subtitle: string,
  from = "#111827",
  to = "#ea580c"
) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="54%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="76%" cy="18%" r="38%">
      <stop offset="0%" stop-color="#fde68a" stop-opacity=".75"/>
      <stop offset="100%" stop-color="#fde68a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect width="1200" height="900" fill="url(#glow)"/>
  <path d="M0 682 C180 598 350 710 530 620 C710 530 880 610 1200 470 L1200 900 L0 900 Z" fill="#020617" opacity=".48"/>
  <path d="M240 475 h720 v72 H240z" fill="#f8fafc" opacity=".88"/>
  <circle cx="206" cy="511" r="72" fill="#f97316"/>
  <circle cx="994" cy="511" r="72" fill="#f97316"/>
  <text x="78" y="155" fill="#ffffff" font-family="Arial, sans-serif" font-size="78" font-weight="800">${title}</text>
  <text x="84" y="218" fill="#fed7aa" font-family="Arial, sans-serif" font-size="28" letter-spacing="8">${subtitle}</text>
</svg>
`)}`

const images = {
  hero: {
    src: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1600",
    fallback: fitnessFallback("Iron Culture", "MUMBAI FITNESS CLUB"),
  },
  training: {
    src: "https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallback: fitnessFallback(
      "Strength Lab",
      "COACH LED TRAINING",
      "#0f172a",
      "#dc2626"
    ),
  },
  yoga: {
    src: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallback: fitnessFallback(
      "Mobility",
      "YOGA + RECOVERY",
      "#064e3b",
      "#f97316"
    ),
  },
  boxing: {
    src: "https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallback: fitnessFallback(
      "HIIT Arena",
      "BOXING + CONDITIONING",
      "#111827",
      "#e11d48"
    ),
  },
}

const programs = [
  {
    title: "Strength Training",
    text: "Progressive lifting plans, form checks, and coach-led compound movement sessions.",
    icon: Dumbbell,
    image: images.training,
  },
  {
    title: "HIIT & Boxing",
    text: "Fast-paced conditioning classes built for fat loss, endurance, and athletic confidence.",
    icon: Flame,
    image: images.boxing,
  },
  {
    title: "Yoga & Mobility",
    text: "Morning flow, assisted stretching, breath work, and recovery sessions for everyday athletes.",
    icon: HeartPulse,
    image: images.yoga,
  },
]

const stats = [
  { value: "18k+", label: "member check-ins" },
  { value: "42", label: "weekly classes" },
  { value: "14", label: "certified coaches" },
  { value: "4.9", label: "Google rating" },
]

const schedule = [
  {
    time: "6:00 AM",
    name: "Sunrise Strength",
    coach: "Aarav",
    level: "All levels",
  },
  { time: "8:00 AM", name: "Power Yoga", coach: "Meera", level: "Beginner" },
  { time: "6:30 PM", name: "HIIT Burn", coach: "Kabir", level: "Intermediate" },
  { time: "8:00 PM", name: "Boxing Circuit", coach: "Riya", level: "Advanced" },
]

const plans = [
  {
    name: "Starter",
    price: "Rs. 1,999",
    desc: "Gym floor access, starter assessment, and two group classes.",
  },
  {
    name: "Performance",
    price: "Rs. 3,499",
    desc: "Unlimited gym access, all group classes, and monthly progress review.",
    featured: true,
  },
  {
    name: "Transformation",
    price: "Rs. 7,999",
    desc: "Personal training, nutrition check-ins, mobility sessions, and body composition tracking.",
  },
]

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.72, ease: "easeOut" as const },
}

type FitnessTemplateData = {
  basicInfo?: Record<string, string>
  contact?: Record<string, string>
  footer?: Record<string, string>
  heroSection?: Record<string, string>
  timings?: Record<string, string>
}

function SafeImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string
  fallback: string
  alt: string
  className: string
}) {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(fallback)}
    />
  )
}

export const FitnessGymTemplate: React.FC<{ data?: FitnessTemplateData }> = ({
  data,
}) => {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, 120])
  const heroScale = useTransform(scrollYProgress, [0, 0.32], [1.06, 1])
  const [activeProgram, setActiveProgram] = useState(0)

  const basic = data?.basicInfo || {}
  const contact = data?.contact || {}
  const footer = data?.footer || {}
  const hero = data?.heroSection || {}
  const timings = data?.timings || {}

  const gymName = basic.name || "Iron Culture"
  const tagline = basic.tagline || "Mumbai Gym"
  const aboutUs =
    basic.aboutUs ||
    "A premium fitness and gym template for Indian studios with group classes, personal coaching, transformation plans, and high-energy visual sections."
  const address = contact.address || "Lower Parel, Mumbai"
  const phone = contact.phone || "+91 98765 43210"
  const email = contact.email || ""
  const instagram = contact.instagram || ""
  const companyName = footer.companyName || gymName
  const copyright =
    footer.copyright || `(c) 2026 ${companyName}. All rights reserved.`
  const heroImage = hero.heroImage || images.hero.src

  const days = [
    {
      day: "Monday",
      open: timings.mondayOpen || "06:00",
      close: timings.mondayClose || "22:00",
    },
    {
      day: "Tuesday",
      open: timings.tuesdayOpen || "06:00",
      close: timings.tuesdayClose || "22:00",
    },
    {
      day: "Wednesday",
      open: timings.wednesdayOpen || "06:00",
      close: timings.wednesdayClose || "22:00",
    },
    {
      day: "Thursday",
      open: timings.thursdayOpen || "06:00",
      close: timings.thursdayClose || "22:00",
    },
    {
      day: "Friday",
      open: timings.fridayOpen || "06:00",
      close: timings.fridayClose || "22:00",
    },
    {
      day: "Saturday",
      open: timings.saturdayOpen || "07:00",
      close: timings.saturdayClose || "21:00",
    },
    {
      day: "Sunday",
      open: timings.sundayOpen || "08:00",
      close: timings.sundayClose || "14:00",
    },
  ]

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      text: phone,
      href: `tel:${phone}`,
    },
    {
      icon: MapPin,
      label: "Address",
      text: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    },
    {
      icon: Mail,
      label: "Email",
      text: email,
      href: `mailto:${email}`,
    },
    {
      icon: Star,
      label: "Instagram",
      text: instagram ? `@${instagram.split("/").pop()}` : "",
      href: instagram,
    },
  ].filter((item) => item.text)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProgram((current) => (current + 1) % programs.length)
    }, 3200)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[#070a0f] text-white">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070a0f]/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-black shadow-lg shadow-orange-500/30">
              <Dumbbell className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-black tracking-tight">{gymName}</p>
              <p className="text-[10px] font-bold tracking-[0.28em] text-orange-300 uppercase">
                {tagline}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/72 md:flex">
            <a href="#programs" className="transition hover:text-orange-300">
              Programs
            </a>
            <a href="#schedule" className="transition hover:text-orange-300">
              Schedule
            </a>
            <a href="#plans" className="transition hover:text-orange-300">
              Plans
            </a>
            <a href="#contact" className="transition hover:text-orange-300">
              Contact
            </a>
          </nav>

          <a
            href="#plans"
            className="hidden rounded-full bg-white px-5 py-3 text-sm font-black text-[#070a0f] transition hover:bg-orange-300 lg:inline-flex"
          >
            Join now
          </a>
          <button className="rounded-full border border-white/15 p-3 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <section className="relative min-h-screen overflow-hidden pt-20">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <SafeImage
            src={heroImage}
            fallback={images.hero.fallback}
            alt="Indian fitness gym training floor"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,15,.96)_0%,rgba(7,10,15,.66)_45%,rgba(7,10,15,.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070a0f] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-5 py-16 sm:px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/35 bg-orange-400/10 px-4 py-2 text-xs font-black tracking-[0.28em] text-orange-200 uppercase"
            >
              <Sparkles className="h-4 w-4" />
              Coach-led fitness in India
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: "easeOut" }}
              className="text-5xl leading-[0.95] font-black tracking-tight sm:text-7xl lg:text-8xl"
            >
              Build strength.
              <span className="block text-orange-400">Move better.</span>
              Stay consistent.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/76"
            >
              {aboutUs}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-black text-black shadow-xl shadow-orange-500/25 transition hover:bg-orange-300"
              >
                Start your trial <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#schedule"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-black text-white transition hover:border-orange-300 hover:text-orange-200"
              >
                View class schedule
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-5">
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="inline-flex min-w-max items-center gap-8 px-4 text-sm font-black tracking-[0.24em] text-white/70 uppercase"
          >
            {[...stats, ...stats, ...stats].map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="flex items-center gap-3"
              >
                <Zap className="h-4 w-4 text-orange-400" />
                {item.value} {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...reveal}>
          <p className="mb-4 text-sm font-black tracking-[0.28em] text-orange-300 uppercase">
            Why members stay
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Everything a serious local gym needs on one landing page.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/64">
            Designed for Indian gyms, boutique fitness studios, transformation
            centers, and personal training businesses that need a polished
            static website fast.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2"
        >
          {[
            { icon: ShieldCheck, title: "Form-first coaching" },
            { icon: Activity, title: "Smart progress tracking" },
            { icon: Users, title: "Friendly Indian community" },
            { icon: Trophy, title: "Visible transformation plans" },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-3xl border border-white/10 bg-[#101722] p-6"
            >
              <item.icon className="mb-5 h-8 w-8 text-orange-400" />
              <p className="text-xl font-black">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Clear section design with motion, cards, and calls to action
                ready for conversion.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="programs" className="bg-[#f5f0e8] py-24 text-[#101722]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div
            {...reveal}
            className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-4 text-sm font-black tracking-[0.28em] text-orange-600 uppercase">
                Signature programs
              </p>
              <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Pick your training lane and keep showing up.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-slate-600">
              Program cards rotate automatically, and each card has a hover lift
              for a modern template preview.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {programs.map((program, index) => (
              <motion.article
                key={program.title}
                {...reveal}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setActiveProgram(index)}
                className={`group overflow-hidden rounded-[1.75rem] border bg-white shadow-xl shadow-slate-900/5 transition ${
                  activeProgram === index
                    ? "border-orange-400"
                    : "border-slate-200"
                }`}
              >
                <div className="relative h-72 overflow-hidden">
                  <SafeImage
                    src={program.image.src}
                    fallback={program.image.fallback}
                    alt={`${program.title} class in Indian gym`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-black">
                    <program.icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-black">{program.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {program.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="schedule"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <motion.div {...reveal}>
          <p className="mb-4 text-sm font-black tracking-[0.28em] text-orange-300 uppercase">
            Today at the studio
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Daily classes that feel energetic before anyone clicks.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Lower Parel", "Andheri", "Indiranagar style", "Noida-ready"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 px-4 py-2 text-sm font-bold text-white/70"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>

        <motion.div {...reveal} className="space-y-4">
          {schedule.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"
            >
              <div className="flex items-center gap-2 text-orange-300">
                <Timer className="h-5 w-5" />
                <span className="font-black">{item.time}</span>
              </div>
              <div>
                <p className="text-xl font-black">{item.name}</p>
                <p className="mt-1 text-sm text-white/55">Coach {item.coach}</p>
              </div>
              <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm font-black text-orange-200">
                {item.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#f5f0e8] px-5 py-24 text-[#101722] sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div {...reveal}>
            <p className="mb-4 text-sm font-black tracking-[0.28em] text-orange-600 uppercase">
              Opening hours
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Train at the time that fits your routine.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Weekly studio timings are connected to the same timing fields used
              by the dynamic template data.
            </p>
            {address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#101722] px-6 py-3 font-black text-white transition hover:bg-orange-500 hover:text-black"
              >
                <MapPin className="h-5 w-5" />
                Get directions
              </a>
            )}
          </motion.div>

          <motion.div
            {...reveal}
            className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
          >
            {days.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0"
              >
                <span className="font-black">{item.day}</span>
                <span className="text-sm font-bold text-slate-600">
                  {item.open} - {item.close}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="plans" className="bg-[#101722] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <motion.div
            {...reveal}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-4 text-sm font-black tracking-[0.28em] text-orange-300 uppercase">
              Memberships
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Indian pricing blocks with clean conversion buttons.
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <motion.article
                key={plan.name}
                {...reveal}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`rounded-[1.75rem] border p-8 ${
                  plan.featured
                    ? "border-orange-400 bg-orange-500 text-black shadow-2xl shadow-orange-500/25"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <p className="text-sm font-black tracking-[0.2em] uppercase">
                  {plan.name}
                </p>
                <p className="mt-6 text-4xl font-black">{plan.price}</p>
                <p
                  className={`mt-4 leading-7 ${plan.featured ? "text-black/70" : "text-white/60"}`}
                >
                  {plan.desc}
                </p>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-black ${
                    plan.featured
                      ? "bg-black text-white"
                      : "bg-white text-[#101722]"
                  }`}
                >
                  Book trial <ArrowRight className="h-5 w-5" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <SafeImage
            src={images.training.src}
            fallback={images.training.fallback}
            alt="Fitness coaching contact background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#070a0f]/88" />
        </div>
        <motion.div
          {...reveal}
          className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div>
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500 text-black">
              <CalendarDays className="h-8 w-8" />
            </div>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
              Ready to train with {gymName}?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Send a message, call the studio, or visit the club. The contact
              details below come from the template data when available.
            </p>
            <div className="mt-9 grid gap-4 text-left sm:grid-cols-2">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-orange-300/50 hover:bg-white/[0.1]"
                >
                  <item.icon className="mb-4 h-6 w-6 text-orange-300" />
                  <p className="text-sm font-black tracking-[0.2em] text-white/45 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 font-bold text-white">{item.text}</p>
                </a>
              ))}
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <Star className="mb-4 h-6 w-6 text-orange-300" />
                <p className="text-sm font-black tracking-[0.2em] text-white/45 uppercase">
                  Trial
                </p>
                <p className="mt-2 font-bold text-white">
                  First trial class free
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white p-6 text-[#101722] shadow-2xl shadow-black/30 sm:p-8">
            <h3 className="text-3xl font-black tracking-tight">
              Send us a message
            </h3>
            <div className="mt-7 space-y-4">
              {["Your name", "Email address"].map((label) => (
                <div key={label}>
                  <label className="mb-2 block text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
                    {label}
                  </label>
                  <input
                    type={label.includes("Email") ? "email" : "text"}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
                  Your message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 font-black text-black transition hover:bg-orange-300">
                Send message <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#070a0f] px-5 py-12 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-black">
                <Dumbbell className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-black">{companyName}</p>
                <p className="text-[10px] font-bold tracking-[0.28em] text-orange-300 uppercase">
                  {tagline}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black tracking-[0.25em] text-orange-300 uppercase">
              Visit us
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              {address && (
                <li>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {address}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-white">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white">
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {instagram && (
            <div>
              <h4 className="mb-4 text-xs font-black tracking-[0.25em] text-orange-300 uppercase">
                Follow us
              </h4>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/55 hover:text-white"
              >
                Instagram: @{instagram.split("/").pop()}
              </a>
            </div>
          )}
        </div>

        {copyright && (
          <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/35">
            {copyright}
          </div>
        )}
      </footer>
    </main>
  )
}
