import { Injectable } from '@angular/core';
import {User} from '../../model/Usermangemant/IUser';
import {IProfile} from '../../model/Usermangemant/IProfile';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {IAccount} from '../../model/Usermangemant/IAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private account: IAccount;
  constructor(private profileMockUpService: ProfileMockUpService) {}

  loadAccount(user: User): boolean{
    console.log(user);
    // TODO replace with DB-Connection
    this.account = this.profileMockUpService.profiles[user.username].account;
    return true;
  }

  getVendor(): string {
    return this.account.company.abbr;
  }

}
