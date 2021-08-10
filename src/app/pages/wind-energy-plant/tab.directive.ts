import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[wisaTab]'
})
export class TabDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
