import React, { useState } from 'react';
import { Team } from '../utils/types';

interface ChooseTeamProps {
    teams: Team[];
    onSelectTeam: (teamId: number, managerName: string) => void;
}

export const ChooseTeam: React.FC<ChooseTeamProps> = ({ teams, onSelectTeam }) => {
    const [managerName, setManagerName] = useState('Manager');

    const handleTeamClick = (teamId: number) => {
        if (managerName.trim() === '') {
            alert('Please enter a manager name.');
            return;
        }
        onSelectTeam(teamId, managerName);
    };

    return (
        <div className="choose-team-screen">
            <div className="choose-team-content">
                <h1>Choose Your Team</h1>
                <p>Enter your name and select a team to manage for the upcoming season.</p>
                <div className="manager-name-input">
                    <label htmlFor="managerName">Manager Name</label>
                    <input
                        id="managerName"
                        type="text"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="team-selection-grid">
                    {teams.map(team => (
                        <div key={team.id} className="team-selection-card" onClick={() => handleTeamClick(team.id)}>
                            <h3>{team.name}</h3>
                            {team.isDevelopmentTeam && <p>(Development Team)</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};