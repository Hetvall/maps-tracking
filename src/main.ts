import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken =
  'pk.eyJ1IjoiamFtZXMtb3JvemNvIiwiYSI6ImNtMHloYW9xeDBvbXEyanB5Yng3cnU2bWIifQ.93e9W-QCi6Z3Ta3ZIQIfzA';

if (!navigator.geolocation) {
  alert('Browser does not support geolocation');
  throw new Error('Browser does not support geolocation');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
