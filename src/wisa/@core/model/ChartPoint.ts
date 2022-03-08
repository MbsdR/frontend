export interface IChartPoint {
  name: string;
  value: [string, number];
}

export class ChartPoint implements IChartPoint{
  name: string;
  value: [string, number];

  constructor(name: string, value: number ) {
    this.name = name;
    this.value = [this.name, value];
  }
}
