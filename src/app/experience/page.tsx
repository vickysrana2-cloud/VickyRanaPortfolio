import type { Metadata } from 'next';
import { experienceData, educationData } from '@/data/experience';
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Calendar,
  MapPin,
  FileText,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';

export const metadata: Metadata = {
  title: 'Professional Experience & Internships',
  description: 'Software engineering internships at Actifyzone and Havet AI, technical responsibilities, and academic qualifications in Computer Science.',
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Experience & Internships
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Verified software engineering roles and production contributions at Actifyzone and Havet AI.
          </p>

          {/* Resume Download Action */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/vickyrana_resume_fe_new.pdf"
              download="vickyrana_resume_fe_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm shadow-lg shadow-indigo-600/20"
            >
              <FileText className="w-4 h-4" />
              <span>Download Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Experience Timeline */}
      <section className="space-y-8 mb-16">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/25">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Industry Experience & Internships
              </h2>
              <p className="text-xs text-muted-foreground">
                Engineering web apps, scalable backend services, and database workflows
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          {experienceData.map((exp, idx) => (
            <ScrollReveal key={exp.id} direction="up" delay={idx * 0.15} duration={0.8}>
              <div className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-4 border-indigo-600 shadow-xs" />

                <div className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 space-y-5 relative overflow-hidden">
                  {/* Specular top highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl sm:text-2xl font-bold text-foreground">
                          {exp.role}
                        </span>
                        {exp.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-base font-semibold text-indigo-400 flex items-center gap-1.5">
                        <span>{exp.company}</span>
                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-indigo-400 transition-colors"
                            title="Visit website"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-muted-foreground font-mono space-y-1">
                      <div className="flex items-center gap-1.5 liquid-glass-pill px-3 py-1 rounded-xl border border-white/20">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 px-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Core Responsibilities */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Key Engineering Responsibilities:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Achievements */}
                  <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Impact & Milestones:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {exp.keyAchievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Technologies Utilized:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Academic Qualifications & Education */}
      <section className="space-y-8">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Education & Academic Foundation
              </h2>
              <p className="text-xs text-muted-foreground">
                Formal engineering coursework, full-stack certification, and technical studies
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {educationData.map((edu, idx) => (
            <ScrollReveal key={edu.id} direction="up" delay={idx * 0.15} duration={0.8}>
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-4 border-purple-600 shadow-xs" />

                <div className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 space-y-4 relative overflow-hidden">
                  {/* Specular top highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className="text-sm font-semibold text-purple-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground liquid-glass-pill px-3 py-1 rounded-xl border border-white/20 w-fit">
                      {edu.period}
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-emerald-400">
                    Performance: {edu.score}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Core Engineering Coursework:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.coursework.map((course, i) => (
                        <div
                          key={i}
                          className="text-xs text-muted-foreground p-2.5 rounded-xl liquid-glass-subtle border border-white/20 dark:border-white/10 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
