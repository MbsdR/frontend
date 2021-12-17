export interface ITileSetting {
  feature: string;
  func: string;
  frequency: { value: number, unit: string };
  type: string;
}

export class TileSetting implements ITileSetting{
  feature: string;
  frequency: { value: number; unit: string };
  func: string;
  type: string;

  constructor(feature: string, frequency: { value: number; unit: string }, func: string, type: string) {
    this.feature = feature;
    this.frequency = frequency;
    this.func = func;
    this.type = type;
  }
}
