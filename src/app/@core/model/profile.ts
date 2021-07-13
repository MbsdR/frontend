import {Setting} from './setting';

export interface Profile {
  user?: string;
  language?: string;
  tiles?: Array<Tile>;
}

export interface Tile {
  pos: number;
  cols: number;
  rows: number;
  text?: string;
  color?: string;
  setting?: Setting;
}


