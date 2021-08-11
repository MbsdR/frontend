import {ITileSetting} from './ITileSetting';

export interface ITile {
  pos: number;
  cols: number;
  rows: number;
  title?: string;
  color?: string;
  setting?: ITileSetting;
}
