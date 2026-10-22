import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { profileData } from '@/data/profile';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact & Hire | Full-Stack Software Engineer',
  description: 'Initiate contact for full-time engineering roles, high-impact contract opportunities, or technical project collaborations.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-500 dark:text-indigo-400 text-xs font-semibold mb-4">
          <Mail className="w-4 h-4" />
          <span>Connect & Collaborate</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Let’s Build Something Exceptional
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Open to full-time engineering roles, technical consultations, and high-impact software projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Direct info, Availability, Social cards, FAQs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Availability Card */}
          <div className="p-6 sm:p-7 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 space-y-4 relative overflow-hidden">
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Current Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
                <span>Available</span>
              </span>
            </div>

            <p className="text-sm text-foreground font-medium">
              {profileData.availability.message}
            </p>

            <div className="space-y-2 pt-3 border-t border-border/70 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Location: <strong className="text-foreground">{profileData.availability.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Timezone: <strong className="text-foreground">{profileData.availability.timezone}</strong></span>
              </div>
            </div>
          </div>

          {/* Direct channels & social links */}
          <div className="p-6 sm:p-7 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 space-y-3 relative overflow-hidden">
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />

            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Direct Channels & Networks
            </h3>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="flex items-center justify-between p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 hover:border-indigo-500/40 text-foreground transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Direct Email</div>
                  <div className="text-sm font-semibold">{profileData.contact.email}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400" />
            </a>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 hover:border-indigo-500/40 text-foreground transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-100 border border-zinc-700/60 group-hover:scale-105 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">GitHub Profile</div>
                  <div className="text-sm font-semibold">Review Repositories & Code</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400" />
            </a>

            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 hover:border-indigo-500/40 text-foreground transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">LinkedIn Network</div>
                  <div className="text-sm font-semibold">Connect Professionally</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-400" />
            </a>
          </div>

          {/* Quick FAQ info */}
          <div className="p-6 sm:p-7 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 space-y-3 relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              What kind of roles do you consider?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full-Stack Developer, Software Engineer, Frontend Engineer (Next.js/React), and Backend Engineer (NestJS/Spring Boot) roles in forward-thinking engineering teams.
            </p>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
