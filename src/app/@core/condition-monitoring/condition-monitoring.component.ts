import {Component, Input, OnInit} from '@angular/core';
import {IProfile} from '../model/Usermangemant/IProfile';
import {UserMockUpService} from '../../@MockUp/user-mock-up.service';

@Component({
  selector: 'wisa-condition-monitoring',
  template: `
    <mat-grid-list cols="12" rowHeight="300px" class="dashboard">
      <mat-grid-tile *ngFor="let tile of profile.condition; index as i" [colspan]="tile.cols" [rowspan]="tile.rows">
        <div style="background: green;">
          <wisa-tile-content [tile]="tile" [turbine]="id" [isPlaying]="isPlaying"></wisa-tile-content>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./condition-monitoring.component.css']
})
export class ConditionMonitoringComponent implements OnInit {

  @Input() id: string;
  @Input() isPlaying: boolean;

  profile: IProfile;
  constructor(userMockUpService: UserMockUpService) {
    this.profile = userMockUpService.profile;
  }

  ngOnInit(): void {
  }

}
