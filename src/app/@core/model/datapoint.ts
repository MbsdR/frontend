export interface Datapoint {
  '_start': string;
  '_stop': string;
  [index: string]: number | string;
}
