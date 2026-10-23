import React, { useState, useEffect } from 'react';
import { GameState, MatchSummaryData, Player, CareerStatsData, TeamStanding, PlayerDynamicStats, FormatCategory } from './utils/types';
import { SAVE_GAME_KEY, initialFormats } from './utils/constants';
// Fix: Renamed 'setupInitialGameData' to 'initializeGameData'
import { initializeGameData, generateSchedule, createInitialCareerStats, createInitialPlayerDynamicStats, createInitialRecords } from './utils/gameSetup';
import { generateNewsStory } from './utils/newsGeneration';
import { updateCareerStatsAndRecords } from './utils/statsAndRecords';
import { initialPlayerStats, selectAI_XI } from './utils/matchSimulation';

// UI Components
import { MainMenu } from './components/MainMenu';
import { SimulationScreen } from './components/SimulationScreen'; // Not used, but kept for consistency if needed in future for pure text sim
import { MatchSummaryScreen } from './components/MatchSummaryScreen';
import { Gameplay2DScreen } from './components/Gameplay2DScreen';
import { ChooseTeam } from './components/ChooseTeam';
import { InSeasonHub } from './components/InSeasonHub';
import { TransferMarketScreen } from './components/TransferMarketScreen';
import { NewsHubScreen } from './components/NewsHubScreen';
import { ScheduleAndStandingsScreen } from './components/ScheduleAndStandingsScreen';
import { BottomNavbar } from './components/BottomNavbar';
import { PreMatchScreen } from './components/PreMatchScreen';
import { LineupEditorScreen } from './components/LineupEditorScreen';
import { StatsHubScreen } from './components/StatsHubScreen';
import { PlayerProfileScreen } from './components/PlayerProfileScreen';
import { RoadmapScreen } from './components/RoadmapScreen';
import { EditorHubScreen } from './components/EditorHubScreen';
import { PlayerEditorScreen } from './components/PlayerEditorScreen';
import { GroundEditorScreen } from './components/GroundEditorScreen';


// --- MAIN APP COMPONENT ---
// This is the core component that manages the game state and renders different screens.
// Fix: Explicitly type App as React.FC
export const App: React.FC = () => {
    // 'view' determines which screen is currently visible to the user.
    const [view, setView] = useState('mainMenu');
    // 'gameState' holds the entire state of the career mode. It's null until a career is started or loaded.
    const [gameState, setGameState] = useState<GameState | null>(null);
    // 'hasSaveData' is a flag to enable/disable the "Resume" button on the main menu.
    const [hasSaveData, setHasSaveData] = useState(false);
    
    // State to hold initial game data for team selection before a career starts
    const [initialGameSetupData, setInitialGameSetupData] = useState<ReturnType<typeof initializeGameData> | null>(null);

    // States for managing modals and temporary data for screens
    const [currentMatchInfo, setCurrentMatchInfo] = useState<any>(null);
    const [matchSummaryToShow, setMatchSummaryToShow] = useState<MatchSummaryData | null>(null);
    const [preMatchSetupData, setPreMatchSetupData] = useState<any>(null);
    const [playerProfileToShow, setPlayerProfileToShow] = useState<any>(null); // PlayerCareerSummary | null
    const [isRoadmapVisible, setIsRoadmapVisible] = useState(false);

    // This effect runs once when the app starts to check for an existing save file and initialize basic game data.
    useEffect(() => {
        const savedData = localStorage.getItem(SAVE_GAME_KEY);
        setHasSaveData(!!savedData);

        // Initialize teams and other basic data for selection screens (e.g., ChooseTeam)
        const initialData = initializeGameData();
        setInitialGameSetupData(initialData);
    }, []);
    
    // This effect saves the game state to local storage whenever it changes.
    useEffect(() => {
        if (gameState && gameState.seasonStarted) {
            localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(gameState));
            setHasSaveData(true);
        }
    }, [gameState]);

    // Function to create a brand new game state.
    const createNewGame = (managerName: string, teamId: number) => {
        // Ensure initial game data is available
        if (!initialGameSetupData) {
            console.error("Initial game setup data not available. Cannot create new career.");
            return;
        }

        // Use the pre-loaded teams, freeAgents, and grounds from the initial setup
        const { teams, freeAgents, grounds } = initialGameSetupData;
        const formats = initialFormats; // Use the updated initialFormats
        const schedule = generateSchedule(teams, formats, grounds);
        
        const initialStandings: { [formatName: string]: TeamStanding[] } = {};
        formats.forEach(f => {
            // Determine relevant teams for standings based on format name (e.g., 'Development Cup')
            let relevantTeams;
            if (f.name.includes('Development') || f.name.includes('Rise')) {
                relevantTeams = teams.filter(t => t.isDevelopmentTeam);
            } else {
                relevantTeams = teams.filter(t => !t.isDevelopmentTeam);
            }
            initialStandings[f.name] = relevantTeams.map(t => ({ teamId: t.id, teamName: t.name, played: 0, won: 0, lost: 0, points: 0 }));
        });

        const allPlayers = teams.flatMap(t => t.masterSquad);
        const initialCareerStats = createInitialCareerStats(allPlayers, teams, formats);
        const initialDynamicStats = createInitialPlayerDynamicStats(allPlayers);
        const initialRecords = createInitialRecords(formats);

        const newState: GameState = {
            teams, grounds, freeAgents, formats,
            manager: { name: managerName, teamId },
            seasonStarted: true, schedule, currentMatchIndex: 0,
            news: [], standings: initialStandings, matchSummaries: {},
            lineups: {}, careerStats: initialCareerStats, records: initialRecords, playerDynamicStats: initialDynamicStats
        };
        setGameState(newState);
        setView('inSeasonHub');
    };

    // --- Navigation and Menu Handlers ---
    const handleNewCareer = () => setView('chooseTeam');
    const handleSelectTeam = (teamId: number, managerName: string) => createNewGame(managerName, teamId);
    const handleResume = () => {
        const savedData = localStorage.getItem(SAVE_GAME_KEY);
        if (savedData) {
            setGameState(JSON.parse(savedData));
            setView('inSeasonHub');
        }
    };
    const handleResetCareer = () => {
        if (window.confirm("Are you sure you want to reset your career? All progress will be lost.")) {
            localStorage.removeItem(SAVE_GAME_KEY);
            setGameState(null);
            setHasSaveData(false);
            setView('mainMenu');
        }
    };
    const handleNavigate = (newView: string) => {
        setView(newView);
    };

    // --- Match Flow Handlers ---
    const handlePlayMatch = () => {
        const match = gameState!.schedule[gameState!.currentMatchIndex];
        const team1 = gameState!.teams.find(t => t.id === match.team1Id)!;
        const team2 = gameState!.teams.find(t => t.id === match.team2Id)!;
        const format = gameState!.formats.find(f => f.name === match.formatName)!;
        const ground = gameState!.grounds.find(g => g.id === match.groundId)!;
        setPreMatchSetupData({ team1, team2, managerTeamId: gameState!.manager!.teamId, format, ground });
        setView('preMatch');
    };
    
    const handleMatchSetupComplete = ({ team1XI, team2XI, battingTeamId }: { team1XI: Player[]; team2XI: Player[]; battingTeamId: number }) => {
        const match = gameState!.schedule[gameState!.currentMatchIndex];
        const team1 = gameState!.teams.find(t => t.id === match.team1Id)!;
        const team2 = gameState!.teams.find(t => t.id === match.team2Id)!;
        const format = gameState!.formats.find(f => f.name === match.formatName)!;
        const ground = gameState!.grounds.find(g => g.id === match.groundId)!;
        setCurrentMatchInfo({
            team1, team2, format, managerTeamId: gameState!.manager!.teamId,
            team1XI, team2XI, battingTeamId, lineups: gameState!.lineups, ground
        });
        setView('gameplay');
    };

    const handleMatchExit = (summary: MatchSummaryData) => {
        const match = gameState!.schedule[gameState!.currentMatchIndex];
        const format = gameState!.formats.find(f => f.name === match.formatName)!;
        
        // Determine Result and Winner
        let winnerName = summary.result.split(' won by')[0];
        let resultText = summary.result;

        // Super Over Logic for T20/One-Day Ties
        if (resultText === 'Match Tied!' && format.category !== 'First-Class') {
             // Simple Super Over Simulation: Random Winner
             const winnerTeam = Math.random() < 0.5 ? summary.team1 : summary.team2;
             winnerName = winnerTeam.name;
             resultText = `${winnerName} won via Super Over`;
             summary.result = resultText; // Update summary
        }

        const winnerId = gameState!.teams.find(t => t.name === winnerName)?.id || null;
        let loserId: number | null = null;
        if (winnerId) {
            loserId = match.team1Id === winnerId ? match.team2Id : match.team1Id;
        }

        // Stats and Records Update (Prior to points calculation to keep logic separate)
        const { updatedCareerStats, updatedRecords } = updateCareerStatsAndRecords(gameState!, summary);
        
        // Standings and Points Update
        const newStandings = { ...gameState!.standings };
        const formatStandings = newStandings[match.formatName];
        
        if (formatStandings) {
            let winnerPoints = 0;
            let bonusPoints = 0;
            // Tie/Draw points (for FC)
            let drawPoints = 0;

            if (format.category === 'First-Class') {
                winnerPoints = 12;
                drawPoints = 6;
            } else {
                winnerPoints = 2;
                // Bonus Points Logic
                if (winnerId) {
                    const winningTeamRes = summary.team1.name === winnerName ? summary.team1 : summary.team2;
                    const losingTeamRes = summary.team1.name === winnerName ? summary.team2 : summary.team1;
                    
                    if (format.category === 'T20') {
                        // T20 Bonus: Win by runs margin >= 25% of winner score OR chasing in <= 75% of overs
                        if (resultText.includes('runs')) {
                             const margin = winningTeamRes.score - losingTeamRes.score;
                             if (margin >= winningTeamRes.score * 0.25) bonusPoints = 1;
                        } else if (resultText.includes('wickets')) {
                             const oversUsed = winningTeamRes.overs + (winningTeamRes.balls/6);
                             if (oversUsed <= format.overs * 0.75) bonusPoints = 1;
                        }
                    } else if (format.category === 'One-Day') {
                        // One-Day Bonus: Win by >= 50 runs OR chasing in <= 40 overs
                        if (resultText.includes('runs')) {
                             const margin = winningTeamRes.score - losingTeamRes.score;
                             if (margin >= 50) bonusPoints = 1;
                        } else if (resultText.includes('wickets')) {
                             const oversUsed = winningTeamRes.overs + (winningTeamRes.balls/6);
                             if (oversUsed <= 40) bonusPoints = 1;
                        }
                    }
                }
            }

            if (winnerId) {
                const winnerIndex = formatStandings.findIndex(s => s.teamId === winnerId);
                if (winnerIndex > -1) {
                    formatStandings[winnerIndex].played++;
                    formatStandings[winnerIndex].won++;
                    formatStandings[winnerIndex].points += (winnerPoints + bonusPoints);
                }
                const loserIndex = loserId ? formatStandings.findIndex(s => s.teamId === loserId) : -1;
                if (loserIndex > -1) {
                    formatStandings[loserIndex].played++;
                    formatStandings[loserIndex].lost++;
                }
            } else {
                // Tie / Draw (Mainly FC if no winner found)
                const t1Index = formatStandings.findIndex(s => s.teamId === match.team1Id);
                const t2Index = formatStandings.findIndex(s => s.teamId === match.team2Id);
                
                if (t1Index > -1) { 
                    formatStandings[t1Index].played++; 
                    formatStandings[t1Index].points += drawPoints; 
                }
                if (t2Index > -1) { 
                    formatStandings[t2Index].played++; 
                    formatStandings[t2Index].points += drawPoints; 
                }
            }
        }
        
        const newNews = [generateNewsStory(summary, gameState!), ...gameState!.news];
        const newSchedule = [...gameState!.schedule];
        newSchedule[gameState!.currentMatchIndex] = { ...match, status: 'completed', winnerId };
        
        const newState: GameState = {
            ...gameState!,
            standings: newStandings,
            careerStats: updatedCareerStats,
            records: updatedRecords,
            news: newNews,
            schedule: newSchedule,
            currentMatchIndex: gameState!.currentMatchIndex + 1,
            matchSummaries: { ...gameState!.matchSummaries, [match.id]: summary },
        };

        setGameState(newState);
        setView('inSeasonHub');
    };

    const handleSimulateAIMatch = () => {
        const match = gameState!.schedule[gameState!.currentMatchIndex];
        const team1 = gameState!.teams.find(t => t.id === match.team1Id)!;
        const team2 = gameState!.teams.find(t => t.id === match.team2Id)!;
        const format = gameState!.formats.find(f => f.name === match.formatName)!;
        
        // AI selects their XIs based on playerDynamicStats and existing lineups
        const team1XI = selectAI_XI(team1, gameState!.lineups[team1.id]?.[format.category], gameState!.playerDynamicStats, format);
        const team2XI = selectAI_XI(team2, gameState!.lineups[team2.id]?.[format.category], gameState!.playerDynamicStats, format);

        // Randomly decide which team bats first for AI vs AI matches
        const battingTeamId = Math.random() < 0.5 ? team1.id : team2.id;

        setCurrentMatchInfo({
            team1, team2, format, managerTeamId: gameState!.manager!.teamId,
            team1XI, team2XI, battingTeamId, lineups: gameState!.lineups, ground: gameState!.grounds.find(g => g.id === match.groundId)! // AI matches don't need UI-driven ground
        });
        setView('simulationScreen'); // Use the non-interactive simulation screen
    };

    const handleStartNextSeason = () => {
        if (!gameState) return;

        let newTeams = JSON.parse(JSON.stringify(gameState.teams)); // Deep copy to modify
        const promotionMessages: string[] = [];

        // Define tournament groupings for promotion/relegation
        const formatCategories: FormatCategory[] = ['T20', 'One-Day', 'First-Class'];
        
        formatCategories.forEach(category => {
            const devCupFormatName = `Development Cup ${category}`;
            const riseCupFormatName = `Rise Cup ${category}`;
            const topLeagueFormatName = `${category} Championship`;

            const devCupStandings = gameState.standings[devCupFormatName];
            const riseCupStandings = gameState.standings[riseCupFormatName];
            const topLeagueStandings = gameState.standings[topLeagueFormatName];

            if (!devCupStandings || !riseCupStandings || !topLeagueStandings) {
                console.warn(`Missing standings for ${category} promotion/relegation. Skipping.`);
                return;
            }

            // 1. Calculate combined points for development teams
            const devTeamsCombinedPoints: { [teamId: number]: { teamName: string, totalPoints: number } } = {};
            
            [...devCupStandings, ...riseCupStandings].forEach(s => {
                if (devTeamsCombinedPoints[s.teamId]) {
                    devTeamsCombinedPoints[s.teamId].totalPoints += s.points;
                } else {
                    devTeamsCombinedPoints[s.teamId] = { teamName: s.teamName, totalPoints: s.points };
                }
            });

            // 2. Identify Promoted Team
            const sortedDevTeams = Object.values(devTeamsCombinedPoints).sort((a, b) => b.totalPoints - a.totalPoints);
            const promotedTeamInfo = sortedDevTeams[0]; // Top development team overall for this format
            const promotedTeamId = newTeams.find(t => t.name === promotedTeamInfo.teamName)?.id;

            // 3. Identify Relegated Team (from Top 6 League)
            const regularTeamsStandings = topLeagueStandings.filter(s => !newTeams.find(t => t.id === s.teamId)?.isDevelopmentTeam);
            const sortedRegularTeams = [...regularTeamsStandings].sort((a, b) => a.points - b.points);
            const relegatedTeamInfo = sortedRegularTeams[0]; // Bottom regular team in this format
            const relegatedTeamId = relegatedTeamInfo?.teamId;

            if (promotedTeamId && relegatedTeamId) {
                const promotedTeam = newTeams.find(t => t.id === promotedTeamId);
                const relegatedTeam = newTeams.find(t => t.id === relegatedTeamId);

                if (promotedTeam && relegatedTeam) {
                    // Swap their `isDevelopmentTeam` status
                    promotedTeam.isDevelopmentTeam = false;
                    relegatedTeam.isDevelopmentTeam = true;
                    
                    promotionMessages.push(`${promotedTeam.name} promoted to ${topLeagueFormatName}!`);
                    promotionMessages.push(`${relegatedTeam.name} relegated to Development/Rise Cups for ${category}!`);
                }
            }
        });
        
        // Reset dynamic player stats (fatigue, form, etc.) for a new season
        const allPlayers = newTeams.flatMap(t => t.masterSquad);
        const newPlayerDynamicStats = createInitialPlayerDynamicStats(allPlayers);
        
        // Generate new schedule for the next season with potentially updated teams
        const newSchedule = generateSchedule(newTeams, gameState.formats, gameState.grounds);

        // Reset standings for all formats
        const newStandings: { [formatName: string]: TeamStanding[] } = {};
        gameState.formats.forEach(f => {
            let relevantTeams;
            if (f.name.includes('Development') || f.name.includes('Rise')) {
                relevantTeams = newTeams.filter(t => t.isDevelopmentTeam);
            } else {
                relevantTeams = newTeams.filter(t => !t.isDevelopmentTeam);
            }
            newStandings[f.name] = relevantTeams.map(t => ({ teamId: t.id, teamName: t.name, played: 0, won: 0, lost: 0, points: 0 }));
        });

        const updatedGameState: GameState = {
            ...gameState,
            teams: newTeams, // Teams with updated promotion/relegation status
            currentMatchIndex: 0,
            schedule: newSchedule,
            news: [], // Clear old news
            standings: newStandings,
            matchSummaries: {}, // Clear old match summaries
            playerDynamicStats: newPlayerDynamicStats, // Reset dynamic stats
        };
        setGameState(updatedGameState);
        setView('inSeasonHub');
        alert("Welcome to the new season! Check the standings for promotion/relegation changes.\n\n" + promotionMessages.join('\n'));
    };

    // Helper for viewing match summaries from schedule
    const handleViewMatchSummary = (matchId: number) => {
        const summary = gameState?.matchSummaries[matchId];
        if (summary) {
            setMatchSummaryToShow(summary);
            setView('matchSummary');
        } else {
            alert('Match summary not available yet.');
        }
    };

    const currentMatch = gameState?.schedule[gameState.currentMatchIndex];
    const isManagerPlayingCurrentMatch = currentMatch && (currentMatch.team1Id === gameState?.manager?.teamId || currentMatch.team2Id === gameState?.manager?.teamId);

    return (
        <div className="app-container">
            {view === 'mainMenu' && <MainMenu onNewCareer={handleNewCareer} onResume={handleResume} onExhibition={() => {}} onResetCareer={handleResetCareer} hasSaveData={hasSaveData} onShowRoadmap={() => setIsRoadmapVisible(true)} />}
            {/* Fix: Pass initialGameSetupData.teams to ChooseTeam */}
            {view === 'chooseTeam' && initialGameSetupData && <ChooseTeam teams={initialGameSetupData.teams} onSelectTeam={handleSelectTeam} />}
            {view === 'inSeasonHub' && gameState && <InSeasonHub gameState={gameState} onPlayMatch={handlePlayMatch} onGoToTransfers={() => handleNavigate('transferMarket')} onGoToNews={() => handleNavigate('newsHub')} onGoToSchedule={() => handleNavigate('scheduleStandings')} onGoToTeamHub={() => handleNavigate('teamHub')} onSimulateAI={handleSimulateAIMatch} onGoToEditor={() => handleNavigate('editorHub')} onStartNextSeason={handleStartNextSeason} />}
            {view === 'preMatch' && gameState && preMatchSetupData && <PreMatchScreen matchInfo={preMatchSetupData} gameState={gameState} onMatchSetupComplete={handleMatchSetupComplete} />}
            {view === 'gameplay' && gameState && currentMatchInfo && (
                <Gameplay2DScreen
                    team1={currentMatchInfo.team1}
                    team2={currentMatchInfo.team2}
                    format={currentMatchInfo.format}
                    managerTeamId={currentMatchInfo.managerTeamId}
                    onExit={handleMatchExit}
                    team1XI={currentMatchInfo.team1XI}
                    team2XI={currentMatchInfo.team2XI}
                    battingTeamId={currentMatchInfo.battingTeamId}
                    lineups={currentMatchInfo.lineups}
                    ground={currentMatchInfo.ground}
                />
            )}
            {view === 'simulationScreen' && gameState && currentMatchInfo && (
                <SimulationScreen
                    team1={currentMatchInfo.team1}
                    team2={currentMatchInfo.team2}
                    format={currentMatchInfo.format}
                    onExit={handleMatchExit}
                    team1XI={currentMatchInfo.team1XI}
                    team2XI={currentMatchInfo.team2XI}
                    battingTeamId={currentMatchInfo.battingTeamId}
                />
            )}
            {view === 'matchSummary' && matchSummaryToShow && <MatchSummaryScreen summary={matchSummaryToShow} onExit={() => setView('inSeasonHub')} />}
            {view === 'transferMarket' && gameState && <TransferMarketScreen gameState={gameState} setGameState={setGameState} onExit={() => handleNavigate('inSeasonHub')} />}
            {view === 'newsHub' && gameState && <NewsHubScreen news={gameState.news} onExit={() => handleNavigate('inSeasonHub')} />}
            {view === 'scheduleStandings' && gameState && <ScheduleAndStandingsScreen gameState={gameState} onExit={() => handleNavigate('inSeasonHub')} onViewSummary={handleViewMatchSummary} />}
            {view === 'teamHub' && gameState && <LineupEditorScreen gameState={gameState} setGameState={setGameState} onExit={() => handleNavigate('inSeasonHub')} />}
            {view === 'statsHub' && gameState && <StatsHubScreen gameState={gameState} onExit={() => handleNavigate('inSeasonHub')} onViewPlayerProfile={(playerId) => { setPlayerProfileToShow(gameState.careerStats[playerId]); setView('playerProfile'); }} />}
            {view === 'playerProfile' && playerProfileToShow && gameState && <PlayerProfileScreen playerSummary={playerProfileToShow} formats={gameState.formats} onExit={() => setView('statsHub')} />}
            {view === 'editorHub' && gameState && <EditorHubScreen onExit={() => handleNavigate('inSeasonHub')} onGoToPlayerEditor={() => handleNavigate('playerEditor')} onGoToGroundEditor={() => handleNavigate('groundEditor')}/>}
            {view === 'playerEditor' && gameState && <PlayerEditorScreen gameState={gameState} setGameState={setGameState} onExit={() => handleNavigate('editorHub')} />}
            {view === 'groundEditor' && gameState && <GroundEditorScreen gameState={gameState} setGameState={setGameState} onExit={() => handleNavigate('editorHub')} />}

            {isRoadmapVisible && <RoadmapScreen onExit={() => setIsRoadmapVisible(false)} />}
            
            {(view !== 'mainMenu' && view !== 'chooseTeam' && view !== 'gameplay' && view !== 'simulationScreen' && !isRoadmapVisible && view !== 'preMatch') && (
                <BottomNavbar view={view} setView={handleNavigate} />
            )}
        </div>
    );
};