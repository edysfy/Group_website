import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGeoJson } from '../models/geoJson';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private geoPosts: IGeoJson[];
  private latitude!: number;
  private longitude!: number;

  constructor(private http: HttpClient) {
    this.geoPosts = [];
  }

  public getDataSource(): string {
    return 'http://localhost:3000/api/dummyCoords';
  }

  public getGeoPostData(): IGeoJson[] {
    this.http
      .get<{ message: String; geoPost: IGeoJson[] }>(
        'http://localhost:3000/api/geoPost'
      )
      /*for geopost data defined above push to list*/
      .subscribe((geoPostData) => {
        if (this.geoPosts.length !== geoPostData.geoPost.length) {
          this.geoPosts.push(...geoPostData.geoPost);
        }
      });
    return this.geoPosts;
  }

  public getLocation(lat: number,long: number): void {
    this.latitude = lat;
    this.longitude= long;
    console.log("look at the cords!");
    console.log(this.latitude);
    console.log(this.longitude);
  }
  public getLatitude(): number {
    return this.latitude;
  }
  public getLongitude(): number {
    return this.longitude;
  }
}
