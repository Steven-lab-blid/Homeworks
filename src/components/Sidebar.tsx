import { useState } from "react";
import type { MenuNode } from "../types/tree";

interface Props {
  node: MenuNode;
  activePath: string;
  onNavigate: (path: string) => void;
}

export const SidebarItem = ({ node, onNavigate, activePath }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  const isActive = activePath === node.link;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hasChildren) {
      setIsOpen(!isOpen);
    }

    if (node.link) {
      onNavigate(node.link);
    } else {
      console.warn('El nodo "${node.title}" no tiene un link asignado.')
    }
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        cursor: (node.link || hasChildren) ? 'pointer' : 'default',
        backgroundColor: isActive ? '#34495e' : 'transparent',
      }}
    >
      <div style={{ marginLeft: '10px' }}>
        <div
          onClick={handleToggle}
          style={{
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: isActive ? '#34495e' : 'transparent',
            color: 'white',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ marginRight: '8px' }}>
            {hasChildren ? (isOpen ? '📂' : '📁') : '📄'}
          </span>
          {node.title}
        </div>

        {hasChildren && isOpen && (
          <div style={{ borderLeft: '1px solid #5d6d7e', marginLeft: '10px' }}>
            {node.children.map((child) => (
              <SidebarItem
                key={child.link}
                node={child}
                onNavigate={onNavigate} // Aquí se pasa la función a los hijos (recursividad)
                activePath={activePath}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};