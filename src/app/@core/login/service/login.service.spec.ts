import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {ILoginData} from '../../model/ilogin-data';
import {IProfile, Profile} from '../../model/IProfile';
import {UsermanagementService} from '../../../@MockUp/usermanagement.service';
import {User} from '../../model/IUser';
import {Router} from '@angular/router';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {AccountService} from './account.service';

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
    const noUser: ILoginData = {user: 'RWE', password: '123456'};
    expect(service.authenticateUser(noUser)).toBeFalsy();
  });

  it('should get User', () => {
    // const expectedProfile = TestBed.inject(ProfileMockUpService).profile;
    const user: ILoginData = {user: 'vat', password: '123456'};
    expect(service.authenticateUser(user)).toBeTruthy();
    expect(localStorage.getItem('vendor')).toEqual('VAT');
  });

  it('should logged in', () => {
    const user: ILoginData = {user: 'vat', password: '123456'};
    service.authenticateUser(user);
    expect(service).toBeTruthy();
  });

  it('should dont get OceanBreeze Energy user, because wrong password', () => {
    const expectedProfile = new Profile('OBE');
    const user: ILoginData = {user: 'obe', password: ''};
    expect(service.authenticateUser(user)).toBeNull();
  });


});
