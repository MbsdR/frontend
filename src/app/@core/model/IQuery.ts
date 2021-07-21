export interface IQuery {
  vendor: string;
  start: string;
  end: string;
  channels: Array<string>;
  turbines: Array<string>;
  freq?: string;
  func?: string;
}

export class Query implements IQuery {
  channels: Array<string> = new Array();
  end: string;
  freq: string;
  func: string;
  start: string;
  turbines: Array<string> = new Array();
  vendor: string;
}

