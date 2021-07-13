import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[wisaAdTile]'
})
export class AdTileDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
