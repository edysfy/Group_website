import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { GeoJson, IGeoJson } from '../models/geoJson';
import { SearchResultComponent } from '../search-result/search-result.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DataSearchService } from '../data-search.service';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {
  form!: FormGroup
  userPosts: Array<GeoJson>

  @Output() flyToCords = new EventEmitter<number[]>();

  constructor(public postService: PostService,private dialog: MatDialog,public searchData : DataSearchService) {
     // Get userpost array
     this.userPosts = this.postService.getGeoPosts();
  }

  ngOnInit(): void {
     this.form = new FormGroup ({
        keyword: new FormControl(null),
        date: new FormControl(null),
     });
  }

  onSearch() {
    this.searchData.clearData();


     for (var index = 0; index < this.userPosts.length; ++index) {
        // If keyword entered equals keyword in user posts
        console.log(this.userPosts[index].properties.dateTime);
        if (this.form.value.keyword == this.userPosts[index].properties.keyword
        ) {
          this.searchData.addData(this.userPosts[index]);
           //console.log(this.form.value.keyword);
           //console.log(this.userPosts[index].properties.keyword);
        }
     }
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.width = '70%';
     dialogConfig.height = '78%';
     dialogConfig.hasBackdrop = true;
     dialogConfig.panelClass = 'custom-dialog';
     dialogConfig.position = {bottom: '3%'};

     const dialogRef = this.dialog.open(SearchResultComponent, dialogConfig);
     dialogRef.afterClosed().subscribe(
      data => this.flyToCords.emit(data)
  );
  }

}
