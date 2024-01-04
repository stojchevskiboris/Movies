import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FilmsService } from './films/films.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movies';

  constructor(private http: HttpClient, private fService: FilmsService) { }

  ngOnInit() {
    this.fService.fetchFilms()
  }

}
