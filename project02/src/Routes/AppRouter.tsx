import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/login"
import Register from "../pages/register"
import Dashboard from "../pages/Dashboard"
import { useAuthContext } from "../Context/AuthContext"
import type { JSX } from "react"

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthContext()

  if (loading) return <p>Cargando...</p>
  if (!user) return <Navigate to="/login" />

  return children
}

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
  )
}