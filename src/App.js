import React, { useState, useEffect } from "react";
import "./assets/custom.css";
import Card from "./components/Card";

function App() {
    const [gameMode, setGameMode] = useState(4); // 4|16|32
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [background, setBackground] = useState("#CEE8F2");
    const [isGameCompleted, setIsGameCompleted] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);


    const generateCards = (mode) => {
        const totalCards = mode;
        const numberOfImages = totalCards / 2;

        const imagePool = [
            '/images/img_1.svg', '/images/img_2.svg', '/images/img_3.svg',
            '/images/img_4.svg', '/images/img_5.svg', '/images/img_6.svg',
            '/images/img_7.svg', '/images/img_8.svg', '/images/img_9.svg',
            '/images/img_10.svg', '/images/img_11.svg', '/images/img_12.svg',
            '/images/img_13.svg', '/images/img_14.svg', '/images/img_15.svg',
            '/images/img_16.svg'
        ];

        // Randomly select 'numberOfImages' images from the image pool
        const selectedImages = [];
        while (selectedImages.length < numberOfImages) {
            const randomIndex = Math.floor(Math.random() * imagePool.length);
            const selectedImage = imagePool[randomIndex];

            // Avoid duplicate images in the selection
            if (!selectedImages.includes(selectedImage)) {
                selectedImages.push(selectedImage);
            }
        }

        const shuffledCards = [...selectedImages, ...selectedImages]
            .map((value, index) => ({
                id: index,
                value,
                flipped: false,
            }))
            .sort(() => Math.random() - 0.5);

        return shuffledCards;
    };

    const handleCardClick = (id) => {
        if (!gameStarted) {
            alert("Please click « Start » first to begin !");
            return;
        }

        const clickedCard = cards.find((card) => card.id === id);

        if (clickedCard.flipped || selectedCards.length === 2) return;

        setCards((prev) =>
            prev.map((card) => (card.id === id ? { ...card, flipped: true } : card))
        );

        setSelectedCards([...selectedCards, clickedCard]);

        if (selectedCards.length === 1) {
            const firstCard = selectedCards[0];
            const secondCard = clickedCard;

            if (firstCard.value === secondCard.value) {
                setSelectedCards([]);
            } else {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((card) =>
                            card.id === firstCard.id || card.id === secondCard.id
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                    setSelectedCards([]);
                }, 1000);
            }
        }

        setMoves((prev) => prev + 1);
    };


    const startNewGame = () => {
        if (timer) {
            clearInterval(timer);
        }

        setCards(generateCards(gameMode));
        setMoves(0);
        setTime(0);
        setIsGameCompleted(false);
        setGameStarted(true);

        const newTimer = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        setTimer(newTimer);
    };

    const calculateGridColumns = () => {
        if (gameMode === 4) return 2;
        if (gameMode === 16) return 4;
        if (gameMode === 32) return 8;
    };

    // Game Over
    useEffect(() => {
        if (cards.length > 0 && cards.every((card) => card.flipped) && !isGameCompleted) {
            clearInterval(timer);
            setTimer(null);
            setIsGameCompleted(true);

            alert(`You won with ${moves} moves under ${time} seconds !`);
        }
    }, [cards, timer, moves, time, isGameCompleted]);

    return (
        <div
            className="game"
            style={{ backgroundColor: background }}
        >
            {/* Header Section */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <button
                    onClick={startNewGame}
                    className="button-32"
                >
                    Start
                </button>
                <p>
                    Moves: {moves} | Time: {time} sec
                </p>
            </div>

            {/* Game Section */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${calculateGridColumns()}, 1fr)`,
                        gap: "10px",
                        marginBottom: "20px",
                    }}
                >
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            value={card.value}
                            flipped={card.flipped}
                            onClick={() => handleCardClick(card.id)}
                        />
                    ))}
                </div>

        </div>
    );
}

export default App;
