import {
  AfterViewInit,
  Component, EventEmitter,
  OnInit, Output
} from '@angular/core';
import {IProfile} from '../../@core/model/IProfile';
import {UserMockUpService} from '../../@MockUp/user-mock-up.service';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';


@Component({
  selector: 'wisa-dashboard',
  template: `
    <mat-toolbar class="dashboard">
      <mat-tab-group>
        <mat-tab label="Überblick">
        </mat-tab>
        <mat-tab label="Zustandüberwachung">
          <div [hidden]="!visible" class="ocarina">
            <wisa-ocarina-of-time></wisa-ocarina-of-time>
          </div>
          <div>Windpark 1</div>
        </mat-tab>
        <mat-tab label="Predictive Analytics"> Windpark 1</mat-tab>
        <mat-tab label="Business Intelligence"> Windpark 1</mat-tab>
      </mat-tab-group>

      <mat-slide-toggle (toggleChange)="openOcarina()"></mat-slide-toggle>
    </mat-toolbar>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  profile: IProfile;
  visible = false;
  private $beginPlaying: EventEmitter<boolean>;

  constructor(userMochUpService: UserMockUpService,
              private ocarina: OcarinaOfTimeService) {
    this.profile = userMochUpService.profile;
    this.$beginPlaying = ocarina.$isPlaying;
  }

  ngOnInit(): void {
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
