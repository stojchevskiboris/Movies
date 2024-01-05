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
  film?:Film = null
  subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private filmsService: FilmsService,
              private router: Router,
              ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.id = this.route.url["_value"][1]["path"]
    this.film = this.filmsService.getFilmById(this.id);
    this.subscription = this.filmsService.filmsChanged.subscribe(
      () => {
        window.scrollTo(0,0);
        this.id = this.route.url["_value"][1]["path"]
        this.film = this.filmsService.getFilmById(this.id);
      })
  }

  deleteFilm(id){
    this.filmsService.deleteFilm(id).subscribe()
    this.router.navigate(['films'])
    setTimeout(() => {
      document.getElementsByClassName("modal-backdrop")[0].classList.remove("show", "fade", "modal-backdrop");
      document.getElementsByTagName("body")[0].style.overflow = "visible"
      document.getElementsByTagName("body")[0].style.paddingRight = "0px"
    }, 200);
  }
}
