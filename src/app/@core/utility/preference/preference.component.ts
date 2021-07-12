import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Profile, Setting} from '../../model/profile';
import {newArray} from '@angular/compiler/src/util';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'wisa-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  channels = [{
    value: 'WindSpeed',
    label: 'Windgeschwindigkeit'
  },
    {
      value: 'ActivePower',
      label: 'Aktivpower'
    }];
  frequences = [{
    value: 1,
    unit: 'sek'
  }, {
    value: 3,
    unit: 'sek'
  }, {
    value: 5,
    unit: 'min'
  }, {
    value: 10,
    unit: 'min'
  }];
  diagrams = [{
    value: 'line',
    label: 'Liniendiagramm'
  }, {
    value: 'bar',
    label: 'Barchart'
  }];

  profil = {
    channel: this.channels[0],
    frequence: this.frequences[3]
  };

  setting = this.fb.group(
    {
      channel: [''],
      frequence: [''],
      diagram: ['']
    });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder) {
    // Todo: Initialize values für Settings
  }

  ngOnInit(): void {
  }
}
