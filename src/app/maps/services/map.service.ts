import { DirectionsRespose, Route } from './../interfaces/directions';
import { EventEmitter, Injectable } from '@angular/core';

import {
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
  SourceSpecification,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  tripInfoEmitter = new EventEmitter<{ kms: number; duration: number }>();

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('Map not inicialized');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Map not inicialized');

    this.markers.forEach((marker) => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
        `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    // Map limit
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<DirectionsRespose>(`/${start.join(',')};${end.join(',')}`)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.routes.length === 0) {
            Swal.fire({
              title: 'Error!',
              text: 'No route found.',
              icon: 'info',
              confirmButtonText: 'Ok',
              customClass: {
                popup: 'small-alert',
              },
            });
            return;
          }

          this.drawPolyline(resp.routes[0]);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Not able to go driving.',
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'small-alert',
            },
          });
        },
      });
  }

  private drawPolyline(route: Route) {
    if (!this.drawPolyline) throw Error('Invalid route');

    const kms = route.distance / 1000;
    const duration = route.duration / 60;

    this.tripInfoEmitter.emit({ kms, duration });

    if (!this.map) throw Error('Map not inicialized');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    });
  }
}
