import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGeoJson } from '../models/geoJson';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LongLat } from '../models/LongLat';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private geoPosts: IGeoJson[];
  private clickCordsState: BehaviorSubject<LongLat>;

  constructor(private http: HttpClient) {
    this.geoPosts = [];
    this.clickCordsState = new BehaviorSubject<LongLat>({ long: 0, lat: 0 });
  }

  getLongLat(): LongLat {
    return this.clickCordsState.getValue();
  }

  updateLongLat(newCords: LongLat): void {
    /*update state*/
    this.clickCordsState.next(newCords);
    console.log(this.clickCordsState.getValue());
  }

  public getDummyPostData(): void {
    this.http
      .get('http://localhost:3001/api/dummyCoords')
      .subscribe((dummyData) => {
        console.log(dummyData);
      });
  }

  public getGeoPostData(): IGeoJson[] {
    this.http
      .get<{ message: String; geoPost: IGeoJson[] }>(
        'http://localhost:3001/api/geoPost'
      )
      /*for geopost data defined above push to list*/
      .subscribe((geoPostData) => {
        if (this.geoPosts.length !== geoPostData.geoPost.length) {
          this.geoPosts.push(...geoPostData.geoPost);
        }
      });
    return this.geoPosts;
  }

  public postGeoPost(): void {}
}
