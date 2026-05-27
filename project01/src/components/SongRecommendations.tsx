import React, { useState, useEffect } from 'react';
import { Graph } from '../structures/Graph';

interface SongRecommendationsProps {
  graph: Graph;
}

export const SongRecommendations: React.FC<SongRecommendationsProps> = ({ graph }) => {
  const [songsList, setSongsList] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');
  const [relatedSongs, setRelatedSongs] = useState<string[]>([]);

  useEffect(() => {
    const vertices = graph.getAllVertices();
    setSongsList(vertices);
    
    if (vertices.length > 0 && !selectedSong) {
      setSelectedSong(vertices[0]);
      setRelatedSongs(graph.getRelated(vertices[0]));
    }
  }, [graph, selectedSong]);

  const handleSongChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const song = e.target.value;
    setSelectedSong(song);
    setRelatedSongs(graph.getRelated(song));
  };

  return (
    <div className="panel-section recommendations-panel">
      <h2>🎵 Canciones Relacionadas</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor="song-select" 
          style={{ display: 'block', fontSize: '0.85rem', color: '#b3b3b3', marginBottom: '6px' }}
        >
          Selecciona una canción para ver recomendaciones similares:
        </label>
        <select
          id="song-select"
          value={selectedSong}
          onChange={handleSongChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#242424',
            color: '#fff',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {songsList.length === 0 ? (
            <option value="">No hay canciones en la red...</option>
          ) : (
            songsList.map((song, index) => (
              <option key={index} value={song}>
                {song}
              </option>
            ))
          )}
        </select>
      </div>

      <div style={{ marginTop: '15px' }}>
        <p style={{ fontSize: '0.9rem', color: '#b3b3b3', marginBottom: '10px' }}>
          Basado en tus gustos, si te gusta <strong>{selectedSong || '...'}</strong> también te recomendamos:
        </p>

        {relatedSongs.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.85rem', paddingLeft: '5px' }}>
            Aún no se han conectado canciones similares para este tema.
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {relatedSongs.map((related, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#282828',
                  color: '#1db954',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  border: '1px solid rgba(29, 185, 84, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {related}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};