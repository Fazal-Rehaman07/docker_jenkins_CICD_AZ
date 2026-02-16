import DashboardLayout from "../components/DashboardLayout"

export default function Home() {
  return (
    <DashboardLayout>
      <h1 style={{ color: "#0d6efd" }}>
        Customer Service Dashboard
      </h1>

      <p style={{ marginTop: "10px" }}>
        Track vehicle services and send reminders.
      </p>

      <button
        style={{
          background: "#0d6efd",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Add New Service
      </button>
    </DashboardLayout>
  )
}
