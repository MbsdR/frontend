import {LineChartComponent} from './charts/echarts/line-chart/line-chart.component';
import {HeatmapComponent} from './charts/d3/heatmap/heatmap.component';
import {Graphic} from './charts/graphic';
import {Type} from '@angular/core';

export const GRAPHICS = {
  line: LineChartComponent,
  heat: HeatmapComponent
};

export const GR: Array<Type <any>> = [LineChartComponent, HeatmapComponent ];
