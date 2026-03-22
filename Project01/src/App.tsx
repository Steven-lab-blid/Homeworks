import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext, type JSX } from "react";
import Login from "./pages/Login";
import Cajero from "./pages/Colas/Cajero";
import Libreria from "./pages/Pilas/Libreria";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/cajero" element={<PrivateRoute><Cajero /></PrivateRoute>} />
          <Route path="/libreria" element={<PrivateRoute><Libreria /></PrivateRoute>} />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}