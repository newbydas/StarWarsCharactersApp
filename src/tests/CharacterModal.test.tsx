import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterModal from '../components/CharacterModal';
import { Character, Homeworld } from '../types';
import { fetchSpeciesName } from '../services/apiServices';

jest.mock('../services/apiServices', () => ({
  fetchSpeciesName: jest.fn(),
}));

const mockCharacter: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: ['https://swapi.dev/api/species/1/'],
  created: '2014-12-09T13:50:51.644000Z',
  url: 'https://swapi.dev/api/people/1/',
};

const mockHomeworld: Homeworld = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  population: '200000',
};

const mockSpeciesNames = ['Human'];

const mockOnClose = jest.fn();

describe('CharacterModal', () => {
  beforeEach(() => {
    (fetchSpeciesName as jest.Mock).mockResolvedValue(mockSpeciesNames[0]);
  });

  test('renders character details correctly', async () => {
    render(
      <CharacterModal
        character={mockCharacter}
        show={true}
        handleClose={mockOnClose}
      />
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 1.72 meters/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of Films: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Added on: 12\/09\/2014/i)).toBeInTheDocument();
  });

  test('displays loading spinner while fetching data', () => {
    render(
      <CharacterModal
        character={mockCharacter}
        show={true}
        handleClose={mockOnClose}
      />
    );
    
    (fetchSpeciesName as jest.Mock).mockImplementation(() => new Promise(() => {}));

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays error message when data fetch fails', async () => {
    (fetchSpeciesName as jest.Mock).mockRejectedValue(new Error('Failed to fetch species'));

    render(
      <CharacterModal
        character={mockCharacter}
        show={true}
        handleClose={mockOnClose}
      />
    );

    expect(await screen.findByText(/Failed to fetch details./i)).toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', () => {
    render(
      <CharacterModal
        character={mockCharacter}
        show={true}
        handleClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText(/Close/i));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
