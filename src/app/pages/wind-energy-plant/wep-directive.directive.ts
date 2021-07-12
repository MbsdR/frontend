import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[wisaWepDirective]'
})
export class WepDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
