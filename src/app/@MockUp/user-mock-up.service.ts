import {Injectable} from '@angular/core';
import {Profile, Tile} from '../@core/model/profile';
import {CHANNELS} from '../@core/model/mapping';
import {FREQUENCE, UNITS} from '../@core/model/setting';

@Injectable({
  providedIn: 'root'
})
export class UserMockUpService {
  profile: Profile = {
    tiles: [
      {
        pos: 0,
        text: CHANNELS.activePower.label.de,
        cols: 2,
        rows: 1,
        color: 'lightpink',
        setting: {
          channel: CHANNELS.activePower.value,
          frequence: {value: FREQUENCE[2], unit: UNITS.min.value},
          type: 'line',
          turbine: 'A01',
          func: 'mean'
        }
      },
      {
        pos: 1,
        text: CHANNELS.windSpeed.label.de,
        cols: 2,
        rows: 1,
        color: 'lightgreen',
        setting: {
          channel: CHANNELS.windSpeed.value,
          frequence: {value: FREQUENCE[0], unit: UNITS.hour.value},
          type: 'line',
          turbine: 'A01',
          func: 'mean'
        }
      },
      {
        pos: 2,
        text: CHANNELS.rotorRpm.label.de,
        cols: 2,
        rows: 1,
        color: 'lightblue',
        setting: {
          channel: CHANNELS.rotorRpm.value,
          frequence: {value: FREQUENCE[1], unit: UNITS.min.value},
          type: 'line',
          turbine: 'A01',
          func: 'mean'
        }
      },
      {
        pos: 4,
        text: CHANNELS.generatorRpm.label.de,
        cols: 6,
        rows: 1,
        color: '#DDBDF1',
        setting: {
          channel: CHANNELS.generatorRpm.value,
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
