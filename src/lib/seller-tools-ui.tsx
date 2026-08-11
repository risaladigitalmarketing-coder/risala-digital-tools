'use client'

import React, { useState } from 'react'

// Calculation Utilities
export function calculateROI(investment: number, revenue: number): number {
  if (investment <= 0) return 0
  return ((revenue - investment) / investment) * 100
}

export function calculateROAS(adSpend: number, revenue: number): number {
  if (adSpend <= 0) return 0
  return revenue / adSpend
}

export function calculateCAC(totalMarketingCost: number, newCustomers: number): number {
  if (newCustomers <= 0) return 0
  return totalMarketingCost / newCustomers
}

export function calculateLTV(averageOrderValue: number, purchaseFrequency: number, customerLifespan: number): number {
  return averageOrderValue * purchaseFrequency * customerLifespan
}

export function calculateCTR(clicks: number, impressions: number): number {
  if (impressions <= 0) return 0
  return (clicks / impressions) * 100
}

export function calculateCPC(totalCost: number, clicks: number): number {
  if (clicks <= 0) return 0
  return totalCost / clicks
}

export function calculateCPM(totalCost: number, impressions: number): number {
  if (impressions <= 0) return 0
  return (totalCost / impressions) * 1000
}

export function calculateConversionRate(conversions: number, clicks: number): number {
  if (clicks <= 0) return 0
  return (conversions / clicks) * 100
}

// Business Name Generator Helper
export function generateBusinessName(base: string, category: string): string[] {
  const prefixes = ['Smart', 'Apex', 'Nova', 'Prime', 'NextGen', 'Zenith', 'Vibe', 'Bold', 'Bright', 'Digital', 'Pro', 'Aura', 'Elite', 'Urban', 'Core']
  const suffixes = ['Hub', 'Studio', 'Labs', 'Works', 'Co', 'Scale', 'Solutions', 'Force', 'Point', 'Sphere', 'X', 'Pulse', 'Wave', 'Forge', 'Zone']
  
  const names: string[] = []
  const cleanBase = base.trim().charAt(0).toUpperCase() + base.trim().slice(1)

  prefixes.forEach((p) => {
    names.push(`${p} ${cleanBase}`)
  })
  suffixes.forEach((s) => {
    names.push(`${cleanBase} ${s}`)
  })
  if (category) {
    names.push(`${cleanBase} ${category}`)
    names.push(`${category} by ${cleanBase}`)
  }
  
  return Array.from(new Set(names)).slice(0, 30)
}

// Custom Hook for AI Tool State & Limits
export function useAITool(toolId: string) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [remainingUses, setRemainingUses] = useState(10)

  const executeWithAuth = (fn: () => void) => {
    fn()
  }

  const canUse = true

  const loginWithGoogle = () => {
    setUser({ name: 'Guest User' })
    setShowAuthModal(false)
  }

  return {
    user,
    loading,
    generating,
    setGenerating,
    showAuthModal,
    setShowAuthModal,
    executeWithAuth,
    remainingUses,
    canUse,
    loginWithGoogle
  }
}

// Context & Provider Stub
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const AuthModal: React.FC<any> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
        <h3 className="font-bold text-lg text-gray-900">Sign in to Risala Tools</h3>
        <p className="text-sm text-gray-500">Access unlimited tool usage and saved reports.</p>
        <button 
          onClick={onClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  )
}

// Tab Components
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (val: string) => void
  children: React.ReactNode
  className?: string
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (val: string) => void
}>({
  activeTab: '',
  setActiveTab: () => {}
})

export const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children, className = '' }) => {
  const [internalTab, setInternalTab] = useState(defaultValue || '')
  const activeTab = value !== undefined ? value : internalTab

  const handleTabChange = (val: string) => {
    if (onValueChange) onValueChange(val)
    setInternalTab(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={`space-y-4 ${className}`}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 border-b border-gray-200 pb-2 ${className}`}>
      {children}
    </div>
  )
}

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({ value, children, className = '' }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
        isActive
          ? 'bg-green-600 text-white shadow-sm'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({ value, children, className = '' }) => {
  const { activeTab } = React.useContext(TabsContext)
  if (activeTab !== value) return null
  return <div className={`animate-in ${className}`}>{children}</div>
}
