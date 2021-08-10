import {Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {interval, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {WindparkMockUpService} from '../@MockUp/windpark-mock-up.service';
import {WindEnergyPlant} from '../@core/model/wind-energy-plant';
import {OcarinaOfTimeService} from '../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {ConditionMonitoringService} from '../@core/condition-monitoring/services/condition-monitoring.service';
import {IConditionData} from '../@core/model/IConditionData';
import {LoginService} from '../@core/login/service/login.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'wisa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  plants: Array<WindEnergyPlant> = [];
  plant: string;
  time: Observable<number>;

  checked = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  visible = false;
  private $beginPlaying: EventEmitter<boolean>;


  constructor(@Inject(WindparkMockUpService) windparkMockUpService: WindparkMockUpService,
              private loginService: LoginService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private breakpointObserver: BreakpointObserver,
              private router: ActivatedRoute) {
    this.plants = windparkMockUpService.windpark;
    this.$beginPlaying = ocarina.$isPlaying;
    this.time = interval(1000);
  }

  ngOnInit(): void {
    // Todo implement condition$ subsrciption
    this.router.params.subscribe(params => console.log(params));
  }
  openOcarina(): void {
    console.log('toggle change');
    this.toggleChange.emit(this.visible);
    this.visible = !this.visible;
    if (!this.visible) {
      this.$beginPlaying.emit(false);
    }
  }
  playOcarina($event: { start: Date, end: Date }): void {
    console.log('Sidebar play Ocarina on ', $event.start);
  }
  logout(): void {
    this.loginService.logoutUser();
  }
}
