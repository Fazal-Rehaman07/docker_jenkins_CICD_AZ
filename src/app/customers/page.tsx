"use client"

import { useEffect, useState, type CSSProperties } from "react"
import DashboardLayout from "../../components/DashboardLayout"

type Customer = {
  _id: string
  user_id: string
  name: string
  email?: string
  phone?: string
  created_at: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    fetchCustomers()
  }, [])

  // Fetch all customers
  async function fetchCustomers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/customers")
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to fetch customers")
      }
      const data = await res.json()
      setCustomers(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Add or update customer
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name) return alert("Name is required")

    try {
      if (form.id) {
        // Update
        const res = await fetch(`/api/customers/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email || null,
            phone: form.phone || null,
          }),
        })
        if (!res.ok) throw new Error((await res.json()).error)
      } else {
        // Add new
        const res = await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email || null,
            phone: form.phone || null,
          }),
        })
        if (!res.ok) throw new Error((await res.json()).error)
      }

      // Reset form and refresh table
      setForm({ id: "", name: "", email: "", phone: "" })
      fetchCustomers()
    } catch (err: any) {
      alert(err.message || "Operation failed")
    }
  }

  // Edit customer (populate form)
  function handleEdit(c: Customer) {
    setForm({ id: c._id, name: c.name, email: c.email || "", phone: c.phone || "" })
  }

  // Delete customer
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this customer?")) return
    try {
      const res = await fetch(`/api/customers/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error((await res.json()).error)
      fetchCustomers()
    } catch (err: any) {
      alert(err.message || "Failed to delete customer")
    }
  }

  return (
    <DashboardLayout>
      <h1>Customers</h1>
      <p>Manage your customers and send service reminders.</p>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>{form.id ? "Edit Customer" : "Add New Customer"}</h3>
        <div style={row}>
          <input
            placeholder="Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={input}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={input}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={input}
          />
        </div>
        <button type="submit" style={button}>
          {form.id ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* Customers Table */}
      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <table style={table}>
          <thead style={{ background: "#f1f3f5" }}>
            <tr>
              <th style={th}>User ID</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Created At</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td style={td}>{c.user_id}</td>
                <td style={td}>{c.name}</td>
                <td style={td}>{c.email || "-"}</td>
                <td style={td}>{c.phone || "-"}</td>
                <td style={td}>{new Date(c.created_at).toLocaleDateString()}</td>
                <td style={td}>
                  <button onClick={() => handleEdit(c)} style={editBtn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)} style={deleteBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  )
}

/* --- Styles --- */
const row: CSSProperties = { display: "flex", gap: "10px", marginTop: "10px" }
const input: CSSProperties = { flex: 1, padding: "10px", borderRadius: 6, border: "1px solid #ccc" }
const formStyle: CSSProperties = { background: "white", padding: 20, borderRadius: 8, marginBottom: 30 }
const button: CSSProperties = { background: "#0070f3", color: "white", padding: "10px 20px", border: "none", borderRadius: 6, cursor: "pointer", marginTop: 10 }
const table: CSSProperties = { width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 8, overflow: "hidden" }
const th: CSSProperties = { textAlign: "left", padding: 12, fontWeight: 600 }
const td: CSSProperties = { padding: 12, borderBottom: "1px solid #eee" }
const editBtn: CSSProperties = { background: "#0070f3", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", marginRight: 6 }
const deleteBtn: CSSProperties = { background: "#dc3545", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }
