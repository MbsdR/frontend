import {Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';

@Component({
  selector: 'wisa-wind-energy-plant',
  template: `
    <mat-tab-group>
      <mat-tab label="Überblick">
      </mat-tab>
      <mat-tab label="Zustandüberwachung">
        <wisa-condition-monitoring [id]="weaId"></wisa-condition-monitoring>
      </mat-tab>
      <mat-tab label="Predictive Analytics"> Content 2</mat-tab>
      <mat-tab label="Business Intelligence"> Content 3</mat-tab>
      <!-- <mat-tab label="Wartung"> Content 4</mat-tab> -->
    </mat-tab-group>
  `,
  styleUrls: ['./wind-energy-plant.component.css']
})
export class WindEnergyPlantComponent implements OnInit, OnDestroy {

  private subcription: Subscription;
  weaId: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Start WEA');
    console.log('End Load');
    this.subcription = this.route.params
      .subscribe(params => {
        this.weaId = params.id;
        console.info('wea ', params.id);
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
