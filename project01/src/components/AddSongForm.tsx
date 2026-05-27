import React, { useState } from 'react';

interface AddSongFormProps {
    onAddSong: (title: string, replays: number) => void;
}

export const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong }) => {
    const [title, setTitle] = useState('');
    const [replays, setReplays] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !replays.trim()) return;

        const replaysNum = parseInt(replays, 10);
        if (isNaN(replaysNum) || replaysNum < 0) return;

        onAddSong(title.trim(), replaysNum);

        setTitle('');
        setReplays('');
    };

    return (
        <div className="panel-section add-song-panel">
            <h2>➕ Agregar Nueva Canción</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Título de la canción..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#242424',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Número de reproducciones iniciales..."
                        value={replays}
                        onChange={(e) => setReplays(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            backgroundColor: '#242424',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#1db954',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '5px'
                    }}
                >
                    Insertar Canción
                </button>
            </form>
        </div>
    );
};