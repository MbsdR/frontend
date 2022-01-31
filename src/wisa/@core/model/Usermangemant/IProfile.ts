import {IAccount} from './IAccount';
import {ITile} from './ITile';

export interface IProfile {
  language?: string;
  overview?: Array<ITile>;
  homepage?: Array<ITile>;
  settings: {cms: Array<ITile>, pa: Array<ITile>, bi: Array<ITile>};
}

export class Profile implements IProfile {
  settings;

  constructor(setting) {
    this.settings = setting;
  }
}



