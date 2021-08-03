import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import { ConditionMonitoringComponent } from './condition-monitoring.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {ContentComponent} from './content/content.component';
import {MatIconModule} from '@angular/material/icon';
import {LineChartComponent} from './charts/echarts/line-chart/line-chart.component';
import {MatMenuModule} from '@angular/material/menu';
import {ConditionMonitoringService} from './services/condition-monitoring.service';
import { QuickviewComponent } from './components/quickview/quickview.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    ConditionMonitoringComponent,
    ContentComponent,
    LineChartComponent,
    QuickviewComponent
  ],
  exports: [
    ConditionMonitoringComponent,
    QuickviewComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    MatMenuModule,
    MatBadgeModule,
  ]
})
export class ConditionMonitoringModule { }
