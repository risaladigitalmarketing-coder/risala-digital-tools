'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Award, ChevronRight, BookOpen } from 'lucide-react'
import { toolsList } from '@/data/tools'
import ToolIcon from '@/components/ToolIcon'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path)
  }

  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* TOOLS INDEX */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <h3 className="font-extrabold text-xs text-slate-950 uppercase tracking-wider mb-3.5 flex items-center space-x-2">
            <Award size={15} className="text-green-600" />
            <span>Our Premium Tools</span>
          </h3>
          <nav className="space-y-1">
            {toolsList.map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all ${
                  isActive(tool.path)
                    ? "bg-green-50 text-green-700 shadow-2xs border border-green-200/70"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${tool.bgColor}`}>
                    <ToolIcon name={tool.iconName} size={15} className={tool.color} />
                  </div>
                  <span className="truncate">{tool.name}</span>
                </div>
                <ChevronRight size={13} className={isActive(tool.path) ? "text-green-600 flex-shrink-0" : "text-slate-300 flex-shrink-0"} />
              </Link>
            ))}
          </nav>
        </div>

        {/* SIDEBAR AD UNIT */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs h-[280px] flex flex-col items-center justify-center relative overflow-hidden border-dashed border-slate-300 group">
          <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-200 absolute top-2 right-2">Sponsored Ad</span>
          <div className="flex flex-col items-center text-center space-y-2 text-slate-400 group-hover:text-green-600 transition duration-300">
            <BookOpen size={24} />
            <div>
              <span className="block text-xs font-bold text-slate-600">Sidebar Display Ad</span>
              <span className="text-[10px] block mt-0.5 text-slate-400">300x250 Medium Rectangle</span>
              <span className="text-[9px] text-slate-300 block mt-1">High conversion placement</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
