import { useState, useEffect } from "react";
import axios from "axios";

export const speciesColorMap: { [key: string]: string } = {
  Human: "#f8c291",
  Droid: "#f6e58d",
  Wookiee: "#c44569",
  Rodian: "#6ab04c",
  Hutt: "#dff9fb",
  Twilek: "#e77f7f",
  Nautolan: "#a29bfe",
  Zabrak: "#ff7979",
  "Mon Calamari": "#74b9ff",
  Bothan: "#55efc4",
  "Chadra-Fan": "#ff6b6b",
  Togruta: "#d63031",
  Ithorian: "#ffeaa7",
  Sullustan: "#e17055",
  Quarren: "#dfe6e9",
  Muun: "#f9ca24",
  "Kel Dor": "#fd79a8",
  Cerean: "#636e72",
  Geonosian: "#dcdde1",
  Devaronian: "#e84393",
  Shistavanen: "#00b894",
  Hylian: "#1e272e",
};

export const fetchSpeciesName = async (speciesUrl: string): Promise<string> => {
  try {
    const response = await axios.get(speciesUrl);
    return response.data.name;
  } catch (err) {
    console.error("Failed to fetch species name", err);
    return "Unknown";
  }
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const assignColorToSpecies = (speciesName: string): string => {
  if (!speciesColorMap[speciesName]) {
    speciesColorMap[speciesName] = getRandomColor();
  }
  return speciesColorMap[speciesName];
};

export const useFetch = (url: string, page: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${url}?page=${page}`);
        setData(response.data.results);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page]);

  useEffect(() => {
    const fetchSpeciesColors = async () => {
      const speciesNames = await fetchAllSpecies();
      speciesNames.forEach((name: string) => {
        assignColorToSpecies(name);
      });
      console.log("Updated speciesColorMap:", speciesColorMap);
    };

    fetchSpeciesColors();
  }, []);

  return { data, loading, error, speciesColorMap };
};

const fetchAllSpecies = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/species/");
    const speciesData = response.data.results;
    throw Error;
    return speciesData.map((species: { name: string }) => species.name);
  } catch (err) {
    console.error("Failed to fetch species data", err);
    return [];
  }
};
