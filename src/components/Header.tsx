'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Sparkles, Share2, Layers, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { toolCategories } from '@/data/tools'
import AuthModal from '@/components/AuthModal'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [catDropdownOpen, setCatDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Risala Digital Tools Hub',
        text: 'Free premium tools for SEO, Social Media, Marketing Calculators, WhatsApp Link Generation, and PDF Tools!',
        url: window.location.href,
      }).catch(() => {})
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('Copied link to clipboard: ' + window.location.href)
    }
  }

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm shadow-green-200 group-hover:scale-105 transition-transform">
                  RD
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-950 flex items-center gap-1.5">
                    Risala Digital
                    <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider">Tools</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase">Free Online Utility Suite</span>
                </div>
              </Link>
            </div>

            {/* Clean Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/'
                    ? 'bg-green-50 text-green-700 shadow-2xs border border-green-200/80'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                All Tools
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                  onBlur={() => setTimeout(() => setCatDropdownOpen(false), 200)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition flex items-center space-x-1.5"
                >
                  <Layers size={14} className="text-slate-400" />
                  <span>Categories</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${catDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {catDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Browse Categories
                    </div>
                    {toolCategories.map((category) => {
                      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      return (
                        <Link
                          key={category}
                          href={`/category/${slug}`}
                          className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-green-50 hover:text-green-700 transition rounded-lg mx-1"
                        >
                          <span>{category}</span>
                        </Link>
                      )
                    })}
                    <div className="border-t border-slate-100 mt-1 pt-1 mx-1">
                      <Link
                        href="/categories"
                        className="flex items-center justify-between px-3.5 py-2 text-xs font-bold text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <span>View All Categories</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/tools/pdf-tools"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname.includes('pdf-tools')
                    ? 'bg-green-50 text-green-700 shadow-2xs border border-green-200/80'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                PDF Toolkit
              </Link>

              <Link
                href="/tools/whatsapp-link-generator"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname.includes('whatsapp-link-generator')
                    ? 'bg-green-50 text-green-700 shadow-2xs border border-green-200/80'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                WhatsApp Link
              </Link>

              <Link
                href="/marketing-calculators"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  pathname.includes('marketing-calculators')
                    ? 'bg-green-50 text-green-700 shadow-2xs border border-green-200/80'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                Calculators
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-2.5">
              {session?.user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-green-50 text-green-800 px-3 py-1.5 rounded-xl border border-green-200/80 text-xs font-bold">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name || 'User'} className="w-5 h-5 rounded-full" />
                    ) : (
                      <User size={15} className="text-green-600" />
                    )}
                    <span>{session.user.name || session.user.email?.split('@')[0]}</span>
                  </div>

                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuth('signin')}
                    className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-green-700 bg-slate-100 hover:bg-green-50 px-3.5 py-2 rounded-xl border border-slate-200/80 transition"
                  >
                    <User size={14} className="text-slate-500" />
                    <span>Sign In</span>
                  </button>

                  <button
                    onClick={() => openAuth('signup')}
                    className="hidden md:inline-flex items-center space-x-1 text-xs font-extrabold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-3.5 py-2 rounded-xl shadow-xs shadow-green-200 transition"
                  >
                    <span>Sign Up</span>
                  </button>
                </>
              )}

              <button 
                onClick={handleShare}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                aria-label="Share page"
                title="Share Hub"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}
