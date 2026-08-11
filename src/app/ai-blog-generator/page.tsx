import type { Metadata } from 'next'
import AIBlogGenerator from '@/components/tools/AIBlogGenerator'

export const metadata: Metadata = {
  title: 'AI Blog Generator - Article Outlines & SEO Content | Risala Digital Tools',
  description: 'Generate structured blog post outlines, title tags, and meta descriptions optimized for search engines.',
}

export default function AIBlogPage() {
  return <AIBlogGenerator />
}
