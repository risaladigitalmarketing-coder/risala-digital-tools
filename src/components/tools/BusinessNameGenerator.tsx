'use client'

import React, { useState } from 'react'
import { 
  Search, 
  Copy, 
  RefreshCw, 
  Check, 
  Sparkles, 
  Lightbulb, 
  Tag, 
  Target,
  BookOpen
} from 'lucide-react'
import { generateBusinessName } from '@/lib/seller-tools-ui'

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [copiedName, setCopiedName] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = [
    { label: "Cafe & Restaurant", value: "Cafe" },
    { label: "Clothing & Fashion", value: "Clothing Brand" },
    { label: "Jewellery & Accessories", value: "Jewellery Shop" },
    { label: "Travel & Tourism", value: "Travel Agency" },
    { label: "Tech & Software", value: "Tech Company" },
    { label: "Digital Marketing", value: "Digital Marketing Agency" },
    { label: "Beauty & Salon", value: "Beauty Salon" },
    { label: "Fitness & Gym", value: "Fitness Studio" },
  ]

  const handleGenerateNames = () => {
    if (!keyword) return
    setLoading(true)
    setTimeout(() => {
      const names = generateBusinessName(keyword, category)
      setGeneratedNames(names)
      setLoading(false)
    }, 300)
  }

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopiedName(name)
    setTimeout(() => setCopiedName(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Search className="text-blue-500" size={28} />
          <span>Business Name Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Generate creative, unique, and SEO-friendly business names for any industry instantly. Perfect for startups and rebranding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Describe Your Business</span>
            </h2>

            {/* Keyword Input */}
            <div className="space-y-2">
              <label htmlFor="keyword" className="text-sm font-bold text-gray-700">Primary Keyword (e.g., "Digital", "Cafe")</label>
              <input 
                id="keyword"
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Digital, Cafe, Fashion, Green" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-[11px] text-gray-400 font-medium">Enter 1-2 words that best describe your business idea or core offering.</p>
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-bold text-gray-700">Business Category (Optional)</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
              >
                <option value="">Select a category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-gray-400 font-medium">Helps generate more targeted and relevant names for your niche.</p>
            </div>

            <button
              onClick={handleGenerateNames}
              disabled={!keyword || loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{loading ? 'Generating Ideas...' : 'Generate Brand Names'}</span>
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Generated Brand Names</span>
              {generatedNames.length > 0 && (
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">{generatedNames.length} Suggestions</span>
              )}
            </h2>

            {generatedNames.length > 0 ? (
              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                {generatedNames.map((name, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:border-blue-300 transition"
                  >
                    <span className="font-bold text-gray-800 text-sm">{name}</span>
                    <button
                      onClick={() => copyToClipboard(name)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Copy Name"
                    >
                      {copiedName === name ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <Lightbulb size={40} className="mx-auto text-gray-300" />
                <p className="text-sm font-semibold text-gray-400">Enter a keyword and click generate to see business name ideas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
