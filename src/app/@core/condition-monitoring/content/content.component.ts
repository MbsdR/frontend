import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef,
  EventEmitter,
  Inject,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren, ViewContainerRef
} from '@angular/core';
import {PreferenceComponent} from '../../utility/preference/preference.component';
import {ITileSetting} from '../../model/Usermangemant/ITileSetting';
import {MatDialog} from '@angular/material/dialog';
import {IQuery} from '../../model/IQuery';
import {QueryBuilder} from '../../utility/queryBuilder/query-builder';
import {DataAccessService} from '../../service/Data-Access/data-access.service';
import {Observable, Subscriber, Subscription, timer} from 'rxjs';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {LineChartComponent} from '../charts/echarts/line-chart/line-chart.component';
import {CHANNELS} from '../../model/Constants/mapping';
import {GR, GRAPHICS} from '../constance';
import {HeatmapComponent} from '../charts/d3/heatmap/heatmap.component';
import {Graphic} from '../charts/graphic';
import {IDatapoint} from '../../model/IDatapoint';
import {ITile} from '../../model/Usermangemant/ITile';

@Directive({
  selector: '[wisaGraphic]'
})
export class GraphicsDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}

@Component({
  selector: 'wisa-tile-content',
  template: `
    <mat-card class="dashboard-card">
      <mat-card-header>
        <mat-card-title>
          {{title}}
        </mat-card-title>
        <div>
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
        </div>
      </mat-card-header>
      <mat-card-content class="dashboard-card-content">

        <!-- Content  -->
        <!--  <mat-spinner *ngIf="inProgress"></mat-spinner>-->
        <ng-template wisaGraphic></ng-template>
        <!--
        <wisa-line-chart [setting]="setting"></wisa-line-chart>
        <wisa-heatmap ></wisa-heatmap>
        -->
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(LineChartComponent, {static: true}) charts!: LineChartComponent;
  @ViewChild(GraphicsDirective, {static: true}) graphicRef!: GraphicsDirective;

  @Input() tile: ITile;
  @Input() turbine: string;
  @Input() isPlaying: boolean;

  setting: ITileSetting;
  title: string;
  inProgress: boolean;
  delay: number;

  private $timeRangeChange: Observable<{ start: Date; end: Date }>;
  private $playingOcarina: Observable<boolean>;
  private $time: Observable<number>;
  private vendor: Array<string>;
  private timeRange: { start: Date, end: Date };
  private subs: Array<Subscription>;
  private graphicType: string;
  private componentRef: ComponentRef<Graphic>;

  constructor(private dataAccessService: DataAccessService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {

    this.vendor = ['VAT', 'OBE', 'DWT'];

    this.timeRange = {start: new Date('2017-01-01'), end: new Date('2017-01-02')};

    this.$time = ocarina.$playOcarina.asObservable();
    this.$playingOcarina = ocarina.$isPlaying.asObservable();
    this.$timeRangeChange = ocarina.timeRangeChange$;
    this.subs = new Array<Subscription>();
    this.inProgress = true;
    this.delay = 5000;
  }

  ngOnInit(): void {
    this.setting = this.tile.setting;
    this.title = this.tile.title;
    this.graphicType = this.tile.setting.type;
    this.subs.push(this.$timeRangeChange.subscribe(timeRange => {
      this.timeRange = timeRange;
    }));
    if (this.isPlaying) { // isPlaying
      this.getHistoricData();
    } else {
      this.getCurrentData();
    }
  }

  ngAfterViewInit(): void {
    this.loadGraphic();
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

  ngOnDestroy(): void {
    console.log('Destroy');
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  getCurrentData(): void {
    console.log('Live Datastream is not implement yet');
    timer(2000).subscribe(() => {
      this.inProgress = false;
    });

    this.subs.push(this.$time.subscribe(time => {
      const start = new Date((time - this.delay)).toISOString();
      const end = new Date(time).toISOString();

      const channel = this.setting.channel.concat('_').concat(this.turbine);
      const datapoint: IDatapoint = {
        _start: start,
        _stop: end
      };
      datapoint[channel] = (Math.random() * 100);
      this.componentRef.instance.updateChart( datapoint, this.turbine);
    })
    );
  }

  getHistoricData(): void {
    console.log('Start historic');
    const query = this.createQuery(
      this.tile.setting.channel,
      this.turbine,
      this.timeRange.start,
      this.timeRange.end,
      this.tile.setting.frequence,
      this.tile.setting.func);
    console.log(JSON.stringify(query));
    this.dataAccessService.getDataSet(query).then(dataset => {
      this.inProgress = false;
      this.subs.push(this.$time.subscribe(time => {
        while (dataset &&
        new Date(dataset[0]._start).getTime() < new Date(time - 3600).getTime()) {
          const datapoint = dataset.shift();
          this.charts.updateChart(datapoint, this.turbine);
        }
      })
      );
    });
  }

  openPreference(): void {
    console.log(this.tile.setting);
    const dialogRef = this.dialog.open(PreferenceComponent, {data: this.tile.setting});

    dialogRef.afterClosed().subscribe((setting: ITileSetting) => {
      if (setting) {
        this.tile.setting = setting;
        // Todo reload Tile unsubscribe
        console.log(`Dialog result:`, this.tile.setting);
        this.title = CHANNELS[this.setting.channel].label.de;
        this.ngAfterViewInit();
      }
    });
  }

  export(): void {
  }

  removeTile(): void {
    console.info(' Remove Tile');
  }

  private createQuery(channel: string,
                      turbine: string,
                      start: Date,
                      end: Date,
                      freq: { value: number, unit: string },
                      func: string): IQuery {

    return new QueryBuilder('VAT')
      .start(start.toISOString())
      .end(end.toISOString())
      .func(func)
      .freq(freq.value.toString().concat(freq.unit))
      .addTurbine(turbine)
      .addChannel(channel)
      .getQuery();
  }

  private loadGraphic(): void {
    const graphic = GRAPHICS.line;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(graphic);
    const viewContainerRef = this.graphicRef.viewContainerRef;
    console.log('view container', viewContainerRef);
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<Graphic>(componentFactory);
    this.componentRef.instance.setting = this.setting;

  }
}
