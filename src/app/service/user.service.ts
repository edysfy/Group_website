import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetails!: Subject<User>;

  constructor(private http: HttpClient) {
    this.userDetails = new Subject<User>();
   }

  getUserFromDB(): Observable<User> {
    const username = localStorage.getItem('username');
    this.http.get<User>('http://localhost:3000/api/user/' + username)
    .subscribe(user => {
      if(user!=null) {
        this.userDetails.next(user);
      }
    });
    return this.userDetails.asObservable()
  }


}
