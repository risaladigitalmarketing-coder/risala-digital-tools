'use client'

import React, { useState } from 'react'
import { Globe, Search, Copy, Check, Eye, Sparkles } from 'lucide-react'
import AdSenseBanner from '@/components/AdSenseBanner'
import ToolComments from '@/components/ToolComments'
import { useUsageLimit } from '@/lib/useUsageLimit'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('https://tools.risaladigitalmarketing.com')
  const [copied, setCopied] = useState(false)

  const { incrementUsage } = useUsageLimit('meta-tag-generator')

  const metaCode = `<title>${title || 'Your Website Title Here'}</title>
<meta name="description" content="${description || 'Your SEO Meta Description Here'}" />
<meta property="og:title" content="${title || 'Your Website Title Here'}" />
<meta property="og:description" content="${description || 'Your SEO Meta Description Here'}" />
<meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary_large_image" />`

  const handleCopy = () => {
    incrementUsage()
    navigator.clipboard.writeText(metaCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-blue-100 mb-4">
            <Globe size={14} className="text-blue-200" />
            <span>SEO & OpenGraph Meta Tool</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            SEO Meta Tag Generator & Live Preview
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium">
            Generate search engine optimized meta title, meta description, and OpenGraph tags with live Google snippet preview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generator Inputs */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Meta Title</span>
              <span className={title.length > 60 ? 'text-red-500' : 'text-slate-400'}>{title.length}/60 chars</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free Digital Marketing Tools & SEO Calculators"
              className="w-full p-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold text-slate-900 outline-none transition"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Meta Description</span>
              <span className={description.length > 160 ? 'text-red-500' : 'text-slate-400'}>{description.length}/160 chars</span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Access 20+ free online utility tools for SEO, Social Media, WhatsApp Link Generation, and PDF management."
              className="w-full p-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold text-slate-900 outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold text-slate-900 outline-none transition"
            />
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-md shadow-blue-200 hover:shadow-lg transition flex items-center justify-center space-x-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Meta Tags Copied!' : 'Copy HTML Meta Tags'}</span>
          </button>
        </div>

        {/* Live Snippet Preview */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
            <Eye size={16} className="text-blue-600" />
            <span>Google Search Snippet Live Preview</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
            <div className="text-xs text-slate-600 font-normal truncate">{url}</div>
            <div className="text-base font-semibold text-blue-800 hover:underline cursor-pointer truncate">
              {title || 'Your Website Title Here'}
            </div>
            <div className="text-xs text-slate-600 font-normal line-clamp-2">
              {description || 'Your SEO Meta Description snippet will appear here as users view search result listings on Google.'}
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl text-[11px] font-mono text-blue-300 overflow-x-auto select-all">
            <pre>{metaCode}</pre>
          </div>
        </div>
      </div>

      <AdSenseBanner slotId="meta-tag-generator-bottom" />
      <ToolComments toolSlug="meta-tag-generator" />
    </div>
  )
}
