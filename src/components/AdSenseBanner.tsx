'use client'

import React, { useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface AdSenseBannerProps {
  slotId?: string
  format?: 'auto' | 'fluid' | 'rectangle'
}

export default function AdSenseBanner({ slotId = '1234567890', format = 'auto' }: AdSenseBannerProps) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID

  useEffect(() => {
    if (pubId && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.warn('AdSense push error:', err)
      }
    }
  }, [pubId, slotId])

  if (pubId) {
    return (
      <div className="w-full my-4 flex justify-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={pubId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Fallback visual banner when Pub ID is not configured
  return (
    <div className="w-full bg-slate-100/70 py-3 border-b border-slate-200/80 my-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mx-auto max-w-4xl h-[80px] sm:h-[90px] bg-white border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group shadow-2xs">
          <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-200 absolute top-1.5 right-1.5">
            AdSense Placement
          </span>
          <div className="flex items-center space-x-3 text-slate-400 group-hover:text-green-600 transition duration-300">
            <Sparkles size={18} className="animate-pulse text-amber-500" />
            <div className="text-center">
              <span className="block text-xs font-bold text-slate-600">Google AdSense Responsive Unit ({slotId})</span>
              <span className="text-[10px] block text-slate-400 mt-0.5">High Impression Placement • Auto-fitting Layout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
