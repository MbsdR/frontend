import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {IConditionData} from '../../model/IConditionData';

@Injectable({
  providedIn: 'root'
})
export class ConditionMonitoringService {

  constructor() { }

  get$Condition(): Observable<IConditionData> {
    return new Observable<IConditionData>(subscriber => {
      subscriber.next(this.interpretCondition());
      interval(5000).subscribe(() => subscriber.next(this.interpretCondition()));
    });
  }

  private interpretCondition(): {condition: string, failure: number }{
    const conditions = ['red', 'yellow', 'green'];
    const conditioncolor = conditions[Math.floor(Math.random() * conditions.length)];
    switch (conditioncolor) {
      case 'red': return {condition: conditioncolor, failure: Math.floor(Math.random() * 15) + 5 };
      case 'yellow': return {condition: conditioncolor, failure: Math.floor(Math.random() * 10) + 5 };
      case 'green': return {condition: conditioncolor, failure: Math.floor(Math.random() * 10) + 5 };
    }
    return {condition: conditioncolor, failure: Math.floor(Math.random() * 5) + 0 };
  }
}
