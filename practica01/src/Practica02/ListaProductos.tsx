class Productos {
    value: string;
    siguiente: Productos | null;
    anterior: Productos | null;

    constructor(value: string) {
        this.value = value;
        this.siguiente = null;
        this.anterior = null;
    }   
}

export class ListaProductos {
    head: Productos | null = null;

    agregarProducto(value: string) {
        const nuevoProducto = new Productos(value);
        if (!this.head) {
            this.head = nuevoProducto;
        } else {
            let current = this.head;
            while (current?.siguiente) {
                current = current.siguiente;
            }
            current!.siguiente = nuevoProducto;
            nuevoProducto.anterior = current;
        }
    }
}

class Navegacion {
    value: string;
    siguiente: Navegacion | null;
    anterior: Navegacion | null;

    constructor(value: string) {
        this.value = value;
        this.siguiente = null;
        this.anterior = null;
    }   
}

export class ListaNavegacion {
    head: Navegacion | null = null;

    agregarNavegacion(value: string) {
        const nuevaNavegacion = new Navegacion(value);
        if (!this.head) {
            this.head = nuevaNavegacion;
        } else {
            let current = this.head;
            while (current?.siguiente) {
                current = current.siguiente;
            }
            current!.siguiente = nuevaNavegacion;
            nuevaNavegacion.anterior = current;
        }
    }
}