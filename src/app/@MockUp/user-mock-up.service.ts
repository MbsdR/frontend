import {Injectable} from '@angular/core';
import {IProfile} from '../@core/model/Usermangemant/IProfile';
import {CHANNELS} from '../@core/model/Constants/mapping';
import {FREQUENCY, UNITS} from '../@core/model/Constants/ChartSettingConstants';

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
            feature: CHANNELS.ActivePower.value,
            frequency: {value: FREQUENCY[2], unit: UNITS.min.value},
            type: 'line',
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
            feature: CHANNELS.WindSpeed.value,
            frequency: {value: FREQUENCY[0], unit: UNITS.hour.value},
            type: 'line',
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
            feature: CHANNELS.RotorRPM.value,
            frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
            type: 'line',
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
            feature: CHANNELS.GeneratorRPM.value,
            frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
            type: 'line',
            func: 'mean'
          }
        },
      ]
    };

  constructor() {
  }
}
