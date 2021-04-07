import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { IGeoJson } from '../models/geoJson';

import * as mapboxgl from 'mapbox-gl';

import { PostService } from '../service/post.service';
import { DataFetchService } from '../data-fetch.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserpostComponent } from '../userpost/userpost.component';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  private map!: mapboxgl.Map;
  private geoPost!: IGeoJson[];
  dataHolder: any = [];

  constructor(
    private postService: PostService,
    private dataService: DataFetchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.geoPost = this.postService.getGeoPostData();
    console.log(this.geoPost);
    this.retrieveData();
    this.initMap();
  }

  retrieveData() {
    this.dataService
      .getData()
      .subscribe(dummyData => {
        this.dataHolder = dummyData;
        console.log(dummyData);
      });
  }

  /*init map and flys to user coords*/
  initMap(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 6,
      center: [ -0.2101765,  51.5942466],
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
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (e) => {
      const zoom = this.map.getZoom()
      console.log(zoom);
      if(zoom > 12) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = false;
        dialogConfig.width = '60%';
        dialogConfig.height = '78%';
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = 'custom-dialog';
        this.dialog.open(UserpostComponent, dialogConfig);
        this.postService.updateLongLat({
          long: e.lngLat.lng,
          lat: e.lngLat.lat
        })
      }
    });







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

      this.map.on('mouseenter','markers', (e) => {
        var features = this.map.queryRenderedFeatures(e.point, {
          layers: ['markers'],
        });
        this.map.getCanvas().style.cursor = 'pointer';

        if (!features.length) {
          return;
        }

        var feature = features[0];
        if (feature.geometry.type === 'Point') {
          var cords = new mapboxgl.LngLat(
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1]
          );

          var popup = new mapboxgl.Popup({
            offset: [0, -15],
            closeButton: false,
            closeOnClick: false,
          })
            .setLngLat(cords)
            .setHTML('<h3>' + feature?.properties?.moodRating + '</h3>')
            .setLngLat(cords)
            .addTo(this.map);
        }
        this.map.on('mouseleave', 'markers', (e)=> {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
          });
      });
    });


  }
}
