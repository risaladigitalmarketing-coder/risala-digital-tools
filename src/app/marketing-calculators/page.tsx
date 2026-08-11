import type { Metadata } from 'next'
import MarketingCalculators from '@/components/tools/MarketingCalculators'

export const metadata: Metadata = {
  title: 'Marketing Calculators Hub - ROI, ROAS, CAC, LTV, CTR, CPC, CPM | Risala Digital Tools',
  description: 'Calculate Return on Investment (ROI), ROAS, Customer Acquisition Cost (CAC), CTR, CPC, CPM and Conversion Rates online.',
}

export default function MarketingCalculatorsPage() {
  return <MarketingCalculators />
}
