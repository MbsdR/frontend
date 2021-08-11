import {ITileSetting} from '../../model/Usermangemant/ITileSetting';
import {IDatapoint} from '../../model/IDatapoint';

export interface Graphic {
  setting: ITileSetting;

  updateChart(datapoint: IDatapoint, turbine: string): void;
}
