import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserSearchService } from '../service/user-search.service';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit,OnDestroy {

  constructor(private userSearchService: UserSearchService) { }

  ngOnInit(): void {
    this.userSearchService.setHasSearchInit(true);

  }

  ngOnDestroy(): void {
    this.userSearchService.setHasSearchInit(false);
  }
 
}
