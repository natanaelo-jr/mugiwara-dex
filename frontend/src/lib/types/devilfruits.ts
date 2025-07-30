export interface DevilFruitPage {
  count: number;
  total_pages: number;
  current_page: number;
  results: DevilFruit[];
}

export interface DevilFruit {
  id: number;
  name: string;
  type: "P" | "Z" | "L";
  description: string;
  img_url: string;
}
