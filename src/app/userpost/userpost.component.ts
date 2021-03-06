import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../service/post.service';
import * as mapboxgl from 'mapbox-gl';
import { MatSliderChange } from '@angular/material/slider';
import { UserSearchService } from '../service/user-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css'],
})
export class UserpostComponent implements OnInit, OnDestroy {
  public rating: string | null;
  form!: FormGroup;
  suber!: Subscription;
  searchActivated!: boolean;
  sliderVal!: number|null;

  constructor(
    private dialogRef: MatDialogRef<UserpostComponent>,
    private postService: PostService,
    private userSearchService: UserSearchService
  ) {
    this.rating = 'Coping';
    this.sliderVal = 2;
  }

  ngOnInit(): void {
    this.suber = this.userSearchService
      .getIsInSearchState()
      .subscribe((bool) => {
        this.searchActivated = bool;
      });
    this.form = new FormGroup({
      rating: new FormControl(null),
      keyword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      post: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(2000)],
      }),
    });
  }

  ngOnDestroy(): void {
    this.suber.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    if(this.searchActivated) {
      this.dialogRef.close();
      alert("Unable to post in search mode");
      return;
    }
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close();
    if(this.sliderVal!=null) {
      console.log(this.form);
      this.postService.createPost(
        this.sliderVal,
        this.form.value.keyword,
        this.form.value.post
      );
    }
  }

  formatLabel(value: number) {
    if (value > 3) {
      return Math.round(value / 3);
    }
    return value;
  }

  onSliderChange(event: MatSliderChange) {
    this.sliderVal = event.value;
    if(event.value === 1) {
      this.rating = 'Happy'
    } else if(event.value === 2) {
      this.rating = 'Coping'
    } else if(event.value === 3) {
      this.rating = 'Sad'
    }
  }
}
