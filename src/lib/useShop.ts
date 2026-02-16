// lib/useShop.ts
import { useEffect, useState } from "react"

export function useShop() {
  const [shop, setShop] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching shop config (no auth for now)
    const defaultShop = {
      id: "default-shop",
      name: "Auto Service Center",
      logo_url: null,
      primary_color: "#2563eb", // Tailwind blue-600
      created_at: new Date().toISOString(),
    }

    setShop(defaultShop)
    setLoading(false)
  }, [])

  return { shop, loading, user: null }
}
