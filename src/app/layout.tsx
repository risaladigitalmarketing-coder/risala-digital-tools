import type { Metadata } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'Risala Digital Tools | Free Premium Web Utilities & Marketing Calculators',
  description: 'Free browser-based tools for digital marketers, creators, and business owners. PDF toolkit, WhatsApp link generator, marketing calculators, and AI generators.',
  keywords: ['PDF Tools', 'WhatsApp Link Generator', 'Business Name Generator', 'Marketing Calculators', 'ROAS Calculator', 'AI Ad Copy'],
  metadataBase: new URL('https://tools.risaladigitalmarketing.com'),
  openGraph: {
    title: 'Risala Digital Tools',
    description: 'Free premium web utilities & marketing calculators.',
    url: 'https://tools.risaladigitalmarketing.com',
    siteName: 'Risala Digital Tools',
    locale: 'en_US',
    type: 'website',
  },
}

import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID

  return (
    <html lang="en">
      <head>
        {pubId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
