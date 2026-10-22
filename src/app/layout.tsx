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

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.example.com'),
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
    url: 'https://portfolio.example.com',
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
