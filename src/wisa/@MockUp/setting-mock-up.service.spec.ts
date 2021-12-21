import { TestBed } from '@angular/core/testing';

import { SettingMockUpService } from './setting-mock-up.service';

describe('SettingMockUpService', () => {
  let service: SettingMockUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingMockUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
