import { Component, OnInit } from '@angular/core';
import { faUserPlus, faSignInAlt, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { UrlStateService } from '../service/url-state.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  toolbarAccentColour: Boolean;
  public title: string;

  constructor(private urlStateService: UrlStateService) {
    this.toolbarAccentColour = true;
    this.title = "EmoteMap"
  }

  ngOnInit(): void {
    /*listen to obesrvable path paramter in url service*/
    this.urlStateService.getUrlObservable().subscribe(param => {
      /*change toolbar color and title due to different param*/
      if(param === 'login' ) {
        this.toolbarAccentColour = false;
        this.title = 'Login';
      }else if(param ==='signup') {
        this.toolbarAccentColour = false;
        this.title = 'Sign Up'
      }
      else {
        this.toolbarAccentColour = true;
        this.title = "EmoteMap";
      }
    });
  }


  /*login register icons icons*/
  faUserPlus: IconDefinition = faUserPlus;
  faSignInAlt: IconDefinition = faSignInAlt;
  faSignOutAlt: IconDefinition = faSignOutAlt;




}
