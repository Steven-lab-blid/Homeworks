import { useState } from "react";

interface FormEstudianteProps {
  agregar: (estudiante: { nombre: string; edad: number; codigo: number }) => void;
}

export default function FormEstudiante ({agregar}: FormEstudianteProps) {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [codigo, setCodigo] = useState(0);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    agregar({ nombre, edad, codigo });
    setNombre("");
    setEdad(0);
    setCodigo(0);
  };

    return (
      <form onSubmit={enviar}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Código:</label>
          <input
            type="number"
            value={codigo}
            onChange={(e) => setCodigo(Number(e.target.value))}
          />
        </div>
        <button type="submit">Agregar Estudiante</button>
      </form>
    );
}