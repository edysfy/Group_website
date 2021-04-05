import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../service/post.service';
import * as mapboxgl from 'mapbox-gl';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css'],
})
export class UserpostComponent implements OnInit {
  public val:number|null;
  form!: FormGroup;
  ratings = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<UserpostComponent>,
    public postService: PostService
  ) {
    this.val=10;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      rating: new FormControl(''),
      keyword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      post: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(2000)],
      }),
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value / 10) 
    }
    return value;
  }

  onSliderChange(event: MatSliderChange) {
    this.val=event.value;
  }

}
