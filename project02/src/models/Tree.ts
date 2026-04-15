import type { INode, NodeType } from "../interfaces/FileSystem";

export class FileNode implements INode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  ownerEmail: string;
  createdAt: number;
  children?: FileNode[]; // Referencia a otros nodos (árbol n-ario)

  constructor(
    id: string,
    name: string,
    type: NodeType,
    ownerEmail: string,
    parentId: string | null = null
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.ownerEmail = ownerEmail;
    this.parentId = parentId;
    this.createdAt = Date.now();

    if (this.type === 'folder') {
      this.children = [];
    }
  }

  addChild(child: FileNode): void {
    if (this.type === 'file') {
      throw new Error("Acción inválida: Un archivo no puede contener otros elementos.");
    }
    
    if (this.children) {
      this.children.push(child);
    }
  }

  isFolder(): boolean {
    return this.type === 'folder';
  }
}