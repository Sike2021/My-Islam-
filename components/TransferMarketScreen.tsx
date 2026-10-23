import React, { useState } from 'react';
import { GameState, Player, Team } from '../utils/types';
import { getRoleIcon } from '../helpers/uiHelpers';

interface TransferMarketScreenProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
    onExit: () => void;
}

export const TransferMarketScreen: React.FC<TransferMarketScreenProps> = ({ gameState, setGameState, onExit }) => {
    const [leftSource, setLeftSource] = useState('freeAgents'); // 'freeAgents' or team ID as string
    const [rightSource, setRightSource] = useState(gameState.teams[0]?.id.toString() || 'freeAgents');
    const [selectedLeft, setSelectedLeft] = useState<Player | null>(null);
    const [selectedRight, setSelectedRight] = useState<Player | null>(null);
    const [showSwapConfirm, setShowSwapConfirm] = useState(false);

    const getPlayerPool = (source: string): Player[] => {
        if (source === 'freeAgents') {
            return gameState.freeAgents;
        }
        return gameState.teams.find(t => t.id === Number(source))?.masterSquad || [];
    };

    const handleConfirmSwap = () => {
        if (!selectedLeft || !selectedRight) return;

        // --- Overseas player rule check (max 3 per team in T20, 0 otherwise) ---
        const checkOverseasRule = (teamId: number, playerToAdd: Player, playerToRemoveId: number | null) => {
            const team = gameState.teams.find(t => t.id === teamId);
            if (!team) return true; // Should not happen
            
            // Only relevant for T20, otherwise no foreign players allowed.
            // For now, only checking general limit. Could be refined per format if needed for transfer logic.
            const currentForeignCount = team.masterSquad.filter(p => p.isForeign && p.id !== playerToRemoveId).length;
            if (playerToAdd.isForeign && currentForeignCount >= 3) {
                alert(`${team.name} already has 3 overseas players. Cannot transfer another overseas player to this team.`);
                return false;
            }
            return true;
        };

        const targetTeamForLeft = rightSource === 'freeAgents' ? null : Number(rightSource);
        const targetTeamForRight = leftSource === 'freeAgents' ? null : Number(leftSource);

        if (targetTeamForLeft && !checkOverseasRule(targetTeamForLeft, selectedLeft, selectedRight.id)) return;
        if (targetTeamForRight && !checkOverseasRule(targetTeamForRight, selectedRight, selectedLeft.id)) return;


        setGameState(current => {
            let newTeams = [...current!.teams];
            let newFreeAgents = [...current!.freeAgents];

            // Helper to remove player from a source
            const removePlayerFromSource = (playerToRemove: Player, sourceId: string) => {
                if (sourceId === 'freeAgents') {
                    newFreeAgents = newFreeAgents.filter(p => p.id !== playerToRemove.id);
                } else {
                    const teamIndex = newTeams.findIndex(t => t.id === Number(sourceId));
                    if (teamIndex > -1) {
                        const newSquad = newTeams[teamIndex].masterSquad.filter(p => p.id !== playerToRemove.id);
                        newTeams[teamIndex] = { ...newTeams[teamIndex], masterSquad: newSquad, formatSquads: { 'T20': newSquad.map(p => p.id), 'One-Day': newSquad.map(p => p.id), 'First-Class': newSquad.map(p => p.id) } };
                    }
                }
            };

            // Helper to add player to a destination
            const addPlayerToDestination = (playerToAdd: Player, destinationId: string) => {
                if (destinationId === 'freeAgents') {
                    newFreeAgents.push(playerToAdd);
                } else {
                     const teamIndex = newTeams.findIndex(t => t.id === Number(destinationId));
                     if (teamIndex > -1) {
                         newTeams[teamIndex].masterSquad.push(playerToAdd);
                         newTeams[teamIndex] = { ...newTeams[teamIndex], formatSquads: { 'T20': newTeams[teamIndex].masterSquad.map(p => p.id), 'One-Day': newTeams[teamIndex].masterSquad.map(p => p.id), 'First-Class': newTeams[teamIndex].masterSquad.map(p => p.id) } };
                     }
                }
            };

            // Remove selectedLeft from its current source (leftSource)
            removePlayerFromSource(selectedLeft, leftSource);
            // Remove selectedRight from its current source (rightSource)
            removePlayerFromSource(selectedRight, rightSource);

            // Add selectedRight to leftSource (now its new home)
            addPlayerToDestination(selectedRight, leftSource);
            // Add selectedLeft to rightSource (now its new home)
            addPlayerToDestination(selectedLeft, rightSource);
            
            return { ...current!, teams: newTeams, freeAgents: newFreeAgents };
        });

        setShowSwapConfirm(false);
        setSelectedLeft(null);
        setSelectedRight(null);
    };
    
    const getSourceName = (source: string) => {
        if (source === 'freeAgents') return 'Free Agents';
        return gameState.teams.find(t => t.id === Number(source))?.name || 'Unknown';
    }

    const renderPlayerColumn = (
        source: string, 
        setSource: (val: string) => void,
        playerPool: Player[],
        selectedPlayer: Player | null,
        onSelect: (player: Player) => void
    ) => (
        <div className="transfer-column">
            <select className="source-select" value={source} onChange={e => {setSource(e.target.value); onSelect(null);}}>
                <option value="freeAgents">Free Agents</option>
                {gameState.teams.map(t => <option key={t.id} value={t.id.toString()}>{t.name}</option>)}
            </select>
            <div className="player-list-container">
                <table className="player-list-table">
                    <thead>
                        <tr><th>Name</th><th>Role</th><th>Bat</th><th>Skill</th></tr>
                    </thead>
                    <tbody>
                        {playerPool.map(p => (
                            <tr key={p.id} className={selectedPlayer?.id === p.id ? 'selected' : ''} onClick={() => onSelect(p)}>
                                <td>{p.name} {p.isForeign && '🌐'}</td>
                                <td>{getRoleIcon(p.role)} {p.role.toUpperCase()}</td>
                                <td>{p.bat}</td>
                                <td>{p.skill}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
    return (
        <div className="transfer-market-screen">
            <div className="transfer-market-content wide">
                <header className="transfer-market-header">
                    <h1>Transfer & Trade Block</h1>
                    <button onClick={onExit} className="btn-exit">Return to Hub</button>
                </header>
                <div className="transfer-dual-column-layout">
                    {renderPlayerColumn(leftSource, setLeftSource, getPlayerPool(leftSource), selectedLeft, setSelectedLeft)}

                    <div className="transfer-actions">
                        <button 
                            className="btn-swap"
                            onClick={() => setShowSwapConfirm(true)}
                            disabled={!selectedLeft || !selectedRight || leftSource === rightSource}
                        >
                           ⇄<br/>Swap
                        </button>
                    </div>

                    {renderPlayerColumn(rightSource, setRightSource, getPlayerPool(rightSource), selectedRight, setSelectedRight)}
                </div>
            </div>
            {showSwapConfirm && selectedLeft && selectedRight && (
                 <div className="modal-backdrop">
                    <div className="modal-content transfer-confirm-modal">
                        <h2>Confirm Swap</h2>
                        <div className="transfer-details">
                            <div className="transfer-player-card">
                                <span className="transfer-label">{getSourceName(leftSource)}</span>
                                <strong>{selectedLeft.name} {selectedLeft.isForeign && '🌐'}</strong>
                                <span>({getRoleIcon(selectedLeft.role)} {selectedLeft.role.toUpperCase()})</span>
                            </div>
                            <div className="transfer-arrow">⇄</div>
                            <div className="transfer-player-card">
                                <span className="transfer-label">{getSourceName(rightSource)}</span>
                                <strong>{selectedRight.name} {selectedRight.isForeign && '🌐'}</strong>
                                <span>({getRoleIcon(selectedRight.role)} {selectedRight.role.toUpperCase()})</span>
                            </div>
                        </div>
                        <p>This action will swap the selected players. Are you sure?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowSwapConfirm(false)} className="btn-cancel">Cancel</button>
                            <button onClick={handleConfirmSwap} className="btn-save">Confirm Swap</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};