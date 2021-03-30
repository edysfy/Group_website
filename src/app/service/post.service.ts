import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGeoJson } from '../models/geoJson';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private geoPosts: IGeoJson[];

  constructor(private http: HttpClient) {
    this.geoPosts = [];
  }

  public getDataSource(): string {
    return 'http://localhost:3001/api/dummyCoords';
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
}
