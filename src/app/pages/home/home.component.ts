import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PhotoModalComponent } from '@components/photo-modal/photo-modal.component';
import { ApiService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { UserService } from '../../core/services/users.service';
import { IGenre, IMovie, IUser } from '../../interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    movies: IMovie[] = [];
    favourites: IMovie[] = [];
    moviesSubscription: Subscription;
    sortBy = 'name';
    activeUser: IUser;
    searchTerm: string;
    searchField: FormControl;
    loading: boolean = false;
    filterByYear: number;
    filterByGenre: number;
    genreName: any;

    get movieYears() {
        const uniqueYears = [...new Set(this.movies.map(mov => mov.year))].sort((a, b) => {
            return b - a;
        });
        return uniqueYears;
    }

    get movieGenres(): number[] {
        const allGenres = this.flatten(this.movies.map(movie => movie.genre));
        const uniqueGenres = [...new Set(allGenres)] as number[];
        return uniqueGenres;
    }

    get sortedAndFilteredMovies(): IMovie[] {
        let sortedAndFilteredMovies = [...this.movies];
        if (this.filterByYear) {
            sortedAndFilteredMovies = [...sortedAndFilteredMovies.filter(mov => mov.year === this.filterByYear)];
        }
        if (this.filterByGenre) {
            sortedAndFilteredMovies = [...sortedAndFilteredMovies.filter(mov => mov.genre.includes(this.filterByGenre))];
        }
        return sortedAndFilteredMovies;
    }

    get favouriteMoviesIDs(): string[] {
        if (this.favourites && this.favourites.length) {
            return this.favourites.map(movie => movie.id);
        } else return [];

    }

    constructor(
        private dialog: MatDialog,
        private usersService: UserService,
        private cdr: ChangeDetectorRef,
        private stateService: StateService,
        private toastr: ToastrService,
        private apiService: ApiService
    ) {
        this.readFavourites();
        this.fetchGenres();
        this.moviesSubscription = this.stateService.getUser().subscribe(user => {
            if (user && user.id) {
                this.activeUser = user;
                this.cdr.markForCheck();
            } else {
                this.activeUser = {};
                this.cdr.markForCheck();
            }
        })
    }

    ngOnInit(): void {
        this.searchField = new FormControl();
        this.searchField.valueChanges.pipe(
            debounceTime(600),
            distinctUntilChanged(),
            tap(_ => {
                this.loading = true;
            }),
            tap(_ => (this.loading = false))
        ).subscribe(term => {
            this.apiService.search(term).subscribe(res => {
                let newMovie: IMovie;
                this.movies = [];
                res.results.forEach(movie => {
                    newMovie = {
                        name: movie.original_title,
                        year: movie.release_date ? movie.release_date.split('-')[0] : '-',
                        genre: movie.genre_ids,
                        rating: movie.vote_average,
                        posterURL: movie.poster_path ? 'https://image.tmdb.org/t/p/w440_and_h660_face' + movie.poster_path : 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png',
                        description: movie.overview,
                        id: movie.id,
                        isFavourite: this.favouriteMoviesIDs.includes(movie.id)
                    };
                    this.movies.push(newMovie);

                });
                this.doSort();
                this.cdr.markForCheck();

            })
        });
    }

    fetchGenres() {
        this.apiService.getGenres().subscribe(res => {
            this.genreName = res.genres.reduce((map: any, genre: IGenre) => {
                map[genre.id as any] = genre.name;
                return map;
            }, {});
        })
    }

    readFavourites() {
        const storedMoviesString = localStorage.getItem('favourites');
        if (storedMoviesString) {
            const storedMoviesObject = JSON.parse(storedMoviesString);
            if (storedMoviesObject) {
                this.favourites = storedMoviesObject;
                this.cdr.markForCheck();
            }
        }
    }

    showMovieDetails(movie: IMovie) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px';
        dialogConfig.hasBackdrop = true;
        dialogConfig.closeOnNavigation = true;
        const dialogRef = this.dialog.open(PhotoModalComponent, dialogConfig);
        dialogRef.componentInstance.movie = movie;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cdr.markForCheck();
            }
        });
    }

    updateSort() {
        this.doSort();
        this.cdr.markForCheck();
    }

    doSort() {
        if (this.sortBy === 'year') {
            this.movies.sort((a, b) => {
                return b.year - a.year;
            });
        } else if (this.sortBy === 'name') {
            this.movies.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
    }

    addToFavourites(movie: IMovie) {
        movie.isFavourite = true;
        const favMovies = this.movies.filter(mov => {
            return mov.isFavourite;
        })
        localStorage.setItem('favourites', JSON.stringify(favMovies));
        this.cdr.markForCheck();
    }

    removeFromFavourites(movie: IMovie) {
        movie.isFavourite = false;
        const favMovies = this.movies.filter(mov => {
            return mov.isFavourite;
        })
        localStorage.setItem('favourites', JSON.stringify(favMovies));
        this.cdr.markForCheck();
    }

    doYearFilter() {
        if (this.filterByYear === 0) {
            this.filterByYear = null;
            this.cdr.markForCheck();
        }
    }

    doGenreFilter() {
        if (this.filterByGenre === 0) {
            this.filterByGenre = null;
            this.cdr.markForCheck();
        }
    }

    flatten(arr) {
        return arr.reduce((flat, toFlatten) => {
            return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
        }, []);
    }
}
