import {Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {WindparkMockUpService} from '../../@MockUp/windpark-mock-up.service';
import {WindEnergyPlant} from '../../@core/model/wind-energy-plant';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {WepDashboardComponent} from '../../pages/wind-energy-plant/wep-dashboard.component';
import {WepDirectiveDirective} from '../../pages/wind-energy-plant/wep-directive.directive';

const WINDPLANT = `
 <svg width="20mm" height="20mm" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
 <metadata>
 </metadata>
 <path d="m125.55612 80.225861a20.663107 57.006531 0 0 1-20.65481 57.006529 20.663107 57.006531 0 0 1-20.671397-56.960762 20.663107 57.006531 0 0 1 20.638217-57.052257 20.663107 57.006531 0 0 1 20.68796 56.914954" style="fill:green;stroke-linecap:round;stroke-width:2.02549267;stroke:#000"/>
 <path transform="matrix(.69149453 .7223817 -.67726399 .73574009 0 0)" d="m190.78873 82.285019a21.335236 55.321098 0 0 1-21.32667 55.321091 21.335236 55.321098 0 0 1-21.3438-55.276676 21.335236 55.321098 0 0 1 21.30954-55.365473 21.335236 55.321098 0 0 1 21.3609 55.232228" style="fill:green;stroke-linecap:round;stroke-width:2.0275178;stroke:#000"/>
 <path transform="matrix(-.69149453 .7223817 .67726399 .73574009 0 0)" d="m35.74895 233.74272a21.335236 55.321098 0 0 1-21.326671 55.3211 21.335236 55.321098 0 0 1-21.3437933-55.27668 21.335236 55.321098 0 0 1 21.3095353-55.36548 21.335236 55.321098 0 0 1 21.360902 55.23223" style="fill:green;stroke-linecap:round;stroke-width:2.0275178;stroke:#000"/>
 <path d="m93.996126 173.91976-20.423849 102.72465h63.923413l-21.25027-102.72465" style="fill:green;stroke-width:2.21357417;stroke:#000"/>
</svg> `;

@Component({
  selector: 'wisa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @ViewChild(WepDirectiveDirective, {static: true}) dashboard!: WepDirectiveDirective;

  @Input()
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() rows: Array<Array<WindEnergyPlant>> = [];

  checked = true;
  wepNumberPerRow = 3;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  visible = false;
  private $beginPlaying: EventEmitter<boolean>;


  constructor(@Inject(WindparkMockUpService) windparkMockUpService: WindparkMockUpService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private breakpointObserver: BreakpointObserver,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('wind-plant', sanitizer.bypassSecurityTrustHtml(WINDPLANT));
    this.generateWindpark(windparkMockUpService);

    this.$beginPlaying = ocarina.$isPlaying;
  }

  ngOnInit(): void {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DashboardComponent);
    // const viewContainerRef = this.dashboard.viewContainerRef;
    // const componentRef = viewContainerRef.createComponent<DashboardComponent>(componentFactory);
  }

  generateWindpark(windparkMockUpService?: WindparkMockUpService): void {
    let row = [];
    let wepNumberPerRow = this.wepNumberPerRow;
    const windpark = windparkMockUpService.windpark;
    while (windpark.length > 0) {
      const wep = windpark.shift();
      row.push(wep);
      wepNumberPerRow -= 1;
      if (wepNumberPerRow === 0) {
        this.rows.push(row);
        wepNumberPerRow = this.wepNumberPerRow;
        row = [];
      } else if (windpark.length === 0) {
        this.rows.push(row);
        wepNumberPerRow = this.wepNumberPerRow;
        row = [];
      }
    }
  }


  openOcarina(): void {
    console.log('toggle change');
    this.toggleChange.emit(this.visible);
    this.visible = !this.visible;
    if (!this.visible) {
      this.$beginPlaying.emit(false);
    }
  }

  addTiles(): void {
    console.info('Add Tile');
  }

  playOcarina($event: { start: Date, end: Date }): void {
    console.log('Sidebar play Ocarina on ', $event.start);
  }


  choosedWep(id: string): void {
    console.log('Click WEP ', id);
    this.loadComponente();
  }

  loadComponente(): void {
    console.log('Start Componente');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WepDashboardComponent);
    const viewContainerRef = this.dashboard.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<WepDashboardComponent>(componentFactory);
  }
}
