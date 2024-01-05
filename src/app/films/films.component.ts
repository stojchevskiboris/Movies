import { Component, OnInit } from '@angular/core';
import { Film } from './film.model';
import { Subscription, from } from 'rxjs';
import { FilmsService } from './films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films!: Film[];
  paginatedFilms!: Film[];
  subscription: Subscription;
  totalItems: number = null;
  pages: number[] = [];
  currentPage: number = null;
  pageSize: number = 80;

  constructor(private filmsService: FilmsService) { }

  ngOnInit() {
    this.filmsService.fetchFilms();
    this.subscription = this.filmsService.filmsChanged.subscribe(
      (f: Film[]) => {
        this.films = f;
        this.currentPage = 1;
        this.calculatePages();
        this.changePage(1)
      }
    )
  }

  calculatePages(force=false) {
    if (this.totalItems == null || force) {
      this.pages = [];
      this.totalItems = this.filmsService.getLength();
      var totalPages = Math.ceil(this.totalItems / this.pageSize);
      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i);
      }
    }
  }

  changePage(p) {
    this.currentPage = p;
    var to: number = p * this.pageSize;
    var from: number = to - this.pageSize;
    if (from < 0) {
      from = 0;
    }
    if (to > this.totalItems) {
      to = this.totalItems + 1;
    }
    this.paginatedFilms = this.films.slice(from, to)
  }

  prev() {
    if (this.currentPage > 1)
      this.changePage(this.currentPage - 1)
  }

  next() {
    if (this.currentPage < this.pages.length)
      this.changePage(this.currentPage + 1)
  }

  changeSize(event){
    this.pageSize = event
    this.calculatePages(true)
    this.currentPage = 1
    this.changePage(this.currentPage)
  }

}
