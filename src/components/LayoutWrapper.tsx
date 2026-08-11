'use client'

import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import MobileDrawer from './MobileDrawer'
import AuthProvider from './AuthProvider'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-green-100 selection:text-green-800">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
          <Sidebar />
          
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  )
}
