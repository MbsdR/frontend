import {Injectable} from '@angular/core';
import {Tile} from '../@core/model/tile';

@Injectable({
  providedIn: 'root'
})
export class DashboardMockUpService {

  tiles: Array<Tile> = [
    {text: 'RPM', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Windspeed', cols: 4, rows: 2, color: 'lightgreen'},
    {text: 'Active power', cols: 2, rows: 1, color: 'lightpink'},
    {text: '?', cols: 6, rows: 1, color: '#DDBDF1'},
  ];

  constructor() {}
}
