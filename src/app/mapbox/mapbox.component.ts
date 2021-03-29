import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';

import { DatafetchService } from '../service/datafetch.service';
import { PostbuttonComponent } from '../postbutton/postbutton.component';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  public map!: mapboxgl.Map;

  constructor(private dataService: DatafetchService) {

   }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-120, 38],
    zoom: 6
    });
    this.map.on('load', () => {
      this.map.addSource('earthquakes', {

        type: 'geojson',
        data: this.dataService.getDataSource()
      });

    

    });
  }
}
