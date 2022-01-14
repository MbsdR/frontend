import {ITileSetting} from '../model/Usermangemant/ITileSetting';
import {IDatapoint} from '../model/dto/IDatapoint';
import {IFindings} from '../model/dto/IFindings';

export interface Graphic {
  setting: ITileSetting;

	updateChart(datapoint: IDatapoint | IFindings, turbine: string): void;
}
