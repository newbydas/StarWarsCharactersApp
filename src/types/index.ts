export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  species: string[];
  homeworld: string;
  films: string[];
  url: string;
  created: string;
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}
