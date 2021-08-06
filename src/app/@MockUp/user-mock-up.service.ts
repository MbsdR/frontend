import {Injectable} from '@angular/core';
import {IProfile} from '../@core/model/IProfile';
import {CHANNELS} from '../@core/model/mapping';
import {FREQUENCE, UNITS} from '../@core/model/ISetting';

@Injectable({
  providedIn: 'root'
})
export class UserMockUpService {
  profile: IProfile = {
    condition:  [
        {
          pos: 2,
          title: CHANNELS.ActivePower.label.de,
          cols: 2,
          rows: 1,
          color: 'lightpink',
          setting: {
            channel: CHANNELS.ActivePower.value,
            frequence: {value: FREQUENCE[2], unit: UNITS.min.value},
            type: 'line',
            turbine: 'A01',
            func: 'mean'
          }
        },
        {
          pos: 1,
          title: CHANNELS.WindSpeed.label.de,
          cols: 4,
          rows: 1,
          color: 'lightgreen',
          setting: {
            channel: CHANNELS.WindSpeed.value,
            frequence: {value: FREQUENCE[0], unit: UNITS.hour.value},
            type: 'line',
            turbine: 'A01',
            func: 'mean'
          }
        },
        {
          pos: 4,
          title: CHANNELS.RotorRPM.label.de,
          cols: 2,
          rows: 1,
          color: 'lightblue',
          setting: {
            channel: CHANNELS.RotorRPM.value,
            frequence: {value: FREQUENCE[1], unit: UNITS.min.value},
            type: 'line',
            turbine: 'A01',
            func: 'mean'
          }
        },
        {
          pos: 3,
          title: CHANNELS.GeneratorRPM.label.de,
          cols: 6,
          rows: 1,
          color: '#DDBDF1',
          setting: {
            channel: CHANNELS.GeneratorRPM.value,
            frequence: {value: FREQUENCE[1], unit: UNITS.min.value},
            type: 'line',
            turbine: 'A01',
            func: 'mean'
          }
        },
      ]
    };

  constructor() {
  }
}
