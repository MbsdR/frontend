import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {IProfile} from '../../model/IProfile';
import {newArray} from '@angular/compiler/src/util';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CHANNELS } from '../../model/mapping';
import {ProfileMockUpService} from '../../../@MockUp/profile-mock-up.service';
import {FREQUENCE, ISetting, UNITS} from '../../model/ISetting';
import { TYPECHARTS } from '../../model/typeCharts';

@Component({
  selector: 'wisa-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  channels = Object.values(CHANNELS);

  frequences = FREQUENCE;
  units = Object.values(UNITS);
  charts = TYPECHARTS;

  setting = this.fb.group(
    {
      channel: [''],
      unit: [''],
      frequence: [''],
      chart: ['']
    });


  constructor(@Inject(MAT_DIALOG_DATA) public settings: ISetting,
              private fb: FormBuilder) {
    // Todo: Initialize values für Settings
    console.log(settings);
    this.setting.setValue({
      channel: settings.channel,
      unit: settings.frequence.unit,
      frequence: settings.frequence.value,
      chart: settings.type
    });
  }

  ngOnInit(): void {
    this.setting.valueChanges.subscribe(value => {
      this.settings.channel = this.setting.value.channel;
      this.settings.type = this.setting.value.chart;
      this.settings.frequence.value = this.setting.value.frequence;
      this.settings.frequence.unit = this.setting.value.unit;
      console.log(this.settings);
    });
  }
}
