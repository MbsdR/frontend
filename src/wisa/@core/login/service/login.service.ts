import {Inject, Injectable, Optional} from '@angular/core';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {Md5} from 'ts-md5';
import {Router} from '@angular/router';
import {UsermanagementService} from '../../service/Usermanagement/usermanagement.service';
import {User} from '../../model/Usermangemant/IUser';
import {AccountService} from '../../account/service/account.service';
import {AUTH_ENABLED} from '../../../wisa.tokens';

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
      let user1;
      if (localStorage.getItem(CURRENT_USER)){
        user1 = localStorage.getItem(CURRENT_USER);
      }
      this.account.loadAccount(JSON.parse(user1));
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
    return false;
  }

  private mongoDbConnection(username): User {
    return this.usermanagementService.user[username];
  }


}
