"use client"

import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/"); // instantly sends user to /home
}

// // app/login/page.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "../../lib/supabaseClient"

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   // Redirect if already logged in
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (user) router.replace("/")
//     })
//   }, [router])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     const { error } = await supabase.auth.signInWithPassword({ email, password })

//     if (error) {
//       alert(error.message)
//       setLoading(false)
//       return
//     }

//     router.replace("/")
//   }

//   return (
//     <main style={mainStyle}>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <h1 style={logoStyle}>AutoTech</h1>
//         <h2 style={headingStyle}>Welcome Back</h2>
//         <p style={subHeadingStyle}>Sign in to manage your services and customers</p>

//         <label style={labelStyle}>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <label style={labelStyle}>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <button type="submit" disabled={loading} style={buttonStyle}>
//           {loading ? "Signing in..." : "Login"}
//         </button>
//       </form>
//     </main>
//   )
// }

// // Styles
// const mainStyle: React.CSSProperties = {
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "#f4f6f8",
//   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// }

// const formStyle: React.CSSProperties = {
//   width: "380px",
//   padding: "40px",
//   background: "white",
//   borderRadius: "12px",
//   boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
// }

// const logoStyle: React.CSSProperties = {
//   textAlign: "center",
//   fontSize: "32px",
//   fontWeight: "700",
//   color: "#333",
//   marginBottom: "10px",
// }

// const headingStyle: React.CSSProperties = {
//   textAlign: "center",
//   fontSize: "22px",
//   color: "#333",
//   marginBottom: "5px",
// }

// const subHeadingStyle: React.CSSProperties = {
//   textAlign: "center",
//   fontSize: "14px",
//   color: "#555",
//   marginBottom: "25px",
// }

// const labelStyle: React.CSSProperties = {
//   display: "block",
//   marginBottom: "6px",
//   color: "#333",
//   fontWeight: 500,
// }

// const inputStyle: React.CSSProperties = {
//   width: "100%",
//   padding: "12px",
//   marginBottom: "20px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "14px",
//   color: "#000", // typed text will be black
// }


// const buttonStyle: React.CSSProperties = {
//   width: "100%",
//   padding: "12px",
//   background: "#0d6efd",
//   color: "white",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "16px",
//   fontWeight: 600,
//   transition: "background 0.3s",
// }

