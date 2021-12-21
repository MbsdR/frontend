import { Injectable } from '@angular/core';
import {Account, Company, IAccount, ICompany} from '../@core/model/Usermangemant/IAccount';
import {ProfileMockUpService} from './profile-mock-up.service';

@Injectable({
  providedIn: 'root'
})
export class AccountMockUpService {

  account: IAccount;

  constructor(private profilMockUp: ProfileMockUpService) {
    this.account = new Account(profilMockUp.profiles.obe);
    this.account.company = new Company('OBE');
  }
}
