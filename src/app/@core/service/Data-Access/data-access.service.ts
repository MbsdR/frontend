import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DaaRes} from '../../model/daa';
import {map} from 'rxjs/operators';
import {Datapoint} from '../../model/datapoint';
import {Query} from '../../model/query';


@Injectable({
  providedIn: 'root'
})
export class DataAccessService {


  dataEvent: EventEmitter<Array<Datapoint>>;

  private BASE_URL = 'http://localhost:8001';
  private sseUrl: string;
  private headers: HttpHeaders;
  private resultSet: Array<Datapoint> = [];

  constructor(private zone: NgZone,
              private http: HttpClient) {
    console.log('Create Data Access Service');
    this.headers = new HttpHeaders();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.dataEvent = new EventEmitter<Array<Datapoint>>();
  }

  getDataSet(query: Query): EventEmitter<Array<Datapoint>> {
    this._start(query);
    console.log(query);
    return this.dataEvent;
  }

  private request(query: Query): Observable<DaaRes> {
    return this.http.post<DaaRes>('http://localhost:8001/data', query);
  }

  private _start(query: Query): any {

    this.request(query).subscribe(body => {
      this.sseUrl = this.BASE_URL.concat(body.api.links[0].href);
      this.getSSE()
        .subscribe(datapoint => {
          this.resultSet.push(JSON.parse(datapoint));
        });
    }); // ------end Request ----------

    return this.resultSet;
  }

  private getSSE(): Observable<string> {
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
          this.dataEvent.emit(this.resultSet);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
