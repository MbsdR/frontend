import {ITileSetting} from './ITileSetting';

export interface ITile {
  pos: number;
  cols: number;
  rows: number;
  title?: string;
  color?: string;
  setting?: ITileSetting;
}

export class Tile implements ITile{
  color: string;
  cols: number;
  pos: number;
  rows: number;
  setting: ITileSetting;
  title: string;

  constructor() {
    return this;
  }
}
