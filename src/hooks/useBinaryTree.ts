import { useState, useMemo } from "react";
import { BinaryTree } from "../logic/BinaryTree";
import type { TreeNode } from "../types/tree";

export const useBinaryTree = () => {
    const bst = useMemo(() => new BinaryTree(), []);
    const [treeData, setTreeData] = useState<TreeNode | null>(null);
    const [NodesList, setNodesList] = useState<number[]>([]);

    const insertNode = (val: number) => {
        bst.insert(val);
        setNodesList(prev => [...prev, val]);
        setTreeData(bst.getTreeData());
    };

    const resetTree = () => {
        bst.root = null;
        setTreeData(null);
        setNodesList([]);
    };

    return { treeData, NodesList, insertNode, resetTree };
};