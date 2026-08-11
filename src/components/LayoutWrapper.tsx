'use client'

import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import AdSenseBanner from './AdSenseBanner'
import Footer from './Footer'
import MobileDrawer from './MobileDrawer'
import { AuthModal } from '@/lib/seller-tools-ui'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <AdSenseBanner />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="flex-1 min-w-0 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {children}
        </main>
      </div>

      <Footer />
      <AuthModal isOpen={false} onClose={() => {}} />
    </div>
  )
}
