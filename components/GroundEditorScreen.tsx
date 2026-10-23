import React, { useState, useEffect } from 'react';
import { GameState, Ground, PitchType } from '../utils/types';

interface GroundEditorScreenProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
    onExit: () => void;
}

export const GroundEditorScreen: React.FC<GroundEditorScreenProps> = ({ gameState, setGameState, onExit }) => {
    const [selectedGroundId, setSelectedGroundId] = useState<number | null>(gameState.grounds[0]?.id || null);
    const [groundData, setGroundData] = useState<Partial<Ground>>(gameState.grounds.find(g => g.id === selectedGroundId) || {});

    useEffect(() => {
        const ground = gameState.grounds.find(g => g.id === selectedGroundId);
        if (ground) setGroundData(ground);
    }, [selectedGroundId, gameState.grounds]);

    const handleSave = () => {
        if (!groundData.name || !groundData.shortCode) {
            alert("Ground Name and Short Code are required.");
            return;
        }
        setGameState(gs => {
            const newGrounds = gs!.grounds.map(g => g.id === selectedGroundId ? { ...g, ...groundData } : g);
            return { ...gs!, grounds: newGrounds };
        });
        alert("Ground saved successfully!");
    };

    return (
        <div className="editor-screen">
             <div className="editor-content wide">
                 <header className="editor-screen-header">
                    <h1>Ground Editor</h1>
                    <button onClick={onExit} className="btn-exit">Return to Editor Hub</button>
                </header>
                 <div className="player-editor-layout">
                    <div className="player-list-section">
                        <div className="player-editor-list">
                            {gameState.grounds.map(g => (
                                <div key={g.id} className={`player-editor-list-item ${g.id === selectedGroundId ? 'selected' : ''}`} onClick={() => setSelectedGroundId(g.id)}>
                                    {g.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="player-editor-form">
                        <label>Ground Name <input type="text" value={groundData.name || ''} onChange={e => setGroundData(p => ({...p, name: e.target.value}))} /></label>
                        <label>Short Code <input type="text" value={groundData.shortCode || ''} onChange={e => setGroundData(p => ({...p, shortCode: e.target.value}))} /></label>
                        <label>Pitch Type
                            <select value={groundData.pitchType} onChange={e => setGroundData(p => ({...p, pitchType: e.target.value as PitchType}))}>
                                <option>Balanced Sporting Pitch</option><option>Green Top</option><option>Dusty Spinner’s Haven</option><option>Batting Paradise</option><option>Cracked Worn Surface</option><option>Dead Slow Track</option>
                            </select>
                        </label>
                         <label>Min Runs (T20) <input type="number" value={groundData.minRunsT20 || 60} onChange={e => setGroundData(p => ({...p, minRunsT20: Number(e.target.value)}))} /></label>
                         <label>Max Runs (T20) <input type="number" value={groundData.maxRunsT20 || 240} onChange={e => setGroundData(p => ({...p, maxRunsT20: Number(e.target.value)}))} /></label>
                         <label>Min Runs (List A) <input type="number" value={groundData.minRunsListA || 120} onChange={e => setGroundData(p => ({...p, minRunsListA: Number(e.target.value)}))} /></label>
                         <label>Max Runs (List A) <input type="number" value={groundData.maxRunsListA || 380} onChange={e => setGroundData(p => ({...p, maxRunsListA: Number(e.target.value)}))} /></label>
                         <label>Min Runs (First-Class) <input type="number" value={groundData.minRunsFC || 150} onChange={e => setGroundData(p => ({...p, minRunsFC: Number(e.target.value)}))} /></label>
                         <label>Max Runs (First-Class) <input type="number" value={groundData.maxRunsFC || 750} onChange={e => setGroundData(p => ({...p, maxRunsFC: Number(e.target.value)}))} /></label>
                        <button onClick={handleSave} className="btn-save">Save Ground</button>
                    </div>
                </div>
            </div>
        </div>
    );
};