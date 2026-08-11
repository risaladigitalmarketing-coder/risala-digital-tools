'use client'

import React, { useState } from 'react'
import { Video, Search, Download, ExternalLink, Image as ImageIcon, Sparkles, Check } from 'lucide-react'
import AdSenseBanner from '@/components/AdSenseBanner'

interface ThumbnailQuality {
  label: string
  resolution: string
  url: string
  badge: string
}

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [qualities, setQualities] = useState<ThumbnailQuality[]>([])

  const extractVideoId = (inputUrl: string): string | null => {
    const trimmed = inputUrl.trim()
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed
    }
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const match = trimmed.match(regExp)
    return match ? match[1] : null
  }

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setVideoId(null)
    setQualities([])

    if (!url.trim()) {
      setError('Please paste a valid YouTube video URL.')
      return
    }

    const id = extractVideoId(url.trim())
    if (!id) {
      setError('Invalid YouTube link. Please enter a URL like https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setVideoId(id)
      setQualities([
        {
          label: 'Maximum Resolution (4K / HD)',
          resolution: '1280 x 720 px',
          url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
          badge: 'Best Quality'
        },
        {
          label: 'High Definition (HQ)',
          resolution: '480 x 360 px',
          url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          badge: 'Standard HD'
        },
        {
          label: 'Medium Quality (MQ)',
          resolution: '320 x 180 px',
          url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          badge: 'Medium'
        },
        {
          label: 'Small Thumbnail (SD)',
          resolution: '120 x 90 px',
          url: `https://img.youtube.com/vi/${id}/default.jpg`,
          badge: 'Small'
        }
      ])
      setLoading(false)
    }, 500)
  }

  const triggerDownload = (imageUrl: string, filename: string) => {
    const a = document.createElement('a')
    a.href = imageUrl
    a.target = '_blank'
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-3">
          <ImageIcon size={16} />
          <span>YouTube Thumbnail Grabber</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          YouTube Thumbnail Downloader
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Download high-resolution 4K, Full HD, and standard video thumbnails from any YouTube video in one click.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 mb-8">
        <form onSubmit={handleFetch} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Paste YouTube Video Link
            </label>
            <div className="relative">
              <Video size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="w-full pl-12 pr-36 py-3.5 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Fetching...</span>
                ) : (
                  <>
                    <Search size={15} />
                    <span>Get Thumbnails</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
              {error}
            </p>
          )}
        </form>

        {/* Thumbnail Qualities Grid */}
        {videoId && qualities.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in duration-200">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-6">
              Available Resolutions for Video ({videoId})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualities.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between group hover:border-red-200 transition">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-3 border border-slate-200 shadow-xs">
                    <img
                      src={item.url}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if 4k maxres is not available for older video
                        if (idx === 0) {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                        }
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {item.resolution}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 mb-2">{item.label}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => triggerDownload(item.url, `youtube-thumbnail-${videoId}-${idx}.jpg`)}
                        className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-extrabold py-2 px-3 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
                      >
                        <Download size={14} />
                        <span>Download JPG</span>
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition"
                        title="View Full Resolution Image"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AdSense Placement */}
      <AdSenseBanner slotId="youtube-thumbnail-bottom" />

      {/* Features */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-8 mt-8">
        <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center space-x-2">
          <Sparkles size={18} className="text-amber-500" />
          <span>High-Definition YouTube Thumbnail Features</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
            <h4 className="font-extrabold text-slate-800 mb-1">Full 4K Quality</h4>
            <p>Fetches the highest resolution maxresdefault image uploaded by the creator.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
            <h4 className="font-extrabold text-slate-800 mb-1">Zero Quality Loss</h4>
            <p>Direct download link ensures original crisp JPEG files without re-compression.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-2xs">
            <h4 className="font-extrabold text-slate-800 mb-1">Mobile & Desktop Ready</h4>
            <p>Works seamlessly across smartphones, tablets, and desktop browsers.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
