import {Component, Injectable} from '@angular/core';
import {Query, IQuery} from '../../model/query';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: IQuery;

  constructor() {
    this.query = new Query();
  }

  vendor(vendor: string): QueryBuilderService {
    this.query.vendor = vendor;
    return this;
  }

  start(start: string): QueryBuilderService {
    this.query.start = start;
    return this;
  }

  end(end: string): QueryBuilderService {
    this.query.end = end;
    return this;
  }

  addChannel(channel: string): QueryBuilderService {
    this.query.channels.push(channel);
    return this;
  }

  addTurbine(turbine: string): QueryBuilderService {
    this.query.turbines.push(turbine);
    return this;
  }

  freq(freq: string): QueryBuilderService {
    this.query.freq = freq;
    return this;
  }

  func(func: string): QueryBuilderService {
    this.query.func = func;
    return this;
  }

  getQuery(): IQuery {
    return this.query;
  }
}
