import type { Metadata } from 'next'
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator'

export const metadata: Metadata = {
  title: 'Free Business Name Generator | Risala Digital Tools',
  description: 'Generate unique, creative, and SEO-friendly brand names for startups, cafes, tech, and clothing brands instantly.',
}

export default function BusinessNamePage() {
  return <BusinessNameGenerator />
}
