import {EventEmitter, Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IDaaRes} from '../../model/IDaa';
import {Datapoint, IDatapoint} from '../../model/dto/IDatapoint';
import {IHistoricData} from '../../model/IHistoricData';
import {BASE_URL_DATAPLATFORM} from '../../../wisa.tokens';
import {concatAll, map, take, takeUntil, takeWhile} from 'rxjs/operators';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {IFindings} from '../../model/dto/IFindings';

@Injectable({
  providedIn: 'root'
})


export class RealTimeService {

  datastream$: EventEmitter<any>;
  private headers: HttpHeaders;
  private sub: Subscription;
  private eventSource: EventSource;

  constructor(@Inject(BASE_URL_DATAPLATFORM) private BASE_URL: string,
              private zone: NgZone,
              private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.datastream$ = new EventEmitter<IDatapoint>();
    console.log('Realtime cerated');
  }

  getCurrentData(feature, turbine: string): Subscription {
    console.log('Live Datastream is not implement yet');
    console.log('end' in {end: 'string'});
    return this.sub = this.connectInputStream(turbine, feature).subscribe(
      (strDatapoint) => {
        this.datastream$.emit(strDatapoint);
      }, // resultSet.push(JSON.parse(datapoint)),
      error => {},
      () => {}
    );
  }

  rm(): void{
    this.eventSource.close();
    this.sub.unsubscribe();
  }

  private connectInputStream(turbine: string, feature?: Array<string>): Observable<IDatapoint> {
    console.log('start sse');
    return new Observable<IDatapoint>(subscriber => {
      // const eventSource = new EventSource(this.BASE_URL.concat('/events'));
      this.eventSource = new EventSource('http://localhost:8080/api/stream-sse?turbine=N1-1');
      this.eventSource.onopen = event => {
        this.zone.run(() => {
          console.log('Connection to server opened.');
        });
      };
      this.eventSource.onmessage = (message) => {
        this.zone.run( () => {
          console.log(message.data);
          subscriber.next(JSON.parse(message.data));
        });
      };
      this.eventSource.onerror = error => {
        this.zone.run(() => {
          subscriber.complete();
          this.eventSource.close();
        });
      };
    });
  }
}
