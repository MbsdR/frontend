import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {DataAccessService} from '../../@core/service/Data-Access/data-access.service';
import {OcarinaOfTimeService} from '../../@core/ocarina-of-time/service/OcarinaOfTime/ocarina-of-time.service';
import {MatDialog} from '@angular/material/dialog';
import {ContentComponent} from './content/content.component';
import {TileDirective} from './directives/tile.directive';
import {IProfile, Tile} from '../../@core/model/IProfile';

@Component({
  selector: 'wisa-tile',
  template: `
        <ng-template wisaTile></ng-template>
  `
})
export class TileComponent implements AfterViewInit{

  @ViewChild(TileDirective, {static: true}) tiles!: TileDirective;
  @Input() tile: Tile;

  channel = 'Wind';

  constructor(@Inject(DataAccessService) dataAccessService: DataAccessService,
              private ocarina: OcarinaOfTimeService,
              private dialog: MatDialog,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit(): void {
    this.loadTile();
    console.info('Tile was created');
  }

  loadTile(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentComponent);

    const viewContainerRef = this.tiles.viewContainerRef;

    const componentRef = viewContainerRef.createComponent<ContentComponent>(componentFactory);
    componentRef.instance.tile = this.tile;

  }
}
