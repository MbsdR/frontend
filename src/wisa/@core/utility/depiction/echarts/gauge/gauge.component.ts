import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";
import {ITileSetting} from "../../../../model/Usermangemant/ITileSetting";
import {IDatapoint} from "../../../../model/dto/IDatapoint";
import {Graphic} from "../../IGraphic";

@Component({
  selector: 'wisa-gauge',
  template:`
    <div echarts wisaEChart [options]="option" [merge]="updateOption" (chartDataZoom)="onChartEvent($event, 'chartDataZoom')"
      class="Echarts"></div>`,
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent extends Graphic implements OnInit, AfterViewInit {
  setting: ITileSetting;
  option: EChartsOption;
  updateOption: any;
  initData: Array<IDatapoint>;

  private dataset: any;
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
    this.option = {
      series: [{
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.5, 'green'],
              [0.75, 'yellow'],
              [1, 'red']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'black'
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'black',
          distance: -30,
          fontSize: 20
        },
        detail: {
          valueAnimation: true,
          color: 'black'
        },
        data: [{
          value: 70
        }]
      }]
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
