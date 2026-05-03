import React, { useState, useMemo } from 'react'
import { Trie } from '../structure/trie'
import { MaxHeap } from '../structure/maxHeap'
import type { Product } from '../types/types'

export const Search: React.FC = () => {
    const trie = useMemo(() => new Trie(), []);

    const [name, setName] = useState('');
    const [popularity, setpopularity] = useState(0);
    const [query, setQuery] = useState('');
    const [Value, setValue] = useState(2);
    const [topResults, setTopResults] = useState<Product[]>([]);

    const handleInsert = () => {
        if (name && popularity >= 0) {
            trie.insert({ name, popularity });
            setName('');
            setpopularity(0);
        }
    };

    const handleSearch = (val: string) => {
        setQuery(val);
        if (val.length === 0) {
            setTopResults([]);
            return;
        }

        const matches = trie.searchByPrefix(val);

        const heap = new MaxHeap(matches);
        const topK: Product[] = [];
        for (let i = 0; i < Value; i++) {
            const top = heap.pop();
            if (top) topK.push(top);
        }
        setTopResults(topK);
    };

    return (
        <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
            <div style={cardStyle}>
                <h3 style={{ color: '#005088' }}>Registrar Producto</h3>
                <input
                    placeholder="Nombre (ej: Air Max)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Popularidad"
                    value={popularity}
                    onChange={(e) => setpopularity(Number(e.target.value))}
                />
                <button onClick={handleInsert}>Guardar</button>
            </div>

            <div style={{ ...cardStyle, flex: 1, backgroundColor: '#f3f0df' }}>
                <h3 style={{ color: '#005088' }}>Buscador y Top K</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        style={{ flex: 1 }}
                        placeholder="Buscar por prefijo..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <input
                        type="number"
                        style={{ width: '60px' }}
                        value={Value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        title="K resultados"
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <strong>Top {Value} resultados:</strong>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {topResults.map((p, i) => (
                            <li key={i} style={itemStyle}>
                                <span>{p.name}</span>
                                <span style={popBadge}>⭐ {p.popularity}</span>
                            </li>
                        ))}
                        {query && topResults.length === 0 && <li>No hay coincidencias</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #005088',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: '300px'
};

const itemStyle: React.CSSProperties = {
    padding: '10px',
    background: 'white',
    margin: '5px 0',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const popBadge: React.CSSProperties = {
    background: '#005088',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '12px'
};