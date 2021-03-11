import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MapboxComponent } from './mapbox/mapbox.component';

const routes: Routes = [
  {path: 'mapbox', component: MapboxComponent},
  {path: 'form', component: FormComponent},
  {path: '',   redirectTo: '/mapbox', pathMatch: 'full' },
  {path: '**', component: MapboxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
