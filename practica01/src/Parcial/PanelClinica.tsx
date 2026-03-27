import { useState, useEffect, use } from "react";
import { ListaEspera, ListaMedicos, Nodo } from "./LogicaClinica";
import { ListaCircular } from "./LogicaClinica";

const espera = new ListaEspera();
const medicos = new ListaMedicos();
const comite = new ListaCircular();

[
"Dr. Guzman",
"Dr. Benavidez",
"Dr. Vargas"
].forEach(m => medicos.agregar(m));

[
"Director",
"Secretaria",
"Enfermero"
].forEach(c => comite.agregar(c));

export default function Clinica() {
    const [pacientes, setPacientes] = useState<Nodo | null>(null);
    const [Historial, setHistorial] = useState<string[]>([]);
    const [MedicoActual, setMedicoActual] = useState(medicos.actual);
    const [nombreAgregar, setNombreAgregar] = useState("");
    const [comiteActual, setComiteActual] = useState(comite.actual);

    useEffect(() => {
        const intervalo = setInterval(() => {
            medicos.rotar();
            setMedicoActual(medicos.actual);
        }, 10000);
        return () => clearInterval(intervalo);
    }, []);

    const agregarPaciente = () => {
        if (!nombreAgregar) 
            return;
        espera.agregar(nombreAgregar);
        setPacientes({...espera.cabeza!});
        setNombreAgregar("");
    };

    const atenderPaciente = () => {
        const paciente = espera.atender();
        if (paciente) {
            setHistorial([paciente.valor, ...Historial]);
            setPacientes(espera.cabeza? {...espera.cabeza} : null);
        }
    };

    const moverComite = (direccion: 'siguiente' | 'previo') => {
        if (direccion === 'siguiente') 
            comite.siguiente();
        else 
            comite.previo();
            setComiteActual(comite.actual);
    };

    return (
    <div style={{ padding: '20px', fontFamily: 'Verdana', color: '#e22828' }}>
      <h1>🏥 Sistema de Gestión Clínica</h1>

      <div style={{ background: '#eef', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🩺 Guardia Activa <small>(Intervalos de 10 segundos)</small>:</h3>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>{MedicoActual?.valor}</h2>
      </div>
      
      <div style={{ background: '#fdf2e9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🏢 Comité Administrativo:</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => moverComite('previo')} style={{ background: '#08110a', color: 'white', padding: '5px'}}>🔙 Pre</button>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{comiteActual?.valor}</span>
          <button onClick={() => moverComite('siguiente')} style={{ background: '#08110a', color: 'white', padding: '5px' }}>Sig 🔜</button>
        </div>
      </div>

      <hr />

      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section>
          <h3>📥 Ingreso de Pacientes</h3>
          <input 
            value={nombreAgregar} 
            onChange={e => setNombreAgregar(e.target.value)} 
            placeholder="Nombre del paciente"
          />
          <button onClick={agregarPaciente} style={{ background: '#055211', color: 'white', padding: '5px' }}>Registrar </button>

          <h4>🕒 Lista de Espera</h4>
          <button onClick={atenderPaciente} style={{ background: '#27ae60', color: 'white', padding: '10px' }}>
            Atender al siguiente paciente
          </button>
          <ul>
            {pacientes ? <li>{pacientes.valor}</li> : <li>Lista Vacia</li>}
          </ul>
        </section>

        <section>
          <h3>📜 Historial de Atención</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
            {Historial.length === 0 ? <p>Historial Vacio.</p> : (
              <ul>
                {Historial.map((p, i) => <li key={i}>✅ {p}</li>)}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}