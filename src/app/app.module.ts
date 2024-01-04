import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { FilmsComponent } from './films/films.component';
import { FilmsService } from './films/films.service';
import { FilmDetailsComponent } from './films/film-details/film-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    FilmDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
