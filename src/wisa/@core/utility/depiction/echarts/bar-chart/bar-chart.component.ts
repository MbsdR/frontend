import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ITileSetting} from "../../../../model/Usermangemant/ITileSetting";
import {EChartsOption} from "echarts";
import {IDatapoint} from "../../../../model/dto/IDatapoint";
import {Graphic} from "../../IGraphic";

@Component({
  selector: 'wisa-bar-chart',
  template: `
    <div echarts wisaEChart [options]="option" [merge]="updateOption" (chartDataZoom)="onChartEvent($event, 'chartDataZoom')"
         class="Echarts"></div>`,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends Graphic implements OnInit , AfterViewInit {

  setting: ITileSetting;
  option: EChartsOption;
  updateOption: any;
  initData: Array<IDatapoint>;


  private size: number;
  private echartsInstance: any;
  private puffer: number;
  private channel: string;
  private counter = 0;
  private dataset: any;

  constructor() {
    super();
    this.size = 200;
    this.puffer = 200;
    this.dataset = new Array();
  }

  ngOnInit(): void {
    this.channel = this.setting.feature;
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['RpmRotor', 'RpmGenerator', 'Wind']
      },
      xAxis: [
        {
          type: 'category',
          data: ['WEA1', 'WEA2', 'WEA3', 'WEA4', 'WEA5', 'WEA6', 'WEA7', 'WEA8', 'WEA9', 'WEA10', 'WEA11', 'WEA12'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'RPM',
          min: 0,
          max: 250,
          interval: 50,
        },
        {
          type: 'value',
          name: 'm/s',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} m/s'
          }
        }
      ],
      series: [
        {
          name: 'AVGRo',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: 'AVGGen',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: 'AVGWind',
          type: 'bar',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
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





