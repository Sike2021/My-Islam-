
import React from 'react';
import { MatchSummaryData, TeamResult, PlayerStats } from '../utils/types';

interface MatchSummaryScreenProps {
    summary: MatchSummaryData;
    onExit: () => void;
}

export const MatchSummaryScreen: React.FC<MatchSummaryScreenProps> = ({ summary, onExit }) => {
    if (!summary) return null;

    const renderTeamBlock = (team: TeamResult, players: PlayerStats[]) => {
        const topBatters = [...players].sort((a,b) => b.runs - a.runs).slice(0, 4);
        const topBowlers = [...players].filter(p => p.ballsBowled > 0).sort((a,b) => b.wickets - a.wickets || a.runsConceded - b.runsConceded).slice(0, 3);

        return (
            <div className="team-summary-block">
                <div className="team-summary-header">
                    <h3>{team.name}</h3>
                    <div className="team-score">OVERS {team.overs} | {team.wickets}/{team.score}</div>
                </div>
                <div className="summary-stats-grid">
                    <div className="stats-col">
                        {topBatters.map(p => (
                            <div key={p.id} className="stat-row-bbl">
                                <span className="name">{p.name}</span>
                                <span className="val">{p.runs} <span className="runs-balls">({p.balls})</span></span>
                            </div>
                        ))}
                    </div>
                    <div className="stats-col">
                        {topBowlers.map(p => (
                            <div key={p.id} className="stat-row-bbl">
                                <span className="name">{p.name}</span>
                                <span className="val">{p.wickets}-{p.runsConceded}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="modal-backdrop">
            <div className="match-summary-screen">
                <div className="summary-header-bbl">Match Summary</div>
                <div className="summary-content-bbl">
                    {renderTeamBlock(summary.team1, summary.fullMatchStats ? summary.fullMatchStats[summary.team1.name] : [])}
                    {renderTeamBlock(summary.team2, summary.fullMatchStats ? summary.fullMatchStats[summary.team2.name] : [])}
                    
                    <div className="summary-result-footer" style={{textAlign: 'center', marginTop: 20, fontWeight: 900, textTransform: 'uppercase', color: 'var(--accent-green)'}}>
                        {summary.result}
                    </div>

                    <button className="primary-btn" onClick={onExit} style={{width: '100%', marginTop: 20, background: 'var(--accent-green)', color: 'black'}}>
                        CONTINUE
                    </button>
                </div>
            </div>
        </div>
    );
};
