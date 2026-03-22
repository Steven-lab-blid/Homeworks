// Challenge 04: Crear pilas

export interface Libro {
    nombre: string;
    isbn: string;
    autor: string;
    editorial: string;
}

class Pila {
    valor: Libro;
    siguiente: Pila | null = null;

    constructor(valor: Libro) {
        this.valor = valor;
    }
}

export class PilasLibros {
    top: Pila | null = null;

    push(nuevoLibro: Libro) {
        const nuevoNodo = new Pila(nuevoLibro);
        nuevoNodo.siguiente = this.top;
        this.top = nuevoNodo;
    }

    pop() {
        if (this.top) {
            this.top = this.top.siguiente;
        }
    }

    Lista(): Libro[] {
        const Lista: Libro[] = [];
        let nodoActual = this.top;
        while (nodoActual) {
            Lista.push(nodoActual.valor);
            nodoActual = nodoActual.siguiente;
        }
        return Lista;
    }
}