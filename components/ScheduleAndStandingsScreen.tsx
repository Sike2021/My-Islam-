import React, { useState } from 'react';
import { GameState, TournamentFormatName, FormatCategory } from '../utils/types';

interface ScheduleAndStandingsScreenProps {
    gameState: GameState;
    onExit: () => void;
    onViewSummary: (matchId: number) => void;
}

export const ScheduleAndStandingsScreen: React.FC<ScheduleAndStandingsScreenProps> = ({ gameState, onExit, onViewSummary }) => {
    const [activeTab, setActiveTab] = useState('standings'); // 'standings' or 'schedule'
    const [activeStandings, setActiveStandings] = useState<TournamentFormatName>(Object.keys(gameState.standings)[0] as TournamentFormatName);
    const [scheduleFilter, setScheduleFilter] = useState<'All' | TournamentFormatName>('All');

    const { teams, schedule, standings, currentMatchIndex, formats } = gameState;

    const findTeamName = (id: number) => teams.find(t => t.id === id)?.name || 'Unknown Team';
    const sortedStandings = [...(standings[activeStandings] || [])].sort((a, b) => b.points - a.points);
    
    const filteredSchedule = schedule.filter(match => 
        scheduleFilter === 'All' || match.formatName === scheduleFilter
    );

    return (
        <div className="schedule-standings-screen">
            <div className="schedule-standings-content">
                 <header className="schedule-standings-header">
                    <h1>Season Progress</h1>
                    <button onClick={onExit} className="btn-exit">Return to Hub</button>
                </header>
                <div className="tabs">
                    <button onClick={() => setActiveTab('standings')} className={activeTab === 'standings' ? 'active' : ''}>🏆 Standings</button>
                    <button onClick={() => setActiveTab('schedule')} className={activeTab === 'schedule' ? 'active' : ''}>🗓️ Full Schedule</button>
                </div>

                <div className="tab-content">
                    {activeTab === 'standings' && (
                        <>
                            <div className="format-filters">
                                {Object.keys(standings).map(formatName => (
                                    <button key={formatName} onClick={() => setActiveStandings(formatName as TournamentFormatName)} className={activeStandings === formatName ? 'active' : ''}>
                                        {formatName}
                                    </button>
                                ))}
                            </div>
                            <table className="standings-table">
                                <thead>
                                    <tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>Pts</th></tr>
                                </thead>
                                <tbody>
                                    {sortedStandings.map((s, index) => (
                                        <tr key={s.teamId}>
                                            <td>{index + 1}</td>
                                            <td>{s.teamName}</td>
                                            <td>{s.played}</td>
                                            <td>{s.won}</td>
                                            <td>{s.lost}</td>
                                            <td>{s.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    {activeTab === 'schedule' && (
                       <div className="schedule-list">
                            <div className="schedule-filters">
                                <select value={scheduleFilter} onChange={e => setScheduleFilter(e.target.value as 'All' | TournamentFormatName)}>
                                    <option value="All">All Tournaments</option>
                                    {formats.map(f => (
                                        <option key={f.name} value={f.name}>{f.name}</option>
                                    ))}
                                </select>
                            </div>
                           {filteredSchedule.map((match, index) => {
                               const team1Name = findTeamName(match.team1Id);
                               const team2Name = findTeamName(match.team2Id);
                               const winnerName = match.winnerId ? findTeamName(match.winnerId) : null;
                               const isCompleted = match.status === 'completed';

                               // Custom display for Playoff matches
                               let matchDisplay = `${team1Name} vs ${team2Name}`;
                               let roundLabel = `MD ${match.round}`;

                               if (match.isPlayoff) {
                                   if (match.playoffType === 'semi-final') {
                                        roundLabel = `SF${match.round! - 98}`;
                                        matchDisplay = `1st Place vs 4th Place`; // General placeholder
                                        if (match.round === 100) matchDisplay = `2nd Place vs 3rd Place`; // Specific SF2 placeholder
                                   } else if (match.playoffType === 'final') {
                                        roundLabel = 'Final';
                                        matchDisplay = `Winner vs Winner`; // General placeholder
                                   }
                               }

                               return (
                                    <div key={match.id} 
                                        className={`schedule-item 
                                            ${index === currentMatchIndex ? 'current-match' : ''} 
                                            ${isCompleted ? 'completed' : ''}
                                            ${match.isPlayoff ? 'playoff-match' : ''}
                                        `}
                                        onClick={() => isCompleted && onViewSummary(match.id)}
                                    >
                                        <span className="match-day">{match.matchDate} - {roundLabel}</span> {/* Display matchDate */}
                                        <span className="match-teams-schedule">{matchDisplay}</span>
                                        <span className="match-format">{match.formatName}</span>
                                        <span className="match-result">{winnerName ? `${winnerName} won` : 'Pending'}</span>
                                    </div>
                               );
                           })}
                       </div>
                    )}
                </div>
            </div>
        </div>
    );
};