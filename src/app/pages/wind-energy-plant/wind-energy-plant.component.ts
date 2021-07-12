import {Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {WepDirectiveDirective} from './wep-directive.directive';
import {WepDashboardComponent} from './wep-dashboard.component';

@Component({
  selector: 'wisa-wind-energy-plant',
  templateUrl: './wind-energy-plant.component.html',
  styleUrls: ['./wind-energy-plant.component.css']
})
export class WindEnergyPlantComponent implements OnInit, OnDestroy {

  @ViewChild(WepDirectiveDirective, {static: true}) dashboard!: WepDirectiveDirective;
  times$: Observable<number>;
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  private subcription: Subscription;
  weaId: number;

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.times$ = ocarina.$playOcarina.asObservable();
  }

  ngOnInit(): void {
    console.log('Start WEA');
    // this.loadComponente();
    console.log('End Load');
    this.subcription = this.route.params
      .subscribe( params => {
        this.weaId = params.id;
        console.info('wea ', params.id);
      });
  }

  ngOnDestroy(): void{
    this.subcription.unsubscribe();
  }

  loadComponente(): void {
    console.log('Start Componente');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WepDashboardComponent);
    const viewContainerRef = this.dashboard.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<WepDashboardComponent>(componentFactory);
  }

  removeTile(): void{
    console.log('Removed Tile');
  }
}
