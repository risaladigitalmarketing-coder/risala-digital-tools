'use client'

import React, { useState } from 'react'
import { Calculator, DollarSign, Percent, BarChart2, TrendingUp, Users, RefreshCw, BookOpen } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/lib/seller-tools-ui'
import {
  calculateROI,
  calculateROAS,
  calculateCAC,
  calculateLTV,
  calculateCTR,
  calculateCPC,
  calculateCPM,
  calculateConversionRate,
} from '@/lib/seller-tools-ui'

const InputField = ({ label, value, onChange, placeholder, type = "number" }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    />
  </div>
)

const ResultDisplay = ({ label, value, unit = "" }: any) => (
  <div className="flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-3 shadow-sm shadow-indigo-50/10">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className="font-extrabold text-indigo-700 text-lg flex items-center gap-1">
      {value !== null && value !== undefined ? `${value.toFixed(2)}${unit}` : '-'}
    </span>
  </div>
)

const ROICalculator = () => {
  const [investment, setInvestment] = useState('')
  const [revenue, setRevenue] = useState('')
  const [roi, setRoi] = useState<number | null>(null)

  const handleCalculate = () => {
    const inv = parseFloat(investment)
    const rev = parseFloat(revenue)
    if (!isNaN(inv) && !isNaN(rev)) {
      setRoi(calculateROI(inv, rev))
    } else {
      setRoi(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Investment (INR)" value={investment} onChange={setInvestment} placeholder="e.g., 50000" />
      <InputField label="Total Revenue (INR)" value={revenue} onChange={setRevenue} placeholder="e.g., 75000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate ROI</span>
      </button>
      <ResultDisplay label="Return on Investment (ROI)" value={roi} unit="%" />
    </div>
  )
}

const ROASCalculator = () => {
  const [adSpend, setAdSpend] = useState('')
  const [revenue, setRevenue] = useState('')
  const [roas, setRoas] = useState<number | null>(null)

  const handleCalculate = () => {
    const spend = parseFloat(adSpend)
    const rev = parseFloat(revenue)
    if (!isNaN(spend) && !isNaN(rev)) {
      setRoas(calculateROAS(spend, rev))
    } else {
      setRoas(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Ad Spend (INR)" value={adSpend} onChange={setAdSpend} placeholder="e.g., 10000" />
      <InputField label="Revenue from Ads (INR)" value={revenue} onChange={setRevenue} placeholder="e.g., 30000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate ROAS</span>
      </button>
      <ResultDisplay label="Return on Ad Spend (ROAS)" value={roas} unit="x" />
    </div>
  )
}

const CACCalculator = () => {
  const [totalMarketingCost, setTotalMarketingCost] = useState('')
  const [newCustomers, setNewCustomers] = useState('')
  const [cac, setCac] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalMarketingCost)
    const customers = parseFloat(newCustomers)
    if (!isNaN(cost) && !isNaN(customers)) {
      setCac(calculateCAC(cost, customers))
    } else {
      setCac(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Marketing & Sales Cost (INR)" value={totalMarketingCost} onChange={setTotalMarketingCost} placeholder="e.g., 20000" />
      <InputField label="Number of New Customers Acquired" value={newCustomers} onChange={setNewCustomers} placeholder="e.g., 50" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate CAC</span>
      </button>
      <ResultDisplay label="Customer Acquisition Cost (CAC)" value={cac} unit=" INR" />
    </div>
  )
}

const LTVCalculator = () => {
  const [averageOrderValue, setAverageOrderValue] = useState('')
  const [purchaseFrequency, setPurchaseFrequency] = useState('')
  const [customerLifespan, setCustomerLifespan] = useState('')
  const [ltv, setLtv] = useState<number | null>(null)

  const handleCalculate = () => {
    const aov = parseFloat(averageOrderValue)
    const pf = parseFloat(purchaseFrequency)
    const cl = parseFloat(customerLifespan)
    if (!isNaN(aov) && !isNaN(pf) && !isNaN(cl)) {
      setLtv(calculateLTV(aov, pf, cl))
    } else {
      setLtv(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Average Order Value (AOV) (INR)" value={averageOrderValue} onChange={setAverageOrderValue} placeholder="e.g., 1500" />
      <InputField label="Purchase Frequency (Per Year)" value={purchaseFrequency} onChange={setPurchaseFrequency} placeholder="e.g., 4" />
      <InputField label="Average Customer Lifespan (Years)" value={customerLifespan} onChange={setCustomerLifespan} placeholder="e.g., 3" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate LTV</span>
      </button>
      <ResultDisplay label="Customer Lifetime Value (LTV)" value={ltv} unit=" INR" />
    </div>
  )
}

const CTRCalculator = () => {
  const [clicks, setClicks] = useState('')
  const [impressions, setImpressions] = useState('')
  const [ctr, setCtr] = useState<number | null>(null)

  const handleCalculate = () => {
    const c = parseFloat(clicks)
    const imp = parseFloat(impressions)
    if (!isNaN(c) && !isNaN(imp)) {
      setCtr(calculateCTR(c, imp))
    } else {
      setCtr(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Clicks" value={clicks} onChange={setClicks} placeholder="e.g., 250" />
      <InputField label="Total Impressions" value={impressions} onChange={setImpressions} placeholder="e.g., 10000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate CTR</span>
      </button>
      <ResultDisplay label="Click-Through Rate (CTR)" value={ctr} unit="%" />
    </div>
  )
}

const CPCCalculator = () => {
  const [totalCost, setTotalCost] = useState('')
  const [clicks, setClicks] = useState('')
  const [cpc, setCpc] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalCost)
    const c = parseFloat(clicks)
    if (!isNaN(cost) && !isNaN(c)) {
      setCpc(calculateCPC(cost, c))
    } else {
      setCpc(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Ad Campaign Cost (INR)" value={totalCost} onChange={setTotalCost} placeholder="e.g., 5000" />
      <InputField label="Total Clicks Received" value={clicks} onChange={setClicks} placeholder="e.g., 200" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate CPC</span>
      </button>
      <ResultDisplay label="Cost Per Click (CPC)" value={cpc} unit=" INR" />
    </div>
  )
}

const CPMCalculator = () => {
  const [totalCost, setTotalCost] = useState('')
  const [impressions, setImpressions] = useState('')
  const [cpm, setCpm] = useState<number | null>(null)

  const handleCalculate = () => {
    const cost = parseFloat(totalCost)
    const imp = parseFloat(impressions)
    if (!isNaN(cost) && !isNaN(imp)) {
      setCpm(calculateCPM(cost, imp))
    } else {
      setCpm(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Ad Campaign Cost (INR)" value={totalCost} onChange={setTotalCost} placeholder="e.g., 10000" />
      <InputField label="Total Impressions" value={impressions} onChange={setImpressions} placeholder="e.g., 50000" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate CPM</span>
      </button>
      <ResultDisplay label="Cost Per Mille (CPM)" value={cpm} unit=" INR" />
    </div>
  )
}

const ConversionRateCalculator = () => {
  const [conversions, setConversions] = useState('')
  const [clicks, setClicks] = useState('')
  const [conversionRate, setConversionRate] = useState<number | null>(null)

  const handleCalculate = () => {
    const conv = parseFloat(conversions)
    const c = parseFloat(clicks)
    if (!isNaN(conv) && !isNaN(c)) {
      setConversionRate(calculateConversionRate(conv, c))
    } else {
      setConversionRate(null)
    }
  }

  return (
    <div className="space-y-6">
      <InputField label="Total Conversions" value={conversions} onChange={setConversions} placeholder="e.g., 15" />
      <InputField label="Total Clicks / Visitors" value={clicks} onChange={setClicks} placeholder="e.g., 300" />
      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition"
      >
        <Calculator size={18} />
        <span>Calculate Conversion Rate</span>
      </button>
      <ResultDisplay label="Conversion Rate" value={conversionRate} unit="%" />
    </div>
  )
}

export default function MarketingCalculators() {
  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Calculator className="text-indigo-500" size={28} />
          <span>Marketing Calculators Hub</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Calculate ROI, ROAS, CAC, LTV, CTR, CPC, CPM, and Conversion Rate to optimize your marketing performance and profitability.
        </p>
      </div>

      <Tabs defaultValue="roi">
        <TabsList>
          <TabsTrigger value="roi">ROI</TabsTrigger>
          <TabsTrigger value="roas">ROAS</TabsTrigger>
          <TabsTrigger value="cac">CAC</TabsTrigger>
          <TabsTrigger value="ltv">LTV</TabsTrigger>
          <TabsTrigger value="ctr">CTR</TabsTrigger>
          <TabsTrigger value="cpc">CPC</TabsTrigger>
          <TabsTrigger value="cpm">CPM</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
        </TabsList>

        <div className="pt-4 max-w-xl mx-auto">
          <TabsContent value="roi"><ROICalculator /></TabsContent>
          <TabsContent value="roas"><ROASCalculator /></TabsContent>
          <TabsContent value="cac"><CACCalculator /></TabsContent>
          <TabsContent value="ltv"><LTVCalculator /></TabsContent>
          <TabsContent value="ctr"><CTRCalculator /></TabsContent>
          <TabsContent value="cpc"><CPCCalculator /></TabsContent>
          <TabsContent value="cpm"><CPMCalculator /></TabsContent>
          <TabsContent value="conversion"><ConversionRateCalculator /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
