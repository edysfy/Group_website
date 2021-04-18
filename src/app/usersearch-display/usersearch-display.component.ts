import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IGeoJson } from '../models/geoJson';
import { UserSearchService } from '../service/user-search.service';

@Component({
  selector: 'app-usersearch-display',
  templateUrl: './usersearch-display.component.html',
  styleUrls: ['./usersearch-display.component.css']
})
export class UsersearchDisplayComponent implements OnInit {
  searchResults!: Array<IGeoJson>;
  panelOpenState: boolean = false;
  noResults!: boolean;

  @Output() flyToCords = new EventEmitter<number[]>();

  constructor(private userSearchService: UserSearchService) {
  }

  ngOnInit(): void {
    this.userSearchService.getGeoSearchObvservable().subscribe(results => {
      this.searchResults = results;
      if(this.searchResults.length != 0) {
        this.noResults = false;
      }else {
        this.noResults = true;
      }
    });
  }

  onFlyTo(lngLat: number[]):void {
    this.flyToCords.emit(lngLat);
    console.log(lngLat);
  }

}
