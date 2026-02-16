export type TenantConfig = {
  name: string
  logo: string
  primaryColor: string
}

export const tenants: Record<string, TenantConfig> = {
  "localhost": {
    name: "Demo Auto Shop",
    logo: "/logos/demo.png",
    primaryColor: "#2a9d8f"
  },
  "autoking.vercel.app": {
    name: "Auto King",
    logo: "/logos/autoking.png",
    primaryColor: "#e63946"
  },
  "johnsgarage.vercel.app": {
    name: "John's Garage",
    logo: "/logos/johns.jpg",
    primaryColor: "#1d3557"
  }
}
