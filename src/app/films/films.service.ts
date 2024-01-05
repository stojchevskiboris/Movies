import { Injectable } from '@angular/core';
import { Film } from './film.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FilmsService {
  baseUrl = 'https://localhost:44306/'
  filmsChanged = new Subject<Film[]>()
  private films: Film[] = [];
  headers = new HttpHeaders();
    

  constructor(private http: HttpClient) {
    const utcOffset = -(new Date().getTimezoneOffset());
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('utc-offset', utcOffset.toString());
    this.headers.append('platform', 'WEB');
    this.headers.append('app-version', '1.00');
    this.headers.append('version', '1.0');
    this.headers.append('accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  }

  getFilms() {
    return this.films.slice();
  }

  getLength() {
    return this.films.length;
  }

  getFilmById(id: number) {
    return this.films.find((x, index) => x.filmId == id)
  }

  addFilm(film): Observable<Object> {
    return this.http.post(this.baseUrl + 'api/Films/Create', film, { headers: this.headers })
  }
  
  deleteFilm(id): Observable<Object>{
    return this.http.delete(this.baseUrl + 'api/Films/Delete/'+ id)
  }

  fetchFilms() {
    return this.http.get(this.baseUrl + 'api/films/all')
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
