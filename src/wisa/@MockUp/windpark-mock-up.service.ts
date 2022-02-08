import { Injectable } from '@angular/core';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';

@Injectable({
  providedIn: 'root'
})
export class WindparkMockUpService {

  windpark: Array<WindEnergyPlant> = [];

  constructor() {
    for (let i = 1; i < 2; i++) {
      this.windpark.push({id: 'N1-1'});
    }
  }
}
