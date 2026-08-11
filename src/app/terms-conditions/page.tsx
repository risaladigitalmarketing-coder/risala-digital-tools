import type { Metadata } from 'next'
import { Scroll, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Risala Digital Tools',
  description: 'Terms and conditions governing the use of Risala Digital Tools.',
}

export default function TermsConditionsPage() {
  const lastUpdated = 'June 29, 2026'
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center justify-center gap-2">
          <Scroll className="text-indigo-600" size={28} />
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using the Risala Digital Tools website you agree to be bound by these Terms and Conditions.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Use of the Site</h2>
          <p>You may use the tools for personal, non‑commercial purposes only. Redistribution of generated content is permitted with attribution.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Disclaimer</h2>
          <p>The tools are provided “as is” without warranties of any kind. We are not liable for any damages arising from the use of generated content.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Contact</h2>
          <p>For questions, reach out at <a href="mailto:terms@risaladigitalmarketing.com" className="text-indigo-600 hover:underline">terms@risaladigitalmarketing.com</a>.</p>
        </section>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
        <ShieldCheck className="text-indigo-600 mx-auto mb-2" size={24} />
        <p className="text-sm text-gray-600">Please review these terms periodically for any updates.</p>
      </div>
    </div>
  )
}
