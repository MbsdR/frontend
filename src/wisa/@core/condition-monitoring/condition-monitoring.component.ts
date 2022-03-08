import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {IProfile} from '../model/Usermangemant/IProfile';
import {Tile} from '../model/Usermangemant/ITile';
import {UsermanagementMockupService} from '../../@MockUp/usermanagement-mockup.service';
import {SseService} from '../service/server-send-event/sse-service';
import {Subscription} from 'rxjs';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Component({
  selector: 'wisa-condition-monitoring',
  template: `
    <mat-grid-list cols="12" rowHeight="300px" class="dashboard">
      <mat-grid-tile *ngFor="let tile of profile.settings.cms; index as i" [colspan]="tile.cols" [rowspan]="tile.rows"
                     [style]="backgorundColor">
        <div>
          <wisa-content-creator [tile]="tile" [turbine]="id" [isPlaying]="isPlaying" [isAnalytics]="false"
                                (newTile)="updateTile($event)"></wisa-content-creator>
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

  constructor(private user: UsermanagementMockupService, private sseService: SseService) {
    this.profile = user.profile;
    sseService.datastream$.subscribe({
      next: (value) => {
        console.log('receive');
      }
    });
  }

  ngOnInit(): void {
  }

  updateTile($event: Tile): void {
  }

  ngOnDestroy(): void {
    console.log('Destroy Condition');
  }
}
