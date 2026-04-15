import React, { useState } from 'react';
import { FileNode } from '../models/Tree';
import { useFileSystem } from '../hooks/useFileSystem';
import './FileItem.css';

interface FileItemProps {
  node: FileNode;
}

const FileItem: React.FC<FileItemProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState('');
  const { createNode } = useFileSystem();

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const handleAddChild = async (type: 'folder' | 'file') => {
    if (!newName.trim()) return;
    await createNode(newName, type, node.id);
    setNewName('');
    setShowInput(false);
    setIsOpen(true);
  };

  return (
    <div className="file-item-container">
      <div className={`file-item ${node.type}`} onClick={toggleOpen}>
        <span className="icon">
          {node.type === 'folder' ? (isOpen ? '📂' : '📁') : '📄'}
        </span>
        <span className="name">{node.name}</span>
        
        {node.type === 'folder' && (
          <button 
            className="btn-add-child" 
            onClick={(e) => { e.stopPropagation(); setShowInput(!showInput); }}
          >
            +
          </button>
        )}
      </div>

      {showInput && (
        <div className="add-child-input">
          <input 
            autoFocus
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre..."
          />
          <button onClick={() => handleAddChild('folder')}>📁</button>
          <button onClick={() => handleAddChild('file')}>📄</button>
        </div>
      )}

      {isOpen && node.children && (
        <div className="children-container">
          {node.children.map((child) => (
            <FileItem key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileItem;