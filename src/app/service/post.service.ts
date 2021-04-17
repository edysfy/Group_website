import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LongLat } from '../models/LongLat';
import { UserService } from './user.service';

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

  constructor(private http: HttpClient, private userService: UserService) {
    /*initlise attributes*/
    this.geoPosts = new Array<GeoJson>();
    this.clickCordsState = new BehaviorSubject<LongLat>({ long: 0, lat: 0 });
    this.geoPostSubject = new BehaviorSubject<Array<GeoJson>>([]);
  }

  getLongLat(): LongLat {
    return this.clickCordsState.getValue();
  }

  updateLongLat(newCords: LongLat): void {
    /*update longitude and latitude coordinates*/
    this.clickCordsState.next(newCords);
    console.log(this.clickCordsState.getValue());
  }

  public getGeoPosts(): Array<GeoJson> {
     return this.geoPosts;
  }

  public getGeoPostData(): Observable<Array<GeoJson>> {
    this.http
      .get<{ message: string; geoPost: IGeoJson[] }>(
        'http://localhost:3000/api/geoPost'
      )
      /*incoming data fom api matches IGeoJson data type
      so create geoJson object out of data*/
      .subscribe((geoPostData) => {
        for (let i = 0; i < geoPostData.geoPost.length; i++) {
          /*create a new geojson object and add it to the array*/
          let incomingGJ = new GeoJson(
            geoPostData.geoPost[i].properties,
            geoPostData.geoPost[i].geometry.coordinates,
            geoPostData.geoPost[i]._id
          );
          /*push object to the array*/
          if(this.geoPosts.length != geoPostData.geoPost.length) {
            this.geoPosts.push(incomingGJ);
          }
        }
        /*set the new state fom the geoJson array*/
        this.geoPostSubject.next(this.geoPosts);
      });
    /*return observable, used in mapbox component to listen to
    changes in state*/
    return this.geoPostSubject.asObservable();
  }

  public createPost(rating: number, keyword: string, post: string) {
    /*need to get the coords set in the state*/
    const coords = this.clickCordsState.getValue();
    /*need to check if the coordiantes are not null*/
    if(coords.lat === 0 && coords.long === 0) {
      alert("You location hasn't been obtained, please try again");
      return;
    }
    /*create a new IGeoJson data type to sent to back end*/
    let newGeoPost: IGeoJson = {
      _id: 'not_set',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [coords.long, coords.lat],
      },
      properties: {
        username: localStorage.getItem('token'),
        dateTime: new Date(),
        keyword: keyword,
        mood: rating,
        textBody: post,
      },
    };
    console.log(newGeoPost);

    /*send this to our api, when get response store newGeoPost In Memory*/
    this.http
      .post<{ message: string; id: string, username: string}>(
        'http://localhost:3000/api/geoPost',
        newGeoPost
      )
      .subscribe((response) => {
        console.log(response);
        /*create a new geoJson object to put in memory and render to app*/
        newGeoPost.properties.username = response.username;
        const newGeoJson = new GeoJson(
          newGeoPost.properties,
          newGeoPost.geometry.coordinates,
          response.id
        );
        this.geoPosts.push(newGeoJson);
        this.geoPostSubject.next(this.geoPosts);
        /*send the geojson to the user service to add to user component*/
        this.userService.addPostToUserList(newGeoJson);
      });
  }

  /*takes is and then filters array if not in and sets new state
  and deletes the post in the db*/
  public deletePost(_id: string): void {
    this.geoPosts = this.geoPosts.filter(post => post._id != _id);
    this.geoPostSubject.next(this.geoPosts);
    this.http.delete<{message: string}>('http://localhost:3000/api/geoPost/' + _id)
    .subscribe(response => {
      console.log(response.message);
    })
  }

}
