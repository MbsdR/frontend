import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from './service/login.service';
import {ILoginData} from '../model/ilogin-data';
import {Router} from '@angular/router';


@Component({
  selector: 'wisa-login',
  template: `
    <div>
      <span class="signtitle" align="center">WiSA Demonstrator</span>
      <span class="sign" align="center" #page>Login Page</span>
      <form (ngSubmit)="logIn(form.value)" #form="ngForm">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="text" id="user" class="form-control" name="user" ngModel required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" name="password" ngModel required minlength="6"/>
        </div>
        <div>
          <button class="submit" align="center">
            Login
          </button>

        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
  }

  logIn(value: { user: string, password: string }): boolean{
    const data: ILoginData = { user: value.user, password: value.password};
    if (this.loginService.authenticateUser(data)) {
      console.log('log in as '.concat(data.user));
      this.router.navigateByUrl('/');
      return true;
    }
    return false;
  }

}
