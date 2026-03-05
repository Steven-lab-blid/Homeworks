import { useState } from "react";
import { ListaProductos } from "./ListaProductos";

const Reproductor = new ListaProductos();
Reproductor.agregarProducto("Coca Cola");
Reproductor.agregarProducto("Pepsi");
Reproductor.agregarProducto("Fanta");
Reproductor.agregarProducto("Sprite");

export default function ReproductorComponent() {
    const [productos, setProductos] = useState(Reproductor.head);

    const siguienteProducto = () => {
        if (productos?.siguiente)
            setProductos(productos.siguiente);
    };

    const productoAnterior = () => {
        if (productos?.anterior)
            setProductos(productos.anterior);
    }; 

    return (
        <div>
            <h1>Productos</h1> 
            <p>{productos?.value}</p>
            <button onClick={siguienteProducto}>Siguiente</button>
            <button onClick={productoAnterior}>Anterior</button>  
        </div>
    );
}