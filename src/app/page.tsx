'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react'
import { toolsList, toolCategories } from '@/data/tools'
import ToolCard from '@/components/ToolCard'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredTools = toolsList.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-10">
      {/* HERO SECTION */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-2">
        <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200/80 px-3.5 py-1.5 rounded-full text-green-700 text-xs font-bold shadow-2xs">
          <Sparkles size={14} className="text-green-600 animate-pulse" />
          <span>Free Web Tools Hub • 100% Client-Side Privacy</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.18]">
          Supercharge Your Workflow with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Free Premium Web Tools</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Free browser-based utility suite for digital marketers, creators, and business owners. Generate Meta ad copies, calculate ROAS/ROI, build WhatsApp click-to-chat links, and convert PDFs—all 100% locally.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-md mx-auto relative pt-1">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. PDF, WhatsApp, ROI, Ad Copy)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold placeholder-slate-400 focus-ring shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-4 border-t border-slate-100">
          <div className="text-center">
            <span className="block text-xl font-extrabold text-green-600">100%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Free & Secure</span>
          </div>
          <div className="text-center border-x border-slate-100">
            <span className="block text-xl font-extrabold text-green-600">Client-Side</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Browser Processing</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-extrabold text-green-600">Unlimited</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Daily Usage</span>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200/80 pb-4 gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>All Web Utilities</span>
              <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">{filteredTools.length} Tools</span>
            </h2>
            <p className="text-xs text-slate-500">Filter tools by category or launch directly</p>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                selectedCategory === 'All'
                  ? 'bg-green-600 text-white border-green-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Tools
            </button>
            {toolCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white border-green-600 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TOOLS GRID */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl space-y-2">
            <Search size={32} className="mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No tools matched your search "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-bold text-green-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* WHY CHOOSE US / SECURITY SUMMARY */}
      <section className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="text-green-600" size={22} />
          <span>Safe, Private, and Secure Browser Tools</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          At <strong>Risala Digital Tools Hub</strong>, privacy is our top priority. All tools processing images, text, and data work entirely client-side using JavaScript inside your own browser window. We never upload your images, text, PDFs, or private values to any external server. You get lightning-fast local processing with zero security risks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-green-100">
          <div>
            <h4 className="font-extrabold text-xs text-slate-900 mb-1">Instant Generation</h4>
            <p className="text-[11px] text-slate-500">Zero loading states or server delay. Get your links, names, and metrics immediately.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-slate-900 mb-1">Mobile Optimized</h4>
            <p className="text-[11px] text-slate-500">All tools are fully responsive and work seamlessly on mobile, tablet, and desktop.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-slate-900 mb-1">Top-Tier Performance</h4>
            <p className="text-[11px] text-slate-500">Ultra-lightweight Next.js code, zero bloat, ensuring maximum page load speeds.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
