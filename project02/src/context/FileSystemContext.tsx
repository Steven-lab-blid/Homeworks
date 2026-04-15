import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { FileNode } from '../models/Tree';
import type { INode, NodeType } from '../interfaces/FileSystem';

interface FileSystemContextType {
  rootNodes: FileNode[];
  createNode: (name: string, type: NodeType, parentId: string | null) => Promise<void>;
  loading: boolean;
}

export const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

export const FileSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [rootNodes, setRootNodes] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRootNodes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'files'), 
      where('ownerEmail', '==', user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const flatNodes: INode[] = [];
      snapshot.forEach((doc) => {
        flatNodes.push({ id: doc.id, ...doc.data() } as INode);
      });

      const tree = buildTree(flatNodes);
      setRootNodes(tree);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const createNode = async (name: string, type: NodeType, parentId: string | null) => {
    if (!user) return;

    await addDoc(collection(db, 'files'), {
      name,
      type,
      parentId,
      ownerEmail: user.email,
      createdAt: Date.now()
    });
  };

  return (
    <FileSystemContext.Provider value={{ rootNodes, createNode, loading }}>
      {children}
    </FileSystemContext.Provider>
  );
};

function buildTree(nodes: INode[]): FileNode[] {
  const map: { [key: string]: FileNode } = {};
  const roots: FileNode[] = [];

  nodes.forEach(node => {
    map[node.id] = new FileNode(node.id, node.name, node.type, node.ownerEmail, node.parentId);
  });

  nodes.forEach(node => {
    if (node.parentId && map[node.parentId]) {
      map[node.parentId].addChild(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  });

  return roots;
}