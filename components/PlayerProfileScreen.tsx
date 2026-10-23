import React from 'react';
import { PlayerCareerSummary, FormatSettings } from '../utils/types';
import { getRoleIcon } from '../helpers/uiHelpers';

interface PlayerProfileScreenProps {
    playerSummary: PlayerCareerSummary;
    onExit: () => void;
    formats: FormatSettings[];
}

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({ playerSummary, onExit, formats }) => {
    if (!playerSummary) return null;
    const { playerData, teamName, stats } = playerSummary;

    const allFormatKeys = ["Overall", ...formats.map(f => f.name)];

    const renderBattingStats = () => (
        <div className="profile-stats-section">
            <h4>Batting Career Summary</h4>
            <div className="stats-table-container profile-table">
                <table className="stats-table">
                    <thead><tr>
                        <th>Format</th><th>M</th><th>I</th><th>Runs</th><th>HS</th><th>Avg</th><th>SR</th><th>100</th><th>50</th>
                    </tr></thead>
                    <tbody>
                        {allFormatKeys.map(key => {
                            const s = stats[key];
                            if (!s || s.matchesPlayed === 0) return null;
                            const avg = (s.inningsBatted - s.notOuts > 0) ? (s.runs / (s.inningsBatted - s.notOuts)).toFixed(2) : '-';
                            const sr = s.balls > 0 ? ((s.runs / s.balls) * 100).toFixed(2) : '0.00';
                            return <tr key={key}><td>{key}</td><td>{s.matchesPlayed}</td><td>{s.inningsBatted}</td><td>{s.runs}</td><td>{s.highestScore}</td><td>{avg}</td><td>{sr}</td><td>{s.hundreds}</td><td>{s.fifties}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBowlingStats = () => {
        if (stats.Overall.inningsBowled === 0) return null;
        return (
            <div className="profile-stats-section">
                <h4>Bowling Career Summary</h4>
                <div className="stats-table-container profile-table">
                    <table className="stats-table">
                        <thead><tr>
                            <th>Format</th><th>M</th><th>Wkts</th><th>BBI</th><th>Avg</th><th>Econ</th><th>5W</th><th>3W</th>
                        </tr></thead>
                        <tbody>
                            {allFormatKeys.map(key => {
                                const s = stats[key];
                                if (!s || s.inningsBowled === 0) return null;
                                const avg = s.wickets > 0 ? (s.runsConceded / s.wickets).toFixed(2) : '-';
                                const econ = s.ballsBowled > 0 ? (s.runsConceded / (s.ballsBowled / 6)).toFixed(2) : '0.00';
                                const bbi = s.bestBowlingInnings.wickets > 0 ? `${s.bestBowlingInnings.wickets}/${s.bestBowlingInnings.runs}` : '-';
                                return <tr key={key}><td>{key}</td><td>{s.matchesPlayed}</td><td>{s.wickets}</td><td>{bbi}</td><td>{avg}</td><td>{econ}</td><td>{s.fiveWicketHauls}</td><td>{s.threeWicketHauls}</td></tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content player-profile-modal">
                <header className="player-profile-header">
                    <div className="player-info">
                        <h2>{playerData.name} {playerData.isForeign && '🌐'}</h2>
                        <p>{teamName} | {getRoleIcon(playerData.role)} {playerData.role.toUpperCase()} | {playerData.nationality}</p>
                    </div>
                    <button onClick={onExit} className="btn-exit">×</button>
                </header>
                <div className="player-profile-body">
                    <div className="profile-top-performances">
                        <h4>Career Highlights</h4>
                        <div className="performance-cards">
                            <div className="performance-card">
                                <span>Highest Score</span>
                                <strong>{stats.Overall.highestScore}</strong>
                            </div>
                            <div className="performance-card">
                                <span>Best Bowling</span>
                                <strong>{stats.Overall.bestBowlingInnings.wickets > 0 ? `${stats.Overall.bestBowlingInnings.wickets}/${stats.Overall.bestBowlingInnings.runs}` : '-'}</strong>
                            </div>
                        </div>
                    </div>
                    {renderBattingStats()}
                    {renderBowlingStats()}
                </div>
            </div>
        </div>
    );
};
