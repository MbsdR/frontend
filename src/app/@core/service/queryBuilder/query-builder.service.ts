import {Component, Injectable} from '@angular/core';
import {Query} from '../../model/query';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: Query = {
    vendor: '',
    start : '',
    end : '',
    channels: [],
    turbines: [],
  };


  constructor() {}
  vendor(vendor: string): QueryBuilderService{
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
  addChannel(channel: string): QueryBuilderService{
    this.query.channels.push(channel);
    return this;
  }
  addTurbine(turbine: string): QueryBuilderService{
    this.query.turbines.push(turbine);
    return this;
  }
  freq(freq: string): QueryBuilderService{
    this.query.freq = freq;
    return this;
  }
  func(func: string): QueryBuilderService{
    this.query.func = func;
    return this;
  }
  getQuery(): Query{
    return this.query;
  }
}
