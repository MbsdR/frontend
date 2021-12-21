import { TestBed } from '@angular/core/testing';

import { OcarinaOfTimeService } from './ocarina-of-time.service';

describe('OcarinaOfTimeService', () => {
  let service: OcarinaOfTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcarinaOfTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
