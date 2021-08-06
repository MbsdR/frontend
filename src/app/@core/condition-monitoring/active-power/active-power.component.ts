import {AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {EChartsOption} from 'echarts';
import {DataAccessService} from '../../service/Data-Access/data-access.service';
import {Query} from '../../model/query';
import {QueryBuilderService} from '../../service/queryBuilder/query-builder.service';
import {IDatapoint} from '../../model/IDatapoint';
import {Observable} from 'rxjs';

@Component({
  selector: 'wisa-active-power',
  templateUrl: './active-power.component.html',
  styleUrls: ['./active-power.component.css']
})
export class ActivePowerComponent implements OnInit, AfterViewInit {

  @Input() channel = ['ActivePower',];
  @Input() timeRange = {
    start: '2017-01-01',
    end: '2017-01-02'
  };
  @Input() turbines = ['A01',];
  @Input() freq: string;
  @Input() func: string;
  @Input() ocarina: Observable<Date>;

  @Output() datapoint: IDatapoint;

  chartOption: EChartsOption;
  xaxis: Array<string> = [];
  series: Array<number | string> = [];
  datapoints: Array<IDatapoint> = [];

  private query: Query = {
    vendor: 'VAT',
    start: '2017-01-01',
    end: '2017-01-02',
    channels:
      ['ActivePower']
    ,
    turbines:
      ['A01']
    ,
    freq: '5m',
    func: 'mean'

  };
  private queryBuilder: QueryBuilderService;
  private eventEmitter: EventEmitter<IDatapoint>;

  constructor(@Inject(DataAccessService) private dataAccessService: DataAccessService) {
  }

  ngAfterViewInit(): void {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.xaxis,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.series,
          type: 'line',
        },
      ],
    };
  }

  ngOnInit(): void {
    const dataset = this.dataAccessService.getDataSet(this.query);
    console.log('Start Active Power');
    console.log(dataset);
    this.eventEmitter.subscribe(value => {
      this.datapoint = value;
      console.info(value.ActivePower_A01);
      this.datapoints.push(value);
      this.xaxis.push(value._start);
      this.series.push(value.ActivePower_A01);
    });
    /* this.queryBuilder
      .start(this.timeRange.start);
    console.info(this.queryBuilder.getQuery());
*/
    // console.log(this.dataAccessService.getDataSet(this.query));
  }

}
