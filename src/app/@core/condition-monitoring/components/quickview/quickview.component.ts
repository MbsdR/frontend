import {Component, Input, OnInit} from '@angular/core';
import {ConditionMonitoringService} from '../../services/condition-monitoring.service';

@Component({
  selector: 'wisa-condition-quickview',
  template: `
    <div [matBadge]="failure" matBadgePosition="above before" matBadgeColor="primary" [matBadgeHidden]="hidden">
    <svg width="15mm" height="15mm" viewBox="0 0 210 297" (click)="navigate()">
      <metadata>
      </metadata>
      <path d="m125.55612 80.225861a20.663107 57.006531 0 0 1-20.65481 57.006529 20.663107 57.006531 0 0 1-20.671397-56.960762 20.663107 57.006531 0 0 1 20.638217-57.052257 20.663107 57.006531 0 0 1 20.68796 56.914954" [attr.fill]="fillColor" style="stroke-linecap:round;stroke-width:2.02549267;stroke:#000"/>
      <path transform="matrix(.69149453 .7223817 -.67726399 .73574009 0 0)" d="m190.78873 82.285019a21.335236 55.321098 0 0 1-21.32667 55.321091 21.335236 55.321098 0 0 1-21.3438-55.276676 21.335236 55.321098 0 0 1 21.30954-55.365473 21.335236 55.321098 0 0 1 21.3609 55.232228" [attr.fill]="fillColor" style="stroke-linecap:round;stroke-width:2.0275178;stroke:#000"/>
      <path transform="matrix(-.69149453 .7223817 .67726399 .73574009 0 0)" d="m35.74895 233.74272a21.335236 55.321098 0 0 1-21.326671 55.3211 21.335236 55.321098 0 0 1-21.3437933-55.27668 21.335236 55.321098 0 0 1 21.3095353-55.36548 21.335236 55.321098 0 0 1 21.360902 55.23223" [attr.fill]="fillColor" style="stroke-linecap:round;stroke-width:2.0275178;stroke:#000"/>
      <path d="m93.996126 173.91976-20.423849 102.72465h63.923413l-21.25027-102.72465" [attr.fill]="fillColor" style=";stroke-width:2.21357417;stroke:#000"/>

    </svg>
    </div>
  `,
  styleUrls: ['./quickview.component.css']
})
export class QuickviewComponent implements OnInit {

  fillColor = 'rgb(0, 100, 0)';
  failure: number;
  hidden: boolean;
  @Input() turbine: string;

  constructor(private conditionMonitoringService: ConditionMonitoringService) {
    this.hidden = true;
  }

  ngOnInit(): void {
    console.log(this.turbine);
    this.conditionMonitoringService.get$Condition().subscribe( condition => {
      if (condition.failure > 0) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
      this.fillColor = condition.condition;
      this.failure = condition.failure;
    });
  }

  navigate(): void {

  }
}
