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
      <form (ngSubmit)="logIn(user.value, password.value)">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="text" id="user" class="form-control" #user required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" #password required minlength="6"/>
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
export class LoginComponent {

  constructor(private loginService: LoginService) {}

  logIn(username: string, password: string): void {
    this.loginService.authenticateUser(username, password);
    console.log('log in as '.concat(username));
  }

}
