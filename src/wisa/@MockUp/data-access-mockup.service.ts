import {Injectable} from '@angular/core';
import {HistoricData, IHistoricData} from '../@core/model/dto/IHistoricData';
import {ITileSetting} from '../@core/model/Usermangemant/ITileSetting';
import {ProfileMockUpService} from './profile-mock-up.service';
import {IScada} from '../@core/model/dto/IScada';

@Injectable({
  providedIn: 'root'
})
export class DataAccessMockupService {
  query: IHistoricData;

  datapoints: Array<IScada> = [
    {
      _start: '2017-01-01 00:00:00+00:00',
      _stop: '2017-01-01 00:01:00+00:00',
      turbine: 'A01',
      WindSpeed: '100'
    },
    {
      _start: '2017-01-01 00:01:00+00:00',
      _stop: '2017-01-01 00:02:00+00:00',
      turbine: 'A01',
      WindSpeed: '60'
    },
    {
      _start: '2017-01-01 00:02:00+00:00',
      _stop: '2017-01-01 00:03:00+00:00',
      turbine: 'A01',
      WindSpeed: '150'
    },
    {
      _start: '2017-01-01 00:03:00+00:00',
      _stop: '2017-01-01 00:04:00+00:00',
      turbine: 'A01',
      WindSpeed: '200'
    },
  ];
  constructor(private profils: ProfileMockUpService) {
    this.query = new HistoricData('VAT');
    this.query.turbine = 'A01';
    this.query.start = '2017-01-01';
    this.query.stop = '2017-01-02';
    this.query.features = new Array<string>();
  }
}
