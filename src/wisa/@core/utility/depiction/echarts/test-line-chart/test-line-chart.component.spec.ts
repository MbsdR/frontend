import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLineChartComponent } from './test-line-chart.component';

describe('TestLineChartComponent', () => {
  let component: TestLineChartComponent;
  let fixture: ComponentFixture<TestLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
