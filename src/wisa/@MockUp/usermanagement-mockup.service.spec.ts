import { TestBed } from '@angular/core/testing';

import { UsermanagementMockupService } from './usermanagement-mockup.service';

describe('UsermanagementService', () => {
  let service: UsermanagementMockupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsermanagementMockupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
