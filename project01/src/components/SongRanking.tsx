import React from 'react';
import { MaxHeap } from '../structures/MaxHeap';

interface SongRankingProps {
    rankingHeap: MaxHeap;
}

export const SongRanking: React.FC<SongRankingProps> = ({ rankingHeap }) => {
    const topSongs = rankingHeap.getTopK(5);

    return (
        <div className="panel-section ranking-panel">
            <h2>🔥 TOP 5 - Más Escuchadas</h2>

            {topSongs.length === 0 ? (
                <p style={{ color: '#b3b3b3', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    No hay reproducciones registradas todavía en el ranking.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    {topSongs.map((song, index) => {
                        const isTop3 = index < 3;
                        return (
                            <div
                                key={song.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#1c1c1c',
                                    padding: '12px 15px',
                                    borderRadius: '6px',
                                    borderLeft: isTop3 ? '4px solid #1db954' : '4px solid #333',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        color: isTop3 ? '#1db954' : '#b3b3b3',
                                        minWidth: '24px'
                                    }}>
                                        {index + 1}°
                                    </span>

                                    <div>
                                        <p style={{ fontWeight: '500', color: '#fff', fontSize: '0.95rem' }}>
                                            {song.title}
                                        </p>
                                    </div>
                                </div>

                                <div style={{
                                    backgroundColor: '#282828',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    color: '#b3b3b3',
                                    fontWeight: '6px'
                                }}>
                                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{song.replays.toLocaleString()}</span> repr.
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};