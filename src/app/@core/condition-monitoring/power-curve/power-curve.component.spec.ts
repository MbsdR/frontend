import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerCurveComponent } from './power-curve.component';

describe('PowerCurveComponent', () => {
  let component: PowerCurveComponent;
  let fixture: ComponentFixture<PowerCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerCurveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
