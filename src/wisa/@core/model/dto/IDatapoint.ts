export interface IDatapoint {
  '_start': string;
  '_stop': string;
  'turbine': string;
}

export class Datapoint implements Object, IDatapoint{
  '_start': string;
  '_stop': string;
  turbine: string;
  [index: string]: number | string;

  constructor(start: string, stop: string, turbine: string) {
    this._start = start;
    this._stop = stop;
    this.turbine = turbine;
  }
}

