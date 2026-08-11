import type { Metadata } from 'next'
import PDFToolkit from '@/components/tools/PDFToolkit'

export const metadata: Metadata = {
  title: 'PDF Toolkit - Merge, Split, Compress & Convert PDF | Risala Digital Tools',
  description: 'Free browser-based PDF toolkit. Merge PDFs, split pages, compress files, and convert JPG to PDF locally and privately.',
}

export default function PDFToolsPage() {
  return <PDFToolkit />
}
