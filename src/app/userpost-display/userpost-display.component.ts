import { Component, OnInit } from '@angular/core';
import { GeoJson } from '../models/geoJson';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-userpost-display',
  templateUrl: './userpost-display.component.html',
  styleUrls: ['./userpost-display.component.css']
})
export class UserpostDisplayComponent implements OnInit {
  userPosts!: Array<GeoJson>;
  panelOpenState: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserPosts().subscribe(userposts => {
      this.userPosts = userposts;
    });
  }

}
