import React from 'react';

interface RoadmapScreenProps {
    onExit: () => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({ onExit }) => (
    <div className="modal-backdrop">
        <div className="roadmap-screen">
             <header className="roadmap-header">
                <h2>Development Roadmap</h2>
                <button onClick={onExit} className="btn-exit">Close</button>
            </header>
            <div className="roadmap-content">
                <div className="roadmap-update">
                    <h3>Patch v5.0 — Full League Structure, Cups, Promotion & Relegation</h3>
                    <blockquote>
                        "This major update brings a completely revamped league structure, introducing dedicated Top 6 Leagues, Development Cups, and Rise Cups across all three formats. The game now features a dynamic promotion and relegation system, creating a more challenging and realistic career experience."
                    </blockquote>
                    <h4>Key Features & Fixes:</h4>
                    <ul>
                        <li><strong>New Tournament Structure:</strong></li>
                        <ul>
                            <li><strong>Top 6 Leagues:</strong> T20 Championship, One-Day Trophy, First-Class Tournament with double round-robin, Semi-finals, and a Grand Final.</li>
                            <li><strong>Development Cups:</strong> T20, One-Day, First-Class cups for development teams with double round-robin and a Final.</li>
                            <li><strong>Rise Cups:</strong> A second tier of T20, One-Day, First-Class cups for development teams, also with double round-robin and a Final.</li>
                        </ul>
                        <li><strong>Promotion & Relegation System:</strong></li>
                        <ul>
                            <li>At the end of each season, 3 development teams (one for each format: T20, ODI, Test) are promoted to the Top 6 Leagues.</li>
                            <li>Promotion is determined by combining points from both the Development Cup and Rise Cup for that specific format.</li>
                            <li>The bottom 3 teams from the Top 6 Leagues (one per format) are relegated to the Development/Rise Cup system.</li>
                        </ul>
                        <li><strong>Team Roster & Roles Refinement:</strong> Adjusted player assignments and roles for development teams to fit new tournament structures.</li>
                        <li><strong>Fixed: AI vs AI Scorecard Sync:</strong> AI-controlled matches now correctly update all player and team stats upon completion (Carried over from v4.7).</li>
                    </ul>
                </div>
                <div className="roadmap-update">
                    <h3>Patch v4.7 — League Evolution & AI Data Sync (Previous)</h3>
                    <blockquote>
                        "This update focused on creating a more dynamic and interconnected league system, fixed critical data sync issues with AI matches, and introduced features that make the world feel more alive, like playable development teams."
                    </blockquote>
                    <h4>Key Features & Fixes:</h4>
                    <ul>
                        <li><strong>Fixed: AI vs AI Scorecard Sync:</strong> AI-controlled matches now correctly update all player and team stats upon completion.</li>
                        <li><strong>Playable Development Teams:</strong> You can now select and manage Development Teams in any game mode.</li>
                        <li><strong>Editable Team Names:</strong> Development team names have been updated for more immersion.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);