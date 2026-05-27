export class Graph {
  private adjacencyList: Map<string, Set<string>> = new Map();

  constructor() {}

  public addVertex(song: string): void {
    const normalized = song.trim();
    if (!this.adjacencyList.has(normalized)) {
      this.adjacencyList.set(normalized, new Set());
    }
  }

  public addEdge(song1: string, song2: string): void {
    const s1 = song1.trim();
    const s2 = song2.trim();

    this.addVertex(s1);
    this.addVertex(s2);

    this.adjacencyList.get(s1)?.add(s2);
    this.adjacencyList.get(s2)?.add(s1);
  }

  public getRelated(song: string): string[] {
    const normalized = song.trim();
    const neighbors = this.adjacencyList.get(normalized);
    
    if (!neighbors) return [];
    return Array.from(neighbors);
  }

  public getAllVertices(): string[] {
    return Array.from(this.adjacencyList.keys());
  }
}