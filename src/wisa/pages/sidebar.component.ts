import {Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChild, Renderer2} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {interval, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {WindparkMockUpService} from '../@MockUp/windpark-mock-up.service';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';
import {ActivatedRoute} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {rgb} from "d3";

@Component({
  selector: 'wisa-sidebar',
  template: `
  <mat-sidenav-container class="sidenav-container mat-app-background">

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
  <wisa-header (changeThemeForMe)="changeTheme($event)"></wisa-header>
    <!-- /Header -->
    <div class="dashboard">

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <!-- <button mat-fab (click)="addTiles()"><mat-icon>add</mat-icon> </button>-->
  </mat-sidenav-content>

</mat-sidenav-container>
` ,
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {


  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  private theme='light-theme';
  private isDark='dark';

  plants: Array<WindEnergyPlant> = [];
  plant: string;
  vendor: string;

  checked = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    @Inject(WindparkMockUpService) windparkMockUpService: WindparkMockUpService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
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

  changeTheme(theme: string) {
    this.theme = theme;
    this.renderer.setAttribute(this.document.body, 'class', theme);
    if(theme.includes(this.isDark)) {
      document.body.style.backgroundColor="rgb(48,48,48)";
    } else { document.body.style.backgroundColor="white";}
  }

}
