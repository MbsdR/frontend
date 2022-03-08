import {AfterViewInit, Component, Directive, OnInit} from '@angular/core';
import {IDatapoint} from '../../../../model/dto/IDatapoint';
import {ITileSetting} from '../../../../model/Usermangemant/ITileSetting';
import {Graphic, IGraphic} from '../../IGraphic';
import {EChartsOption} from 'echarts';
import * as ECharts from 'echarts';
import {formatDate} from '@angular/common';

@Directive({selector: '[wisaEChart]'})
export class ChartDirective {
}

@Component({
  selector: 'wisa-line-chart',
  template: `
    <div echarts wisaEChart [options]="chartOption" [merge]="updateOption" (chartDataZoom)="onChartEvent($event, 'chartDataZoom')"
         class="Echarts"></div>`,
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends Graphic implements OnInit, AfterViewInit {

  setting: ITileSetting;
  chartOption: EChartsOption;
  updateOption: any;
  initData: Array<IDatapoint>;

  // private dataset: Array<{name: string, value: Array<number | string>}> = ;
  private dataset: { name: string, value: [any, number] }[] = [{
    name: new Date(2015, 3, 11, 0, 10, 0).toString(),
    value: [new Date(2015, 3, 11, 0, 10, 0).toISOString(), 1]
  },
    {name: new Date(2015, 3, 11, 0, 11, 0).toISOString(), value: [new Date(2015, 3, 11, 0, 11, 0).toISOString(), 2]}];
  private size: number;
  private echartsInstance: any;
  private puffer: number;
  private channel: string;
  private counter = 0;

  constructor() {
    super();
    this.size = 200;
    this.puffer = 200;
    this.dataset = new Array();
  }

  ngOnInit(): void {
    this.channel = this.setting.feature;
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return (
            formatDate(date, 'HH:mm:ss', 'de') +
            ' : ' +
            params.value[1]
          );
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Fake Data',
        type: 'line',
        showSymbol: this.setting.graphicSetting.showSymbol
      }],
      areaStyle: {normal: {}}
    };
  }

  initDataset(datapoints: Array<IDatapoint>): void {
    super.initDataset(datapoints);
    datapoints.forEach( datapoint => {
      this.getChartPoint(datapoint);
    });
    this.updateOption = {
      series: [
        {
          data: this.dataset
        }
      ]
    };
  }

  getChartPoint(datapoint: IDatapoint): void {
    this.dataset.push(
      {
        name: new Date(datapoint._stop).toISOString(),
        value: [new Date(datapoint._stop).toISOString(), datapoint.value]
      }
    );
  }

  ngAfterViewInit(): void {
    console.info(this.channel, 'chart was created');
  }

  updateChart(datapoint: IDatapoint, turbine: string): void {
    console.log(datapoint);
    this.getChartPoint(datapoint);
    console.log(this.dataset);
    this.updateOption = {
      series: [
        {
          data: this.dataset
        }
      ]
    };
  }

  onChartInit(ec): void {
    this.echartsInstance = ec;
    console.log(ec);
  }

  changeDatasetNumber(size: number): void {
    this.size = size;
  }

  private createDateStr(stop: string): void {
    const myDate = new Date(stop);
  }

  onChartEvent($event, type: string): void {

    console.log('chart event:', type, $event);

  }
}
