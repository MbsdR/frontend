import {EventEmitter, Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {DEMONSTRATOR, SSE_DESTINATION} from '../../../wisa.tokens';
import {Observable, Subscription} from 'rxjs';
import {formatDate} from '@angular/common';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {SessionService} from '../Session/session.service';
import {ChartPoint, IChartPoint} from '../../model/ChartPoint';

@Injectable({
  providedIn: 'root'
})


export class SseService {

  datastream$: EventEmitter<any>;
  private headers: HttpHeaders;
  private sub: Subscription;
  private eventSource: EventSource;


  constructor(@Inject(DEMONSTRATOR) private MANAGER_URL: string,
              private userService: UsermanagementService,
              private sessionService: SessionService,
              private zone: NgZone) {
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.datastream$ = new EventEmitter<IDatapoint>();
    console.log('Sse Service created');
    this.connectManager(userService.getUser());
  }

  connectManager(user: string): void {
    console.log('Connect to Manager');
    this.sub = this.connectInputStream('sse/stream', user).subscribe({
    next: (datapoint) =>
    {
      // datapoint._start = formatDate(datapoint._start, 'YYYY-MM-dd HH:mm:ss', 'de');
      // datapoint._stop = formatDate(datapoint._stop, 'YYYY-MM-dd HH:mm:ss', 'de');
      datapoint[datapoint.channel] = datapoint.value;
      this.sessionService.storage.get(datapoint.channel)?.push(datapoint);
      this.datastream$.emit(datapoint);
    }
  , // resultSet.push(JSON.parse(datapoint)),
   error: (error) => {
      console.log(error);
    }
  });
  }

  rm(): void {
    this.eventSource.close();
    this.sub.unsubscribe();
  }

  private connectInputStream(endpoint: string, user: string): Observable<IDatapoint> {
    console.log(`Connect sse-endpoint ${endpoint}`);
    return new Observable<IDatapoint>(subscriber => {
      // const eventSource = new EventSource(this.MANAGER_URL.concat('/events'));
      try {
        this.eventSource = new EventSource(`http://${this.MANAGER_URL}/${endpoint}?user=${user}`);
        this.eventSource.onopen = event => {
          this.zone.run(() => {
            console.log('Connection to server opened.');
          });
        };
        this.eventSource.onmessage = (message) => {
          this.zone.run(() => {
            console.log(message.data);
            subscriber.next(JSON.parse(message.data));
          });
        };
        this.eventSource.onerror = error => {
          this.zone.run(() => {
            subscriber.complete();
            console.log('Closing connection SSE');
          });
        };
      } catch (e) {
      }
    });
  }

}
