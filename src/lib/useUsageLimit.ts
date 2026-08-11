// src/lib/useUsageLimit.ts
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const FREE_GUEST_LIMIT = 2
const FREE_USER_LIMIT = 10

export function useUsageLimit(toolSlug: string) {
  const { data: session } = useSession()
  const [usageCount, setUsageCount] = useState<number>(0)
  const [limitReached, setLimitReached] = useState<boolean>(false)

  const maxLimit = session?.user ? FREE_USER_LIMIT : FREE_GUEST_LIMIT

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `usage_${toolSlug}`
      const current = parseInt(localStorage.getItem(storageKey) || '0', 10)
      setUsageCount(current)
      setLimitReached(current >= maxLimit)
    }
  }, [toolSlug, maxLimit])

  const incrementUsage = (): boolean => {
    if (typeof window === 'undefined') return true

    const storageKey = `usage_${toolSlug}`
    const current = parseInt(localStorage.getItem(storageKey) || '0', 10)

    if (current >= maxLimit) {
      setLimitReached(true)
      return false
    }

    const nextCount = current + 1
    localStorage.setItem(storageKey, String(nextCount))
    setUsageCount(nextCount)
    if (nextCount >= maxLimit) {
      setLimitReached(true)
    }
    return true
  }

  return {
    usageCount,
    maxLimit,
    limitReached,
    incrementUsage,
    isLoggedIn: !!session?.user
  }
}
