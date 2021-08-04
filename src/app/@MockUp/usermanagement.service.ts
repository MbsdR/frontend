import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5';
import {IUser, User} from '../@core/model/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {
  user = {
    obe: User,
    vat: User,
    dwt: User
  };
  private vendors = ['obe', 'vat', 'dwt'];
  constructor() {
    for (const vendor of this.vendors) {
      const user = new User();
      user.id = this.vendors.indexOf(vendor).toString();
      user.username = vendor;
      user.password = Md5.hashStr('123456');
      this.user[vendor] = user;
    }
  }
  getUser(vendor: string): User{
    return this.user[vendor];
  }
}
