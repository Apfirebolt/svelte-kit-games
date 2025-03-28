interface Game {
  id: number;
  img: string;
  title: string;
  console: string;
  genre: string;
  publisher: string;
  developer: string;
  critic_score: number;
  total_sales: number;
  na_sales: number;
  jp_sales: number;
  pal_sales: number;
  other_sales: number | null;
  release_date: string;
  last_update: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export type { Game, ApiResponse };