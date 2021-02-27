import { Component, OnInit } from '@angular/core';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;

}
