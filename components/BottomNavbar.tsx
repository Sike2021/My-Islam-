import React from 'react';

interface BottomNavbarProps {
    view: string;
    setView: (view: string) => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ view, setView }) => {
    return (
        <nav className="bottom-navbar">
            <button className={`nav-item ${view === 'inSeasonHub' ? 'active' : ''}`} onClick={() => setView('inSeasonHub')}>
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
            </button>
            <button className={`nav-item ${view === 'teamHub' ? 'active' : ''}`} onClick={() => setView('teamHub')}>
                 <span className="nav-icon">🛡️</span>
                <span className="nav-label">Teams</span>
            </button>
            <button className={`nav-item ${view === 'statsHub' ? 'active' : ''}`} onClick={() => setView('statsHub')}>
                 <span className="nav-icon">📈</span>
                <span className="nav-label">Stats</span>
            </button>
            <button className="nav-item" disabled>
                 <span className="nav-icon">⚙️</span>
                <span className="nav-label">Settings</span>
            </button>
        </nav>
    );
};