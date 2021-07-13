import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDatapoint} from '../../../@core/model/IDatapoint';
import {map} from 'rxjs/operators';
import {EChartsOption} from 'echarts';
import {Setting} from '../../../@core/model/setting';
import {CHANNELS} from '../../../@core/model/mapping';

@Component({
  selector: 'wisa-line-chart',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" (chartInit)="onChartInit($event)"></div>`,
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data$: EventEmitter<IDatapoint>;
  @Input() setting: Setting;
  @Input() typ: string;

  options: EChartsOption;
  updateOptions: EChartsOption;

  private dataset: Array<[string, number | string]>;
  private size: number;
  private echartsInstance: any;
  private puffer: number;

  constructor() {
    this.size = 200;
    this.dataset = [];
    this.typ = 'line';
    this.puffer = 1;
  }

  ngOnInit(): void {
    console.log('Create Linechart ', this.setting.channel);
    let counter = 0;
    this.options = {
      tooltip: {
        show: true
      },
      grid: {
        left: '10%',
        height: '20%'

      },
      xAxis: {
        name: 'Time',
        type: 'time'
      },
      yAxis: {
        name: 'Einheit',
        type: 'value'
      },
      series: [{
        type: 'line',
        data: this.dataset
      }]
    };

    this.data$.pipe(map(datapoint => {
      if (datapoint[this.setting.channel.concat('_', this.setting.turbine)]) {
        this.dataset.push([datapoint._stop, datapoint[this.setting.channel.concat('_', this.setting.turbine)]]);
        counter += 1;
        if (this.dataset.length > this.size) {
          this.dataset.shift();
        }
      }
    })).subscribe(() => {
      if (0 === counter % this.puffer) {
        this.updateOptions = {
          series: [{
            data: this.dataset
          }]
        };
        counter = 0;
      }
    });
  }

  onChartInit(ec): void {
    this.echartsInstance = ec;
  }

  changeDatasetNumber(size: number): void {
    this.size = size;
  }

}
