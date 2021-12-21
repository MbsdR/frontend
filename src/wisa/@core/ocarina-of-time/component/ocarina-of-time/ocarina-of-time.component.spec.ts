import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcarinaOfTimeComponent } from './ocarina-of-time.component';

describe('OcarinaOfTimeComponent', () => {
  let component: OcarinaOfTimeComponent;
  let fixture: ComponentFixture<OcarinaOfTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcarinaOfTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcarinaOfTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
