import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, Directive,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DataAccessService} from '../../@core/service/Data-Access/data-access.service';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {Query, IQuery} from '../../@core/model/query';
import {DataAccessMockupService} from '../../@MockUp/data-access-mockup.service';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {map} from 'rxjs/operators';
import {QueryBuilderService} from '../../@core/service/queryBuilder/query-builder.service';
import {IDatapoint} from '../../@core/model/IDatapoint';
import {Profile, Tile} from '../../@core/model/profile';
import {MatDialog} from '@angular/material/dialog';
import {PreferenceComponent} from '../../@core/utility/preference/preference.component';
import {UserMockUpService} from '../../@MockUp/user-mock-up.service';
import {AdTileDirective} from './directives/ad-tile.directive';
import {Setting} from '../../@core/model/setting';


@Component({
  selector: 'wisa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren(AdTileDirective) matGridTile!: AdTileDirective;

  @Output() tiles: Array<Tile>;
  @Output() data$: EventEmitter<IDatapoint> = new EventEmitter<IDatapoint>();

  profile: Profile;

  private dataset: Array<IDatapoint>;
  private $times: Observable<number>;
  private $timeRangeChange: Observable<{ start: Date; end: Date }>;
  private $playingOcarina: Observable<boolean>;
  private query: Query;

  // Query Parameter;
  private vendor: Array<string> = ['VAT', 'OBE', 'DWT'];
  private timeRange: {
    start: string,
    end: string,
  };

  trackByFn(index: number, item: Tile): void {
    // console.log(item.text);
  }

  constructor(@Inject(QueryBuilderService) private queryBuilderService: QueryBuilderService,
              private dataAccessMockupService: DataAccessMockupService,
              private dataAccessService: DataAccessService,
              private userMochUpService: UserMockUpService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog) {
    this.query = dataAccessMockupService.query;
    this.dataset = dataAccessMockupService.datapoints;
    this.profile = userMochUpService.profile;
    // ----Mockup End-----
    this.timeRange = {start: '2017-01-01', end: '2017-01-02'};
    this.$playingOcarina = new Observable<boolean>(
      subscriber => timer(3000).subscribe(() => subscriber.next(true))
    );
    this.$times = interval(50).pipe(map(() => Date.now()));
    this.$times = ocarina.$playOcarina.asObservable();
    this.$playingOcarina = ocarina.$isPlaying.asObservable();
    this.$timeRangeChange = ocarina.timeRangeChange$;
  }

  ngAfterViewInit(): void {
    console.log(this.matGridTile);
  }

  ngOnInit(): void {
    console.log('Start DashboardComponente');


    this.getCurrentData();

    this.$playingOcarina.subscribe(
      isPlaying => {
        if (isPlaying) {
          // todo getCurrentData unsubscriben
          this.getHistoricData();
        } else if (!isPlaying) {
          // todo getHistoricData unsubscriben
          this.getCurrentData();
        }
      });

    this.$timeRangeChange.subscribe(timeRange => {
      console.log(timeRange.start.toISOString());
      this.timeRange = {
        start: timeRange.start.toISOString(),
        end: timeRange.end.toISOString()
      };
    });
  }

  loadTiles(): void {
  }

  getCurrentData(): void {
    console.log('Datastream is not implement yet');
  }

  getHistoricData(): void {
    console.log('start Historical');

    this.profile.tiles.forEach(tile => {
      console.log(tile.pos);
      this.dataAccessService
        // Get data from Offis - when the response is finished, it will send one dataset
        .getDataSet(this.createQuery(tile.setting.channel, tile.setting.turbine, tile.setting.frequence, tile.setting.func))
        .subscribe(dataset => {
          console.log(dataset);
          this.$times
            .subscribe(time => { // tick the timer
              if (dataset.length &&
                new Date(dataset[0]._stop).getTime() >= new Date(time).getTime() &&
                new Date(dataset[0]._start).getTime() < new Date(time).getTime()) {
                const datapoint = dataset.shift();
                this.data$.emit(datapoint);
              }
            });
        });
    });
  }

  private createQuery(channel: string, turbine: string, freq: { value: number, unit: string }, func: string): IQuery {

    const queryBuilderService = new QueryBuilderService();

    return queryBuilderService
      .vendor(this.vendor[0])
      .start(this.timeRange.start)
      .end(this.timeRange.end)
      .func(func)
      .freq(freq.value.toString().concat(freq.unit))
      .addTurbine(turbine)
      .addChannel(channel)
      .getQuery();
  }

  openPreference(id: number): void {

    const dialogRef = this.dialog.open(PreferenceComponent, {data: this.profile.tiles[id].setting});

    dialogRef.afterClosed().subscribe((setting: Setting) => {
      if (setting) {
        this.profile.tiles[id].setting = setting;
        // Todo reload Tile unsubscribe
        console.log(`Dialog result:`, this.profile.tiles[id].setting);
      }
    });
  }

  removeTile(): void {
    console.info(' Remove Tile');
  }
}
