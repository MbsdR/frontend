import {EventEmitter, Injectable, QueryList, ViewChildren} from '@angular/core';
import {Observable, interval, tap, partition, of, switchAll, fromEvent, Subscription, timeout, timer} from 'rxjs';
import {WebSocketService} from '../../../service/webSocket/web-socket.service';
import {ConditionMonitoringComponent} from '../../../condition-monitoring/condition-monitoring.component';
import {filter, map, take} from 'rxjs/operators';
import {SseService} from '../../../service/server-send-event/sse-service';
import {ManagerAPIService} from '../../../service/RestAPI/manager-api.service';


@Injectable({
  providedIn: 'root'
})
export class OcarinaOfTimeService {

  @ViewChildren(ConditionMonitoringComponent) myValue: QueryList<ConditionMonitoringComponent>;

  $ocarinDateStream: EventEmitter<Date> = new EventEmitter<Date>();
  $isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  changeQuery$ = new EventEmitter<{ start: Date; end: Date }>();
  timeRange: { start: Date; end: Date };
  isPause: boolean;

  private newReview: boolean;
  private frequency: number;
  private unit: number;
  private newDate: Date;
  private sub: Subscription;

  constructor(private apiService: ManagerAPIService) {
    this.frequency = 1;
    this.unit = 1;
    this.isPause = true;
    this.newReview = true;
    this.$isOpen.subscribe((isOpen) => {
      console.log('Ocarina Service played ', isOpen);
    });

    this.changeQuery$.subscribe((timeRange) => {
      this.timeRange = timeRange;
      // this.Request2Demonstrator();
      this.newDate = this.timeRange.start;
      this.newReview = true;
      this.$ocarinDateStream.emit(this.newDate);
      console.log('change Settings');
    });

    this.sub = of('Pause').pipe(filter(() => this.isPause), tap(() => console.log('Pause')))
      .pipe(
        map(x => interval(1000).pipe(
          filter(() => !this.isPause),
          tap((() => this.send(this.newDate))),
          map(() => new Date(this.newDate.getTime() + this.frequency * 1000 * this.unit)))))
      .pipe(
        switchAll()).subscribe(oldDate => {
        this.$ocarinDateStream.emit(oldDate);
        this.newDate = oldDate;
      });
  }

  private Request2Demonstrator(): void {
    this.apiService.historicData(this.timeRange.start, this.timeRange.end);
  }

  playOcarinaOfTime(): void {
    if (this.newReview){
      this.Request2Demonstrator();
      this.newReview = false;
    }
    this.isPause = !this.isPause;
  }

  pause(): void {
    this.isPause = !this.isPause;
  }

  changeSpeedOfPlaying(factor: number): void {
    this.frequency = factor;
  }

  private send(nextDate: Date): void {
    console.log(nextDate);
    this.apiService.controlJob(nextDate);
  }
}
