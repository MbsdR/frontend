import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {OcarinaOfTimeService} from '../../service/OcarinaOfTime/ocarina-of-time.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

const SPEED = [1, 2, 8, 32, 128];

@Component({
  selector: 'wisa-ocarina-of-time',
  template: `
    <div class="ocarina">
      <div class="datapicker">
      <mat-form-field appearance="fill">
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input [formGroup]="range" [rangePicker]="picker" [max]="maxDate">
          <input matStartDate formControlName="start" placeholder="Start date" (dateChange)="addEvent('start', $event)">
          <input matEndDate formControlName="end" placeholder="End date" (dateChange)="addEvent('end', $event)">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
      </div>
      <!-- -->
      <div class="control">
        <button mat-icon-button (click)="reduceSpeed()">
          <mat-icon>fast_rewind</mat-icon>
        </button>
        <span>{{ocarinaService.$ocarinDateStream | async | date: 'dd. LLL. yyyy'}}</span>
        <button mat-icon-button (click)="play()">
          <mat-icon>{{font}}</mat-icon>
        </button>
        <span>{{ocarinaService.$ocarinDateStream | async | date: 'HH:mm:ss'}}</span>
        <button mat-icon-button (click)="raiseSpeed()">
          <mat-icon>fast_forward</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./ocarina-of-time.component.css']
})
export class OcarinaOfTimeComponent{

  @Output() range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  public font;

  private factor: number;
  private isPlaying: boolean;
  private timeRange$: EventEmitter<{ 'start': Date, 'end': Date }>;
  maxDate: Date;

  constructor(public ocarinaService: OcarinaOfTimeService) {
    this.timeRange$ = ocarinaService.changeQuery$;
    this.maxDate = new Date(Date.now());
    this.factor = 0;

    ocarinaService.$isOpen.subscribe((visible) => {
      visible ? this.init() : this.destroy();
    });
  }

  init(): void{
    console.log('Init');
    this.font = 'play_circle_filled';
    this.isPlaying = false;
  }

  destroy(): void {
  }

  play(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.font = 'play_circle_filled';
      this.ocarinaService.pause();
    } else if (!this.isPlaying) {
      this.isPlaying = true;
      this.font = 'pause';
      this.ocarinaService.playOcarinaOfTime();
    }
  }

  raiseSpeed(): void {
    this.factor += 1;
    if (this.factor > SPEED.length - 1) {
      this.factor = 0;
    }
    this.ocarinaService.changeSpeedOfPlaying(SPEED[this.factor]);
  }

  reduceSpeed(): void {
    this.factor -= 1;
    if (this.factor < 0) {
      this.factor = SPEED.length - 1;
    }
    this.ocarinaService.changeSpeedOfPlaying(SPEED[this.factor]);
  }

  addEvent(change: string, $event: MatDatepickerInputEvent<Date, any>): void {
    if ($event.value) {
      if ($event.value >= new Date(Date.now())) {
        $event.value = new Date(Date.now());
      }
      if (change === 'start') {
        this.timeRange$.emit({start: $event.value, end: new Date(Date.now())});
      }
      if (change === 'end') {
        this.timeRange$.emit({start: this.range.controls.start.value, end: $event.value});
        console.log($event.value);
      }
    }
  }
}
