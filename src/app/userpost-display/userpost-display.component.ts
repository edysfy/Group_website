import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IGeoJson } from '../models/geoJson';
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
  hasUserPosted!: boolean;
  moodArr: string[] = ["filler","Happy", "Coping", "Sad"]

  @Output() flyToCords = new EventEmitter<number[]>();

  constructor(private userService: UserService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.userService.getUserPosts().subscribe(userposts => {
      this.userPosts = userposts;
      if(this.userPosts.length != 0) {
        this.hasUserPosted = true;
      }else {
        this.hasUserPosted = false;
      }
    });
  }

  onDelete(_id: string): void{
    /*delete the geoPost in the postService/database and map*/
    this.postService.deletePost(_id);
    /*delete the post in memory*/
    this.userService.deletePostFromUserList(_id);
    console.log(_id);
  }
  
  onFlyTo(lngLat: number[]):void {
    this.flyToCords.emit(lngLat);
    console.log(lngLat);
  }

}
