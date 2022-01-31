import {EventEmitter, Inject, Injectable} from '@angular/core';
import {DEMONSTRATOR, STOMP_DESTINATION} from '../../../wisa.tokens';
import { Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {HistoricData} from '../../model/IHistoricData';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {User} from '../../model/Usermangemant/IUser';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import next from 'ajv/dist/vocabularies/next';

const PRIVATE_ENDPOINT = '/user/queue/historicData';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public historicData$: EventEmitter<IDatapoint>;
  public turbine: string;
  public dashboard: string;
  private stompClient: Client;

  constructor(@Inject(DEMONSTRATOR) private url,
              @Inject(STOMP_DESTINATION) private stomp,
              private managementService: UsermanagementService) {
    this.historicData$ = new EventEmitter<IDatapoint>();
  }

  /**
   * @param body
   */
  public controlJob(body: Date): void{
    console.log('control Job', body.toISOString());
    /*
    this.stompClient.publish(
      {destination: '/api/historicData/control' , headers: {},  body: JSON.stringify({content: body.toISOString()})}
    );
    */
  }

  /**
   * @param start
   * @param end
   */
  public crateJob(start: Date, end: Date): void{
    const body = new HistoricData('OBE');
    body.start = start.toISOString();
    body.end = end.toISOString();
    body.turbine = this.turbine;
    // Todo anpassen an sichtbares Dashboard

    for (const iTile of this.managementService.profile.settings[this.dashboard]) {
      body.feature.push(iTile.setting);
    }
    console.log('Websocket request', JSON.stringify(body));
    // this.stompClient.publish({destination: '/api/historicData' , headers: {},  body: JSON.stringify(body)});
  }

  public connectDemonstrator(): void {
    this.stompClient = new Client();
    this.stompClient.webSocketFactory = () => {
      return new SockJS(this.url + this.stomp);
    };

    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe(PRIVATE_ENDPOINT, (msg) => {
        console.log(JSON.parse(msg.body).content);
        this.historicData$.emit(JSON.parse(msg.body).content);
      });
    };
    this.stompClient.activate();
    console.log('connected');
  }

  close(): void {
    console.log('disconnected');
    this.stompClient.deactivate();
  }
}
