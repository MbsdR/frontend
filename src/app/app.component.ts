import {Component} from '@angular/core';

@Component({
  selector: 'wisa-root',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Demonstrator';
  constructor() {
  }
}
