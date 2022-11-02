import React from "react";

import "./CryptoCard.css";

const CryptoCard = ({ image, name, price }) => {
  return (
    <div className="card">
      <div className="card_image" style={{ float: "left" }}>
        <img src={image} alt={name} />
      </div>
      <div className="card_image" style={{ float: "left" }}>
        <img src={image} alt={name} />
      </div>
      <div className="card_image" style={{ float: "left" }}>
        <img src={image} alt={name} />
      </div>
      <div className="card_info" style={{ clear: "both" }}>
        <h2>{name}</h2>
        <h3>${price.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default CryptoCard;
