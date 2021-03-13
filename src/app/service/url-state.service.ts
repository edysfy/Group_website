import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlStateService {
  /*create subject to convert to observable and state*/
  private pathParameterState = new BehaviorSubject<string>(" ");
  public pathParameter: Observable<string>

  constructor() { 
    /*observable used in other components*/
    this.pathParameter = this.pathParameterState.asObservable();
  }

  updatePathParamter(newPath: string) {
    /*update state*/
    this.pathParameterState.next(newPath);
  }

}
