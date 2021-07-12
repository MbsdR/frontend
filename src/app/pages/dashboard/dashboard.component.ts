import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DataAccessService} from '../../@core/service/Data-Access/data-access.service';
import {interval, Observable, timer} from 'rxjs';
import {Query} from '../../@core/model/query';
import {DataAccessMockupService} from '../../@MockUp/data-access-mockup.service';
import {Tile} from '../../@core/model/tile';
import {DashboardMockUpService} from '../../@MockUp/dashboard-mock-up.service';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {map} from 'rxjs/operators';
import {QueryBuilderService} from '../../@core/service/queryBuilder/query-builder.service';
import {Datapoint} from '../../@core/model/datapoint';
import {Profile, Setting} from '../../@core/model/profile';
import {MatDialog} from '@angular/material/dialog';
import {PreferenceComponent} from '../../@core/utility/preference/preference.component';
import {Form, FormGroup} from '@angular/forms';


@Component({
  selector: 'wisa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @Output() tiles: Array<Tile>;
  @Output() data$: EventEmitter<Datapoint> = new EventEmitter<Datapoint>();

  profiles: Array<Profile>;

  private dataset: Array<Datapoint>;
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

  constructor(@Inject(QueryBuilderService) private queryBuilderService: QueryBuilderService,
              private dataAccessMockupService: DataAccessMockupService,
              private dashboardMockUpService: DashboardMockUpService,
              private dataAccessService: DataAccessService,
              private ocarina: OcarinaOfTimeService,
              private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog) {
    this.query = dataAccessMockupService.query;
    this.tiles = dashboardMockUpService.tiles;
    this.dataset = dataAccessMockupService.datapoints;
    this.timeRange = {start: '2017-01-01', end: '2017-01-02'};
    this.$playingOcarina = new Observable<boolean>(
      subscriber => timer(3000).subscribe(() => subscriber.next(true))
    );
    this.$times = interval(50).pipe(map(() => Date.now()));
    this.$times = ocarina.$playOcarina.asObservable();
    this.$playingOcarina = ocarina.$isPlaying.asObservable();
    this.$timeRangeChange = ocarina.timeRangeChange$;
    this.profiles = [];
    this.profiles.push({channel: 'WindSpeed', unit: 'm/s', turbina: 'A01', cols: 2, rows: 1});
    this.profiles.push({channel: 'ActivePower', unit: 'kW', turbina: 'A01', cols: 2, rows: 1});
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

  getCurrentData(): void {
    console.log('Datastream is not implement yet');
  }

  getHistoricData(): void {
    console.log('start Historical');
    this.dataAccessService
      .getDataSet(this.createQuery('WindSpeed', 'A01', {value: 1, unit: 'm'}, 'mean')) // Get data from Offis - when the response is finished, it will send one dataset
      .subscribe(dataset => {
        this.dataset = dataset;
        let datapoint = this.dataset.shift();
        this.$times
          .subscribe(time => { // tick the timer
            if (this.dataset.length &&
              new Date(datapoint._stop).getTime() >= new Date(time).getTime() &&
              new Date(datapoint._start).getTime() < new Date(time).getTime()) {
              this.data$.emit(datapoint);
              datapoint = this.dataset.shift();
            }
          });
      });
  }

  private createQuery(channel: string, turbine: string, freq: { value: number, unit: string }, func: string): Query {

    const a = this.queryBuilderService
      .vendor(this.vendor[0])
      .start(this.timeRange.start)
      .end(this.timeRange.end)
      .func(func)
      .freq(freq.value.toString().concat(freq.unit))
      .addTurbine(turbine)
      .addChannel(channel);

    return a.getQuery();
  }

  openPreference(): void {
    const profile = {
      channel: {
        value: 'WindSpeed',
        label: 'Windgeschwindigkeit'
      },
      frequence: {
        value: 1,
        unit: 'sek'
      },
      diagram: {
        value: 'line',
        label: 'Liniendiagramm'
      }
    };
    const dialogRef = this.dialog.open(PreferenceComponent, {data: profile});

    dialogRef.afterClosed().subscribe((setting: any) => {
      console.log(`Dialog result:`, setting);
    });
  }

  removeTile(): void {
    console.info(' Remove Tile');
  }
}
