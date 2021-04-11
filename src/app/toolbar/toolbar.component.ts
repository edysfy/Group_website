import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Subscriber, Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UrlStateService } from '../service/url-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  public title: String|null;
  isLoggedIn!: boolean;
  subscriber!: Subscription;
  /*login register icons icons*/
  faUserPlus: IconDefinition = faUserPlus;
  faSignInAlt: IconDefinition = faSignInAlt;
  faSignOutAlt: IconDefinition = faSignOutAlt;

  constructor(
    private urlStateService: UrlStateService,
    private authService: AuthenticationService,
    private route: Router,
  ) {
    this.title = 'EmoteMap';
    this.subscriber = this.authService.getAuthState().subscribe((logIn) => {
      this.isLoggedIn = logIn;
    });
    if(this.isLoggedIn) {
      this.title = localStorage.getItem('username');
    }
    console.log(this.isLoggedIn);
  }

  ngOnInit(): void {
    /*listen to obesrvable path paramter in url service*/
    this.urlStateService.getUrlObservable().subscribe((param) => {
      /*change toolbar color and title due to different param*/
      if (param === 'login') {
        this.title = 'Login';
      } else if (param === 'signup') {
        this.title = 'Sign Up';
      } else if (param === 'about') {
        this.title = 'EmoteMap';
      } else {
        if(this.isLoggedIn) {
          this.title = this.authService.getUsername();
        }else {
          this.title = 'EmoteMap';

        }
      }
    });
  }


}
