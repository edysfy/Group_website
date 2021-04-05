import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {PostService} from '../service/post.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements OnInit {
  private latitude!: number;
  private longitude!: number;

  ratingChoices: string[]= ['1','2','3','4','5'];

  form!: FormGroup;

  ratings = new FormControl('');


  constructor(public dialogRef: MatDialogRef<UserpostComponent>,
    public postService: PostService ) { }

  ngOnInit(): void {

      this.form = new FormGroup({
      rating: this.ratings,
      keyword: new FormControl(''),
      post: new FormControl(''),
    })
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.form.value.rating);
    console.log(this.form.value.keyword);
    console.log(this.form.value.post);
    this.dialogRef.close();
  }

}
