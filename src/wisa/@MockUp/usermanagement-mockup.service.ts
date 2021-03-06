import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5';
import {IUser, User} from '../@core/model/Usermangemant/IUser';
import {ProfileMockUpService} from './profile-mock-up.service';
import {IProfile} from '../@core/model/Usermangemant/IProfile';

@Injectable({
  providedIn: 'root'
})

export class UsermanagementMockupService {
  user = {
    obe: User,
    vat: User,
    dwt: User
  };
  profile: IProfile;
  private vendors = ['obe', 'vat', 'dwt'];

  constructor(private profileMockUpService: ProfileMockUpService) {
    for (const vendor of this.vendors) {
      const user = new User();
      user.id = this.vendors.indexOf(vendor).toString();
      user.username = vendor;
      user.password = Md5.hashStr('123456');
      this.user[vendor] = user;
    }
    this.profile = profileMockUpService.profiles.obe;
  }
  getUser(vendor: string): User{
    return this.user[vendor];
  }
}
