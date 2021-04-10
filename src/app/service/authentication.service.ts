import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authToken!: string|null;
  public authState!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) { 
    this.authToken = localStorage.getItem('token');
    this.authState = new BehaviorSubject<boolean>(false);
    if(this.authToken!=null) {
      this.authState.next(true);
    }
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


  setLogin(token: string) {
    this.authToken = token;
    window.localStorage.setItem('token',this.authToken);
    this.authState.next(true);
  }

  getToken(): string|null {
    return this.authToken;
  }

  getAuthState(): BehaviorSubject<boolean> {
    return this.authState;
  }

  logout() {
    this.authToken=null,
    window.localStorage.clear();
    this.authState.next(false);
  }

}
