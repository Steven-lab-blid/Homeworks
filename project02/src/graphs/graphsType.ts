export interface Person {
    name: string;
    age: number;
    type: 'person';
}

export interface City {
    name: string;
    type: 'city';
}

export interface D3GraphData {
    nodes: any[];
    links: any[];
}