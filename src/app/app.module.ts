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
import { FormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';



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
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ...material,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
