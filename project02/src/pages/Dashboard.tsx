import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFileSystem } from '../hooks/useFileSystem';
import FileItem from '../components/FileItem';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { rootNodes, createNode, loading } = useFileSystem();
  const [newItemName, setNewItemName] = useState('');

  const handleCreate = async (type: 'folder' | 'file') => {
    if (!newItemName.trim()) return;
    
    try {
      
      await createNode(newItemName, type, null);
      setNewItemName(''); // Limpiar input
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <span>Bienvenido, <strong>{user?.email}</strong></span>
          <button className="btn-logout" onClick={logout}>Cerrar Sesión</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="controls">
          <input 
            type="text" 
            placeholder="Nombre del nuevo elemento..." 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <div className="button-group">
            <button className="btn-create" onClick={() => handleCreate('folder')}>
              Nueva Carpeta
            </button>
            <button className="btn-create file" onClick={() => handleCreate('file')}>
              Nuevo Archivo
            </button>
          </div>
        </section>

        <section className="tree-viewer">
          <h2>Mi Unidad</h2>
          {loading ? (
            <p>Cargando archivos...</p>
          ) : (
            <div className="tree-root">
              {rootNodes.length === 0 ? (
                <p className="empty-msg">No hay archivos aún. ¡Crea el primero!</p>
              ) : (
                rootNodes.map(node => (
                  <FileItem key={node.id} node={node} />
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;