import {Component, ComponentFactoryResolver, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AccountComponent} from '../../@core/account/account.component';
import {WindEnergyPlant} from '../../@core/model/wind-energy-plant';
import {interval, merge, mergeWith, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay, tap} from 'rxjs/operators';
import {WindparkMockUpService} from '../../@MockUp/windpark-mock-up.service';
import {LoginService} from '../../@core/login/service/login.service';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'wisa-header',
  template: `
    <div class="header">

      <a *ngIf="!(isHandset$ | async)" routerLink="/" class="link">
        <img src="assets/img/WiSAbigdata_Logo_eng.svg" style="width: 200px">
      </a>
      <div>
        <span>{{time | async  | date:'shortDate' }}</span> <br>
        <span>{{time | async | date:'mediumTime' }}</span> <br>
      </div>
      <div>
        <mat-slide-toggle (toggleChange)="openOcarina()" toggleOcarina></mat-slide-toggle>

        <button mat-icon-button class="more-button" [matMenuTriggerFor]="account" aria-label="Toggle menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #account="matMenu" xPosition="before">
          <button mat-menu-item (click)="openAccount()">
            <mat-icon>account_circle</mat-icon>
            Account
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-menu>

        <button mat-raised-button [matMenuTriggerFor]="theme" color="primary">Design ändern</button>
        <mat-menu #theme="matMenu">
          <button mat-menu-item (click)="changeTheme('light-theme')">Blue-Light</button>
          <button mat-menu-item (click)="changeTheme('green-light-theme')">Green-Light</button>
          <button mat-menu-item (click)="changeTheme('dark-theme')">Orange-Dark</button>
        </mat-menu>

        <div [formGroup]="myGroup">
          <mat-form-field appearance="fill">
            <mat-select name="channel" formControlName="plant">
              <mat-option value="">---Channel auswählen----</mat-option>
              <mat-option *ngFor="let plant of plants">{{plant.id}}</mat-option>
            </mat-select>

          </mat-form-field>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  readonly changeThemeForMe = new EventEmitter<string>();
  @Output()
  changeVisible: boolean;

  plants: Array<WindEnergyPlant> = [];
  time: Observable<Date>;
  systemTime: Date = new Date('2015-04-01');

  checked = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  private openOcarina$: EventEmitter<boolean>;

  myGroup = new FormGroup({
    plant: new FormControl()
  });


  constructor(@Inject(WindparkMockUpService) windparkMockUpService: WindparkMockUpService,
              private loginService: LoginService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private breakpointObserver: BreakpointObserver,
              private router: ActivatedRoute,
              private dialog: MatDialog) {
    this.plants = windparkMockUpService.windpark;
    this.openOcarina$ = ocarina.$isOpen;
    this.time = interval(1000).pipe(map( () => new Date(Date.now())));
    this.changeVisible = false;
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(value => console.log('Header', value));
  }

  /**
   * Open Ocarina
   */
  openOcarina(): void {
    this.changeVisible = !this.changeVisible;
    this.openOcarina$.emit(this.changeVisible);
  }

  playOcarina($event: { start: Date, end: Date }): void {
    console.log('Sidebar play Ocarina on ', $event.start);
  }

  logout(): void {
    this.loginService.logoutUser();
  }

  openAccount(): void {
    const dialogRef = this.dialog.open(AccountComponent, {data: 'Details'});

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        console.log(value);
      }
    });
  }

  changeTheme(theme: string): void{
    this.changeThemeForMe.emit(theme);
  }
}
