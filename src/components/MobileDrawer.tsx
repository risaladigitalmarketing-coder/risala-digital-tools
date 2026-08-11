'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronRight } from 'lucide-react'
import { toolsList } from '@/data/tools'
import ToolIcon from '@/components/ToolIcon'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname()

  if (!open) return null

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path)
  }

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs" onClick={onClose}>
      <div className="fixed top-0 bottom-0 left-0 w-72 bg-white shadow-xl flex flex-col p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-5 border-b border-slate-150">
          <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-base">
              RD
            </div>
            <span className="font-bold text-base text-slate-950">Risala Tools</span>
          </Link>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 py-5 overflow-y-auto">
          {toolsList.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition ${
                isActive(tool.path)
                  ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg ${tool.bgColor}`}>
                  <ToolIcon name={tool.iconName} size={16} className={tool.color} />
                </div>
                <span>{tool.name}</span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">{tool.tag}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-150 pt-5">
          <a 
            href="https://risaladigitalmarketing.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-100 transition"
          >
            <span>Visit Main Site</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
