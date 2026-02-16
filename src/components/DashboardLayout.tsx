"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"

const defaultShop = {
  name: "AutoTech Garage",
  primary_color: "#0d6efd",
  logo_url: "https://dummyimage.com/120x40/0d6efd/ffffff&text=AutoTech",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const shop = defaultShop

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: shop.primary_color,
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img src={shop.logo_url} height={50} alt="Logo" style={{ marginBottom: "10px" }} />
          <h2 style={{ marginTop: "10px", fontWeight: 600, fontSize: "20px" }}>{shop.name}</h2>

          <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button style={sidebarButtonStyle} onClick={() => router.push("/")}>Dashboard</button>
            <button style={sidebarButtonStyle} onClick={() => router.push("/customers")}>Customers</button>
            <button style={sidebarButtonStyle} onClick={() => router.push("/services")}>Services</button>
          </nav>
        </div>

        <button style={sidebarButtonStyle}>Logout</button>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          background: "#f8f9fa",
          padding: "30px",
          color: "#212529",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          {children}
        </div>
      </main>
    </div>
  )
}

const sidebarButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: "white",
  border: "none",
  padding: "8px 0",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 500,
}
