import React, { useState, useEffect, useMemo } from 'react';
import { GameState, Player } from '../utils/types';

interface PlayerEditorScreenProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
    onExit: () => void;
}

export const PlayerEditorScreen: React.FC<PlayerEditorScreenProps> = ({ gameState, setGameState, onExit }) => {
    const [filter, setFilter] = useState('team-' + gameState.manager!.teamId);
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
    const [playerData, setPlayerData] = useState<Partial<Player>>({});
    const [isCreating, setIsCreating] = useState(false);
    const [createIn, setCreateIn] = useState('freeAgents');

    const playerPool = useMemo(() => {
        if (filter === 'freeAgents') return gameState.freeAgents;
        const teamId = Number(filter.split('-')[1]);
        return gameState.teams.find(t => t.id === teamId)?.masterSquad || [];
    }, [filter, gameState]);

    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayerId(player.id);
        setPlayerData(player);
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setSelectedPlayerId(null);
        setPlayerData({
            name: 'New Player', age: 24, role: 'bt', bat: 50, skill: 50, fielding: 50, stamina: 50,
            battingStyle: 'Right-hand', bowlingType: 'None', nationality: 'Pakistan', style: 'n', isOpener: false
        });
        setIsCreating(true);
    };

    const handleRandomize = () => {
        setPlayerData(p => ({
            ...p,
            bat: Math.floor(10 + Math.random() * 80),
            skill: Math.floor(10 + Math.random() * 80),
            fielding: Math.floor(40 + Math.random() * 50),
            stamina: Math.floor(60 + Math.random() * 40),
        }));
    };

    const handleSave = () => {
        if (!playerData.name) {
            alert("Player name cannot be empty.");
            return;
        }

        setGameState(gs => {
            const newState = JSON.parse(JSON.stringify(gs!));
            if (isCreating) {
                const allPlayerIds = newState.teams.flatMap((t: any) => t.masterSquad.map((p: any) => p.id)).concat(newState.freeAgents.map((p: any) => p.id));
                const newPlayerId = Math.max(0, ...allPlayerIds) + 1;
                const newPlayer: Player = { ...playerData as Player, id: newPlayerId, isForeign: playerData.nationality !== 'Pakistan' };

                if (createIn === 'freeAgents') {
                    newState.freeAgents.push(newPlayer);
                } else {
                    const teamId = Number(createIn.split('-')[1]);
                    const team = newState.teams.find((t: any) => t.id === teamId);
                    if (team) {
                        team.masterSquad.push(newPlayer);
                        // Update formatSquads to include new player
                        Object.keys(team.formatSquads).forEach(formatCategory => {
                            team.formatSquads[formatCategory].push(newPlayerId);
                        });
                    }
                }
                alert("Player created successfully!");
            } else {
                const playerToUpdate: Player = { ...playerData as Player, isForeign: playerData.nationality !== 'Pakistan', id: selectedPlayerId! };
                let found = false;
                for (const team of newState.teams) {
                    const pIndex = team.masterSquad.findIndex((p: any) => p.id === selectedPlayerId);
                    if (pIndex > -1) {
                        team.masterSquad[pIndex] = playerToUpdate;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                     const pIndex = newState.freeAgents.findIndex((p: any) => p.id === selectedPlayerId);
                     if(pIndex > -1) newState.freeAgents[pIndex] = playerToUpdate;
                }
                alert("Player updated successfully!");
            }
            return newState;
        });

        setIsCreating(false);
        setSelectedPlayerId(null);
        setPlayerData({});
    };

    return (
        <div className="editor-screen">
            <div className="editor-content wide">
                 <header className="editor-screen-header">
                    <h1>Player Editor</h1>
                    <button onClick={onExit} className="btn-exit">Return to Editor Hub</button>
                </header>
                <div className="player-editor-layout">
                    <div className="player-list-section">
                        <select value={filter} onChange={e => setFilter(e.target.value)}>
                            {gameState.teams.map(t => <option key={t.id} value={`team-${t.id}`}>{t.name}</option>)}
                            <option value="freeAgents">Free Agents</option>
                        </select>
                        <div className="player-editor-list">
                            {playerPool.map(p => (
                                <div key={p.id} className={`player-editor-list-item ${p.id === selectedPlayerId ? 'selected' : ''}`} onClick={() => handleSelectPlayer(p)}>
                                    {p.name}
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCreateNew}>Create New Player</button>
                    </div>
                    <div className="player-editor-form">
                        {isCreating && (
                            <label>Add to:
                                <select value={createIn} onChange={e => setCreateIn(e.target.value)}>
                                    {gameState.teams.map(t => <option key={t.id} value={`team-${t.id}`}>{t.name}</option>)}
                                    <option value="freeAgents">Free Agents</option>
                                </select>
                            </label>
                        )}
                        <label>Name <input type="text" value={playerData.name || ''} onChange={e => setPlayerData(p => ({...p, name: e.target.value}))} /></label>
                        <label>Age <input type="number" value={playerData.age || 0} onChange={e => setPlayerData(p => ({...p, age: Number(e.target.value)}))} /></label>
                        <label>Role
                            <select value={playerData.role} onChange={e => setPlayerData(p => ({...p, role: e.target.value}))}>
                                <option value="bt">Batter</option><option value="bl">Bowler</option><option value="ar">All-Rounder</option><option value="wk">Wicket-Keeper</option><option value="sb">Spin Bowler</option>
                            </select>
                        </label>
                        <label>Batting <input type="range" min="1" max="99" value={playerData.bat || 50} onChange={e => setPlayerData(p => ({...p, bat: Number(e.target.value)}))} /> {playerData.bat}</label>
                        <label>Skill (Bowl/WK) <input type="range" min="1" max="99" value={playerData.skill || 50} onChange={e => setPlayerData(p => ({...p, skill: Number(e.target.value)}))} /> {playerData.skill}</label>
                        <label>Fielding <input type="range" min="1" max="99" value={playerData.fielding || 50} onChange={e => setPlayerData(p => ({...p, fielding: Number(e.target.value)}))} /> {playerData.fielding}</label>
                        <label>Stamina <input type="range" min="1" max="99" value={playerData.stamina || 50} onChange={e => setPlayerData(p => ({...p, stamina: Number(e.target.value)}))} /> {playerData.stamina}</label>
                        <button onClick={handleRandomize}>Randomize Stats</button>
                        <button onClick={handleSave} className="btn-save">{isCreating ? 'Create Player' : 'Save Changes'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};