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
    private apiKey: BehaviorSubject<string> = new BehaviorSubject('');

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

    public setApiKey(apiKey: string) {
        localStorage.setItem('apiKey', apiKey);
        this.apiKey.next(apiKey);
    }

    public checkLocalStorage() {
        const localUserString = localStorage.getItem('user');
        if (localUserString) {
            const localUserObject = JSON.parse(localUserString);
            if (localUserObject && localUserObject.id) {
                this.setUser(localUserObject);
            }
        }
        const localStorageApiKey = localStorage.getItem('apiKey');
        if (localStorageApiKey) {
            this.apiKey.next(localStorageApiKey);
        }
    }

    public getUser(): Observable<IUser> {
        return this.user.asObservable();
    }

    public getApiKey(): Observable<string> {
        return this.apiKey.asObservable();
    }
}
