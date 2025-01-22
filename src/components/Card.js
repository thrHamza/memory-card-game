import React from "react";

const Card = ({ value, onClick, flipped }) => {
    const cardStyle = {
        backgroundColor: flipped ? "#038C8C" : "#012626",
        color: flipped ? "#FFF" : "transparent",
        cursor: flipped ? "default" : "pointer",
    };

    const imageStyle = {
        maxWidth: "95%",
        maxHeight: "95%",
    };

    return (
        <div
            className="card"
            style={cardStyle}
            onClick={!flipped ? onClick : null}>
            {flipped && <img src={value} alt="Card" style={imageStyle}/>}
        </div>
    );
};

export default Card;
