import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { MapService, PlacesService } from '../../services';

import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation)
      throw Error('There is not placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: this.placesService.userLocation,
      zoom: 14,
    });

    const popup = new Popup().setHTML(`
      <h6>Here I am </h6>
      <span>I am in this place</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
