import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Card from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import { useFetch } from "./services/apiServices";
import { Character } from "./types";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const {
    data: characters,
    loading,
    error,
  } = useFetch("https://swapi.dev/api/people/", page);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [modalShow, setModalShow] = useState<boolean>(false);

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character);
    setModalShow(true);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Star Wars Characters</h2>
      {loading && (
        <div className="loader-wrapper">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {characters.map((character: Character) => (
          <Col
            key={character.name}
            xs={12}
            md={3}
            lg={2}
            className="d-flex align-items-stretch"
          >
            <Card
              character={character}
              onClick={() => handleCardClick(character)}
            />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
        <ButtonGroup className="mt-3">
          <Button
            variant="primary"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </Button>
          <span style={{ padding: "10px" }}>{page}</span>
          <Button variant="primary" onClick={handleNextPage}>
            Next
          </Button>
        </ButtonGroup>
      </div>
      <CharacterModal
        character={selectedCharacter}
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
    </Container>
  );
};

export default App;
