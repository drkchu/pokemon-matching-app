import React from "react";
import Card from "./Card";

const CardGrid = ({ cards, handleClick }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} handleClick={handleClick} /> // Key is just there cuz we need it for lists in react
      ))}
    </div>
  );
};

export default CardGrid;
