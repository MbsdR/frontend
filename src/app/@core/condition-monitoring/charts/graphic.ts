import {ISetting} from '../../model/ISetting';
import {IDatapoint} from '../../model/IDatapoint';

export interface Graphic {
  setting: ISetting;

  updateChart(datapoint: IDatapoint, turbine: string): void;
}
