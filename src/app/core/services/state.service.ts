import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../../interfaces';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private user: BehaviorSubject<IUser> = new BehaviorSubject({});

    constructor(
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.checkLocalStorage();
    }

    public setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
    }

    public checkLocalStorage() {
        const localUserString = localStorage.getItem('user');
        if (localUserString) {
            const localUserObject = JSON.parse(localUserString);
            if (localUserObject && localUserObject.id) {
                this.setUser(localUserObject);
            }
        }
    }

    public getUser(): Observable<IUser> {
        return this.user.asObservable();
    }
}
