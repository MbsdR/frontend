import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerCurveComponent } from './power-curve/power-curve.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ActivePowerComponent } from './active-power/active-power.component';



@NgModule({
  declarations: [PowerCurveComponent, ActivePowerComponent],
  exports: [
    ActivePowerComponent,
    PowerCurveComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class ConditionMonitoringModule { }
