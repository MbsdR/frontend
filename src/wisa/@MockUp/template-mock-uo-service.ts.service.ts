import { Injectable } from '@angular/core';
import {UNITS} from "../@core/model/Constants/ChartSettingConstants";

@Injectable({
  providedIn: 'root'
})
export class TemplateMockUoService {

  readonly tmplPitch = {
    pos:2,
    cols:2,
    rows:1,
    title:"Pitchabweichung",
    color: 'lightblue',
    setting: {
      feature: 'CDI.VA_PitchPositionBlade1',
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplCorr  = {
    pos:3,
    cols:2,
    rows:1,
    title:"Korrelation",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplForecast = {
    pos:4,
    cols:2,
    rows:1,
    title:"Forecast",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplTemp = {
    pos:5,
    cols:2,
    rows:1,
    title:"Temperaturüberwachung",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  constructor() { }
}
