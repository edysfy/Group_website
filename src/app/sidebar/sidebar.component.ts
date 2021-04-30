import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../models/Sidebar';
import { AuthenticationService } from '../service/authentication.service';
import { SidebarService } from '../service/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarState!: Sidebar;

  constructor(private authService: AuthenticationService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.getSidebarObvs().subscribe((sidebar) => {
      this.sidebarState = sidebar;
    })
  }

  clickProfileIcon():void {
    this.sidebarService.setProfileState(!this.sidebarState.profile);
  }

  clickKeyIcon():void {
    this.sidebarService.setKeyState(!this.sidebarState.key);
  }

  clickPostListIcon():void {
    this.sidebarService.setPostListState(!this.sidebarState.userPosts);
  }

  clickSearchIcon():void {
    this.sidebarService.setSearchState(!this.sidebarState.search);
  }

  logOut():void {
    this.authService.logout();
    window.location.reload()
  }
}



