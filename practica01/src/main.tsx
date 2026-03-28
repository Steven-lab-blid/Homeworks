import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import './index.css'
import FormEstudiante from './Practica01/formEstudiante.tsx'
import ListaEstudiante from './Practica01/ListaEstudiante.tsx'
import ReproductorComponent from './Practica02/Reproductor.tsx'

export interface Estudiante {
  nombre: string;
  edad: number;
  codigo: number;
}

function App() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const agregarEstudiante = (estudiante: Estudiante) => {
    setEstudiantes([...estudiantes, estudiante]);
  };

  const eliminarEstudiante = (codigo: number) => {
    setEstudiantes(estudiantes.filter(est => est.codigo !== codigo));
  };

  return (
    <div>
      <h1>Gestión de Estudiantes</h1>
      <FormEstudiante agregar={agregarEstudiante} />
      <ListaEstudiante estudiantes={estudiantes} eliminar={eliminarEstudiante} />
    </div>
  );
}

function AppReproductor() {
  return (
    <div>
      <ReproductorComponent />
    </div>
  );
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AppReproductor />
  </StrictMode>,
)
