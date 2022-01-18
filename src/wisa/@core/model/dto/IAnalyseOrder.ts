export interface IAnalyseOrder {
  vendor: string;
  start: string;
  stop: string;
  turbine: string;
}

export class AnalyseOrder implements IAnalyseOrder{
  start: string;
  stop: string;
  turbine: string;
  vendor: string;

  constructor(start: string, stop: string, turbine: string, vendor: string) {
    this.start = start;
    this.stop = stop;
    this.turbine = turbine;
    this.vendor = vendor;
  }
}
