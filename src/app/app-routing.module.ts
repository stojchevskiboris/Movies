import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './films/film-details/film-details.component';
import { FilmEditComponent } from './films/film-edit/film-edit.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'films', component:FilmsComponent},
  {path: 'films/:id/details', component:FilmDetailsComponent},
  {path: 'films/:id/edit', component:FilmEditComponent},
  {path: 'films/new', component:FilmEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
