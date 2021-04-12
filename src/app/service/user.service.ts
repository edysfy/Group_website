import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails!: Subject<User>;

  constructor(private http: HttpClient) {
    this.userDetails = new Subject<User>();
  }

  getUserFromDB(): Observable<User> {
    const username = localStorage.getItem('username');
    this.http
      .get<{ user: User }>('http://localhost:3000/api/user/' + username)
      .subscribe((res) => {
        if (res != null) {
          this.userDetails.next(res.user);
        }
      });
    return this.userDetails.asObservable();
  }

  updateDate(dob: Date) {
    const username = localStorage.getItem('username');
    console.log(username);
    if (dob) {
      this.http
        .put<{ message: string }>(
          'http://localhost:3000/api/user/' + username,
          { dob: dob }
        )
        .subscribe((message) => console.log(message));
    }
  }

  updateGender(gender: string) {
    const username = localStorage.getItem('username');
    this.http
    .put<{ message: string }>(
      'http://localhost:3000/api/user/' + username,
      { gender: gender }
    )
    .subscribe((message) => console.log(message));
  }
}
