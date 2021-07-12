import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {OcarinaOfTimeService} from '../../@core/service/OcarinaOfTime/ocarina-of-time.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent} from '@angular/material/datepicker';

const SPEED = [1, 2, 8, 32, 128];

@Component({
  selector: 'wisa-ocarina-of-time',
  templateUrl: './ocarina-of-time.component.html',

  styleUrls: ['./ocarina-of-time.component.css']
})
export class OcarinaOfTimeComponent {

  @Input() ocarinaEnable: EventEmitter<boolean>;
  @Output() currentDatetime$: Observable<number>;
  @Output() range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ocarinaTime$: Observable<number>;
  date;

  private factor = 1;
  public font = 'play_circle_filled';
  private isPlayed = false;
  private beginPlaying$: EventEmitter<boolean>;
  private timeRange$: EventEmitter<{ 'start': Date, 'end': Date }>;

  constructor(private ocarina: OcarinaOfTimeService) {
    this.ocarinaTime$ = ocarina.$playOcarina.asObservable();
    this.beginPlaying$ = ocarina.$isPlaying;
    this.timeRange$ = ocarina.timeRangeChange$;
  }

  play(): void {
    if (this.isPlayed) {
      this.isPlayed = false;
      this.font = 'play_circle_filled';
      this.ocarina.pause();
    } else if (!this.isPlayed) {
      this.isPlayed = true;
      this.font = 'pause';
      this.ocarina.playOcarinaOfTime(new Date(this.range.value.start).getTime());
      this.beginPlaying$.emit(true);
    }
  }

  raiseSpeed(): void {
    this.factor += 1;
    if (this.factor > SPEED.length) {
      this.factor = 0;
    }
    this.ocarina.changeSpeedOfPlaying(SPEED[this.factor]);
  }

  reduceSpeed(): void {
    this.factor -= 1;
    if (this.factor < 0) {
      this.factor = SPEED.length - 1;
    }
    this.ocarina.changeSpeedOfPlaying(SPEED[this.factor]);
  }

  addEvent(change: string, $event: MatDatepickerInputEvent<Date, any>): void {
    console.log({start: new Date(this.range.controls.start.value), end: new Date(this.range.controls.end.value)});
    this.timeRange$.emit({start: new Date(this.range.controls.start.value), end: new Date(this.range.controls.end.value)});
  }
}
