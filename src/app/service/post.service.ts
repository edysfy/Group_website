import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { LongLat } from '../models/LongLat';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private geoPosts: Array<GeoJson>;
  private geoPostObservable: Observable<Array<GeoJson>>;
  private clickCordsState: BehaviorSubject<LongLat>;

  constructor(private http: HttpClient) {
    this.geoPosts = new Array<GeoJson>();
    this.clickCordsState = new BehaviorSubject<LongLat>({ long: 0, lat: 0 });
    this.geoPostObservable = of(this.geoPosts);
  }

  getLongLat(): LongLat {
    return this.clickCordsState.getValue();
  }

  updateLongLat(newCords: LongLat): void {
    /*update state*/
    this.clickCordsState.next(newCords);
    console.log(this.clickCordsState.getValue());
  }

  public getGeoPostData(): Observable<Array<GeoJson>> {
    this.http
      .get<{ message: String; geoPost: IGeoJson[] }>(
        'http://localhost:3000/api/geoPost'
      )
      /*for geopost data defined above push to list*/
      .subscribe((geoPostData) => {
        for (let i = 0; i < geoPostData.geoPost.length; i++) {
          /*create a new geojson object and add it to the array*/
          let incomingGJ = new GeoJson(
            geoPostData.geoPost[i].properties,
            geoPostData.geoPost[i].location.coordinates,
            geoPostData.geoPost[i]._id
          );
          if (this.geoPosts.length !== geoPostData.geoPost.length) {
            this.geoPosts.push(incomingGJ);
          }
        }
      });
    console.log(this.geoPosts)
    return this.geoPostObservable;
  }

}
