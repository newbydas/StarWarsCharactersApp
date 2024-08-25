import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { Character } from "../types";
import { speciesColorMap, assignColorToSpecies } from "../services/apiServices";

interface CardProps {
  character: Character;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ character, onClick }) => {
  const defaultColor = "#ffffff";
  const speciesColor =
    character.species.length > 0
      ? assignColorToSpecies(character.species[0])
      : defaultColor;

  console.log("Species:", character.species[0], "Color:", speciesColor);

  return (
    <BootstrapCard
      className="mb-3"
      onClick={onClick}
      style={{
        backgroundColor: speciesColor,
        marginLeft: "0px",
        marginRight: "0px",
      }}
    >
      <BootstrapCard.Img
        variant="top"
        src={`https://picsum.photos/200/300?random=${character.name}`}
        className="card-img"
      />
      <BootstrapCard.Body>
        <BootstrapCard.Title className="card-title">
          {character.name}
        </BootstrapCard.Title>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
