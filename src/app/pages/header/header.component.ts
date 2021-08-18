import {Component, ComponentFactoryResolver, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AccountComponent} from '../../@core/account/account.component';
import {WindEnergyPlant} from '../../@core/model/wind-energy-plant';
import {interval, Observable, Subject} from 'rxjs';
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

      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="drawer.toggle()"
        *ngIf="isHandset$ | async">
        <mat-icon>menu</mat-icon>
      </button>
      <a *ngIf="!(isHandset$ | async)" routerLink="/" class="link">
        <img src="assets/img/Logo_WiSAbigdata_300dpi.png" style="width: 200px">
      </a>
      <div>
        <span>{{time | async | date:'shortDate' }}</span> <br>
        <span>{{time | async | date:'mediumTime' }}</span> <br>
      </div>
      <div>
        <mat-slide-toggle (toggleChange)="openOcarina()" toggleOcarina></mat-slide-toggle>

        <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #menu="matMenu" xPosition="before">
          <button mat-menu-item (click)="openAccount()">
            <mat-icon>account_circle</mat-icon>
            Account
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
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
      <div [hidden]="!visible" class="ocarina">
        <wisa-ocarina-of-time></wisa-ocarina-of-time>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  plants: Array<WindEnergyPlant> = [];
  time: Observable<number>;

  checked = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  visible = false;
  private $beginPlaying: EventEmitter<boolean>;

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
    this.$beginPlaying = ocarina.$isPlaying;
    this.time = interval(1000).pipe(map(() =>  Date.now()));
  }

  ngOnInit(): void {
  }

  openOcarina(): void {
    console.log('toggle change');
    this.toggleChange.emit(this.visible);
    this.visible = !this.visible;
    if (!this.visible) {
      this.$beginPlaying.emit(false);
    }
  }

  playOcarina($event: { start: Date, end: Date }): void {
    console.log('Sidebar play Ocarina on ', $event.start);
  }

  logout(): void {
    this.loginService.logoutUser();
  }

  openAccount(): void {
    console.log();
    const dialogRef = this.dialog.open(AccountComponent, {data: 'Details'});

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        console.log(value);
      }
    });
  }
}
