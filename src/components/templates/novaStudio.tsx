"use client"

import {
  ArrowRight,
  BarChart3,
  Globe,
  Layers3,
  Sparkles,
  Star,
} from "lucide-react"

import { motion } from "framer-motion"

export default function NovaStudioTemplate() {
  const services = [
    {
      icon: <Layers3 className="h-6 w-6" />,
      title: "Product Design",
      desc: "Clean and modern interfaces focused on conversions and user experience.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Development",
      desc: "Fast and scalable web applications built with modern technologies.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Growth Strategy",
      desc: "Data-driven campaigns that help brands scale with confidence.",
    },
  ]

  const stats = [
    { value: "120+", label: "Projects Completed" },
    { value: "45+", label: "Global Clients" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "8+", label: "Years Experience" },
  ]

  return (
    <main className="overflow-hidden bg-[#07070A] text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="text-2xl font-bold tracking-tight">
            NOVA<span className="text-purple-400">.</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#testimonials" className="transition hover:text-white">
              Testimonials
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <button className="rounded-full bg-white px-5 py-2 font-medium text-black transition hover:scale-105">
            Let’s Talk
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Future-first digital studio
            </div>

            <h1 className="text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
              Building brands that feel{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                futuristic.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
              We create premium digital experiences for startups, agencies, and
              ambitious businesses that want to stand out online.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-medium transition hover:bg-purple-500">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10">
                View Work
              </button>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 blur-3xl" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Revenue Growth</p>
                  <h3 className="mt-2 text-3xl font-bold">+284%</h3>
                </div>

                <div className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
                  Live Analytics
                </div>
              </div>

              <div className="space-y-5">
                <div className="h-20 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/20 to-indigo-500/20" />
                <div className="grid grid-cols-2 gap-5">
                  <div className="h-32 rounded-2xl border border-white/10 bg-white/5" />
                  <div className="h-32 rounded-2xl border border-white/10 bg-white/5" />
                </div>
                <div className="h-24 rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/5 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 font-medium text-purple-400">OUR SERVICES</p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Designed to help modern brands grow faster.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-purple-500/40"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                  {service.icon}
                </div>

                <h3 className="mb-4 text-2xl font-semibold">{service.title}</h3>

                <p className="leading-relaxed text-zinc-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-medium text-purple-400">WHY CHOOSE US</p>

            <h2 className="text-4xl leading-tight font-bold md:text-5xl">
              We blend creativity with scalable technology.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Our team focuses on building visually stunning experiences that
              are also optimized for performance, engagement, and long-term
              growth.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Premium UI/UX experiences",
                "Fast performance architecture",
                "Scalable development systems",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-purple-400" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">
              <div className="flex h-full items-center justify-center rounded-[30px] border border-white/10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                <div className="text-center">
                  <div className="text-7xl font-bold">UI</div>
                  <p className="mt-4 text-zinc-400">Premium Interface System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i}>
              <h3 className="text-5xl font-bold">{stat.value}</h3>

              <p className="mt-3 text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <p className="mb-4 font-medium text-purple-400">TESTIMONIALS</p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Trusted by ambitious teams worldwide.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-6 flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="leading-relaxed text-zinc-300">
                  “The entire experience felt premium from start to finish. The
                  design quality and development speed were exceptional.”
                </p>

                <div className="mt-8">
                  <h4 className="font-semibold">Olivia Carter</h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    Founder, VisionFlow
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-purple-600 to-indigo-600 p-12 text-center md:p-20">
            <h2 className="text-4xl leading-tight font-bold md:text-6xl">
              Let’s build something unforgettable.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Ready to elevate your digital presence with a premium modern
              website experience?
            </p>

            <button className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
              Book a Free Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 md:flex-row">
          <div>
            <div className="text-2xl font-bold">
              NOVA<span className="text-purple-400">.</span>
            </div>

            <p className="mt-3 text-zinc-500">
              Premium digital experiences for modern brands.
            </p>
          </div>

          <div className="text-sm text-zinc-500">
            © 2026 NOVA Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
