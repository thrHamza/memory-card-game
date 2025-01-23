import React, {useEffect, useState} from "react";

const History = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = (JSON.parse(localStorage.getItem("gameHistory")) || [])
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 10);
        setHistory(storedHistory);
    }, []);


    const clearHistory = () => {
        localStorage.removeItem("gameHistory");
        setHistory([]);
    };

    return (
        <div className="history">
            <h2>History of the games</h2>
            {history.length === 0 ? (
                <p>No history available.</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <strong>Game mode :</strong> {entry.gameMode} <br/>
                            <strong>Date :</strong> {entry.date} <br/>
                            <strong>Moves :</strong> {entry.moves} <br/>
                            <strong>Time :</strong> {entry.time} seconds
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={clearHistory} className="btn-clearHistory">
                Clear History
            </button>
        </div>
    );
};

export default History;