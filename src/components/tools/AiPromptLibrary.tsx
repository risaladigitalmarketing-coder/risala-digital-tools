'use client'

import React, { useState } from 'react'
import { Sparkles, Copy, Check, Search, Terminal, BookOpen, Layers } from 'lucide-react'
import AdSenseBanner from '@/components/AdSenseBanner'
import ToolComments from '@/components/ToolComments'
import { useUsageLimit } from '@/lib/useUsageLimit'

interface PromptItem {
  id: string
  title: string
  category: 'SEO & Copywriting' | 'Social Media' | 'Email Marketing' | 'Coding & Tech'
  prompt: string
  targetModel: 'ChatGPT' | 'Midjourney' | 'Claude'
}

const promptCatalog: PromptItem[] = [
  {
    id: 'p1',
    title: 'High-Converting Meta Ads Copy Generator',
    category: 'Social Media',
    prompt: 'Act as a world-class direct-response copywriter. Write 3 high-converting Facebook/Instagram ad variations for [Product Name]. Include a hook, problem statement, solution, benefit bullet points, and a strong Call to Action (CTA).',
    targetModel: 'ChatGPT'
  },
  {
    id: 'p2',
    title: 'SEO Optimized Blog Article Outline',
    category: 'SEO & Copywriting',
    prompt: 'Act as an expert SEO content strategist. Create an in-depth, H2/H3 structured blog post outline for the target keyword "[Keyword]". Include LSI keywords, search intent summary, and recommended word count for each section.',
    targetModel: 'ChatGPT'
  },
  {
    id: 'p3',
    title: 'Photorealistic Product Mockup Prompt',
    category: 'Social Media',
    prompt: 'High-end studio product photograph of [Product Name] on a sleek dark marble surface, soft cinematic lighting, shallow depth of field, 8k resolution, minimalist luxury aesthetic --ar 16:9 --v 6.0',
    targetModel: 'Midjourney'
  },
  {
    id: 'p4',
    title: 'Cold Email Sales Outreach Sequence',
    category: 'Email Marketing',
    prompt: 'Write a 3-step cold email outreach sequence offering [Service/Product] to B2B founders. Keep each email under 120 words, personalized, conversational, and focused on low-friction interest rather than hard pitching.',
    targetModel: 'Claude'
  },
  {
    id: 'p5',
    title: 'Code Refactoring & Performance Audit',
    category: 'Coding & Tech',
    prompt: 'Review the following [Language/Framework] code. Identify performance bottlenecks, potential memory leaks, security flaws, and rewrite it using clean code principles and modern async patterns.',
    targetModel: 'ChatGPT'
  }
]

export default function AiPromptLibrary() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState<string>('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const { usageCount, maxLimit, limitReached, incrementUsage } = useUsageLimit('ai-prompt-library')

  const categories = ['All', 'SEO & Copywriting', 'Social Media', 'Email Marketing', 'Coding & Tech']

  const filteredPrompts = promptCatalog.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.prompt.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const copyPrompt = (id: string, text: string) => {
    incrementUsage()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-indigo-100 mb-4">
            <Sparkles size={14} className="text-indigo-200" />
            <span>AI Copywriting Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            AI Prompt Copy & Paste Library
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl font-medium">
            Tested, high-converting AI prompts for ChatGPT, Midjourney, and Claude designed for digital marketers, web sellers, and developers.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts by keyword, target model, or task..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCat === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prompts Cards Grid */}
        <div className="space-y-4 mt-4">
          {filteredPrompts.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">
                    {item.targetModel}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                </div>

                <button
                  onClick={() => copyPrompt(item.id, item.prompt)}
                  className="flex items-center space-x-1.5 bg-white hover:bg-indigo-50 text-indigo-600 font-bold text-xs px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-200 shadow-2xs transition"
                >
                  {copiedId === item.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedId === item.id ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/60 text-xs font-mono text-slate-700 leading-relaxed select-all">
                {item.prompt}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSenseBanner slotId="prompt-library-bottom" />
      <ToolComments toolSlug="ai-prompt-library" />
    </div>
  )
}
