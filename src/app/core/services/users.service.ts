import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    users: IUser[] = [
        {
            id: '1',
            name: 'test',
            email: 'test@test.com',
            photo_url: 'https://scontent.fotp3-2.fna.fbcdn.net/v/t1.6435-9/130769724_10222596772642410_1074526184963484338_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=gOOwmqmfdsMAX-zG2_k&_nc_ht=scontent.fotp3-2.fna&oh=e21bc2133b8b872bcfda771c570617c8&oe=60D25DFE',
            pass: 'test'
        },
        {
            id: '2',
            name: 'test2',
            email: 'test2@test.com',
            photo_url: 'https://scontent.fotp3-2.fna.fbcdn.net/v/t1.6435-9/130769724_10222596772642410_1074526184963484338_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=gOOwmqmfdsMAX-zG2_k&_nc_ht=scontent.fotp3-2.fna&oh=e21bc2133b8b872bcfda771c570617c8&oe=60D25DFE',
            pass: 'test'
        }
    ]

    constructor() {
    }

    public loginUser(user: IUser): Observable<IUser> {
        const foundUserIndex = this.users.findIndex(usr => usr.email === user.email && usr.pass === user.pass);
        console.log(user);
        if (foundUserIndex > -1) {
            return of(this.users[foundUserIndex]);
        } else {
            return of(null);
        }
    }
}
