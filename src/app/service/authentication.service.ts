import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authToken!: string|null;
  public authState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.authToken = localStorage.getItem('token');
  }

  createUser(username:  string, password: string) {
    const userData = {
      username: username,
      password: password,
    };
    return this.http
      .post<{ message: String; error: Error, regSuc: boolean }>(
        'http://localhost:3000/api/user/signup',
        userData
      )
  }

  login(username: string, password: string) {
    const loginData = {
      username: username,
      password: password,
    };
    return this.http
      .post<{ token: string; message: string }>(
        'http://localhost:3000/api/user/login',
        loginData
      )
  }

  setAuth() {
    this.authState.next(true);
  }

  setToken(token: string) {
    this.authToken = token;
    window.localStorage.setItem('token',this.authToken);
  }

  getToken() {
    return this.authToken;
  }

  logout() {
    this.authToken=null,
    window.localStorage.clear();
    this.authState.next(false);
  }

}
