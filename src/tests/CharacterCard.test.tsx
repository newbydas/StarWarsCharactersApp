import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/CharacterCard';
import { Character } from '../types';

const mockCharacter: Character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  birth_year: "19BBY",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/"],
  species: ["https://swapi.dev/api/species/1/"],
  created: "2014-12-09T13:50:51.644000Z",
  url: "https://swapi.dev/api/people/1/"
};

test('renders CharacterCard with character name', () => {
  render(<Card character={mockCharacter} onClick={() => {}} />);
  const characterName = screen.getByText(/Luke Skywalker/i);
  expect(characterName).toBeInTheDocument();
});
