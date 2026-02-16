"use client";

import { useEffect, useState, type CSSProperties } from "react";
import DashboardLayout from "../../components/DashboardLayout";

type Customer = {
  _id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
};

type Service = {
  _id: string;
  customer_id: string;      // raw ObjectId
  customer?: Customer;      // populated object
  vehicle: string;
  service_date: string;
  reminder_months: number;
  reminder_date: string;
  amount: number;
  created_at: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    customer_id: "",
    customer_name: "",
    vehicle: "",
    service_date: "",
    reminder_months: 3,
    amount: 0,
  });

  useEffect(() => {
    fetchCustomers();
    fetchServices();
  }, []);

  async function fetchCustomers() {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.customer_id || !form.vehicle || !form.service_date) {
      alert("Customer, Vehicle, and Service Date are required");
      return;
    }

    const payload = {
      customer_id: form.customer_id,
      vehicle: form.vehicle,
      service_date: form.service_date,
      reminder_months: form.reminder_months,
      amount: form.amount,
    };

    try {
      if (form.id) {
        const res = await fetch(`/api/services/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
      }

      setForm({
        id: "",
        customer_id: "",
        customer_name: "",
        vehicle: "",
        service_date: "",
        reminder_months: 3,
        amount: 0,
      });

      fetchServices();
    } catch (err: any) {
      alert(err.message || "Operation failed");
    }
  }

  function handleEdit(s: Service) {
    setForm({
      id: s._id,
      customer_id: s.customer?._id || "",
      customer_name: s.customer?.name || "",
      vehicle: s.vehicle,
      service_date: s.service_date.slice(0, 10),
      reminder_months: s.reminder_months,
      amount: s.amount,
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  }

  function handleCustomerChange(id: string) {
    const cust = customers.find((c) => c._id === id);
    setForm({
      ...form,
      customer_id: id,
      customer_name: cust?.name || "",
    });
  }

  return (
    <DashboardLayout>
      <h1>Services</h1>
      <p>Manage vehicle services and reminders.</p>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>{form.id ? "Edit Service" : "Add New Service"}</h3>

        <div style={row}>
          <select
            value={form.customer_id}
            onChange={(e) => handleCustomerChange(e.target.value)}
            style={input}
            required
          >
            <option value="">Select Customer ID</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.user_id} - {c.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Customer Name"
            value={form.customer_name}
            readOnly
            style={input}
          />

          <input
            placeholder="Vehicle"
            value={form.vehicle}
            onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
            required
            style={input}
          />
        </div>

        <div style={row}>
          <input
            placeholder="Service Date"
            type="date"
            value={form.service_date}
            onChange={(e) =>
              setForm({ ...form, service_date: e.target.value })
            }
            required
            style={input}
          />

          <input
            placeholder="Reminder Months"
            value={form.reminder_months}
            onChange={(e) =>
              setForm({ ...form, reminder_months: Number(e.target.value) })
            }
            style={input}
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
            style={input}
          />
        </div>

        <button type="submit" style={button}>
          {form.id ? "Update Service" : "Add Service"}
        </button>
      </form>

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : services.length === 0 ? (
        <p>No services yet.</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Customer ID</th>
              <th style={th}>Customer Name</th>
              <th style={th}>Vehicle</th>
              <th style={th}>Service Date</th>
              <th style={th}>Reminder Date</th>
              <th style={th}>Amount</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td style={td}>{s.customer?.user_id || "-"}</td>
                <td style={td}>{s.customer?.name || "-"}</td>
                <td style={td}>{s.vehicle}</td>
                <td style={td}>
                  {new Date(s.service_date).toLocaleDateString()}
                </td>
                <td style={td}>
                  {new Date(s.reminder_date).toLocaleDateString()}
                </td>
                <td style={td}>{s.amount}</td>
                <td style={td}>
                  <button onClick={() => handleEdit(s)} style={editBtn}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
}

/* Styles */
const row: CSSProperties = { display: "flex", gap: 10, marginTop: 10 };
const input: CSSProperties = { flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" };
const formStyle: CSSProperties = { background: "white", padding: 20, borderRadius: 8, marginBottom: 30 };
const button: CSSProperties = { background: "#0070f3", color: "white", padding: "10px 20px", border: "none", borderRadius: 6, cursor: "pointer", marginTop: 10 };
const table: CSSProperties = { width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 8, overflow: "hidden" };
const th: CSSProperties = { textAlign: "left", padding: 12, fontWeight: 600 };
const td: CSSProperties = { padding: 12, borderBottom: "1px solid #eee" };
const editBtn: CSSProperties = { background: "#0070f3", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", marginRight: 6 };
const deleteBtn: CSSProperties = { background: "#dc3545", color: "white", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" };
