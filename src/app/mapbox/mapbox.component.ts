import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { FeatureCollection, GeoJson, IGeoJson } from '../models/geoJson';
import * as mapboxgl from 'mapbox-gl';
import { PostService } from '../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserpostComponent } from '../userpost/userpost.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  private map!: mapboxgl.Map;
  private geoPost!: Array<GeoJson>;
  private geoPostSubscriber!: Subscription;
  private authSubscriber!: Subscription;
  isLoggedIn!: boolean;
  private source: any;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.authSubscriber = this.authService.getAuthState().subscribe((logIn) => {
      this.isLoggedIn = logIn;
    });
  }

  ngOnInit(): void {
    /*suscribe to the getGeoPost data to listen to changes in data*/
    this.initMap();
  }

  /*init map and flys to user coords*/
  initMap(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 2,
      center: [-0.2101765, 51.5942466],
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

    /*this opens dialog when click and saves coords as new state*/
    this.map.on('click', (e) => {
      if(this.isLoggedIn) {
        const zoom = this.map.getZoom();
        console.log(zoom);
        if (zoom > 12) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = false;
          dialogConfig.width = '60%';
          dialogConfig.height = '78%';
          dialogConfig.hasBackdrop = true;
          dialogConfig.panelClass = 'custom-dialog';
          dialogConfig.position = {bottom: '3%', right: '7%'};
          this.dialog.open(UserpostComponent, dialogConfig);
          this.postService.updateLongLat({
            long: e.lngLat.lng,
            lat: e.lngLat.lat,
          });
        }
      }
    });

    /*load the data into a source*/
    this.map.on('load', (e) => {
      this.map.addSource('data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      /*create feature collection and set to data*/
      this.source = this.map.getSource('data');
      this.source.setData(new FeatureCollection(this.geoPost));
      /*suscribe to the data source in the service*/
      this.geoPostSubscriber = this.postService
        .getGeoPostData()
        .subscribe((geoPostArr) => {
          this.source.setData(new FeatureCollection(geoPostArr));
      });



    /*----------------layer for user's posts------------------*/

      this.map.addLayer({
        id: 'user-markers',
        interactive: true,
        type: 'symbol',
        source: 'data',
        minzoom: 9.2,
        layout: {
          'icon-image': 'volcano-11',
          'icon-allow-overlap': true,
          'icon-size': 2,
        },
    });
    this.map.setFilter('user-markers',['==','username',this.authService.getUsername()]);

    /*----------------layer for user's posts------------------*/


    /*---------------------everyone's markers apart from user==============*/
      this.map.addLayer({
        id: 'markers',
        interactive: true,
        type: 'circle',
        source: 'data',
        minzoom: 9.2,
        paint: {
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-radius': 5,
          'circle-color': [
            'step',
            ['get', 'mood'],
            '#EC986F',
            0,
            'rgba(255,255,178,0)',
            1,
            'rgb(254,204,92)',
            2,
            'rgb(65,182,196)',
            3,
            'rgb(227,26,28)',
          ],
        },
      });

      this.map.addLayer(
        {
          id: 'mood-heat',
          type: 'heatmap',
          source: 'data',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property moodRatingnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mood'],
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
              'rgba(255,255,178,0)',
              0.33,
              'rgb(254,204,92)',
              0.66,
              'rgb(65,182,196)',
              1,
              'rgb(227,26,28)',
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

      /*hovers on marker to bring up the post*/
      this.map.on('mouseenter', 'markers', (e) => {
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
            .setHTML(
              '<h3>' +
                feature?.properties?.textBody +
                '</h3><p>' +
                'MoodRating:' +
                feature?.properties?.mood +
                '</p><p>' +
                'Keyword:' +
                feature?.properties?.keyword +
                '</p><p>' +
                feature?.properties?.username
            )
            .setLngLat(cords)
            .addTo(this.map);
        }
        this.map.on('mouseleave', 'markers', (e) => {
          this.map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    });
  /*--------------------everyone's markers apart from user==============*/

  }
}
