import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CHANNELS } from '../../model/Constants/mapping';
import { ITileSetting } from '../../model/Usermangemant/ITileSetting';
import { FREQUENCY, UNITS, TYPECHARTS } from '../../model/Constants/ChartSettingConstants';

@Component({
  selector: 'wisa-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  channels = Object.values(CHANNELS);

  frequences = FREQUENCY;
  units = Object.values(UNITS);
  charts = TYPECHARTS;

  setting = this.fb.group(
    {
      channel: [''],
      unit: [''],
      frequence: [''],
      chart: ['']
    });


  constructor(@Inject(MAT_DIALOG_DATA) public settings: ITileSetting,
              private fb: FormBuilder) {
    // Todo: Initialize values für Settings
    console.log(settings);
    this.setting.setValue({
      channel: settings.feature,
      unit: settings.frequency.unit,
      frequence: settings.frequency.value,
      chart: settings.type
    });
  }

  ngOnInit(): void {
    this.setting.valueChanges.subscribe(value => {
      this.settings.feature = this.setting.value.channel;
      this.settings.type = this.setting.value.chart;
      this.settings.frequency.value = this.setting.value.frequence;
      this.settings.frequency.unit = this.setting.value.unit;
      console.log(this.settings);
    });
  }
}
