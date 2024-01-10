import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../films.service';
import { Film } from '../film.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  id?: number = null
  film?: Film = null
  subscription: Subscription;
  fIdSubscription: Subscription;
  lIdSubscription: Subscription;
  firstid: number;
  lastid: number;
  nextid: number = -1;
  previd: number = -1;

  constructor(private route: ActivatedRoute,
    private filmsService: FilmsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.fIdSubscription = this.filmsService.getFirstId().subscribe(
      (id: number) => {
        this.firstid = id;
      }
    )
    this.lIdSubscription = this.filmsService.getLastId().subscribe(
      (id: number) => {
        this.lastid = id;
      }
    )
    window.scrollTo(0, 0);
    this.id = this.route.url["_value"][1]["path"]
    this.film = this.filmsService.getFilmById(this.id);
    this.subscription = this.filmsService.filmsChanged.subscribe(
      () => {
        window.scrollTo(0, 0);
        this.id = this.route.url["_value"][1]["path"]
        this.film = this.filmsService.getFilmById(this.id);
      })
    setTimeout(() => {
      if (this.id > this.firstid) {
        var prevfilm = this.filmsService.getPrev(this.id)
        this.previd = prevfilm.filmId
      }
      if (this.id < this.lastid) {
        var nextfilm = this.filmsService.getNext(this.id)
        this.nextid = nextfilm.filmId
      }
    }, 200);
  }

  deleteFilm(id) {
    this.filmsService.deleteFilm(id).subscribe()
    this.filmsService.fetchFilms();
    this.router.navigate(['films'])
    setTimeout(() => {
      document.getElementsByClassName("modal-backdrop")[0].classList.remove("show", "fade", "modal-backdrop");
      document.getElementsByTagName("body")[0].style.overflow = "visible"
      document.getElementsByTagName("body")[0].style.paddingRight = "0px"
    }, 200);
  }
}
