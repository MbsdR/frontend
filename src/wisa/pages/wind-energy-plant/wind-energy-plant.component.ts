import {Component, ComponentFactoryResolver, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Tile} from '../../@core/model/Usermangemant/ITile';
import {ActivatedRoute} from '@angular/router';
import {WebSocketService} from '../../@core/service/RestAPI/web-socket.service';
import {IDatapoint} from '../../@core/model/dto/IDatapoint';
import {Observable} from 'rxjs';
import {AddTileComponent} from '../../@core/utility/add-tile/add-tile.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'wisa-wind-energy-plant',
  template: `
    <mat-tab-group (selectedTabChange)="sayHello($event)" dynamicHeight>
      <mat-tab label="Überblick">
        <ng-template >
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
          Content 3
        </ng-template>
      </mat-tab>
      <!-- <mat-tab label="Wartung"> Content 4</mat-tab> -->
    </mat-tab-group>
    <button mat-fab (click)="addTiles()"><mat-icon>add</mat-icon> </button>
  `,
  styleUrls: ['./wind-energy-plant.component.css']
})
export class WindEnergyPlantComponent implements OnInit, OnDestroy {

  @Output() $changeDashboard: EventEmitter<string> = new EventEmitter<string>();
  turbine: string;

  constructor(private router: ActivatedRoute, private webSocket: WebSocketService,
              private dialog: MatDialog) {
    router.params.subscribe(value => {
      // get Turbine from parameter
      webSocket.turbine = value.id;
      this.turbine = value.id;
    });
    this.$changeDashboard.subscribe(value => {
      webSocket.dashboard = value;
    }) ;
  }

  sayHello($event: MatTabChangeEvent): void {
    // TODO Emit dashboard
    const mapping = {1: 'cms', 2: 'pa', 3: 'bi'};
    this.$changeDashboard.emit(mapping[$event.index]);
    console.log('ChangeEvent', $event);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  changeTiles($event: Array<Tile>): void{
    console.log($event);
  }

  addTiles(): void {

    const dialogRef = this.dialog.open(AddTileComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('Save new Tile');
    });
  }
}
