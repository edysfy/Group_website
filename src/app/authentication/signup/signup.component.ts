import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UrlStateService } from 'src/app/service/url-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriber!: Subscription;


  constructor(
    private urlStateService: UrlStateService,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subscriber = this.router.url.subscribe((urlPath) => {
      this.urlStateService.updatePathParamter(urlPath[0].path);
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
    this.urlStateService.updatePathParamter('');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else if(form.value.password!=form.value.samepassword) {
      alert('passwords do not match');
      return;
    }
    console.log(form.value.username);
    this.authService
      .createUser(form.value.username, form.value.password)
      .subscribe((response) => {
        if(response.regSuc) {
          alert("Register Successful");
          this.route.navigate(['/login']);
        }else{
          alert("Username is taken");
        }
      });
  }
}
