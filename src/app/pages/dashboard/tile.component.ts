import {Component, Inject, Input} from '@angular/core';
import {DataAccessService} from '../../@core/service/Data-Access/data-access.service';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  template: `
    <mat-card class="dashboard-card">
      <mat-card-header>
        <mat-card-title>
          <h1>{{channel}}</h1>
          <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu" xPosition="before">
            <button mat-menu-item (click)="openPreference()">
              <mat-icon>settings</mat-icon>
            </button>
            <button mat-menu-item (click)="removeTile()">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-menu>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="dashboard-card-content">
        <!-- Content -->
        <!-- <wisa-line-chart [data$]="data$" [setting]="tile.setting"></wisa-line-chart> -->
      </mat-card-content>
    </mat-card>
  `
})
export class TileComponent {

  channel = 'Wind';

  constructor(@Inject(DataAccessService) dataAccessService: DataAccessService,
              private ocarina: OcarinaOfTimeService,
              private dialog: MatDialog) {
    console.log('Tilecomponent was created');
  }

  openPreference() {

  }

  removeTile() {

  }
}
