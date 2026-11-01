import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutShell } from '@/components/layout-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://portfolio.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VickyRanaDev | Full-Stack Software Developer & System Architect',
    template: '%s | VickyRanaDev',
  },
  description:
    'VickyRanaDev – Official developer portfolio of Vicky Rana. Specialized in Next.js, React, TypeScript, Java, Spring Boot, MySQL, and modern web architectures.',
  keywords: [
    'VickyRanaDev',
    'Vicky Rana',
    'Full Stack Developer',
    'Software Engineer Portfolio',
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Spring Boot',
    'MySQL',
    'Tailwind CSS',
    'Web Architecture',
    'Interactive Browser Games',
    'Website Templates',
  ],
  authors: [{ name: 'Vicky Rana (VickyRanaDev)' }],
  creator: 'Vicky Rana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'VickyRanaDev | Full-Stack Software Developer & System Architect',
    description:
      'VickyRanaDev – Explore featured projects, live interactive arcade games, responsive templates, and engineering experience.',
    siteName: 'VickyRanaDev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Software Engineer & System Architect | Portfolio',
    description:
      'High-performance web applications, interactive arcade, and cloud backends.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '256x256', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-indigo-500/20 selection:text-indigo-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
