import {Datapoint, IDatapoint} from './IDatapoint';

export interface IFindings extends IDatapoint {
  [index: string]: number | string;
}

export class Finding implements IFindings {

  '_start': string;
  '_stop': string;
  turbine: string;
  [index: string]: number | string;
}
