import {EventEmitter, Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDaaRes} from '../../model/IDaa';
import {Datapoint, IDatapoint} from '../../model/dto/IDatapoint';
import {IHistoricData} from '../../model/IHistoricData';
import {BASE_URL_DATAPLATFORM} from '../../../app.tokens';
import {concatAll, map, take, takeUntil, takeWhile} from 'rxjs/operators';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {IFindings} from '../../model/dto/IFindings';

@Injectable({
  providedIn: 'root'
})


export class RealTimeService {

  datastream$: EventEmitter<any>;
  dataEvent: EventEmitter<{ result: Array<IDatapoint>, channel: string }>;
  dataEventSingle: EventEmitter<IDatapoint>;
  private headers: HttpHeaders;
  private sub: Subscription;
  private stop = true;

  constructor(@Inject(BASE_URL_DATAPLATFORM) private BASE_URL: string,
              private zone: NgZone,
              private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.dataEvent = new EventEmitter<{ result: Array<IDatapoint>, channel: string }>();
    this.dataEventSingle = new EventEmitter<IDatapoint>();
    this.datastream$ = new EventEmitter<string>();
    console.log('Realtime cerated');
  }

  getCurrentData(feature, turbine: string): void {
    console.log('Live Datastream is not implement yet');
    console.log('end' in {end: 'string'});
    this.sub = this.connectInputStream(turbine, feature).subscribe(
      (strDatapoint) => {
        this.datastream$.emit(strDatapoint);
      }, // resultSet.push(JSON.parse(datapoint)),
      error => {},
      () => {}
    );
  }

  rm(): void{
    this.stop = false;
    this.sub.unsubscribe();
  }

  private connectInputStream(turbine: string, feature?: Array<string>): Observable<IDatapoint> {
    console.log('start sse');
    return new Observable<IDatapoint>(subscriber => {
      // const eventSource = new EventSource(this.BASE_URL.concat('/events'));
      // const eventSource = new EventSource('http://localhost:8080/api/stream-sse?turbine=N1-1');
      const eventSource = new EventSource('http://localhost:3000/events?turbine=N1-1');
      eventSource.onopen = event => {
        this.zone.run(() => {
          console.log('Connection to server opened.');
        });
      };
      eventSource.onmessage = (message) => {
        this.zone.run( () => {
          subscriber.next(JSON.parse(message.data));
        });
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          subscriber.complete();
          eventSource.close();
        });
      };
    });
  }
}
