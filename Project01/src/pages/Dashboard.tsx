import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hola, {auth?.user?.name}</h1>
      <p>Selecciona un ejercicio, para probarlo</p>
      
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        <button 
          onClick={() => navigate("/cajero")}
          style={{ padding: "20px", fontSize: "18px", cursor: "pointer" }}
        >
          Ejercicio Cajero
        </button>

        <button 
          onClick={() => navigate("/libreria")}
          style={{ padding: "20px", fontSize: "18px", cursor: "pointer" }}
        >
          Ejercicio Librería
        </button>
      </div>

      <button 
        onClick={() => auth?.logout()} 
        style={{ marginTop: "40px", color: "red" }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}