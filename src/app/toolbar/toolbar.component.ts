import { Component, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import {Router} from '@angular/router';
import { faUserPlus, faSignInAlt, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: Boolean;
  showDisplay: Boolean;

  constructor(private route:Router) {
    this.isLoggedIn = false;
    this.showDisplay = false;
  }

  ngOnInit(): void {
    this.route.navigate(['/mapbox']);
  }

  /*login register icons icons*/
  faUserPlus: IconDefinition = faUserPlus;
  faSignInAlt: IconDefinition = faSignInAlt;
  faSignOutAlt: IconDefinition = faSignOutAlt;


  login():void {
    this.isLoggedIn = true;
  }
  logout():void {
    this.isLoggedIn = false;
  }
  toggle() {
    this.showDisplay=!this.showDisplay
    if(this.showDisplay == true){
      this.route.navigate(['/form']);
    }
    else{
      this.route.navigate(['/mapbox']);

    }

  }

}
