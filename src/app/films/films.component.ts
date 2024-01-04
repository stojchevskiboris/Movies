import { Component, OnInit } from '@angular/core';
import { Film } from './film.model';
import { Subscription } from 'rxjs';
import { FilmsService } from './films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films!: Film[];
  subscription: Subscription;
  totalItems: number = null;
  pages: number[] = [];
  currentPage: number = null;

  constructor(private filmsService: FilmsService) { }

  ngOnInit() {
    this.filmsService.fetchFilms();
    this.subscription = this.filmsService.filmsChanged.subscribe(
      (f: Film[]) => {
        this.films = f;
        this.currentPage = 1;
        this.calculatePages()
      }
    )

  }

  calculatePages() {
    if (this.totalItems == null) {
      this.totalItems = this.filmsService.getLength();
      var totalPages = Math.ceil(this.totalItems / 50);
      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i)
      }
    }
  }

  changePage(p){
    this.currentPage = p
  }


}
