import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Tile} from '../../model/IProfile';
import {PreferenceComponent} from '../../utility/preference/preference.component';
import {ISetting} from '../../model/ISetting';
import {MatDialog} from '@angular/material/dialog';
import {IQuery} from '../../model/IQuery';
import {QueryBuilder} from '../../utility/queryBuilder/query-builder';
import {DataAccessService} from '../../service/Data-Access/data-access.service';
import {Observable, Subscriber} from 'rxjs';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {LineChartComponent} from '../charts/echarts/line-chart/line-chart.component';
import {CHANNELS} from '../../model/mapping';

@Component({
  selector: 'wisa-tile-content',
  template: `

    <mat-card class="dashboard-card">
      <mat-card-header>
        <mat-card-title>
          <h1>{{title}}</h1>
          <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu" xPosition="before">
            <button mat-menu-item (click)="openPreference()">
              <mat-icon>settings</mat-icon>
              Einstellung
            </button>
            <button mat-menu-item (click)="export()">
              <mat-icon>file_download</mat-icon>
              Exportieren
            </button>
            <button mat-menu-item (click)="removeTile()">
              <mat-icon>delete</mat-icon>
              Löschen
            </button>
          </mat-menu>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="dashboard-card-content">
        <!-- <ng-template wisaGraphic></ng-template> -->
        <!-- Content -->
       <wisa-line-chart [setting]="setting"></wisa-line-chart>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {

  @ViewChild(LineChartComponent) charts!: LineChartComponent;

  @Input() tile: Tile;
  @Input() turbine: string;

  setting: ISetting;
  title: string;

  private $timeRangeChange: Observable<{ start: Date; end: Date }>;
  private $playingOcarina: Observable<boolean>;
  private $time: Observable<number>;
  private vendor: Array<string>;
  private timeRange: { start: Date, end: Date };

  constructor(private dataAccessService: DataAccessService,
              private ocarina: OcarinaOfTimeService,
              private dialog: MatDialog) {

    this.vendor = ['VAT', 'OBE', 'DWT'];

    this.timeRange = {start: new Date('2017-01-01'), end: new Date('2017-01-02')};

    this.$time = ocarina.$playOcarina.asObservable();
    this.$playingOcarina = ocarina.$isPlaying.asObservable();
    this.$timeRangeChange = ocarina.timeRangeChange$;
  }

  ngOnInit(): void {
    this.setting = this.tile.setting;
    this.title = this.tile.title;

    this.$timeRangeChange.subscribe(timeRange => {
      this.timeRange = timeRange;
    });
  }

  ngAfterViewInit(): void {

    this.$playingOcarina.subscribe(isPlaying => {
      if (isPlaying) {
        // todo getCurrentData unsubscriben
        this.getHistoricData();
      } else if (!isPlaying) {
        // todo getHistoricData unsubscriben
        this.getCurrentData();
      }
    });
  }

  getCurrentData(): void {
    console.log('Live Datastream is not implement yet');
    // this.$time.subscribe(value => console.log(new Date(value)));
  }

  getHistoricData(): void {
    const query = this.createQuery(
      this.tile.setting.channel,
      this.turbine,
      this.timeRange.start,
      this.timeRange.end,
      this.tile.setting.frequence,
      this.tile.setting.func);
    this.dataAccessService.getDataSet(query).then(dataset => {
      this.$time.subscribe(time => {
        while (dataset &&
        new Date(dataset[0]._start).getTime() < new Date(time - 3600).getTime()) {
          const datapoint = dataset.shift();
          this.charts.updateChart(datapoint);
        }
      });
    });
  }

  openPreference(): void {
    console.log(this.tile.setting);
    const dialogRef = this.dialog.open(PreferenceComponent, {data: this.tile.setting});

    dialogRef.afterClosed().subscribe((setting: ISetting) => {
      if (setting) {
        this.tile.setting = setting;
        // Todo reload Tile unsubscribe
        console.log(`Dialog result:`, this.tile.setting);
        this.title = CHANNELS[this.setting.channel].label.de;
        this.ngAfterViewInit();
      }
    });
  }

  export(): void{}

  removeTile(): void {
    console.info(' Remove Tile');
  }

  private createQuery(channel: string,
                      turbine: string,
                      start: Date,
                      end: Date,
                      freq: { value: number, unit: string },
                      func: string): IQuery {

    return new QueryBuilder()
      .start(start.toISOString())
      .end(end.toISOString())
      .func(func)
      .freq(freq.value.toString().concat(freq.unit))
      .addTurbine(turbine)
      .addChannel(channel)
      .getQuery();
  }
}
