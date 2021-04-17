import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserSearchService } from '../service/user-search.service';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit,OnDestroy {
  ageMin: number = 0;
  ageMax: number = 100;
  optionAge: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };
  daysMax: number = 0;
  daysMin: number = -3650;
  optionDays: Options = {
    floor: -3650,
    ceil: 0,
    step: 1,
  }
  mood: any = {
    coping: true,
    depressed: true,
    anxiety: true,
  }
  gender: any = {
    male: true,
    female: true,
  }

  constructor(private userSearchService: UserSearchService) { }

  ngOnInit(): void {
    this.userSearchService.setHasSearchInit(true);

  }

  ngOnDestroy(): void {
    this.userSearchService.setHasSearchInit(false);
  }

  moodChange(){
    console.log(this.mood);
  }
 
}
