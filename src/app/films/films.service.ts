import { Injectable } from '@angular/core';
import { Film } from './film.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilmsService {

  filmsChanged = new Subject<Film[]>()

  private films: Film[] = [];

  constructor(private http: HttpClient) {
   }

  getFilms(){
    return this.films.slice();
  }

  getLength(){
    return this.films.length;
  }

  getFilmById(id: number) {
    return this.films.find((x, index) => index == id)
  }

  fetchFilms(){
    return this.http.get('https://localhost:44306/api/films/all')
      .subscribe(
        (data: any[]) => {
          try {
            if (data == null) {
              data = [] // initialize empty array to prevent operating errors
            }
            this.films = data.map(f => f)
            this.filmsChanged.next(this.films.slice())
          }
          catch {
            console.log("Error: Couldn`t fetch server data for films.service.ts");
          }
        }
      )
  }

  


}
