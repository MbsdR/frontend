import { Injectable } from '@angular/core';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';

@Injectable({
  providedIn: 'root'
})
export class WindparkMockUpService {

  windpark: Array<WindEnergyPlant> = [];

  constructor() {
    for (let i = 1; i < 81; i++) {
      if (i < 10) {
        this.windpark.push({id: ('A_0' + i).slice(-4)});
      }else {
        this.windpark.push({id: ('A_' + i).slice(-4)});
      }
    }
  }
}
