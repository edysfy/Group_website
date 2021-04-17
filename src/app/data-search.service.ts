import { Injectable } from '@angular/core';
import { GeoJson, IGeoJson } from './models/geoJson';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {
  private foundData: Array<GeoJson>

  constructor() {
  this.foundData = new Array<GeoJson>();
 }

  addData(input: GeoJson){
    this.foundData.push(input);
  }
  getData(): Array<GeoJson>{
    return this.foundData;
  }
  clearData() {
    this.foundData = new Array<GeoJson>();

  }
}
