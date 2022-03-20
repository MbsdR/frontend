import {LineChartComponent} from '../depiction/echarts/line-chart/line-chart.component';
import {HeatmapComponent} from '../depiction/echarts/heatmap/heatmap.component';
import {Type} from '@angular/core';
import {TestLineChartComponent} from '../depiction/echarts/test-line-chart/test-line-chart.component';
import {BarChartComponent} from "../depiction/echarts/bar-chart/bar-chart.component";
import {GaugeComponent} from "../depiction/echarts/gauge/gauge.component";

export const GRAPHICS = {
  line: LineChartComponent,
  heat: HeatmapComponent,
  testLine: TestLineChartComponent,
  bar: BarChartComponent,
  gauge: GaugeComponent
};
