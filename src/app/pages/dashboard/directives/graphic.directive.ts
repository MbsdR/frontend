import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[wisaGraphic]'
})
export class GraphicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
