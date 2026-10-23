import { ALL_PLAYERS, initialGroundsData, teamConfigurations, initialFixtures } from './constants';
import { Player, Team, Ground, FormatSettings, Match, TeamStanding, CareerStatsData, PlayerCareerSummary, PlayerDynamicStats, Records, FormatRecords, TournamentFormatName, FormatCategory } from './types';

// Helper to find player by name, including handling ambiguous names
const findPlayerByName = (name: string, allPlayers: Player[], roleHint?: string): Player | null => {
    let foundPlayer;

    if (roleHint) {
        foundPlayer = allPlayers.find(p => p.name === name && p.role === roleHint);
        if (foundPlayer) return foundPlayer;
    }
    
    foundPlayer = allPlayers.find(p => p.name === name);
    if (foundPlayer) return foundPlayer;

    const nameParts = name.split(' ');
    const lastName = nameParts[nameParts.length - 1];
    foundPlayer = allPlayers.find(p => p.name.includes(lastName) && nameParts[0].startsWith(p.name[0]));
    if(foundPlayer) return foundPlayer;
    console.warn(`Player "${name}" not found.`);
    return null;
};

export const initializeGameData = (): { teams: Team[], freeAgents: Player[], grounds: Ground[] } => {
    const allPlayersWithIds = ALL_PLAYERS.map((p, i) => ({ ...p, id: i + 1, isForeign: p.nationality !== 'Pakistan' }));

    const grounds = initialGroundsData.map((g, i) => ({ ...g, id: i + 1 }));
    const groundMap = new Map(grounds.map(g => [g.shortCode, g.id]));
    const teams: Team[] = [];
    const assignedPlayerIds = new Set<number>();

    // Process all teams from configurations
    teamConfigurations.forEach(config => {
        const squad = config.players.map(name => {
            // Handle specific name ambiguities or aliases
            if (name === 'Farhan (BL)') return findPlayerByName('Farhan', allPlayersWithIds, 'bl');
            if (name === 'Farhan') return findPlayerByName('Farhan', allPlayersWithIds, 'bt'); // Default Farhan to batter if not specified
            if (name === 'S. Wardna') return findPlayerByName('Sriwardna', allPlayersWithIds); // Correct spelling
            if (name === 'Waheed (again)') return findPlayerByName('Waheed', allPlayersWithIds); // Use first Waheed found for simplicity
            return findPlayerByName(name, allPlayersWithIds);
        }).filter((p): p is Player => p !== null);

        squad.forEach(p => assignedPlayerIds.add(p.id));
        
        const bestPlayer = squad.length > 0 ? [...squad].sort((a, b) => (b.bat + b.skill) - (a.bat + a.skill))[0] : null;
        const squadIds = squad.map(p => p.id);
        
        teams.push({
            id: teams.length + 1, // Assign incremental ID
            name: config.name,
            homeGroundId: config.homeGroundShortCode ? groundMap.get(config.homeGroundShortCode) : undefined,
            isDevelopmentTeam: config.isDev,
            masterSquad: squad,
            formatSquads: { 'T20': squadIds, 'One-Day': squadIds, 'First-Class': squadIds },
            captains: { 'T20': bestPlayer?.id || null, 'One-Day': bestPlayer?.id || null, 'First-Class': bestPlayer?.id || null },
        });
    });

    // Players not assigned to any team become free agents
    const freeAgents = allPlayersWithIds.filter(p => !assignedPlayerIds.has(p.id));

    return { teams, freeAgents, grounds };
};


export const generateSchedule = (teams: Team[], formats: FormatSettings[], grounds: Ground[]): Match[] => {
    const schedule: Match[] = [];
    let matchId = 0;
    let currentDate = new Date('2025-01-01'); // Starting date for the schedule

    const teamMap = new Map(teams.map(t => [t.name, t]));
    const finalGround = grounds.find(g => g.shortCode === 'KNFG') || grounds[0]; // Use a designated final ground or first available

    initialFixtures.forEach(fixtureEntry => {
        const formatSetting = formats.find(f => f.name === fixtureEntry.formatName as TournamentFormatName);
        if (!formatSetting) {
            console.warn(`Format settings not found for ${fixtureEntry.formatName}. Skipping fixture entry.`);
            return;
        }

        // Determine gap based on format category
        // T20: Matches every 2 days (Play D1, Gap D2, Play D3) -> Increment 2
        // One-Day: 1-day gap (Play D1, Gap D2, Play D3) -> Increment 2
        // FC: 4-day match + 6-day gap (Play D1-D4, Gap D5-D10, Play D11) -> Increment 10
        let gap = 1;
        if (formatSetting.category === 'T20') gap = 2;
        else if (formatSetting.category === 'One-Day') gap = 2;
        else if (formatSetting.category === 'First-Class') gap = 10;

        const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD

        fixtureEntry.matches.forEach(matchPair => {
            // Special handling for playoff placeholders
            if (fixtureEntry.isPlayoff) {
                schedule.push({
                    id: matchId++,
                    team1Id: 0, // Placeholder
                    team2Id: 0, // Placeholder
                    formatName: fixtureEntry.formatName as TournamentFormatName,
                    status: 'pending',
                    groundId: finalGround.id,
                    venue: `${finalGround.name} (${fixtureEntry.playoffType === 'semi-final' ? `Semi-Final ${fixtureEntry.round === 99 ? 1 : 2}` : 'Final'})`,
                    round: fixtureEntry.round,
                    isPlayoff: true,
                    playoffType: fixtureEntry.playoffType, // Add playoffType
                    matchDate: formattedDate, // Assign date to playoff placeholder
                });
                return; // Skip actual team assignment for placeholders
            }

            const team1 = teamMap.get(matchPair.team1Name);
            const team2 = teamMap.get(matchPair.team2Name);

            if (!team1 || !team2) {
                console.warn(`Teams not found for match: ${matchPair.team1Name} vs ${matchPair.team2Name}. Skipping.`);
                return;
            }

            // Determine home ground: Alternate for league matches, prioritize if specific home ground is set
            // For now, let's keep it simple and just pick a random ground, or a home ground if available for team1
            let ground = grounds.find(g => g.id === team1.homeGroundId) || grounds[Math.floor(Math.random() * grounds.length)];
            
            schedule.push({
                id: matchId++,
                team1Id: team1.id,
                team2Id: team2.id,
                formatName: fixtureEntry.formatName as TournamentFormatName,
                status: 'pending',
                groundId: ground.id,
                venue: ground.name,
                round: fixtureEntry.round,
                isPlayoff: false, // League matches are not playoffs
                matchDate: formattedDate, // Assign date to league match
            });
        });

        // Increment date after the whole round (fixture entry) is scheduled
        currentDate.setDate(currentDate.getDate() + gap);
    });

    return schedule.sort((a, b) => a.round! - b.round! || new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime() || a.id - b.id);
};

export const createInitialCareerStats = (allPlayers: Player[], teams: Team[], formats: FormatSettings[]): { [playerId: number]: PlayerCareerSummary } => {
    const initialCareerStats: { [playerId: number]: PlayerCareerSummary } = {};
    allPlayers.forEach(p => {
         const emptyStats = (): CareerStatsData => ({ matchesPlayed: 0, inningsBatted: 0, runs: 0, balls: 0, fours: 0, sixes: 0, notOuts: 0, highestScore: 0, fifties: 0, hundreds: 0, inningsBowled: 0, ballsBowled: 0, runsConceded: 0, wickets: 0, maidens: 0, bestBowlingInnings: { wickets: 0, runs: 999 }, threeWicketHauls: 0, fiveWicketHauls: 0 });
         initialCareerStats[p.id] = {
             playerData: p,
             teamName: teams.find(t => t.masterSquad.some(pl => pl.id === p.id))?.name || 'N/A',
             stats: {
                 Overall: emptyStats(),
                 ...Object.fromEntries(formats.map(f => [f.name, emptyStats()]))
             }
         };
    });
    return initialCareerStats;
};

export const createInitialPlayerDynamicStats = (allPlayers: Player[]): { [id: number]: PlayerDynamicStats } => {
    const initialDynamicStats = allPlayers.reduce((acc, p) => {
        acc[p.id] = { form: 'Neutral', fatigue: 0, recentBattingStats: [], recentBowlingStats: [], restedTurns: 0 };
        return acc;
    }, {} as { [id: number]: PlayerDynamicStats });
    return initialDynamicStats;
};

export const createInitialRecords = (formats: FormatSettings[]): Records => {
    const initialRecords: Records = {};
    formats.forEach(f => {
        const emptyRecord = { playerId: 0, name: 'N/A', teamName: 'N/A', value: 0, against: 'N/A' };
        const emptyTeamRecord = { teamName: 'N/A', score: 0, wickets: 10, against: 'N/A' };
        const emptyMilestoneRecord = { playerId: 0, name: 'N/A', teamName: 'N/A', balls: 999, score: 0, against: 'N/A' };
        initialRecords[f.name] = {
            highestInningsScore: emptyRecord,
            bestInningsBowling: { playerId: 0, name: 'N/A', teamName: 'N/A', wickets: 0, runs: 999, against: 'N/A' },
            highestTeamTotal: emptyTeamRecord,
            lowestTeamTotal: { ...emptyTeamRecord, score: 999 },
            fastestFifty: emptyMilestoneRecord,
            fastestHundred: emptyMilestoneRecord,
            fastestHundredFifty: emptyMilestoneRecord,
            fastestTwoHundred: emptyMilestoneRecord,
        };
    });
    initialRecords['Overall'] = JSON.parse(JSON.stringify(initialRecords[formats[0].name]));
    return initialRecords;
};