import { Injectable } from '@angular/core';
import {User} from '../../model/IUser';
import {IProfile} from '../../model/IProfile';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private profile: IProfile;
  constructor(private profileMockUpService: ProfileMockUpService) {}

  loadUserProfile(user: User): boolean{
    console.log(user);
    // TODO replace with DB-Connection
    this.profile = this.profileMockUpService.profiles[user.username];
    return true;
  }

  getVendor(): string {
    return this.profile.vendor;
  }

}
