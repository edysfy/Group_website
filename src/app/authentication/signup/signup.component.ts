import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { UrlStateService } from 'src/app/service/url-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
  export class SignupComponent implements OnInit,OnDestroy {
  
  private subscriber!: Subscription; 

  constructor(private urlStateService: UrlStateService, private router: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.subscriber = this.router.url.subscribe(urlPath => {
      this.urlStateService.updatePathParamter(urlPath[0].path);
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.urlStateService.updatePathParamter('');
  }

}
