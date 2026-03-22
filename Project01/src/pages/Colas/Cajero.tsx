import React, { useState } from 'react';
import { ColaCajero, type Persona } from './ColaCajero';

const miCola = new ColaCajero();

miCola.enqueue({ nombre: 'Juan', monto: 100, fecha: new Date().toLocaleString() });
miCola.enqueue({ nombre: 'Maria', monto: 200, fecha: new Date().toLocaleString() });
miCola.enqueue({ nombre: 'Pedro', monto: 150, fecha: new Date().toLocaleString() });

export default function Cajero() {
    const [fila, setFila] = useState<Persona[]>(miCola.Lista());
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');

    const registrar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre || !monto)
            return alert("Por favor, complete ambos campos.");
        
        const nuevaPersona: Persona = {
            nombre,
            monto: Number(monto),
            fecha: new Date().toLocaleString()
            };
            
        miCola.enqueue(nuevaPersona);
        setFila(miCola.Lista());
        setNombre('');
        setMonto('');
    };

    const atenderPersona = () => {
        miCola.dequeue();
        setFila(miCola.Lista());
    };

    return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2980b9' }}>Cajero Automático</h2>

      <form onSubmit={registrar} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="Nombre" 
          value={nombre} 
          onChange={e => setNombre(e.target.value)} 
          style={{ flex: 2, padding: '8px' }}
        />
        <input 
          type="number" 
          placeholder="Monto" 
          value={monto || ''} 
          onChange={e => setMonto(e.target.value)} 
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>
          Ingresar
        </button>
      </form>

      <button 
        onClick={atenderPersona} 
        disabled={fila.length === 0}
        style={{ width: '100%', padding: '10px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', marginBottom: '20px' }}
      >
        Atender Siguiente ➡️
      </button>

      <div style={{ border: '2px solid #34495e', borderRadius: '10px', padding: '10px', background: '#f4f4f4' }}>
        <h4>Personas en espera: {fila.length}</h4>
        {fila.map((p, i) => (
          <div key={i} style={{ 
            background: i === 0 ? '#d1f2eb' : 'white', 
            padding: '10px', 
            margin: '5px 0', 
            borderRadius: '5px',
            borderLeft: i === 0 ? '5px solid #1abc9c' : '5px solid #bdc3c7',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{i + 1}. {p.nombre}</strong> <br />
              <small>Retiro: ${p.monto}</small>
            </div>
            <span style={{ fontSize: '10px', color: '#7f8c8d' }}>{p.fecha}</span>
          </div>
        ))}
        {fila.length === 0 && <p>No hay nadie en el cajero.</p>}
      </div>
    </div>
  );
}