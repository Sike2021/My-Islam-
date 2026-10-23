// --- TYPE DEFINITIONS ---
export type PitchType = 'Balanced Sporting Pitch' | 'Green Top' | 'Dusty Spinner’s Haven' | 'Batting Paradise' | 'Cracked Worn Surface' | 'Dead Slow Track';

export interface Ground {
    id: number;
    name: string;
    shortCode: string;
    pitchType: PitchType;
    maxRunsT20?: number;
    minRunsT20?: number;
    maxRunsListA?: number;
    minRunsListA?: number;
    maxRunsFC?: number;
    minRunsFC?: number;
}

export type FormatCategory = 'T20' | 'One-Day' | 'First-Class';
export type TournamentFormatName = 
    'T20 Championship' | 'One-Day Trophy' | 'First-Class Tournament' |
    'Development Cup T20' | 'Development Cup One-Day' | 'Development Cup First-Class' |
    'Rise Cup T20' | 'Rise Cup One-Day' | 'Rise Cup First-Class';

export interface Player {
  id: number;
  name:string;
  age: number;
  bat: number;
  skill: number; // Bowling/Wicketkeeping
  fielding: number;
  stamina: number;
  role: string;
  style: string; // Aggression
  battingStyle: 'Right-hand' | 'Left-hand';
  bowlingType: 'Fast' | 'Medium' | 'Spin' | 'None';
  nationality: string;
  isOpener?: boolean;
  isForeign?: boolean;
}

export interface PlayerDynamicStats {
    form: 'In Form' | 'Neutral' | 'Out of Form';
    fatigue: number; // 0-100
    recentBattingStats: { runs: number; balls: number; status: string }[]; // last 3 innings
    recentBowlingStats: { runsConceded: number; ballsBowled: number; format: string }[]; // last 3 matches
    restedTurns: number;
}

export interface Team {
  id: number;
  name: string;
  masterSquad: Player[];
  formatSquads: {
      'T20': number[];
      'One-Day': number[];
      'First-Class': number[];
  };
  captains: {
      'T20': number | null;
      'One-Day': number | null;
      'First-Class': number | null;
  };
  homeGroundId?: number;
  isDevelopmentTeam?: boolean;
}

export interface FormatSettings {
  name: TournamentFormatName;
  matches: number; // Number of times each pair plays each other in the league stage
  overs: number;
  category: FormatCategory;
  isCup?: boolean; // Indicates if it's a cup with a final (no semi-finals for dev/rise cups)
  hasSemiFinals?: boolean; // Indicates if it has semi-finals (for top-tier leagues)
}

export interface Match {
    id: number;
    team1Id: number;
    team2Id: number;
    formatName: TournamentFormatName;
    status: 'pending' | 'completed';
    winnerId?: number | null;
    venue: string;
    groundId: number;
    tossWinnerId?: number;
    decision?: 'bat' | 'bowl';
    round?: number; // Optional: for display in schedule
    isPlayoff?: boolean; // Indicates if it's a playoff match (SF/Final)
    playoffType?: 'semi-final' | 'final'; // Specific type of playoff match
    matchDate: string; // Added field for match date
}

export interface PlayerStats extends Player {
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    status: string;
    ballsBowled: number;
    overs: number;
    maidens: number;
    runsConceded: number;
    wickets: number;
    milestones: {
        fiftyBalls?: number;
        hundredBalls?: number;
        hundredFiftyBalls?: number;
        twoHundredBalls?: number;
    };
    // Fix: Added teamName to PlayerStats as it is used in SimulationScreen
    teamName: string;
    // Fix: Added _runsThisOver to PlayerStats for temporary tracking of runs conceded in current over
    _runsThisOver: number;
}

export interface TeamResult extends Team {
    score: number;
    wickets: number;
    overs: number;
    balls: number;
    extras: number;
}

export interface FallOfWicket {
    wicket: number;
    score: number;
    overs: number;
    balls: number;
    name: string;
}

export interface MatchSummaryData {
    result: string;
    team1: TeamResult;
    team2: TeamResult;
    formatName: TournamentFormatName;
    topPerformers?: {
        team1: { bestBatsman: PlayerStats, bestBowler: PlayerStats };
        team2: { bestBatsman: PlayerStats, bestBowler: PlayerStats };
    };
    manOfTheMatch?: PlayerStats;
    fullMatchStats?: {
        [teamName: string]: PlayerStats[]
    };
    fallOfWickets: {
        team1: FallOfWicket[];
        team2: FallOfWicket[];
    };
    // Adding XI information to summary for completeness
    team1XI: Player[];
    team2XI: Player[];
}

export interface NewsArticle {
    id: number;
    headline: string;
    body: string;
    date: string;
}

export interface TeamStanding {
    teamId: number;
    teamName: string;
    played: number;
    won: number;
    lost: number;
    points: number;
    nrr?: number; // Net Run Rate for tie-breaking
}

export interface Lineup {
    xi: number[];
    openers: number[];
}

export interface CareerStatsData {
    matchesPlayed: number;
    inningsBatted: number;

    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    notOuts: number;
    highestScore: number;
    fifties: number;
    hundreds: number;
    inningsBowled: number;
    ballsBowled: number;
    runsConceded: number;
    wickets: number;
    maidens: number;
    bestBowlingInnings: { wickets: number; runs: number };
    threeWicketHauls: number;
    fiveWicketHauls: number;
}

export interface PlayerCareerSummary {
    playerData: Player;
    teamName: string;
    stats: {
        Overall: CareerStatsData;
        [formatName: string]: CareerStatsData;
    }
}

export interface RecordEntry { playerId: number; name: string; teamName: string; value: number; against: string; }
export interface TeamRecordEntry { teamName: string; score: number; wickets: number; against: string; }
export interface MilestoneRecordEntry { playerId: number; name: string; teamName: string; balls: number; score: number; against: string; }

export interface FormatRecords {
    highestInningsScore: RecordEntry;
    bestInningsBowling: { playerId: number; name: string; teamName: string; wickets: number; runs: number; against: string; };
    highestTeamTotal: TeamRecordEntry;
    lowestTeamTotal: TeamRecordEntry;
    fastestFifty: MilestoneRecordEntry;
    fastestHundred: MilestoneRecordEntry;
    fastestHundredFifty: MilestoneRecordEntry;
    fastestTwoHundred: MilestoneRecordEntry;
}

export interface Records {
    [formatName: string]: FormatRecords; // Includes "Overall"
}

export interface GameState {
    teams: Team[];
    grounds: Ground[];
    freeAgents: Player[];
    formats: FormatSettings[];
    manager?: {
        name: string;
        teamId: number;
    };
    seasonStarted: boolean;
    schedule: Match[];
    currentMatchIndex: number;
    news: NewsArticle[];
    standings: { [formatName: string]: TeamStanding[] };
    matchSummaries: { [matchId: number]: MatchSummaryData };
    lineups: {
        [teamId: number]: {
            [formatCategory: string]: Lineup
        }
    };
    careerStats: { [playerId: number]: PlayerCareerSummary };
    records: Records;
    playerDynamicStats: { [playerId: number]: PlayerDynamicStats };
}