import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { UrlStateService } from 'src/app/service/url-state.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private subscriber!: Subscription; 

  constructor(private urlStateService: UrlStateService, private router: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.subscriber = this.router.url.subscribe(urlPath => {
      this.urlStateService.updatePathParamter(urlPath[0].path);
    });
  }

}
