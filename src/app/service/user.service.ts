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
    this.http.get<{user: User}>('http://localhost:3000/api/user/' + username)
    .subscribe(res => {
      if(res!=null) {
        this.userDetails.next(res.user);
      }
    });
    return this.userDetails.asObservable()
  }


}
