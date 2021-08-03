import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionMonitoringComponent } from './condition-monitoring.component';

describe('ConditionMonitoringComponent', () => {
  let component: ConditionMonitoringComponent;
  let fixture: ComponentFixture<ConditionMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
