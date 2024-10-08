import { Component } from '@angular/core';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css',
})
export class BtnMyLocationComponent {
  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {}

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady)
      throw Error(`No user's location`);

    if (!this.mapService.isMapReady)
      throw Error(`Map has not been inicialized`);

    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
