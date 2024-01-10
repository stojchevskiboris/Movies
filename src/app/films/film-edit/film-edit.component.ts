import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilmsService } from '../films.service';
import { Film } from '../film.model';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css']
})
export class FilmEditComponent {
  id?: number;
  editMode: boolean = false;
  film?:Film = null
  filmForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmsService) { 

    }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id']
        this.editMode = params['id'] != null
        if (this.editMode){
          this.film = this.filmService.getFilmById(this.id)
        }
        this.initForm();
      }
    )
  }

  test(){
    var filmTest = {
      "title": "title",
      "description": "decs",
      "releaseYear": "2009",
      "languageId": 1,
      "rentalDuration": 6,
      "rentalRate": 2,
      "length": 88,
      "replacementCost": 20,
      "rating": "PG-13",
      "specialFeatures": "string, s2",
      "lastUpdate": "2024-01-04T12:57:46.846Z",
    }
    this.filmService.addFilm(filmTest).subscribe()
  }

  onSubmit() {
    if (this.editMode) {
      this.filmService.updateFilm(this.filmForm.value).subscribe()
      this.router.navigate(['films',this.id,'details'])
      this.filmService.fetchFilms();
    } else {
      this.filmService.addFilm(this.filmForm.value).subscribe()
      this.router.navigate(['films'])
    }
    this.filmService.fetchFilms();
  }

  onCancel(editing = false) {
    if (editing){
      this.router.navigate(['films',this.id,'details'])
    }
    else{
      this.router.navigate(['films'])
    }
  }


  private async initForm() {
    let title = '';
    let description = '';
    let releaseYear;
    let languageId = '';
    let rentalDuration;
    let rentalRate;
    let length;
    let replacementCost;
    let rating = '';
    let specialFeatures = '';
    let FilmId = 0;
    let lastUpdate = new Date()
    


    if (this.editMode) {
      title = this.film?.title
      description = this.film?.description
      releaseYear = this.film?.releaseYear
      languageId = this.film?.languageId
      rentalDuration = this.film?.rentalDuration
      rentalRate = this.film?.rentalRate
      length = this.film?.length
      replacementCost = this.film?.replacementCost
      rating = this.film?.rating
      specialFeatures = this.film?.specialFeatures
      FilmId = this.id
    }
    this.filmForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'releaseYear': new FormControl(releaseYear, Validators.required),
      'languageId': new FormControl(languageId, Validators.required),
      'rentalDuration': new FormControl(rentalDuration, Validators.required),
      'rentalRate': new FormControl(rentalRate, Validators.required),
      'length': new FormControl(length, Validators.required),
      'replacementCost': new FormControl(replacementCost, Validators.required),
      'rating': new FormControl(rating, Validators.required),
      'specialFeatures': new FormControl(specialFeatures),
      'FilmId': new FormControl(FilmId),
      'lastUpdate': new FormControl(lastUpdate)
    });

  }
  
}
