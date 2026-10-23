import React, { useState, useMemo } from 'react';
import { GameState, PlayerCareerSummary, FormatSettings } from '../utils/types';
import { getRoleIcon } from '../helpers/uiHelpers'; // Import getRoleIcon if not already imported

interface StatsHubScreenProps {
    gameState: GameState;
    onExit: () => void;
    onViewPlayerProfile: (playerId: number) => void;
}

// Fix: Explicitly type StatsHubScreen as React.FC
export const StatsHubScreen: React.FC<StatsHubScreenProps> = ({ gameState, onExit, onViewPlayerProfile }) => {
    const [activeTab, setActiveTab] = useState('batting'); // batting, bowling, records, promotionRules
    const [selectedFormat, setSelectedFormat] = useState('Overall');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ 
        batting: { key: string, direction: 'asc' | 'desc' }, 
        bowling: { key: string, direction: 'asc' | 'desc' } 
    }>({
        batting: { key: 'runs', direction: 'desc' }, 
        bowling: { key: 'wickets', direction: 'desc' } 
    });

    const requestSort = (tableKey: 'batting' | 'bowling', sortKey: string) => {
        setSortConfig(prev => {
            const currentDirection = prev[tableKey]?.key === sortKey && prev[tableKey]?.direction === 'asc' ? 'desc' : 'asc';
            return { ...prev, [tableKey]: { key: sortKey, direction: currentDirection } };
        });
    };

    const getSortIndicator = (tableKey: 'batting' | 'bowling', columnKey: string) => {
        if (sortConfig[tableKey]?.key === columnKey) {
            return sortConfig[tableKey].direction === 'asc' ? ' ▲' : ' ▼';
        }
        return '';
    };

    const handleExport = (type: 'batting' | 'bowling') => {
        // Fix: Complete handleExport function to generate CSV and trigger download
        const statsToExport = (Object.values(gameState.careerStats || {}) as PlayerCareerSummary[])
            .map(p => ({
                playerData: p.playerData, // Fix: Keep playerData as a nested object
                teamName: p.teamName,
                // Ensure stats[selectedFormat] exists before spreading
                stats: { ...p.stats.Overall, ...(p.stats[selectedFormat] || {}) }
            }));

        let csvContent = '';
        if (type === 'batting') {
            const headers = ['Name', 'Team', 'Matches Played', 'Innings Batted', 'Runs', 'Highest Score', 'Fifties', 'Hundreds', 'Not Outs', 'Balls Faced', 'Fours', 'Sixes', 'Average', 'Strike Rate'];
            csvContent += headers.join(',') + '\n';
            statsToExport.forEach(p => {
                const s = p.stats;
                const avg = (s.inningsBatted - s.notOuts > 0) ? (s.runs / (s.inningsBatted - s.notOuts)).toFixed(2) : '-';
                const sr = s.balls > 0 ? ((s.runs / s.balls) * 100).toFixed(2) : '0.00';
                const row = [
                    p.playerData.name, p.teamName, s.matchesPlayed, s.inningsBatted, s.runs, s.highestScore,
                    s.fifties, s.hundreds, s.notOuts, s.balls, s.fours, s.sixes, avg, sr
                ];
                csvContent += row.map(item => `"${item}"`).join(',') + '\n';
            });
        } else if (type === 'bowling') {
            const headers = ['Name', 'Team', 'Matches Played', 'Innings Bowled', 'Wickets', 'Runs Conceded', 'Maidens', 'Best Bowling', 'Three Wicket Hauls', 'Five Wicket Hauls', 'Overs Bowled', 'Economy'];
            csvContent += headers.join(',') + '\n';
            statsToExport.forEach(p => {
                const s = p.stats;
                const bbi = s.bestBowlingInnings.wickets > 0 ? `${s.bestBowlingInnings.wickets}/${s.bestBowlingInnings.runs}` : '-';
                const oversBowledDecimal = s.ballsBowled / 6;
                const econ = s.ballsBowled > 0 ? (s.runsConceded / oversBowledDecimal).toFixed(2) : '0.00';
                const row = [
                    p.playerData.name, p.teamName, s.matchesPlayed, s.inningsBowled, s.wickets, s.runsConceded,
                    s.maidens, bbi, s.threeWicketHauls, s.fiveWicketHauls, oversBowledDecimal.toFixed(1), econ
                ];
                csvContent += row.map(item => `"${item}"`).join(',') + '\n';
            });
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${selectedFormat.replace(/\s/g, '_')}_${type}_stats.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const filteredPlayers = useMemo(() => {
        return (Object.values(gameState.careerStats || {}) as PlayerCareerSummary[])
            .filter(p => p.playerData.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(p => ({
                playerData: p.playerData, // Fix: Keep playerData as a nested object
                teamName: p.teamName,
                // Ensure stats[selectedFormat] exists before spreading
                stats: { ...p.stats.Overall, ...(p.stats[selectedFormat] || {}) }
            }));
    }, [gameState.careerStats, searchQuery, selectedFormat]);

    const sortedBattingStats = useMemo(() => {
        const config = sortConfig.batting;
        if (!filteredPlayers || !config) return [];
        return [...filteredPlayers].sort((a, b) => {
            const getAvg = (s: any) => (s.inningsBatted - s.notOuts > 0) ? (s.runs / (s.inningsBatted - s.notOuts)) : 0;
            const getSr = (s: any) => s.balls > 0 ? (s.runs / s.balls) * 100 : 0;
            let aValue: any, bValue: any;
            switch (config.key) {
                case 'avg': aValue = getAvg(a.stats); bValue = getAvg(b.stats); break;
                case 'sr': aValue = getSr(a.stats); bValue = getSr(b.stats); break;
                case 'name': aValue = a.playerData.name; bValue = b.playerData.name; break;
                default: aValue = (a.stats as any)[config.key] ?? 0; bValue = (b.stats as any)[config.key] ?? 0;
            }
            if (aValue < bValue) return config.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return config.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredPlayers, sortConfig.batting]);

    const sortedBowlingStats = useMemo(() => {
        const config = sortConfig.bowling;
        if (!filteredPlayers || !config) return [];
        return [...filteredPlayers].sort((a, b) => {
            const getAvg = (s: any) => s.wickets > 0 ? (s.runsConceded / s.wickets) : Infinity;
            const getEcon = (s: any) => s.ballsBowled > 0 ? (s.runsConceded / (s.ballsBowled / 6)) : Infinity;
            let aValue: any, bValue: any;
            switch (config.key) {
                case 'avg': aValue = getAvg(a.stats); bValue = getAvg(b.stats); break;
                case 'econ': aValue = getEcon(a.stats); bValue = getEcon(b.stats); break;
                case 'name': aValue = a.playerData.name; bValue = b.playerData.name; break;
                case 'oversBowled': aValue = a.stats.ballsBowled; bValue = b.stats.ballsBowled; break;
                default: aValue = (a.stats as any)[config.key] ?? 0; bValue = (b.stats as any)[config.key] ?? 0;
            }
            // Primary sort direction
            let comparison = 0;
            if (aValue < bValue) comparison = -1;
            if (aValue > bValue) comparison = 1;
            comparison = config.direction === 'asc' ? comparison : -comparison;

            // Secondary sort for bowling: if wickets are same, sort by runs conceded (asc)
            if (config.key === 'wickets' && comparison === 0) {
                return (a.stats.runsConceded ?? 0) - (b.stats.runsConceded ?? 0);
            }
            // Secondary sort for economy: if economy is same, sort by wickets (desc)
            if (config.key === 'econ' && comparison === 0) {
                return (b.stats.wickets ?? 0) - (a.stats.wickets ?? 0);
            }
            return comparison;
        });
    }, [filteredPlayers, sortConfig.bowling]);

    const renderBattingTable = () => (
        <table className="stats-table">
            <thead>
                <tr>
                    <th onClick={() => requestSort('batting', 'name')}>Player{getSortIndicator('batting', 'name')}</th>
                    <th>Team</th>
                    <th onClick={() => requestSort('batting', 'matchesPlayed')}>M{getSortIndicator('batting', 'matchesPlayed')}</th>
                    <th onClick={() => requestSort('batting', 'inningsBatted')}>I{getSortIndicator('batting', 'inningsBatted')}</th>
                    <th onClick={() => requestSort('batting', 'runs')}>Runs{getSortIndicator('batting', 'runs')}</th>
                    <th onClick={() => requestSort('batting', 'highestScore')}>HS{getSortIndicator('batting', 'highestScore')}</th>
                    <th onClick={() => requestSort('batting', 'avg')}>Avg{getSortIndicator('batting', 'avg')}</th>
                    <th onClick={() => requestSort('batting', 'sr')}>SR{getSortIndicator('batting', 'sr')}</th>
                    <th onClick={() => requestSort('batting', 'hundreds')}>100s{getSortIndicator('batting', 'hundreds')}</th>
                    <th onClick={() => requestSort('batting', 'fifties')}>50s{getSortIndicator('batting', 'fifties')}</th>
                </tr>
            </thead>
            <tbody>
                {sortedBattingStats.map(p => {
                    const stats = p.stats;
                    if (stats.inningsBatted === 0) return null; // Only show players who have batted
                    const avg = (stats.inningsBatted - stats.notOuts > 0) ? (stats.runs / (stats.inningsBatted - stats.notOuts)).toFixed(2) : '-';
                    const sr = stats.balls > 0 ? ((stats.runs / stats.balls) * 100).toFixed(2) : '0.00';
                    return (
                        <tr key={p.playerData.id} onClick={() => onViewPlayerProfile(p.playerData.id)}>
                            <td>{getRoleIcon(p.playerData.role)} {p.playerData.name} {p.playerData.isForeign && '🌐'}</td>
                            <td>{p.teamName}</td>
                            <td>{stats.matchesPlayed}</td>
                            <td>{stats.inningsBatted}</td>
                            <td>{stats.runs}</td>
                            <td>{stats.highestScore}</td>
                            <td>{avg}</td>
                            <td>{sr}</td>
                            <td>{stats.hundreds}</td>
                            <td>{stats.fifties}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    const renderBowlingTable = () => (
        <table className="stats-table">
            <thead>
                <tr>
                    <th onClick={() => requestSort('bowling', 'name')}>Player{getSortIndicator('bowling', 'name')}</th>
                    <th>Team</th>
                    <th onClick={() => requestSort('bowling', 'matchesPlayed')}>M{getSortIndicator('bowling', 'matchesPlayed')}</th>
                    <th onClick={() => requestSort('bowling', 'oversBowled')}>O{getSortIndicator('bowling', 'oversBowled')}</th>
                    <th onClick={() => requestSort('bowling', 'maidens')}>Mdns{getSortIndicator('bowling', 'maidens')}</th>
                    <th onClick={() => requestSort('bowling', 'runsConceded')}>Runs{getSortIndicator('bowling', 'runsConceded')}</th>
                    <th onClick={() => requestSort('bowling', 'wickets')}>Wkts{getSortIndicator('bowling', 'wickets')}</th>
                    <th onClick={() => requestSort('bowling', 'bestBowlingInnings')}>BBI{getSortIndicator('bowling', 'bestBowlingInnings')}</th>
                    <th onClick={() => requestSort('bowling', 'avg')}>Avg{getSortIndicator('bowling', 'avg')}</th>
                    <th onClick={() => requestSort('bowling', 'econ')}>Econ{getSortIndicator('bowling', 'econ')}</th>
                    <th onClick={() => requestSort('bowling', 'fiveWicketHauls')}>5W{getSortIndicator('bowling', 'fiveWicketHauls')}</th>
                </tr>
            </thead>
            <tbody>
                {sortedBowlingStats.map(p => {
                    const stats = p.stats;
                    if (stats.inningsBowled === 0) return null; // Only show players who have bowled
                    const oversBowledDecimal = stats.ballsBowled / 6;
                    const bbi = stats.bestBowlingInnings.wickets > 0 ? `${stats.bestBowlingInnings.wickets}/${stats.bestBowlingInnings.runs}` : '-';
                    const avg = stats.wickets > 0 ? (stats.runsConceded / stats.wickets).toFixed(2) : '-';
                    const econ = stats.ballsBowled > 0 ? (stats.runsConceded / oversBowledDecimal).toFixed(2) : '0.00';
                    return (
                        <tr key={p.playerData.id} onClick={() => onViewPlayerProfile(p.playerData.id)}>
                            <td>{getRoleIcon(p.playerData.role)} {p.playerData.name} {p.playerData.isForeign && '🌐'}</td>
                            <td>{p.teamName}</td>
                            <td>{stats.matchesPlayed}</td>
                            <td>{Math.floor(oversBowledDecimal)}.{stats.ballsBowled % 6}</td>
                            <td>{stats.maidens}</td>
                            <td>{stats.runsConceded}</td>
                            <td>{stats.wickets}</td>
                            <td>{bbi}</td>
                            <td>{avg}</td>
                            <td>{econ}</td>
                            <td>{stats.fiveWicketHauls}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    const renderRecords = () => {
        const formatRecords = gameState.records[selectedFormat];
        if (!formatRecords) return <p>No records for this format.</p>;

        const getPlayerNameAndTeam = (playerId: number, defaultName: string) => {
            const player = gameState.careerStats[playerId]?.playerData;
            const team = gameState.careerStats[playerId]?.teamName;
            return player ? `${player.name} (${team})` : defaultName;
        };

        return (
            <div className="records-list">
                <h3>Individual Records</h3>
                <p><strong>Highest Innings Score:</strong> {formatRecords.highestInningsScore.value} - {getPlayerNameAndTeam(formatRecords.highestInningsScore.playerId, formatRecords.highestInningsScore.name)} vs {formatRecords.highestInningsScore.against}</p>
                <p><strong>Best Innings Bowling:</strong> {formatRecords.bestInningsBowling.wickets}/{formatRecords.bestInningsBowling.runs} - {getPlayerNameAndTeam(formatRecords.bestInningsBowling.playerId, formatRecords.bestInningsBowling.name)} vs {formatRecords.bestInningsBowling.against}</p>
                {formatRecords.fastestFifty.balls !== 999 && <p><strong>Fastest Fifty:</strong> {formatRecords.fastestFifty.score} runs in {formatRecords.fastestFifty.balls} balls - {getPlayerNameAndTeam(formatRecords.fastestFifty.playerId, formatRecords.fastestFifty.name)} vs {formatRecords.fastestFifty.against}</p>}
                {formatRecords.fastestHundred.balls !== 999 && <p><strong>Fastest Hundred:</strong> {formatRecords.fastestHundred.score} runs in {formatRecords.fastestHundred.balls} balls - {getPlayerNameAndTeam(formatRecords.fastestHundred.playerId, formatRecords.fastestHundred.name)} vs {formatRecords.fastestHundred.against}</p>}
                {formatRecords.fastestHundredFifty.balls !== 999 && <p><strong>Fastest 150:</strong> {formatRecords.fastestHundredFifty.score} runs in {formatRecords.fastestHundredFifty.balls} balls - {getPlayerNameAndTeam(formatRecords.fastestHundredFifty.playerId, formatRecords.fastestHundredFifty.name)} vs {formatRecords.fastestHundredFifty.against}</p>}
                {formatRecords.fastestTwoHundred.balls !== 999 && <p><strong>Fastest 200:</strong> {formatRecords.fastestTwoHundred.score} runs in {formatRecords.fastestTwoHundred.balls} balls - {getPlayerNameAndTeam(formatRecords.fastestTwoHundred.playerId, formatRecords.fastestTwoHundred.name)} vs {formatRecords.fastestTwoHundred.against}</p>}

                <h3>Team Records</h3>
                <p><strong>Highest Team Total:</strong> {formatRecords.highestTeamTotal.score}/{formatRecords.highestTeamTotal.wickets} - {formatRecords.highestTeamTotal.teamName} vs {formatRecords.highestTeamTotal.against}</p>
                <p><strong>Lowest Team Total:</strong> {formatRecords.lowestTeamTotal.score}/{formatRecords.lowestTeamTotal.wickets} - {formatRecords.lowestTeamTotal.teamName} vs {formatRecords.lowestTeamTotal.against}</p>
            </div>
        );
    };

    const renderPromotionRules = () => (
        <div className="promotion-rules-section">
            <h2>Promotion & Relegation System</h2>
            <p>At the end of each season, teams are promoted to and relegated from the Top 6 Premier League based on their performance in the Development and Rise Cups across all three formats.</p>

            <h3>🚀 Total Promoted Teams per Season: 3</h3>
            <ul>
                <li>Best T20 team</li>
                <li>Best One-Day team</li>
                <li>Best First-Class team</li>
            </ul>
            <p>These promoted teams replace the bottom 3 teams of the Top 6 Premier League (one per format).</p>

            <h3>🟢 T20 Promotion Rule</h3>
            <ul>
                <li>Combine points from Development Cup T20 + Rise Cup T20.</li>
                <li>The team with the highest combined points gets promoted to the T20 Championship.</li>
            </ul>

            <h3>🔵 One-Day Promotion Rule</h3>
            <ul>
                <li>Combine points from Development Cup One-Day + Rise Cup One-Day.</li>
                <li>The team with the highest combined points gets promoted to the One-Day Trophy.</li>
            </ul>

            <h3>🔴 First-Class Promotion Rule</h3>
            <ul>
                <li>Combine points from Development Cup First-Class + Rise Cup First-Class.</li>
                <li>The team with the highest combined total gets promoted to the First-Class Tournament.</li>
            </ul>

            <p>This system ensures a dynamic and challenging career experience, where development teams have a clear path to the top tier, and top-tier teams must consistently perform to avoid relegation.</p>
        </div>
    );


    return (
        <div className="stats-hub-screen">
            <div className="stats-hub-content">
                <header className="stats-hub-header">
                    <h1>Stats Hub</h1>
                    <button onClick={onExit} className="btn-exit">Return to Hub</button>
                </header>

                <div className="tabs">
                    <button onClick={() => setActiveTab('batting')} className={activeTab === 'batting' ? 'active' : ''}>🏏 Batting</button>
                    <button onClick={() => setActiveTab('bowling')} className={activeTab === 'bowling' ? 'active' : ''}>⚾ Bowling</button>
                    <button onClick={() => setActiveTab('records')} className={activeTab === 'records' ? 'active' : ''}>🏆 Records</button>
                    <button onClick={() => setActiveTab('promotionRules')} className={activeTab === 'promotionRules' ? 'active' : ''}>📈 Promotion Rules</button>
                </div>

                {activeTab !== 'promotionRules' && (
                    <div className="filters-and-search">
                        <select value={selectedFormat} onChange={e => setSelectedFormat(e.target.value)}>
                            <option value="Overall">Overall</option>
                            {gameState.formats.map(f => (
                                <option key={f.name} value={f.name}>{f.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Search player..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        {activeTab === 'batting' && <button onClick={() => handleExport('batting')} className="export-btn">Export Batting</button>}
                        {activeTab === 'bowling' && <button onClick={() => handleExport('bowling')} className="export-btn">Export Bowling</button>}
                    </div>
                )}

                <div className="stats-table-container">
                    {activeTab === 'batting' && renderBattingTable()}
                    {activeTab === 'bowling' && renderBowlingTable()}
                    {activeTab === 'records' && renderRecords()}
                    {activeTab === 'promotionRules' && renderPromotionRules()}
                </div>
            </div>
        </div>
    );
};