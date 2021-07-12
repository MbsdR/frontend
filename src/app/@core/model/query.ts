export interface Query {
  vendor: string;
  start: string;
  end: string;
  channels: string[];
  turbines: string[];
  freq?: string;
  func?: string;
}
