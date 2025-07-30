export interface CrewPage {
  count: number;
  total_pages: number;
  current_page: number;
  results: Crew[];
}
export interface Crew {
  id: number;
  name: string;
  ship: string;
  img_url: string;
  captain: number;
}
