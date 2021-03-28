import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class DatafetchService {

  constructor() { }

  getDataSource(): string {
    return 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson';
  }
}
