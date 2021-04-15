import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sideBarState!: BehaviorSubject<Sidebar>;

  constructor() {
    /*when set the side bar to all off*/
    this.sideBarState = new BehaviorSubject<Sidebar>({
      key: false,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
    });
  }

  /*return the observable*/
  getSidebarObvs(): Observable<Sidebar> {
    return this.sideBarState.asObservable();
  }

  /*set the profile state*/
  setProfileState(isClicked: boolean): void{
    const newSBState = {
      key: false,
      profile: isClicked,
      userPosts: false,
      search: false,
      settings: false,
    }
    this.sideBarState.next(newSBState);
  }

  /*set the key page state*/
  setKeyState(isClicked: boolean): void{
    const newSBState = {
      key: isClicked,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
    }
    this.sideBarState.next(newSBState);
  }

  /*set the users post list to be on*/
  setPostListState(isClicked: boolean): void{
    const newSBState = {
      key: false,
      profile: false,
      userPosts: isClicked,
      search: false,
      settings: false,
    }
    this.sideBarState.next(newSBState);
  }

}
