import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './web-socket.service';
import {DEMONSTRATOR, WEBSOCKET_DESTINATION} from '../../../app.tokens';

describe('WebSocketService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: WEBSOCKET_DESTINATION, useValue: '/gs-guide-websocket'},
        {provide: DEMONSTRATOR, useValue: '127.0.0.1:8080'}]});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    setTimeout( () => {
    }, 10000);
    expect(service).toBeTruthy();
  });
});
