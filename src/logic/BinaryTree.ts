import  type { TreeNode } from '../types/tree';

class Node {
    value: number;
    left: Node | null = null;
    right: Node | null = null;

    constructor (value: number) {
        this.value = value;
    }
}

export class BinaryTree {
    root: Node | null = null;

    insert(value: number){
        const newNode = new Node(value);
        if(!this.root) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }

    private insertNode(node: Node, newNode: Node) {
        if(newNode.value < node.value) {
            if(!node.left) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if(!node.right) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    getTreeData(): TreeNode | null {
        if(!this.root) return null;

        const mapNode = (node: Node): TreeNode => ({
            name: node.value.toString(),
            children: [
                ...(node.left ? [mapNode(node.left)]:[]),
                ...(node.right ? [mapNode(node.right)]:[]),
            ],
        });
        return mapNode(this.root);
    }

    inOrder(node = this.root){
        if(node) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }
}