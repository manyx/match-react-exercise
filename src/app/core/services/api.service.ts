import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from '@core/services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

const headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');


@Injectable()
export class ApiService {
    public result: any;
    apiKey: string;

    constructor(
        private http: HttpClient,
        private stateService: StateService,
        private toastr: ToastrService
    ) {
        this.stateService.getApiKey().subscribe(apiKey => {
            this.apiKey = apiKey;
        })
    }

    search(term: string): Observable<any> {
        if (this.apiKey) {
            let searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${term}`;
            return this.http.get(searchQuery);
        } else {
            this.toastr.error('Please add API key!');
            return of(null);
        }
    }

    getGenres(): Observable<{ genres: { id: number, name: string }[] }> {
        if (this.apiKey) {
            let searchQuery = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
            return this.http.get(searchQuery) as Observable<{ genres: { id: number, name: string }[] }>;
        } else {
            return of(null);
        }
    }
}
