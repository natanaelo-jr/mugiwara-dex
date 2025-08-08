export interface Pirate {
  id: number;
  name: string;
  age: number;
  observation_haki: boolean;
  armament_haki: boolean;
  conqueror_haki: boolean;
  img_url: string;
  portrait_url: string;
  description?: string;
  history?: string;
  bounty: number;
  devilfruit?: number;
  crew?: number;
}

export interface PiratePage {
  count: number;
  total_pages: number;
  current_page: number;
  results: Pirate[];
}

export interface Marine {
  id: number;
  name: string;
  age: number;
  observation_haki: boolean;
  armament_haki: boolean;
  conqueror_haki: boolean;
  img_url: string | null;
  portrait_url: string | null;
  description: string | null;
  history: string | null;
  position: string;
  devilfruit?: number | null;
}

export interface MarinePage {
  conut: number;
  total_pages: number;
  current_page: number;
  results: Marine[];
}

export interface Character {
  id: number;
  name: string;
  age: number;
  observation_haki: boolean;
  armament_haki: boolean;
  conqueror_haki: boolean;
  img_url: string;
  portrait_url: string;
  type: "pirate" | "marine";
}

export interface CharacterPage {
  count: 2;
  total_pages: 1;
  current_page: 1;
  results: Character[];
}
