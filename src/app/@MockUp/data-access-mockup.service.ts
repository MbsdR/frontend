import {Injectable} from '@angular/core';
import {IQuery} from '../@core/model/IQuery';
import {IDatapoint} from '../@core/model/IDatapoint';

@Injectable({
  providedIn: 'root'
})
export class DataAccessMockupService {
  query: IQuery = {
    vendor: 'VAT',
    start: '2017-01-01',
    end: '2017-01-02',
    channels: ['WindSpeed'],
    turbines: ['A01'],
    freq: '1m',
    func: 'mean'

  };

  datapoints: Array<IDatapoint> = [
    {
      _start: '2017-01-01 00:00:00+00:00',
      _stop: '2017-01-01 00:01:00+00:00',
      WindSpeed_A01: '100'
    },
    {
      _start: '2017-01-01 00:01:00+00:00',
      _stop: '2017-01-01 00:02:00+00:00',
      WindSpeed_A01: '60'
    },
    {
      _start: '2017-01-01 00:02:00+00:00',
      _stop: '2017-01-01 00:03:00+00:00',
      WindSpeed_A01: '150'
    },
    {
      _start: '2017-01-01 00:03:00+00:00',
      _stop: '2017-01-01 00:04:00+00:00',
      WindSpeed_A01: '200'
    },
  ];

  constructor() {
  }
}
