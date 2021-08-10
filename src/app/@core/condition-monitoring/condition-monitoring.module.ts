import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import { ConditionMonitoringComponent } from './condition-monitoring.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {ContentComponent, GraphicsDirective} from './content/content.component';
import {MatIconModule} from '@angular/material/icon';
import {LineChartComponent} from './charts/echarts/line-chart/line-chart.component';
import {MatMenuModule} from '@angular/material/menu';
import { QuickviewComponent } from './components/quickview/quickview.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HeatmapComponent } from './charts/d3/heatmap/heatmap.component';

@NgModule({
  declarations: [
    ConditionMonitoringComponent,
    ContentComponent,
    LineChartComponent,
    QuickviewComponent,
    HeatmapComponent,
    GraphicsDirective
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
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class ConditionMonitoringModule { }
