import { TestBed } from '@angular/core/testing';

import { TemplateMockUoService } from './template-mock-uo-service.ts.service';

describe('TemplateMockUoService.TsService', () => {
  let service: TemplateMockUoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateMockUoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
