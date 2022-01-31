import {Component, Inject, OnInit, Output} from '@angular/core';
import {AnalyseOrder} from '../../model/dto/IAnalyseOrder';
import {formatDate} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DEMONSTRATOR} from '../../../wisa.tokens';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ITileSetting} from '../../model/Usermangemant/ITileSetting';

@Component({
  selector: 'wisa-analysis',
  template: `
    <div class="datapicker">
      <mat-form-field appearance="fill">
        <mat-label>Zeitraum für die manuelle Analyse</mat-label>
        <mat-date-range-input [formGroup]="range" [rangePicker]="picker" [max]="maxDate">
          <input matStartDate formControlName="start" placeholder="Start date">
          <input matEndDate formControlName="end" placeholder="End date" >
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
        <mat-error *ngIf="range.controls.start.hasError('matStartDateInvalid')">Invalid start date</mat-error>
        <mat-error *ngIf="range.controls.end.hasError('matEndDateInvalid')">Invalid end date</mat-error>
      </mat-form-field>
    </div>
    <button mat-button cdkFocusInitial (click)="startAnalysis()">Start</button>
    <button mat-button mat-dialog-close>Abbrechen</button>
  `,
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {
  @Output() range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  maxDate: Date;
  constructor(@Inject(MAT_DIALOG_DATA) public settings: ITileSetting,
              @Inject(DEMONSTRATOR) private managerUrl: string,
              private client: HttpClient,
              private fb: FormBuilder) {
    this.maxDate = new Date(Date.now());

  }

  ngOnInit(): void {
  }
  startAnalysis(): void {
    const start: Date = this.range.controls.start.value;
    const end: Date = this.range.controls.end.value;
    const format = 'yyyy-MM-dd HH:mm:ssZ';
    const body = new AnalyseOrder(
      formatDate(start, format, 'de-DE', 'Europe/Berlin'),
      formatDate(end, format, 'de-DE', 'Europe/Berlin') , 'N1-1', 'OBE');
    this.client.post(this.managerUrl.concat('/api/analyse/pitch_deviation'), body).subscribe();
  }
}
