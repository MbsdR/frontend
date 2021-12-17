import {EventEmitter, Inject, Injectable} from '@angular/core';
import {DEMONSTRATOR, STOMP_DESTINATION} from '../../../app.tokens';
import { Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {HistoricData} from '../../model/IHistoricData';
import {IDatapoint} from '../../model/dto/IDatapoint';
import {UsermanagementService} from '../Usermanagement/usermanagement.service';
import {User} from '../../model/Usermangemant/IUser';
import {IFindings} from '../../model/dto/IFindings';

const PRIVATE_ENDPOINT = '/user/queue/historicData';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public historicData$: EventEmitter<any>;
  public turbine: string;
  private stompClient: Client;
  private user: User;
  constructor(@Inject(DEMONSTRATOR) private url, @Inject(STOMP_DESTINATION) private stomp,
              private usermanagementService: UsermanagementService) {
    this.historicData$ = new EventEmitter<string>();
  }

  public controlJob(body: Date): void{
    console.log('control Job', body.toISOString());
    /*
    this.stompClient.publish(
      {destination: '/api/historicData/control' , headers: {},  body: JSON.stringify({content: body.toISOString()})}
    );
    */
  }

  public crateJob(start: Date, end: Date): void{
    const body = new HistoricData('OBE');
    body.start = start.toISOString();
    body.end = end.toISOString();
    body.turbine = this.turbine;
    for (const iTile of this.usermanagementService.profile.condition) {
      body.feature.push(iTile.setting);
    }
    console.log('Websocket request', JSON.stringify(body));
    /*this.stompClient.publish(
      {destination: '/api/historicData' , headers: {},  body: JSON.stringify(body)}
    );

     */
  }

  private websocket(): void {
    this.stompClient = new Client();
    this.stompClient.webSocketFactory = () => {
      return new SockJS(this.url + this.stomp);
    };

    this.stompClient.onConnect = (frame) => {
      const subscription = this.stompClient.subscribe(PRIVATE_ENDPOINT, (msg) => {
        console.log(JSON.parse(msg.body).content);
        this.historicData$.emit(JSON.parse(msg.body).content);
      });
    };
    this.stompClient.activate();
    console.log('connected');
  }
}
