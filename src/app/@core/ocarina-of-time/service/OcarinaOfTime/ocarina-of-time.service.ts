import {EventEmitter, Injectable, QueryList, ViewChildren} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {DataAccessMockupService} from '../../../../@MockUp/data-access-mockup.service';
import {WebSocketService} from '../../../service/RestAPI/web-socket.service';
import {HistoricData} from '../../../model/IHistoricData';
import {ITile} from '../../../model/Usermangemant/ITile';
import {ConditionMonitoringComponent} from '../../../condition-monitoring/condition-monitoring.component';

const UNIT = {sec: 1, min: 60, hour: 3600, day: (3600 * 24)};

@Injectable({
  providedIn: 'root'
})
export class OcarinaOfTimeService {

  @ViewChildren(ConditionMonitoringComponent) myValue: QueryList<ConditionMonitoringComponent>;

  $playOcarina: EventEmitter<Date> = new EventEmitter<Date>();
  $isPlaying: EventEmitter<boolean> = new EventEmitter<boolean>();
  timeRangeChange$: EventEmitter<{ start: Date; end: Date }> = new EventEmitter<{ start: Date; end: Date }>();

  private clock$: Subscription;
  private frequency: number;
  private start: Date = new Date();
  private end: Date = new Date();
  private factor: number;
  private wasPlay = false;

  private currentDate: Date;
  private vendor: string;
  private timeRange: { start: Date; end: Date };


  constructor(private dataAccessMockupService: DataAccessMockupService, private webSocketService: WebSocketService) {
    this.frequency = 1;
    this.beginPresentTime();
    this.$isPlaying.subscribe((value) =>
      console.log('Ocarina Service played ', value)
    );
    this.timeRangeChange$.subscribe(value => this.timeRange = value);
  }

  beginPresentTime(): void {
    if (!this.wasPlay) {
      this.clock$ = interval(this.frequency * 1000).subscribe(value => this.$playOcarina.emit(new Date(Date.now())));
    } else {
      this.clock$.unsubscribe();
      this.clock$ = interval(1000).subscribe(value => this.$playOcarina.emit(new Date(Date.now())));
      this.wasPlay = false;
    }
  }

  Request2Demonstrator(): void {
    // todo erzuge Job für Datenabfrage
    // todo sende job an Demonstrator
    this.webSocketService.crateJob(this.timeRange.start, this.timeRange.end);
  }
  responseFromDemonstrator(): void {
//    this.webSocketService.controlJob(currentDate);
  }

  playOcarinaOfTime(start: Date, end = new Date(Date.now()), factor = 1): void {

    this.clock$.unsubscribe();
    this.wasPlay = true;
    this.start = start;
    this.factor = factor;
    this.end = end;
    this.playOcarina();
  }

  pause(): void {
    this.clock$.unsubscribe();
  }

  changeSpeedOfPlaying(factor: number): void {
    this.clock$.unsubscribe();
    console.log(factor);
    this.factor = factor;
    this.playOcarina();
  }

  private playOcarina(): void {
    this.clock$ = interval((1000))
      .pipe(takeWhile(() => this.start < this.end))
      .pipe(map(() => {
        return new Date(this.start.setSeconds(this.start.getSeconds() + this.factor));
      }))
      .subscribe(currentDate => {
        this.$playOcarina.emit(currentDate);
        this.webSocketService.controlJob(currentDate);
      });
  }

}
