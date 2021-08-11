import {AfterViewInit, Component, ElementRef, Input, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {interval} from 'rxjs';
import {formatDate} from '@angular/common';
import {Graphic} from '../../graphic';
import {ITileSetting} from '../../../../model/Usermangemant/ITileSetting';
import { IDatapoint } from 'src/app/@core/model/IDatapoint';


@Component({
  selector: 'wisa-heatmap',
  template: `
    <!-- <div echarts [initOpts]="initOpts" [options]="options" [merge]="updateOptions" [loading]="isLoading"></div> -->
    <div echarts [options]="options" [merge]="updateOptions" class="demo-chart"></div>
  `,
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit, AfterViewInit, Graphic {

  @Input() setting: ITileSetting;

  chartDom: any;
  myChart: any;
  options: any;
  updateOptions: any;
  private data: any[];
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };
  isLoading = false;

  constructor() {
  }

  updateChart(datapoint: IDatapoint, turbine: string): void {
    throw new Error('Method not implemented.');
    this.updateOptions = {series: {data: []}};
  }

  ngOnInit(): void {
    this.data = this.getVirtulData(2016);
    console.log(this.data);
    this.options = {
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2016',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: {show: false}
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data
      }
    };
  }

  ngAfterViewInit(): void {
    interval(2000).subscribe(value => this.isLoading = true);

  }

  update(): void {
    this.updateOptions = {series: {data: this.getVirtulData(2018)}};
  }

  getVirtulData(year): any {
    year = year || '2017';
    const date = +echarts.number.parseDate(year + '-01-01');
    const end = +echarts.number.parseDate((+year + 1) + '-01-01');
    const dayTime = 3600 * 24 * 1000;

    const data = [];
    for (let time = date; time < end; time += dayTime) {
      console.log(LOCALE_ID);
      data.push([
        formatDate(time, 'yyyy-MM-dd', 'de'),
        Math.floor(Math.random() * 10000)
      ]);
    }
    return data;
  }


}
