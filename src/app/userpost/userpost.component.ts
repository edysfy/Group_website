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

  ratingChoices: string[]= ['1','2','3','4','5'];

  form!: FormGroup;

  ratings = new FormControl('');


  constructor(public dialogRef: MatDialogRef<UserpostComponent>,
    public postService: PostService ) { }

  ngOnInit(): void {
    form: this.form = new FormGroup({
      $key: new FormControl(null),
      location: new FormControl(''),
      rating: this.ratings,
      keyword: new FormControl(''),
      post: new FormControl(''),
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
