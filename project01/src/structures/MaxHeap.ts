export interface SongItem {
  id: string;
  title: string;
  replays: number;
}

export class MaxHeap {
  private heap: SongItem[] = [];

  constructor() { }

  public size(): number {
    return this.heap.length;
  }

  public push(song: SongItem): void {
    this.heap.push(song);
    this.percolateUp(this.heap.length - 1);
  }

  public pop(): SongItem | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.percolateDown(0);

    return root;
  }

  public peek(): SongItem | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  public getTopK(k: number): SongItem[] {
    const tempHeap = new MaxHeap();
    for (const song of this.heap) {
      tempHeap.push({ ...song });
    }

    const result: SongItem[] = [];
    const limit = Math.min(k, this.heap.length);

    for (let i = 0; i < limit; i++) {
      const topSong = tempHeap.pop();
      if (topSong) {
        result.push(topSong);
      }
    }

    return result;
  }

  private percolateUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[index].replays > this.heap[parentIndex].replays) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private percolateDown(index: number): void {
    const length = this.heap.length;

    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let largest = index;

      if (leftChild < length && this.heap[leftChild].replays > this.heap[largest].replays) {
        largest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild].replays > this.heap[largest].replays) {
        largest = rightChild;
      }

      if (largest !== index) {
        this.swap(index, largest);
        index = largest;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}