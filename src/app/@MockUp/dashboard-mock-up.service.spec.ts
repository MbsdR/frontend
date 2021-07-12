import { TestBed } from '@angular/core/testing';

import { DashboardMockUpService } from './dashboard-mock-up.service';

describe('DashboardMockUpService', () => {
  let service: DashboardMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
