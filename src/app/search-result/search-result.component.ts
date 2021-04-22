import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSearchService } from '../data-search.service';
import { GeoJson, IGeoJson } from '../models/geoJson';
import {MatListModule} from '@angular/material/list';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  public foundData: Array<GeoJson>


  constructor(public dialogRef: MatDialogRef<SearchResultComponent>, public searchData : DataSearchService) {
  this.changePosition;
  this.foundData = this.searchData.getData();
}

  ngOnInit(): void {
    for (var index = 0; index < this.foundData.length; ++index) {
       // If keyword entered equals keyword in user posts



          console.log("keyword" + this.foundData[index].properties.keyword);
          console.log("textbody" + this.foundData[index].properties.textBody);
          console.log("mood" + this.foundData[index].properties.mood);
          console.log("username" + this.foundData[index].properties.username);
          console.log("cords " + this.foundData[index].geometry.coordinates);

    }
  }
  onClose() {
    this.dialogRef.close();
  }
  changePosition() {
       this.dialogRef.updatePosition({ top: '50px', left: '50px' });
  }

  onFlyTo(lngLat: number[]):void {

    console.log(lngLat);
    this.dialogRef.close(lngLat);
  }




}
