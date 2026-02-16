import { useEffect, useState } from "react"
import { resolveTenant } from "./getTenant"
import { TenantConfig } from "../config/tenants"

export function getTenantSafe(): TenantConfig {
  const [tenant, setTenant] = useState<TenantConfig | null>(null)

  useEffect(() => {
    setTenant(resolveTenant(window.location.hostname))
  }, [])

  return tenant || {
    name: "Loading...",
    logo: "/logos/demo.png",
    primaryColor: "#999",
  }
}
