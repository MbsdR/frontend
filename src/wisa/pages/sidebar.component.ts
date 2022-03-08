import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {WindparkMockUpService} from '../@MockUp/windpark-mock-up.service';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {OcarinaOfTimeService} from '../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';

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
          <div [hidden]="!visible" class="ocarina">
            <wisa-ocarina-of-time></wisa-ocarina-of-time>
          </div>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </div>
        <!-- <button mat-fab (click)="addTiles()"><mat-icon>add</mat-icon> </button>-->
        <div class="footer">
          <wisa-footer></wisa-footer>
        </div>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {


  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  private theme = 'light-theme';
  private isDark = 'dark';

  plants: Array<WindEnergyPlant> = [];
  plant: string;
  vendor: string;
  visible: boolean;

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
    private renderer: Renderer2,
    private ocarina: OcarinaOfTimeService
  ) {

    this.plants = windparkMockUpService.windpark;
    this.vendor = 'vat';
    this.visible = false;
  }

  ngOnInit(): void {
    // Todo implement condition$ subsrciption
    this.route.queryParams.subscribe(value => {
      console.log(value);
      this.vendor = value.vendor;
    });
    this.ocarina.$isOpen.subscribe({
      next: isOpen => {
        this.visible = isOpen;
      }
    });
  }

  changeTheme(theme: string): void {
    this.theme = theme;
    this.renderer.setAttribute(this.document.body, 'class', theme);
    if (theme.includes(this.isDark)) {
      document.body.style.backgroundColor = 'rgb(48,48,48)';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }

}
