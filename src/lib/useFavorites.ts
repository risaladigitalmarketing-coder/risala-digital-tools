// src/lib/useFavorites.ts
'use client'

import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_favorite_tools')
      if (saved) {
        try {
          setFavorites(JSON.parse(saved))
        } catch (e) {
          console.error('Error parsing favorites', e)
        }
      }
    }
  }, [])

  const toggleFavorite = (slug: string) => {
    let updated: string[] = []
    if (favorites.includes(slug)) {
      updated = favorites.filter(s => s !== slug)
    } else {
      updated = [...favorites, slug]
    }
    setFavorites(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_favorite_tools', JSON.stringify(updated))
    }
  }

  const isFavorite = (slug: string) => favorites.includes(slug)

  return { favorites, toggleFavorite, isFavorite }
}
