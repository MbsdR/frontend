import { TestBed } from '@angular/core/testing';

import { AccountMockUpService } from './account-mock-up.service';

describe('AccountMockUpService', () => {
  let service: AccountMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
