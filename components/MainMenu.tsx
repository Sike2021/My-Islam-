import React from 'react';

interface MainMenuProps {
    onNewCareer: () => void;
    onResume: () => void;
    onExhibition: () => void;
    onResetCareer: () => void;
    hasSaveData: boolean;
    onShowRoadmap: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNewCareer, onResume, onExhibition, onResetCareer, hasSaveData, onShowRoadmap }) => (
    <div className="main-menu-new">
        <div className="menu-content-new">
            <h1 className="game-title-new">Play It !</h1>
            <p className="game-subtitle-new">CRICKET 25 2D</p>
            <div className="menu-buttons-new">
                <button onClick={onNewCareer}>New Career</button>
                <button onClick={onResume} disabled={!hasSaveData}>Resume Career</button>
                <button onClick={onExhibition} disabled>Exhibition Match</button>
                <button onClick={onShowRoadmap}>Roadmap</button>
                <button onClick={onResetCareer} disabled={!hasSaveData} className="btn-reset">Reset Career</button>
                <button disabled>Settings</button>
                <button disabled>Quit</button>
            </div>
        </div>
    </div>
);