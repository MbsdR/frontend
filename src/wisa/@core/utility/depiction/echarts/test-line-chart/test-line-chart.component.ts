import {Component, OnDestroy, OnInit} from '@angular/core';
import {Graphic} from '../../IGraphic';

@Component({
  selector: 'wisa-test-line-chart',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" class="Echarts"></div>`,
  styleUrls: ['./test-line-chart.component.css']
})
export class TestLineChartComponent extends Graphic implements OnInit, OnDestroy {
  options: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number;
  private data: any[];
  private timer: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(1997, 9, 3, 0, 0, 0);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      // this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          params = params[0];
          const date = new Date(params.name);
          return date.toISOString() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
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
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        if (this.data.length >= 100) {
          this.data.shift();
        }
        this.data.push(this.randomData());

      }
      console.log(this.data);
      // update series data:
      this.updateOptions =
        {
          name: 'Test',
          series:
            [{
              data: this.data
            }]
        };
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  randomData(): { name: string, value: Array<any> } {
    this.now = new Date(this.now.getTime() + 3600000);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        this.now.toISOString(),
        Math.round(this.value)
      ]
    };
  }
}
