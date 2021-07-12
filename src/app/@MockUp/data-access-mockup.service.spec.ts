import { TestBed } from '@angular/core/testing';

import { DataAccessMockupService } from './data-access-mockup.service';

describe('DataAccessMockupService', () => {
  let service: DataAccessMockupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAccessMockupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
