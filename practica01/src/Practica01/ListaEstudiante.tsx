import {type Estudiante} from "../main.tsx";

interface ListaEstudianteProps {
  estudiantes: Estudiante[];
  eliminar: (codigo: number) => void;
}

export default function ListaEstudiante({ estudiantes, eliminar }: ListaEstudianteProps) {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.codigo}>
            {estudiante.nombre} - {estudiante.edad} años - Código: {estudiante.codigo}
            <button onClick={() => eliminar(estudiante.codigo)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}