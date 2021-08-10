import {Inject, Injectable, Optional} from '@angular/core';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {Md5} from 'ts-md5';
import {Router} from '@angular/router';
import {UsermanagementService} from '../../../@MockUp/usermanagement.service';
import {User} from '../../model/IUser';
import {AccountService} from './account.service';
import {AUTH_ENABLED} from '../../../app.tokens';

const CURRENT_USER = 'current_user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated: boolean;

  constructor(@Optional() @Inject(AUTH_ENABLED) private authEnabled: boolean,
              private userMockUpService: ProfileMockUpService,
              private usermanagementService: UsermanagementService,
              private router: Router,
              private account: AccountService) {
    this.isAuthenticated = false;
  }

  authenticateUser(user: string, password: string): boolean {
    if (this.loadUser(user, password)) {
      console.log(user, 'is authenticated');
      this.account.loadUserProfile(JSON.parse(localStorage.getItem(CURRENT_USER)));
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isAuthorized(): boolean  {
    console.log('authenticate is enabled', this.authEnabled);
    return !this.authEnabled || localStorage.getItem(CURRENT_USER) != null;
  }

  logoutUser(): boolean {

    if (this.isAuthenticated) {
      //todo delete User
      this.isAuthenticated = false;
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('login');
    }

    return false;
  }

  private loadUser(username: string, password: string): boolean {
    //Todo DB-Connection
    const user: User = this.mongoDbConnection(username);
    if (Md5.hashStr(password) === user.password) {
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      console.log(JSON.stringify(user));
      return true;
    }
    return null;
  }

  private mongoDbConnection(username): User {
    return this.usermanagementService.user[username];
  }


}
