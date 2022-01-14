import {LineChartComponent} from '../depiction/echarts/line-chart/line-chart.component';
import {HeatmapComponent} from '../depiction/d3/heatmap/heatmap.component';
import {Graphic} from '../depiction/graphic';
import {Type} from '@angular/core';

export const GRAPHICS = {
  line: LineChartComponent,
  heat: HeatmapComponent
};

export const GR: Array<Type <any>> = [LineChartComponent, HeatmapComponent ];
