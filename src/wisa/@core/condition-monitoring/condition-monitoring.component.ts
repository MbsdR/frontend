import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {IProfile} from '../model/Usermangemant/IProfile';
import {Tile} from '../model/Usermangemant/ITile';
import {UsermanagementService} from '../../@MockUp/usermanagement.service';
import {RealTimeService} from '../service/real-time/real-time.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'wisa-condition-monitoring',
  template: `
    <mat-grid-list cols="12" rowHeight="300px" class="dashboard">
      <mat-grid-tile *ngFor="let tile of profile.condition; index as i" [colspan]="tile.cols" [rowspan]="tile.rows"
                     [style]="backgorundColor">
        <div>
          <wisa-tile-content [tile]="tile" [turbine]="id" [isPlaying]="isPlaying" (newTile)="updateTile($event)"></wisa-tile-content>
        </div>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./condition-monitoring.component.css']
})
export class ConditionMonitoringComponent implements OnInit, OnDestroy {

  @ViewChildren('mat-grid-list') gridlist: QueryList<any>;
  @Output() tiles = new EventEmitter<Array<Tile>>();
  @Input() turbine: string;
  @Input() id: string;
  @Input() isPlaying: boolean;

  profile: IProfile;
  backgorundColor: string;
  private subscription: Subscription;

  constructor(private user: UsermanagementService, private realTimeService: RealTimeService) {
    this.profile = user.profile;
    this.realTimeService.getCurrentData('', this.turbine);
  }

  ngOnInit(): void {
  }

  updateTile($event: Tile): void {
  }

  ngOnDestroy(): void {
    console.log("Destroy Condition");
    this.realTimeService.rm();
  }
}
