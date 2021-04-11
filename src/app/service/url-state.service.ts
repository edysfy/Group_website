import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlStateService {
  /*create subject to convert to observable and state*/
  private pathParameterState: Subject<string>;
  private pathParameter: Observable<string>
  public toolbarTitle = new BehaviorSubject<string|null>("EmoteMasssp");


  constructor() { 
    /*create the subject => can be observable and change state in service*/
    this.pathParameterState = new Subject<string>();
        /*observable used in other components*/
    this.pathParameter = this.pathParameterState.asObservable();
  }

  getUrlObservable(): Observable<string> {
    return this.pathParameter;
  }

  updatePathParamter(newPath: string):void {
    /*update state*/
    console.log(newPath);
    this.pathParameterState.next(newPath);
  }

  setToolBarTitle(title: string|null) {
    this.toolbarTitle.next(title);
  }

  getToolBarTitle():  BehaviorSubject<string|null> {
    return this.toolbarTitle;
  }

}
