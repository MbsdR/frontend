import { TestBed } from '@angular/core/testing';

import { ManagerAPIService } from './manager-api.service';

describe('ManagerAPIService', () => {
  let service: ManagerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
