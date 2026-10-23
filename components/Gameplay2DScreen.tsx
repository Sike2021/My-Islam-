
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Player, PlayerStats, Team, FormatSettings, Lineup, Ground, FallOfWicket, MatchSummaryData, GameState, TeamResult } from '../utils/types';
import { initialPlayerStats, getMaxOversPerBowler } from '../utils/matchSimulation';
import { FIELDING_POSITIONS } from '../utils/constants';
import { MatchSummaryScreen } from './MatchSummaryScreen';

interface Gameplay2DScreenProps {
    team1: Team;
    team2: Team;
    format: FormatSettings;
    managerTeamId: number;
    onExit: (summary: MatchSummaryData) => void;
    team1XI: Player[];
    team2XI: Player[];
    battingTeamId: number;
    lineups: GameState['lineups'];
    ground: Ground;
}

interface FielderData {
    x: number;
    y: number;
    curX: number;
    curY: number;
    id: number;
}

export const Gameplay2DScreen: React.FC<Gameplay2DScreenProps> = ({ team1, team2, format, managerTeamId, onExit, team1XI, team2XI, battingTeamId, lineups, ground }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [commentary, setCommentary] = useState(["MATCH STARTS!"]);
    const [recentBalls, setRecentBalls] = useState<string[]>([]);
    const [battingTeam, setBattingTeam] = useState(battingTeamId === team1.id ? { ...team1, masterSquad: team1XI } : { ...team2, masterSquad: team2XI });
    const [bowlingTeam, setBowlingTeam] = useState(battingTeamId === team1.id ? { ...team2, masterSquad: team2XI } : { ...team1, masterSquad: team1XI });
    
    const [strikerId, setStrikerId] = useState<number | null>(null);
    const [nonStrikerId, setNonStrikerId] = useState<number | null>(null);
    const [bowlerId, setBowlerId] = useState<number | null>(null);
    const [lastOverBowlerId, setLastOverBowlerId] = useState<number|null>(null);

    const [innings, setInnings] = useState(1);
    const [targetScore, setTargetScore] = useState<number | null>(null);
    const [isMatchOver, setIsMatchOver] = useState(false);
    const [matchSummary, setMatchSummary] = useState<MatchSummaryData | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    
    const [battingAggression, setBattingAggression] = useState<'Defensive' | 'Balanced' | 'Attacking'>('Balanced');
    const [bowlingAggression, setBowlingAggression] = useState<'Defensive' | 'Balanced' | 'Attacking'>('Balanced');
    
    const [matchStats, setMatchStats] = useState(() => ({
        [team1.name]: team1XI.map(p => initialPlayerStats(p, team1.name)),
        [team2.name]: team2XI.map(p => initialPlayerStats(p, team2.name))
    }));

    const striker = useMemo(() => matchStats[battingTeam.name].find(p => p.id === strikerId), [strikerId, matchStats, battingTeam.name]);
    const nonStriker = useMemo(() => matchStats[battingTeam.name].find(p => p.id === nonStrikerId), [nonStrikerId, matchStats, battingTeam.name]);
    const bowler = useMemo(() => matchStats[bowlingTeam.name].find(p => p.id === bowlerId), [bowlerId, matchStats, bowlingTeam.name]);
    
    const totalOvers = format.overs;
    const maxOversPerBowler = getMaxOversPerBowler(totalOvers);
    
    const gameLoopState = useRef({
      ball: { x: 400, y: 300, vx: 0, vy: 0, visible: false },
      fielders: [] as FielderData[],
      chasingFielderId: -1,
      gameState: 'pre-delivery' as 'pre-delivery' | 'bowling' | 'fielding' | 'resetting',
    }).current;

    const getEligibleBowler = useCallback((lastId: number | null) => {
        const stats = matchStats[bowlingTeam.name];
        return stats.filter(p => p.bowlingType !== 'None' && p.overs < maxOversPerBowler && p.id !== lastId)
                    .sort((a,b) => b.skill - a.skill)[0] || null;
    }, [matchStats, bowlingTeam.name, maxOversPerBowler]);

    useEffect(() => {
        const stats = matchStats[battingTeam.name];
        const openers = stats.filter(p => p.isOpener).slice(0, 2);
        setStrikerId(openers[0]?.id || stats[0]?.id);
        setNonStrikerId(openers[1]?.id || stats[1]?.id);
        const firstB = getEligibleBowler(null);
        setBowlerId(firstB?.id || null);
    }, []);

    useEffect(() => {
        let basePos = bowlingAggression === 'Attacking' ? FIELDING_POSITIONS.P1 : bowlingAggression === 'Defensive' ? FIELDING_POSITIONS.P3 : FIELDING_POSITIONS.P2;
        gameLoopState.fielders = basePos.map((p, i) => ({ ...p, id: i, curX: p.x, curY: p.y }));
    }, [bowlingAggression]);

    const handleInningsEnd = useCallback((finalStats: any, finalScore: number, finalWickets: number) => {
        if (innings === 1) {
            setTargetScore(finalScore + 1);
            setInnings(2);
            setBattingTeam(bowlingTeam);
            setBowlingTeam(battingTeam);
            setScore(0); setWickets(0); setOvers(0); setBalls(0); setRecentBalls([]);
            setLastOverBowlerId(null);
            const nextBatters = finalStats[bowlingTeam.name].filter((p:any) => p.status === 'not out').slice(0, 2);
            setStrikerId(nextBatters[0]?.id); setNonStrikerId(nextBatters[1]?.id);
            const nextBowler = getEligibleBowler(null); setBowlerId(nextBowler?.id);
            setCommentary(prev => [`TARGET: ${finalScore + 1}`, ...prev]);
            gameLoopState.gameState = 'pre-delivery';
        } else {
            const res = finalScore >= targetScore! ? `${battingTeam.name} won` : `${bowlingTeam.name} won`;
            setIsMatchOver(true);
            setMatchSummary({
                result: res,
                team1: { ...team1, score: innings === 1 ? finalScore : (targetScore! - 1), wickets: innings === 1 ? finalWickets : 10 } as any,
                team2: { ...team2, score: innings === 2 ? finalScore : (targetScore! - 1), wickets: innings === 2 ? finalWickets : 10 } as any,
                formatName: format.name,
                fullMatchStats: matchStats,
                fallOfWickets: { team1: [], team2: [] },
                team1XI, team2XI
            });
        }
    }, [innings, targetScore, battingTeam, bowlingTeam, format, team1, team2, team1XI, team2XI, matchStats, getEligibleBowler]);

    const endOfBall = useCallback((runs: number, label: string) => {
        if (isMatchOver) return;
        const newScore = score + runs;
        setScore(newScore);
        setRecentBalls(prev => [...prev.slice(-5), label]);
        
        setMatchStats(prev => {
            const s = prev[battingTeam.name].find(p => p.id === strikerId)!;
            const b = prev[bowlingTeam.name].find(p => p.id === bowlerId)!;
            s.runs += runs; s.balls++;
            b.runsConceded += runs; b.ballsBowled++; b._runsThisOver += runs;
            return { ...prev };
        });

        if (runs % 2 === 1) { const temp = strikerId; setStrikerId(nonStrikerId); setNonStrikerId(temp); }

        if (innings === 2 && newScore >= targetScore!) {
            handleInningsEnd(matchStats, newScore, wickets);
        } else {
            gameLoopState.gameState = 'resetting';
            setTimeout(resetForNextBall, 1000);
        }
    }, [score, strikerId, nonStrikerId, bowlerId, battingTeam.name, bowlingTeam.name, innings, targetScore, handleInningsEnd, matchStats, wickets, isMatchOver]);

    const resetForNextBall = useCallback(() => {
        if (isMatchOver) return;
        let nb = balls + 1;
        let no = overs;
        if (nb >= 6) {
            nb = 0; no++;
            setLastOverBowlerId(bowlerId);
            const nextB = getEligibleBowler(bowlerId);
            setBowlerId(nextB?.id || null);
            const temp = strikerId; setStrikerId(nonStrikerId); setNonStrikerId(temp);
            setRecentBalls([]);
        }
        setBalls(nb); setOvers(no);
        if (no >= totalOvers) { handleInningsEnd(matchStats, score, wickets); return; }
        gameLoopState.gameState = 'pre-delivery';
        setIsSimulating(false);
    }, [balls, overs, totalOvers, bowlerId, getEligibleBowler, handleInningsEnd, matchStats, score, wickets, isMatchOver, strikerId, nonStrikerId]);

    const processBall = useCallback(() => {
        if (isMatchOver || isSimulating || gameLoopState.gameState !== 'bowling') return;

        let wWeight = 0.04; let bWeight = 0.12;
        if (battingAggression === 'Attacking') { bWeight += 0.08; wWeight += 0.02; }
        if (battingAggression === 'Defensive') { bWeight -= 0.06; wWeight -= 0.01; }
        if (bowlingAggression === 'Attacking') { wWeight += 0.03; bWeight += 0.04; }
        if (bowlingAggression === 'Defensive') { wWeight -= 0.02; bWeight -= 0.04; }

        const roll = Math.random();
        if (roll < wWeight) {
            const nextWickets = wickets + 1;
            setWickets(nextWickets);
            setMatchStats(prev => {
                prev[battingTeam.name].find(p => p.id === strikerId)!.status = 'out';
                prev[bowlingTeam.name].find(p => p.id === bowlerId)!.wickets++;
                return { ...prev };
            });
            const next = matchStats[battingTeam.name].find(p => p.status === 'not out' && p.id !== strikerId && p.id !== nonStrikerId);
            if (!next || nextWickets >= 10) handleInningsEnd(matchStats, score, nextWickets);
            else { setStrikerId(next.id); endOfBall(0, 'W'); }
        } else {
            const r = roll < 0.4 ? 0 : roll < 0.8 ? 1 : 4;
            gameLoopState.gameState = 'fielding';
            gameLoopState.ball.visible = true;
            const angle = (Math.random() * Math.PI * 2);
            gameLoopState.ball.vx = Math.cos(angle) * (r === 0 ? 3 : 6);
            gameLoopState.ball.vy = Math.sin(angle) * (r === 0 ? 3 : 6);
            let minDist = 9999;
            gameLoopState.fielders.forEach(f => {
                const d = Math.hypot(f.curX - 400, f.curY - 300);
                if (d < minDist) { minDist = d; gameLoopState.chasingFielderId = f.id; }
            });
            setTimeout(() => endOfBall(r, r.toString()), 1500);
        }
    }, [isMatchOver, isSimulating, gameLoopState, battingAggression, bowlingAggression, battingTeam.name, bowlingTeam.name, strikerId, bowlerId, wickets, score, handleInningsEnd, matchStats, endOfBall, nonStrikerId]);

    const startDelivery = () => {
        if (isSimulating || isMatchOver) return;
        setIsSimulating(true);
        gameLoopState.gameState = 'bowling';
        gameLoopState.ball = { x: 400, y: 250, vx: 0, vy: 5, visible: true };
    };

    const simulateOver = () => {
        if (isSimulating || isMatchOver) return;
        const ballsRemaining = 6 - balls;
        for(let i=0; i<ballsRemaining; i++) startDelivery();
    };

    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        let rafId: number;
        const render = () => {
            ctx.clearRect(0,0,800,600);
            ctx.fillStyle = '#223311'; ctx.fillRect(0,0,800,600);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(400,300,280,0,Math.PI*2); ctx.stroke();
            ctx.fillStyle = '#cdaa7d'; ctx.fillRect(385,240,30,120);

            if (gameLoopState.gameState === 'bowling') {
                gameLoopState.ball.y += gameLoopState.ball.vy;
                if (gameLoopState.ball.y > 340) processBall();
            } else if (gameLoopState.gameState === 'fielding') {
                gameLoopState.ball.x += gameLoopState.ball.vx;
                gameLoopState.ball.y += gameLoopState.ball.vy;
                const f = gameLoopState.fielders[gameLoopState.chasingFielderId];
                if (f) { f.curX += (gameLoopState.ball.x - f.curX) * 0.1; f.curY += (gameLoopState.ball.y - f.curY) * 0.1; }
            } else {
                gameLoopState.fielders.forEach(f => { f.curX += (f.x - f.curX) * 0.1; f.curY += (f.y - f.curY) * 0.1; });
            }

            ctx.fillStyle = 'white';
            gameLoopState.fielders.forEach(f => { ctx.beginPath(); ctx.arc(f.curX, f.curY, 6, 0, Math.PI*2); ctx.fill(); });
            // Fix: Replaced invalid CSS variable syntax with hex color string for canvas context
            ctx.fillStyle = '#ff4081'; ctx.beginPath(); ctx.arc(400, 345, 8, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(400, 255, 8, 0, Math.PI*2); ctx.fill();

            if (gameLoopState.ball.visible) {
                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(gameLoopState.ball.x, gameLoopState.ball.y, 4, 0, Math.PI*2); ctx.fill();
            }
            rafId = requestAnimationFrame(render);
        };
        rafId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(rafId);
    }, [processBall, gameLoopState]);

    return (
        <div className="gameplay-screen">
            <div className="canvas-container">
                <canvas ref={canvasRef} width="800" height="600" className="game-canvas" />
                
                <div className="floating-controls">
                    <div className="aggression-block">
                        <span>BAT</span>
                        <div className="aggression-controls">
                            {['Defensive','Balanced','Attacking'].map(a => (
                                <button key={a} className={battingAggression === a ? 'active' : ''} onClick={() => setBattingAggression(a as any)}>{a[0]}</button>
                            ))}
                        </div>
                    </div>
                    <div className="aggression-block">
                        <span>BOWL</span>
                        <div className="aggression-controls">
                            {['Defensive','Balanced','Attacking'].map(a => (
                                <button key={a} className={bowlingAggression === a ? 'active' : ''} onClick={() => setBowlingAggression(a as any)}>{a[0]}</button>
                            ))}
                        </div>
                    </div>
                    <button className="control-btn" onClick={startDelivery} disabled={isSimulating || isMatchOver}>Play Ball</button>
                    <button className="control-btn" onClick={simulateOver} disabled={isSimulating || isMatchOver}>Sim Over</button>
                    <button className="control-btn" style={{borderColor: 'var(--accent-pink)'}} onClick={onExit}>Exit</button>
                </div>

                <div className="broadcast-hud-bar">
                    <div className="hud-score-box">
                        <div className="hud-score-main">{score}-{wickets}</div>
                        <div className="hud-overs">OVERS {overs}.{balls}</div>
                    </div>
                    
                    <div className="hud-batters">
                        <div className="batter-stat-live">
                            <span className="batter-name">{striker?.name} <span className="batter-active-dot">•</span></span>
                            <span className="batter-runs">{striker?.runs} <span>({striker?.balls})</span></span>
                        </div>
                        <div className="batter-stat-live" style={{opacity: 0.7}}>
                            <span className="batter-name">{nonStriker?.name}</span>
                            <span className="batter-runs">{nonStriker?.runs} <span>({nonStriker?.balls})</span></span>
                        </div>
                    </div>

                    <div className="hud-bowler">
                        <span className="bowler-name">{bowler?.name}</span>
                        <span className="bowler-figs">{bowler?.wickets}-{bowler?.runsConceded} ({bowler?.overs}.{bowler?.ballsBowled % 6})</span>
                    </div>

                    <div className="hud-over-meter">
                        {[...Array(6)].map((_, i) => {
                            const val = recentBalls[i];
                            return (
                                <div key={i} className={`ball-dot ${val === 'W' ? 'wicket' : val === '4' || val === '6' ? 'boundary' : ''}`}>
                                    {val || ''}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {isMatchOver && matchSummary && <MatchSummaryScreen summary={matchSummary} onExit={() => onExit(matchSummary)} />}
        </div>
    );
};
