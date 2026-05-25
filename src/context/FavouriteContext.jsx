"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authClient } from "@/app/lib/auth-client"

const FavoriteContext = createContext()

export const FavoriteProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = async () => {
    try {
      const { data: tokenData } = await authClient.token()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/favourite`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      )

      const data = await res.json()

      // store ONLY IDs
      setFavoriteIds(data.favorites.map((i) => i._id))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <FavoriteContext.Provider
      value={{ favoriteIds, setFavoriteIds, loading }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoriteContext)