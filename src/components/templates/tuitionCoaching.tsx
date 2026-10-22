"use client"

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react"
import { motion } from "framer-motion"

const classroomFallback = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16332f"/>
      <stop offset="55%" stop-color="#2f6f63"/>
      <stop offset="100%" stop-color="#f4c95d"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect x="96" y="120" width="1008" height="560" rx="36" fill="#ffffff" opacity=".16"/>
  <rect x="160" y="185" width="880" height="330" rx="24" fill="#102522" opacity=".64"/>
  <text x="218" y="310" fill="#f8f1df" font-family="Georgia, serif" font-size="70">Focused Learning</text>
  <text x="222" y="378" fill="#f4c95d" font-family="Arial, sans-serif" font-size="30" letter-spacing="7">JEE + NEET + BOARDS</text>
  <circle cx="255" cy="640" r="54" fill="#f8f1df" opacity=".82"/>
  <circle cx="420" cy="640" r="54" fill="#f8f1df" opacity=".72"/>
  <circle cx="585" cy="640" r="54" fill="#f8f1df" opacity=".62"/>
  <path d="M0 770 C230 705 460 820 720 745 C930 685 1065 720 1200 675 L1200 900 L0 900 Z" fill="#0d211e" opacity=".45"/>
</svg>
`)}`

const defaultHeroImage =
  "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1400"

const courses = [
  {
    title: "JEE Main & Advanced",
    desc: "Concept-first Physics, Chemistry, and Maths coaching for Classes 11-12 and repeaters.",
    meta: "2 year, 1 year, crash batches",
    icon: Target,
  },
  {
    title: "NEET UG",
    desc: "NCERT-backed Biology, Chemistry, and Physics preparation with regular test analysis.",
    meta: "Offline + hybrid batches",
    icon: Trophy,
  },
  {
    title: "Foundation 8-10",
    desc: "Maths and Science support for CBSE, ICSE, and State Board students.",
    meta: "School exam + olympiad focus",
    icon: BookOpen,
  },
  {
    title: "CUET & Commerce",
    desc: "Accountancy, Economics, Business Studies, English, and aptitude training.",
    meta: "Weekend and weekday options",
    icon: GraduationCap,
  },
]

const outcomes = [
  "Weekly tests with parent reports",
  "Small batches of 20-25 students",
  "Doubt counters after every class",
  "Recorded class access for revision",
]

const schedule = [
  { batch: "Class 9-10 Foundation", time: "Mon, Wed, Fri | 5:00 PM" },
  { batch: "JEE 2027 Morning Batch", time: "Tue, Thu, Sat | 7:00 AM" },
  { batch: "NEET 2026 Evening Batch", time: "Mon to Fri | 6:30 PM" },
]

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "JEE Main 98.6 percentile",
    text: "The test discussions helped me understand exactly where I was losing marks.",
  },
  {
    name: "Nandini Iyer",
    role: "Class 10 CBSE 96%",
    text: "The teachers made Maths and Science feel structured instead of scary.",
  },
]

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
}

type TuitionTemplateData = {
  basicInfo?: Record<string, string>
  contact?: Record<string, string>
  footer?: Record<string, string>
  heroSection?: Record<string, string>
  timings?: Record<string, string>
}

export default function TuitionCoachingTemplate({
  data,
}: {
  data?: TuitionTemplateData
}) {
  const basic = data?.basicInfo || {}
  const contact = data?.contact || {}
  const footer = data?.footer || {}
  const hero = data?.heroSection || {}
  const timings = data?.timings || {}

  const academyName = basic.name || "Udaan Academy"
  const tagline = basic.tagline || "Tuition & Coaching"
  const aboutUs =
    basic.aboutUs ||
    "Udaan Academy helps Indian students prepare for JEE, NEET, CUET, Boards, and Foundation courses through small batches, strong teachers, weekly tests, and practical parent communication."
  const address = contact.address || "2nd Floor, MG Road, Pune, Maharashtra"
  const phone = contact.phone || "+91 98765 43210"
  const email = contact.email || ""
  const instagram = contact.instagram || ""
  const companyName = footer.companyName || academyName
  const copyright =
    footer.copyright || `(c) 2026 ${companyName}. All rights reserved.`
  const heroImage = hero.heroImage || defaultHeroImage

  const days = [
    {
      day: "Monday",
      open: timings.mondayOpen || "07:00",
      close: timings.mondayClose || "20:30",
    },
    {
      day: "Tuesday",
      open: timings.tuesdayOpen || "07:00",
      close: timings.tuesdayClose || "20:30",
    },
    {
      day: "Wednesday",
      open: timings.wednesdayOpen || "07:00",
      close: timings.wednesdayClose || "20:30",
    },
    {
      day: "Thursday",
      open: timings.thursdayOpen || "07:00",
      close: timings.thursdayClose || "20:30",
    },
    {
      day: "Friday",
      open: timings.fridayOpen || "07:00",
      close: timings.fridayClose || "20:30",
    },
    {
      day: "Saturday",
      open: timings.saturdayOpen || "08:00",
      close: timings.saturdayClose || "18:00",
    },
    {
      day: "Sunday",
      open: timings.sundayOpen || "09:00",
      close: timings.sundayClose || "13:00",
    },
  ]

  const contactItems = [
    {
      icon: MapPin,
      label: "Address",
      text: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    },
    {
      icon: Phone,
      label: "Phone",
      text: phone,
      href: `tel:${phone}`,
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

  return (
    <main className="min-h-screen bg-[#f8f1df] text-[#132623]">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-[#e7d8b8] bg-[#f8f1df]/90 backdrop-blur"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16332f] text-[#f4c95d]">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-serif text-2xl leading-none">{academyName}</p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.25em] text-[#6f756c] uppercase">
                {tagline}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#52615d] md:flex">
            <a href="#courses" className="hover:text-[#16332f]">
              Courses
            </a>
            <a href="#results" className="hover:text-[#16332f]">
              Results
            </a>
            <a href="#batches" className="hover:text-[#16332f]">
              Batches
            </a>
            <a href="#contact" className="hover:text-[#16332f]">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-[#f4c95d] px-5 py-3 text-sm font-bold text-[#132623] transition hover:bg-[#ffd96f] sm:inline-flex"
            >
              Book Demo Class
            </a>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c8a5] md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-[#f4c95d]/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e1cfa9] bg-white/70 px-4 py-2 text-sm font-semibold text-[#52615d]">
              <Sparkles className="h-4 w-4 text-[#c28f16]" />
              Admissions open for 2026-27 batches
            </div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
              Coaching that makes serious study feel clear.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52615d]">
              {aboutUs}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-full bg-[#16332f] px-6 py-4 font-semibold text-white transition hover:bg-[#244a44]"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#cdbb96] px-6 py-4 font-semibold text-[#16332f] transition hover:bg-white"
              >
                Talk to Counsellor
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] bg-[#16332f] shadow-2xl shadow-[#16332f]/20">
              <img
                src={heroImage}
                alt={`${academyName} students attending coaching class`}
                onError={(event) => {
                  event.currentTarget.src = classroomFallback
                }}
                className="aspect-[4/5] w-full object-cover opacity-90"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="absolute right-4 bottom-4 left-4 rounded-3xl bg-white/95 p-5 shadow-xl backdrop-blur md:right-8 md:bottom-8 md:left-auto md:w-72"
            >
              <p className="text-sm font-semibold text-[#52615d]">
                Latest result snapshot
              </p>
              <div className="mt-3 flex items-end gap-3">
                <span className="font-serif text-5xl">96%</span>
                <span className="pb-2 text-sm font-semibold text-[#52615d]">
                  students improved test scores in 90 days
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="results"
        className="border-y border-[#e7d8b8] bg-white/60 px-6 py-12"
      >
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {[
            ["18+", "years teaching"],
            ["6,500+", "students mentored"],
            ["42", "city toppers"],
            ["4.8/5", "parent rating"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <p className="font-serif text-4xl">{value}</p>
              <p className="mt-2 text-sm font-semibold tracking-[0.16em] text-[#69736f] uppercase">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="courses" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="mb-12 max-w-3xl">
            <p className="text-xs font-bold tracking-[0.3em] text-[#b27f14] uppercase">
              Courses
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Focused programs for school and entrance success.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <motion.article
                  key={course.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-[#e0d0ad] bg-white p-7 shadow-sm"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf3ef] text-[#16332f]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-3xl">{course.title}</h3>
                  <p className="mt-4 leading-7 text-[#5c6965]">{course.desc}</p>
                  <p className="mt-5 text-sm font-bold tracking-[0.18em] text-[#b27f14] uppercase">
                    {course.meta}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#16332f] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="text-xs font-bold tracking-[0.3em] text-[#f4c95d] uppercase">
              Why students stay consistent
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              A calm system for practice, doubt-solving, and confidence.
            </h2>
            <p className="mt-7 max-w-xl leading-8 text-white/72">
              We keep batches focused and reports simple. Students know what to
              revise, parents know where progress stands, and teachers know who
              needs extra help.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/8 p-6"
              >
                <CheckCircle2 className="mb-5 h-6 w-6 text-[#f4c95d]" />
                <p className="text-lg font-semibold">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="batches" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...reveal}>
            <p className="text-xs font-bold tracking-[0.3em] text-[#b27f14] uppercase">
              New batches
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Pick a schedule that works with school.
            </h2>
          </motion.div>

          <motion.div
            {...reveal}
            className="rounded-[2rem] bg-white p-4 shadow-sm"
          >
            {schedule.map((item) => (
              <div
                key={item.batch}
                className="flex flex-col gap-3 border-b border-[#eadfbd] px-4 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-serif text-2xl">{item.batch}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-[#69736f]">
                    <Clock3 className="h-4 w-4" />
                    {item.time}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#16332f]"
                >
                  Enquire
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="mb-12 max-w-3xl">
            <p className="text-xs font-bold tracking-[0.3em] text-[#b27f14] uppercase">
              Student stories
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Results built through steady practice.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-3xl bg-[#f8f1df] p-8"
              >
                <div className="mb-6 flex gap-1 text-[#d9a51d]">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xl leading-8 text-[#384743]">
                  &quot;{item.text}&quot;
                </p>
                <div className="mt-7">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-[#69736f]">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f1df] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div {...reveal}>
            <p className="text-xs font-bold tracking-[0.3em] text-[#b27f14] uppercase">
              Centre timings
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Visit, call, or book counselling during working hours.
            </h2>
            <p className="mt-7 max-w-xl leading-8 text-[#5c6965]">
              Parents can visit the centre, call for counselling, or plan a demo
              class around the weekly schedule.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="overflow-hidden rounded-[2rem] border border-[#e0d0ad] bg-white shadow-sm"
          >
            {days.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between gap-4 border-b border-[#eadfbd] px-6 py-4 last:border-b-0"
              >
                <span className="font-semibold">{item.day}</span>
                <span className="text-sm font-bold text-[#69736f]">
                  {item.open} - {item.close}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer id="contact" className="bg-[#132623] px-6 py-20 text-white">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c95d] text-[#132623]">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-serif text-3xl">{companyName}</span>
            </div>
            <p className="mt-6 max-w-md leading-8 text-white/70">{aboutUs}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
                  className="rounded-3xl border border-white/10 bg-white/8 p-5 transition hover:border-[#f4c95d]/50 hover:bg-white/12"
                >
                  <item.icon className="mb-4 h-5 w-5 text-[#f4c95d]" />
                  <p className="text-xs font-bold tracking-[0.24em] text-white/45 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/85">
                    {item.text}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-[#132623] shadow-2xl shadow-black/20 sm:p-8">
            <h4 className="font-serif text-3xl">Send us a message</h4>
            <div className="mt-7 space-y-4">
              {["Your name", "Email address"].map((label) => (
                <div key={label}>
                  <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-[#69736f] uppercase">
                    {label}
                  </label>
                  <input
                    type={label.includes("Email") ? "email" : "text"}
                    className="w-full rounded-2xl border border-[#e0d0ad] bg-[#f8f1df] px-4 py-3 text-sm transition outline-none focus:border-[#f4c95d] focus:bg-white"
                  />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-[#69736f] uppercase">
                  Your message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-[#e0d0ad] bg-[#f8f1df] px-4 py-3 text-sm transition outline-none focus:border-[#f4c95d] focus:bg-white"
                />
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4c95d] px-6 py-4 font-semibold text-[#132623] transition hover:bg-[#ffd96f]">
                Schedule Call
                <CalendarDays className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {copyright && (
          <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/35">
            {copyright}
          </div>
        )}
      </footer>
    </main>
  )
}
