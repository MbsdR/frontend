import {Component, Inject, Input, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {OcarinaOfTimeService} from '../../ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';

@Component({
  selector: 'wisa-power-curve',
  templateUrl: './power-curve.component.html',
  styleUrls: ['./power-curve.component.css']
})
export class PowerCurveComponent implements OnInit {

  @Input() channel: string;

  chartOption: EChartsOption;
  xaxis: string [] = ['1', '1'];
  series: number [] = [1, 1];

  constructor(@Inject(OcarinaOfTimeService) private ocarina: OcarinaOfTimeService) { }

  ngOnInit(): void {
    console.info('Start');
  }

  private drawLineChart(xaxis: string [], series: number []): void{
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: xaxis,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: series,
          type: 'line',
        },
      ],
    };
  }

}
