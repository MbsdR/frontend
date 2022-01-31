import {Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {interval, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {WindparkMockUpService} from '../@MockUp/windpark-mock-up.service';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';
import {ActivatedRoute} from '@angular/router';
import {PreferenceComponent} from '../@core/utility/preference/preference.component';
import {ITileSetting} from '../@core/model/Usermangemant/ITileSetting';
import {CHANNELS} from '../@core/model/Constants/mapping';
import {MatDialog} from '@angular/material/dialog';
import {AddTileComponent} from '../@core/utility/add-tile/add-tile.component';

@Component({
  selector: 'wisa-sidebar',
  template: `
  <mat-sidenav-container class="sidenav-container">

  <mat-sidenav #drawer class="sidenav" fixedInViewport
               [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
               [mode]="(isHandset$ | async) ? 'over' : 'side'"
               [opened]="(isHandset$ | async) === false">
    <!--[attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'" -->

    <!-- Quickview Condition monitoring  -->
    <mat-toolbar>Windpark A</mat-toolbar>
    <div class="quickview">
      <div *ngFor="let plant of plants" class="turbine">
        <a #routerlink [routerLink]="['../wea', plant.id]">
          <wisa-condition-quickview [turbine]="plant.id"></wisa-condition-quickview>
        </a>
      </div>
    </div>
    <mat-toolbar>Windpark B</mat-toolbar>
  </mat-sidenav>

  <mat-sidenav-content class="sidenav-content">
    <!-- Add Content Here -->
    <button
      type="button"
      aria-label="Toggle sidenav"
      mat-icon-button
      (click)="drawer.toggle()"
      *ngIf="isHandset$ | async">
      <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
    </button>
    <!-- Header -->
  <wisa-header></wisa-header>
    <!-- /Header -->
    <div class="dashboard">

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>

  </mat-sidenav-content>

</mat-sidenav-container>
` ,
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {


  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  plants: Array<WindEnergyPlant> = [];
  plant: string;
  vendor: string;

  checked = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(@Inject(WindparkMockUpService) windparkMockUpService: WindparkMockUpService,
              private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute) {
    this.plants = windparkMockUpService.windpark;
    this.vendor = 'vat';
  }
  ngOnInit(): void {
    // Todo implement condition$ subsrciption
    this.route.queryParams.subscribe(value => {
      console.log(value);
      this.vendor = value.vendor;
    });
  }

}
