import { Injectable } from '@angular/core';
import {User} from '../../model/Usermangemant/IUser';
import {IProfile} from '../../model/Usermangemant/IProfile';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {IAccount} from '../../model/Usermangemant/IAccount';
import {AccountMockUpService} from '../../../@MockUp/account-mock-up.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: IAccount = this.accountMockUp.account;

  constructor(private accountMockUp: AccountMockUpService) {}

  loadAccount(user: User): boolean{
    console.log(user);
    // TODO replace with DB-Connection
    return true;
  }

  getVendor(): string {
    return this.account.company.abbr;
  }
}
