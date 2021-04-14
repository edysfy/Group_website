import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GeoJson } from '../models/geoJson';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails!: Subject<User>;
  private userGJState: BehaviorSubject<Array<GeoJson>>;

  constructor(private http: HttpClient) {
    this.userDetails = new Subject<User>();
    this.userGJState = new BehaviorSubject<Array<GeoJson>>([]);
  }

  getUserPosts(): BehaviorSubject<Array<GeoJson>> {
    const username = localStorage.getItem('username');
    this.http.get<{ message: 'string'; userposts: Array<GeoJson> }>(
      'http://localhost:3000/api/geoPost/' + username
    ).subscribe(response => {
      this.userGJState.next(response.userposts);
    });
    return this.userGJState;
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
      .put<{ message: string }>('http://localhost:3000/api/user/' + username, {
        gender: gender,
      })
      .subscribe((message) => console.log(message));
  }

  getUserPostState() {
    return this.userGJState;
  }

  setUserPostState(newGJArr: Array<GeoJson>) {
    this.userGJState.next(newGJArr);
  }
}
