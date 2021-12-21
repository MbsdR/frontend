import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'wisa-not-found',
  template: `
    <h2>
        404 - Page not found
    </h2>
    <p *ngIf="path">You might want to go to the <a [routerLink]="path">"{{ path }}" page</a></p>`,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  path: string;

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1))
      .subscribe((data: { path: string }) => {
        this.path = data.path;
      });
  }

}
