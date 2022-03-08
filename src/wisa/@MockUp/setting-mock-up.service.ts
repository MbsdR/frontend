import {Inject, inject, Injectable} from '@angular/core';
import {FREQUENCY, UNITS} from '../@core/model/Constants/ChartSettingConstants';
import {CHANNELS} from '../@core/model/Constants/mapping';
import {LANGUAGE} from '../wisa.tokens';

@Injectable({
  providedIn: 'root'
})
export class SettingMockUpService {

  constructor(@Inject(LANGUAGE) public lang: string) { }

  obeTiles = {
    cms: [
      {
        pos: 4,
        title: CHANNELS['CDI.VA_PitchPositionBlade1'].label[this.lang],
        cols: 2,
        rows: 1,
        color: 'lightblue',
        setting: {
          feature: 'CDI.VA_PitchPositionBlade1',
          frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
          type: 'line',
          func: 'mean',
          graphicSetting: {showSymbol: false}
        }
      },
      {
        pos: 1,
        title: CHANNELS['CDI.VA_PitchPositionBlade2'].label[this.lang],
        cols: 4,
        rows: 1,
        color: 'lightgreen',
        setting: {
          feature: 'CDI.VA_PitchPositionBlade2',
          frequency: {value: FREQUENCY[0], unit: UNITS.hour.value},
          type: 'line',
          func: 'mean',
          graphicSetting: {showSymbol: false}
        }
      },
      {
        pos: 3,
        title: CHANNELS['CDI.VA_PitchPositionBlade3'].label[this.lang],
        cols: 6,
        rows: 1,
        color: '#DDBDF1',
        setting: {
          feature: 'CDI.VA_PitchPositionBlade3',
          frequency: {value: FREQUENCY[1], unit: UNITS.min.value},
          type: 'line',
          func: 'mean',
          graphicSetting: {showSymbol: false}
        }
      },
    ],
    pa: [{
      pos: 2,
      title: CHANNELS.pitch_deviation.label[this.lang],
      cols: 4,
      rows: 1,
      color: 'lightpink',
      setting: {
        feature: 'pitch_deviation',
        frequency: {value: FREQUENCY[2], unit: UNITS.min.value},
        func: 'mean',
        type: 'line',
        graphicSetting: {showSymbol: true}
      }
    }, ],
    bi: []
  };

    vatTiles = {
      cms: [
        {
          pos: 2,
          title: CHANNELS.ActivePower.label[this.lang],
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
          title: CHANNELS.WindSpeed.label[this.lang],
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
          title: CHANNELS.RotorRPM.label[this.lang],
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
          title: CHANNELS.GeneratorRPM.label[this.lang],
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
      ],
      pa: [],
      bi: []
  };

}
