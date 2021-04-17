import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { FeatureCollection, GeoJson, IGeoJson } from '../models/geoJson';
import * as mapboxgl from 'mapbox-gl';
import { PostService } from '../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserpostComponent } from '../userpost/userpost.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidebarService } from '../service/sidebar.service';
import { Sidebar } from '../models/Sidebar';
import { UserSearchService } from '../service/user-search.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('0.2s', style({ width: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ width: 500, opacity: 1 }),
        animate('0.2s', style({ width: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class MapboxComponent implements OnInit {
  private map!: mapboxgl.Map;
  private geoPost!: Array<GeoJson>;
  private source: any;
  private userSearchClickAmount: number = 0;
  isLoggedIn!: boolean;
  sidebarState!: Sidebar;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private sidebarService: SidebarService,
    private userSearchService: UserSearchService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((logIn) => {
      this.isLoggedIn = logIn;
    });
    this.sidebarService.getSidebarObvs().subscribe((sidebar) => {
      this.sidebarState = sidebar;
    });
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
  
      /*this opens dialog when click and saves coords as new state*/
      this.map.on('click', (e) => {
        if (this.isLoggedIn) {
          const zoom = this.map.getZoom();
          console.log(zoom);
          if (zoom > 12) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = false;
            dialogConfig.width = '55%';
            dialogConfig.height = '70%';
            dialogConfig.hasBackdrop = true;
            dialogConfig.panelClass = 'custom-dialog';
            dialogConfig.position = { bottom: '8%', right: '20%' };
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
        this.userSearchService
          .getHasSearchInitState()
          /*susbscrice to user search state*/
          .subscribe((activatedUserSearch) => {
            /*if user search is activates, display all posts from database*/
            // if(this.userSearchClickAmount > 0) {
            //   this.removeAllMapLayers(this.map);
            //   this.map.removeSource('data');
            // }
            console.log(activatedUserSearch);
            if (activatedUserSearch === false) {
              this.userSearchClickAmount++;
              this.createDataSource(this.map,'data');
              /*create feature collection and set to data*/
              this.source = this.map.getSource('data');
              /*suscribe to the data source in the service*/
              this.postService
                .getGeoPostData()
                .subscribe((geoPostArr) => {
                  this.source.setData(new FeatureCollection(geoPostArr));
                });
              this.initMapLayersForData(this.map,'data');  
            } else {
              this.removeAllMapLayers(this.map);
              this.map.removeSource('data');
            }
          });
      });
    }

  flyTo(lngLat: number[]) {
    this.map.flyTo({
      center: [lngLat[0], lngLat[1]],
      zoom: 15,
    });
  }

  createDataSource(map: mapboxgl.Map, name: string):void {
    map.addSource(name, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
  }

  initMapLayersForData(map: mapboxgl.Map, layer: string): void {
    /*----------------layer for user's posts------------------*/
    map.addLayer({
      id: 'user-markers',
      interactive: true,
      type: 'symbol',
      source: layer,
      minzoom: 9.2,
      layout: {
        'icon-image': 'volcano-11',
        'icon-allow-overlap': true,
        'icon-size': 2,
      },
    });
    map.setFilter('user-markers', [
      '==',
      'username',
      this.authService.getUsername(),
    ]);

    /*----------------layer for user's posts------------------*/
    /*---------------------everyone's markers apart from user==============*/
    map.addLayer({
      id: 'markers',
      interactive: true,
      type: 'circle',
      source: layer,
      minzoom: 9.2,
      paint: {
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 1,
        'circle-radius': 5,
        'circle-color': [
          'step',
          ['get', 'mood'],
          '#EC986F',
          1,
          'rgb(65,182,196)',              
          2,
          'rgb(254,204,92)',
          3,
          'rgb(227,26,28)',
        ],
      },
    });
    map.addLayer(
      {
        id: 'mood-heat',
        type: 'heatmap',
        source: layer,
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
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
        },
      },
      'waterway-label'
    );
    /*hovers on marker to bring up the post*/
    map.on('mouseenter', 'markers', (e) => {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['markers'],
      });
      map.getCanvas().style.cursor = 'pointer';

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
          .addTo(map);
      }
      map.on('mouseleave', 'markers', (e) => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
      /*--------------------everyone's markers apart from user==============*/    
  }

  removeAllMapLayers(map: mapboxgl.Map):void {
    map.removeLayer('user-markers');
    map.removeLayer('markers');
    map.removeLayer('mood-heat');
  }

}
