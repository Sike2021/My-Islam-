import React, { useState, useEffect } from 'react';
import { Player, Team, FormatSettings, Ground, GameState } from '../utils/types';
import { getRoleIcon } from '../helpers/uiHelpers';
import { selectAI_XI } from '../utils/matchSimulation';

interface PreMatchScreenProps {
    matchInfo: {
        team1: Team;
        team2: Team;
        managerTeamId: number;
        format: FormatSettings;
        ground: Ground;
    };
    gameState: GameState; // Pass entire gameState for playerDynamicStats and lineups
    onMatchSetupComplete: (data: { team1XI: Player[]; team2XI: Player[]; battingTeamId: number }) => void;
}

export const PreMatchScreen: React.FC<PreMatchScreenProps> = ({ matchInfo, gameState, onMatchSetupComplete }) => {
    const { team1, team2, managerTeamId, format, ground } = matchInfo;
    const managerTeam = team1.id === managerTeamId ? team1 : team2;
    const [tossWinner, setTossWinner] = useState<Team | null>(null);
    const [decision, setDecision] = useState<'bat' | 'bowl' | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<Set<number>>(new Set());
    const managerCaptainId = managerTeam.captains[format.category];

    const formatSquadIds = new Set(managerTeam.formatSquads[format.category]);
    let availablePlayers = managerTeam.masterSquad.filter(p => formatSquadIds.has(p.id));

    // Enforce overseas player rule for non-T20 formats
    if (format.category !== 'T20') {
        availablePlayers = availablePlayers.filter(p => !p.isForeign);
    }


    useEffect(() => {
        const defaultLineup = gameState.lineups[managerTeamId]?.[format.category];
        if (defaultLineup && defaultLineup.xi.length === 11) {
            setSelectedPlayers(new Set(defaultLineup.xi));
        } else {
            handleAutoBalanceXI();
        }
    }, [gameState.lineups, managerTeamId, format.category, availablePlayers]); // Re-run if availablePlayers changes

    useEffect(() => {
        const winner = Math.random() < 0.5 ? team1 : team2;
        setTossWinner(winner);
        if (winner.id !== managerTeamId) {
            setDecision(Math.random() < 0.7 ? 'bat' : 'bowl');
        }
    }, [team1, team2, managerTeamId]);

    const handlePlayerSelect = (player: Player) => {
        setSelectedPlayers(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(player.id)) {
                newSelection.delete(player.id);
            } else {
                if (newSelection.size >= 11) {
                    alert("You can only select 11 players.");
                    return prev;
                }
                // Overseas player rule for T20 formats
                if (format.category === 'T20' && player.isForeign) {
                    const foreignCount = availablePlayers.filter(p => newSelection.has(p.id) && p.isForeign).length;
                    if (foreignCount >= 3) {
                        alert("You can select a maximum of 3 overseas players.");
                        return prev;
                    }
                }
                // Disallow foreign players in non-T20 formats
                if (format.category !== 'T20' && player.isForeign) {
                    alert("Overseas players are not allowed in this format.");
                    return prev;
                }
                newSelection.add(player.id);
            }
            return newSelection;
        });
    };

    const handleAutoBalanceXI = () => {
        const xi = selectAI_XI(managerTeam, undefined, gameState.playerDynamicStats, format);
        setSelectedPlayers(new Set(xi.map(p => p.id)));
    };
    
    const handleStartMatch = () => {
        if (selectedPlayers.size !== 11) {
            alert('Please select exactly 11 players.');
            return;
        }
        if (!decision) {
            alert('Please choose to bat or bowl.');
            return;
        }
        const managerXI = managerTeam.masterSquad.filter(p => selectedPlayers.has(p.id));
        const aiTeam = team1.id === managerTeamId ? team2 : team1;
        const aiXI = selectAI_XI(aiTeam, gameState.lineups[aiTeam.id]?.[format.category], gameState.playerDynamicStats, format);
        
        const [team1XI, team2XI] = team1.id === managerTeamId ? [managerXI, aiXI] : [aiXI, managerXI];
        
        const battingTeamId = (tossWinner!.id === team1.id && decision === 'bat') || (tossWinner!.id === team2.id && decision === 'bowl')
            ? team1.id
            : team2.id;

        onMatchSetupComplete({ team1XI, team2XI, battingTeamId });
    };

    if (!tossWinner) return <div>Simulating Toss...</div>;

    const isPlayerTossWinner = tossWinner.id === managerTeamId;

    const FormIndicator = ({ playerId }: { playerId: number }) => {
        const stats = gameState.playerDynamicStats[playerId];
        if (!stats) return null;
        const formClass = `form-indicator form-${stats.form.replace(' ', '-').toLowerCase()}`;
        return <span className={formClass} title={stats.form}></span>;
    };


    return (
        <div className="pre-match-screen">
            <div className="pre-match-content">
                <h1>Pre-Match Setup</h1>
                <div className="pre-match-subheader">
                    {format.name} - {format.overs} per side
                    <br/>
                    Venue: {ground.name} ({ground.pitchType})
                </div>
                <div className="toss-section">
                    <h2>Coin Toss</h2>
                    <p className="toss-result">
                        <strong>{tossWinner.name}</strong> won the toss
                        {isPlayerTossWinner ? ' and you have elected to:' : ` and elected to ${decision} first.`}
                    </p>
                    {isPlayerTossWinner && !decision && (
                        <div className="decision-buttons">
                            <button onClick={() => setDecision('bat')}>Bat First</button>
                            <button onClick={() => setDecision('bowl')}>Bowl First</button>
                        </div>
                    )}
                </div>
                <div className="lineup-section">
                    <div className="lineup-header">
                        <h2>Select Your Playing XI ({selectedPlayers.size}/11)</h2>
                        <button onClick={handleAutoBalanceXI} className="btn-auto-balance">Auto-Balance XI</button>
                    </div>
                    <div className="squad-list">
                        {availablePlayers.map(player => {
                            const isCaptain = player.id === managerCaptainId;
                            return (
                                <div key={player.id} className={`squad-player ${selectedPlayers.has(player.id) ? 'selected' : ''}`} onClick={() => handlePlayerSelect(player)}>
                                    <input type="checkbox" checked={selectedPlayers.has(player.id)} readOnly />
                                    <FormIndicator playerId={player.id} />
                                    <span>{player.name} {player.isForeign && '🌐'} {isCaptain && '(c)'}</span>
                                    <span className="player-role">{getRoleIcon(player.role)} {player.role.toUpperCase()}</span>
                                    <span className="player-rating">BAT: {player.bat} | SKL: {player.skill}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className="start-match-btn" onClick={handleStartMatch} disabled={selectedPlayers.size !== 11 || !decision}>
                    Start Match
                </button>
            </div>
        </div>
    );
};