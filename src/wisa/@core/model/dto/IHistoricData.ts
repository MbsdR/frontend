import {ITileSetting} from '../Usermangemant/ITileSetting';

export interface IHistoricData {
  vendor: string;
  start: string;
  stop: string;
  channels: Array<string>;
  features: Array<string>;
  turbine: string;
}

export class HistoricData implements IHistoricData {

  features: Array<string>;
  stop: string;
  start: string;
  turbine: string;
  vendor: string;
  channels: Array<string>;

  constructor(vendor: string) {
    this.vendor = vendor;
    this.features = new Array<string>();
    this.channels = new Array<string>();
  }
}

