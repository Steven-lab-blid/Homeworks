import type { Product } from '../types/types';

class TrieNode {
    children: { [key: string]: TrieNode } = {};
    isEndOfWord: boolean = false;
    productData: Product | null = null;
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(product: Product) {
        let current = this.root;
        const word = product.name.toLowerCase();

        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.productData = product;
    }

    searchByPrefix(prefix: string): Product[] {
        let current = this.root;
        const results: Product[] = [];

        for (const char of prefix.toLocaleLowerCase()) {
            if (!current.children[char])
                return [];
            current = current.children[char];
        }

        this.collectAllWords(current, results);
        return results;
    }

    private collectAllWords(node: TrieNode, results: Product[]) {
        if (node.isEndOfWord && node.productData) {
            results.push(node.productData);
        }

        for (const char in node.children) {
            this.collectAllWords(node.children[char], results);
        }
    }
}