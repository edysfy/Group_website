import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  loginClicked!: BehaviorSubject<Sidebar>;

  constructor() {
    this.loginClicked = new BehaviorSubject<Sidebar>({
      key: false,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
    });
  }

  getSidebarObvs(): Observable<Sidebar> {
    return this.loginClicked.asObservable();
  }

  setProfileState(isClicked: boolean): void{
    const newSBState = {
      key: false,
      profile: isClicked,
      userPosts: false,
      search: false,
      settings: false,
    }
    this.loginClicked.next(newSBState);
  }

  setKeyState(isClicked: boolean): void{
    const newSBState = {
      key: isClicked,
      profile: false,
      userPosts: false,
      search: false,
      settings: false,
    }
    this.loginClicked.next(newSBState);
  }

}
