import { Component, OnInit, Output } from '@angular/core';
import { IGeoJson } from '../models/geoJson';
import { AuthenticationService } from '../service/authentication.service';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-userpost-display',
  templateUrl: './userpost-display.component.html',
  styleUrls: ['./userpost-display.component.css']
})
export class UserpostDisplayComponent implements OnInit {
  userPosts!: Array<IGeoJson>;
  panelOpenState: boolean = false;


  constructor(private userService: UserService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.userService.getUserPosts().subscribe(userposts => {
      this.userPosts = userposts;
    });
  }

  onDelete(_id: string): void{
    this.userPosts = this.userPosts.filter(up => up._id != _id);
    this.postService.deletePost(_id);
    console.log(_id);
  }
  
  onFlyTo(lngLat: number[]):void {
    console.log(lngLat);
  }

}
