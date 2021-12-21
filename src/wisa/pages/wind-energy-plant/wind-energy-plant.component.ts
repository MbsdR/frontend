import {Component, ComponentFactoryResolver, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Tile} from '../../@core/model/Usermangemant/ITile';
import {ActivatedRoute} from '@angular/router';
import {WebSocketService} from '../../@core/service/RestAPI/web-socket.service';
import {IDatapoint} from '../../@core/model/dto/IDatapoint';
import {Observable} from 'rxjs';


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
          Content 2
        </ng-template>
      </mat-tab>
      <mat-tab label="Business Intelligence">
        <ng-template matTabContent>
          Content 3
        </ng-template>
      </mat-tab>
      <!-- <mat-tab label="Wartung"> Content 4</mat-tab> -->
    </mat-tab-group>
  `,
  styleUrls: ['./wind-energy-plant.component.css']
})
export class WindEnergyPlantComponent implements OnInit, OnDestroy {

  $datastream: Observable<IDatapoint>;
  turbine: string;

  constructor(private router: ActivatedRoute, private webSocket: WebSocketService) {
    router.params.subscribe(value => {
      // get Turbine from parameter
      webSocket.turbine = value.id;
      this.turbine = value.id;
    });
  }

  sayHello($event: MatTabChangeEvent): void {
    console.log('ChangeEvent', $event.index);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  changeTiles($event: Array<Tile>): void{
    console.log($event);
  }
}
