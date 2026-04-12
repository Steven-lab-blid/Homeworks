import  Tree from "react-d3-tree";
import type { TreeNode } from "../types/tree";

interface Props {
    data: TreeNode | null;
}

export const TreeView = ({ data }: Props) => {
    if (!data) {
        return (
            <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <p>No hay datos para mostrar</p>
      </div>
        );
    }
    return (
        <div style={{ width: '100%', height: '100%', background: '#ecf0f1' }}>
      <Tree 
        data={data} 
        orientation="vertical"
        pathFunc="step"
        translate={{ x: window.innerWidth / 2, y: 50 }}
        collapsible={false}
      />
    </div>
  );
};