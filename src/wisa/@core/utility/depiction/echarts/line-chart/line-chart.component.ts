import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDatapoint} from '../../../../model/dto/IDatapoint';
import {EChartsOption} from 'echarts';
import {ITileSetting} from '../../../../model/Usermangemant/ITileSetting';
import {Graphic} from '../../graphic';
import {formatDate} from '@angular/common';

@Component({
  selector: 'wisa-line-chart',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" (chartInit)="onChartInit($event)" ></div>`,
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit, Graphic {

  setting: ITileSetting;
  options: EChartsOption;
  updateOptions: EChartsOption;

  private dataset: Array<[string, number | string]>;
  private size: number;
  private echartsInstance: any;
  private puffer: number;
  private channel: string;
  private counter = 0;

  constructor() {
    this.size = 10;
    this.puffer = 1;
    this.dataset = new Array<[string, (number | string)]>();

  }

  ngOnInit(): void {
    this.channel = this.setting.feature;
    this.options = {
      tooltip: {
        show: true
      },
      grid: {
        left: '10%',
        height: '20%'

      },
      xAxis: {
        name: this.channel,
        type: 'time',
        axisLabel: {
          formatter: '{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}'
        }
      },
      yAxis: {
        name: 'Einheit',
        type: 'value'
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [{
        type: 'line',
        showSymbol: false,
        data: [10, 11, 10],
        lineStyle: {color: 'red'}
      },
        {
        type: 'line',
        data: [0, 0]
      }]
    };
  }


  ngAfterViewInit(): void {
    console.info(this.channel, 'chart was created');
  }

  updateChart(datapoint: IDatapoint, turbine: string): void {
    this.dataset.push([datapoint._stop, datapoint[this.channel]]);
    if (this.dataset.length > this.size) {
      this.dataset.shift();
    }
    this.dataset = Array.from(new Set(this.dataset));
    this.counter += 1;
    if (0 === this.counter % this.puffer) {
      this.updateOptions = {
        series: [{
          data: this.dataset
        }]
      };
      this.counter = 0;
    }
  }

  onChartInit(ec): void {
    this.echartsInstance = ec;
  }

  changeDatasetNumber(size: number): void {
    this.size = size;
  }

  private createDateStr(stop: string): void {
    const myDate = new Date(stop);
  }
}
