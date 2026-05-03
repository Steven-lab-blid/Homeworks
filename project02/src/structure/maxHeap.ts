import type { Product } from '../types/types';

export class MaxHeap {
    heap: Product[] = [];

    constructor(initialProducts: Product[]) {
        this.heap = [...initialProducts];
        this.heapify();
    }

    private heapify() {
        const start = Math.floor(this.heap.length / 2 - 1);
        for (let i = start; i >= 0; i--) {
            this.percolateDown(i);
        }
    }

    push(product: Product) {
        this.heap.push(product);
        this.percolateUp();
    }

    pop(): Product | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.percolateDown(0);
        return top;
    }

    private percolateUp() {
        let curr = this.heap.length - 1;
        while (curr > 0) {
            let parent = Math.floor((curr - 1) / 2);
            if (this.heap[curr].popularity > this.heap[parent].popularity) {
                this.swap(curr, parent);
                curr = parent;
            } else break;
        }
    }

    private percolateDown(index: number) {
        let curr = index;
        while (2 * curr + 1 < this.heap.length) {
            let left = 2 * curr + 1;
            let rigth = 2 * curr + 2;
            let largest = left;

            if (rigth < this.heap.length && this.heap[rigth].popularity > this.heap[left].popularity) {
                largest = rigth;
            }

            if (this.heap[largest].popularity > this.heap[curr].popularity) {
                this.swap(curr, largest);
                curr = largest;
            } else break;
        }
    }
    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}