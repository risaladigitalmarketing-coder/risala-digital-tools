import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toolsList, type ToolItem } from '@/data/tools'

import PDFToolkit from '@/components/tools/PDFToolkit'
import WhatsAppLinkGenerator from '@/components/tools/WhatsAppLinkGenerator'
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator'
import MarketingCalculators from '@/components/tools/MarketingCalculators'
import AiMetaAdsGenerator from '@/components/tools/AiMetaAdsGenerator'
import AIBlogGenerator from '@/components/tools/AIBlogGenerator'
import AIEmailToolkit from '@/components/tools/AIEmailToolkit'
import DevToolkit from '@/components/tools/DevToolkit'
import YouTubeTagExtractor from '@/components/tools/YouTubeTagExtractor'
import YouTubeThumbnailDownloader from '@/components/tools/YouTubeThumbnailDownloader'
import PlaceholderTool from '@/components/tools/PlaceholderTool'

// WordPress integration utilities
import { getAllTools, getToolBySlug, extractSeo } from '@/lib/wordpress'
import { getSEO } from '@/lib/seo'

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

/** Load tools from WordPress with fallback to static list */
async function loadTools(): Promise<ToolItem[]> {
  try {
    const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/+$/, '') || 'https://tools-cms.risaladigitalmarketing.com'
    const res = await fetch(`${WP_API_BASE}/wp-json/wp/v2/pages?per_page=100`, { next: { revalidate: 30 } })
    if (res.ok) {
      const wpPages = await res.json()
      const pagesBySlug = new Map(wpPages.map((p: any) => [p.slug, p]))

      return toolsList.map((staticTool) => {
        const page: any = pagesBySlug.get(staticTool.slug)
        if (!page) return staticTool
        return {
          ...staticTool,
          name: page.title?.rendered || staticTool.name,
          desc: page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || staticTool.desc,
        }
      })
    }
  } catch (e) {
    console.warn('[CMS] Using static tools list', e)
  }
  return toolsList
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tools = await loadTools()
  const tool = tools.find((t) => t.slug === resolvedParams.slug)

  const fallbackTitle = tool ? `${tool.name} | Risala Digital Tools` : 'Tool Not Found | Risala Digital Tools'
  const fallbackDesc = tool ? tool.desc : 'Risala Digital Marketing Seller Tools'

  return getSEO(resolvedParams.slug, fallbackTitle, fallbackDesc)
}

export function generateStaticParams() {
  // static generation uses original static list; runtime fallback works via loadTools()
  return toolsList.map((tool) => ({ slug: tool.slug }))
}



export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params
  const tools = await loadTools()
  const tool = tools.find((t) => t.slug === resolvedParams.slug)

  if (!tool) {
    notFound()
  }

  switch (tool.slug) {
    case 'pdf-tools':
      return <PDFToolkit />
    case 'whatsapp-link-generator':
      return <WhatsAppLinkGenerator />
    case 'business-name-generator':
      return <BusinessNameGenerator />
    case 'marketing-calculators':
      return <MarketingCalculators />
    case 'ai-meta-ads-generator':
      return <AiMetaAdsGenerator />
    case 'ai-blog-generator':
      return <AIBlogGenerator />
    case 'ai-email-toolkit':
      return <AIEmailToolkit />
    case 'dev-toolkit':
      return <DevToolkit />
    case 'youtube-tag-extractor':
      return <YouTubeTagExtractor />
    case 'youtube-thumbnail-downloader':
      return <YouTubeThumbnailDownloader />
    default:
      return <PlaceholderTool toolName={tool.name} />
  }
}
