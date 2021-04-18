import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserSearchService } from '../service/user-search.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Search } from '../models/search';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit, OnDestroy {
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
  };
  mood: any = {
    copingWell: true,
    depression: true,
    anxiety: true,
  };
  gender: any = {
    male: true,
    female: true,
  };
  searchQueryState!: BehaviorSubject<Search>;

  constructor(private userSearchService: UserSearchService) {
    this.searchQueryState = new BehaviorSubject<Search>({
      minAge: this.ageMin,
      maxAge: this.ageMax,
      minDay: this.daysMin,
      maxDay: this.daysMax,
      copingWell: this.mood.copingWell,
      depression: this.mood.depression,
      anxiety: this.mood.anxiety,
      male: this.gender.male,
      female: this.gender.male,
    });
  }

  ngOnInit(): void {
    this.userSearchService.setHasSearchInit(true);
    this.searchQueryState.subscribe(state => {
      console.log(state);
    })
  }

  ngOnDestroy(): void {
    this.userSearchService.setHasSearchInit(false);
  }

  onChange() {
    let search = {
      minAge: this.ageMin,
      maxAge: this.ageMax,
      minDay: this.daysMin,
      maxDay: this.daysMax,
      copingWell: this.mood.copingWell,
      depression: this.mood.depression,
      anxiety: this.mood.anxiety,
      male: this.gender.male,
      female: this.gender.male,
    }
    this.searchQueryState.next(search);
  }

}
