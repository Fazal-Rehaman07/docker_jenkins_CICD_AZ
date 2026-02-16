export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("loggedIn") === "true"
}

export function login() {
  localStorage.setItem("loggedIn", "true")
}

export function logout() {
  localStorage.removeItem("loggedIn")
}
