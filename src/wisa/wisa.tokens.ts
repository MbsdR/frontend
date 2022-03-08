import {InjectionToken} from '@angular/core';

export const BASE_URL_DATAPLATFORM = new InjectionToken<string>('BASE_URL_DATAPLATFORM');
export const AUTH_ENABLED = new InjectionToken<boolean>('AUTH_ENABLED');
export const LANGUAGE = new InjectionToken<string>('LANGUAGE');
export const WEBSOCKET_DESTINATION = new InjectionToken<string>('STOMP  endpoint');
export const SSE_DESTINATION = new InjectionToken<string>('Server sent events endpoint');
export const STOMP_DESTINATION = new InjectionToken<string>('STOMP  endpoint');
export const DEMONSTRATOR = new InjectionToken<string>('');
