import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[] = [];
  favouriteMovies: any[] = [];


  constructor(public fetchMovies: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavouriteMovies(): void {
    this.fetchMovies.getFavouriteMovies().subscribe((resp: any) => {
      this.favouriteMovies = resp;
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  }
  
  isFav(id: string): boolean {
    return this.favouriteMovies.includes(id);
  }


  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '500px',
    });
  }
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }
  openSynopsisDialog(name: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  addFavouriteMovie(id: string): void {
    console.log(id);
    this.fetchMovies.addFavouriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  deleteFavouriteMovie(id: string): void {
    console.log(id);
    this.fetchMovies.deleteFavouriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
