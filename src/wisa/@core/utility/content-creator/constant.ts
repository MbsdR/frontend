import {LineChartComponent} from '../depiction/echarts/line-chart/line-chart.component';
import {HeatmapComponent} from '../depiction/echarts/heatmap/heatmap.component';
import {Type} from '@angular/core';
import {TestLineChartComponent} from '../depiction/echarts/test-line-chart/test-line-chart.component';

export const GRAPHICS = {
  line: LineChartComponent,
  heat: HeatmapComponent,
  testLine: TestLineChartComponent
};
