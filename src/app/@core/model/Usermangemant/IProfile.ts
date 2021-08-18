import {IAccount} from './IAccount';
import {ITile} from './ITile';

export interface IProfile {
  account?: IAccount;
  language?: string;
  overview?: Array<ITile>;
  homepage?: Array<ITile>;
  condition?: Array<ITile>;
  analytics?: Array<ITile>;
}

export class Profile implements IProfile {

  constructor() {
  }

}



