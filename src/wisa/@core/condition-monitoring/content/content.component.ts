import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PreferenceComponent} from '../../utility/preference/preference.component';
import {ITileSetting} from '../../model/Usermangemant/ITileSetting';
import {MatDialog} from '@angular/material/dialog';
import {mergeWith, Observable} from 'rxjs';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {LineChartComponent} from '../../depiction/echarts/line-chart/line-chart.component';
import {CHANNELS} from '../../model/Constants/mapping';
import {GRAPHICS} from '../constance';
import {Graphic} from '../../depiction/graphic';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {ITile, Tile} from '../../model/Usermangemant/ITile';
import {RealTimeService} from '../../service/real-time/real-time.service';
import {WebSocketService} from '../../service/RestAPI/web-socket.service';
import {filter} from 'rxjs/operators';
import {Finding, IFindings} from '../../model/dto/IFindings';
import {AnalysisComponent} from '../../utility/analysis/analysis.component';

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
    <mat-card class="dashboard-card"> <!-- style="background-color: #6cb21b"> -->
      <mat-card-header>
        <mat-card-title>
          {{title}}
        </mat-card-title>
        <div>
          <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu" xPosition="before">
            <button mat-menu-item (click)="openAnalysis()">
              <mat-icon>assessment</mat-icon>
              Analyse starten
            </button>
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
              Entfernen
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

  @Output() newTile = new EventEmitter<Tile>();

  @Input() tile: ITile;
  @Input() turbine: string;
  @Input() isPlaying: boolean;

  setting: ITileSetting;
  title: string;
  inProgress: boolean;
  mainstream: Observable<IDatapoint>;



  private $openOcarina: Observable<boolean>;
  private graphicType: string;
  private componentRef: ComponentRef<Graphic>;
  alarm: string;

  constructor(private realTimeService: RealTimeService,
              private websocket: WebSocketService,
              private ocarina: OcarinaOfTimeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {
    this.$openOcarina = ocarina.isOcarinaOpen$.asObservable();
  }

  ngOnInit(): void {
    this.setting = this.tile.setting;
    this.title = this.tile.title;
    this.graphicType = this.tile.setting.type;
    console.log('Which Feature ', this.setting.feature);
    this.alarm = 'red';
  }

  ngAfterViewInit(): void {
    this.loadGraphic();
    // Start Datastream from Historic and RealTime
    this.mainstream = this.realTimeService.datastream$.asObservable().pipe(mergeWith(
      this.websocket.historicData$.asObservable()));

    this.mainstream
      .pipe(filter(datapoint =>  this.setting.feature in datapoint ? true : false ))
      .subscribe((datapoint) => {
        this.componentRef.instance.updateChart(datapoint, this.turbine);
    });
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.realTimeService.rm();
  }

  openPreference(): void {
    console.log(this.tile.setting);
    const dialogRef = this.dialog.open(PreferenceComponent, {data: this.tile.setting});

    dialogRef.afterClosed().subscribe((setting: ITileSetting) => {
      if (setting) {
        this.tile.setting = setting;
        this.newTile.emit(this.tile);
        // Todo reload Tile unsubscribe
        console.log(`Dialog result:`, this.tile.setting);
        this.title = CHANNELS[this.setting.feature].label.de;
        this.ngAfterViewInit();
      }
    });
  }

  openAnalysis(): void {
    console.log(this.tile.setting);
    const dialogRef = this.dialog.open(AnalysisComponent, {data: this.tile.setting});

    dialogRef.afterClosed().subscribe((setting: ITileSetting) => {
      if (setting) {
        this.tile.setting = setting;
        this.newTile.emit(this.tile);
        // Todo reload Tile unsubscribe
        console.log(`Dialog result:`, this.tile.setting);
        this.title = CHANNELS[this.setting.feature].label.de;
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
                      func: string): void {

    /*new Query('VAT')
      .start(start.toISOString())
      .end(end.toISOString())
      .func(func)
      .freq(freq.value.toString().concat(freq.unit))
      .addTurbine(turbine)
      .addChannel(channel)
      .getQuery();
      */
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
