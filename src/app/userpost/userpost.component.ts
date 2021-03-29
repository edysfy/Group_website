import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostdetailsService } from '../service/postdetails.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserpostComponent>,
    public service: PostdetailsService ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
