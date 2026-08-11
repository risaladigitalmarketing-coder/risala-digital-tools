'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'
import { ToolItem } from '@/data/tools'
import ToolIcon from '@/components/ToolIcon'

export default function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={tool.path}
      className={`block bg-white border border-slate-200/90 rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-lg hover:-translate-y-0.5 ${tool.borderColor} group`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3.5">
          <div className={`p-3 rounded-xl ${tool.bgColor} flex-shrink-0 group-hover:scale-105 transition-transform`}>
            <ToolIcon name={tool.iconName} size={22} className={tool.color} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 group-hover:text-green-700 transition-colors">
              {tool.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200/60 uppercase tracking-wider">
                {tool.trafficLabel}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {tool.rank}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3.5 leading-relaxed line-clamp-2">
        {tool.desc}
      </p>

      <div className="border-t border-slate-100 mt-4 pt-3.5">
        <div className="grid grid-cols-2 gap-1.5">
          {tool.features.slice(0, 4).map((feat, i) => (
            <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
              <Zap size={10} className="text-green-500 flex-shrink-0" />
              <span className="font-medium truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-bold text-green-600 group-hover:text-green-700">
        <span>Launch Tool</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
