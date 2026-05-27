class TrieNode {
    public children: { [key: string]: TrieNode } = {};
    public isEndOfWord: boolean = false;
    public songTitle: string = "";
}

export class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    public insert(title: string): void {
        if (!title) return;
        let current = this.root;


        const normalizedTitle = title.trim();

        for (const char of normalizedTitle.toLowerCase()) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isEndOfWord = true;
        current.songTitle = normalizedTitle; // Guardamos la versión con formato original
    }


    public search(title: string): boolean {
        if (!title) return false;
        let current = this.root;
        for (const char of title.trim().toLowerCase()) {
            if (!current.children[char]) return false;
            current = current.children[char];
        }
        return current.isEndOfWord;
    }


    public getSuggestions(prefix: string): string[] {
        let current = this.root;
        const suggestions: string[] = [];

        for (const char of prefix.trim().toLowerCase()) {
            if (!current.children[char]) {
                return []; // No hay coincidencias
            }
            current = current.children[char];
        }

        this.findWordsFromNode(current, suggestions);
        return suggestions;
    }

    private findWordsFromNode(node: TrieNode, results: string[]): void {
        if (node.isEndOfWord) {
            results.push(node.songTitle);
        }

        for (const char in node.children) {
            this.findWordsFromNode(node.children[char], results);
        }
    }
}