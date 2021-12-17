import {ITileSetting} from './Usermangemant/ITileSetting';

export interface IHistoricData {
  vendor: string;
  start: string;
  end: string;
  feature: Array<ITileSetting>;
  turbine: string;
}

export class HistoricData implements IHistoricData {
  constructor(vendor: string) {
    this.vendor = vendor;
  }

  feature: Array<ITileSetting> = new Array();
  end: string;
  start: string;
  turbine: string;
  vendor: string;
}

