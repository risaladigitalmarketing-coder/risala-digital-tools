'use client'

import React from 'react'
import Link from 'next/link'
import { Bookmark, Star, ArrowRight, Sparkles, History, CheckCircle2 } from 'lucide-react'
import { toolsList } from '@/data/tools'
import { useFavorites } from '@/lib/useFavorites'
import ToolIcon from '@/components/ToolIcon'
import AdSenseBanner from '@/components/AdSenseBanner'

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()

  const favoriteTools = toolsList.filter(t => favorites.includes(t.slug))

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-amber-100 mb-4">
            <Bookmark size={14} className="text-amber-200" />
            <span>Personal Tool Dashboard</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            My Favorite Bookmarked Tools
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl font-medium">
            Quickly access your most frequently used digital marketing utilities, calculators, and generators in one place.
          </p>
        </div>
      </div>

      {/* Bookmarked Tools List */}
      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl ${tool.bgColor} flex items-center justify-center`}>
                    <ToolIcon name={tool.iconName} className={tool.color} />
                  </div>

                  <button
                    onClick={() => toggleFavorite(tool.slug)}
                    className="p-2 rounded-xl text-amber-500 hover:bg-amber-50 transition"
                    title="Remove from bookmarks"
                  >
                    <Star size={18} className="fill-amber-400 text-amber-500" />
                  </button>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition">
                  {tool.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1.5 line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {tool.category}
                </span>

                <Link
                  href={tool.path}
                  className="inline-flex items-center space-x-1 text-xs font-extrabold text-amber-600 hover:text-amber-700 transition"
                >
                  <span>Open Tool</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <Star size={28} />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">No Bookmarked Tools Yet</h2>
          <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
            Click the star icon on any tool card across the directory to bookmark it for 1-click access here!
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-md shadow-amber-200 hover:shadow-lg transition"
          >
            <span>Explore All Tools</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <AdSenseBanner slotId="favorites-bottom" />
    </div>
  )
}
