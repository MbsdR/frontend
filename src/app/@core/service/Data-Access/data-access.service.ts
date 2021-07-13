import {EventEmitter, Inject, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDaaRes} from '../../model/daa';
import {map} from 'rxjs/operators';
import {IDatapoint} from '../../model/IDatapoint';
import {IQuery} from '../../model/query';


@Injectable({
  providedIn: 'root'
})
export class DataAccessService {


  dataEvent: EventEmitter<Array<IDatapoint>>;
  dataEventSingle: EventEmitter<IDatapoint>;

  private BASE_URL = 'http://localhost:8001';
  private sseUrl: string;
  private headers: HttpHeaders;
  // private resultSet: Array<IDatapoint> = [];

  constructor(private zone: NgZone,
              private http: HttpClient) {
    console.log('Create Data Access Service');
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.dataEvent = new EventEmitter<Array<IDatapoint>>();
    this.dataEventSingle = new EventEmitter<IDatapoint>();
  }

  getDataSet(query: IQuery): EventEmitter<Array<IDatapoint>> {
    this._start(query);
    return this.dataEvent;
  }

  private _start(query: IQuery): void {
    const resultSet = new Array<IDatapoint>();
    this.request(query).subscribe(body => {
      this.sseUrl = this.BASE_URL.concat(body.api.links[0].href);
      this.getSSE(resultSet)
        .subscribe(datapoint => {
          resultSet.push(JSON.parse(datapoint));
        });
    }); // ------end Request ----------
  }

  private request(query: IQuery): Observable<IDaaRes> {
    return this.http.post<IDaaRes>('http://localhost:8001/data', query);
  }


  private getSSE(resultSet: Array<IDatapoint>): Observable<string> {
    return new Observable<string>(observer => {
      console.log('Start eventsource'.concat(this.sseUrl));
      const eventSource = this.getEventSource(this.sseUrl);

      eventSource.onopen = event => {
        this.zone.run(() => {
          console.log('Connection to server opened.');
        });
      };
      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event.data);
        });
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
          eventSource.close();
          this.dataEvent.emit(resultSet);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
