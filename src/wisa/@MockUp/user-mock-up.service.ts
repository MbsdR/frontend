import {Injectable} from '@angular/core';
import {IProfile, Profile} from '../@core/model/Usermangemant/IProfile';
import {CHANNELS} from '../@core/model/Constants/mapping';
import {FREQUENCY, UNITS} from '../@core/model/Constants/ChartSettingConstants';

@Injectable({
  providedIn: 'root'
})
export class UserMockUpService {
  profile: IProfile = new Profile(
    {
      cms:  [
        {
          pos: 1,
          title: CHANNELS['CDI.VA_PitchPositionBlade1'].label.de,
          cols: 4,
          rows: 1,
          color: 'lightgreen',
          setting: {
            feature: CHANNELS['CDI.VA_PitchPositionBlade1'].value,
            frequency: {value: FREQUENCY[0], unit: UNITS.hour.value},
            type: 'line',
            func: 'mean'
          }
        },
        {
          pos: 4,
          title: CHANNELS['CDI.VA_PitchPositionBlade2'].label.de,
          cols: 2,
          rows: 1,
          color: 'lightblue',
          setting: {
            feature: CHANNELS['CDI.VA_PitchPositionBlade2'].value,
            frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
            type: 'line',
            func: 'mean'
          }
        },
        {
          pos: 3,
          title: CHANNELS['CDI.VA_PitchPositionBlade3'].label.de,
          cols: 6,
          rows: 1,
          color: '#DDBDF1',
          setting: {
            feature: CHANNELS['CDI.VA_PitchPositionBlade3'].value,
            frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
            type: 'line',
            func: 'mean'
          }
        },
      ],
      pa: [ {
        pos: 1,
        title: CHANNELS.pitch_deviation.label.de,
        cols: 4,
        rows: 1,
        color: 'lightpink',
        setting: {
          feature: CHANNELS.pitch_deviation.value,
          frequency: {value: FREQUENCY[2], unit: UNITS.min.value},
          type: 'line',
          func: 'mean',
          threshold: {warn: 0.3, alarm: 0.6}
        }
      } ],
    }
  );

  constructor() {
  }
}
