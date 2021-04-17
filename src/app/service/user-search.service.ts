import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  hasSearchInit!: BehaviorSubject<boolean>;

  constructor() { 
    this.hasSearchInit = new BehaviorSubject<boolean>(false);
  }

  setHasSearchInit(set: boolean): void {
    this.hasSearchInit.next(set);
  }

  getIsInSearchState(): BehaviorSubject<boolean>  {
    return this.hasSearchInit;
  }
}
