import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindEnergyPlantComponent } from './wind-energy-plant.component';

describe('WindEnergyPlantComponent', () => {
  let component: WindEnergyPlantComponent;
  let fixture: ComponentFixture<WindEnergyPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindEnergyPlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindEnergyPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
