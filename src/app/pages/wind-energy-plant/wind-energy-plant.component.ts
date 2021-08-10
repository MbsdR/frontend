import {Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {TabDirective} from './tab.directive';
import {ConditionMonitoringComponent} from '../../@core/condition-monitoring/condition-monitoring.component';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'wisa-wind-energy-plant',
  template: `
    <mat-tab-group (selectedTabChange)="sayHello($event)">
      <mat-tab label="Überblick">
        <ng-template matTabContent>

        </ng-template>
      </mat-tab>
      <mat-tab label="Zustandüberwachung">
        <ng-template matTabContent>
          <wisa-condition-monitoring></wisa-condition-monitoring>
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

  @ViewChild(TabDirective, {static: true}) tabCondition!: TabDirective;

  private subcription: Subscription;
  private isPlaying: boolean;

  constructor(private route: ActivatedRoute,
              private ocarinaOfTimeService: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.isPlaying = false;
  }

  sayHello($event: MatTabChangeEvent): void {
    console.log($event.index);
  }

  ngOnInit(): void {
    this.ocarinaOfTimeService.$isPlaying.subscribe(isPlaying => this.isPlaying = isPlaying);

    this.subcription = this.route.params
      .subscribe(params => {
        this.loadTab(params.id);
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  private loadTab(id: string): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConditionMonitoringComponent);
    const viewContainerRef = this.tabCondition.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ConditionMonitoringComponent>(componentFactory);
    componentRef.instance.id = id;
    componentRef.instance.isPlaying = this.isPlaying;
  }

}
