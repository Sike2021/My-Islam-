import React from 'react';

interface EditorHubScreenProps {
    onExit: () => void;
    onGoToPlayerEditor: () => void;
    onGoToGroundEditor: () => void;
}

export const EditorHubScreen: React.FC<EditorHubScreenProps> = ({ onExit, onGoToPlayerEditor, onGoToGroundEditor }) => (
    <div className="editor-screen">
        <div className="editor-content">
            <header className="editor-screen-header">
                <h1>Game Editor Hub</h1>
                <button onClick={onExit} className="btn-exit">Return to Hub</button>
            </header>
            <div className="hub-actions-grid">
                <button className="action-btn" onClick={onGoToPlayerEditor}>🧑‍💼<br/>Player Editor</button>
                <button className="action-btn" onClick={onGoToGroundEditor}>🏟️<br/>Ground Editor</button>
            </div>
        </div>
    </div>
);