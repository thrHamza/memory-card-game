import React from "react";

const Settings = ({ gameMode, setGameMode, background, setBackground }) => {

    const handleGameModeChange = (e) => {
        setGameMode(Number(e.target.value));
    };
    const handleBackgroundChange = (e) => {
        setBackground(e.target.value);
    };

    return (
        <div className="settings">
            <h2>Settings</h2>

            <div style={{ marginBottom: "20px" }}>
                <label>Game mode :</label>
                <select value={gameMode} onChange={handleGameModeChange}>
                    <option value={4}>4 cards</option>
                    <option value={16}>16 cards</option>
                    <option value={32}>32 cards</option>
                </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Background :</label>
                <input type="color" value={background} onChange={handleBackgroundChange} />
            </div>
        </div>
    );
};

export default Settings;