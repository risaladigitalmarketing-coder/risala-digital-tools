import type { Metadata } from 'next'
import WhatsAppLinkGenerator from '@/components/tools/WhatsAppLinkGenerator'

export const metadata: Metadata = {
  title: 'WhatsApp Link Generator with QR Code | Risala Digital Tools',
  description: 'Create free WhatsApp click-to-chat links (wa.me) with pre-filled custom messages and QR codes instantly.',
}

export default function WhatsAppLinkPage() {
  return <WhatsAppLinkGenerator />
}
