import {IQuery, Query} from '../../model/IQuery';
import {AccountService} from '../../login/service/account.service';

export class QueryBuilder {

  private query: IQuery;

  constructor(vendor?: string) {
    this.query = new Query(vendor);
  }

  start(start: string): QueryBuilder {
    this.query.start = start;
    return this;
  }

  end(end: string): QueryBuilder {
    this.query.end = end;
    return this;
  }

  addChannel(channel: string): QueryBuilder {
    this.query.channels.push(channel);
    return this;
  }

  addTurbine(turbine: string): QueryBuilder {
    this.query.turbines.push(turbine);
    return this;
  }

  freq(freq: string): QueryBuilder {
    this.query.freq = freq;
    return this;
  }

  func(func: string): QueryBuilder {
    this.query.func = func;
    return this;
  }

  getQuery(): IQuery {
    return this.query;
  }
}
