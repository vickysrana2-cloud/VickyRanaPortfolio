'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '@/data/profile';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Please select or enter a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000, 'Message is too long'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'Job Opportunity / Full-time Role',
      message: '',
      honeypot: '',
    },
  });

  const messageValue = watch('message') || '';

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('loading');
    setStatusMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus('success');
        setStatusMessage(result.message);
        try {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
        reset();
      } else {
        setSubmissionStatus('error');
        setStatusMessage(result.message || 'Failed to submit form. Please verify the input.');
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage('Network communication error. Please try again or email directly.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="w-full rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 p-6 sm:p-8 relative overflow-hidden">
      {/* Specular top highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/25 to-transparent pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Send a Direct Message
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Expected response time: Usually within 24 hours.
          </p>
        </div>

        {/* Copy email quick button */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl liquid-btn-secondary text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
          title="Click to copy email address"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedEmail ? 'Copied to clipboard!' : 'Copy Email'}</span>
        </button>
      </div>

      {/* Success State Notification */}
      {submissionStatus === 'success' && (
        <div className="mb-6 p-4 rounded-2xl liquid-glass-subtle border border-emerald-500/40 text-emerald-400 flex items-start gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-emerald-500 dark:text-emerald-400">Message Sent Successfully!</h3>
            <p className="text-xs text-muted-foreground">{statusMessage}</p>
            <button
              onClick={() => setSubmissionStatus('idle')}
              className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 hover:underline pt-1 block"
            >
              Send another message
            </button>
          </div>
        </div>
      )}

      {/* Error State Notification */}
      {submissionStatus === 'error' && (
        <div className="mb-6 p-4 rounded-2xl liquid-glass-subtle border border-rose-500/40 text-rose-400 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <h3 className="font-bold text-sm text-rose-500 dark:text-rose-400">Submission Error</h3>
            <p className="text-xs text-muted-foreground">{statusMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Anti-spam honeypot (hidden from real users) */}
        <input
          type="text"
          {...register('honeypot')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-foreground mb-1.5">
              Your Name <span className="text-indigo-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              {...register('name')}
              className={cn(
                'w-full px-3.5 py-2.5 rounded-xl liquid-glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all',
                errors.name ? 'border-rose-500/60' : ''
              )}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5">
              Your Email Address <span className="text-indigo-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. alex@company.com"
              {...register('email')}
              className={cn(
                'w-full px-3.5 py-2.5 rounded-xl liquid-glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all',
                errors.email ? 'border-rose-500/60' : ''
              )}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Subject */}
        <div>
          <label htmlFor="subject" className="block text-xs font-semibold text-foreground mb-1.5">
            Subject / Discussion Topic <span className="text-indigo-500">*</span>
          </label>
          <select
            id="subject"
            {...register('subject')}
            className={cn(
              'w-full px-3.5 py-2.5 rounded-xl liquid-glass-input text-sm text-foreground focus:outline-none transition-all',
              errors.subject ? 'border-rose-500/60' : ''
            )}
          >
            <option value="Job Opportunity / Full-time Role" className="bg-background text-foreground">Job Opportunity / Full-time Role</option>
            <option value="Contract / Freelance Engineering" className="bg-background text-foreground">Contract / Freelance Engineering</option>
            <option value="Project Collaboration" className="bg-background text-foreground">Project Collaboration</option>
            <option value="Technical Consultation" className="bg-background text-foreground">Technical Consultation</option>
            <option value="General Inquiries" className="bg-background text-foreground">General Inquiries</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-xs text-rose-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Row 3: Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-foreground">
              Message <span className="text-indigo-500">*</span>
            </label>
            <span className="text-[11px] font-mono text-muted-foreground">
              {messageValue.length} / 3000 chars
            </span>
          </div>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about your team, project requirements, or what you'd like to achieve..."
            {...register('message')}
            className={cn(
              'w-full px-3.5 py-2.5 rounded-xl liquid-glass-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-y min-h-[120px]',
              errors.message ? 'border-rose-500/60' : ''
            )}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submissionStatus === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl liquid-btn-primary disabled:opacity-60 text-white font-semibold text-sm transition-all"
          >
            {submissionStatus === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying and Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
