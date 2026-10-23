import React from 'react';
import { GameState } from '../utils/types';

interface InSeasonHubProps {
    gameState: GameState;
    onPlayMatch: () => void;
    onGoToTransfers: () => void;
    onGoToNews: () => void;
    onGoToSchedule: () => void;
    onGoToTeamHub: () => void;
    onSimulateAI: () => void;
    onGoToEditor: () => void;
    onStartNextSeason: () => void;
}

export const InSeasonHub: React.FC<InSeasonHubProps> = ({ gameState, onPlayMatch, onGoToTransfers, onGoToNews, onGoToSchedule, onGoToTeamHub, onSimulateAI, onGoToEditor, onStartNextSeason }) => {
    const { schedule, currentMatchIndex, teams, manager, grounds } = gameState;
    const nextMatch = schedule?.[currentMatchIndex];
    
    if (!nextMatch) {
        return (
            <div className="season-hub">
                 <div className="hub-card">
                    <div className="season-end-card">
                        <h1>Season Finished!</h1>
                        <p>Congratulations, {manager!.name}!</p>
                        <button onClick={onStartNextSeason} className="play-match-btn">Start Next Season</button>
                    </div>
                </div>
            </div>
        );
    }

    const team1 = teams.find(t => t.id === nextMatch.team1Id);
    const team2 = teams.find(t => t.id === nextMatch.team2Id);
    const managerTeam = teams.find(t => t.id === manager!.teamId);
    const ground = grounds.find(g => g.id === nextMatch.groundId);

    // AI match condition: if manager's team is not playing OR both teams are development teams
    const isAImatch = (nextMatch.team1Id !== manager!.teamId && nextMatch.team2Id !== manager!.teamId) ||
                     (team1?.isDevelopmentTeam && team2?.isDevelopmentTeam);

    return (
        <div className="season-hub">
             <div className="hub-card">
                <div className="hub-card-header">
                    <span>Season 2025 | {nextMatch.formatName}</span>
                    <h1>{managerTeam!.name}</h1>
                </div>

                <div className="next-match-card">
                    <h2>Next Match</h2>
                    <h3>{team1!.name} vs {team2!.name}</h3>
                    <p>{ground?.name || 'Unknown Venue'}</p>
                    <p>Pitch: {ground?.pitchType || 'Unknown'}</p>
                     {isAImatch ? (
                        <button className="play-match-btn" onClick={onSimulateAI}>
                            Simulate AI Match
                        </button>
                    ) : (
                        <button className="play-match-btn" onClick={onPlayMatch}>
                            ▶ Play Match
                        </button>
                    )}
                </div>
                
                <div className="hub-actions-grid">
                    <button className="action-btn" onClick={onGoToSchedule}>📅<br/>Schedule</button>
                    <button className="action-btn" onClick={onGoToNews}>📰<br/>News</button>
                    <button className="action-btn" onClick={onGoToTeamHub}>🛡️<br/>Teams</button>
                    <button className="action-btn" onClick={onGoToEditor}>✎<br/>Editor</button>
                    <button className="action-btn" onClick={onGoToTransfers}>⇄<br/>Transfers</button>
                    <button className="action-btn" disabled>⇆<br/>Compare</button>
                </div>
            </div>
        </div>
    );
};