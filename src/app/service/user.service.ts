import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /*user details state*/
  private userDetails!: Subject<User>;
  /*user posts array state*/
  private userGJState: BehaviorSubject<Array<IGeoJson>>;

  /*init the attributes*/
  constructor(private http: HttpClient) {
    this.userDetails = new Subject<User>();
    this.userGJState = new BehaviorSubject<Array<IGeoJson>>([]);
  }

  /*get all the users posts from the api/db*/
  getUserPosts(): BehaviorSubject<Array<IGeoJson>> {
    const username = localStorage.getItem('username');
    this.http.get<{ message: 'string'; userposts: Array<IGeoJson> }>(
      'http://localhost:3000/api/geoPost/' + username
    ).subscribe(response => {
      this.userGJState.next(response.userposts);
    });
    return this.userGJState;
  }

  /*get the user from the database*/
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

  /*update the users dob in the back end*/
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

  /*update the users gender in the database*/
  updateGender(gender: string): void {
    const username = localStorage.getItem('username');
    this.http
      .put<{ message: string }>('http://localhost:3000/api/user/' + username, {
        gender: gender,
      })
      .subscribe((message) => console.log(message));
  }

  addPostToUserList(newPost: GeoJson): void {
    const userPostList = this.userGJState.getValue();
    userPostList.unshift(newPost);
    this.userGJState.next(userPostList);
  }

  deletePostFromUserList(_id: string): void {
    let userPostList = this.userGJState.getValue();
    userPostList = userPostList.filter(userpost => userpost._id != _id);
    this.userGJState.next(userPostList);
  }


  
}
