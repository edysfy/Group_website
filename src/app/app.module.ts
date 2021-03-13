import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/Toolbar';
import { MapboxComponent } from './mapbox/mapbox.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationService } from './service/authentication.service';
import { UrlStateService } from './service/url-state.service';



const material = [
  BrowserAnimationsModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,

]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchfieldComponent,
    MapboxComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ...material,
    BrowserAnimationsModule,
  ],
  providers: [AuthenticationService, UrlStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
