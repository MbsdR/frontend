import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'wisa-line-chart',
  template: `<div echarts [initOpts]="initOpts" [options]="options" [merge]="updateOpts"></div>`,
})

export class LineChartComponent implements OnInit{

  @Input() data$: EventEmitter<any>;

  options: EChartsOption;
  updateOpts: any;
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 200
  };

  private dataset: Array<any> = [];

  ngOnInit(): void {
    console.log('Start LineChart');
    this.data$.asObservable();
    this.options = {
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Windspeed',
        type: 'line',
        data: this.dataset
      }]
    };
    this.data$.pipe(map(value => {
      this.dataset.push(value * Math.random());
      this.updateOpts = {
        series: [{
          data: this.dataset
        }]};
    })).subscribe();
  }
}
