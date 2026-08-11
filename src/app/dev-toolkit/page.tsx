import type { Metadata } from 'next'
import DevToolkit from '@/components/tools/DevToolkit'

export const metadata: Metadata = {
  title: 'Dev Toolkit - Git Cheatsheet & Terminal Shortcuts | Risala Digital Tools',
  description: 'Handy developer utilities, Git command cheatsheets, and terminal shortcuts.',
}

export default function DevToolkitPage() {
  return <DevToolkit />
}
