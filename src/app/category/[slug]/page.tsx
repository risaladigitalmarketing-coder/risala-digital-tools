import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toolCategories, toolsList } from '@/data/tools'
import ToolCard from '@/components/ToolCard'
import { Layers } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const category = toolCategories.find((c) => slugify(c) === resolvedParams.slug)

  if (!category) {
    return { title: 'Category Not Found | Risala Digital Tools' }
  }

  return {
    title: `${category} Tools | Risala Digital Tools`,
    description: `Free ${category} tools and calculators brought to you by Risala Digital.`,
  }
}

export function generateStaticParams() {
  return toolCategories.map((c) => ({
    slug: slugify(c),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const category = toolCategories.find((c) => slugify(c) === resolvedParams.slug)

  if (!category) {
    notFound()
  }

  const categoryTools = toolsList.filter((t) => t.category === category)

  return (
    <div className="space-y-8 animate-in">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-950 flex items-center gap-2">
          <Layers className="text-green-600" size={28} />
          <span>{category}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Showing all {categoryTools.length} tools in this category.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
