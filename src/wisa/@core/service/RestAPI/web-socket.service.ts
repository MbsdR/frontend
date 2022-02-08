import {EventEmitter, Inject, Injectable} from '@angular/core';
import {DEMONSTRATOR, STOMP_DESTINATION} from '../../../wisa.tokens';
import { Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {HistoricData} from '../../model/IHistoricData';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {ITile} from '../../model/Usermangemant/ITile';
import {formatDate} from '@angular/common';

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
    console.log('control Job', formatDate(body, 'yyyy-MM-dd HH:mm:ssZ', 'de'));
    this.stompClient.publish(
      {destination: '/api/historicData/control' ,
        headers: {},
        body: `${formatDate(body, 'yyyy-MM-dd HH:mm:ssZ', 'de')}`}
    );
  }

  /**
   * @param start
   * @param end
   */
  public crateJob(start: Date, end: Date): void{
    const body = new HistoricData('OBE');
    body.start = formatDate(start, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.stop = formatDate(start, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.turbine = this.turbine;
    // Todo anpassen an sichtbares Dashboard
    const dashboard: Array<ITile> = this.managementService.profile.settings[this.dashboard];

    for (const iTile of dashboard) {
      body.feature.push(iTile.setting.feature);
    }

    console.log('Websocket request', JSON.stringify(body));
    this.stompClient.publish({destination: '/api/historicData' , headers: {},  body: JSON.stringify(body)});
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
