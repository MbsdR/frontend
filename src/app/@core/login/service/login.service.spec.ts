import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import { Profile} from '../../model/Usermangemant/IProfile';
import {UsermanagementService} from '../../../@MockUp/usermanagement.service';
import {Router} from '@angular/router';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {AccountService} from '../../account/service/account.service';

describe('LoginService', () => {
  let service: LoginService;
  let usermanagement: UsermanagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router, ProfileMockUpService, UsermanagementService, AccountService]
    });
    service = TestBed.inject(LoginService);
    usermanagement = TestBed.inject(UsermanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dont get User', () => {
    const noUser = {user: 'RWE', password: '123456'};
    expect(service.authenticateUser(noUser)).toBeFalsy();
  });

  it('should get User', () => {
    // const expectedProfile = TestBed.inject(ProfileMockUpService).profile;
    const user = {user: 'vat', password: '123456'};
    expect(service.authenticateUser(user)).toBeTruthy();
    expect(localStorage.getItem('vendor')).toEqual('VAT');
  });

  it('should logged in', () => {
    const user = {user: 'vat', password: '123456'};
    service.authenticateUser(user);
    expect(service).toBeTruthy();
  });

  it('should dont get OceanBreeze Energy user, because wrong password', () => {
    const expectedProfile = new Profile('OBE');
    const user = {user: 'obe', password: ''};
    expect(service.authenticateUser(user)).toBeNull();
  });


});
