import {IDatapoint} from './IDatapoint';

export interface IFindings extends IDatapoint{
  threshold: {'warn': number, 'alarm': number};
}

export class Finding implements IFindings {
  '_start': string;
  '_stop': string;
  turbine: string;
  threshold: { warn: number; alarm: number };
  [index: string]: number | string | {} ;
}
