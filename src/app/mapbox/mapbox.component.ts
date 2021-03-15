import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  public map!: mapboxgl.Map;

  constructor() {

   }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [-122.447303, 37.753574]
    });
    this.map.on("click", function(e:any){
      console.log("background click", e.lngLat);
      var geojson = {
          type: "FeatureCollection",
          features: [{
              type:"Feature",
              geometry: { type: "Point", coordinates: [ e.lngLat.lng, e.lngLat.lat ]}
          }]
      };
  });
  }

}
