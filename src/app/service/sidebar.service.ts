import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sideBarState!: BehaviorSubject<Sidebar>;
  offState: Sidebar = {
      key: false,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
  }

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
    this.sideBarState.next(this.offState);
    const newSBState = {
      key: false,
      profile: isClicked,
      userPosts: false,
      search: false,
      settings: false,
    }
    setTimeout(() => {
      this.sideBarState.next(newSBState);
    },200)
  }

  /*set the key page state*/
  setKeyState(isClicked: boolean): void{
    if(isClicked) {

    }
    this.sideBarState.next(this.offState);
    const newSBState = {
      key: isClicked,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
    }
    setTimeout(() => {
      this.sideBarState.next(newSBState);
    },200)
  }

  /*set the users post list to be on*/
  setPostListState(isClicked: boolean): void{
    this.sideBarState.next(this.offState);
    const newSBState = {
      key: false,
      profile: false,
      userPosts: isClicked,
      search: false,
      settings: false,
    }
    setTimeout(() => {
      this.sideBarState.next(newSBState);
    },200)
  }

    /*set the search state*/
    setSearchState(isClicked: boolean): void{
      this.sideBarState.next(this.offState);
      const newSBState = {
        key: false,
        profile: false,
        userPosts: false,
        search: isClicked,
        settings: false,
      }
      setTimeout(() => {
        this.sideBarState.next(newSBState);
      },200)
    }

}
