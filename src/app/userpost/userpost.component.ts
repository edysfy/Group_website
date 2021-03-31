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

    form: this.form = new FormGroup({
      $key: new FormControl(null),
      locationLat: new FormControl(this.postService.getLatitude()),
      locationLong: new FormControl(this.postService.getLongitude()),
      rating: this.ratings,
      keyword: new FormControl(''),
      post: new FormControl(''),
    })
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log(this.form.controls['locationLat'].value);
    console.log(this.form.controls['locationLong'].value);
    console.log(this.form.controls['rating'].value);
    console.log(this.form.controls['keyword'].value);
    console.log(this.form.controls['post'].value);
    this.dialogRef.close();
  }


}
