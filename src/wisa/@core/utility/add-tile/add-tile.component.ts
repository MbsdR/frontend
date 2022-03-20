import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wisa-add-tile',
  template: `
 <h2 mat-dialog-title>Kachelauswahl</h2>
 <mat-dialog-content>Pitchabweichung</mat-dialog-content>
 <mat-dialog-content>Temperaturüberwachung</mat-dialog-content>
 <mat-dialog-content>Fehlercode 149</mat-dialog-content>
 <mat-dialog-content>Wetterprognosen</mat-dialog-content>
 <button mat-button [mat-dialog-close]="true">Schließen</button>
  `,
  styleUrls: ['./add-tile.component.css']
})
export class AddTileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
