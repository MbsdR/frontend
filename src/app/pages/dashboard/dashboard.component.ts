import {
  AfterViewInit,
  Component, EventEmitter,
  OnInit, Output
} from '@angular/core';
import {IProfile} from '../../@core/model/Usermangemant/IProfile';
import {UserMockUpService} from '../../@MockUp/user-mock-up.service';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'wisa-dashboard',
  template: `
    <mat-tab-group>
      <mat-tab label="Überblick">
        <wisa-map></wisa-map>
      </mat-tab>
      <mat-tab label="Zustandüberwachung">
        <div>Windpark 1</div>
      </mat-tab>
      <mat-tab label="Predictive Analytics"> Windpark 1</mat-tab>
      <mat-tab label="Business Intelligence"> Windpark 1</mat-tab>
    </mat-tab-group>

    <!-- <mat-slide-toggle (toggleChange)="openOcarina()"></mat-slide-toggle> -->
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  profile: IProfile;
  visible = false;
  private $beginPlaying: EventEmitter<boolean>;

  constructor(userMochUpService: UserMockUpService,
              private ocarina: OcarinaOfTimeService,
              private activatedRoute: ActivatedRoute) {
    this.profile = userMochUpService.profile;
    this.$beginPlaying = ocarina.$isPlaying;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => console.log('Dashboard', value));
  }

  ngAfterViewInit(): void {
    console.info('Dashboard was created');
  }

  openOcarina(): void {
    console.log('toggle change');
    this.toggleChange.emit(this.visible);
    this.visible = !this.visible;
    if (!this.visible) {
      this.$beginPlaying.emit(false);
    }
  }

}
