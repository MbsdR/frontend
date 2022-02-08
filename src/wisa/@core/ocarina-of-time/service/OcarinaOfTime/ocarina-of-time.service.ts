import {EventEmitter, Injectable, QueryList, ViewChildren} from '@angular/core';
import {Observable, interval, tap, partition, of, switchAll, fromEvent, Subscription, timeout, timer} from 'rxjs';
import {WebSocketService} from '../../../service/RestAPI/web-socket.service';
import {ConditionMonitoringComponent} from '../../../condition-monitoring/condition-monitoring.component';
import {filter, map, take} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class OcarinaOfTimeService {

  @ViewChildren(ConditionMonitoringComponent) myValue: QueryList<ConditionMonitoringComponent>;

  $ocarinDateStream: EventEmitter<Date> = new EventEmitter<Date>();
  isOcarinaOpen$: EventEmitter<boolean> = new EventEmitter<boolean>();
  changeQuery$ = new EventEmitter<{start: Date; end: Date}>();

  private frequency: number;
  private timeRange: { start: Date; end: Date };
  private unit: number;
  private newDate: Date;
  private isPause: boolean;
  private sub: Subscription;

  constructor(private webSocketService: WebSocketService) {
    this.frequency = 1;
    this.unit = 1;
    this.isPause = true;
    this.isOcarinaOpen$.subscribe((isOpen) => {
      console.log('Ocarina Service played ', isOpen);
      isOpen ? webSocketService.connectDemonstrator() : webSocketService.close();
    });
    this.changeQuery$.subscribe((timeRange) => {
      this.timeRange = timeRange;
      this.Request2Demonstrator();
      this.newDate = this.timeRange.start;
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
    this.webSocketService.crateJob(this.timeRange.start, this.timeRange.end);
  }

  playOcarinaOfTime(): void {
    this.isPause = !this.isPause;
  }

  pause(): void {
    this.isPause = !this.isPause;
  }

  changeSpeedOfPlaying(factor: number): void {
    this.frequency = factor;
  }

  private send(nextDate: Date): void{
      this.webSocketService.controlJob(nextDate);
      console.log(nextDate);
  }
}
