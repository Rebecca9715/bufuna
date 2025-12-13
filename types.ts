export interface BufunaFruit {
  id: string;
  type: string; // e.g., "耐心型布福娜"
  color: string; // Hex or tailwind class hint
  story: string;
  location: string;
  tags: string[];
  imageUrl?: string;
}

export type AppView = 'landing' | 'interacting' | 'opening' | 'result';

export interface AppState {
  view: AppView;
  selectedFruit: BufunaFruit | null;
}