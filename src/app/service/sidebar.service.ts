import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  loginClicked!: Subject<boolean>;

  constructor() {
    this.loginClicked = new Subject<boolean>();
    this.loginClicked.next(false);
  }

  getLoginClickedObs(): Observable<boolean> {
    return this.loginClicked.asObservable();
  }

  setLoginClickedState(isClicked: boolean): void{
    this.loginClicked.next(isClicked);
  }

}
