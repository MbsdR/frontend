export interface IDatapoint {
  '_start': string;
  '_stop': string;
  'turbine': string;
  'channel': string;
  'value': number;
}

export class Datapoint implements Object, IDatapoint{
  '_start': string;
  '_stop': string;
  turbine: string;
  channel: string;
  value: number;

  constructor(start: string, stop: string, turbine: string) {
    this._start = start;
    this._stop = stop;
    this.turbine = turbine;
  }
}

