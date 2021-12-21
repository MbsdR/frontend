import {TestBed} from '@angular/core/testing';

import {ConditionMonitoringService} from './condition-monitoring.service';
import {Observable} from 'rxjs';

describe('ConditionMonitoringService', () => {
  let service: ConditionMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be sent condition', () => {
    const $condition: Observable<{condition: string, failure: number }> = service.get$Condition();
    const condition = ['green', 'yellow', 'red'];
    let expectValue: any;
    $condition.subscribe(value => expectValue = value);
    expect(expectValue).toBeTruthy();
  });

});
