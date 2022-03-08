import {ITileSetting} from '../../model/Usermangemant/ITileSetting';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {IFindings} from '../../model/dto/IFindings';
import {IChartPoint} from '../../model/ChartPoint';

export interface IGraphic {
  setting: ITileSetting;
  initDataset(datapoints: Array<IDatapoint>): void;
  updateChart(datapoint: IDatapoint | IFindings, turbine: string): void;
  getChartPoint(datapoint: IDatapoint): any;
}

export class Graphic implements IGraphic{
  setting: ITileSetting;

  initDataset(datapoints: Array<IDatapoint>): void {
    console.log('Init Chart');
  }
  updateChart(datapoint: IDatapoint | IFindings, turbine: string): void {
    console.log('updated');
  }
  getChartPoint(datapoint: IDatapoint): any {
    console.log('create Chartpoint');
  }
}
