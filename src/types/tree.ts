export interface TreeNode {
    name: string;
    attributes?:{
        value: number;
    };
    children?: TreeNode[];
}

export interface MenuNode {
    title: string;
    link?: string;
    children: MenuNode[];
}