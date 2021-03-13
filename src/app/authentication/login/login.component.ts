import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription } from 'rxjs';
import { UrlStateService } from 'src/app/service/url-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  private subscriber!: Subscription;

  /*use url state service to hold login parameter data*/
  constructor(private router: ActivatedRoute, private urlStateService: UrlStateService) { }

  ngOnInit(): void {
    /*get the url path param and put in url service state*/
    this.subscriber = this.router.url.subscribe(url=>this.urlStateService.updatePathParamter(url[0].path));
  }

  ngOnDestroy(): void {
    /*end subscription to url path and set the url param in service to null*/
    this.subscriber.unsubscribe();
    this.urlStateService.updatePathParamter("");
  }



}
