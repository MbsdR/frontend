import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[wisaTile]'
})
export class TileDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
