import { tenants, TenantConfig } from "../config/tenants"

export function resolveTenant(hostname: string): TenantConfig {
  return tenants[hostname] || tenants["localhost"]
}
