import type { Metadata } from 'next'
import Link from 'next/link'
import { Layers, ArrowRight } from 'lucide-react'
import { toolCategories, toolsList } from '@/data/tools'
import ToolCard from '@/components/ToolCard'

export const metadata: Metadata = {
  title: 'Tool Categories | Risala Digital Tools',
  description: 'Explore all tool categories: PDF Utilities, WhatsApp Links, Marketing Calculators, AI Ad Generators, and Developer Tools.',
}

export default function CategoriesPage() {
  return (
    <div className="space-y-8 animate-in">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-950 flex items-center gap-2">
          <Layers className="text-green-600" size={28} />
          <span>Tool Categories</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse our suite of web utilities by functional category.
        </p>
      </div>

      <div className="space-y-10">
        {toolCategories.map((category) => {
          const categoryTools = toolsList.filter(t => t.category === category)
          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-lg font-bold text-slate-900">{category}</h2>
                <span className="text-xs font-semibold text-slate-400">{categoryTools.length} Tools</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
