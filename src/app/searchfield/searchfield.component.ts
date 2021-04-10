import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {
  form!: FormGroup

  constructor() { }

  ngOnInit(): void {
     this.form = new FormGroup ({
        keyword: new FormControl(null),
        date: new FormControl(null),
     });
  }

  onSearch() {
     console.log(this.form.value.keyword)
  };

}
