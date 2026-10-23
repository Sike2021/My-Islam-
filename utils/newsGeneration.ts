import { MatchSummaryData, GameState, NewsArticle } from './types';

export const generateNewsStory = (summary: MatchSummaryData, gameState: GameState): NewsArticle => {
    const { result, manOfTheMatch: motm, team1, team2, team1XI, team2XI } = summary;
    const winnerName = result.split(' won by')[0];
    const winner = team1.name === winnerName ? team1 : team2;
    const loser = winner.id === team1.id ? team2 : team1;

    const match = gameState.schedule[gameState.currentMatchIndex];
    const format = gameState.formats.find(f => f.name === match.formatName);
    const totalOvers = format ? format.overs : 20;

    const templates = [];

    // Template for big batting performance
    if (motm && (motm.runs >= 80 || (motm.runs >= 40 && totalOvers <= 20))) {
        templates.push({
            headline: `${motm.name}'s Masterclass Sinks ${loser.name}`,
            body: `${winner.name}'s star player, ${motm.name}, was in imperious form today, smashing an unbeaten ${motm.runs} from just ${motm.balls} balls. The brilliant knock was the cornerstone of a dominant victory over ${loser.name}.`
        });
    }

    // Template for big bowling performance
    if (motm && motm.wickets >= 4) {
        templates.push({
            headline: `${motm.name} Tears Through ${loser.name}'s Lineup`,
            body: `An incredible bowling spell from ${motm.name} saw ${winner.name} cruise to a win against ${loser.name}. The star bowler claimed ${motm.wickets} for just ${motm.runsConceded} runs, leaving the opposition with no answers.`
        });
    }

    // Generic win template
    templates.push({
        headline: `${winner.name} Continue Winning Form Against ${loser.name}`,
        body: `It was a clinical performance from ${winner.name} as they secured a convincing win over ${loser.name} today. The team looks in great shape as the season progresses.`
    });
    
    // Upset template (if lower skilled team wins) - simple version
    // Use the actual XIs from the match for skill calculation
    const winnerXI = winner.id === team1.id ? team1XI : team2XI;
    const loserXI = loser.id === team1.id ? team1XI : team2XI;

    if (winnerXI.length > 0 && loserXI.length > 0) {
        const winnerSkill = winnerXI.reduce((acc, p) => acc + p.bat + p.skill, 0);
        const loserSkill = loserXI.reduce((acc, p) => acc + p.bat + p.skill, 0);
        if (winnerSkill < loserSkill * 0.9) { // If winner's overall skill is significantly lower
             templates.push({
                headline: `UPSET! ${winner.name} Stun ${loser.name} in Thriller`,
                body: `In a surprising turn of events, ${winner.name} pulled off a remarkable upset against the favored ${loser.name}. A true team effort saw them over the line in a memorable contest.`
            });
        }
    }

    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    return {
        id: Date.now(),
        headline: selectedTemplate.headline,
        body: `${selectedTemplate.body} The final result: ${result}`,
        date: `Matchday ${gameState.currentMatchIndex + 1}`
    };
};