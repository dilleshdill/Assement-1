import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./context/AuthContext"

import Login from "./pages/Login"
import List from "./pages/List"
import Details from "./pages/Details"
import Analytics from "./pages/Analytics"

import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {

  const { isAuth } = useContext(AuthContext)

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/list" /> : <Login />}
        />

        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <Layout>
                <List />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Details />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App