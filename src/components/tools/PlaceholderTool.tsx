'use client'

import React from 'react'
import { Sparkles, Wrench } from 'lucide-react'

export default function PlaceholderTool({ toolName }: { toolName: string }) {
  return (
    <div className="space-y-8 animate-in text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
        <Wrench size={32} />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900">{toolName}</h1>
        <p className="text-sm text-gray-500">
          This tool module is scheduled for full implementation in the upcoming update.
        </p>
      </div>
      <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 text-xs font-semibold px-4 py-2 rounded-full border border-green-100">
        <Sparkles size={14} />
        <span>Coming Soon on Risala Digital Tools</span>
      </div>
    </div>
  )
}
