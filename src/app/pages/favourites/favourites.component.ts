import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PhotoModalComponent } from '@components/photo-modal/photo-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IMovie, IUser } from '../../interfaces';
import { StateService } from '../../core/services/state.service';
import { UserService } from '../../core/services/users.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnDestroy {
    activeUser: IUser;
    userSubscription: Subscription;
    favourites: IMovie[] = [];

    constructor(
        private dialog: MatDialog,
        private usersService: UserService,
        private cdr: ChangeDetectorRef,
        private stateService: StateService,
        private toastr: ToastrService
    ) {
        this.readFavourites();
        this.userSubscription = this.stateService.getUser().subscribe(user => {
            if (user && user.id) {
                this.activeUser = user;
                this.cdr.markForCheck();
            } else {
                this.activeUser = {};
                this.cdr.markForCheck();
            }
        })
    }

    ngOnDestroy() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
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

    addToFavourites(movie: IMovie) {
        movie.isFavourite = true;
        this.favourites = this.favourites.filter(mov => {
            return mov.isFavourite;
        })
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
        this.cdr.markForCheck();
    }

    removeFromFavourites(movie: IMovie) {
        movie.isFavourite = false;
        this.favourites = this.favourites.filter(mov => {
            return mov.isFavourite;
        })
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
        this.cdr.markForCheck();
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
}
