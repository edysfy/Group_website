import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostService } from '../service/post.service';
import { UserpostComponent } from '../userpost/userpost.component';

@Component({
  selector: 'app-postbutton',
  templateUrl: './postbutton.component.html',
  styleUrls: ['./postbutton.component.css'],
})
export class PostbuttonComponent implements OnInit {
  constructor(private dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {}

  createPost() {
    /*gets user coordinates*/
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.postService.updateLongLat({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '60%';
    dialogConfig.height = '78%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'custom-dialog';

    this.dialog.open(UserpostComponent, dialogConfig);
  }
}
