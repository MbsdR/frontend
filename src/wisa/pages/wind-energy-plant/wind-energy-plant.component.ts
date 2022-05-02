import {Component, Directive, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Tile} from '../../@core/model/Usermangemant/ITile';
import {ActivatedRoute} from '@angular/router';
import {AddTileComponent} from '../../@core/utility/add-tile/add-tile.component';
import {MatDialog} from '@angular/material/dialog';
import {ManagerAPIService} from '../../@core/service/RestAPI/manager-api.service';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {IProfile} from "../../@core/model/Usermangemant/IProfile";
import {UsermanagementService} from "../../@core/service/Usermanagement/usermanagement.service";
import {SessionService} from "../../@core/service/Session/session.service";



@Component({
  selector: 'wisa-wind-energy-plant',
  template: `
    <mat-tab-group (selectedTabChange)="changeTab($event)" dynamicHeight>
      <mat-tab label="Überblick">
        <ng-template>
          Content 1
        </ng-template>
      </mat-tab>
      <mat-tab label="Zustandüberwachung">
        <ng-template matTabContent>
          <wisa-condition-monitoring (tiles)="changeTiles($event)" [turbine]="turbine"></wisa-condition-monitoring>
        </ng-template>
      </mat-tab>
      <mat-tab label="Predictive Analytics">
        <ng-template matTabContent>
          <wisa-predictive-analytics (tiles)="changeTiles($event)" [turbine]="turbine"></wisa-predictive-analytics>
        </ng-template>
      </mat-tab>
      <mat-tab label="Business Intelligence">
        <ng-template matTabContent>
          <wisa-bi></wisa-bi>
        </ng-template>
      </mat-tab>
      <!-- <mat-tab label="Wartung"> Content 4</mat-tab> -->
    </mat-tab-group>
    <button mat-fab (click)="addTiles()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['./wind-energy-plant.component.css']
})
export class WindEnergyPlantComponent implements OnInit, OnDestroy {

  @Output() $changeDashboard: EventEmitter<string> = new EventEmitter<string>();

  turbine: string;

  private ocarinsIsOpen: boolean;

  constructor(private router: ActivatedRoute,
              private ocarina: OcarinaOfTimeService,
              private managerAPIService: ManagerAPIService,
              private managementService: UsermanagementService,
              private sessionService: SessionService,
              private dialog: MatDialog) {
    this.ocarinsIsOpen = false;
    router.params.subscribe(value => {
      // get Turbine from parameter
      managerAPIService.turbine = value.id;
      this.turbine = value.id;
    });
    this.$changeDashboard.subscribe(value => {
      managerAPIService.dashboard = value;
    });
  }

  changeTab($event: MatTabChangeEvent): void {
    // TODO Emit dashboard
    const mapping = {0: 'overview', 1: 'cms', 2: 'pa', 3: 'bi'};
    this.$changeDashboard.emit(mapping[$event.index]);
    // stop ocarina
    console.log(this.ocarina.isPause);
  }

  ngOnInit(): void {
    this.ocarina.$isOpen.subscribe({
      next: isOpen => {
        this.ocarinsIsOpen = isOpen;
      }
    });
  }

  ngOnDestroy(): void {
  }

  changeTiles($event: Array<Tile>): void {
    console.log($event);
  }

  addTiles(): void {
    const dashboards = this.managementService.profile.settings;
    const dialogRef = this.dialog.open(AddTileComponent,  {
      height: '60%',
      width: '50%',
      data: {dashboards}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sessionService.newProfile(result)
      console.log('Dialog Result: ', result);
    });
  }
}
