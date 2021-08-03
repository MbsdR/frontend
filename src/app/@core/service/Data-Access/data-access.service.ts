import {EventEmitter, Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDaaRes} from '../../model/IDaa';
import {concat, concatAll, map, tap} from 'rxjs/operators';
import {IDatapoint} from '../../model/IDatapoint';
import {IQuery} from '../../model/IQuery';

@Injectable({
  providedIn: 'root'
})

export class DataAccessService {


  dataEvent: EventEmitter<{ result: Array<IDatapoint>, channel: string }>;
  dataEventSingle: EventEmitter<IDatapoint>;
  private headers: HttpHeaders;


  constructor(@Inject('BASE_URL_DATAPLATFORM') private BASE_URL: string,
              private zone: NgZone,
              private http: HttpClient) {
    console.log('Create Data Access Service');
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.dataEvent = new EventEmitter<{ result: Array<IDatapoint>, channel: string }>();
    this.dataEventSingle = new EventEmitter<IDatapoint>();
    console.log(this.BASE_URL);
  }

  async getDataSet(query: IQuery): Promise<Array<IDatapoint>> {
    return await this._start(query);
  }

  private _start(query: IQuery): Promise<Array<IDatapoint>> {
    const resultSet: Array<IDatapoint> = new Array<IDatapoint>();
    return new Promise(resolve => {
      this.request(query).pipe(
        map(body => {
          return this.BASE_URL.concat(body.api.links[0].href);
        }), // ------end Request ----------
        map(sseUrl => {
          return this.getSSE(sseUrl);
        }), // _______end SSE________
        concatAll()).subscribe(
        datapoint => resultSet.push(JSON.parse(datapoint)),
        error => {
        },
        () => {
          resolve(resultSet);
        }
      );
    });
  }

  private request(query: IQuery): Observable<IDaaRes> {
    return this.http.post<IDaaRes>(this.BASE_URL.concat('/data'), query);
  }


  private getSSE(sseUrl: string): Observable<string> {
    return new Observable<string>(subscriber => {
      const eventSource = new EventSource(sseUrl);
      eventSource.onopen = event => {
        this.zone.run(() => {
          console.log('Connection to server opened.');
        });
      };
      eventSource.onmessage = event => {
        this.zone.run(() => {
          subscriber.next(event.data);
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
