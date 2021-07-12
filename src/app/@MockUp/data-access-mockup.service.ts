import { Injectable } from '@angular/core';
import {Query} from '../@core/model/query';
import {Datapoint} from '../@core/model/datapoint';

@Injectable({
  providedIn: 'root'
})
export class DataAccessMockupService {
  query: Query = {
    vendor: 'VAT',
    start: '2017-01-01',
    end: '2017-01-02',
    channels: [
      'WindSpeed',
      'ActivePower',
      'RPM'
    ],
    turbines: [
    ],
    freq: '1m',
    func: 'mean'

  };

  datapoints: Array<Datapoint> = [
    {_start: '2017-01-01 00:00:00+00:00',
    _stop: '2017-01-01 00:01:00+00:00',
    WindSpeed_A01: '100'},
    {_start: '2017-01-01 00:01:00+00:00',
      _stop: '2017-01-01 00:02:00+00:00',
      WindSpeed_A01: '60'},
    {_start: '2017-01-01 00:02:00+00:00',
      _stop: '2017-01-01 00:03:00+00:00',
      WindSpeed_A01: '150'},
    {_start: '2017-01-01 00:03:00+00:00',
      _stop: '2017-01-01 00:04:00+00:00',
      WindSpeed_A01: '200'},
  ];
  constructor() { }
}
