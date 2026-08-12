'use client'

import React, { useState } from 'react'
import { Image as ImageIcon, Upload, Download, Sparkles, FileImage, ShieldCheck } from 'lucide-react'
import AdSenseBanner from '@/components/AdSenseBanner'
import ToolComments from '@/components/ToolComments'
import { useUsageLimit } from '@/lib/useUsageLimit'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [quality, setQuality] = useState(80)

  const { incrementUsage } = useUsageLimit('image-compressor')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
      setConvertedUrl(null)
    }
  }

  const handleCompress = () => {
    if (!file || !preview) return
    setLoading(true)
    incrementUsage()

    const img = new Image()
    img.src = preview
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const webpData = canvas.toDataURL('image/webp', quality / 100)
        setConvertedUrl(webpData)
      }
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-teal-100 mb-4">
            <ShieldCheck size={14} className="text-teal-200" />
            <span>100% Client-Side Privacy</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Browser Image Compressor & WebP Converter
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-2xl font-medium">
            Compress JPG, PNG, and WebP images directly in your browser with zero quality loss and zero server uploads.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload-input"
          />
          <label htmlFor="image-upload-input" className="cursor-pointer space-y-3 block">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Upload size={28} />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-800">Click to upload an image</span>
              <p className="text-xs font-medium text-slate-400 mt-1">Supports PNG, JPG, JPEG, WebP</p>
            </div>
          </label>
        </div>

        {file && preview && (
          <div className="space-y-5 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border border-slate-200 shadow-sm" />
              <div className="flex-1 space-y-3 w-full">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Compression Quality: {quality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />

                <button
                  onClick={handleCompress}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-200 hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Sparkles size={16} />
                  <span>{loading ? 'Compressing...' : 'Compress & Convert to WebP'}</span>
                </button>
              </div>
            </div>

            {convertedUrl && (
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileImage size={24} className="text-teal-600" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">WebP Compressed Ready</h4>
                    <p className="text-[11px] font-medium text-slate-500">Optimized for fast web page loading</p>
                  </div>
                </div>

                <a
                  href={convertedUrl}
                  download="compressed-image.webp"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition"
                >
                  <Download size={14} />
                  <span>Download WebP</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <AdSenseBanner slotId="image-compressor-bottom" />
      <ToolComments toolSlug="image-compressor" />
    </div>
  )
}
