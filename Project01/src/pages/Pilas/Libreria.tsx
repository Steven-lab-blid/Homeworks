import { useState } from "react";
import { PilasLibros, type Libro } from "./PilasLibros";

const Pila = new PilasLibros();

Pila.push({ nombre: "El Quijote", isbn: "978", autor: "Miguel de Cervantes", editorial: "Editorial A" });
Pila.push({ nombre: "Cien Años de Soledad", isbn: "979", autor: "Gabriel García Márquez", editorial: "Editorial B" });
Pila.push({ nombre: "La Sombra del Viento", isbn: "980", autor: "Carlos Ruiz Zafón", editorial: "Editorial C" });
Pila.push({nombre: "Harry Potter y la Piedra Filosofal", isbn: "981", autor: "J.K. Rowling", editorial: "Editorial D" });

export default function Libreria() {
    const [libros, setLibros] = useState<Libro[]>(Pila.Lista());
    const [formulario, setFormulario] = useState({
        nombre: '',
        isbn: '',
        autor: '',
        editorial: '',
    });

    const manejarSubida = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formulario.nombre || !formulario.isbn || !formulario.autor || !formulario.editorial) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        Pila.push({ ...formulario });
        setLibros(Pila.Lista());
        setFormulario({
            nombre: "",
            isbn: "",
            autor: "",
            editorial: "",
        });
    };

        const manejarEliminar = () => {
            Pila.pop();
            setLibros(Pila.Lista());
        };

        return (
            <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                <h2>📚 Libreria </h2>

                <form onSubmit={manejarSubida} style={{ display: 'grid', gap: '10px' }}>
                    <input placeholder="Nombre del Libro" value={formulario.nombre} onChange={e => setFormulario({ ...formulario, nombre: e.target.value })} />
                    <input placeholder="ISBN" value={formulario.isbn} onChange={e => setFormulario({ ...formulario, isbn: e.target.value })} />
                    <input placeholder="Autor" value={formulario.autor} onChange={e => setFormulario({ ...formulario, autor: e.target.value })} />
                    <input placeholder="Editorial" value={formulario.editorial} onChange={e => setFormulario({ ...formulario, editorial: e.target.value })} />
                    <button type="submit" style={{ background: '#2ecc71', color: 'white' }}>Agregar Libro</button>
                </form>

                <hr />

                <button
                    onClick={manejarEliminar}
                    disabled={libros.length === 0}
                    style={{ width: '100%', background: '#e74c3c', color: 'white', marginBottom: '20px' }}
                >Quitar último libro
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {libros.map((libro, index) => (
                        <div key={index} style={{
                            boxShadow: '0 4px 6px rgba(199, 138, 138, 0.1)'
                        }}>
                            <strong>{index === 0 ? "🔝 " : ""}{libro.nombre}</strong>
                            <p style={{ margin: 0, fontSize: '12px' }}>{libro.autor} | {libro.isbn}</p>
                        </div>
                    ))}
                    {libros.length === 0 && <p>La pila está vacía.</p>}
                </div>
            </div>
        );
    }