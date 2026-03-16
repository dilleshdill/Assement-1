import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const storedAuth = localStorage.getItem("auth")

    if (storedAuth === "true") {
      setIsAuth(true)
    }

    setLoading(false)

  }, [])

  const login = (username, password) => {

    if (username === "testuser" && password === "Test123") {
      localStorage.setItem("auth", "true")
      setIsAuth(true)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("auth")
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext