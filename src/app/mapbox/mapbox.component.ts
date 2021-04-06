import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { IGeoJson } from '../models/geoJson';

import * as mapboxgl from 'mapbox-gl';

import { PostService } from '../service/post.service';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  private map!: mapboxgl.Map;
  private latitude!: number;
  private longitude!: number;
  private geoPost!: IGeoJson[];
  dataHolder: any = [];

  constructor(
    private postService: PostService,
    private dataService: DataFetchService
  ) {}

  ngOnInit(): void {
    this.geoPost = this.postService.getGeoPostData();
    console.log(this.geoPost);
    this.retrieveData();
    this.getUserCoords();
  }

  /*gets user coordinates*/
  getUserCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.initMap();
        this.postService.getLocation(this.latitude, this.longitude);
      });
    }
  }
  retrieveData() {
    this.dataService
      .getData()
      .subscribe((dummyData) => (this.dataHolder = dummyData));
  }

  /*init map and flys to user coords*/
  initMap(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 6,
    });
    this.map.flyTo({
      center: [this.longitude, this.latitude],
    });
    console.log(' ');
    /*init geoJson taken from database*/
    var geojson = {
      type: 'FeatureCollection',
      features: this.geoPost,
    };
    geojson.features.forEach((marker) => {
      // make a marker for each feature and add to the map
      new mapboxgl.Marker()
        .setLngLat([
          marker.location.coordinates[0],
          marker.location.coordinates[1],
        ])
        .addTo(this.map);
      console.log([
        marker.location.coordinates[0],
        marker.location.coordinates[1],
      ]);
    });

    /*Geolocation*/
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    this.map.on('load', () => {
      this.map.addSource('earthquakes', {
        type: 'geojson',
        data: this.dataHolder,
      });

      this.map.addLayer(
        {
          id: 'earthquakes-heat',
          type: 'heatmap',
          source: 'earthquakes',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property moodRatingnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'moodRating'],
              0,
              0,
              6,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0,
            ],
          },
        },
        'waterway-label'
      );

      this.map.addLayer({
        id: 'markers',
        interactive: true,
        type: 'symbol',
        source: 'earthquakes',
        minzoom: 7,
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
          'icon-size': 2,
        },
        paint: {},
      });

      this.map.on('click', (e) => {
        var features = this.map.queryRenderedFeatures(e.point, {
          layers: ['markers'],
        });

        if (!features.length) {
          return;
        }

        var feature = features[0];
        if (feature.geometry.type === 'Point') {
          var cords = new mapboxgl.LngLat(
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          );

          var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(cords)
            .setHTML('<h3>' + feature?.properties?.moodRating + '</h3>')
            .setLngLat(cords)
            .addTo(this.map);
        }
      });
    });
  }
}
