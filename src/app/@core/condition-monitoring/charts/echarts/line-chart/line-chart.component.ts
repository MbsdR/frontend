import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDatapoint} from '../../../../model/IDatapoint';
import {map} from 'rxjs/operators';
import {EChartsOption} from 'echarts';
import {ITileSetting} from '../../../../model/Usermangemant/ITileSetting';
import {CHANNELS} from '../../../../model/Constants/mapping';
import {Observable} from 'rxjs';
import {objectKeys} from 'codelyzer/util/objectKeys';
import {Graphic} from '../../graphic';

@Component({
  selector: 'wisa-line-chart',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" (chartInit)="onChartInit($event)"></div>`,
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
    this.size = 200;
    this.puffer = 1;
    this.dataset = new Array<[string, (number | string)]>();

  }

  ngOnInit(): void {
    this.channel = this.setting.channel;
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
        type: 'time'
      },
      yAxis: {
        name: 'Einheit',
        type: 'value'
      },
      series: [{
        type: 'line',
        data: [0,0]
      }]
    };
  }


  ngAfterViewInit(): void {
    console.info(this.channel, 'chart was created');
  }

  updateChart(datapoint: IDatapoint, turbine: string): void {
    console.log(this.channel.concat('_').concat(turbine));
    console.log(datapoint);
    this.dataset.push([datapoint._start, datapoint[this.channel.concat('_' + turbine)]]);
    this.counter += 1;
    if (this.dataset.length > this.size) {
      this.dataset.shift();
    }
    console.log(this.dataset);
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

}
