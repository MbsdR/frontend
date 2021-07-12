export interface Profile {
  user: string;
  language: string;
  tiles?: Array<Tile>;
}

export interface Tile {
  pos: number;
  cols: number;
  rows: number;
  setting?: Setting;
}

export interface Setting {
  channel: string;
  frequence: { value: number, unit: string };
  type: string;
}
