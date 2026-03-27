export class Nodo {
    valor: string;
    siguiente: Nodo | null;
    previo: Nodo | null;
    constructor(valor: string) {
        this.valor = valor;
        this.siguiente = null;
        this.previo = null;
    }
}

export class ListaEspera {
    cabeza: Nodo | null = null;
    agregar(nombre: string) {
        const nuevo = new Nodo(nombre);
        if (!this.cabeza) this.cabeza = nuevo;
        else {
            let temp = this.cabeza;
            while (temp.siguiente) temp = temp.siguiente;
            temp.siguiente = nuevo;
        }
}
atender() {
    const atendido = this.cabeza;
    if (this.cabeza) this.cabeza = this.cabeza.siguiente;
        return atendido;
    }
}

export class ListaMedicos {
    actual: Nodo | null = null;
    agregar(nombre: string) {
        const nuevo = new Nodo(nombre);
        if (!this.actual) {
            this.actual = nuevo;
            nuevo.siguiente = nuevo;
        } else {
            nuevo.siguiente = this.actual.siguiente;
            this.actual.siguiente = nuevo;
            this.actual = nuevo;
        }
    }

    rotar() {
        if (this.actual) this.actual = this.actual.siguiente;
    }   
}

export class ListaCircular {
    actual: Nodo | null = null;
    agregar(valor: string) {
        const nuevo = new Nodo(valor);
        if (!this.actual) {
            this.actual = nuevo;
            nuevo.siguiente = nuevo;
            nuevo.previo = nuevo;
        } else {
            const ultimo = this.actual.previo!;
            nuevo.siguiente = this.actual;
            nuevo.previo = ultimo;
            ultimo.siguiente = nuevo;
            this.actual.previo = nuevo;
        }
    }
    siguiente() {
        if (this.actual) this.actual = this.actual.siguiente;
    }
    previo() {
        if (this.actual) this.actual = this.actual.previo;
    }
}