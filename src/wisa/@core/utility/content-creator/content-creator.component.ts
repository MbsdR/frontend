import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, Directive,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {LineChartComponent} from '../depiction/echarts/line-chart/line-chart.component';
import {ITile, Tile} from '../../model/Usermangemant/ITile';
import {ITileSetting} from '../../model/Usermangemant/ITileSetting';
import {mergeWith, Observable, tap} from 'rxjs';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {IGraphic} from '../depiction/IGraphic';
import {SseService} from '../../service/server-send-event/sse-service';
import {WebSocketService} from '../../service/webSocket/web-socket.service';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
import {PreferenceComponent} from '../preference/preference.component';
import {CHANNELS} from '../../model/Constants/mapping';
import {AnalysisComponent} from '../analysis/analysis.component';
import {GRAPHICS} from './constant';
import {ContentCreatorService} from './content-creator.service';
import {SessionService} from '../../service/Session/session.service';
import {ManagerAPIService} from "../../service/RestAPI/manager-api.service";
import {IProfile} from "../../model/Usermangemant/IProfile";
import {UNITS} from "../../model/Constants/ChartSettingConstants";
import {UserMockUpService} from "../../../@MockUp/user-mock-up.service";
import {UsermanagementService} from "../../service/Usermanagement/usermanagement.service";

@Directive({
  selector: '[wisaGraphic]'
})
export class GraphicsDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}

@Component({
  selector: 'wisa-content-creator',
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
            <button *ngIf="isAnalytics" mat-menu-item (click)="openAnalysis()">
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
            <button mat-menu-item (click)="removeTile(this.tile)">
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
  styleUrls: ['./content-creator.component.css']
})
export class ContentCreatorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(LineChartComponent, {static: true}) charts!: LineChartComponent;
  @ViewChild(GraphicsDirective, {static: true}) graphicRef!: GraphicsDirective;

  @Output() newTile = new EventEmitter<Tile>();

  @Input() tile: ITile;
  @Input() turbine: string;
  @Input() isPlaying: boolean;
  @Input() isAnalytics: boolean;

  setting: ITileSetting;
  title: string;
  inProgress: boolean;
  mainstream: Observable<IDatapoint>;
  profile: IProfile;


  private $openOcarina: Observable<boolean>;
  private graphicType: string;
  private componentRef: ComponentRef<IGraphic>;

  constructor(userMockUpService: UserMockUpService,
              private sseService: SseService,
              private sessionService: SessionService,
              private websocket: WebSocketService,
              private ocarina: OcarinaOfTimeService,
              private contentCreator: ContentCreatorService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog,
              private userManagementService: UsermanagementService) {
    this.$openOcarina = ocarina.$isOpen.asObservable();
    this.profile = userManagementService.profile;
  }

  ngOnInit(): void {
    this.setting = this.tile.setting;
    this.title = this.tile.title;
    this.graphicType = this.tile.setting.type;
    console.log('Which Feature ', this.setting.feature);
    console.log(this.isAnalytics);
  }

  ngAfterViewInit(): void {
    this.loadGraphic(this.setting.type);
    const lists = this.sessionService.storage.get(this.setting.feature);
    if (lists) {
      this.componentRef.instance.initDataset(lists);
    }
    // Start Datastream from Historic and RealTime
    this.mainstream = this.sseService.datastream$.asObservable().pipe(mergeWith(
      this.websocket.historicData$.asObservable()));

    this.mainstream
      .pipe(filter(datapoint => this.setting.feature in datapoint ? true : false))
      .subscribe((datapoint) => {
        this.componentRef.instance.updateChart(datapoint, this.turbine);
      });
  }

  ngOnDestroy(): void {
    console.log('Destroy');
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

  removeTile(tile): void {
    console.log(tile);
    console.log(this.profile.settings.cms);

    const index = this.profile.settings.cms.indexOf(tile);
    console.log(index);
    //this.profile.settings.cms.splice(index, 1);
    console.log(this.profile.settings.cms);
    console.info(' Remove Tile');
  }

  private loadGraphic(chart: string): void {
    const viewContainerRef = this.graphicRef.viewContainerRef;
    console.log('view container', viewContainerRef);
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<IGraphic>(GRAPHICS[chart]);
    this.componentRef.instance.setting = this.setting;
  }

}
