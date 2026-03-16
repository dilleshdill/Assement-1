import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

export default function ProtectedRoute({ children }) {

  const { isAuth, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}