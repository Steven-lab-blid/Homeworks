// Challenge 05: Crear Colas

export interface Persona {
    nombre: string;
    monto: number;
    fecha: string;
}

class Nodo {
    valor: Persona;
    siguiente: Nodo | null = null;

    constructor(valor: Persona) {
        this.valor = valor;
    }
}

export class ColaCajero {
    frente: Nodo | null = null;
    final: Nodo | null = null;

    enqueue(persona: Persona) {
        const nuevo = new Nodo(persona);
        if (!this.frente) {
            this.frente = nuevo;
            this.final = nuevo;
        } else {
            if (this.final)
                this.final.siguiente = nuevo;
            this.final = nuevo;
        }
    }

    dequeue() {
        if (!this.frente) return null;
        const atentido = this.frente;
        this.frente = this.frente.siguiente;
        if (!this.frente) this.final = null;
        return atentido.valor;
    }

    Lista(): Persona[] {
        const lista: Persona[] = [];
        let temp = this.frente;
        while (temp) {
            lista.push(temp.valor);
            temp = temp.siguiente;
        }
        return lista;
    }
}