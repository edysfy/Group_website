import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authToken!: string|null;
  public authState!: BehaviorSubject<boolean>;
  username!: string|null;

  constructor(private http: HttpClient) { 
    /*get jwt token from storage, if empty user not logged in*/
    this.authToken = localStorage.getItem('token');
    this.authState = new BehaviorSubject<boolean>(false);
    if(this.authToken!=null) {
      this.authState.next(true);
      this.username = localStorage.getItem('username');
    }else {
      this.username="null";
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
      .post<{ token: string; message: string, username: string }>(
        'http://localhost:3000/api/user/login',
        loginData
      )
  }

  

  setLogin(token: string, username: string) {
    this.authToken = token;
    this.username = username;
    window.localStorage.setItem('token',this.authToken);
    window.localStorage.setItem('username',username);
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
    this.username="null";
    window.localStorage.clear();
    this.authState.next(false);
  }

  getUsername() {
    return this.username;
  }

}
