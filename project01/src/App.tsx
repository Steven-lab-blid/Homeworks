import { useRef, useState, useEffect } from 'react';
import { Trie } from './structures/Trie';
import { MaxHeap } from './structures/MaxHeap';
import type { SongItem } from './structures/MaxHeap';
import { Graph } from './structures/Graph';

import { SearchSong } from './components/SearchSong';
import { SongRecommendations } from './components/SongRecommendations';
import { AddSongForm } from './components/AddSongForm'; 

export default function App() {
  const trieRef = useRef(new Trie());
  const heapRef = useRef(new MaxHeap());
  const graphRef = useRef(new Graph());

  const [topSongs, setTopSongs] = useState<SongItem[]>([]);
  const [allSongs, setAllSongs] = useState<SongItem[]>([]);
  const [, setTriggerUpdate] = useState(0);

  useEffect(() => {
    if (heapRef.current.size() > 0) return;

    const defaultSongs: SongItem[] = [
      { id: '1', title: 'Bubalu', replays: 95000 },
      { id: '2', title: '21 Questions', replays: 89000 },
      { id: '3', title: 'Yonaguni', replays: 72000 },
      { id: '4', title: 'Love me', replays: 45000 },
      { id: '5', title: 'Loco', replays: 61000 },
      { id: '6', title: 'Ojitos lindos', replays: 91000 },
      { id: '7', title: 'El telefono', replays: 53000 },
      { id: '8', title: 'Amanece', replays: 121000 },
      { id: '9', title: 'Luna', replays: 30000 },
      { id: '10', title: 'Angeles y demonios', replays: 200000 }
    ];

    defaultSongs.forEach(song => {
      trieRef.current.insert(song.title);
      heapRef.current.push(song);
      graphRef.current.addVertex(song.title);
    });
    
    graphRef.current.addEdge('Bubalu', 'Yonaguni');
    graphRef.current.addEdge('Ojitos lindos', 'Yonaguni');
    graphRef.current.addEdge('21 Questions', 'Love me');

    setTopSongs(heapRef.current.getTopK(5));
    setAllSongs(defaultSongs);
  }, []);

  const handleValueInsertion = (title: string, replays: number) => {
    trieRef.current.insert(title);

    const newSong: SongItem = {
      id: `custom-${Date.now()}`,
      title,
      replays
    };
    heapRef.current.push(newSong);

    graphRef.current.addVertex(title);
    graphRef.current.addEdge(title, 'Bubalu'); 

    setTopSongs(heapRef.current.getTopK(5));
    setAllSongs(prevSongs => [...prevSongs, newSong]);
    setTriggerUpdate(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Edu<span>fy</span></h1>
        <p>Plataforma de Música Educativa - Estructuras de Datos II</p>
      </header>

      <main className="dashboard-grid">
        <AddSongForm onAddSong={handleValueInsertion} />
        
        <SearchSong 
          trie={trieRef.current} 
          onSelectSong={(song) => console.log(`Reproduciendo: ${song}`)}
        />

        <div className="panel-section ranking-panel">
          <h2>TOP 5 - Canciones más Escuchadas</h2>
          {topSongs.length === 0 ? (
            <p style={{ color: '#b3b3b3', fontStyle: 'italic', fontSize: '0.9rem' }}>
              No hay reproducciones registradas todavía.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              {topSongs.map((song, index) => (
                <div
                  key={song.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#1c1c1c',
                    padding: '12px 15px',
                    borderRadius: '6px',
                    borderLeft: index < 3 ? '4px solid #1db954' : '4px solid #333'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontWeight: 'bold', color: index < 3 ? '#1db954' : '#b3b3b3' }}>
                      {index + 1}°
                    </span>
                    <p style={{ color: '#fff', fontSize: '0.95rem' }}>{song.title}</p>
                  </div>
                  <div style={{ backgroundColor: '#282828', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', color: '#fff' }}>
                    <strong>{song.replays.toLocaleString()}</strong> repr.
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SongRecommendations graph={graphRef.current} />

        <div className="panel-section library-panel" style={{ gridColumn: '1 / -1' }}>
          <h2>Biblioteca de Canciones ({allSongs.length})</h2>
          <div style={{ 
            marginTop: '15px', 
            maxHeight: '250px', 
            overflowY: 'auto',
            backgroundColor: '#111111',
            borderRadius: '6px',
            padding: '10px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#b3b3b3', fontSize: '0.85rem', borderBottom: '1px solid #282828' }}>
                  <th style={{ padding: '8px' }}>#</th>
                  <th style={{ padding: '8px' }}>Título</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Reproducciones</th>
                </tr>
              </thead>
              <tbody>
                {allSongs.map((song, index) => (
                  <tr 
                    key={song.id} 
                    style={{ 
                      borderBottom: '1px solid #1c1c1c', 
                      fontSize: '0.9rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#181818')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px', color: '#b3b3b3' }}>{index + 1}</td>
                    <td style={{ padding: '10px', color: '#fff', fontWeight: '500' }}>🎵 {song.title}</td>
                    <td style={{ padding: '10px', color: '#b3b3b3', textAlign: 'right' }}>{song.replays.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>
        Desarrollado por: Stiven Ortiz Muñoz | Estructuras de Datos II | Parcial 3 | 2026
      </footer>
    </div>
  );
}