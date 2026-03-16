import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState("testuser")
  const [password, setPassword] = useState("Test123")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert("Please enter username and password")
      return
    }

    setLoading(true)

    const success = login(username, password)

    if (success) {
      navigate("/list")
    } else {
      alert("Invalid credentials")
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-8">

          <h1 className="text-3xl font-bold mb-4">
            Employee Insights
          </h1>

          <p className="text-center text-blue-100">
            Secure access to employee analytics and verification tools.
          </p>

        </div>

        <div className="p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              className="w-full border border-gray-300 p-3 rounded-lg outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Demo credentials: testuser / Test123
          </p>

        </div>

      </div>

    </div>

  )
}