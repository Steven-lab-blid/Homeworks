import React, { useState } from 'react';
import { Trie } from '../structures/Trie';

interface SearchSongProps {
  trie: Trie;
  onSelectSong?: (song: string) => void;
}

export const SearchSong: React.FC<SearchSongProps> = ({ trie, onSelectSong }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const matches = trie.getSuggestions(value);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
    setSearchResult(null);
  };

  const handleSearchExact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const exists = trie.search(query);
    if (exists) {
      setSearchResult(`✅ ¡Encontrada! "${query}" está disponible en la plataforma.`);
    } else {
      setSearchResult(`❌ No se encontró "${query}". Prueba con otra canción.`);
    }
  };

  const handleSuggestionClick = (song: string) => {
    setQuery(song);
    setSuggestions([]);
    setSearchResult(`Seleccionada: "${song}"`);
    if (onSelectSong) onSelectSong(song);
  };

  return (
    <div className="panel-section search-song-panel">
      <h2>Buscador Predictivo</h2>
      <form onSubmit={handleSearchExact} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="¿Qué deseas escuchar hoy?"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#242424',
            color: '#fff',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{
            backgroundColor: '#1db954',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 15px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Buscar
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul style={{
          listStyle: 'none',
          backgroundColor: '#1c1c1c',
          border: '1px solid #333',
          borderRadius: '4px',
          maxHeight: '150px',
          overflowY: 'auto',
          marginBottom: '15px',
          padding: '5px 0'
        }}>
          {suggestions.map((song, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(song)}
              style={{
                padding: '8px 15px',
                cursor: 'pointer',
                color: '#b3b3b3',
                borderBottom: index < suggestions.length - 1 ? '1px solid #282828' : 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#282828')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {song}
            </li>
          ))}
        </ul>
      )}

      {searchResult && (
        <p style={{ 
          marginTop: '10px', 
          fontSize: '0.9rem', 
          color: searchResult.includes('✅') ? '#1db954' : '#e91429',
          fontWeight: '500'
        }}>
          {searchResult}
        </p>
      )}
    </div>
  );
};