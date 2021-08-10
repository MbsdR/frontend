import {EventEmitter, Injectable} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {DataAccessMockupService} from '../../../../@MockUp/data-access-mockup.service';

const UNIT = {sec: 1, min: 60, hour: 3600, day: (3600 * 24)};

@Injectable({
  providedIn: 'root'
})
export class OcarinaOfTimeService {

  $playOcarina: EventEmitter<number> = new EventEmitter<number>();
  $isPlaying: EventEmitter<boolean> = new EventEmitter<boolean>();
  timeRangeChange$: EventEmitter<{ start: Date; end: Date }> = new EventEmitter<{ start: Date; end: Date }>();

  private clock$: Subscription;
  private frequence: number;
  private start: number;
  private end: number;
  private factor: number;
  private wasPlay = false;


  constructor(private dataAccessMockupService: DataAccessMockupService) {
    this.frequence = 1;
    this.beginPresentTime();
    this.$isPlaying.subscribe((value) =>
      console.log('Ocarina Service played ', value)
    );
  }

  beginPresentTime(): void {
    if (!this.wasPlay) {
      this.clock$ = interval(this.frequence * 1000).pipe(map(() => this.$playOcarina.emit(Date.now()))).subscribe();
    } else {
      this.clock$.unsubscribe();
      this.clock$ = interval(1000).pipe(map(() => this.$playOcarina.emit(Date.now()))).subscribe();
      this.wasPlay = false;
    }

  }

  playOcarinaOfTime(start: number, end = Date.now(), factor = 1): void {
    this.clock$.unsubscribe();
    this.wasPlay = true;
    this.start = start;
    this.factor = factor;
    this.end = end;
    new Date(this.dataAccessMockupService.query.start).getTime();
    this.playOcarina();
  }

  pause(): void {
    this.clock$.unsubscribe();
  }

  changeSpeedOfPlaying(factor: number): void {
    this.clock$.unsubscribe();
    this.factor = factor;
    this.playOcarina();
  }

  private playOcarina(): void {
    this.clock$ = interval((1000 / this.factor))
      .pipe(takeWhile(currentDatetime => currentDatetime <= this.end))
      .pipe(map(() => {
        this.start += 1000;
        this.$playOcarina.emit(this.start);
      })).subscribe();
  }

}
