import { Injectable } from '@angular/core';
import {type} from 'os';

@Injectable({
  providedIn: 'root'
})
export class AccountMockUpService {

  constructor() {
    const details: {
      username: string,
      role: Array<string>,
    } = {
      username: 'vat',
      role: ['user']
    };
  }
}
