import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginModalComponent } from '@components/login-modal/login-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUser } from '../../interfaces';
import { UserService } from '../../core/services/users.service';
import { StateService } from '../../core/services/state.service';

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent implements OnInit, OnDestroy {
    user: IUser;
    userSubscription: Subscription;
    apiKey: string;

    constructor(
        private stateService: StateService,
        private dialog: MatDialog,
        private usersService: UserService,
        private cdr: ChangeDetectorRef,
        private toastr: ToastrService
    ) {
        this.apiKey = localStorage.getItem('apiKey');
        this.userSubscription = this.stateService.getUser().subscribe(user => {
            if (user && user.id) {
                this.user = user;
                this.cdr.markForCheck();
            } else {
                this.user = {};
                this.cdr.markForCheck();
            }
        })
    }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    ngOnInit() {
    }

    unsubscribeAll() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

    logout() {
        this.stateService.setUser({});
    }

    doLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px';
        dialogConfig.hasBackdrop = true;
        dialogConfig.closeOnNavigation = true;
        const dialogRef = this.dialog.open(LoginModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.usersService.loginUser(result).subscribe(res => {
                    if (res && res.id) {
                        this.stateService.setUser(res);
                    } else {
                        this.toastr.error('Invalid Credentials');
                    }
                })
                this.cdr.markForCheck();
            }
        });
    }

    apiKeyChanged(key: string) {
        this.stateService.setApiKey(key);
    }

}
