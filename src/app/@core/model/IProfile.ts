import {ISetting} from './ISetting';

export interface IProfile {
  vendor?: string;
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


export class Profile implements IProfile{
  vendor: string;
  language: string;
  tiles: Array<Tile>;

  constructor(profile: string) {
    this.vendor = profile;
  }
}



