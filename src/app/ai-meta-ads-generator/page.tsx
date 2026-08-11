import type { Metadata } from 'next'
import AiMetaAdsGenerator from '@/components/tools/AiMetaAdsGenerator'

export const metadata: Metadata = {
  title: 'AI Meta Ads Generator - FB & Instagram Ad Copywriter | Risala Digital Tools',
  description: 'Write high-converting primary text, headlines, and ad descriptions for Facebook & Instagram ads using AI.',
}

export default function AiMetaAdsPage() {
  return <AiMetaAdsGenerator />
}
