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
  private pathParam!: Observable<String>

  constructor(private urlStateService: UrlStateService) {
    this.toolbarAccentColour = true;
  }

  ngOnInit(): void {
    /*listen to obesrvable path paramter in url service*/
    this.pathParam = this.urlStateService.getUrlObservable();
    this.pathParam.subscribe(param => {
      console.log(param);
      if(param === 'login') {
        this.toolbarAccentColour = false;
      } else {
        this.toolbarAccentColour = true;
      }
    });
  }

  /*login register icons icons*/
  faUserPlus: IconDefinition = faUserPlus;
  faSignInAlt: IconDefinition = faSignInAlt;
  faSignOutAlt: IconDefinition = faSignOutAlt;




}
