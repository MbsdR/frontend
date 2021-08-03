import {ISetting} from './ISetting';

export interface IProfile {
  user?: string;
  language?: string;
  dashboard?: Array<Tile>;
  condition?: Array<Tile>;
}

export interface Tile {
  pos: number;
  cols: number;
  rows: number;
  title?: string;
  color?: string;
  setting?: ISetting;
}


