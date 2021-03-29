import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class DatafetchService {

  constructor() { }

  getDataSource(): string {
    return 'http://localhost:3001/api/dummyCoords';
  }
}
