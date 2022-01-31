import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Tile} from '../model/Usermangemant/ITile';
import {IProfile} from '../model/Usermangemant/IProfile';
import {Subscription} from 'rxjs';
import {UsermanagementMockupService} from '../../@MockUp/usermanagement-mockup.service';
import {RealTimeService} from '../service/real-time/real-time.service';

@Component({
  selector: 'wisa-predictive-analytics',
  template: `
    <mat-grid-list cols="12" rowHeight="300px" class="dashboard">
      <mat-grid-tile *ngFor="let tile of profile.settings.pa; index as i" [colspan]="tile.cols" [rowspan]="tile.rows"
                     [style]="backgorundColor">
        <div>
          <wisa-content-creator [tile]="tile" [turbine]="id" [isPlaying]="isPlaying" [isAnalytics]="true" (newTile)="updateTile($event)"></wisa-content-creator>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./predictive-analytics.component.css']
})
export class PredictiveAnalyticsComponent implements OnInit, OnDestroy {

  @ViewChildren('mat-grid-list') gridlist: QueryList<any>;
  @Output() tiles = new EventEmitter<Array<Tile>>();
  @Input() turbine: string;
  @Input() id: string;
  @Input() isPlaying: boolean;

  profile: IProfile;
  backgorundColor: string;
  private subscription: Subscription;

  constructor(private user: UsermanagementMockupService, private realTimeService: RealTimeService) {
    this.profile = user.profile;
    this.realTimeService.getCurrentData('', this.turbine);
  }

  ngOnInit(): void {
  }

  updateTile($event: Tile): void {
  }

  ngOnDestroy(): void {
    console.log('Destroy Condition');
    this.realTimeService.rm();
  }

}
