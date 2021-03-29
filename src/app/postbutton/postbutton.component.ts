import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserpostComponent } from '../userpost/userpost.component';

@Component({
  selector: 'app-postbutton',
  templateUrl: './postbutton.component.html',
  styleUrls: ['./postbutton.component.css']
})
export class PostbuttonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createPost(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(UserpostComponent,dialogConfig);
  }



}
