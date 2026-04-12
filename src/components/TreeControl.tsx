import { useState } from "react";

interface Props {
    onInsert: (value: number) => void;
    onReset: () => void;
    NodesList: number[];
}

export const TreeControl = ({ onInsert, onReset, NodesList }: Props) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const num = parseInt(inputValue);
        if(!isNaN(num)) {
            onInsert(num);
            setInputValue("");
        }
    };

return (
    <header style={headerStyle}>
      <h2>Binary Tree</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Número"
            style={inputStyle}
          />
          <button type="submit" style={btnInsertStyle}>Insertar</button>
        </form>
        <button onClick={onReset} style={btnResetStyle}>Borrar Todo</button>
      </div>
      <div><strong>Nodos:</strong> {NodesList.length > 0 ? NodesList.join(' → ') : 'Vacío'}</div>
    </header>
  );
};

const headerStyle = { padding: '20px', background: '#2c3e50', color: 'white' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: 'none' };
const btnInsertStyle = { padding: '8px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '5px' };
const btnResetStyle = { padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' };
