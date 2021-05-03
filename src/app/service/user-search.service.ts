import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  hasSearchInit!: BehaviorSubject<boolean>;
  searchQueryState!: BehaviorSubject<Search>;
  private geoSearchState!: BehaviorSubject<Array<GeoJson>>;
  sub!: Subscription;

  constructor(private http: HttpClient) {
    this.geoSearchState = new BehaviorSubject<Array<GeoJson>>([]);
    this.hasSearchInit = new BehaviorSubject<boolean>(false);
    this.searchQueryState = new BehaviorSubject<Search>({
      minAge: 0,
      maxAge: 100,
      minDay: -3650,
      maxDay: 0,
      happy: false,
      coping: false,
      sad: false,
      male: false,
      female: false,
    });
  }

  setHasSearchInit(set: boolean): void {
    this.hasSearchInit.next(set);
  }

  getIsInSearchState(): BehaviorSubject<boolean> {
    return this.hasSearchInit;
  }

  getSearchQuery(): void {
    this.sub = this.searchQueryState.asObservable().subscribe((searchQuery) => {
      console.log(searchQuery);
      this.http.post<{ message: string, geoSearchArray: IGeoJson[] }>(
        'http://localhost:3000/api/search',
        searchQuery
      )
      .subscribe(response => {
        let geoSearchArr: Array<GeoJson> = new Array<GeoJson>();
        for(let i = 0; i<response.geoSearchArray.length; i++) {
          let incomingGJ = new GeoJson(
            response.geoSearchArray[i].properties,
            response.geoSearchArray[i].geometry.coordinates,
            response.geoSearchArray[i]._id
          );
          geoSearchArr.push(incomingGJ);
        }
        this.geoSearchState.next(geoSearchArr);
      });
    });
  }

  getGeoSearchObvservable(): Observable<Array<GeoJson>> {
    return this.geoSearchState.asObservable();
  }

  destroySubscriber(){
    this.sub.unsubscribe();
  }

  setSearchQueryState(searchQuery: Search): void {
    this.searchQueryState.next(searchQuery);
  }

  searchKeyword(keyword: string){
    let searchArray = this.geoSearchState.getValue();
    searchArray = searchArray.filter(geoRes => geoRes.properties.keyword === keyword);
    this.geoSearchState.next(searchArray);

  }
}
