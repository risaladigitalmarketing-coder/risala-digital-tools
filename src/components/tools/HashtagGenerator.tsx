'use client'

import React, { useState } from 'react'
import { Hash, Sparkles, Copy, Check, TrendingUp, Camera, Video, Share2, Layers } from 'lucide-react'
import AdSenseBanner from '@/components/AdSenseBanner'
import ToolComments from '@/components/ToolComments'
import { useUsageLimit } from '@/lib/useUsageLimit'

interface HashtagGroup {
  category: string
  tags: string[]
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'both'>('instagram')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<HashtagGroup[] | null>(null)
  const [copiedGroup, setCopiedGroup] = useState<string | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const { usageCount, maxLimit, limitReached, incrementUsage, isLoggedIn } = useUsageLimit('hashtag-generator')

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResults(null)

    if (!topic.trim()) {
      setError('Please enter a niche, keyword, or topic (e.g. "fitness", "digital marketing", "travel").')
      return
    }

    if (limitReached) {
      setError(`Free daily limit reached (${usageCount}/${maxLimit}). ${!isLoggedIn ? 'Please Sign In for 10 free daily uses!' : 'Daily rate limit reached.'}`)
      return
    }

    if (!incrementUsage()) {
      setError(`Free limit reached (${usageCount}/${maxLimit}). Please Sign In for higher limits!`)
      return
    }

    setLoading(true)

    setTimeout(() => {
      const cleanTopic = topic.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
      
      const generated: HashtagGroup[] = [
        {
          category: 'High Reach & Viral (Top 1% Volume)',
          tags: [
            `#${cleanTopic}`,
            `#${cleanTopic}daily`,
            `#${cleanTopic}life`,
            `#viral${cleanTopic}`,
            '#trendingnow',
            '#reelsinstagram',
            '#fyp',
            '#explorepage'
          ]
        },
        {
          category: 'Niche Targeted (High Engagement)',
          tags: [
            `#${cleanTopic}tips`,
            `#${cleanTopic}community`,
            `#${cleanTopic}marketing`,
            `#${cleanTopic}hacks`,
            '#contentcreator',
            '#smallbusinessowner',
            '#digitalmarketingtips',
            '#growthmindset'
          ]
        },
        {
          category: 'Platform Recommended (Reels & TikTok)',
          tags: [
            '#tiktokviral',
            '#instareels',
            '#foryoupage',
            '#reelsviral',
            `#${cleanTopic}gram`,
            '#contentcreation',
            '#onlinebusiness'
          ]
        }
      ]

      setResults(generated)
      setLoading(false)
    }, 600)
  }

  const copyGroup = (category: string, tags: string[]) => {
    const text = tags.join(' ')
    navigator.clipboard.writeText(text)
    setCopiedGroup(category)
    setTimeout(() => setCopiedGroup(null), 2000)
  }

  const copyAll = () => {
    if (!results) return
    const allTags = results.flatMap(r => r.tags).join(' ')
    navigator.clipboard.writeText(allTags)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-pink-100 mb-4">
            <TrendingUp size={14} className="text-pink-300" />
            <span>AI Powered Hashtag Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Instagram & TikTok Hashtag Generator
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl font-medium">
            Generate high-engagement viral hashtags for Instagram Reels, TikTok videos, Shorts, and social posts instantly.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-xl text-[11px] font-bold text-pink-200">
            <span>Daily Usage: {usageCount} / {maxLimit} Used</span>
          </div>
        </div>
      </div>

      {/* Main Generator Form */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Enter Niche, Topic, or Keyword
            </label>
            <div className="relative">
              <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. digital marketing, fitness motivation, street food..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition"
              />
            </div>
          </div>

          {/* Platform Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Select Platform Optimization
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('instagram')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition ${
                  platform === 'instagram'
                    ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Camera size={16} />
                <span>Instagram</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('tiktok')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition ${
                  platform === 'tiktok'
                    ? 'bg-purple-50 border-purple-500 text-purple-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Video size={16} />
                <span>TikTok</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('both')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition ${
                  platform === 'both'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Share2 size={16} />
                <span>Both</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-purple-200 hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate Viral Hashtags</span>
              </>
            )}
          </button>
        </form>

        {/* Results Output */}
        {results && (
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <Sparkles size={18} className="text-purple-600" />
                <span>Generated Hashtags ({results.reduce((acc, r) => acc + r.tags.length, 0)} Total)</span>
              </h3>

              <button
                onClick={copyAll}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
              >
                {copiedAll ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedAll ? 'All Copied!' : 'Copy All Hashtags'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {results.map((group) => (
                <div key={group.category} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">{group.category}</h4>
                    <button
                      onClick={() => copyGroup(group.category, group.tags)}
                      className="flex items-center space-x-1 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg transition"
                    >
                      {copiedGroup === group.category ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedGroup === group.category ? 'Copied' : 'Copy Group'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-semibold text-xs px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdSenseBanner slotId="hashtag-generator-bottom" />

      {/* Community Comments */}
      <ToolComments toolSlug="hashtag-generator" />
    </div>
  )
}
