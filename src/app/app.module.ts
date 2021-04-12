import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/Toolbar';
import { MapboxComponent } from './mapbox/mapbox.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthenticationService } from './service/authentication.service';
import { UrlStateService } from './service/url-state.service';
import { PostService } from './service/post.service';
import { DataSearchService } from './data-search.service';
import { PostbuttonComponent } from './postbutton/postbutton.component';
import { UserpostComponent } from './userpost/userpost.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AboutComponent } from './about/about.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatListModule } from '@angular/material/list';
import { UserComponent } from './user/user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const material = [
  BrowserAnimationsModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchfieldComponent,
    MapboxComponent,
    LoginComponent,
    SignupComponent,
    PostbuttonComponent,
    UserpostComponent,
    AboutComponent,
    SidebarComponent,
    SearchResultComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ...material,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    UrlStateService,
    PostService,
    DataSearchService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserpostComponent],
})
export class AppModule {}
