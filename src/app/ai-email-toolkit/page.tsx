import type { Metadata } from 'next'
import AIEmailToolkit from '@/components/tools/AIEmailToolkit'

export const metadata: Metadata = {
  title: 'AI Email Toolkit - Cold Outreach & Sales Pitch Templates | Risala Digital Tools',
  description: 'Professional email templates and AI-powered copy generation for sales outreach and follow-ups.',
}

export default function AIEmailPage() {
  return <AIEmailToolkit />
}
