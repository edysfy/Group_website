import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapboxComponent } from '../mapbox/mapbox.component';

@Component({
  selector: 'app-descript-popup',
  templateUrl: './descript-popup.component.html',
  styleUrls: ['./descript-popup.component.css']
})
export class DescriptPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MapboxComponent>,) { }

  ngOnInit(): void {
  }
  
  onClose(){
    this.dialogRef.close();
  }
}
