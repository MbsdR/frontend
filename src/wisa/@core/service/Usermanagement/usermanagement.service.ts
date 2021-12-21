import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5';
import {IUser, User} from '../../model/Usermangemant/IUser';
import {UserMockUpService} from '../../../@MockUp/user-mock-up.service';
import {IProfile} from '../../model/Usermangemant/IProfile';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {
  user = {
    obe: User,
    vat: User,
    dwt: User
  };
  profile: IProfile;

  private vendors = ['obe', 'vat', 'dwt'];


  constructor(private userManagemen: UserMockUpService) {
    for (const vendor of this.vendors) {
      const user = new User();
      user.id = this.vendors.indexOf(vendor).toString();
      user.username = vendor;
      user.password = Md5.hashStr('123456');
      this.user[vendor] = user;
    }

    this.profile = userManagemen.profile;
  }
  getUser(vendor: string): User{
    return this.user[vendor];
  }
}
