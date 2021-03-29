import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent implements OnInit {
  value1 = 'Keyword';
  value2 = 'Date';

  constructor() { }

  ngOnInit(): void {
  }

}
