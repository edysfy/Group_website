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
    dialogConfig.width = "30%";
    dialogConfig.height = "55%";

    this.dialog.open(UserpostComponent,dialogConfig);
  }



}
