import {EventEmitter, Inject, Injectable} from '@angular/core';
import {DEMONSTRATOR, STOMP_DESTINATION, WEBSOCKET_DESTINATION} from '../../../wisa.tokens';
import {Client, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {HistoricData} from '../../model/dto/IHistoricData';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {ITile} from '../../model/Usermangemant/ITile';
import {formatDate} from '@angular/common';

const PRIVATE_ENDPOINT = '/users/queue/historicData/stream';

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
              @Inject(WEBSOCKET_DESTINATION) private userDes,
              private managementService: UsermanagementService) {
    this.historicData$ = new EventEmitter<IDatapoint>();
  }

  /**
   */
  public controlJob(body: Date): void{
    console.log('control Job', formatDate(body, 'yyyy-MM-dd HH:mm:ssZ', 'de'));
    this.stompClient.publish(
      {destination: '/users/historicData/control' ,
        headers: {},
        body: `${formatDate(body, 'yyyy-MM-dd HH:mm:ssZ', 'de')}`}
    );
  }

  /**
   */
  public crateJob(start: Date, end: Date): void{
    const body = new HistoricData('OBE');
    body.start = formatDate(start, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.stop = formatDate(end, 'YYYY-MM-dd HH:mm:ssZ', 'de');
    body.turbine = this.turbine;
    // Todo anpassen an sichtbares Dashboard
    const dashboard: Array<ITile> = this.managementService.profile.settings[this.dashboard];

    for (const iTile of dashboard) {
      body.features.push(iTile.setting.feature);
    }
    console.log('Websocket request', JSON.stringify(body));
    this.stompClient.publish({destination: '/users/historicData' , headers: {},  body: JSON.stringify(body)});
  }

  /**
   * Connect to Demonstrator
   */
  public connectDemonstrator(): void {

    this.stompClient = new Client();
    this.stompClient.brokerURL = this.stomp;
    this.stompClient.connectHeaders = {};
    this.stompClient.debug = (str) => {
      console.log(str);
    };
    this.stompClient.reconnectDelay = 5000;
    this.stompClient.heartbeatIncoming = 4000;
    this.stompClient.heartbeatOutgoing = 4000;
/*
    this.stompClient.webSocketFactory = () => {
      return new SockJS(this.stomp);
    };
*/
    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe(PRIVATE_ENDPOINT, (msg) => {
        console.log(JSON.parse(msg.body).content);
        this.historicData$.emit(JSON.parse(msg.body).content);
      });
    };

    this.stompClient.onStompError = (frame) => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers.message);
      console.log('Additional details: ' + frame.body);
    };
    console.log(this.stompClient.brokerURL);
    this.stompClient.activate();
    console.log('connected');
  }

  close(): void {
    console.log('disconnected');
    this.stompClient.deactivate();
  }
}
