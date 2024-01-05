import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './films/film-details/film-details.component';
import { TimeConvertPipe } from './shared/time-convert.pipe';
import { FilmEditComponent } from './films/film-edit/film-edit.component';
import { LanguagePipe } from './shared/language.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    FilmDetailsComponent,
    FilmEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    TimeConvertPipe,
    LanguagePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
