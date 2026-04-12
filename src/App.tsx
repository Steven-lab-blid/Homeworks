import { useState } from "react";
import { NaryTree } from "./logic/NaryTree";
import { SidebarItem } from "./components/Sidebar";
import { TreeControl } from "./components/TreeControl";
import { TreeView } from "./components/TreeView";
import { useBinaryTree } from "./hooks/useBinaryTree";
import { routeConfig } from "./routes/routes";


const menu = new NaryTree("Dashboard");
menu.addChild("Dashboard", "Arbol binario", "ch08");
menu.addChild("Dashboard", "Admin", "admin");
menu.addChild("admin", "Usuarios", "usuarios");
menu.addChild("admin", "Config", "config");

export default function App() {
  const [currentPath, setCurrentPath] = useState("ch08");
  const { treeData, NodesList, insertNode, resetTree } = useBinaryTree();

  const currentPage = routeConfig[currentPath] || { title: currentPath };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '260px', background: '#2c3e50', padding: '15px' }}>
        <SidebarItem
          node={menu.root}
          onNavigate={setCurrentPath}
          activePath={currentPath}
        />
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentPath === "ch08" ? (
          <>
            <TreeControl onInsert={insertNode} onReset={resetTree} NodesList={NodesList} />
            <div style={{ flex: 1 }}><TreeView data={treeData} /></div>
          </>
        ) : (
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>{currentPage.title}</h1>
            <p>Ruta actual: /{currentPath}</p>
          </div>
        )}
      </main>
    </div>
  );
}