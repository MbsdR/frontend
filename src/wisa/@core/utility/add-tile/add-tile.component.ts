import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IProfile} from "../../model/Usermangemant/IProfile";
import {TemplateMockUoService} from "../../../@MockUp/template-mock-uo-service.ts.service";
import {UsermanagementService} from "../../service/Usermanagement/usermanagement.service";

@Component({
  selector: 'wisa-add-tile',
  template: `
    <h2 mat-dialog-title>Kachelauswahl von {{data.name}}</h2>
    <mat-dialog-content>
      <mat-grid-list cols="2" rowHeight="2:0.9" gutterSize="10px">

        <mat-grid-tile [colspan]="1">
          <button mat-button (click)="addTile(templateService.tmplPitch)">
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
          <button mat-button (click)="addTile(templateService.tmplCorr)">
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
          <button mat-button (click)="addTile(templateService.tmplForecast)">
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
          <button mat-button (click)="addTile(templateService.tmplTemp)">
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
      <button mat-button [mat-dialog-close]="profile">OK</button>
      <button mat-button mat-dialog-close="false">Schließen</button>
    </mat-dialog-actions>


  `,
  styleUrls: ['./add-tile.component.css']
})
export class AddTileComponent {

  profile: IProfile;

  constructor(
    public dialogRef: MatDialogRef<AddTileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userManagementService: UsermanagementService,
    public templateService: TemplateMockUoService) {
    this.profile = JSON.parse(JSON.stringify(userManagementService.profile))
  }

  dialogResult(){
    this.dialogRef.close({});
  }

  addTile(tmpl: { pos: number; rows: number; title: string; cols: number; color:string; setting: { feature: string; func: string; threshold: { warn: number; alarm: number }; type: string; graphicSetting: { showSymbol: boolean }; frequency: { unit: string; value: number } } }){
    this.profile.settings.cms.push(tmpl)
  }



}
