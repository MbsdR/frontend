import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {UsermanagementService} from '../../../@MockUp/usermanagement.service';
import {User} from '../../model/Usermangemant/IUser';
import {Profile} from '../../model/Usermangemant/IProfile';

describe('AccountService', () => {
  let service: AccountService;
  let usermanagement: UsermanagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
    usermanagement = TestBed.inject(UsermanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be loaded', () => {
    const user = usermanagement.getUser('vat');
    console.log(user);
    expect(service.loadAccount(user)).toBeTruthy();
  });
  it('should be got vendor', () => {
    const user = usermanagement.getUser('vat');
    service.loadAccount(user);
    expect(service.getVendor()).toEqual('VAT');
  });
});
