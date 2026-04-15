export type NodeType = 'folder' | 'file';

export interface INode {
    id: string;
    name: string,
    type: NodeType;
    parentId: string | null;
    ownerEmail: string;
    children?: INode[];
    createdAt: number;
}