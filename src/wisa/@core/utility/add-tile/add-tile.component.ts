import {Component, Inject, OnInit} from '@angular/core';
import {UNITS} from "../../model/Constants/ChartSettingConstants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProfile} from "../../model/Usermangemant/IProfile";
import {SettingMockUpService} from "../../../@MockUp/setting-mock-up.service";
import {UsermanagementMockupService} from "../../../@MockUp/usermanagement-mockup.service";

@Component({
  selector: 'wisa-add-tile',
  template: `
    <h2 mat-dialog-title>Kachelauswahl von {{data.name}}</h2>
    <mat-dialog-content>
      <mat-grid-list cols="2" rowHeight="2:0.9" gutterSize="10px">

        <mat-grid-tile [colspan]="1">
          <button mat-button (click)="addTile(tmplPitch)">
            <mat-card class="dashboard-card">
              <mat-card-header>
                <mat-card-title>
                  Pitchabweichunhg
                </mat-card-title>
                <div>
                  <mat-icon>more_vert</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-content class="dashboard-card-content">
                Insert Graphic
              </mat-card-content>
            </mat-card>
          </button>
        </mat-grid-tile>


        <mat-grid-tile [colspan]="1">
          <button mat-button (click)="addTile(tmplCorr)">
            <mat-card class="dashboard-card">
              <mat-card-header>
                <mat-card-title>
                  Korrelationsmatizen
                </mat-card-title>
                <div>
                  <mat-icon>more_vert</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-content class="dashboard-card-content">
                Insert Graphic
              </mat-card-content>
            </mat-card>
          </button>
        </mat-grid-tile>


        <mat-grid-tile [colspan]="1">
          <button mat-button (click)="addTile(tmplForecast)">
            <mat-card class="dashboard-card">
              <mat-card-header>
                <mat-card-title>
                  Fehlerfrüherkennung
                </mat-card-title>
                <div>
                  <mat-icon>more_vert</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-content class="dashboard-card-content">
                Insert Graphic
              </mat-card-content>
            </mat-card>
          </button>
        </mat-grid-tile>


        <mat-grid-tile [colspan]="1">
          <button mat-button (click)="addTile(tmplTemp)">
            <mat-card class="dashboard-card">
              <mat-card-header>
                <mat-card-title>
                  Temperaturüberwachung
                </mat-card-title>
                <div>
                  <mat-icon>more_vert</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-content class="dashboard-card-content">
                Insert Graphic
              </mat-card-content>
            </mat-card>
          </button>
        </mat-grid-tile>

      </mat-grid-list>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="true">OK</button>
      <button mat-button mat-dialog-close="false">Schließen</button>
    </mat-dialog-actions>


  `,
  styleUrls: ['./add-tile.component.css']
})
export class AddTileComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingMockUpService,
    private userManagementService: UsermanagementMockupService) {}

  dialogResult(){
    this.dialogRef.close({});
  }

  addTile(tmpl: { pos: number; rows: number; title: string; cols: number; color:string; setting: { feature: string; func: string; threshold: { warn: number; alarm: number }; type: string; graphicSetting: { showSymbol: boolean }; frequency: { unit: string; value: number } } }){
    this.dialogRef.close(tmpl)
    this.settingService.obeTiles.cms.push(tmpl)
  }


  //template
  readonly tmplPitch = {
    pos:2,
    cols:2,
    rows:1,
    title:"Pitchabweichung",
    color: 'lightblue',
    setting: {
      feature: 'CDI.VA_PitchPositionBlade1',
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
        threshold: {warn:3, alarm:3},
        graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplCorr  = {
    pos:3,
    cols:2,
    rows:1,
    title:"Korrelation",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplForecast = {
    pos:4,
    cols:2,
    rows:1,
    title:"Forecast",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }

  readonly tmplTemp = {
    pos:5,
    cols:2,
    rows:1,
    title:"Temperaturüberwachung",
    color: 'lightblue',
    setting: {
      feature: "wind",
      func: "mean",
      frequency: {value: 30, unit: UNITS.min.value},
      type: "line",
      threshold: {warn:3, alarm:3},
      graphicSetting: {showSymbol:true}
    }
  }








}
