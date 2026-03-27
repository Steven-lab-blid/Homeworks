import { useState } from "react";
import { ListaProductos } from "./ListaProductos";

const Reproductor = new ListaProductos();
    Reproductor.agregarProducto("Coca-cola");
    Reproductor.agregarProducto("Pepsi");
    Reproductor.agregarProducto("Fanta");
    Reproductor.agregarProducto("Sprite");

export default function Productos() {
    const [currentproductos, setcurrentproductos] = useState(Reproductor.head);

    const siguienteProducto = () => {
        if (currentproductos?.siguiente) {
            setcurrentproductos(currentproductos.siguiente);
        } else {
            alert("No hay más productos");
        }
    };

        return (
            <div>
                <h1>Producto: {currentproductos?.value}</h1>
                <button onClick={siguienteProducto}>Siguiente producto</button>
            </div>
        );
    }