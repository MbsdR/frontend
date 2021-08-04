import {Injectable} from '@angular/core';
import {ILoginData} from '../../model/ilogin-data';
import {IProfile, Profile} from '../../model/IProfile';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {Md5} from 'ts-md5';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UsermanagementService} from '../../../@MockUp/usermanagement.service';
import {User} from '../../model/IUser';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate, CanActivateChild {

  private isAuthenticated: boolean;

  constructor(private userMockUpService: ProfileMockUpService,
              private usermanagementService: UsermanagementService,
              private account: AccountService,
              private router: Router) {
    this.isAuthenticated = false;
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('i am checking to see if you are logged in');
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('checking child route access');
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }

  authenticateUser(data: ILoginData): boolean {
    const user: User = this.loadUser(data.user, data.password);
    if (user) {
      console.log(data.user, 'is authenticated');
      this.account.loadUserProfile(user);
      localStorage.setItem('vendor', user.username);
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logoutUser(): boolean {

    if (this.isAuthenticated) {
      //todo delete User
      this.isAuthenticated = false;
      localStorage.clear();
      this.router.navigateByUrl('login');
    }

    return false;
  }

  private loadUser(username: string, password: string): User {
    //Todo DB-Connection
    const user: User = this.usermanagementService.user[username];
    if (Md5.hashStr(password) === user.password) {
      return user;
    }
    return null;
  }


}
