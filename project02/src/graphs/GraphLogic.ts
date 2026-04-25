import type { Person, City, D3GraphData } from './graphsType';

export class ChallengeGraph {
    private adjList: Map<string, string[]>;
    private nodes: Map<string, Person | City>;

    constructor() {
        this.adjList = new Map();
        this.nodes = new Map();
    }

    addNode(node: Person | City) {
        if (!this.nodes.has(node.name)) {
            this.nodes.set(node.name, node);
            this.adjList.set(node.name, []);
        }
    }

    addEdge(node1: string, node2: string) {
        if (this.adjList.has(node1) && this.adjList.has(node2)) {
            if (!this.adjList.get(node1)?.includes(node2)) {
                this.adjList.get(node1)?.push(node2);
                this.adjList.get(node2)?.push(node1);
            }
        }
    }

    getCities(): string[] {
        return Array.from(this.nodes.values())
            .filter(n => n.type === 'city')
            .map(n => n.name);
    }

    getPeopleInCity(cityName: string): Person[] {
        const neighbors = this.adjList.get(cityName) || [];
        return neighbors
            .map(name => this.nodes.get(name))
            .filter((node): node is Person => node?.type === 'person');
    }

    getVisualData(): D3GraphData {
        const nodes: any[] = [];
        const links: any[] = [];

        this.nodes.forEach((node) => {
            nodes.push({
                id: node.name,
                label: node.type === 'person' 
                    ? `${node.name} (${(node as Person).age} años)` 
                    : `${node.name}`,
                type: node.type,
                color: node.type === 'person' ? '#d7dce4' : '#c5a5a5',
                val: node.type === 'person' ? 8 : 15
            });
        });

        this.adjList.forEach((neighbors, source) => {
            neighbors.forEach(target => {
                if (source < target) links.push({ source, target });
            });
        });

        return { nodes, links };
    }
}