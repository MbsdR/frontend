import {
  AfterViewInit,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {DataAccessService} from '../../@core/service/Data-Access/data-access.service';
import {DataAccessMockupService} from '../../@MockUp/data-access-mockup.service';
import {QueryBuilderService} from '../../@core/service/queryBuilder/query-builder.service';
import {IProfile} from '../../@core/model/IProfile';
import {UserMockUpService} from '../../@MockUp/user-mock-up.service';


@Component({
  selector: 'wisa-dashboard',
  template: `

    <mat-grid-list cols="12" rowHeight="300px" class="dashboard">

      <mat-grid-tile *ngFor="let tile of profile.tiles; index as i" [colspan]="tile.cols" [rowspan]="tile.rows">
        <div style="background: green;">
          <wisa-tile-content [tile]="tile"></wisa-tile-content>
          <!-- <wisa-tile [tile]="tile" ></wisa-tile> -->
        </div>
      </mat-grid-tile>
    </mat-grid-list>

  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  profile: IProfile;

  constructor(@Inject(QueryBuilderService) private queryBuilderService: QueryBuilderService,
              private dataAccessMockupService: DataAccessMockupService,
              private dataAccessService: DataAccessService,
              private userMochUpService: UserMockUpService,
              ) {
    this.profile = userMochUpService.profile;
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    console.info('Dashboard was created');
  }


}
