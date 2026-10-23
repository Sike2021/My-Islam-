import { Player, PlayerStats, Lineup, PlayerDynamicStats, Team, FormatSettings } from './types';

// Fix: Added teamName parameter and initialized teamName and _runsThisOver
export const initialPlayerStats = (player: Player, teamName: string): PlayerStats => ({
    ...player, runs: 0, balls: 0, fours: 0, sixes: 0, status: 'not out',
    ballsBowled: 0, overs: 0, maidens: 0, runsConceded: 0, wickets: 0,
    milestones: {},
    teamName: teamName, // Initializing teamName
    _runsThisOver: 0, // Initializing _runsThisOver
});

export const getMaxOversPerBowler = (totalOvers: number) => {
    if (totalOvers <= 20) return 4;
    if (totalOvers <= 50) return 10;
    return 999; // Unlimited for First-Class
};

export const selectAI_XI = (team: Team, lineup: Lineup | undefined, playerDynamicStats: { [id: number]: PlayerDynamicStats }, format: FormatSettings): Player[] => {
    // If a specific lineup is provided and valid, use it.
    if (lineup?.xi?.length === 11) {
        return team.masterSquad.filter(p => lineup.xi.includes(p.id));
    }
    
    const { masterSquad, formatSquads } = team;
    const { category } = format;
    const formatSquadIds = formatSquads[category];
    let availableForFormat = masterSquad.filter(p => formatSquadIds.includes(p.id));

    // Enforce overseas player rule: only allowed in T20 format
    if (category !== 'T20') {
        availableForFormat = availableForFormat.filter(p => !p.isForeign);
    }

    const getPlayerScore = (p: Player) => {
        const dynamicStats = playerDynamicStats[p.id];
        let score = p.bat + p.skill;
        if (dynamicStats) {
            if (dynamicStats.form === 'In Form') score *= 1.15;
            if (dynamicStats.form === 'Out of Form') score *= 0.8;
            score -= (dynamicStats.fatigue / 5); // Penalize fatigue
        }
        return score;
    };

    // Simple logic to "drop" bowlers who are consistently expensive
    const isBowlerDropped = (p: Player) => {
        const dynamicStats = playerDynamicStats[p.id];
        // Only consider actual bowlers/all-rounders
        if (!dynamicStats || p.role === 'bt' || p.role === 'wk' || p.bowlingType === 'None') return false;
        
        // Filter recent bowling stats for the current format category (e.g., T20)
        const recentFormatStats = dynamicStats.recentBowlingStats.filter(s => s.format.includes(category));
        
        // If less than 3 recent matches, don't drop
        if (recentFormatStats.length < 3) return false;
        
        // Check if last 3 performances were very expensive (e.g., Economy Rate > 10)
        const lastThree = recentFormatStats.slice(-3);
        return lastThree.every(s => s.ballsBowled > 0 && (s.runsConceded / (s.ballsBowled / 6)) >= 10);
    };

    const availableSquad = availableForFormat.filter(p => !isBowlerDropped(p));

    const sortedByRole = (role: string) => 
        availableSquad.filter(p => p.role === role).sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
    
    // Select players by role, prioritizing best performers
    let xi: Player[] = [];
    
    // Wicketkeeper (mandatory)
    const keepers = sortedByRole('wk');
    if (keepers.length > 0) xi.push(keepers[0]);

    // Batters
    const batters = sortedByRole('bt');
    batters.slice(0, 4).forEach(p => xi.push(p)); // Try to pick top 4 pure batsmen

    // All-rounders
    const allrounders = sortedByRole('ar');
    allrounders.slice(0, 2).forEach(p => xi.push(p)); // Try to pick top 2 all-rounders
    
    // Bowlers (spin and fast/medium)
    const bowlers = sortedByRole('bl');
    const spinners = sortedByRole('sb');
    
    const potentialBowlers = [...bowlers, ...spinners].sort((a,b) => getPlayerScore(b) - getPlayerScore(a));
    potentialBowlers.slice(0, 4).forEach(p => {
        if (xi.length < 11 && !xi.some(existing => existing.id === p.id)) {
            xi.push(p);
        }
    });

    // Fill remaining spots if needed, prioritizing highest-scoring available players
    const remainingPlayers = availableSquad.filter(p => !xi.some(p2 => p2.id === p.id))
                                  .sort((a, b) => getPlayerScore(b) - getPlayerScore(a));

    while (xi.length < 11 && remainingPlayers.length > 0) {
        xi.push(remainingPlayers.shift()!);
    }
    
    // Enforce max 3 overseas players if it's a T20 match and more were selected
    if (category === 'T20') {
        const foreignInXI = xi.filter(p => p.isForeign);
        if (foreignInXI.length > 3) {
            // Find local players not in XI to replace excess foreigners
            const localsNotInXI = availableSquad.filter(p => !p.isForeign && !xi.some(p2 => p2.id === p.id))
                                                .sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
            // Find the weakest overseas players in XI to replace
            const foreignersToReplace = foreignInXI.sort((a, b) => getPlayerScore(a) - getPlayerScore(b)).slice(0, foreignInXI.length - 3);

            foreignersToReplace.forEach(foreigner => {
                if (localsNotInXI.length > 0) {
                    const replacement = localsNotInXI.shift();
                    const index = xi.findIndex(p => p.id === foreigner.id);
                    if (index !== -1 && replacement) {
                        xi[index] = replacement; // Swap out
                    }
                }
            });
        }
    }

    return xi.slice(0, 11); // Ensure exactly 11 players
};