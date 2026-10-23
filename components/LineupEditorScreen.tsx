import React, { useState, useEffect } from 'react';
import { GameState, Player } from '../utils/types';
import { getRoleIcon } from '../helpers/uiHelpers';

interface PlayerRowProps {
    player: Player;
    inXI: boolean;
    captainId: number | null;
    handleSetCaptain: (p: Player) => void;
    handleTogglePlayerXI: (p: Player) => void;
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, inXI, captainId, handleSetCaptain, handleTogglePlayerXI }) => (
    <div className="player-row">
        <span className={`player-role-badge role-${player.role}`}>{getRoleIcon(player.role)} {player.role.toUpperCase()}</span>
        <div className="player-details">
            {player.name} {player.id === captainId ? '(C)' : ''}
        </div>
        <div className="player-stats">
            <span>{player.bat}</span>
            <span>{player.skill}</span>
        </div>
        <div className="player-actions">
            <button
                className={`action-btn-circle captain-btn ${captainId === player.id ? 'active' : ''}`}
                onClick={() => handleSetCaptain(player)}
                disabled={!inXI}
                title="Set as Captain"
            >
                C
            </button>
            <button
                className={`action-btn-circle ${inXI ? 'remove-btn' : 'add-btn'}`}
                onClick={() => handleTogglePlayerXI(player)}
                title={inXI ? "Remove from XI" : "Add to XI"}
            >
                {inXI ? '−' : '+'}
            </button>
        </div>
    </div>
);

interface LineupEditorScreenProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
    onExit: () => void;
}

export const LineupEditorScreen: React.FC<LineupEditorScreenProps> = ({ gameState, setGameState, onExit }) => {
    const [editingTeamId, setEditingTeamId] = useState<number>(gameState.manager!.teamId);
    const [activeFormat, setActiveFormat] = useState<'T20' | 'One-Day' | 'First-Class'>('T20');
    
    const team = gameState.teams.find(t => t.id === editingTeamId);
    
    const [currentXI, setCurrentXI] = useState<Set<number>>(new Set());
    const [captainId, setCaptainId] = useState<number | null>(null);

    useEffect(() => {
        const team = gameState.teams.find(t => t.id === editingTeamId);
        if (team) {
            const lineup = gameState.lineups?.[editingTeamId]?.[activeFormat];
            setCurrentXI(new Set(lineup?.xi || []));
            setCaptainId(team.captains[activeFormat] || null);
        }
    }, [editingTeamId, activeFormat, gameState]);

    if (!team) return null;

    const handleTogglePlayerXI = (player: Player) => {
        const newXI = new Set(currentXI);
        if (newXI.has(player.id)) {
            newXI.delete(player.id);
            if (player.id === captainId) {
                setCaptainId(null); // Deselect captain if removed from XI
            }
        } else {
            if (newXI.size >= 11) {
                alert("The Playing XI cannot exceed 11 players.");
                return;
            }
            if (player.isForeign && activeFormat !== 'T20') {
                alert("Overseas players are only allowed in T20 formats.");
                return;
            }
            newXI.add(player.id);
        }
        setCurrentXI(newXI);
    };

    const handleSetCaptain = (player: Player) => {
        if (!currentXI.has(player.id)) {
            alert("The captain must be in the Playing XI.");
            return;
        }
        setCaptainId(player.id);
    };

    const handleSaveChanges = () => {
        if (currentXI.size !== 11) {
            alert("Please select exactly 11 players for the XI.");
            return;
        }
        if (!captainId || !currentXI.has(captainId)) {
            alert("Please select a captain from the players in the XI.");
            return;
        }

        setGameState(gs => {
            const allPlayersInTeam = gs!.teams.find(t => t.id === editingTeamId)?.masterSquad || [];
            const xiPlayers = allPlayersInTeam.filter(p => currentXI.has(p.id));
            const openers = xiPlayers.filter(p => p.isOpener).sort((a,b) => b.bat - a.bat).slice(0, 2).map(p => p.id);

            const newTeams = gs!.teams.map(t =>
                t.id === editingTeamId ? { 
                    ...t, 
                    captains: { ...t.captains, [activeFormat]: captainId },
                } : t
            );

            const newLineups = {
                ...gs!.lineups,
                [editingTeamId]: {
                    ...gs!.lineups[editingTeamId],
                    [activeFormat]: {
                        xi: Array.from(currentXI),
                        openers: openers.length === 2 ? openers : xiPlayers.slice(0, 2).map(p => p.id), // Fallback
                    }
                }
            };
            
            return {
                ...gs!,
                teams: newTeams,
                lineups: newLineups,
            };
        });
        alert("Lineup saved!");
        onExit();
    };
    
    const formatSquadIds = new Set(team.formatSquads[activeFormat]);
    const playersInFormatSquad = team.masterSquad.filter(p => formatSquadIds.has(p.id));

    const xiPlayers = playersInFormatSquad.filter(p => currentXI.has(p.id));
    const benchPlayers = playersInFormatSquad.filter(p => !currentXI.has(p.id));

    return (
        <div className="lineup-editor-screen">
            <div className="lineup-editor-content-new">
                <header className="lineup-editor-header">
                    <h1>Manage Lineups</h1>
                    <select className="team-selector-dropdown" value={editingTeamId} onChange={e => setEditingTeamId(Number(e.target.value))}>
                        {gameState.teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </header>
                 <div className="tabs">
                    <button onClick={() => setActiveFormat('T20')} className={activeFormat === 'T20' ? 'active' : ''}>⚡ T20</button>
                    <button onClick={() => setActiveFormat('One-Day')} className={activeFormat === 'One-Day' ? 'active' : ''}>🔵 ODI</button>
                    <button onClick={() => setActiveFormat('First-Class')} className={activeFormat === 'First-Class' ? 'active' : ''}>⚪ First-Class</button>
                </div>

                {activeFormat !== 'T20' && (
                    <div className="format-info-banner">
                        Only domestic players are allowed in ODI and First-Class formats.
                    </div>
                )}
                
                <div className="player-list-area">
                    {xiPlayers.map(p => <PlayerRow key={p.id} player={p} inXI={true} captainId={captainId} handleSetCaptain={handleSetCaptain} handleTogglePlayerXI={handleTogglePlayerXI} />)}
                    
                    <h3 className="bench-title">Bench</h3>
                    
                    {benchPlayers.map(p => <PlayerRow key={p.id} player={p} inXI={false} captainId={captainId} handleSetCaptain={handleSetCaptain} handleTogglePlayerXI={handleTogglePlayerXI} />)}
                </div>

                <div className="lineup-editor-footer">
                     <button onClick={onExit} className="btn-cancel">Cancel</button>
                    <button onClick={handleSaveChanges} className="btn-save">Save Lineup</button>
                </div>
            </div>
        </div>
    );
};