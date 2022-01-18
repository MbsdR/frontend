import {Component, Inject, OnInit, Output} from '@angular/core';
import {AnalyseOrder} from '../../model/dto/IAnalyseOrder';
import {formatDate} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DEMONSTRATOR} from '../../../wisa.tokens';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'wisa-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  @Output() range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  maxDate: Date;
  constructor(@Inject(DEMONSTRATOR) private managerUrl: string,
              private client: HttpClient,
              private fb: FormBuilder) {
    this.maxDate = new Date(Date.now());
  }

  ngOnInit(): void {
  }
  startAnalysis(): void {
    const start: Date = this.range.controls.start.value;
    const end: Date = this.range.controls.end.value;
    const format = 'yyyy-MM-dd HH:mm:ssZ';
    const body = new AnalyseOrder(
      formatDate(start, format, 'de-DE', 'Europe/Berlin'),
      formatDate(end, format, 'de-DE', 'Europe/Berlin') , 'N1-1', 'OBE');
    this.client.post(this.managerUrl.concat('/api/analyse/pitch_deviation'), body).subscribe();
  }
}
