import { GameState, MatchSummaryData, CareerStatsData, FormatRecords } from './types';

export const updateCareerStatsAndRecords = (gs: GameState, summary: MatchSummaryData): { updatedCareerStats: GameState['careerStats'], updatedRecords: GameState['records'] } => {
    let newCareerStats = JSON.parse(JSON.stringify(gs.careerStats));
    let newRecords = JSON.parse(JSON.stringify(gs.records));
    
    // Ensure fullMatchStats is available, otherwise return current stats/records
    if (!summary.fullMatchStats) {
        console.warn("No fullMatchStats available in summary for career stats update.");
        return { updatedCareerStats: newCareerStats, updatedRecords: newRecords };
    }

    const allPlayerStats = Object.entries(summary.fullMatchStats!).flatMap(([teamName, players]) => 
        players.map(p => ({ ...p, teamName }))
    );
    const formatName = summary.formatName;
    
    allPlayerStats.forEach(p => {
        // Skip if player doesn't exist in career stats (shouldn't happen with proper initialization)
        if (!newCareerStats[p.id]) {
            console.warn(`Player ${p.name} (ID: ${p.id}) not found in career stats. Skipping update.`);
            return;
        }

        const updateStats = (stats: CareerStatsData): CareerStatsData => {
            stats.matchesPlayed++;
            // Batting
            // Only count as batted innings if player faced balls or was dismissed (not DNB)
            if (p.balls > 0 || p.status !== 'not out') stats.inningsBatted++;
            stats.runs += p.runs;
            stats.balls += p.balls;
            stats.fours += p.fours;
            stats.sixes += p.sixes;
            if (p.status.includes('not out')) stats.notOuts++;
            if (p.runs > stats.highestScore) stats.highestScore = p.runs;
            if (p.runs >= 100) stats.hundreds++;
            else if (p.runs >= 50) stats.fifties++;
            // Bowling
            if (p.ballsBowled > 0) stats.inningsBowled++;
            stats.ballsBowled += p.ballsBowled;
            stats.runsConceded += p.runsConceded;
            stats.wickets += p.wickets;
            stats.maidens += p.maidens;
            // Best Bowling in Innings (BBI)
            if (p.wickets > stats.bestBowlingInnings.wickets || (p.wickets === stats.bestBowlingInnings.wickets && p.runsConceded < stats.bestBowlingInnings.runs)) {
                stats.bestBowlingInnings = { wickets: p.wickets, runs: p.runsConceded };
            }
            if (p.wickets >= 5) stats.fiveWicketHauls++;
            else if (p.wickets >= 3) stats.threeWicketHauls++;
            return stats;
        };

        // Update Overall stats
        newCareerStats[p.id].stats.Overall = updateStats(newCareerStats[p.id].stats.Overall);
        
        // Ensure format-specific stats exist, then update
        if (!newCareerStats[p.id].stats[formatName]) {
            // Initialize format-specific stats if not present (should be done during game setup)
            // For safety, deep copy from a blank template if missing
            const emptyStats = (): CareerStatsData => ({ matchesPlayed: 0, inningsBatted: 0, runs: 0, balls: 0, fours: 0, sixes: 0, notOuts: 0, highestScore: 0, fifties: 0, hundreds: 0, inningsBowled: 0, ballsBowled: 0, runsConceded: 0, wickets: 0, maidens: 0, bestBowlingInnings: { wickets: 0, runs: 999 }, threeWicketHauls: 0, fiveWicketHauls: 0 });
            newCareerStats[p.id].stats[formatName] = emptyStats();
        }
        newCareerStats[p.id].stats[formatName] = updateStats(newCareerStats[p.id].stats[formatName]);

        // Record Checking for individual players
        const checkPlayerRecords = (rec: FormatRecords) => {
            const againstTeam = p.teamName === summary.team1.name ? summary.team2.name : summary.team1.name;
            if (p.runs > rec.highestInningsScore.value) {
                rec.highestInningsScore = { playerId: p.id, name: p.name, teamName: p.teamName, value: p.runs, against: againstTeam };
            }
            if (p.wickets > rec.bestInningsBowling.wickets || (p.wickets === rec.bestInningsBowling.wickets && p.runsConceded < rec.bestInningsBowling.runs)) {
                rec.bestInningsBowling = { playerId: p.id, name: p.name, teamName: p.teamName, wickets: p.wickets, runs: p.runsConceded, against: againstTeam };
            }
            // Milestone records (fastest 50, 100 etc.)
            if (p.milestones.fiftyBalls && p.milestones.fiftyBalls < rec.fastestFifty.balls) {
                rec.fastestFifty = { playerId: p.id, name: p.name, teamName: p.teamName, balls: p.milestones.fiftyBalls, score: p.runs, against: againstTeam };
            }
            if (p.milestones.hundredBalls && p.milestones.hundredBalls < rec.fastestHundred.balls) {
                rec.fastestHundred = { playerId: p.id, name: p.name, teamName: p.teamName, balls: p.milestones.hundredBalls, score: p.runs, against: againstTeam };
            }
            // Add other milestones if needed (150, 200)
            if (p.milestones.hundredFiftyBalls && p.milestones.hundredFiftyBalls < rec.fastestHundredFifty.balls) {
                rec.fastestHundredFifty = { playerId: p.id, name: p.name, teamName: p.teamName, balls: p.milestones.hundredFiftyBalls, score: p.runs, against: againstTeam };
            }
            if (p.milestones.twoHundredBalls && p.milestones.twoHundredBalls < rec.fastestTwoHundred.balls) {
                rec.fastestTwoHundred = { playerId: p.id, name: p.name, teamName: p.teamName, balls: p.milestones.twoHundredBalls, score: p.runs, against: againstTeam };
            }
        };
        checkPlayerRecords(newRecords[formatName]);
        checkPlayerRecords(newRecords.Overall); // Update overall records too
    });

    // Record Checking for team totals
    const checkTeamRecords = (rec: FormatRecords) => {
        // Highest Team Total
        if (summary.team1.score > rec.highestTeamTotal.score) {
            rec.highestTeamTotal = { teamName: summary.team1.name, score: summary.team1.score, wickets: summary.team1.wickets, against: summary.team2.name };
        }
        if (summary.team2.score > rec.highestTeamTotal.score) {
            rec.highestTeamTotal = { teamName: summary.team2.name, score: summary.team2.score, wickets: summary.team2.wickets, against: summary.team1.name };
        }
        // Lowest Team Total (only for all out scenarios)
        if (summary.team1.wickets === 10 && summary.team1.score < rec.lowestTeamTotal.score) {
            rec.lowestTeamTotal = { teamName: summary.team1.name, score: summary.team1.score, wickets: 10, against: summary.team2.name };
        }
        if (summary.team2.wickets === 10 && summary.team2.score < rec.lowestTeamTotal.score) {
            rec.lowestTeamTotal = { teamName: summary.team2.name, score: summary.team2.score, wickets: 10, against: summary.team1.name };
        }
    };
    checkTeamRecords(newRecords[formatName]);
    checkTeamRecords(newRecords.Overall);

    return { updatedCareerStats: newCareerStats, updatedRecords: newRecords };
};