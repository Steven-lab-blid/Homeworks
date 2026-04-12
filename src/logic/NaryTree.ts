import type { MenuNode } from "../types/tree";

export class NaryTree {
    root: MenuNode;

    constructor(rootTitle: string) {
        this.root = { title: rootTitle, children: [] };
    }

    addChild(parentTitle: string, childTitle: string, link: string = "#") {
        const parent = this.findNode(this.root, parentTitle);
        if(parent) {
            parent.children.push({
                title: childTitle,
                link: link,
                children: []
            });
        }
    }

    private findNode(current: MenuNode, title: string): MenuNode | null {
        if(current.title === title) 
            return current;
        for(const child of current.children) {
            const found = this.findNode(child, title);
            if(found)
                return found;
        }
        return null;
    }
}