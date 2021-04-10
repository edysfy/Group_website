import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LongLat } from '../models/LongLat';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /*array used to store geoJsonObjects*/
  private geoPosts: Array<GeoJson>;
  /*geoJson array state manager*/
  private geoPostSubject: BehaviorSubject<Array<GeoJson>>;
  /*coordinate state manager*/
  private clickCordsState: BehaviorSubject<LongLat>;

  constructor(private http: HttpClient) {
<<<<<<< HEAD
    this.geoPosts = [];
    this.clickCordsState = new BehaviorSubject<LongLat>({ long: 0, lat: 0 });
=======
    /*initlise attributes*/
    this.geoPosts = new Array<GeoJson>();
    this.clickCordsState = new BehaviorSubject<LongLat>({ long: 0, lat: 0 });
    this.geoPostSubject = new BehaviorSubject<Array<GeoJson>>([]);
>>>>>>> dev
  }

  getLongLat(): LongLat {
    return this.clickCordsState.getValue();
  }

  updateLongLat(newCords: LongLat): void {
    /*update longitude and latitude coordinates*/
    this.clickCordsState.next(newCords);
    console.log(this.clickCordsState.getValue());
  }

<<<<<<< HEAD
  public getDummyPostData(): void {
    this.http
      .get('http://localhost:3001/api/dummyCoords')
      .subscribe((dummyData) => {
        console.log(dummyData);
      });
  }
=======
>>>>>>> dev

  public getGeoPostData(): Observable<Array<GeoJson>> {
    this.http
<<<<<<< HEAD
      .get<{ message: String; geoPost: IGeoJson[] }>(
        'http://localhost:3001/api/geoPost'
=======
      .get<{ message: string; geoPost: IGeoJson[] }>(
        'http://localhost:3000/api/geoPost'
>>>>>>> dev
      )
      /*incoming data fom api matches IGeoJson data type
      so create geoJson object out of data*/
      .subscribe((geoPostData) => {
        for (let i = 0; i < geoPostData.geoPost.length; i++) {
          /*create a new geojson object and add it to the array*/
          let incomingGJ = new GeoJson(
            geoPostData.geoPost[i].properties,
            geoPostData.geoPost[i].location.coordinates,
            geoPostData.geoPost[i]._id
          );
          /*push object to the array*/
          this.geoPosts.push(incomingGJ);
        }
        /*set the new state fom the geoJson array*/
        this.geoPostSubject.next(this.geoPosts);
      });
    console.log(this.geoPosts);
    /*return observable, used in mapbox component to listen to 
    changes in state*/
    return this.geoPostSubject.asObservable();
  }

  public createPost(rating: number, keyword: string, post: string) {
    /*need to get the coords set in the state*/
    const coords = this.clickCordsState.getValue();
    /*create a new IGeoJson data type to sent to back end*/
    let newGeoPost: IGeoJson = {
      _id: 'not_set',
      type: 'Feature',
      location: {
        type: 'Point',
        coordinates: [coords.long, coords.lat],
      },
      properties: {
        dateTime: new Date(),
        keyword: keyword,
        mood: rating,
        textBody: post,
      },
    };
    /*send this to our api, when get response store newGeoPost In Memory*/
    this.http
      .post<{ message: string; id: string }>(
        'http://localhost:3000/api/geoPost',
        newGeoPost
      )
      .subscribe((response) => {
        /*create a new geoJson object to put in memory and render to app*/
        const newGeoJson = new GeoJson(
          newGeoPost.properties,
          newGeoPost.location.coordinates,
          response.id
        );
        this.geoPosts.push(newGeoJson);
        this.geoPostSubject.next(this.geoPosts);
      });
  }
}
