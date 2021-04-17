import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UrlStateService } from 'src/app/service/url-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  /*suscriber to the url service*/
  private subscriber!: Subscription;
  isLoading: boolean = false;

  /*use url state service to hold login parameter data*/
  constructor(
    private router: ActivatedRoute,
    private urlStateService: UrlStateService,
    private authService: AuthenticationService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    /*get the url path param and put in url service state*/
    this.subscriber = this.router.url.subscribe((urlParam) =>
      this.urlStateService.updatePathParamter(urlParam[0].path)
    );
  }

  ngOnDestroy(): void {
    /*end subscription to url path and set the url param in service to null*/
    this.subscriber.unsubscribe();
    this.urlStateService.updatePathParamter('');
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
    .subscribe((response) => {
      if (response.token) {
        this.authService.setLogin(response.token, response.username);
        this.route.navigate([''])
      }
      else if(response.message == "Incorrect password") {
        alert("Incorrect password");
      } else {
        alert("Incorrect username");
      }
    });
  }
}
