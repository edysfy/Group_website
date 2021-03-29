import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {PostService} from '../service/post.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements OnInit {

  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserpostComponent>,
    public postService: PostService ) { }

  ngOnInit(): void {
    form: this.form = new FormGroup({
      $key: new FormControl(null),
      location: new FormControl(''),
      rating: new FormControl(''),
      keyword: new FormControl(''),
      post: new FormControl(''),
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
