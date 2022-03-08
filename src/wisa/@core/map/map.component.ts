import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from './service/marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'wisa-map',
  template: `
    <div class="content">
    <div class="map-container">
      <div class="map-frame">
        <div id="map"></div>
      </div>
    </div>
    </div>
  `,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map;
  private content = 'Content 1';

  private initMap(): void {
    this.map = L.map('map', {
      center: [53.146581, 8.181652],
      zoom: 20
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const divMarker = L.divIcon({
      classname: 'myDivMarker'
    });
    const myMarker = L.icon({
      iconUrl: '',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
    });
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    const marker = L.marker([ 53.146581, 8.181652], {icon: divMarker});
    marker.addTo(this.map);
    const pop = L.popup();
    pop.setLatLng([ 553.146581, 8.181652]);
    pop.setContent(this.content);
    marker.bindPopup(pop);
  }
}
