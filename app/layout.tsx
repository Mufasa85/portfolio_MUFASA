import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const inter = localFont({
  src: './fonts/inter-var.woff2',
  variable: '--font-sans',
  weight: '300 700',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

const instrumentSerif = localFont({
  src: [
    { path: './fonts/instrument-serif.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const geistMono = localFont({
  src: './fonts/geist-mono-var.woff2',
  variable: '--font-mono',
  weight: '300 600',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://randymusafiri.com'),
  title: {
    default: 'Randy Musafiri — Creative Developer & Frontend Engineer',
    template: '%s — Randy Musafiri',
  },
  description:
    'Portfolio de Randy Musafiri : développement créatif, ingénierie frontend et expériences interactives. Une journée entière à travers la savane.',
  keywords: [
    'Randy Musafiri',
    'creative developer',
    'frontend engineer',
    'interactive experiences',
    'portfolio',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Randy Musafiri', url: 'https://randymusafiri.com' }],
  creator: 'Randy Musafiri',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://randymusafiri.com',
    siteName: 'The Kingdom Within',
    title: 'Randy Musafiri — Creative Developer & Frontend Engineer',
    description:
      'Une journée entière à travers la savane : développement créatif, ingénierie frontend et expériences interactives.',
    images: [
      {
        url: '/images/scene-hero.webp',
        width: 1376,
        height: 768,
        alt: 'Éléphants traversant la savane au lever du soleil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Randy Musafiri — Creative Developer & Frontend Engineer',
    description: 'Développement créatif, ingénierie frontend et expériences interactives.',
    images: ['/images/scene-hero.webp'],
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
