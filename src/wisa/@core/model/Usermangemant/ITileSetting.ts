export interface ITileSetting {
  feature: string;
  func: string;
  frequency: { value: number, unit: string };
  type: string;
  threshold?: {warn: number, alarm: number};
  graphicSetting: {showSymbol: boolean};
}

export class TileSetting implements ITileSetting{
  feature: string;
  frequency: { value: number; unit: string };
  func: string;
  type: string;

  graphicSetting: { showSymbol: boolean };
  threshold?: {warn: number, alarm: number};
  constructor(feature: string, frequency: { value: number; unit: string }, func: string, type: string, graphicSetting) {
    this.feature = feature;
    this.frequency = frequency;
    this.func = func;
    this.type = type;
    this.graphicSetting = graphicSetting;
  }


}
