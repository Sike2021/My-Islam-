
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MatchSummaryData, Team, FormatSettings, TeamResult, Player, PlayerStats, FallOfWicket } from '../utils/types';
import { initialPlayerStats, getMaxOversPerBowler } from '../utils/matchSimulation';

interface SimulationScreenProps {
    team1: Team;
    team2: Team;
    format: FormatSettings;
    onExit: (summary: MatchSummaryData) => void;
    team1XI: Player[];
    team2XI: Player[];
    battingTeamId: number;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({ team1, team2, format, onExit, team1XI, team2XI, battingTeamId }) => {
    const [isSimulating, setIsSimulating] = useState(true);
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [innings, setInnings] = useState(1);
    const [target, setTarget] = useState<number | null>(null);

    const battingTeam = innings === 1 ? (battingTeamId === team1.id ? team1 : team2) : (battingTeamId === team1.id ? team2 : team1);

    useEffect(() => {
        if (!isSimulating) return;

        const interval = setInterval(() => {
            // Very fast simulation kernel
            const roll = Math.random();
            let runs = 0;
            let out = false;

            if (roll < 0.04) out = true;
            else if (roll < 0.4) runs = 0;
            else if (roll < 0.8) runs = 1;
            else if (roll < 0.95) runs = 4;
            else runs = 6;

            setScore(s => s + runs);
            if (out) setWickets(w => w + 1);
            
            setBalls(b => {
                let nextB = b + 1;
                if (nextB >= 6) {
                    setOvers(o => o + 1);
                    return 0;
                }
                return nextB;
            });

        }, 50);

        return () => clearInterval(interval);
    }, [isSimulating, innings]);

    // Check for Innings end
    useEffect(() => {
        if (wickets >= 10 || overs >= format.overs || (innings === 2 && score >= target!)) {
            if (innings === 1) {
                setTarget(score + 1);
                setScore(0);
                setWickets(0);
                setOvers(0);
                setBalls(0);
                setInnings(2);
            } else {
                setIsSimulating(false);
            }
        }
    }, [score, wickets, overs, balls, innings, target, format.overs]);

    return (
        <div className="simulation-screen-visual">
            <div className="sim-card">
                <div className="sim-header">
                    <h2>Simulating Match</h2>
                    <span>{format.name}</span>
                </div>
                
                <div className="sim-body">
                    <div className="innings-indicator">Innings {innings}</div>
                    <div className="batting-team-name">{battingTeam.name}</div>
                    <div className="display-score">{score}/{wickets}</div>
                    <div className="display-overs">{overs}.{balls} / {format.overs}</div>
                    
                    <div className="progress-bar-container">
                        <div className="progress-fill" style={{ width: `${(overs / format.overs) * 100}%` }}></div>
                    </div>
                    
                    {target && <div className="target-info">Target: {target}</div>}
                </div>

                {!isSimulating && (
                    <button className="primary-btn" onClick={() => onExit({ result: score >= target! ? `${battingTeam.name} won` : 'Match Over' } as any)}>
                        View Results
                    </button>
                )}
            </div>
        </div>
    );
};
