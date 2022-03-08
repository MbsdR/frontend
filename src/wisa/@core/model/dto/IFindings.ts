import {IDatapoint} from './IDatapoint';

export interface IFindings extends IDatapoint{
  threshold: {'warn': number, 'alarm': number};
  indicator: boolean;
}

export class Finding implements IFindings {
  '_start': string;
  '_stop': string;
  turbine: string;
  channel: string;
  value: number;
  threshold: { warn: number; alarm: number };
  indicator: boolean;
}
