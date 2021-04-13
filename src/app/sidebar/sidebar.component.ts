import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { SidebarService } from '../service/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn!: boolean;
  clickedUserProfileState!: boolean;

  constructor(private authService: AuthenticationService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((logIn) => {
      this.isLoggedIn = logIn;
    });  
    this.sidebarService.getLoginClickedObs().subscribe((state) => {
      this.clickedUserProfileState = state;
    })
  }

  clickUserIcon():void {
    this.sidebarService.setLoginClickedState(!this.clickedUserProfileState);
  }

  logOut():void {
    this.authService.logout();
    window.location.reload()
  }
}



