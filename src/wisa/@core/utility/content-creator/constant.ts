import {LineChartComponent} from '../depiction/echarts/line-chart/line-chart.component';
import {HeatmapComponent} from '../depiction/echarts/heatmap/heatmap.component';
import {Type} from '@angular/core';

export const GRAPHICS = {
  line: LineChartComponent,
  heat: HeatmapComponent
};

export const GR: Array<Type <any>> = [LineChartComponent, HeatmapComponent ];
