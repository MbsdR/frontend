import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Datapoint} from '../../../@core/model/datapoint';
import {map} from 'rxjs/operators';
import {EChartsOption} from 'echarts';
import {Profile} from '../../../@core/model/profile';

@Component({
  selector: 'wisa-line-chart',
  template: `
    <div echarts [options]="options" [merge]="updateOptions" (chartInit)="onChartInit($event)"></div>`,
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data$: EventEmitter<Datapoint>;
  @Input() profile: Profile;
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
        name: this.profile.unit,
        type: 'value'
      },
      series: [{
        type: 'line',
        data: this.dataset /* [['2017-01-01 00:00:00', 5.15],
          ['2017-01-01 00:01:00', 15],
          ['2017-01-01 00:02:00', 15],
          ['2017-01-01 00:04:00', 15]], */
      }]
    };

    this.data$.pipe(map(datapoint => {
      console.log(this.profile.channel.concat('_', this.profile.turbina));
      this.dataset.push([datapoint._stop, datapoint[this.profile.channel.concat('_', this.profile.turbina)]]);
      counter += 1;
      if (this.dataset.length > this.size) {
        this.dataset.shift();
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
