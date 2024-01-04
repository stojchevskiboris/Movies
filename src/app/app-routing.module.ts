import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FilmsComponent } from './films/films.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'films', component:FilmsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
