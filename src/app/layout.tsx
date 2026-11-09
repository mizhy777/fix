import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { CartProvider } from '@/lib/cart';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FIX MOBIL | Precios imperdibles en tecnología',
    template: '%s | FIX MOBIL',
  },
  description:
    'iPhone, Samsung Galaxy, iPad, Apple Watch, AirPods y accesorios originales en FIX MOBIL. Precios imperdibles, financiación y atención en C.C. River Plaza, local 229.',
  keywords: [
    'FIX MOBIL',
    'iPhone Cúcuta',
    'Samsung Cúcuta',
    'Apple Watch',
    'AirPods',
    'tecnología Cúcuta',
    'River Plaza',
  ],
  openGraph: {
    title: 'FIX MOBIL | Precios imperdibles',
    description:
      'Equipos nuevos, originales y con garantía. Financiación disponible en C.C. River Plaza, local 229.',
    url: '/',
    siteName: 'FIX MOBIL',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: '/brand/og-fixmobil.jpg', width: 1200, height: 630, alt: 'FIX MOBIL' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIX MOBIL | Precios imperdibles',
    description: 'iPhone, Samsung, iPad, Watch, AirPods y accesorios originales.',
    images: ['/brand/og-fixmobil.jpg'],
  },
  icons: {
    icon: '/brand/fix-mobil-icon.png',
    apple: '/brand/fix-mobil-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#081326',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
