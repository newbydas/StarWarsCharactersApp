import React, { useEffect, useState } from "react";
import { Modal, Spinner, Button, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import { Character, Homeworld } from "../types";
import { fetchSpeciesName } from "../services/apiServices";

interface ModalProps {
  character: Character | null;
  show: boolean;
  handleClose: () => void;
}

const CharacterModal: React.FC<ModalProps> = ({
  character,
  show,
  handleClose,
}) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [speciesNames, setSpeciesNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (character) {
        setLoading(true);
        setError(null);
        try {
          const homeworldResponse = await axios.get(character.homeworld);
          setHomeworld(homeworldResponse.data);
          const speciesResponses = await Promise.all(
            character.species.map((speciesUrl: string) =>
              fetchSpeciesName(speciesUrl)
            )
          );
          setSpeciesNames(speciesResponses);
        } catch (err) {
          setError("Failed to fetch details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [character]);

  if (!character) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-center">
          {character.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "150px" }}
          >
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ paddingTop: "0px" }}>
                <h5 className="text-center">Basic Details</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Height:</strong> {parseFloat(character.height) / 100}{" "}
                meters
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mass:</strong> {character.mass} kg
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Birth Year:</strong> {character.birth_year}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Added on:</strong>{" "}
                {new Date(character.created).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Number of Films:</strong> {character.films.length}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Species:</strong>{" "}
                {speciesNames.length > 0 ? speciesNames.join(", ") : "-"}
              </ListGroup.Item>
              {homeworld && (
                <>
                  <ListGroup.Item>
                    <h5 className="text-center mt-2">Homeworld Details</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Name:</strong> {homeworld.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Terrain:</strong> {homeworld.terrain}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Climate:</strong> {homeworld.climate}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Population:</strong> {homeworld.population}
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CharacterModal;
