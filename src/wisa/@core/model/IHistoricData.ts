import {ITileSetting} from './Usermangemant/ITileSetting';

export interface IHistoricData {
  vendor: string;
  start: string;
  stop: string;
  feature: Array<string>;
  turbine: string;
}

export class HistoricData implements IHistoricData {
  constructor(vendor: string) {
    this.vendor = vendor;
  }

  feature: Array<string> = new Array();
  stop: string;
  start: string;
  turbine: string;
  vendor: string;
}

